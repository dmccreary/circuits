'use strict';

// ── Palette ──────────────────────────────────────────────────────────────────
const COL_BG      = [245, 248, 252];
const COL_PANEL   = [255, 255, 255];
const COL_WIRE    = [50,  55,  70];
const COL_NODE    = [40, 100, 200];
const COL_DELTA   = [210,  65,  45];   // R1, R2, R5 (delta resistors)
const COL_WYE     = [25,  150,  75];   // Ra', Rb', Rc' (wye)
const COL_NEUTRAL = [70,   70,  80];   // R3, R4 (unchanged)
const COL_SERIES  = [195, 135,  25];   // Rs1, Rs2 (series combined)
const COL_RESULT  = [30,  100, 200];   // Req
const COL_VS      = [180,  50,  50];
const COL_BTN     = [50,  110, 220];
const COL_BTN_DIS = [170, 175, 185];
const COL_BTN_RED = [195,  60,  60];
const COL_SEG_BG  = [215, 220, 232];

// ── State ─────────────────────────────────────────────────────────────────────
let R  = [10, 30, 20, 40, 50];   // R1..R5
let Vs = 12;
const STEPS = 6;
let step = 0;

// ── Computed values ───────────────────────────────────────────────────────────
let Ra, Rb, Rc, Rs1, Rs2, Rpar, Req;

// ── Canvas ────────────────────────────────────────────────────────────────────
let cw;
const canvasH = 710;

// ── Layout objects ────────────────────────────────────────────────────────────
let dP, lP;                 // diagram panel, log panel
let btnPrev, btnNext, btnReset;
let tlDots = [];

// ── DOM inputs ────────────────────────────────────────────────────────────────
let inpElems = [];

// ── Step content ──────────────────────────────────────────────────────────────
const STEP_TITLES = [
    'Original Bridge Circuit',
    'Identify \u0394 Network',
    'Compute Y Equivalents',
    'Replace \u0394 with Y',
    'Combine Series Pairs',
    'Parallel \u2192 Final Req'
];

const EXPLANATIONS = [
    'A Wheatstone bridge has no two resistors that are purely in series or parallel — direct reduction is impossible. We need a special technique.',
    'R1, R2, and R5 form a \u0394 (delta) loop connecting nodes A, B, and C. Converting this triangle into a Y network will unlock the simplification.',
    'Apply \u0394\u2192Y: each Y resistor = product of its two adjacent \u0394 resistors \u00F7 sum of all three. A new center node N appears.',
    'The delta is gone. N connects to A (Ra\u2019), B (Rb\u2019), and C (Rc\u2019). The existing R3 and R4 remain, connecting B and C to node D.',
    'Rb\u2019 and R3 share the same current path B\u2013D \u2192 series pair Rs1. Rc\u2019 and R4 share path C\u2013D \u2192 Rs2. Combine each.',
    'Rs1 and Rs2 both connect N to D \u2192 they are in parallel. Add Ra\u2019 in series from A to N. Req = Ra\u2019 + (Rs1 \u2016 Rs2).'
];

// ── Setup ─────────────────────────────────────────────────────────────────────
function setup() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 960);
    cw = max(cw, 560);
    let cnv = createCanvas(cw, canvasH);
    cnv.parent(document.querySelector('main'));
    textFont('Arial');
    buildLayout();
    makeInputElems();
    compute();
    noLoop();
    setTimeout(reportHeight, 150);
}

function windowResized() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 960);
    cw = max(cw, 560);
    buildLayout();
    repositionInputs();
    resizeCanvas(cw, canvasH);
    redraw();
}

function buildLayout() {
    let pw = floor(cw * 0.55);
    dP = { x: 12, y: 58, w: pw,                 h: 342 };
    lP = { x: pw + 22, y: 58, w: cw - pw - 34,  h: 342 };

    let btnY = 566, bw = 90, bh = 34, gap = 14;
    let mid  = cw / 2;
    btnPrev  = { x: mid - bw * 1.5 - gap, y: btnY, w: bw, h: bh };
    btnNext  = { x: mid - bw / 2,          y: btnY, w: bw, h: bh };
    btnReset = { x: mid + bw / 2 + gap,    y: btnY, w: bw, h: bh };

    tlDots = [];
    let tlY = 622, tlL = cw * 0.10, tlR = cw * 0.90;
    for (let i = 0; i < STEPS; i++) {
        tlDots.push({ x: tlL + (tlR - tlL) * i / (STEPS - 1), y: tlY });
    }
}

function reportHeight() {
    try { window.parent.postMessage({ type: 'microsim-height', height: canvasH }, '*'); } catch (e) {}
}

// ── HTML inputs ───────────────────────────────────────────────────────────────
function makeInputElems() {
    let defaults = [...R, Vs];
    for (let i = 0; i < 6; i++) {
        let inp = createInput(str(defaults[i]));
        inp.parent(document.querySelector('main'));
        inp.style('width',         '52px');
        inp.style('font-size',     '12px');
        inp.style('padding',       '2px 4px');
        inp.style('border',        '1px solid #bbb');
        inp.style('border-radius', '3px');
        inp.style('text-align',    'right');
        inp.style('position',      'absolute');
        inp.style('box-sizing',    'border-box');
        const idx = i;
        function handler() {
            let v = parseFloat(this.value);
            if (!isNaN(v) && v > 0) {
                if (idx < 5) R[idx] = v; else Vs = v;
                compute();
                redraw();
            }
        }
        inp.elt.addEventListener('change', handler);
        inp.elt.addEventListener('input',  handler);
        inpElems.push(inp);
    }
    repositionInputs();
}

function repositionInputs() {
    let canvas = document.querySelector('canvas');
    if (!canvas) return;
    let rect = canvas.getBoundingClientRect();
    let colW = (cw - 40) / 3;
    // Two rows of 3: row0 y=494, row1 y=530
    for (let i = 0; i < 6; i++) {
        let col = i % 3, row = floor(i / 3);
        let px = rect.left + 20 + col * colW + 34;
        let py = rect.top  + 494 + row * 36 - 13;
        inpElems[i].style('left', px + 'px');
        inpElems[i].style('top',  py + 'px');
    }
}

// ── Compute ───────────────────────────────────────────────────────────────────
function compute() {
    let r1 = R[0], r2 = R[1], r3 = R[2], r4 = R[3], r5 = R[4];
    // Delta: R1(A-B), R2(A-C), R5(B-C)   →   Wye centre N
    let sum = r1 + r2 + r5;
    Ra  = (r1 * r2) / sum;   // N → A
    Rb  = (r1 * r5) / sum;   // N → B
    Rc  = (r2 * r5) / sum;   // N → C
    Rs1 = Rb + r3;            // N-B-D path
    Rs2 = Rc + r4;            // N-C-D path
    Rpar = (Rs1 * Rs2) / (Rs1 + Rs2);
    Req  = Ra + Rpar;
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function draw() {
    background(COL_BG);
    drawTitle();
    drawDiagPanel();
    drawCircuitStep();
    drawLogPanel();
    drawExplanation();
    drawInputPanel();
    drawNavButtons();
    drawTimeline();
}

// ── Title ─────────────────────────────────────────────────────────────────────
function drawTitle() {
    noStroke(); textAlign(CENTER, TOP);
    textSize(19); textStyle(BOLD); fill(30);
    text('Bridge Circuit Simplification', cw / 2, 10);
    textStyle(NORMAL);
    textSize(12); fill(110);
    text('Step-by-step \u0394\u2013Y transformation  \u00B7  6 guided steps', cw / 2, 36);
}

// ── Diagram panel ─────────────────────────────────────────────────────────────
function drawDiagPanel() {
    fill(COL_PANEL); stroke(220); strokeWeight(1);
    rect(dP.x, dP.y, dP.w, dP.h, 8);

    // Step badge
    let bx = dP.x + 10, by = dP.y + 10;
    fill(COL_BTN); noStroke();
    rect(bx, by, 72, 22, 4);
    fill(255); textSize(11); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Step ' + step + ' / ' + (STEPS - 1), bx + 6, by + 11);

    // Step title
    fill(50); textStyle(BOLD); textSize(12); textAlign(LEFT, TOP);
    text(STEP_TITLES[step], bx + 80, by + 5);
    textStyle(NORMAL);
}

// ── Circuit dispatcher ────────────────────────────────────────────────────────
function drawCircuitStep() {
    let cx  = dP.x + dP.w / 2;
    let cy  = dP.y + 36 + (dP.h - 50) / 2;
    let sp  = min(dP.w * 0.265, 100);
    let vsp = min((dP.h - 60) * 0.35, 100);

    if      (step <= 2) drawOriginal(cx, cy, sp, vsp);
    else if (step === 3) drawWye    (cx, cy, sp, vsp);
    else if (step === 4) drawSeries (cx, cy, sp, vsp);
    else                 drawFinal  (cx, cy, sp, vsp);
}

// ── Step 0–2: diamond bridge ──────────────────────────────────────────────────
function drawOriginal(cx, cy, sp, vsp) {
    // Diamond: A=top  B=left  C=right  D=bottom
    let A = { x: cx,      y: cy - vsp };
    let B = { x: cx - sp, y: cy       };
    let C = { x: cx + sp, y: cy       };
    let D = { x: cx,      y: cy + vsp };

    let dCol = (step >= 1) ? COL_DELTA : COL_NEUTRAL;

    // Voltage source left of B, spanning A-level to D-level
    let vsX = cx - sp - 44;
    drawVsCircle(vsX, cy - vsp, vsX, cy + vsp);
    stroke(COL_WIRE); strokeWeight(2);
    line(vsX, cy - vsp, A.x, A.y);
    line(vsX, cy + vsp, D.x, D.y);

    // Resistors
    drawResEdge(A.x, A.y, B.x, B.y, 'R1=' + R[0] + '\u03A9', dCol,       14);
    drawResEdge(A.x, A.y, C.x, C.y, 'R2=' + R[1] + '\u03A9', dCol,      -14);
    drawResEdge(B.x, B.y, D.x, D.y, 'R3=' + R[2] + '\u03A9', COL_NEUTRAL, 14);
    drawResEdge(C.x, C.y, D.x, D.y, 'R4=' + R[3] + '\u03A9', COL_NEUTRAL,-14);
    drawResEdge(B.x, B.y, C.x, C.y, 'R5=' + R[4] + '\u03A9', dCol,      -14);

    // Step 1+: highlight delta triangle
    if (step >= 1) {
        noFill();
        stroke(COL_DELTA[0], COL_DELTA[1], COL_DELTA[2], 50);
        strokeWeight(18); strokeCap(ROUND);
        triangle(A.x, A.y, B.x, B.y, C.x, C.y);
        strokeCap(SQUARE); strokeWeight(2);
    }

    drawBigNode(A.x, A.y, 'A', ABOVE);
    drawBigNode(B.x, B.y, 'B', LEFT);
    drawBigNode(C.x, C.y, 'C', RIGHT);
    drawBigNode(D.x, D.y, 'D', BELOW);

    if (step === 2) {
        noStroke(); fill(COL_WYE); textSize(10); textAlign(CENTER, TOP);
        text("Ra'\u2009=\u2009" + nf(Ra,0,2) + '\u03A9   Rb\u2019=\u2009' + nf(Rb,0,2) +
             '\u03A9   Rc\u2019=\u2009' + nf(Rc,0,2) + '\u03A9', cx, cy + vsp + 16);
    }
}

// ── Step 3: wye-replaced ──────────────────────────────────────────────────────
function drawWye(cx, cy, sp, vsp) {
    let A = { x: cx,          y: cy - vsp       };
    let B = { x: cx - sp,     y: cy + vsp * 0.4 };
    let C = { x: cx + sp,     y: cy + vsp * 0.4 };
    let D = { x: cx,          y: cy + vsp       };
    let N = { x: cx,          y: cy - vsp * 0.15 };

    let vsX = cx - sp - 44;
    drawVsCircle(vsX, cy - vsp, vsX, cy + vsp);
    stroke(COL_WIRE); strokeWeight(2);
    line(vsX, cy - vsp, A.x, A.y);
    line(vsX, cy + vsp, D.x, D.y);

    drawResEdge(N.x, N.y, A.x, A.y, "Ra'=" + nf(Ra,0,1) + '\u03A9', COL_WYE,     12);
    drawResEdge(N.x, N.y, B.x, B.y, "Rb'=" + nf(Rb,0,1) + '\u03A9', COL_WYE,    -12);
    drawResEdge(N.x, N.y, C.x, C.y, "Rc'=" + nf(Rc,0,1) + '\u03A9', COL_WYE,     12);
    drawResEdge(B.x, B.y, D.x, D.y, 'R3=' + R[2] + '\u03A9',        COL_NEUTRAL,  14);
    drawResEdge(C.x, C.y, D.x, D.y, 'R4=' + R[3] + '\u03A9',        COL_NEUTRAL, -14);

    drawBigNode(A.x, A.y, 'A', ABOVE);
    drawBigNode(B.x, B.y, 'B', LEFT);
    drawBigNode(C.x, C.y, 'C', RIGHT);
    drawBigNode(D.x, D.y, 'D', BELOW);
    drawWyeNode(N.x, N.y, 'N');
}

// ── Step 4: series-combined H-bridge ─────────────────────────────────────────
function drawSeries(cx, cy, sp, vsp) {
    let srcX  = cx - sp * 0.98;
    let srcY1 = cy - vsp * 0.48;
    let srcY2 = cy + vsp * 0.48;

    drawVsCircle(srcX, srcY1, srcX, srcY2);

    // Wire from source+ down to mid level, then right to N via Ra'
    let Alx = srcX, Aly = cy;
    let Nx  = cx - sp * 0.25, Ny = cy;
    let topY = cy - vsp * 0.42;
    let botY = cy + vsp * 0.42;
    let Rx   = cx + sp * 0.72;

    stroke(COL_WIRE); strokeWeight(2);
    line(srcX, srcY1, Alx, srcY1);   // top rail left
    line(Alx, srcY1, Alx, Aly);      // wire down to mid

    drawResEdge(Alx, Aly, Nx, Ny, "Ra'=" + nf(Ra,0,1) + '\u03A9', COL_WYE, -14);

    stroke(COL_WIRE); strokeWeight(2);
    line(Nx, Ny, Nx, topY);
    line(Nx, Ny, Nx, botY);

    drawResEdge(Nx, topY, Rx, topY, 'Rs1=' + nf(Rs1,0,1) + '\u03A9', COL_SERIES, -14);
    drawResEdge(Nx, botY, Rx, botY, 'Rs2=' + nf(Rs2,0,1) + '\u03A9', COL_SERIES,  14);

    stroke(COL_WIRE); strokeWeight(2);
    line(Rx, topY, Rx, cy);
    line(Rx, botY, Rx, cy);
    line(Rx, cy,   Rx, srcY2);
    line(Rx, srcY2, srcX, srcY2);

    drawBigNode(Alx, Aly, 'A', ABOVE);
    drawWyeNode(Nx,  Ny,  'N');
    drawBigNode(Rx,  cy,  'D', BELOW);

    noStroke(); fill(COL_SERIES); textSize(10); textAlign(LEFT, TOP);
    text('Rs1 = Rb\u2019+R3 = ' + nf(Rs1,0,2) + '\u03A9', Nx + 4, topY - 22);
    text('Rs2 = Rc\u2019+R4 = ' + nf(Rs2,0,2) + '\u03A9', Nx + 4, botY + 8);
}

// ── Step 5: final Req ─────────────────────────────────────────────────────────
function drawFinal(cx, cy, sp, vsp) {
    let srcX  = cx - sp * 0.55;
    let srcY1 = cy - vsp * 0.38;
    let srcY2 = cy + vsp * 0.38;
    let rX2   = cx + sp * 0.55;

    drawVsCircle(srcX - 28, srcY1, srcX - 28, srcY2);
    stroke(COL_WIRE); strokeWeight(2);
    line(srcX - 28, srcY1, srcX, srcY1);
    line(srcX, srcY1, srcX, cy);

    drawResEdge(srcX, cy, rX2, cy, 'Req = ' + nf(Req,0,2) + '\u03A9', COL_RESULT, -18);

    stroke(COL_WIRE); strokeWeight(2);
    line(rX2, cy, rX2, srcY2);
    line(rX2, srcY2, srcX - 28, srcY2);

    noStroke();
    fill(COL_RESULT); textSize(17); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('Req = ' + nf(Req,0,2) + ' \u03A9', cx, cy + vsp * 0.58);
    fill(COL_VS); textSize(13);
    text('I = Vs/Req = ' + nf(Vs / Req,0,4) + ' A', cx, cy + vsp * 0.80);
    textStyle(NORMAL);
}

// ── Drawing primitives ────────────────────────────────────────────────────────
const ABOVE = 0, BELOW = 1, LEFT = 2, RIGHT = 3;

function drawResEdge(x1, y1, x2, y2, lbl, col, lblOff) {
    let dx = x2 - x1, dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    if (len < 1) return;
    let ux = dx / len, uy = dy / len, px = -uy, py = ux;

    const sf = 0.28, ef = 0.72;
    stroke(COL_WIRE); strokeWeight(2);
    line(x1, y1, x1 + dx * sf, y1 + dy * sf);
    line(x1 + dx * ef, y1 + dy * ef, x2, y2);

    stroke(col); strokeWeight(2.5); noFill();
    let n = 5, amp = 5;
    let sx = x1 + dx * sf, sy = y1 + dy * sf;
    let sdx = dx * (ef - sf) / n, sdy = dy * (ef - sf) / n;
    beginShape();
    vertex(sx, sy);
    for (let j = 0; j < n; j++) {
        let s = (j % 2 === 0) ? 1 : -1;
        vertex(sx + sdx * (j + 0.5) + px * amp * s,
               sy + sdy * (j + 0.5) + py * amp * s);
    }
    vertex(x1 + dx * ef, y1 + dy * ef);
    endShape();

    if (lbl) {
        let mx = (x1 + x2) / 2 + px * lblOff;
        let my = (y1 + y2) / 2 + py * lblOff;
        noStroke(); fill(col);
        textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(lbl, mx, my);
        textStyle(NORMAL);
    }
}

function drawVsCircle(x1, y1, x2, y2) {
    let vcx = (x1 + x2) / 2, vcy = (y1 + y2) / 2, r = 14;
    stroke(COL_WIRE); strokeWeight(2);
    line(x1, y1, vcx, vcy - r);
    line(vcx, vcy + r, x2, y2);
    noFill(); stroke(COL_VS); strokeWeight(2);
    circle(vcx, vcy, r * 2);
    noStroke(); fill(COL_VS);
    textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('+', vcx, vcy - r * 0.42);
    text('\u2212', vcx, vcy + r * 0.42);
    textStyle(NORMAL);
    textSize(9); textAlign(LEFT, CENTER);
    text(Vs + 'V', vcx + r + 4, vcy);
}

function drawBigNode(x, y, lbl, pos) {
    fill(COL_NODE); noStroke();
    circle(x, y, 13);
    if (lbl) {
        fill(30); textSize(12); textStyle(BOLD);
        if      (pos === ABOVE) { textAlign(CENTER, BOTTOM); text(lbl, x, y - 10); }
        else if (pos === BELOW) { textAlign(CENTER, TOP);    text(lbl, x, y + 10); }
        else if (pos === LEFT)  { textAlign(RIGHT,  CENTER); text(lbl, x - 10, y); }
        else                    { textAlign(LEFT,   CENTER); text(lbl, x + 10, y); }
        textStyle(NORMAL);
    }
}

function drawWyeNode(x, y, lbl) {
    fill(COL_WYE); noStroke();
    circle(x, y, 12);
    fill(30); textSize(12); textStyle(BOLD);
    textAlign(RIGHT, CENTER); text(lbl, x - 9, y);
    textStyle(NORMAL);
}

// ── Log panel ─────────────────────────────────────────────────────────────────
function drawLogPanel() {
    fill(COL_PANEL); stroke(220); strokeWeight(1);
    rect(lP.x, lP.y, lP.w, lP.h, 8);

    noStroke(); fill(50); textSize(12); textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Operations Log', lP.x + 10, lP.y + 10);
    textStyle(NORMAL);

    let r1=R[0], r2=R[1], r3=R[2], r4=R[3], r5=R[4];
    let sum = r1 + r2 + r5;

    const LOG = [
        { title: 'Initial Values',
          lines: ['R1='+r1+'\u03A9  R2='+r2+'\u03A9  R3='+r3+'\u03A9',
                  'R4='+r4+'\u03A9  R5='+r5+'\u03A9  Vs='+Vs+'V',
                  'Cannot reduce by series/parallel.'] },
        { title: 'Delta Identified',
          lines: ['\u0394: R1(A\u2013B), R2(A\u2013C), R5(B\u2013C)',
                  '\u03A3 = '+r1+'+'+r2+'+'+r5+' = '+sum+'\u03A9'] },
        { title: '\u0394\u2192Y Formulas',
          lines: ["Ra' = R1\u00B7R2/\u03A3 = "+nf(Ra,0,2)+'\u03A9',
                  "Rb' = R1\u00B7R5/\u03A3 = "+nf(Rb,0,2)+'\u03A9',
                  "Rc' = R2\u00B7R5/\u03A3 = "+nf(Rc,0,2)+'\u03A9'] },
        { title: 'Y Replaces Delta',
          lines: ['Node N at wye centre.',
                  "N\u2013A: Ra'="+nf(Ra,0,2)+'\u03A9',
                  "N\u2013B: Rb'="+nf(Rb,0,2)+'\u03A9  (then R3 to D)',
                  "N\u2013C: Rc'="+nf(Rc,0,2)+'\u03A9  (then R4 to D)'] },
        { title: 'Series Reduction',
          lines: ['Rs1 = Rb\u2019+R3 = '+nf(Rb,0,1)+'+'+r3+' = '+nf(Rs1,0,2)+'\u03A9',
                  'Rs2 = Rc\u2019+R4 = '+nf(Rc,0,1)+'+'+r4+' = '+nf(Rs2,0,2)+'\u03A9'] },
        { title: 'Final Result',
          lines: ['Rp = Rs1\u2016Rs2 = '+nf(Rpar,0,2)+'\u03A9',
                  "Req = Ra'+Rp = "+nf(Ra,0,2)+'+'+nf(Rpar,0,2),
                  '    = '+nf(Req,0,2)+'\u03A9',
                  'I = '+Vs+'/'+nf(Req,0,2)+' = '+nf(Vs/Req,0,4)+'A'] }
    ];

    let ly = lP.y + 32;
    for (let i = 0; i <= step && i < LOG.length; i++) {
        if (ly > lP.y + lP.h - 10) break;
        let e = LOG[i];
        let active = (i === step);

        if (active) {
            noStroke(); fill(235, 242, 255);
            rect(lP.x + 4, ly - 2, lP.w - 8, e.lines.length * 14 + 22, 4);
        }

        // Step badge
        fill(active ? COL_BTN : [155, 160, 170]); noStroke();
        rect(lP.x + 8, ly + 1, 18, 13, 3);
        fill(255); textSize(9); textAlign(CENTER, CENTER);
        text(i, lP.x + 17, ly + 7.5);

        // Title
        fill(active ? COL_BTN : [80, 80, 90]);
        textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
        text(e.title, lP.x + 32, ly);
        textStyle(NORMAL);
        ly += 16;

        for (let j = 0; j < e.lines.length; j++) {
            fill(active ? [30, 50, 110] : [105, 105, 115]);
            textSize(10); textAlign(LEFT, TOP);
            text(e.lines[j], lP.x + 12, ly, lP.w - 20);
            ly += 14;
        }
        ly += 7;
    }
}

// ── Explanation ───────────────────────────────────────────────────────────────
function drawExplanation() {
    const y0 = 410, h = 60;
    let col = step <= 2 ? COL_DELTA : (step === 5 ? COL_RESULT : COL_WYE);

    noStroke(); fill(col[0], col[1], col[2], 22);
    rect(12, y0, cw - 24, h, 6);
    stroke(col[0], col[1], col[2], 110); strokeWeight(1.5); noFill();
    rect(12, y0, cw - 24, h, 6);

    fill(col); noStroke();
    rect(12, y0, 5, h, 6, 0, 0, 6);

    fill(40); noStroke(); textSize(12); textAlign(LEFT, CENTER);
    text(EXPLANATIONS[step], 26, y0 + h / 2, cw - 52);
}

// ── Input panel ───────────────────────────────────────────────────────────────
function drawInputPanel() {
    const y0 = 480, h = 74;
    noStroke(); fill(COL_PANEL);
    rect(0, y0, cw, h);
    stroke(225); strokeWeight(1);
    line(0, y0, cw, y0);

    noStroke(); fill(95); textSize(11); textAlign(LEFT, TOP);
    text('Edit resistor values to explore different circuits:', 20, y0 + 6);

    let labels = ['R1', 'R2', 'R3', 'R4', 'R5', 'Vs'];
    let units  = ['\u03A9', '\u03A9', '\u03A9', '\u03A9', '\u03A9', 'V'];
    let colW   = (cw - 40) / 3;

    for (let i = 0; i < 6; i++) {
        let col = i % 3, row = floor(i / 3);
        let lx  = 20 + col * colW;
        let ly  = y0 + 22 + row * 36;

        fill(55); textSize(12); textStyle(BOLD); textAlign(RIGHT, CENTER);
        text(labels[i] + ':', lx + 30, ly);
        textStyle(NORMAL);

        // Unit after the 52px-wide input box
        fill(90); textSize(11); textAlign(LEFT, CENTER);
        text(units[i], lx + 34 + 56, ly);
    }
}

// ── Nav buttons ───────────────────────────────────────────────────────────────
function drawNavButtons() {
    drawBtn(btnPrev,  '\u25C0 Prev', step > 0            ? COL_BTN     : COL_BTN_DIS);
    drawBtn(btnNext,  'Next \u25BA', step < STEPS - 1    ? COL_BTN     : COL_BTN_DIS);
    drawBtn(btnReset, 'Reset',        COL_BTN_RED);
}

function drawBtn(b, lbl, col) {
    noStroke(); fill(col);
    rect(b.x, b.y, b.w, b.h, 6);
    fill(255); textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(lbl, b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

// ── Timeline ──────────────────────────────────────────────────────────────────
function drawTimeline() {
    let tlL = tlDots[0].x, tlR = tlDots[STEPS - 1].x, tlY = tlDots[0].y;

    stroke(210); strokeWeight(3);
    line(tlL, tlY, tlR, tlY);
    stroke(COL_BTN); strokeWeight(3);
    line(tlL, tlY, tlL + (tlR - tlL) * step / (STEPS - 1), tlY);

    let abbr = ['Orig', '\u0394 ID', 'Calc Y', 'Y Sub', 'Series', 'Final'];
    for (let i = 0; i < STEPS; i++) {
        let d = tlDots[i];
        let done = (i <= step);
        fill(done ? COL_BTN : [210, 215, 225]); noStroke();
        circle(d.x, d.y, 24);
        fill(done ? 255 : [130, 135, 148]);
        textSize(9); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(i, d.x, d.y);
        textStyle(NORMAL);
        fill(done ? [50, 80, 160] : [140, 145, 158]);
        textSize(9); textAlign(CENTER, TOP);
        text(abbr[i], d.x, d.y + 14);
    }

    // Current step label
    fill(70); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text(STEP_TITLES[step], cw / 2, tlDots[0].y + 30);
}

// ── Mouse ─────────────────────────────────────────────────────────────────────
function mousePressed() {
    if (step > 0 && inBtn(btnPrev))  { step--;          redraw(); return; }
    if (step < STEPS-1 && inBtn(btnNext)) { step++;     redraw(); return; }
    if (inBtn(btnReset))             { step = 0;        redraw(); return; }

    for (let i = 0; i < tlDots.length; i++) {
        let d = tlDots[i];
        if (dist(mouseX, mouseY, d.x, d.y) < 15) { step = i; redraw(); return; }
    }
}

function mouseMoved() { redraw(); }

function inBtn(b) {
    return mouseX >= b.x && mouseX <= b.x + b.w &&
           mouseY >= b.y && mouseY <= b.y + b.h;
}

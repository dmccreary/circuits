'use strict';

// ── Palette ──────────────────────────────────────────────────────────────────
const COL_BG      = [245, 248, 252];
const COL_PANEL   = [255, 255, 255];
const COL_WIRE    = [50,  55,  70];
const COL_NODE    = [40, 100, 200];
const COL_DELTA   = [210,  65,  45];
const COL_WYE     = [25,  150,  75];
const COL_NEUTRAL = [70,   70,  80];
const COL_SERIES  = [195, 135,  25];
const COL_RESULT  = [30,  100, 200];
const COL_VS      = [180,  50,  50];
const COL_BTN     = [50,  110, 220];
const COL_BTN_DIS = [170, 175, 185];
const COL_BTN_RED = [195,  60,  60];

// ── State ─────────────────────────────────────────────────────────────────────
let R  = [10, 30, 20, 40, 50];
let Vs = 12;
const STEPS = 6;
let step = 0;

let Ra, Rb, Rc, Rs1, Rs2, Rpar, Req;

// ── Canvas ────────────────────────────────────────────────────────────────────
let cw;
const canvasH = 720;

// ── Layout ────────────────────────────────────────────────────────────────────
let dP, lP;
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

// Short, one-sentence explanations that fit in the pill without wrapping badly
const EXPLANATIONS = [
    'This bridge cannot be simplified using series or parallel rules alone. A Delta-to-Wye (\u0394\u2192Y) transformation is required to unlock the reduction.',
    'R1(A\u2013B), R2(A\u2013C), and R5(B\u2013C) form a \u0394 triangle at nodes A, B, C. Converting this loop into a Y network gives us series/parallel paths.',
    'Each Y resistor = product of its two adjacent \u0394 resistors \u00F7 the sum of all three. Compute Ra\u2019, Rb\u2019, Rc\u2019 and introduce center node N.',
    'The delta is removed. N now connects to A (Ra\u2019), B (Rb\u2019), and C (Rc\u2019). R3 and R4 remain, linking B and C to node D.',
    'Rb\u2019 and R3 are in series on path B\u2013D (same current). Rc\u2019 and R4 are in series on path C\u2013D. Combine each pair into Rs1 and Rs2.',
    'Rs1 and Rs2 are in parallel between N and D. Ra\u2019 is in series from A to N. Final: Req = Ra\u2019 + (Rs1 \u2016 Rs2).'
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

// ── Layout constants ──────────────────────────────────────────────────────────
//
//   y=8   : page title
//   y=36  : subtitle
//   y=54  : step header bar  (h=32)  ← step badge + title, full width
//   y=90  : two-column panels         ← diagram  |  log
//   y=416 : explanation pill  (h=76)
//   y=498 : input panel       (h=76)
//   y=582 : nav buttons       (h=36)
//   y=630 : timeline          (h=66)
//   canvasH = 720
//
const STEP_HDR_Y  = 54;
const PANELS_Y    = 90;
const PANELS_H    = 322;    // diagram & log height
const EXPL_Y      = 418;
const EXPL_H      = 76;
const INP_Y       = 502;
const INP_H       = 72;
const BTN_Y       = 582;
const BTN_H       = 36;
const TL_DOT_Y    = 644;

function buildLayout() {
    let pw = floor(cw * 0.555);
    dP = { x: 12,       y: PANELS_Y, w: pw,              h: PANELS_H };
    lP = { x: pw + 22,  y: PANELS_Y, w: cw - pw - 34,   h: PANELS_H };

    // Three equal-width buttons, centred
    let bw = 100, bh = BTN_H, gap = 16;
    let totalBW = bw * 3 + gap * 2;
    let bx0 = floor((cw - totalBW) / 2);
    btnPrev  = { x: bx0,           y: BTN_Y, w: bw, h: bh };
    btnNext  = { x: bx0 + bw+gap,  y: BTN_Y, w: bw, h: bh };
    btnReset = { x: bx0 + (bw+gap)*2, y: BTN_Y, w: bw, h: bh };

    // Timeline dots
    tlDots = [];
    let tlL = cw * 0.08, tlR = cw * 0.92;
    for (let i = 0; i < STEPS; i++) {
        tlDots.push({ x: tlL + (tlR - tlL) * i / (STEPS - 1), y: TL_DOT_Y });
    }
}

function reportHeight() {
    try { window.parent.postMessage({ type: 'microsim-height', height: canvasH }, '*'); } catch (e) {}
}

// ── HTML inputs ───────────────────────────────────────────────────────────────
// Layout: 2 rows × 3 cols, centred inside the input panel.
// Each cell: label(28px) + gap(4px) + input(56px) + gap(4px) + unit(16px) = 108px
// 3 cols → 324px + 2 × 20px gap = 364px.  We just use colW = (cw-40)/3.

function makeInputElems() {
    let defaults = [...R, Vs];
    for (let i = 0; i < 6; i++) {
        let inp = createInput(str(defaults[i]));
        inp.parent(document.querySelector('main'));
        inp.style('width',         '56px');
        inp.style('font-size',     '13px');
        inp.style('padding',       '3px 5px');
        inp.style('border',        '1px solid #c0c4cc');
        inp.style('border-radius', '4px');
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
    let rect   = canvas.getBoundingClientRect();
    let colW   = (cw - 40) / 3;
    // Row centres: INP_Y + 22 + 0*36 = INP_Y+22  (row0)
    //              INP_Y + 22 + 1*36 = INP_Y+58  (row1)
    // Input box is 28px tall → top = rowCY - 14
    let rowCY  = [INP_Y + 24, INP_Y + 60];
    // label is 28px wide (right-aligned), then 4px gap, then input box starts
    let inpOffX = 20 + 28 + 4;      // 52px from left of col
    for (let i = 0; i < 6; i++) {
        let col = i % 3, row = floor(i / 3);
        let px  = rect.left + 20 + col * colW + inpOffX;
        let py  = rect.top  + rowCY[row] - 14;
        inpElems[i].style('left', px + 'px');
        inpElems[i].style('top',  py + 'px');
    }
}

// ── Compute ───────────────────────────────────────────────────────────────────
function compute() {
    let r1 = R[0], r2 = R[1], r3 = R[2], r4 = R[3], r5 = R[4];
    let sum = r1 + r2 + r5;
    Ra  = (r1 * r2) / sum;
    Rb  = (r1 * r5) / sum;
    Rc  = (r2 * r5) / sum;
    Rs1 = Rb + r3;
    Rs2 = Rc + r4;
    Rpar = (Rs1 * Rs2) / (Rs1 + Rs2);
    Req  = Ra + Rpar;
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function draw() {
    background(COL_BG);
    drawTitle();
    drawStepHeader();
    drawDiagPanel();
    drawCircuitStep();
    drawLogPanel();
    drawExplanation();
    drawInputPanel();
    drawNavButtons();
    drawTimeline();
}

// ── Page title ────────────────────────────────────────────────────────────────
function drawTitle() {
    noStroke(); textAlign(CENTER, TOP);
    textSize(19); textStyle(BOLD); fill(30);
    text('Bridge Circuit Simplification', cw / 2, 8);
    textStyle(NORMAL);
    textSize(12); fill(110);
    text('Step-by-step \u0394\u2013Y transformation  \u00B7  6 guided steps', cw / 2, 34);
}

// ── Step header bar (full width, above panels) ────────────────────────────────
function drawStepHeader() {
    // Subtle strip
    noStroke(); fill(235, 240, 252);
    rect(0, STEP_HDR_Y, cw, 32);
    stroke(215, 220, 235); strokeWeight(1);
    line(0, STEP_HDR_Y, cw, STEP_HDR_Y);
    line(0, STEP_HDR_Y + 32, cw, STEP_HDR_Y + 32);

    // Badge "Step X / 5"
    let bx = 16, by = STEP_HDR_Y + 5;
    fill(COL_BTN); noStroke();
    rect(bx, by, 76, 22, 4);
    fill(255); textSize(11); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Step ' + step + ' / ' + (STEPS - 1), bx + 7, by + 11);
    textStyle(NORMAL);

    // Title
    fill(40); textSize(13); textStyle(BOLD); textAlign(LEFT, CENTER);
    text(STEP_TITLES[step], bx + 86, STEP_HDR_Y + 16);
    textStyle(NORMAL);
}

// ── Diagram panel (white box, no internal title) ──────────────────────────────
function drawDiagPanel() {
    fill(COL_PANEL); stroke(218); strokeWeight(1);
    rect(dP.x, dP.y, dP.w, dP.h, 8);
}

// ── Circuit step dispatcher ───────────────────────────────────────────────────
function drawCircuitStep() {
    // Centre the circuit inside the clean panel, with equal padding
    let cx  = dP.x + dP.w / 2;
    let cy  = dP.y + dP.h / 2;
    let sp  = min(dP.w * 0.265, 102);
    let vsp = min(dP.h  * 0.33,  98);

    if      (step <= 2) drawOriginal(cx, cy, sp, vsp);
    else if (step === 3) drawWye    (cx, cy, sp, vsp);
    else if (step === 4) drawSeries (cx, cy, sp, vsp);
    else                 drawFinal  (cx, cy, sp, vsp);
}

// ── Step 0–2: diamond bridge ──────────────────────────────────────────────────
function drawOriginal(cx, cy, sp, vsp) {
    let A = { x: cx,      y: cy - vsp };
    let B = { x: cx - sp, y: cy       };
    let C = { x: cx + sp, y: cy       };
    let D = { x: cx,      y: cy + vsp };

    let dCol = (step >= 1) ? COL_DELTA : COL_NEUTRAL;

    let vsX = cx - sp - 46;
    drawVsCircle(vsX, cy - vsp, vsX, cy + vsp);
    stroke(COL_WIRE); strokeWeight(2);
    line(vsX, cy - vsp, A.x, A.y);
    line(vsX, cy + vsp, D.x, D.y);

    drawResEdge(A.x, A.y, B.x, B.y, 'R1=' + R[0] + '\u03A9', dCol,        14);
    drawResEdge(A.x, A.y, C.x, C.y, 'R2=' + R[1] + '\u03A9', dCol,       -14);
    drawResEdge(B.x, B.y, D.x, D.y, 'R3=' + R[2] + '\u03A9', COL_NEUTRAL,  14);
    drawResEdge(C.x, C.y, D.x, D.y, 'R4=' + R[3] + '\u03A9', COL_NEUTRAL, -14);
    drawResEdge(B.x, B.y, C.x, C.y, 'R5=' + R[4] + '\u03A9', dCol,       -14);

    if (step >= 1) {
        noFill();
        stroke(COL_DELTA[0], COL_DELTA[1], COL_DELTA[2], 48);
        strokeWeight(20); strokeCap(ROUND);
        triangle(A.x, A.y, B.x, B.y, C.x, C.y);
        strokeCap(SQUARE); strokeWeight(2);
    }

    drawBigNode(A.x, A.y, 'A', ABOVE);
    drawBigNode(B.x, B.y, 'B', LEFT);
    drawBigNode(C.x, C.y, 'C', RIGHT);
    drawBigNode(D.x, D.y, 'D', BELOW);

    if (step === 2) {
        noStroke(); fill(COL_WYE); textSize(10); textStyle(BOLD);
        textAlign(CENTER, TOP);
        text("Ra'=" + nf(Ra,0,2) + '\u03A9     Rb\'=' + nf(Rb,0,2) +
             '\u03A9     Rc\'=' + nf(Rc,0,2) + '\u03A9', cx, cy + vsp + 14);
        textStyle(NORMAL);
    }
}

// ── Step 3: wye-replaced ──────────────────────────────────────────────────────
function drawWye(cx, cy, sp, vsp) {
    let A = { x: cx,        y: cy - vsp       };
    let B = { x: cx - sp,   y: cy + vsp * 0.4 };
    let C = { x: cx + sp,   y: cy + vsp * 0.4 };
    let D = { x: cx,        y: cy + vsp       };
    let N = { x: cx,        y: cy - vsp * 0.12 };

    let vsX = cx - sp - 46;
    drawVsCircle(vsX, cy - vsp, vsX, cy + vsp);
    stroke(COL_WIRE); strokeWeight(2);
    line(vsX, cy - vsp, A.x, A.y);
    line(vsX, cy + vsp, D.x, D.y);

    drawResEdge(N.x, N.y, A.x, A.y, "Ra'=" + nf(Ra,0,1) + '\u03A9', COL_WYE,      12);
    drawResEdge(N.x, N.y, B.x, B.y, "Rb'=" + nf(Rb,0,1) + '\u03A9', COL_WYE,     -12);
    drawResEdge(N.x, N.y, C.x, C.y, "Rc'=" + nf(Rc,0,1) + '\u03A9', COL_WYE,      12);
    drawResEdge(B.x, B.y, D.x, D.y, 'R3=' + R[2] + '\u03A9',        COL_NEUTRAL,   14);
    drawResEdge(C.x, C.y, D.x, D.y, 'R4=' + R[3] + '\u03A9',        COL_NEUTRAL,  -14);

    drawBigNode(A.x, A.y, 'A', ABOVE);
    drawBigNode(B.x, B.y, 'B', LEFT);
    drawBigNode(C.x, C.y, 'C', RIGHT);
    drawBigNode(D.x, D.y, 'D', BELOW);
    drawWyeNode(N.x, N.y, 'N');
}

// ── Step 4: series H-bridge ───────────────────────────────────────────────────
function drawSeries(cx, cy, sp, vsp) {
    let srcX  = cx - sp;
    let srcY1 = cy - vsp * 0.46;
    let srcY2 = cy + vsp * 0.46;

    drawVsCircle(srcX, srcY1, srcX, srcY2);

    let Nx  = cx - sp * 0.22, Ny = cy;
    let topY = cy - vsp * 0.40;
    let botY = cy + vsp * 0.40;
    let Rx   = cx + sp * 0.72;

    stroke(COL_WIRE); strokeWeight(2);
    line(srcX, srcY1, srcX, Ny);          // wire down from source+ to mid

    drawResEdge(srcX, Ny, Nx, Ny, "Ra'=" + nf(Ra,0,1) + '\u03A9', COL_WYE, -14);

    stroke(COL_WIRE); strokeWeight(2);
    line(Nx, Ny, Nx, topY);
    line(Nx, Ny, Nx, botY);

    drawResEdge(Nx, topY, Rx, topY, 'Rs1=' + nf(Rs1,0,1) + '\u03A9', COL_SERIES, -14);
    drawResEdge(Nx, botY, Rx, botY, 'Rs2=' + nf(Rs2,0,1) + '\u03A9', COL_SERIES,  14);

    stroke(COL_WIRE); strokeWeight(2);
    line(Rx, topY, Rx, Ny);
    line(Rx, botY, Rx, Ny);
    line(Rx, Ny,   Rx, srcY2);
    line(Rx, srcY2, srcX, srcY2);

    drawBigNode(srcX, Ny, 'A', LEFT);
    drawWyeNode(Nx, Ny, 'N');
    drawBigNode(Rx, Ny, 'D', RIGHT);

    noStroke(); fill(COL_SERIES); textSize(10); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Rs1 = Rb\u2019+R3 = ' + nf(Rs1,0,2) + '\u03A9', Nx + 4, topY - 20);
    text('Rs2 = Rc\u2019+R4 = ' + nf(Rs2,0,2) + '\u03A9', Nx + 4, botY +  6);
    textStyle(NORMAL);
}

// ── Step 5: final Req ─────────────────────────────────────────────────────────
function drawFinal(cx, cy, sp, vsp) {
    let srcX  = cx - sp * 0.52;
    let srcY1 = cy - vsp * 0.36;
    let srcY2 = cy + vsp * 0.36;
    let rX2   = cx + sp * 0.52;

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
    text('Req = ' + nf(Req,0,2) + ' \u03A9', cx, cy + vsp * 0.55);
    fill(COL_VS); textSize(13);
    text('I = Vs / Req = ' + nf(Vs / Req,0,4) + ' A', cx, cy + vsp * 0.78);
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
    fill(COL_NODE); noStroke(); circle(x, y, 13);
    if (lbl) {
        fill(30); textSize(12); textStyle(BOLD);
        if      (pos === ABOVE) { textAlign(CENTER, BOTTOM); text(lbl, x, y - 10); }
        else if (pos === BELOW) { textAlign(CENTER, TOP);    text(lbl, x, y + 10); }
        else if (pos === LEFT)  { textAlign(RIGHT,  CENTER); text(lbl, x - 11, y); }
        else                    { textAlign(LEFT,   CENTER); text(lbl, x + 11, y); }
        textStyle(NORMAL);
    }
}

function drawWyeNode(x, y, lbl) {
    fill(COL_WYE); noStroke(); circle(x, y, 12);
    fill(30); textSize(12); textStyle(BOLD);
    textAlign(RIGHT, CENTER); text(lbl, x - 10, y);
    textStyle(NORMAL);
}

// ── Log panel ─────────────────────────────────────────────────────────────────
function drawLogPanel() {
    fill(COL_PANEL); stroke(218); strokeWeight(1);
    rect(lP.x, lP.y, lP.w, lP.h, 8);

    noStroke(); fill(50); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Operations Log', lP.x + 10, lP.y + 10);
    textStyle(NORMAL);

    // Thin divider under header
    stroke(230); strokeWeight(1);
    line(lP.x + 8, lP.y + 28, lP.x + lP.w - 8, lP.y + 28);

    let r1=R[0], r2=R[1], r3=R[2], r4=R[3], r5=R[4], sum=r1+r2+r5;
    const LOG = [
        { title: 'Initial Values',
          lines: ['R1=' + r1 + '\u03A9,  R2=' + r2 + '\u03A9,  R3=' + r3 + '\u03A9',
                  'R4=' + r4 + '\u03A9,  R5=' + r5 + '\u03A9,  Vs=' + Vs + 'V',
                  '\u2192 Cannot reduce by series/parallel alone.'] },
        { title: 'Delta Identified',
          lines: ['\u0394: R1(A\u2013B), R2(A\u2013C), R5(B\u2013C)',
                  '\u03A3 = ' + r1 + ' + ' + r2 + ' + ' + r5 + ' = ' + sum + '\u03A9'] },
        { title: '\u0394\u2192Y Formulas',
          lines: ["Ra\u2019 = R1\u00B7R2 / \u03A3 = " + nf(Ra,0,2) + '\u03A9',
                  "Rb\u2019 = R1\u00B7R5 / \u03A3 = " + nf(Rb,0,2) + '\u03A9',
                  "Rc\u2019 = R2\u00B7R5 / \u03A3 = " + nf(Rc,0,2) + '\u03A9'] },
        { title: 'Y Replaces Delta',
          lines: ['Center node N introduced.',
                  "N\u2013A: Ra\u2019 = " + nf(Ra,0,2) + '\u03A9',
                  "N\u2013B: Rb\u2019 = " + nf(Rb,0,2) + '\u03A9  (+ R3\u2192D)',
                  "N\u2013C: Rc\u2019 = " + nf(Rc,0,2) + '\u03A9  (+ R4\u2192D)'] },
        { title: 'Series Reduction',
          lines: ['Rs1 = Rb\u2019 + R3 = ' + nf(Rb,0,1) + ' + ' + r3 + ' = ' + nf(Rs1,0,2) + '\u03A9',
                  'Rs2 = Rc\u2019 + R4 = ' + nf(Rc,0,1) + ' + ' + r4 + ' = ' + nf(Rs2,0,2) + '\u03A9'] },
        { title: 'Final Result',
          lines: ['Rp = Rs1 \u2016 Rs2 = ' + nf(Rpar,0,2) + '\u03A9',
                  "Req = Ra\u2019 + Rp = " + nf(Ra,0,2) + ' + ' + nf(Rpar,0,2) + ' = ' + nf(Req,0,2) + '\u03A9',
                  'I = Vs / Req = ' + nf(Vs / Req,0,4) + ' A'] }
    ];

    let ly = lP.y + 34;
    for (let i = 0; i <= step && i < LOG.length; i++) {
        if (ly > lP.y + lP.h - 10) break;
        let e      = LOG[i];
        let active = (i === step);

        // Active highlight row
        if (active) {
            noStroke(); fill(234, 241, 255);
            rect(lP.x + 4, ly - 2, lP.w - 8, e.lines.length * 14 + 22, 4);
        }

        // Step badge
        fill(active ? COL_BTN : [160, 165, 175]); noStroke();
        rect(lP.x + 8, ly + 2, 18, 13, 3);
        fill(255); textSize(9); textAlign(CENTER, CENTER);
        text(i, lP.x + 17, ly + 8.5);

        // Entry title
        fill(active ? COL_BTN : [78, 80, 92]);
        textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
        text(e.title, lP.x + 32, ly);
        textStyle(NORMAL);
        ly += 16;

        // Entry lines
        for (let j = 0; j < e.lines.length; j++) {
            fill(active ? [28, 48, 108] : [102, 104, 114]);
            textSize(10); textAlign(LEFT, TOP);
            text(e.lines[j], lP.x + 12, ly, lP.w - 20);
            ly += 14;
        }
        ly += 8;
    }
}

// ── Explanation pill ──────────────────────────────────────────────────────────
function drawExplanation() {
    let col = (step <= 2) ? COL_DELTA : (step === 5 ? COL_RESULT : COL_WYE);

    // Card bg
    noStroke(); fill(col[0], col[1], col[2], 20);
    rect(12, EXPL_Y, cw - 24, EXPL_H, 6);
    // Border
    stroke(col[0], col[1], col[2], 105); strokeWeight(1.5); noFill();
    rect(12, EXPL_Y, cw - 24, EXPL_H, 6);
    // Left accent
    fill(col); noStroke();
    rect(12, EXPL_Y, 5, EXPL_H, 6, 0, 0, 6);

    // Text — p5's text(str, x, y, w, h) clips to the box
    fill(38); noStroke(); textSize(12); textAlign(LEFT, TOP);
    text(EXPLANATIONS[step], 26, EXPL_Y + 12, cw - 54, EXPL_H - 16);
}

// ── Input panel ───────────────────────────────────────────────────────────────
function drawInputPanel() {
    // Panel background (full width strip)
    noStroke(); fill(COL_PANEL);
    rect(0, INP_Y, cw, INP_H);
    stroke(222); strokeWeight(1);
    line(0, INP_Y,         cw, INP_Y);
    line(0, INP_Y + INP_H, cw, INP_Y + INP_H);

    // Header
    noStroke(); fill(88); textSize(11); textAlign(LEFT, TOP);
    text('Edit values to explore:', 20, INP_Y + 6);

    let labels = ['R1', 'R2', 'R3', 'R4', 'R5', 'Vs'];
    let units  = ['\u03A9', '\u03A9', '\u03A9', '\u03A9', '\u03A9', 'V'];
    let colW   = (cw - 40) / 3;
    let rowCY  = [INP_Y + 24, INP_Y + 60];

    for (let i = 0; i < 6; i++) {
        let col = i % 3, row = floor(i / 3);
        let lx  = 20 + col * colW;
        let ly  = rowCY[row];

        // Label (right-aligned, 28px wide, ending at lx+28)
        fill(52); textSize(13); textStyle(BOLD); textAlign(RIGHT, CENTER);
        text(labels[i] + ':', lx + 28, ly);
        textStyle(NORMAL);

        // Unit (left-aligned, right of the 56px input box + 4px gap)
        fill(85); textSize(12); textAlign(LEFT, CENTER);
        text(units[i], lx + 28 + 4 + 56 + 4, ly);
    }
}

// ── Nav buttons ───────────────────────────────────────────────────────────────
function drawNavButtons() {
    drawBtn(btnPrev,  '\u25C0  Prev', step > 0         ? COL_BTN     : COL_BTN_DIS);
    drawBtn(btnNext,  'Next  \u25BA', step < STEPS - 1 ? COL_BTN     : COL_BTN_DIS);
    drawBtn(btnReset, 'Reset',         COL_BTN_RED);
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
    const DOT_R = 14;      // radius for 28px diameter circles
    const LBL_Y = TL_DOT_Y + DOT_R + 8;

    let tlL = tlDots[0].x, tlR = tlDots[STEPS - 1].x;

    // Track
    stroke(210); strokeWeight(3);
    line(tlL, TL_DOT_Y, tlR, TL_DOT_Y);
    // Progress fill
    stroke(COL_BTN); strokeWeight(3);
    line(tlL, TL_DOT_Y, tlL + (tlR - tlL) * step / (STEPS - 1), TL_DOT_Y);

    let abbr = ['Orig.', '\u0394 ID', 'Y Calc', 'Y Sub', 'Series', 'Final'];
    for (let i = 0; i < STEPS; i++) {
        let d    = tlDots[i];
        let done = (i <= step);
        let curr = (i === step);

        // Outer ring for current step
        if (curr) {
            fill(COL_BTN[0], COL_BTN[1], COL_BTN[2], 40); noStroke();
            circle(d.x, TL_DOT_Y, (DOT_R + 6) * 2);
        }

        // Dot
        fill(done ? COL_BTN : [212, 216, 226]); noStroke();
        circle(d.x, TL_DOT_Y, DOT_R * 2);

        // Step number
        fill(done ? 255 : [128, 133, 148]);
        textSize(10); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(i, d.x, TL_DOT_Y);
        textStyle(NORMAL);

        // Abbreviation label below dot
        fill(done ? [42, 72, 155] : [138, 143, 158]);
        textSize(9); textAlign(CENTER, TOP);
        text(abbr[i], d.x, LBL_Y);
    }

    // Current step description centred below labels
    fill(62); noStroke(); textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
    text('Step ' + step + ':  ' + STEP_TITLES[step], cw / 2, LBL_Y + 16);
    textStyle(NORMAL);
}

// ── Mouse ─────────────────────────────────────────────────────────────────────
function mousePressed() {
    if (step > 0 && inBtn(btnPrev))       { step--;  redraw(); return; }
    if (step < STEPS-1 && inBtn(btnNext)) { step++;  redraw(); return; }
    if (inBtn(btnReset))                  { step = 0; redraw(); return; }

    for (let i = 0; i < tlDots.length; i++) {
        if (dist(mouseX, mouseY, tlDots[i].x, TL_DOT_Y) < 18) {
            step = i; redraw(); return;
        }
    }
}

function mouseMoved() { redraw(); }

function inBtn(b) {
    return mouseX >= b.x && mouseX <= b.x + b.w &&
           mouseY >= b.y && mouseY <= b.y + b.h;
}

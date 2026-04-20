'use strict';

// ── Palette ───────────────────────────────────────────────────────────────────
const C_BG     = [245, 248, 252];
const C_CARD   = [255, 255, 255];
const C_BORDER = [200, 208, 220];
const C_DARK   = [35,  40,  55];
const C_MUTED  = [115, 125, 145];
const C_ACCENT = [50,  110, 240];
const C_DIAG   = [30,  90,  210];   // blue  – diagonal entries
const C_OFFD   = [200, 55,  50];    // red   – off-diagonal
const C_RHS    = [25,  145, 65];    // green – RHS vector
const C_SOL    = [30,  105, 200];   // solution values
const C_VS     = [195, 55,  55];
const C_WIRE   = [50,  60,  80];
const C_GND    = [90,  100, 120];
const C_NODEF  = [255, 220, 80];
const C_NODES  = [180, 148, 18];
const C_MESH   = [170, 60,  160];

// ── Layout ────────────────────────────────────────────────────────────────────
const M       = 12;       // outer margin
const TOP_Y   = 54;       // top panels start y
const TOP_H   = 322;      // top panels height (increased for label + new segmented pos)
const GAP     = 10;
const MAT_Y   = TOP_Y + TOP_H + GAP;   // 386
const MAT_H   = 368;
const canvasH = MAT_Y + MAT_H + 16;    // 770
const CTRL_W  = 240;      // controls panel width

// Matrix equation cell sizes
const CW = 118, CH = 54;  // cell width, cell height
const VW = 50,  RW = 94;  // variable-vector width, RHS-vector width

// ── State ─────────────────────────────────────────────────────────────────────
let cw;
let Vs = 12, R1 = 2000, R2 = 4000, R3 = 3000;
let method    = 'node';
let buildStep = -1;
let solved    = false;
let showLinks = false;
let sV1 = 0, sV2 = 0, sI1 = 0, sI2 = 0;
let animProg  = 0;

let inputEls = [];
let sliders  = [];
let dragging = null;
let btnBuild, btnSolve, btnLinks;
let segCtrl  = [];

// ── Derived helpers ───────────────────────────────────────────────────────────
function ctrlX() { return cw - M - CTRL_W; }
function cktW()  { return ctrlX() - M - 8; }

function setParam(p, v) {
    if (p === 'Vs') Vs = v;
    else if (p === 'R1') R1 = v;
    else if (p === 'R2') R2 = v;
    else if (p === 'R3') R3 = v;
}

// ── p5.js lifecycle ───────────────────────────────────────────────────────────
function setup() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 900);
    let cnv = createCanvas(cw, canvasH);
    cnv.parent(document.querySelector('main'));
    textFont('Arial');
    buildControls();
    setTimeout(() => {
        repositionInputs();
        window.parent.postMessage({ type: 'microsim-height', height: canvasH }, '*');
    }, 150);
}

function windowResized() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 900);
    resizeCanvas(cw, canvasH);
    buildControls();
    setTimeout(repositionInputs, 60);
}

// ── Control building ──────────────────────────────────────────────────────────
const PARAMS = [
    { param: 'Vs', min: 1,   max: 20,    step: 1,   unit: 'V'  },
    { param: 'R1', min: 100, max: 10000, step: 100, unit: 'Ω'  },
    { param: 'R2', min: 100, max: 10000, step: 100, unit: 'Ω'  },
    { param: 'R3', min: 100, max: 10000, step: 100, unit: 'Ω'  },
];

function currentVal(p) {
    if (p === 'Vs') return Vs;
    if (p === 'R1') return R1;
    if (p === 'R2') return R2;
    return R3;
}

function buildControls() {
    for (let ie of inputEls) ie.el.remove();
    inputEls = [];
    sliders  = [];

    let cx0    = ctrlX();
    let rowH   = 54;
    let firstY = TOP_Y + 62;   // below "Analysis Method" label + seg control
    let trkX   = cx0 + 12;
    let trkW   = CTRL_W - 24;

    PARAMS.forEach((p, i) => {
        let rowY = firstY + i * rowH;
        let val  = currentVal(p.param);

        let el = createInput(String(val), 'number');
        el.attribute('min', p.min);
        el.attribute('max', p.max);
        el.attribute('step', p.step);
        el.style('width', '64px');
        el.style('font-size', '13px');
        el.style('text-align', 'right');
        el.style('border', '1.5px solid #b8c4d4');
        el.style('border-radius', '5px');
        el.style('padding', '3px 5px');
        el.style('position', 'absolute');
        el.style('font-family', 'Arial, sans-serif');
        el.style('color', '#232837');
        el.style('background', '#f9fbfd');
        el.style('box-sizing', 'border-box');
        el.parent(document.body);

        (function(param, step, mn, mx) {
            el.input(function() {
                let v = parseFloat(this.elt.value);
                if (isNaN(v)) return;
                v = constrain(Math.round(v / step) * step, mn, mx);
                setParam(param, v);
                for (let s of sliders) if (s.param === param) s.val = v;
                if (solved) solveSystem();
            });
        })(p.param, p.step, p.min, p.max);

        inputEls.push({ el, param: p.param, rowY });

        sliders.push({
            param: p.param, unit: p.unit,
            min: p.min, max: p.max, step: p.step,
            val, trkX, trkY: rowY + 36, trkW
        });
    });

    // Segmented mode control (below "Analysis Method" label)
    let segW = (CTRL_W - 24) / 2;
    let segY = TOP_Y + 30;   // shifted down to make room for label above
    segCtrl = [
        { x: cx0 + 12,          y: segY, w: segW - 2, h: 28, mode: 'node', label: 'Node Voltage' },
        { x: cx0 + 12 + segW,   y: segY, w: segW - 2, h: 28, mode: 'mesh', label: 'Mesh Current' },
    ];

    // Equal-width buttons at bottom of controls panel
    let btnY = TOP_Y + TOP_H - 36;
    let bw   = floor((CTRL_W - 30) / 3);
    btnBuild = { x: cx0 + 12,           y: btnY, w: bw, h: 28, label: 'Build',  action: 'build' };
    btnSolve = { x: cx0 + 12 + bw + 3,  y: btnY, w: bw, h: 28, label: 'Solve',  action: 'solve' };
    btnLinks = { x: cx0 + 12 + bw*2+6,  y: btnY, w: bw, h: 28, label: 'Links',  action: 'links' };
}

function repositionInputs() {
    let canvasEl = document.querySelector('canvas');
    if (!canvasEl) return;
    let rect = canvasEl.getBoundingClientRect();
    let sx   = rect.left + (window.scrollX || 0);
    let sy   = rect.top  + (window.scrollY || 0);
    let cx0  = ctrlX();

    for (let ie of inputEls) {
        ie.el.position(sx + cx0 + CTRL_W - 78, sy + ie.rowY + 4);
    }
}

// ── draw ──────────────────────────────────────────────────────────────────────
function draw() {
    background(C_BG);

    if (animProg < 1 && buildStep >= 0) animProg = min(animProg + 0.05, 1);

    drawTitle();
    drawCircuitPanel();
    drawControlsPanel();
    drawMatrixPanel();

    if (showLinks && buildStep >= 0) drawCorrespondenceLines();
}

// ── Title bar ─────────────────────────────────────────────────────────────────
function drawTitle() {
    noStroke(); fill(C_DARK);
    textSize(17); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Matrix Equation Builder', M, 10);
    textStyle(NORMAL);
    fill(C_MUTED); textSize(12);
    text(method === 'node'
        ? 'Node Voltage Method  →  [G][V] = [I]'
        : 'Mesh Current Method  →  [Z][I] = [V]', M, 32);
}

// ── Circuit panel ─────────────────────────────────────────────────────────────
function drawCircuitPanel() {
    let pw = cktW(), ph = TOP_H;
    drawCard(M, TOP_Y, pw, ph);

    noStroke(); fill(C_DARK);
    textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Circuit Diagram', M + 12, TOP_Y + 10);
    textStyle(NORMAL);

    let pcx = M + pw / 2;
    let pcy = TOP_Y + ph / 2 + 10;

    let nA   = { x: pcx - 90, y: pcy - 66 };
    let nB   = { x: pcx + 90, y: pcy - 66 };
    let gndY = pcy + 82;
    let midL = pcy + 14;

    stroke(C_WIRE); strokeWeight(2.5);
    line(nA.x, nA.y, nB.x, nB.y);
    line(nA.x, nA.y, nA.x, gndY);
    line(nB.x, nB.y, nB.x, gndY);
    line(nA.x, gndY, nB.x, gndY);

    drawVsrc(nA.x, gndY, midL);
    drawResistorV(nA.x, midL, nA.y, 'R1', -28);
    drawResistorH(nA.x + 14, nA.y, nB.x - 14, nB.y, 'R2');
    drawResistorV(nB.x, nB.y, gndY, 'R3', 20);
    drawGround((nA.x + nB.x) / 2, gndY);

    fill(C_VS); noStroke();
    textSize(12); textStyle(BOLD); textAlign(RIGHT, CENTER);
    text('Vs = ' + Vs + ' V', nA.x - 24, (gndY + midL) / 2);
    textStyle(NORMAL);

    if (method === 'mesh') {
        let mcy = (nA.y + gndY) / 2;
        drawMeshArrow(pcx - 35, mcy, solved ? 'I₁=' + (sI1 * 1000).toFixed(2) + ' mA' : 'I₁');
        drawMeshArrow(pcx + 55, mcy, solved ? 'I₂=' + (sI2 * 1000).toFixed(2) + ' mA' : 'I₂');
    }

    drawNode(nA.x, nA.y, 'V₁', method === 'node' && solved ? sV1 : null, LEFT);
    drawNode(nB.x, nB.y, 'V₂', method === 'node' && solved ? sV2 : null, RIGHT);
}

function drawCard(x, y, w, h, tint) {
    noStroke(); fill(0, 0, 0, 14);
    rect(x + 3, y + 3, w, h, 10);
    fill(tint ? tint : C_CARD);
    stroke(C_BORDER); strokeWeight(1);
    rect(x, y, w, h, 10);
}

function drawVsrc(x, yBot, yTop) {
    let my = (yBot + yTop) / 2, r = 15;
    stroke(C_WIRE); strokeWeight(2.5);
    line(x, yBot, x, my + r);
    line(x, my - r, x, yTop);
    noFill(); stroke(C_VS); strokeWeight(2);
    ellipse(x, my, r * 2, r * 2);
    fill(C_VS); noStroke();
    textSize(12); textAlign(CENTER, CENTER);
    text('+', x, my - 6); text('−', x, my + 6);
}

function drawResistorV(x, y1, y2, label, labelDx) {
    let my = (y1 + y2) / 2, rh = 28;
    stroke(C_WIRE); strokeWeight(2.5);
    line(x, y1, x, my - rh / 2);
    line(x, my + rh / 2, x, y2);
    fill(255); stroke([148, 128, 72]); strokeWeight(1.5);
    rectMode(CENTER); rect(x, my, 14, rh, 2); rectMode(CORNER);
    fill(C_DARK); noStroke();
    textSize(11); textStyle(BOLD);
    textAlign(labelDx < 0 ? RIGHT : LEFT, CENTER);
    text(label, x + labelDx, my); textStyle(NORMAL);
}

function drawResistorH(x1, y, x2, y2, label) {
    let mx = (x1 + x2) / 2, rw = 34;
    stroke(C_WIRE); strokeWeight(2.5);
    line(x1, y, mx - rw / 2, y);
    line(mx + rw / 2, y, x2, y);
    fill(255); stroke([148, 128, 72]); strokeWeight(1.5);
    rectMode(CENTER); rect(mx, y, rw, 14, 2); rectMode(CORNER);
    fill(C_DARK); noStroke();
    textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
    text(label, mx, y + 10); textStyle(NORMAL);
}

function drawGround(x, y) {
    stroke(C_GND); strokeWeight(2);
    line(x - 14, y, x + 14, y);
    line(x - 9, y + 5, x + 9, y + 5);
    line(x - 4, y + 10, x + 4, y + 10);
    noStroke(); fill(C_GND);
    textSize(10); textAlign(CENTER, TOP);
    text('GND', x, y + 13);
}

function drawNode(x, y, label, solvedVal, side) {
    fill(solvedVal !== null ? [30, 170, 70] : C_NODEF);
    stroke(solvedVal !== null ? [20, 130, 55] : C_NODES);
    strokeWeight(2);
    ellipse(x, y, 16, 16);
    noStroke(); fill(C_DARK);
    textSize(14); textStyle(BOLD); textAlign(CENTER, BOTTOM);   // larger label
    text(label, x, y - 8);
    if (solvedVal !== null) {
        fill([20, 130, 55]); textSize(11);
        textAlign(side === LEFT ? RIGHT : LEFT, CENTER);
        text(solvedVal.toFixed(3) + ' V', side === LEFT ? x - 12 : x + 12, y);
    }
    textStyle(NORMAL);
}

function drawMeshArrow(x, y, label) {
    push();
    noFill(); stroke(C_MESH[0], C_MESH[1], C_MESH[2], 180); strokeWeight(1.5);
    arc(x, y, 36, 36, PI * 0.25, PI * 1.6);
    let ax = x + 18 * cos(PI * 1.6), ay = y + 18 * sin(PI * 1.6);
    fill(C_MESH[0], C_MESH[1], C_MESH[2], 180); noStroke();
    triangle(ax - 4, ay - 2, ax + 2, ay - 7, ax + 3, ay + 2);
    fill(C_MESH); textSize(10); textStyle(BOLD); textAlign(CENTER, TOP);
    text(label, x, y + 20); textStyle(NORMAL);
    pop();
}

// ── Controls panel ────────────────────────────────────────────────────────────
function drawControlsPanel() {
    let cx0 = ctrlX();
    drawCard(cx0, TOP_Y, CTRL_W, TOP_H);

    // "Analysis Method" label above segmented control
    noStroke(); fill(C_MUTED);
    textSize(10); textStyle(BOLD); textAlign(CENTER, TOP);
    text('ANALYSIS METHOD', cx0 + CTRL_W / 2, TOP_Y + 12);
    textStyle(NORMAL);

    // Segmented control
    for (let sg of segCtrl) {
        let active = sg.mode === method;
        fill(active ? C_ACCENT : [225, 228, 236]);
        stroke(active ? C_ACCENT : C_BORDER); strokeWeight(1);
        rect(sg.x, sg.y, sg.w, sg.h, 5);
        noStroke(); fill(active ? 255 : C_DARK);
        textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(sg.label, sg.x + sg.w / 2, sg.y + sg.h / 2);
        textStyle(NORMAL);
    }

    // Parameter rows
    let labels = { Vs: 'Vs', R1: 'R1', R2: 'R2', R3: 'R3' };

    for (let s of sliders) {
        let rowY = s.trkY - 36;

        // Row label (left)
        noStroke(); fill(C_DARK);
        textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
        text(labels[s.param], cx0 + 12, rowY + 6);
        textStyle(NORMAL);

        // Formatted unit display (right of label, left of input box)
        let fmtHint = s.param === 'Vs' ? s.val + ' V'
                    : s.val >= 1000 ? (s.val / 1000).toFixed(1) + ' kΩ'
                    : s.val + ' Ω';
        fill(C_MUTED); textSize(11); textAlign(RIGHT, TOP);
        text(fmtHint, cx0 + CTRL_W - 84, rowY + 8);

        // Slider track (full width)
        let frac = (s.val - s.min) / (s.max - s.min);
        let tx = s.trkX, ty = s.trkY, tw = s.trkW;
        stroke(C_BORDER); strokeWeight(3); noFill();
        line(tx, ty, tx + tw, ty);
        stroke(C_ACCENT); strokeWeight(3);
        line(tx, ty, tx + frac * tw, ty);
        fill(255); stroke(C_ACCENT); strokeWeight(2);
        ellipse(tx + frac * tw, ty, 13, 13);
    }

    // Step indicator (above buttons)
    noStroke(); fill(C_MUTED); textSize(10); textAlign(CENTER, TOP);
    if (buildStep >= 0) {
        text('Entry ' + (buildStep + 1) + ' of 4 revealed', cx0 + CTRL_W / 2, TOP_Y + TOP_H - 54);
    } else {
        text('Click Build to start', cx0 + CTRL_W / 2, TOP_Y + TOP_H - 54);
    }

    // Equal-width buttons
    drawBtn(btnBuild, C_ACCENT,      [30, 90, 210]);
    drawBtn(btnSolve, [25, 145, 65], [18, 115, 50]);
    drawBtn(btnLinks, showLinks ? [120, 80, 180] : [150, 158, 172], null);
}

function drawBtn(b, col, hoverCol) {
    if (!b) return;
    let hover = hoverCol && mouseX >= b.x && mouseX <= b.x + b.w &&
                            mouseY >= b.y && mouseY <= b.y + b.h;
    fill(hover ? hoverCol : col); noStroke();
    rect(b.x, b.y, b.w, b.h, 5);
    fill(255); textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(b.label, b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

// ── Matrix panel ──────────────────────────────────────────────────────────────
function drawMatrixPanel() {
    // Slightly tinted card to visually emphasise this section
    drawCard(M, MAT_Y, cw - M * 2, MAT_H, [250, 252, 255]);

    // ── Explanation strip ─────────────────────────────────────────────────────
    noStroke(); fill(C_DARK);
    textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text(method === 'node' ? 'Nodal Analysis:  [G] · [V] = [I]'
                           : 'Mesh Analysis:  [Z] · [I] = [V]',
         M + 18, MAT_Y + 12);
    textStyle(NORMAL);

    fill(C_MUTED); textSize(11); textAlign(LEFT, TOP);
    text(method === 'node'
        ? 'Diagonal G\u2096\u2096 = sum of conductances at node k   ·   Off-diagonal G\u2096\u2097 = −(shared conductance between nodes k and j)'
        : 'Diagonal Z\u2096\u2096 = sum of resistances in loop k   ·   Off-diagonal Z\u2096\u2097 = −(shared resistance between loops k and j)',
         M + 18, MAT_Y + 34);

    // ── Matrix equation ───────────────────────────────────────────────────────
    // Total horizontal span from leftmost bracket tip to rightmost tip: ~526px
    // Centre this within the card.
    let panelW = cw - 2 * M;
    let span   = 526;
    let matX   = M + max(0, floor((panelW - span) / 2)) + 15;

    let eqY  = MAT_Y + 70;    // top of cell rows
    let brkY = eqY - 6;       // top of brackets
    let brkH = 2 * CH + 12;   // bracket height

    // Equation-block x-positions (all measured from matX):
    let gRBX  = matX + 2 * CW + 8;     // G right bracket vert line
    let dotCx = gRBX + 25;             // multiplication dot centre
    let vLBX  = dotCx + 21;            // variable-vector left bracket vert line
    let vCx   = vLBX + 6 + VW / 2;    // variable-vector centre x
    let vRBX  = vLBX + 6 + VW + 6;    // variable-vector right bracket vert line
    let eqCx  = vRBX + 25;            // equals sign centre
    let rLBX  = eqCx + 21;            // RHS left bracket vert line
    let rCx   = rLBX + 6 + RW / 2;   // RHS centre x
    let rRBX  = rLBX + 6 + RW + 6;   // RHS right bracket vert line

    // ── Column labels (consistent 2-line headers above each block) ────────────
    let lbl1Y = brkY - 22;  // upper line of label
    let lbl2Y = brkY - 8;   // lower line (type e.g. "[G]")

    fill(C_MUTED); textSize(9); textAlign(CENTER, BOTTOM);
    text(method === 'node' ? 'Conductance Matrix' : 'Impedance Matrix',
         matX + CW, lbl1Y);
    fill(C_DIAG); textSize(11); textStyle(BOLD);
    text(method === 'node' ? '[G]' : '[Z]', matX + CW, lbl2Y);
    textStyle(NORMAL);

    fill(C_MUTED); textSize(9);
    text(method === 'node' ? 'Node Voltage Vector' : 'Mesh Current Vector', vCx, lbl1Y);
    fill(C_DARK); textSize(11); textStyle(BOLD);
    text(method === 'node' ? '[V]' : '[I]', vCx, lbl2Y);
    textStyle(NORMAL);

    fill(C_MUTED); textSize(9);
    text(method === 'node' ? 'Source Current Vector' : 'Source Voltage Vector', rCx, lbl1Y);
    fill(C_RHS); textSize(11); textStyle(BOLD);
    text(method === 'node' ? '[I]' : '[V]', rCx, lbl2Y);
    textStyle(NORMAL);

    // ── Compute matrix entries ────────────────────────────────────────────────
    let e11s, e12s, e21s, e22s, r1s, r2s, lbl11, lbl12, lbl21, lbl22;
    let varL1, varL2;

    if (method === 'node') {
        let g1 = 1/R1, g2 = 1/R2, g3 = 1/R3;
        e11s = fmtG(g1+g2);  e12s = fmtG(-g2);
        e21s = fmtG(-g2);    e22s = fmtG(g2+g3);
        r1s  = fmtI(Vs/R1);  r2s  = '0 mA';
        lbl11 = '1/R1+1/R2'; lbl12 = '−1/R2';
        lbl21 = '−1/R2';     lbl22 = '1/R2+1/R3';
        varL1 = 'V₁'; varL2 = 'V₂';
    } else {
        e11s = fmtR(R1+R2); e12s = fmtR(-R2);
        e21s = fmtR(-R2);   e22s = fmtR(R2+R3);
        r1s  = Vs + ' V';   r2s  = '0 V';
        lbl11 = 'R1+R2'; lbl12 = '−R2';
        lbl21 = '−R2';   lbl22 = 'R2+R3';
        varL1 = 'I₁'; varL2 = 'I₂';
    }

    let entries = [
        { r:0, c:0, val:e11s, desc:lbl11, color:C_DIAG },
        { r:0, c:1, val:e12s, desc:lbl12, color:C_OFFD },
        { r:1, c:0, val:e21s, desc:lbl21, color:C_OFFD },
        { r:1, c:1, val:e22s, desc:lbl22, color:C_DIAG },
    ];

    // ── Draw brackets ─────────────────────────────────────────────────────────
    drawBracket(matX - 8, brkY, brkH, false);
    drawBracket(gRBX, brkY, brkH, true);
    drawBracket(vLBX, brkY, brkH, false);
    drawBracket(vRBX, brkY, brkH, true);
    drawBracket(rLBX, brkY, brkH, false);
    drawBracket(rRBX, brkY, brkH, true);

    // ── Draw matrix cells ─────────────────────────────────────────────────────
    for (let i = 0; i < entries.length; i++) {
        let e  = entries[i];
        let ex = matX + e.c * CW;
        let ey = eqY  + e.r * CH;
        let show  = buildStep < 0 || i <= buildStep;
        let alpha = show ? (i === buildStep && animProg < 1 ? animProg : 1) : 0;

        if (alpha > 0) {
            noStroke();
            fill(e.color[0], e.color[1], e.color[2], alpha * 30);
            rect(ex + 3, ey + 3, CW - 6, CH - 6, 5);

            // Main value (centred, slightly above middle to leave room for desc)
            fill(e.color[0], e.color[1], e.color[2], alpha * 255);
            textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
            text(e.val, ex + CW / 2, ey + CH / 2 - 9);
            textStyle(NORMAL);

            // Description below value
            textSize(9); fill(e.color[0], e.color[1], e.color[2], alpha * 150);
            textAlign(CENTER, BOTTOM);
            text(e.desc, ex + CW / 2, ey + CH - 6);
        }

        // Cell grid lines
        stroke(C_BORDER); strokeWeight(0.8);
        if (e.c < 1) line(ex + CW, ey + 3, ex + CW, ey + CH - 3);
        if (e.r < 1) line(ex + 3, ey + CH, ex + CW - 3, ey + CH);
        noStroke();
    }

    // ── Operators ────────────────────────────────────────────────────────────
    fill(C_DARK);
    textSize(22); textAlign(CENTER, CENTER);
    text('·', dotCx, eqY + CH);  // dot at matrix vertical centre
    text('=', eqCx,  eqY + CH);  // equals at same y

    // ── Variable vector entries ───────────────────────────────────────────────
    fill(C_DARK); textSize(15); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(varL1, vCx, eqY + CH / 2);
    text(varL2, vCx, eqY + CH + CH / 2);
    textStyle(NORMAL);

    // ── RHS vector entries ────────────────────────────────────────────────────
    for (let ri = 0; ri < 2; ri++) {
        let ry = eqY + ri * CH;
        noStroke();
        fill(C_RHS[0], C_RHS[1], C_RHS[2], 35);
        rect(rLBX + 6, ry + 3, RW - 6, CH - 6, 5);
        fill(C_RHS); textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(ri === 0 ? r1s : r2s, rCx, ry + CH / 2);
        textStyle(NORMAL);
    }

    // ── Legend row ────────────────────────────────────────────────────────────
    let legY = eqY + 2 * CH + 24;
    drawLegendDot(matX,       legY, C_DIAG, 'Diagonal: sum of conductances at node');
    drawLegendDot(matX + 264, legY, C_OFFD, 'Off-diagonal: negative shared conductance');
    drawLegendDot(matX + 528, legY, C_RHS,  'Source vector: injected current (or voltage)');

    // ── Hint / step counter ───────────────────────────────────────────────────
    let hintY = legY + 20;
    fill(C_MUTED); textSize(11); textAlign(CENTER, TOP);
    if (buildStep < 0) {
        text('Click  Build  to construct the matrix [G] and vector [I] entry by entry   ·   Click  Solve  to compute node voltages',
             cw / 2, hintY);
    } else if (buildStep < 3) {
        text('Entry ' + (buildStep + 1) + ' of 4 revealed  ·  Click  Build  again to reveal the next entry',
             cw / 2, hintY);
    } else if (!solved) {
        text('Matrix fully constructed  ·  Click  Solve  to compute ' +
             (method === 'node' ? 'V₁ and V₂' : 'I₁ and I₂'),
             cw / 2, hintY);
    }

    // ── Solution display ──────────────────────────────────────────────────────
    if (solved) {
        let solY = hintY + 4;
        noStroke();
        fill(C_DIAG[0], C_DIAG[1], C_DIAG[2], 20);
        rect(M + 18, solY - 4, cw - M * 2 - 36, 40, 6);

        fill(C_DARK); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
        text('Solution:', M + 26, solY + 6);
        textStyle(NORMAL);

        if (method === 'node') {
            fill(C_SOL); textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
            text('V₁ = ' + sV1.toFixed(3) + ' V', M + 120, solY + 4);
            text('V₂ = ' + sV2.toFixed(3) + ' V', M + 310, solY + 4);
        } else {
            fill(C_MESH); textSize(15); textStyle(BOLD); textAlign(LEFT, TOP);
            text('I₁ = ' + (sI1 * 1000).toFixed(3) + ' mA', M + 120, solY + 4);
            text('I₂ = ' + (sI2 * 1000).toFixed(3) + ' mA', M + 310, solY + 4);
        }
        textStyle(NORMAL);
    }
}

// Square-bracket drawing (x = position of the vertical line)
function drawBracket(x, y, h, isRight) {
    stroke(C_DARK); strokeWeight(2.5); noFill();
    let t = 8;   // tip length
    if (!isRight) {
        line(x - t, y,     x, y);
        line(x,     y,     x, y + h);
        line(x - t, y + h, x, y + h);
    } else {
        line(x + t, y,     x, y);
        line(x,     y,     x, y + h);
        line(x + t, y + h, x, y + h);
    }
}

function drawLegendDot(x, y, col, label) {
    fill(col); noStroke(); ellipse(x + 6, y + 5, 10, 10);
    fill(C_MUTED); textSize(10); textAlign(LEFT, TOP);
    text(label, x + 16, y);
}

// ── Correspondence lines ──────────────────────────────────────────────────────
function drawCorrespondenceLines() {
    let pcx  = M + cktW() / 2;
    let pcy  = TOP_Y + TOP_H / 2 + 10;
    let nA   = { x: pcx - 90, y: pcy - 66 };
    let nB   = { x: pcx + 90, y: pcy - 66 };
    let gndY = pcy + 82;
    let midL = pcy + 14;

    let r1Pos = { x: nA.x, y: (midL + nA.y) / 2 };
    let r2Pos = { x: (nA.x + nB.x) / 2, y: nA.y };
    let r3Pos = { x: nB.x, y: (nB.y + gndY) / 2 };

    // Recompute matX (same formula as drawMatrixPanel)
    let panelW = cw - 2 * M;
    let matX   = M + max(0, floor((panelW - 526) / 2)) + 15;
    let eqY    = MAT_Y + 70;

    let cellCentres = [
        { x: matX + CW / 2,        y: eqY + CH / 2 },
        { x: matX + CW + CW / 2,   y: eqY + CH / 2 },
        { x: matX + CW / 2,        y: eqY + CH + CH / 2 },
        { x: matX + CW + CW / 2,   y: eqY + CH + CH / 2 },
    ];

    let links = [
        { cell: 0, targets: [r1Pos, r2Pos], col: C_DIAG },
        { cell: 1, targets: [r2Pos],        col: C_OFFD },
        { cell: 2, targets: [r2Pos],        col: C_OFFD },
        { cell: 3, targets: [r2Pos, r3Pos], col: C_DIAG },
    ];

    for (let lk of links) {
        if (lk.cell > buildStep) continue;
        let cc = cellCentres[lk.cell];
        drawingContext.setLineDash([5, 5]);
        for (let t of lk.targets) {
            stroke(lk.col[0], lk.col[1], lk.col[2], 130);
            strokeWeight(1.5);
            line(cc.x, cc.y, t.x, t.y);
            fill(lk.col[0], lk.col[1], lk.col[2], 200);
            noStroke(); ellipse(t.x, t.y, 7, 7);
        }
    }
    drawingContext.setLineDash([]);
}

// ── Formatting ────────────────────────────────────────────────────────────────
function fmtG(v) {
    let ms = v * 1000;
    if (abs(ms) < 0.001) return '0 mS';
    return (ms >= 0 ? '' : '−') + abs(ms).toFixed(3) + ' mS';
}
function fmtI(v) { return (v * 1000).toFixed(3) + ' mA'; }
function fmtR(v) {
    let sign = v < 0 ? '−' : '', av = abs(v);
    return sign + (av >= 1000 ? (av / 1000).toFixed(1) + ' kΩ' : av + ' Ω');
}

// ── Solve ─────────────────────────────────────────────────────────────────────
function solveSystem() {
    if (method === 'node') {
        let g1=1/R1, g2=1/R2, g3=1/R3;
        let a=g1+g2, b=-g2, c=-g2, d=g2+g3;
        let rr1=Vs/R1, rr2=0, det=a*d-b*c;
        sV1 = (rr1*d - b*rr2) / det;
        sV2 = (a*rr2 - rr1*c) / det;
    } else {
        let a=R1+R2, b=-R2, c=-R2, d=R2+R3;
        let rr1=Vs, rr2=0, det=a*d-b*c;
        sI1 = (rr1*d - b*rr2) / det;
        sI2 = (a*rr2 - rr1*c) / det;
    }
    solved = true; buildStep = 3; animProg = 1;
}

// ── Mouse events ──────────────────────────────────────────────────────────────
function mousePressed() {
    for (let s of sliders) {
        let frac = (s.val - s.min) / (s.max - s.min);
        if (dist(mouseX, mouseY, s.trkX + frac * s.trkW, s.trkY) < 14) {
            dragging = s; return;
        }
    }
    for (let sg of segCtrl) {
        if (inRect(sg)) {
            method = sg.mode; buildStep = -1; solved = false; animProg = 0; return;
        }
    }
    for (let b of [btnBuild, btnSolve, btnLinks]) {
        if (!b) continue;
        if (inRect(b)) {
            if (b.action === 'build') {
                buildStep = buildStep >= 3 ? 0 : buildStep + 1;
                animProg = 0; solved = false;
            } else if (b.action === 'solve') {
                solveSystem();
            } else if (b.action === 'links') {
                showLinks = !showLinks;
                btnLinks.label = showLinks ? 'Hide' : 'Links';
            }
            return;
        }
    }
}

function mouseDragged() {
    if (!dragging) return;
    let s    = dragging;
    let frac = constrain((mouseX - s.trkX) / s.trkW, 0, 1);
    s.val    = constrain(Math.round((s.min + frac * (s.max - s.min)) / s.step) * s.step, s.min, s.max);
    setParam(s.param, s.val);
    for (let ie of inputEls) if (ie.param === s.param) ie.el.value(String(s.val));
    if (solved) solveSystem();
}

function mouseReleased() { dragging = null; }

function inRect(b) {
    return mouseX >= b.x && mouseX <= b.x + b.w &&
           mouseY >= b.y && mouseY <= b.y + b.h;
}

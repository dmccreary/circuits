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
const M       = 12;      // outer margin
const TOP_Y   = 54;      // top panels start y
const TOP_H   = 308;     // top panels height
const GAP     = 10;      // between top and matrix panel
const MAT_Y   = TOP_Y + TOP_H + GAP;   // 372
const MAT_H   = 362;
const canvasH = MAT_Y + MAT_H + 16;    // 750
const CTRL_W  = 240;     // controls panel width

// ── State ─────────────────────────────────────────────────────────────────────
let cw;
let Vs = 12, R1 = 2000, R2 = 4000, R3 = 3000;
let method    = 'node';  // 'node' | 'mesh'
let buildStep = -1;      // -1 = all visible; 0..3 = step-by-step reveal
let solved    = false;
let showLinks = false;
let sV1 = 0, sV2 = 0, sI1 = 0, sI2 = 0;
let animProg  = 0;

// HTML input elements
let inputEls = [];   // [{el, param, rowY}]
// Canvas-drawn sliders
let sliders = [];
let dragging = null;
// Canvas-drawn buttons / controls
let btnBuild, btnSolve, btnLinks;
let segCtrl = [];    // [{x,y,w,h,mode,label}]

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

function currentVal(param) {
    if (param === 'Vs') return Vs;
    if (param === 'R1') return R1;
    if (param === 'R2') return R2;
    return R3;
}

function buildControls() {
    for (let ie of inputEls) ie.el.remove();
    inputEls = [];
    sliders   = [];

    let cx0     = ctrlX();
    let rowH    = 56;
    let firstY  = TOP_Y + 52;   // below mode segmented control
    let trkW    = CTRL_W - 24;
    let trkX    = cx0 + 12;

    PARAMS.forEach((p, i) => {
        let rowY = firstY + i * rowH;
        let val  = currentVal(p.param);

        // HTML numeric input
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

        // Closure to capture param
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
            val,
            trkX, trkY: rowY + 34, trkW
        });
    });

    // Segmented mode control
    let segW = (CTRL_W - 24) / 2;
    let segY = TOP_Y + 12;
    segCtrl = [
        { x: cx0 + 12,          y: segY, w: segW - 2, h: 28, mode: 'node', label: 'Node Voltage' },
        { x: cx0 + 12 + segW,   y: segY, w: segW - 2, h: 28, mode: 'mesh', label: 'Mesh Current' },
    ];

    // Buttons
    let btnY = TOP_Y + TOP_H - 36;
    let bw3  = floor((CTRL_W - 28) / 3);
    btnBuild = { x: cx0 + 12,            y: btnY, w: bw3,     h: 28, label: 'Build',  action: 'build' };
    btnSolve = { x: cx0 + 12 + bw3 + 2,  y: btnY, w: bw3,     h: 28, label: 'Solve',  action: 'solve' };
    btnLinks = { x: cx0 + 12 + bw3*2+4,  y: btnY, w: CTRL_W-28-bw3*2, h: 28, label: 'Links', action: 'links' };
}

function repositionInputs() {
    let canvasEl = document.querySelector('canvas');
    if (!canvasEl) return;
    let rect  = canvasEl.getBoundingClientRect();
    let sx    = rect.left + (window.scrollX || 0);
    let sy    = rect.top  + (window.scrollY || 0);
    let cx0   = ctrlX();

    for (let ie of inputEls) {
        ie.el.position(sx + cx0 + CTRL_W - 78, sy + ie.rowY + 4);
    }
}

// ── draw ──────────────────────────────────────────────────────────────────────
function draw() {
    background(C_BG);

    if (animProg < 1 && buildStep >= 0) {
        animProg = min(animProg + 0.05, 1);
    }

    drawTitle();
    drawCircuitPanel();
    drawControlsPanel();
    drawMatrixPanel();

    if (showLinks && buildStep >= 0) drawCorrespondenceLines();
}

// ── Title bar ─────────────────────────────────────────────────────────────────
function drawTitle() {
    noStroke();
    fill(C_DARK);
    textSize(17);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Matrix Equation Builder', M, 10);
    textStyle(NORMAL);

    fill(C_MUTED);
    textSize(12);
    let sub = method === 'node'
        ? 'Node Voltage Method  →  [G][V] = [I]'
        : 'Mesh Current Method  →  [Z][I] = [V]';
    text(sub, M, 31);
}

// ── Circuit panel ─────────────────────────────────────────────────────────────
function drawCircuitPanel() {
    let pw = cktW(), ph = TOP_H;
    drawCard(M, TOP_Y, pw, ph);

    // Panel title
    noStroke(); fill(C_DARK);
    textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Circuit Diagram', M + 12, TOP_Y + 10);
    textStyle(NORMAL);

    let pcx = M + pw / 2;
    let pcy = TOP_Y + ph / 2 + 10;

    // Node positions
    let nA   = { x: pcx - 90, y: pcy - 62 };  // V1 (top-left)
    let nB   = { x: pcx + 90, y: pcy - 62 };  // V2 (top-right)
    let gndY = pcy + 82;
    let midL = pcy + 14;   // junction between Vs top and R1 bottom on left branch

    // Draw wires first
    stroke(C_WIRE); strokeWeight(2.5);
    line(nA.x, nA.y, nB.x, nB.y);        // top wire
    line(nA.x, nA.y, nA.x, gndY);        // left branch (components will overlay)
    line(nB.x, nB.y, nB.x, gndY);        // right branch
    line(nA.x, gndY, nB.x, gndY);        // bottom wire

    // Voltage source: left branch, lower half (gndY → midL)
    drawVsrc(nA.x, gndY, midL);

    // R1: left branch, upper half (midL → nA.y)
    drawResistorV(nA.x, midL, nA.y, 'R1', -28);

    // R2: horizontal top (nA → nB)
    drawResistorH(nA.x + 14, nA.y, nB.x - 14, nB.y, 'R2');

    // R3: right branch (nB.y → gndY)
    drawResistorV(nB.x, nB.y, gndY, 'R3', 20);

    // Ground symbol centered at bottom
    drawGround((nA.x + nB.x) / 2, gndY);

    // Vs label
    fill(C_VS); noStroke();
    textSize(12); textStyle(BOLD); textAlign(RIGHT, CENTER);
    text('Vs = ' + Vs + ' V', nA.x - 24, (gndY + midL) / 2);
    textStyle(NORMAL);

    // Mesh arrows (mesh mode)
    if (method === 'mesh') {
        let mcy = (nA.y + gndY) / 2;
        drawMeshArrow(pcx - 35, mcy, solved ? 'I₁=' + (sI1 * 1000).toFixed(2) + 'mA' : 'I₁');
        drawMeshArrow(pcx + 55, mcy, solved ? 'I₂=' + (sI2 * 1000).toFixed(2) + 'mA' : 'I₂');
    }

    // Node dots and labels
    drawNode(nA.x, nA.y, 'V₁', method === 'node' && solved ? sV1 : null, LEFT);
    drawNode(nB.x, nB.y, 'V₂', method === 'node' && solved ? sV2 : null, RIGHT);
}

function drawCard(x, y, w, h) {
    // Drop shadow
    noStroke();
    fill(0, 0, 0, 14);
    rect(x + 3, y + 3, w, h, 10);
    // Card
    fill(C_CARD);
    stroke(C_BORDER);
    strokeWeight(1);
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
    text('+', x, my - 6);
    text('−', x, my + 6);
}

function drawResistorV(x, y1, y2, label, labelDx) {
    let my = (y1 + y2) / 2, rh = 28;
    stroke(C_WIRE); strokeWeight(2.5);
    line(x, y1, x, my - rh / 2);
    line(x, my + rh / 2, x, y2);
    fill(255); stroke([148, 128, 72]); strokeWeight(1.5);
    rectMode(CENTER);
    rect(x, my, 14, rh, 2);
    rectMode(CORNER);
    fill(C_DARK); noStroke();
    textSize(11); textStyle(BOLD);
    textAlign(labelDx < 0 ? RIGHT : LEFT, CENTER);
    text(label, x + labelDx, my);
    textStyle(NORMAL);
}

function drawResistorH(x1, y, x2, y2, label) {
    let mx = (x1 + x2) / 2, rw = 34;
    stroke(C_WIRE); strokeWeight(2.5);
    line(x1, y, mx - rw / 2, y);
    line(mx + rw / 2, y, x2, y);
    fill(255); stroke([148, 128, 72]); strokeWeight(1.5);
    rectMode(CENTER);
    rect(mx, y, rw, 14, 2);
    rectMode(CORNER);
    fill(C_DARK); noStroke();
    textSize(11); textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(label, mx, y + 10);
    textStyle(NORMAL);
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
    ellipse(x, y, 14, 14);
    noStroke(); fill(C_DARK);
    textSize(12); textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text(label, x, y - 6);
    if (solvedVal !== null) {
        fill([20, 130, 55]);
        textSize(11);
        textAlign(side === LEFT ? RIGHT : LEFT, CENTER);
        text(solvedVal.toFixed(3) + ' V', side === LEFT ? x - 10 : x + 10, y);
    }
    textStyle(NORMAL);
}

function drawMeshArrow(x, y, label) {
    push();
    noFill(); stroke(C_MESH[0], C_MESH[1], C_MESH[2], 180);
    strokeWeight(1.5);
    arc(x, y, 36, 36, PI * 0.25, PI * 1.6);
    let ax = x + 18 * cos(PI * 1.6), ay = y + 18 * sin(PI * 1.6);
    fill(C_MESH[0], C_MESH[1], C_MESH[2], 180); noStroke();
    triangle(ax - 4, ay - 2, ax + 2, ay - 7, ax + 3, ay + 2);
    fill(C_MESH); textSize(10); textStyle(BOLD);
    textAlign(CENTER, TOP);
    text(label, x, y + 20);
    textStyle(NORMAL);
    pop();
}

// ── Controls panel ────────────────────────────────────────────────────────────
function drawControlsPanel() {
    let cx0 = ctrlX();
    drawCard(cx0, TOP_Y, CTRL_W, TOP_H);

    // Panel title
    noStroke(); fill(C_DARK);
    textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Parameters', cx0 + 12, TOP_Y + 10);
    textStyle(NORMAL);

    // Segmented control
    for (let sg of segCtrl) {
        let active = sg.mode === method;
        fill(active ? C_ACCENT : [225, 228, 236]);
        stroke(active ? C_ACCENT : C_BORDER);
        strokeWeight(1);
        rect(sg.x, sg.y, sg.w, sg.h, 5);
        noStroke();
        fill(active ? 255 : C_DARK);
        textSize(11); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(sg.label, sg.x + sg.w / 2, sg.y + sg.h / 2);
        textStyle(NORMAL);
    }

    // Parameter rows: label + unit hint + slider
    let labels = { Vs: 'Vs', R1: 'R1', R2: 'R2', R3: 'R3' };
    let hints  = { Vs: 'V', R1: 'Ω', R2: 'Ω', R3: 'Ω' };

    for (let s of sliders) {
        let rowY = s.trkY - 34;
        // Label
        noStroke(); fill(C_DARK);
        textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
        text(labels[s.param], cx0 + 12, rowY + 6);
        textStyle(NORMAL);

        // Unit hint (to left of input box)
        fill(C_MUTED); textSize(11);
        textAlign(RIGHT, TOP);
        // Show formatted value + unit as hint text
        let fmtHint = s.param === 'Vs' ? s.val + ' V'
                    : s.val >= 1000 ? (s.val / 1000).toFixed(1) + ' kΩ'
                    : s.val + ' Ω';
        text(fmtHint, cx0 + CTRL_W - 84, rowY + 8);

        // Slider track
        let frac = (s.val - s.min) / (s.max - s.min);
        let tx = s.trkX, ty = s.trkY, tw = s.trkW;

        stroke(C_BORDER); strokeWeight(3); noFill();
        line(tx, ty, tx + tw, ty);
        stroke(C_ACCENT); strokeWeight(3);
        line(tx, ty, tx + frac * tw, ty);
        fill(255); stroke(C_ACCENT); strokeWeight(2);
        ellipse(tx + frac * tw, ty, 13, 13);
    }

    // Buttons
    drawBtn(btnBuild, C_ACCENT,       [30, 90, 210]);
    drawBtn(btnSolve, [25, 145, 65],  [18, 115, 50]);
    drawBtn(btnLinks, showLinks ? [120, 80, 180] : [150, 158, 172], null);

    // Build step indicator
    if (buildStep >= 0) {
        noStroke(); fill(C_MUTED);
        textSize(10); textAlign(CENTER, TOP);
        text('Step ' + (buildStep + 1) + ' / 4', cx0 + CTRL_W / 2, TOP_Y + TOP_H - 64);
    }
}

function drawBtn(b, col, hoverCol) {
    if (!b) return;
    let hover = hoverCol && mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h;
    fill(hover ? hoverCol : col);
    noStroke();
    rect(b.x, b.y, b.w, b.h, 5);
    fill(255); textSize(11); textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(b.label, b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

// ── Matrix panel ──────────────────────────────────────────────────────────────
function drawMatrixPanel() {
    drawCard(M, MAT_Y, cw - M * 2, MAT_H);

    // ── Explanation strip ────────────────────────────────────────────────────
    noStroke(); fill(C_DARK);
    textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    let eqTitle = method === 'node' ? '[G] · [V] = [I]' : '[Z] · [I] = [V]';
    text(eqTitle, M + 16, MAT_Y + 12);
    textStyle(NORMAL);

    fill(C_MUTED); textSize(11);
    let line1 = method === 'node'
        ? 'Diagonal G\u2096\u2096 = sum of conductances at node k  ·  Off-diagonal G\u2096\u2097 = −shared conductance'
        : 'Diagonal Z\u2096\u2096 = sum of resistances in loop k  ·  Off-diagonal Z\u2096\u2097 = −shared resistance';
    text(line1, M + 16, MAT_Y + 32);

    let line2 = method === 'node'
        ? 'Highlighted in blue: diagonal terms  ·  Red: off-diagonal  ·  Green: source current vector'
        : 'Highlighted in blue: diagonal terms  ·  Red: off-diagonal  ·  Green: source voltage vector';
    text(line2, M + 16, MAT_Y + 48);

    // ── Matrix equation ──────────────────────────────────────────────────────
    let cellW = 120, cellH = 52;
    let matH2 = cellH * 2;
    let eqY   = MAT_Y + 80;

    // Compute entries
    let e11, e12, e21, e22, r1, r2, lbl1, lbl2, varL1, varL2;
    if (method === 'node') {
        let g1 = 1 / R1, g2 = 1 / R2, g3 = 1 / R3;
        e11 = g1 + g2; e12 = -g2; e21 = -g2; e22 = g2 + g3;
        r1 = Vs / R1; r2 = 0;
        e11 = fmtG(e11); e12 = fmtG(e12); e21 = fmtG(e21); e22 = fmtG(e22);
        r1 = fmtI(Vs / R1); r2 = '0 mA';
        lbl1 = '1/R1+1/R2'; lbl2 = '1/R2+1/R3';
        varL1 = 'V₁'; varL2 = 'V₂';
    } else {
        e11 = R1 + R2; e12 = -R2; e21 = -R2; e22 = R2 + R3;
        r1 = Vs + ' V'; r2 = '0 V';
        e11 = fmtR(e11); e12 = fmtR(e12); e21 = fmtR(e21); e22 = fmtR(e22);
        lbl1 = 'R1+R2'; lbl2 = 'R2+R3';
        varL1 = 'I₁'; varL2 = 'I₂';
    }

    let entries = [
        { r:0, c:0, val:e11, desc:lbl1,   color:C_DIAG, diag:true },
        { r:0, c:1, val:e12, desc:'-R2 shared', color:C_OFFD, diag:false },
        { r:1, c:0, val:e21, desc:'-R2 shared', color:C_OFFD, diag:false },
        { r:1, c:1, val:e22, desc:lbl2,   color:C_DIAG, diag:true },
    ];

    // Center the whole equation horizontally
    let matW    = cellW * 2;
    let dotW    = 24;
    let vecW    = 42;
    let eqsW    = 26;
    let rhsW    = 90;
    let totalEqW = matW + dotW + vecW + eqsW + rhsW + 24; // brackets + spacing
    let eqLeft  = M + 16 + (cw - M * 2 - 32 - totalEqW) / 2;
    eqLeft      = max(eqLeft, M + 16);

    let matX = eqLeft;

    // [G] matrix brackets
    drawBracket(matX - 8, eqY - 6, matH2 + 12, false);
    drawBracket(matX + matW + 8, eqY - 6, matH2 + 12, true);

    // Matrix cells
    for (let e of entries) {
        let ex = matX + e.c * cellW;
        let ey = eqY + e.r * cellH;
        let show = (buildStep < 0) || (entries.indexOf(e) <= buildStep);
        let alpha = show ? (entries.indexOf(e) === buildStep && animProg < 1 ? animProg : 1) : 0;

        if (alpha > 0) {
            // Cell background
            noStroke();
            fill(e.color[0], e.color[1], e.color[2], alpha * 35);
            rect(ex + 2, ey + 2, cellW - 4, cellH - 4, 5);

            // Value
            fill(e.color[0], e.color[1], e.color[2], alpha * 255);
            textSize(14); textStyle(BOLD); textAlign(CENTER, CENTER);
            text(e.val, ex + cellW / 2, ey + cellH / 2 - 7);
            textStyle(NORMAL);

            // Description subscript
            textSize(9); fill(e.color[0], e.color[1], e.color[2], alpha * 160);
            textAlign(CENTER, BOTTOM);
            text(e.desc, ex + cellW / 2, ey + cellH - 4);

            // Diagonal/off badge (small dot)
            fill(e.color[0], e.color[1], e.color[2], alpha * 200);
            ellipse(ex + cellW - 10, ey + 10, 6, 6);
        }

        // Cell dividing lines (always draw)
        stroke(C_BORDER); strokeWeight(0.8);
        if (e.c < 1) line(ex + cellW, ey + 2, ex + cellW, ey + cellH - 2);
        if (e.r < 1) line(ex + 2, ey + cellH, ex + cellW - 2, ey + cellH);
    }
    noStroke();

    // Dot operator
    fill(C_DARK); textSize(22); textAlign(CENTER, CENTER);
    let dotX = matX + matW + 14;
    text('·', dotX, eqY + cellH);

    // [V] or [I] variable vector
    let vecX = dotX + 18;
    drawBracket(vecX, eqY - 6, matH2 + 12, false);
    fill(C_DARK); textSize(15); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(varL1, vecX + vecW / 2, eqY + cellH / 2);
    text(varL2, vecX + vecW / 2, eqY + cellH + cellH / 2);
    textStyle(NORMAL);
    drawBracket(vecX + vecW, eqY - 6, matH2 + 12, true);

    // Equals
    fill(C_DARK); textSize(22); textAlign(CENTER, CENTER);
    let eqSignX = vecX + vecW + 18;
    text('=', eqSignX, eqY + cellH);

    // [I] or [V] RHS vector
    let rhsX = eqSignX + 20;
    drawBracket(rhsX, eqY - 6, matH2 + 12, false);
    let rhsVals = [r1, r2];
    for (let ri = 0; ri < 2; ri++) {
        let ry = eqY + ri * cellH;
        noStroke();
        fill(C_RHS[0], C_RHS[1], C_RHS[2], 40);
        rect(rhsX + 2, ry + 2, rhsW - 4, cellH - 4, 5);
        fill(C_RHS); textSize(13); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(rhsVals[ri], rhsX + rhsW / 2, ry + cellH / 2);
        textStyle(NORMAL);
    }
    drawBracket(rhsX + rhsW, eqY - 6, matH2 + 12, true);

    // ── Column labels above matrix ───────────────────────────────────────────
    fill(C_MUTED); textSize(10); textAlign(CENTER, BOTTOM);
    let colLabel = method === 'node' ? '[G] Conductance Matrix' : '[Z] Impedance Matrix';
    text(colLabel, matX + matW / 2, eqY - 8);

    let vecLabel = method === 'node' ? '[V] Node\nVoltages' : '[I] Mesh\nCurrents';
    textSize(10); textAlign(CENTER, BOTTOM);
    text(method === 'node' ? '[V]' : '[I]', vecX + vecW / 2, eqY - 8);

    let rhsLabel = method === 'node' ? '[I] Source\nCurrents' : '[V] Source\nVoltages';
    textAlign(CENTER, BOTTOM);
    text(method === 'node' ? '[I]' : '[V]', rhsX + rhsW / 2, eqY - 8);

    // ── Legend ──────────────────────────────────────────────────────────────
    let legY = eqY + matH2 + 22;
    drawLegendDot(matX, legY, C_DIAG, 'Diagonal: sum of conductances at node');
    drawLegendDot(matX + 260, legY, C_OFFD, 'Off-diagonal: negative shared conductance');
    drawLegendDot(matX + 520 < cw - M * 2 - 32 + matX ? matX + 520 : matX, legY + 18, C_RHS, 'Source vector entry');

    // ── Solution display ─────────────────────────────────────────────────────
    if (solved) {
        let solY = legY + 42;
        // Solution pill
        fill(C_DIAG[0], C_DIAG[1], C_DIAG[2], 22);
        noStroke();
        rect(M + 16, solY - 6, cw - M * 2 - 32, 44, 6);

        fill(C_DARK); textSize(13); textStyle(BOLD);
        textAlign(LEFT, TOP);
        text('Solution:', M + 24, solY + 2);
        textStyle(NORMAL);

        if (method === 'node') {
            fill(C_SOL); textSize(15); textStyle(BOLD);
            textAlign(LEFT, TOP);
            text('V₁ = ' + sV1.toFixed(3) + ' V', M + 120, solY + 2);
            text('V₂ = ' + sV2.toFixed(3) + ' V', M + 310, solY + 2);
        } else {
            fill(C_MESH); textSize(15); textStyle(BOLD);
            textAlign(LEFT, TOP);
            text('I₁ = ' + (sI1 * 1000).toFixed(3) + ' mA', M + 120, solY + 2);
            text('I₂ = ' + (sI2 * 1000).toFixed(3) + ' mA', M + 310, solY + 2);
        }
        textStyle(NORMAL);
    }

    // ── "not yet built" hint ─────────────────────────────────────────────────
    if (buildStep < 0) {
        fill(C_MUTED); textSize(11); textAlign(CENTER, TOP);
        text('Press  Build  to reveal matrix entries step by step  ·  Press  Solve  to compute solution', cw / 2, eqY + matH2 + 10);
    }
}

function drawBracket(x, y, h, rightSide) {
    stroke(C_DARK); strokeWeight(2.5); noFill();
    let tipLen = 7;
    if (!rightSide) {
        line(x - tipLen, y, x, y);
        line(x, y, x, y + h);
        line(x, y + h, x - tipLen, y + h);
    } else {
        line(x + tipLen, y, x, y);
        line(x, y, x, y + h);
        line(x, y + h, x + tipLen, y + h);
    }
}

function drawLegendDot(x, y, col, label) {
    fill(col); noStroke();
    ellipse(x + 6, y + 5, 10, 10);
    fill(C_MUTED); textSize(10); textAlign(LEFT, TOP);
    text(label, x + 14, y);
}

// ── Correspondence lines ──────────────────────────────────────────────────────
function drawCorrespondenceLines() {
    let pcx  = M + cktW() / 2;
    let pcy  = TOP_Y + TOP_H / 2 + 10;
    let nA   = { x: pcx - 90, y: pcy - 62 };
    let nB   = { x: pcx + 90, y: pcy - 62 };
    let gndY = pcy + 82;
    let midL = pcy + 14;

    let r1Pos = { x: nA.x, y: (midL + nA.y) / 2 };
    let r2Pos = { x: (nA.x + nB.x) / 2, y: nA.y };
    let r3Pos = { x: nB.x, y: (nB.y + gndY) / 2 };

    let cellW = 120, cellH = 52;
    let matH2 = cellH * 2;
    let eqY   = MAT_Y + 80;
    let totalEqW = cellW * 2 + 24 + 42 + 26 + 90 + 24;
    let eqLeft = M + 16 + (cw - M * 2 - 32 - totalEqW) / 2;
    eqLeft = max(eqLeft, M + 16);
    let matX = eqLeft;

    let cellCentres = [
        { x: matX + cellW / 2,         y: eqY + cellH / 2 },
        { x: matX + cellW + cellW / 2,  y: eqY + cellH / 2 },
        { x: matX + cellW / 2,         y: eqY + cellH + cellH / 2 },
        { x: matX + cellW + cellW / 2,  y: eqY + cellH + cellH / 2 },
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
            stroke(lk.col[0], lk.col[1], lk.col[2], 120);
            strokeWeight(1.5);
            line(cc.x, cc.y, t.x, t.y);
            fill(lk.col[0], lk.col[1], lk.col[2], 180);
            noStroke();
            ellipse(t.x, t.y, 7, 7);
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
function fmtI(v) {
    return (v * 1000).toFixed(3) + ' mA';
}
function fmtR(v) {
    let sign = v < 0 ? '−' : '';
    let av = abs(v);
    return sign + (av >= 1000 ? (av / 1000).toFixed(1) + ' kΩ' : av + ' Ω');
}

// ── Solve ─────────────────────────────────────────────────────────────────────
function solveSystem() {
    if (method === 'node') {
        let g1 = 1/R1, g2 = 1/R2, g3 = 1/R3;
        let a = g1+g2, b = -g2, c = -g2, d = g2+g3;
        let rr1 = Vs/R1, rr2 = 0;
        let det = a*d - b*c;
        sV1 = (rr1*d - b*rr2) / det;
        sV2 = (a*rr2 - rr1*c) / det;
    } else {
        let a = R1+R2, b = -R2, c = -R2, d = R2+R3;
        let rr1 = Vs, rr2 = 0;
        let det = a*d - b*c;
        sI1 = (rr1*d - b*rr2) / det;
        sI2 = (a*rr2 - rr1*c) / det;
    }
    solved = true;
    buildStep = 3;
    animProg  = 1;
}

// ── Mouse events ──────────────────────────────────────────────────────────────
function mousePressed() {
    // Sliders
    for (let s of sliders) {
        let frac = (s.val - s.min) / (s.max - s.min);
        let tx = s.trkX + frac * s.trkW;
        if (dist(mouseX, mouseY, tx, s.trkY) < 14) {
            dragging = s;
            return;
        }
    }

    // Segmented control
    for (let sg of segCtrl) {
        if (inRect(sg)) {
            method    = sg.mode;
            buildStep = -1;
            solved    = false;
            animProg  = 0;
            return;
        }
    }

    // Buttons
    for (let b of [btnBuild, btnSolve, btnLinks]) {
        if (!b) continue;
        if (inRect(b)) {
            if (b.action === 'build') {
                buildStep = buildStep >= 3 ? 0 : buildStep + 1;
                animProg  = 0;
                solved    = false;
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
    let raw  = s.min + frac * (s.max - s.min);
    s.val    = constrain(Math.round(raw / s.step) * s.step, s.min, s.max);
    setParam(s.param, s.val);
    // Update input box
    for (let ie of inputEls) {
        if (ie.param === s.param) ie.el.value(String(s.val));
    }
    if (solved) solveSystem();
}

function mouseReleased() { dragging = null; }

function inRect(b) {
    return mouseX >= b.x && mouseX <= b.x + b.w &&
           mouseY >= b.y && mouseY <= b.y + b.h;
}

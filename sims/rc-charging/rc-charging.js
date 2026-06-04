// RC Charging / Discharging Circuit MicroSim
// SPDT switch on the top rail:
//   Position A (left)  — battery + R₁ charges the capacitor
//   Position B (right) — capacitor discharges through R₂
// Capacitor sits in the centre; switch common connects down to cap top.
// All controls are canvas-based (no DOM elements) for iframe compatibility.
//
// animationTime and lineWidth are globals declared in circuit-lib.js

// ── Canvas dimensions ──────────────────────────────────────────────────────
let canvasWidth   = 580;
let circuitHeight = 280;
let graphHeight   = 210;
let controlHeight = 155;   // extra row for R₂ slider
let drawHeight;
let canvasHeight;
let containerWidth;

// lineWidth is used by drawAnimatedWire in circuit-lib.js
let lineWidth = 3;

// ── Animation / switch state ───────────────────────────────────────────────
let isAnimating = false;

// 'A' = charging side, 'B' = discharging side; start at A (stopped)
let switchPos = 'A';

// ── Simulation state ───────────────────────────────────────────────────────
let simTime    = 0;    // s since last switch flip (for exponential formula)
let absTime    = 0;    // s since Start was pressed (graph x-axis)
let vcAtSwitch = 0;    // Vc when switch last changed position
let vcNow      = 0;    // current capacitor voltage (V)
let iNow       = 0;    // current (mA): positive = charging, negative = discharging

let graphData  = [];   // [{t, vc, i, phase}]

// ── Circuit parameters ─────────────────────────────────────────────────────
let vs    = 9;    // source voltage (V)
let r1Val = 10;   // charge resistance (kΩ)
let r2Val = 10;   // discharge resistance (kΩ)
let cVal  = 10;   // capacitance (µF)
let tau1  = 0;    // charge time constant R₁·C (s)
let tau2  = 0;    // discharge time constant R₂·C (s)

// ── Layout ─────────────────────────────────────────────────────────────────
let sliderLeftMargin = 280;
let sliderX, sliderWidth;
let sy1, sy2, sy3, sy4;

// Button geometry
let startBtnX, startBtnY, startBtnW = 80,  startBtnH = 26;
let resetBtnX, resetBtnY, resetBtnW = 70,  resetBtnH = 26;
let swBtnX,   swBtnY,   swBtnW = 140, swBtnH = 26;

// Switch hit-box (circuit diagram) – set each frame in drawCircuit
let swAXg = 0, swBXg = 0, swYg = 0;

// ══════════════════════════════════════════════════════════════════════════
// SETUP
// ══════════════════════════════════════════════════════════════════════════

function setup() {
    drawHeight   = circuitHeight + graphHeight;
    canvasHeight = drawHeight + controlHeight;
    updateCanvasSize();

    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    computeLayout();
    recalculate();

    describe(
        'RC charging and discharging circuit. ' +
        'Switch position A charges the capacitor via the battery and R1. ' +
        'Switch position B discharges it through R2.',
        LABEL
    );
}

function computeLayout() {
    sliderX     = sliderLeftMargin;
    sliderWidth = containerWidth - sliderX - 20;

    sy1 = drawHeight + 55;
    sy2 = drawHeight + 80;
    sy3 = drawHeight + 105;
    sy4 = drawHeight + 130;

    startBtnX = 15;  startBtnY = drawHeight + 12;
    resetBtnX = 105; resetBtnY = drawHeight + 12;
    swBtnX    = 185; swBtnY   = drawHeight + 12;
}

// ══════════════════════════════════════════════════════════════════════════
// DRAW LOOP
// ══════════════════════════════════════════════════════════════════════════

function draw() {
    background(255);

    if (isAnimating) {
        const tau_cur = switchPos === 'A' ? tau1 : tau2;
        const dt_sim  = (deltaTime / 1000) * max(tau_cur, 0.001);
        simTime  += dt_sim;
        absTime  += dt_sim;
        animationTime += deltaTime;

        if (switchPos === 'A') {
            // Charge toward Vs
            vcNow = vs - (vs - vcAtSwitch) * Math.exp(-simTime / max(tau1, 1e-9));
            iNow  = (vs - vcNow) / max(r1Val, 0.001);       // mA, positive
            vcNow = constrain(vcNow, 0, vs);
        } else {
            // Discharge toward 0
            vcNow = vcAtSwitch * Math.exp(-simTime / max(tau2, 1e-9));
            iNow  = -(vcNow / max(r2Val, 0.001));            // mA, negative
            vcNow = constrain(vcNow, 0, vs);
        }

        const tau_cur2 = switchPos === 'A' ? tau1 : tau2;
        const lastT    = graphData.length > 0 ? graphData[graphData.length - 1].t : -Infinity;
        if (absTime - lastT > max(tau_cur2, 0.001) * 0.02) {
            graphData.push({ t: absTime, vc: vcNow, i: iNow, phase: switchPos });
        }
    }

    drawCircuit();

    stroke(180); strokeWeight(1);
    line(0, circuitHeight, containerWidth, circuitHeight);

    drawGraphs();
    drawControls();
}

function recalculate() {
    tau1 = r1Val * cVal * 0.001;   // kΩ × µF × 1e-3 → s
    tau2 = r2Val * cVal * 0.001;
}

// ══════════════════════════════════════════════════════════════════════════
// CIRCUIT DRAWING
//
//  Layout (all x/y as fractions of containerWidth / fixed heights):
//
//     batX          r1Left     r1Right  swAX   swCX    swBX    r2X
//      |              |           |       |      |       |       |
//  topY ─ (bat+) ──[R₁]───────────── A ─ SW ─ B ──────────[R₂]─┐
//                                         │(C)                    │
//                                       [cap]                  (r2 wire down)
//                                         │                       │
//  botY ──── (bat−) ────────────────────────────────────────────────
//
// ══════════════════════════════════════════════════════════════════════════

function drawCircuit() {
    push();

    const W    = containerWidth;
    const topY = 55;
    const botY = 228;

    // Key x-positions
    const batX   = Math.floor(W * 0.10);
    const r1W    = Math.floor(W * 0.13);
    const r1Left = Math.floor(W * 0.18);
    const r1Right = r1Left + r1W;

    const swAX   = Math.floor(W * 0.40);   // terminal A
    const swCX   = Math.floor(W * 0.52);   // common – pivot
    const swBX   = Math.floor(W * 0.64);   // terminal B
    const swY    = topY;

    const r2X    = Math.floor(W * 0.82);
    const r2H    = Math.floor(W * 0.14);
    const r2TopY = topY + 8;
    const r2BotY = r2TopY + r2H;

    const capX    = swCX;
    const capTopY = swY + 40;
    const capMidY = Math.round((capTopY + botY) / 2);
    const plateW  = 48;
    const gapH    = 22;

    // Expose switch hit-box for mouse interaction
    swAXg = swAX; swBXg = swBX; swYg = swY;

    // ── Animated-wire helper ───────────────────────────────────────────────
    const I0charge = vs / max(r1Val, 0.001);
    let iFrac = 0;
    if (isAnimating && switchPos === 'A') {
        iFrac = iNow / max(I0charge, 0.001);
    } else if (isAnimating && switchPos === 'B') {
        const I0dis = vcAtSwitch / max(r2Val, 0.001);
        iFrac = abs(iNow) / max(I0dis, 0.001);
    }
    const eSpeed = constrain(iFrac, 0, 1) * 0.06;
    const active = isAnimating && iFrac > 0.005;

    function liveWire(x1, y1, x2, y2) {
        if (active) {
            drawAnimatedWire(x1, y1, x2, y2, eSpeed, 1.0);
        } else {
            stroke(0); strokeWeight(lineWidth); line(x1, y1, x2, y2);
        }
    }

    // ── Title ──────────────────────────────────────────────────────────────
    fill(0); noStroke(); textSize(14); textAlign(CENTER, TOP);
    text('RC Charging / Discharging Circuit', W / 2, 10);

    // ── Battery (left vertical) ────────────────────────────────────────────
    const batMidY = Math.round((topY + botY) / 2);
    liveWire(batX, topY,        batX, batMidY - 22);
    liveWire(batX, batMidY + 22, batX, botY);

    stroke(0); strokeWeight(2);
    line(batX - 15, batMidY - 18, batX + 15, batMidY - 18);
    strokeWeight(5);
    line(batX - 9,  batMidY - 9,  batX + 9,  batMidY - 9);
    strokeWeight(2);
    line(batX - 15, batMidY + 9,  batX + 15, batMidY + 9);
    strokeWeight(5);
    line(batX - 9,  batMidY + 18, batX + 9,  batMidY + 18);

    fill(0); noStroke(); textSize(12);
    textAlign(RIGHT, CENTER);
    text('+', batX - 20, batMidY - 18);
    text('−', batX - 20, batMidY + 18);
    textAlign(LEFT, CENTER);
    text(vs + ' V', batX + 22, batMidY);

    // ── Top rail: bat+ → R₁ → terminal A ──────────────────────────────────
    liveWire(batX, topY, r1Left, topY);
    drawRHoriz(r1Left, topY, r1W, r1Val, 'R₁');
    liveWire(r1Right, topY, swAX, topY);

    // ── Terminal B → horizontal wire → R₂ top ─────────────────────────────
    if (switchPos === 'B' && active) {
        drawAnimatedWire(swBX, swY, r2X, swY, eSpeed, 1.0);
        drawAnimatedWire(r2X, r2BotY, r2X, botY, eSpeed, 1.0);
    } else {
        stroke(0); strokeWeight(lineWidth);
        line(swBX, swY, r2X, swY);
        line(r2X, r2BotY, r2X, botY);
    }
    drawRVert(r2X, r2TopY, r2H, r2Val, 'R₂');

    // ── SPDT switch ────────────────────────────────────────────────────────
    drawSPDTSwitch(swAX, swCX, swBX, swY, switchPos);

    // ── Common → cap top plate ────────────────────────────────────────────
    if (active) {
        drawAnimatedWire(swCX, swY + 10, capX, capTopY, eSpeed, 1.0);
        drawAnimatedWire(capX, capTopY, capX, capMidY - gapH / 2, eSpeed, 1.0);
    } else {
        stroke(0); strokeWeight(lineWidth);
        line(swCX, swY + 10, capX, capTopY);
        line(capX, capTopY, capX, capMidY - gapH / 2);
    }

    // ── Capacitor (vertical) ──────────────────────────────────────────────
    const chFrac = constrain(vcNow / max(vs, 0.001), 0, 1);
    if (chFrac > 0.01) {
        const fillH = (gapH - 6) * chFrac;
        noStroke();
        fill(lerp(160, 30, chFrac), lerp(200, 100, chFrac), 255, 190);
        rectMode(CENTER);
        rect(capX, capMidY, plateW * 0.72, max(fillH, 2));
        rectMode(CORNER);
    }
    stroke(0); strokeWeight(5);
    line(capX - plateW / 2, capMidY - gapH / 2, capX + plateW / 2, capMidY - gapH / 2);
    line(capX - plateW / 2, capMidY + gapH / 2, capX + plateW / 2, capMidY + gapH / 2);

    // Cap bottom → botY
    liveWire(capX, capMidY + gapH / 2, capX, botY);

    fill(200, 0, 0); noStroke(); textSize(12); textAlign(RIGHT, CENTER);
    text('+', capX - plateW / 2 - 6, capMidY - gapH / 2);
    fill(0, 0, 200);
    text('−', capX - plateW / 2 - 6, capMidY + gapH / 2);
    fill(0); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text('C = ' + cVal + ' µF', capX + plateW / 2 + 8, capMidY - 10);
    fill(0, 70, 190);
    text('Vc = ' + vcNow.toFixed(2) + ' V', capX + plateW / 2 + 8, capMidY + 8);

    // ── Ground symbols ─────────────────────────────────────────────────────
    drawGndSymbol(capX, botY);
    drawGndSymbol(r2X,  botY);

    // ── Bottom rail: bat− ↔ cap ↔ R₂ ──────────────────────────────────────
    liveWire(batX, botY, capX, botY);
    liveWire(capX, botY, r2X,  botY);

    // ── Live readouts ──────────────────────────────────────────────────────
    fill(0, 70, 190); noStroke(); textSize(12); textAlign(LEFT, TOP);
    const lblY = botY + 22;
    const iLabel = switchPos === 'A' ? 'I_charge' : 'I_disch';
    text(iLabel + ' = ' + abs(iNow).toFixed(3) + ' mA', batX + 10, lblY);
    text('τ = ' + formatTau(switchPos === 'A' ? tau1 : tau2), batX + 180, lblY);

    pop();
}

// ── Horizontal resistor (zigzag) ──────────────────────────────────────────
function drawRHoriz(x, railY, w, rKohms, label) {
    push();
    stroke(0); strokeWeight(lineWidth); noFill();
    const ew = w * 0.15, peaks = 6;
    const pw = (w - 2 * ew) / peaks, ph = 9;
    line(x,         railY, x + ew,      railY);
    line(x + w - ew, railY, x + w,      railY);
    beginShape();
    vertex(x + ew, railY);
    for (let i = 0; i < peaks; i++) {
        vertex(x + ew + i * pw + pw / 2, (i % 2 === 0) ? railY - ph : railY + ph);
    }
    vertex(x + w - ew, railY);
    endShape();
    fill(0); noStroke(); textSize(11); textAlign(CENTER, BOTTOM);
    text((label || 'R') + ' = ' + rKohms + ' kΩ', x + w / 2, railY - ph - 3);
    pop();
}

// ── Vertical resistor (zigzag) ────────────────────────────────────────────
function drawRVert(x, topYr, h, rKohms, label) {
    push();
    stroke(0); strokeWeight(lineWidth); noFill();
    const eh = h * 0.15, peaks = 6;
    const ph = (h - 2 * eh) / peaks, pw = 9;
    line(x, topYr,          x, topYr + eh);
    line(x, topYr + h - eh, x, topYr + h);
    beginShape();
    vertex(x, topYr + eh);
    for (let i = 0; i < peaks; i++) {
        vertex((i % 2 === 0) ? x + pw : x - pw, topYr + eh + i * ph + ph / 2);
    }
    vertex(x, topYr + h - eh);
    endShape();
    fill(0); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text((label || 'R') + ' = ' + rKohms + ' kΩ', x + pw + 8, topYr + h / 2);
    pop();
}

// ── Ground symbol ─────────────────────────────────────────────────────────
function drawGndSymbol(x, y) {
    push();
    stroke(0); strokeWeight(2);
    line(x,      y,      x,      y + 8);
    line(x - 10, y + 8,  x + 10, y + 8);
    line(x - 6,  y + 12, x + 6,  y + 12);
    line(x - 2,  y + 16, x + 2,  y + 16);
    pop();
}

// ── SPDT switch ───────────────────────────────────────────────────────────
// Three terminals at the same Y: A (left), C/common (centre), B (right)
function drawSPDTSwitch(xA, xC, xB, y, pos) {
    push();
    const padX = 14, padTop = 36, padBot = 18;
    noStroke();
    fill(pos === 'A' ? color(210, 255, 215, 200) : color(210, 230, 255, 200));
    rect(xA - padX, y - padTop, (xB - xA) + padX * 2, padTop + padBot, 4);

    fill(0); stroke(0); strokeWeight(1);
    circle(xA, y, 9);
    circle(xC, y, 9);
    circle(xB, y, 9);

    fill(0); noStroke(); textSize(10); textAlign(CENTER, BOTTOM);
    text('A', xA, y - 5);
    text('B', xB, y - 5);

    stroke(0); strokeWeight(3);
    if (pos === 'A') {
        line(xC, y, xA, y);   // blade left → charging
    } else {
        line(xC, y, xB, y);   // blade right → discharging
    }

    fill(pos === 'A' ? color(0, 130, 0) : color(0, 70, 180));
    noStroke(); textSize(10); textAlign(CENTER, BOTTOM);
    text(pos === 'A' ? 'Pos A — charging' : 'Pos B — discharging',
         (xA + xB) / 2, y - 22);
    pop();
}

// ══════════════════════════════════════════════════════════════════════════
// GRAPHS
// Left panel  : Vc(t) — blue = charging, orange = discharging
// Right panel : |I(t)|
// ══════════════════════════════════════════════════════════════════════════

function drawGraphs() {
    push();

    const gTop    = circuitHeight + 18;
    const gBottom = circuitHeight + graphHeight - 18;
    const gMid    = Math.round(containerWidth / 2);
    const g1Left  = 52,       g1Right = gMid - 15;
    const g2Left  = gMid + 18, g2Right = containerWidth - 15;

    const totalT = max(absTime, 5 * max(tau1, tau2), 0.001);
    const Imax   = max(vs / max(r1Val, 0.001), 0.001);

    // ── Voltage graph ──────────────────────────────────────────────────────
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Capacitor Voltage  Vc(t)', (g1Left + g1Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g1Left, gTop, g1Left, gBottom);
    line(g1Left, gBottom, g1Right, gBottom);

    fill(80); noStroke(); textSize(9);
    const vStep = max(1, ceil(vs / 4));
    for (let v = 0; v <= vs; v += vStep) {
        const gy = map(v, 0, vs, gBottom, gTop);
        textAlign(RIGHT, CENTER);
        text(v + 'V', g1Left - 3, gy);
        stroke(220); strokeWeight(0.5); line(g1Left, gy, g1Right, gy); noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        const gx = map(i, 0, 5, g1Left, g1Right);
        text(i + 'τ', gx, gBottom + 2);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(gx, gTop, gx, gBottom); noStroke(); }
    }
    drawDashedLine(g1Left, gTop, g1Right, gTop, [4, 4], color(100, 100, 220));

    if (graphData.length > 1) {
        let prev = null;
        for (const pt of graphData) {
            const gx = constrain(map(pt.t, 0, totalT, g1Left, g1Right), g1Left, g1Right);
            const gy = constrain(map(pt.vc, 0, vs, gBottom, gTop), gTop, gBottom);
            if (prev) {
                stroke(pt.phase === 'A' ? color(0, 100, 220) : color(210, 70, 0));
                strokeWeight(2.5);
                line(prev.x, prev.y, gx, gy);
            }
            prev = { x: gx, y: gy };
        }
    }

    // ── Current graph ──────────────────────────────────────────────────────
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Circuit Current  |I(t)|', (g2Left + g2Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g2Left, gTop, g2Left, gBottom);
    line(g2Left, gBottom, g2Right, gBottom);

    fill(80); noStroke(); textSize(9);
    for (let i = 0; i <= 4; i++) {
        const iv = Imax * i / 4;
        const gy = map(iv, 0, Imax, gBottom, gTop);
        textAlign(RIGHT, CENTER);
        text(iv.toFixed(2) + 'mA', g2Left - 3, gy);
        stroke(220); strokeWeight(0.5); line(g2Left, gy, g2Right, gy); noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        const gx = map(i, 0, 5, g2Left, g2Right);
        text(i + 'τ', gx, gBottom + 2);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(gx, gTop, gx, gBottom); noStroke(); }
    }
    drawDashedLine(g2Left, gTop, g2Right, gTop, [4, 4], color(220, 80, 80));

    if (graphData.length > 1) {
        let prev = null;
        for (const pt of graphData) {
            const gx = constrain(map(pt.t, 0, totalT, g2Left, g2Right), g2Left, g2Right);
            const gy = constrain(map(abs(pt.i), 0, Imax, gBottom, gTop), gTop, gBottom);
            if (prev) {
                stroke(pt.phase === 'A' ? color(0, 100, 220) : color(210, 70, 0));
                strokeWeight(2.5);
                line(prev.x, prev.y, gx, gy);
            }
            prev = { x: gx, y: gy };
        }
    }

    // Legend
    noStroke(); textSize(9); textAlign(LEFT, TOP);
    fill(0, 100, 220);  text('─ charging (A)',    g2Left + 4,  gTop - 13);
    fill(210, 70, 0);   text('─ discharging (B)', g2Left + 90, gTop - 13);

    pop();
}

// ══════════════════════════════════════════════════════════════════════════
// CONTROLS
// ══════════════════════════════════════════════════════════════════════════

function drawControls() {
    fill(245); stroke(200); strokeWeight(1);
    rect(0, drawHeight, containerWidth, controlHeight);

    drawBtn(isAnimating ? 'Stop' : 'Start',
            startBtnX, startBtnY, startBtnW, startBtnH,
            color(70, 130, 180));

    drawBtn('Reset',
            resetBtnX, resetBtnY, resetBtnW, resetBtnH,
            color(100, 100, 130));

    const swLabel = switchPos === 'A' ? '→ Discharge (B)' : '← Charge (A)';
    const swColor = switchPos === 'A' ? color(0, 80, 200) : color(0, 130, 60);
    drawBtn(swLabel, swBtnX, swBtnY, swBtnW, swBtnH, swColor);

    fill(60); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text('τ₁ = ' + formatTau(tau1) + '   τ₂ = ' + formatTau(tau2),
         containerWidth - 15, drawHeight + 25);

    drawSlider('Source Voltage Vs:', vs,   1, 20,  sliderX, sy1, sliderWidth, ' V');
    drawSlider('Charge R₁:',         r1Val, 1, 100, sliderX, sy2, sliderWidth, ' kΩ');
    drawSlider('Discharge R₂:',      r2Val, 1, 100, sliderX, sy3, sliderWidth, ' kΩ');
    drawSlider('Capacitance C:',     cVal,  1, 100, sliderX, sy4, sliderWidth, ' µF');

    if (!isAnimating) {
        fill(120, 50, 150); noStroke(); textSize(10); textAlign(LEFT, CENTER);
        text("Press 'Start', then flip the switch to charge (A) or discharge (B).",
             15, drawHeight + 45);
    }
}

function drawSlider(label, value, minVal, maxVal, x, y, w, suffix) {
    fill(0); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text(label + ' ' + value + suffix, x - 8, y);
    fill(200); stroke(150); strokeWeight(1);
    rect(x, y - 4, w, 8, 4);
    const fw = map(value, minVal, maxVal, 0, w);
    fill(70, 130, 180); noStroke();
    rect(x, y - 4, fw, 8, 4);
    fill(255); stroke(70, 130, 180); strokeWeight(2);
    ellipse(x + fw, y, 14, 14);
}

function drawBtn(label, x, y, w, h, col) {
    fill(col); stroke(50, 80, 120); strokeWeight(1);
    rect(x, y, w, h, 4);
    fill(255); noStroke(); textSize(12); textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
}

// ══════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════

function drawDashedLine(x1, y1, x2, y2, pattern, col) {
    push();
    stroke(col); strokeWeight(1);
    const d = dist(x1, y1, x2, y2);
    if (d === 0) { pop(); return; }
    const dx = (x2 - x1) / d, dy = (y2 - y1) / d;
    let pos = 0, idx = 0;
    while (pos < d) {
        const sl = min(pattern[idx % pattern.length], d - pos);
        if (idx % 2 === 0) {
            line(x1 + dx * pos,        y1 + dy * pos,
                 x1 + dx * (pos + sl), y1 + dy * (pos + sl));
        }
        pos += sl; idx++;
    }
    pop();
}

function formatTau(tauSec) {
    if (tauSec >= 1)     return tauSec.toFixed(2) + ' s';
    if (tauSec >= 0.001) return (tauSec * 1000).toFixed(1) + ' ms';
    return (tauSec * 1e6).toFixed(1) + ' µs';
}

// ══════════════════════════════════════════════════════════════════════════
// INTERACTION
// ══════════════════════════════════════════════════════════════════════════

function mousePressed() {
    const mx = mouseX, my = mouseY;

    // Click on SPDT switch in the circuit
    if (swAXg && my >= swYg - 42 && my <= swYg + 22 &&
        mx >= swAXg - 14 && mx <= swBXg + 14) {
        flipSwitch();
        return;
    }

    if (inBtn(mx, my, startBtnX, startBtnY, startBtnW, startBtnH)) {
        isAnimating = !isAnimating;
        return;
    }
    if (inBtn(mx, my, resetBtnX, resetBtnY, resetBtnW, resetBtnH)) {
        resetSim();
        return;
    }
    if (inBtn(mx, my, swBtnX, swBtnY, swBtnW, swBtnH)) {
        flipSwitch();
        return;
    }
    handleSlider(mx, my);
}

function mouseDragged() {
    handleSlider(mouseX, mouseY);
}

function inBtn(mx, my, x, y, w, h) {
    return mx >= x && mx <= x + w && my >= y && my <= y + h;
}

function flipSwitch() {
    vcAtSwitch = vcNow;
    simTime    = 0;
    iNow       = 0;
    switchPos  = (switchPos === 'A') ? 'B' : 'A';
    // Keep graphData so the full charge + discharge history is visible
}

function handleSlider(mx, my) {
    if (my >= sy1 - 10 && my <= sy1 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        vs = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 1, 20), 1, 20));
        recalculate(); resetData();
    }
    if (my >= sy2 - 10 && my <= sy2 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        r1Val = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 1, 100), 1, 100));
        recalculate(); resetData();
    }
    if (my >= sy3 - 10 && my <= sy3 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        r2Val = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 1, 100), 1, 100));
        recalculate(); resetData();
    }
    if (my >= sy4 - 10 && my <= sy4 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        cVal = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 1, 100), 1, 100));
        recalculate(); resetData();
    }
}

function resetData() {
    graphData  = [];
    simTime    = 0;
    absTime    = 0;
    vcAtSwitch = vcNow;
}

function resetSim() {
    isAnimating   = false;
    switchPos     = 'A';
    simTime       = 0;
    absTime       = 0;
    vcAtSwitch    = 0;
    vcNow         = 0;
    iNow          = 0;
    graphData     = [];
    animationTime = 0;
    recalculate();
}

// ══════════════════════════════════════════════════════════════════════════
// RESPONSIVE
// ══════════════════════════════════════════════════════════════════════════

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    computeLayout();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth  = max(500, floor(container.width));
}

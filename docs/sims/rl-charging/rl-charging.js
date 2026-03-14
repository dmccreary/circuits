// RL Energizing / De-energizing Circuit MicroSim
// SPDT switch on the top rail:
//   Position A (left)  — battery + R₁ energizes the inductor
//   Position B (right) — inductor de-energizes through R₂ (freewheeling)
// Inductor sits in the centre; switch common connects down to inductor top.
// All controls are canvas-based (no DOM elements) for iframe compatibility.
//
// animationTime and lineWidth are globals declared in circuit-lib.js

// ── Canvas dimensions ──────────────────────────────────────────────────────
let canvasWidth   = 580;
let circuitHeight = 280;
let graphHeight   = 210;
let controlHeight = 155;
let drawHeight;
let canvasHeight;
let containerWidth;

let lineWidth = 3;

// ── Animation / switch state ───────────────────────────────────────────────
let isAnimating = false;
let switchPos   = 'A';  // A = energizing, B = de-energizing

// ── Simulation state ───────────────────────────────────────────────────────
let simTime    = 0;    // s since last switch flip
let absTime    = 0;    // s since Start was pressed (graph x-axis)
let ilAtSwitch = 0;   // IL (mA) when switch last changed
let ilNow      = 0;   // inductor current (mA)
let vlNow      = 0;   // inductor voltage (V, signed: + energizing, − de-energizing)

let graphData  = [];   // [{t, il, vl, phase}]

// ── Circuit parameters ─────────────────────────────────────────────────────
let vs    = 9;    // source voltage (V)
let r1Val = 100;  // energize resistance (Ω)
let r2Val = 100;  // de-energize resistance (Ω)
let lVal  = 100;  // inductance (mH)
let tau1  = 0;    // L/R1 (s)
let tau2  = 0;    // L/R2 (s)

// ── Layout ─────────────────────────────────────────────────────────────────
let sliderLeftMargin = 280;
let sliderX, sliderWidth;
let sy1, sy2, sy3, sy4;

let startBtnX, startBtnY, startBtnW = 80, startBtnH = 26;
let resetBtnX, resetBtnY, resetBtnW = 70, resetBtnH = 26;
let swBtnX,   swBtnY,   swBtnW = 140, swBtnH = 26;

// Switch hit-box (circuit diagram)
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
        'RL energizing and de-energizing circuit. ' +
        'Switch position A energizes the inductor via the battery and R1. ' +
        'Switch position B de-energizes it through R2.',
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

        const ilFinal = vs / max(r1Val, 0.001) * 1000;  // mA — final current at Vs/R1

        if (switchPos === 'A') {
            // Energize: IL rises toward Vs/R1, VL = Vs·e^(−t/τ)
            ilNow = ilFinal * (1 - Math.exp(-simTime / max(tau1, 1e-9)));
            vlNow = vs * Math.exp(-simTime / max(tau1, 1e-9));
            ilNow = constrain(ilNow, 0, ilFinal);
        } else {
            // De-energize: IL decays from ilAtSwitch, VL is negative (flyback)
            const vlAtSwitch0 = (ilAtSwitch / 1000) * r2Val;
            ilNow = ilAtSwitch * Math.exp(-simTime / max(tau2, 1e-9));
            vlNow = -vlAtSwitch0 * Math.exp(-simTime / max(tau2, 1e-9));
            ilNow = max(ilNow, 0);
        }

        const lastT = graphData.length > 0 ? graphData[graphData.length - 1].t : -Infinity;
        if (absTime - lastT > max(tau_cur, 0.001) * 0.02) {
            graphData.push({ t: absTime, il: ilNow, vl: vlNow, phase: switchPos });
        }
    }

    drawCircuit();

    stroke(180); strokeWeight(1);
    line(0, circuitHeight, containerWidth, circuitHeight);

    drawGraphs();
    drawControls();
}

function recalculate() {
    tau1 = lVal * 0.001 / max(r1Val, 0.001);   // H / Ω = seconds
    tau2 = lVal * 0.001 / max(r2Val, 0.001);
}

// ══════════════════════════════════════════════════════════════════════════
// CIRCUIT DRAWING
// Same SPDT topology as RC charging, with inductor (coils) replacing capacitor
// ══════════════════════════════════════════════════════════════════════════

function drawCircuit() {
    push();

    const W    = containerWidth;
    const topY = 55;
    const botY = 228;

    const batX    = Math.floor(W * 0.10);
    const r1W     = Math.floor(W * 0.13);
    const r1Left  = Math.floor(W * 0.18);
    const r1Right = r1Left + r1W;

    const swAX = Math.floor(W * 0.40);
    const swCX = Math.floor(W * 0.52);
    const swBX = Math.floor(W * 0.64);
    const swY  = topY;

    const r2X    = Math.floor(W * 0.82);
    const r2H    = Math.floor(W * 0.14);
    const r2TopY = topY + 8;
    const r2BotY = r2TopY + r2H;

    const indX    = swCX;
    const indTopY = swY + 40;
    const indBotY = botY;
    const indH    = indBotY - indTopY;

    swAXg = swAX; swBXg = swBX; swYg = swY;

    // ── Current fraction for animation ────────────────────────────────────
    const ilFinal = vs / max(r1Val, 0.001) * 1000;
    let iFrac = 0;
    if (isAnimating && switchPos === 'A') {
        iFrac = ilNow / max(ilFinal, 0.001);
    } else if (isAnimating && switchPos === 'B') {
        iFrac = ilNow / max(ilAtSwitch, 0.001);
    }
    const eSpeed = constrain(iFrac, 0, 1) * 0.06;
    const active = isAnimating && iFrac > 0.005;

    function liveWire(x1, y1, x2, y2) {
        if (active) drawAnimatedWire(x1, y1, x2, y2, eSpeed, 1.0);
        else { stroke(0); strokeWeight(lineWidth); line(x1, y1, x2, y2); }
    }

    // ── Title ──────────────────────────────────────────────────────────────
    fill(0); noStroke(); textSize(14); textAlign(CENTER, TOP);
    text('RL Energizing / De-energizing Circuit', W / 2, 10);

    // ── Battery (left vertical) ────────────────────────────────────────────
    const batMidY = Math.round((topY + botY) / 2);
    liveWire(batX, topY, batX, batMidY - 22);
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
    textAlign(RIGHT, CENTER); text('+', batX - 20, batMidY - 18);
    text('−', batX - 20, batMidY + 18);
    textAlign(LEFT,  CENTER); text(vs + ' V', batX + 22, batMidY);

    // ── Top rail: bat+ → R₁ → terminal A ──────────────────────────────────
    liveWire(batX, topY, r1Left, topY);
    drawRHorizRL(r1Left, topY, r1W, r1Val, 'R₁');
    liveWire(r1Right, topY, swAX, topY);

    // ── Terminal B → R₂ (right, vertical) ─────────────────────────────────
    if (switchPos === 'B' && active) {
        drawAnimatedWire(swBX, swY, r2X, swY, eSpeed, 1.0);
        drawAnimatedWire(r2X, r2BotY, r2X, botY, eSpeed, 1.0);
    } else {
        stroke(0); strokeWeight(lineWidth);
        line(swBX, swY, r2X, swY);
        line(r2X, r2BotY, r2X, botY);
    }
    drawRVertRL(r2X, r2TopY, r2H, r2Val, 'R₂');

    // ── SPDT switch ────────────────────────────────────────────────────────
    drawSPDTSwitch(swAX, swCX, swBX, swY, switchPos);

    // ── Common → inductor top ──────────────────────────────────────────────
    if (active) drawAnimatedWire(swCX, swY + 10, indX, indTopY, eSpeed, 1.0);
    else { stroke(0); strokeWeight(lineWidth); line(swCX, swY + 10, indX, indTopY); }

    // ── Inductor with magnetic field glow ─────────────────────────────────
    const ilFrac = constrain(ilNow / max(ilFinal, 0.001), 0, 1);

    if (ilFrac > 0.01) {
        const glowH = indH * ilFrac;
        noStroke();
        // Lerp light-blue → deep-purple as field builds
        fill(
            lerp(180, 60,  ilFrac),
            lerp(210, 40,  ilFrac),
            lerp(255, 200, ilFrac),
            190
        );
        rect(indX - 16, indBotY - glowH, 32, glowH);
    }

    // Vertical inductor coils (right-facing semicircles)
    const numCoils = 5;
    const endW    = 10;
    const coilsH  = indH - 2 * endW;
    const coilH   = coilsH / numCoils;
    const coilRad = 12;
    stroke(0); strokeWeight(lineWidth); noFill();
    line(indX, indTopY, indX, indTopY + endW);
    for (let i = 0; i < numCoils; i++) {
        const cy = indTopY + endW + i * coilH + coilH / 2;
        arc(indX, cy, coilRad * 2, coilH * 0.9, PI + HALF_PI, HALF_PI);
    }
    line(indX, indTopY + endW + coilsH, indX, indBotY);

    // Labels beside inductor
    fill(0); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text('L = ' + lVal + ' mH', indX + coilRad + 8, indTopY + indH * 0.30);
    fill(0, 70, 190);
    text('IL = ' + ilNow.toFixed(1) + ' mA', indX + coilRad + 8, indTopY + indH * 0.50);
    fill(vlNow >= 0 ? color(0, 130, 0) : color(180, 0, 0));
    text('VL = ' + vlNow.toFixed(2) + ' V', indX + coilRad + 8, indTopY + indH * 0.68);

    // ── Ground symbols ─────────────────────────────────────────────────────
    drawGndSymbol(indX, botY);
    drawGndSymbol(r2X,  botY);

    // ── Bottom rail ────────────────────────────────────────────────────────
    liveWire(batX, botY, indX, botY);
    liveWire(indX, botY, r2X,  botY);

    // ── Live readouts ──────────────────────────────────────────────────────
    fill(0, 70, 190); noStroke(); textSize(12); textAlign(LEFT, TOP);
    const lblY  = botY + 22;
    const lbl   = switchPos === 'A' ? 'I_energize' : 'I_deenergize';
    text(lbl + ' = ' + ilNow.toFixed(1) + ' mA', batX + 10, lblY);
    text('τ = ' + formatTau(switchPos === 'A' ? tau1 : tau2), batX + 185, lblY);

    pop();
}

// ── Horizontal resistor (Ω units) ─────────────────────────────────────────
function drawRHorizRL(x, railY, w, rOhms, label) {
    push();
    stroke(0); strokeWeight(lineWidth); noFill();
    const ew = w * 0.15, peaks = 6;
    const pw = (w - 2 * ew) / peaks, ph = 9;
    line(x, railY, x + ew, railY);
    line(x + w - ew, railY, x + w, railY);
    beginShape();
    vertex(x + ew, railY);
    for (let i = 0; i < peaks; i++) {
        vertex(x + ew + i * pw + pw / 2, (i % 2 === 0) ? railY - ph : railY + ph);
    }
    vertex(x + w - ew, railY);
    endShape();
    fill(0); noStroke(); textSize(11); textAlign(CENTER, BOTTOM);
    text((label || 'R') + ' = ' + rOhms + ' Ω', x + w / 2, railY - ph - 3);
    pop();
}

// ── Vertical resistor (Ω units) ───────────────────────────────────────────
function drawRVertRL(x, topYr, h, rOhms, label) {
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
    text((label || 'R') + ' = ' + rOhms + ' Ω', x + pw + 8, topYr + h / 2);
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
    if (pos === 'A') line(xC, y, xA, y);
    else             line(xC, y, xB, y);

    fill(pos === 'A' ? color(0, 130, 0) : color(0, 70, 180));
    noStroke(); textSize(10); textAlign(CENTER, BOTTOM);
    text(pos === 'A' ? 'Pos A — energizing' : 'Pos B — de-energizing',
         (xA + xB) / 2, y - 22);
    pop();
}

// ══════════════════════════════════════════════════════════════════════════
// GRAPHS
// Left panel  : IL(t) — inductor current in mA
// Right panel : VL(t) — inductor voltage (signed; + energizing, − flyback)
// ══════════════════════════════════════════════════════════════════════════

function drawGraphs() {
    push();

    const gTop    = circuitHeight + 18;
    const gBottom = circuitHeight + graphHeight - 18;
    const gMid    = Math.round(containerWidth / 2);
    const g1Left  = 52,        g1Right = gMid - 15;
    const g2Left  = gMid + 18, g2Right = containerWidth - 15;

    const totalT = max(absTime, 5 * max(tau1, tau2), 0.001);
    const Imax   = vs / max(r1Val, 0.001) * 1000;                    // mA
    const VLmax  = max(vs, (ilAtSwitch / 1000) * r2Val, 1);          // V  (max |VL|)

    // ── Current graph (IL) ─────────────────────────────────────────────────
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Inductor Current  IL(t)', (g1Left + g1Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g1Left, gTop, g1Left, gBottom);
    line(g1Left, gBottom, g1Right, gBottom);

    fill(80); noStroke(); textSize(9);
    const iStep = max(round(Imax / 4 / 10) * 10, 10);
    for (let iv = 0; iv <= Imax * 1.05; iv += iStep) {
        const gy = map(iv, 0, Imax, gBottom, gTop);
        if (gy < gTop) continue;
        textAlign(RIGHT, CENTER);
        text(iv.toFixed(0) + 'mA', g1Left - 3, gy);
        stroke(220); strokeWeight(0.5); line(g1Left, gy, g1Right, gy); noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        const gx = map(i, 0, 5, g1Left, g1Right);
        text(i + 'τ', gx, gBottom + 2);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(gx, gTop, gx, gBottom); noStroke(); }
    }
    // Dashed line at IL_final (Vs/R1)
    const ilFinDash = map(Imax, 0, Imax, gBottom, gTop);
    drawDashedLine(g1Left, ilFinDash, g1Right, ilFinDash, [4, 4], color(0, 100, 220));

    if (graphData.length > 1) {
        let prev = null;
        for (const pt of graphData) {
            const gx = constrain(map(pt.t, 0, totalT, g1Left, g1Right), g1Left, g1Right);
            const gy = constrain(map(pt.il, 0, Imax, gBottom, gTop), gTop, gBottom);
            if (prev) {
                stroke(pt.phase === 'A' ? color(0, 100, 220) : color(210, 70, 0));
                strokeWeight(2.5);
                line(prev.x, prev.y, gx, gy);
            }
            prev = { x: gx, y: gy };
        }
    }

    // ── Voltage graph (VL, signed) ─────────────────────────────────────────
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Inductor Voltage  VL(t)', (g2Left + g2Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g2Left, gTop, g2Left, gBottom);
    line(g2Left, gBottom, g2Right, gBottom);

    // Zero line (centre of graph)
    const gZero = (gTop + gBottom) / 2;
    drawDashedLine(g2Left, gZero, g2Right, gZero, [4, 2], color(150));

    fill(80); noStroke(); textSize(9);
    for (let iv = -VLmax; iv <= VLmax * 1.05; iv += max(round(VLmax / 2 * 10) / 10, 0.5)) {
        const gy = map(iv, -VLmax, VLmax, gBottom, gTop);
        if (gy < gTop || gy > gBottom) continue;
        textAlign(RIGHT, CENTER);
        text(iv.toFixed(1) + 'V', g2Left - 3, gy);
        stroke(220); strokeWeight(0.5); line(g2Left, gy, g2Right, gy); noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        const gx = map(i, 0, 5, g2Left, g2Right);
        text(i + 'τ', gx, gBottom + 2);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(gx, gTop, gx, gBottom); noStroke(); }
    }

    if (graphData.length > 1) {
        let prev = null;
        for (const pt of graphData) {
            const gx = constrain(map(pt.t, 0, totalT, g2Left, g2Right), g2Left, g2Right);
            const gy = constrain(map(pt.vl, -VLmax, VLmax, gBottom, gTop), gTop, gBottom);
            if (prev) {
                stroke(pt.phase === 'A' ? color(0, 130, 0) : color(180, 0, 0));
                strokeWeight(2.5);
                line(prev.x, prev.y, gx, gy);
            }
            prev = { x: gx, y: gy };
        }
    }

    // Legend
    noStroke(); textSize(9); textAlign(LEFT, TOP);
    fill(0, 130, 0);  text('─ energizing (A)',       g2Left + 4,  gTop - 13);
    fill(180, 0, 0);  text('─ de-energizing (B)',    g2Left + 95, gTop - 13);

    pop();
}

// ══════════════════════════════════════════════════════════════════════════
// CONTROLS
// ══════════════════════════════════════════════════════════════════════════

function drawControls() {
    fill(245); stroke(200); strokeWeight(1);
    rect(0, drawHeight, containerWidth, controlHeight);

    drawBtn(isAnimating ? 'Stop' : 'Start',
            startBtnX, startBtnY, startBtnW, startBtnH, color(70, 130, 180));

    drawBtn('Reset',
            resetBtnX, resetBtnY, resetBtnW, resetBtnH, color(100, 100, 130));

    const swLabel = switchPos === 'A' ? '→ De-energize (B)' : '← Energize (A)';
    const swColor = switchPos === 'A' ? color(0, 80, 200) : color(0, 130, 60);
    drawBtn(swLabel, swBtnX, swBtnY, swBtnW, swBtnH, swColor);

    fill(60); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text('τ₁ = ' + formatTau(tau1) + '   τ₂ = ' + formatTau(tau2),
         containerWidth - 15, drawHeight + 25);

    drawSlider('Source Voltage Vs:', vs,    1, 20,   sliderX, sy1, sliderWidth, ' V');
    drawSlider('Energize R₁:',      r1Val, 10, 1000, sliderX, sy2, sliderWidth, ' Ω');
    drawSlider('De-energize R₂:',   r2Val, 10, 1000, sliderX, sy3, sliderWidth, ' Ω');
    drawSlider('Inductance L:',     lVal,  10, 500,  sliderX, sy4, sliderWidth, ' mH');

    if (!isAnimating) {
        fill(120, 50, 150); noStroke(); textSize(10); textAlign(LEFT, CENTER);
        text("Press 'Start', then flip the switch to energize (A) or de-energize (B).",
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
            line(x1 + dx * pos, y1 + dy * pos,
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

    // Click SPDT switch in circuit diagram
    if (swAXg && my >= swYg - 42 && my <= swYg + 22 &&
        mx >= swAXg - 14 && mx <= swBXg + 14) {
        flipSwitch();
        return;
    }

    if (inBtn(mx, my, startBtnX, startBtnY, startBtnW, startBtnH)) {
        isAnimating = !isAnimating; return;
    }
    if (inBtn(mx, my, resetBtnX, resetBtnY, resetBtnW, resetBtnH)) {
        resetSim(); return;
    }
    if (inBtn(mx, my, swBtnX, swBtnY, swBtnW, swBtnH)) {
        flipSwitch(); return;
    }
    handleSlider(mx, my);
}

function mouseDragged() { handleSlider(mouseX, mouseY); }

function inBtn(mx, my, x, y, w, h) {
    return mx >= x && mx <= x + w && my >= y && my <= y + h;
}

function flipSwitch() {
    ilAtSwitch = ilNow;
    simTime    = 0;
    vlNow      = 0;
    switchPos  = (switchPos === 'A') ? 'B' : 'A';
}

function handleSlider(mx, my) {
    if (my >= sy1 - 10 && my <= sy1 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        vs = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 1, 20), 1, 20));
        recalculate(); resetData();
    }
    if (my >= sy2 - 10 && my <= sy2 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        r1Val = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 10, 1000), 10, 1000));
        recalculate(); resetData();
    }
    if (my >= sy3 - 10 && my <= sy3 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        r2Val = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 10, 1000), 10, 1000));
        recalculate(); resetData();
    }
    if (my >= sy4 - 10 && my <= sy4 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        lVal = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 10, 500), 10, 500));
        recalculate(); resetData();
    }
}

function resetData() {
    graphData  = [];
    simTime    = 0;
    absTime    = 0;
    ilAtSwitch = ilNow;
}

function resetSim() {
    isAnimating   = false;
    switchPos     = 'A';
    simTime       = 0;
    absTime       = 0;
    ilAtSwitch    = 0;
    ilNow         = 0;
    vlNow         = 0;
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

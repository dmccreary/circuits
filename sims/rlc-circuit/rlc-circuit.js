// RLC Series Circuit Transient Response MicroSim
// Switch closes at t=0; series R, L, C driven by DC source.
// Numerically integrates:
//   dIL/dt = (Vs − R·IL − Vc) / L
//   dVc/dt = IL / C
// Shows Vc(t) and IL(t) with damping type indicator.
// All controls are canvas-based for iframe compatibility.
//
// animationTime and lineWidth are globals declared in circuit-lib.js

// ── Canvas dimensions ──────────────────────────────────────────────────────
let circuitHeight = 280;
let graphHeight   = 220;
let controlHeight = 155;
let drawHeight;
let canvasHeight;
let containerWidth;

let lineWidth = 3;

// ── Simulation state ───────────────────────────────────────────────────────
let isAnimating = false;
let switchClosed = false;

let vcNow  = 0;    // capacitor voltage (V)
let ilNow  = 0;    // inductor current  (A)
let simTime = 0;   // s since switch closed
let graphData = []; // [{t, vc, il}]

// ── Circuit parameters ─────────────────────────────────────────────────────
let vs   = 10;   // source voltage (V)
let rVal = 20;   // resistance (Ω)
let lVal = 100;  // inductance (mH)
let cVal = 100;  // capacitance (µF)

// Derived parameters (recomputed in recalculate)
let alpha   = 0;   // neper frequency R/(2L)   (rad/s)
let omega0  = 0;   // natural frequency 1/√LC  (rad/s)
let omegaD  = 0;   // damped frequency          (rad/s)
let rCrit   = 0;   // critical resistance 2√(L/C) (Ω)
let dampingType = 'underdamped';
let T0      = 0;   // natural period 2π/ω₀     (s)

// ── Layout ─────────────────────────────────────────────────────────────────
let sliderLeftMargin = 280;
let sliderX, sliderWidth;
let sy1, sy2, sy3, sy4;

let startBtnX, startBtnY, startBtnW = 80,  startBtnH = 26;
let resetBtnX, resetBtnY, resetBtnW = 70,  resetBtnH = 26;

// Switch hit-box in circuit diagram
let swHitX = 0, swHitY = 0, swHitW = 50, swHitH = 40;

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
        'RLC series circuit transient response. ' +
        'Close the switch to start charging. ' +
        'Adjust R to see overdamped, critically damped, or underdamped responses.',
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
}

// ══════════════════════════════════════════════════════════════════════════
// DRAW LOOP
// ══════════════════════════════════════════════════════════════════════════

function draw() {
    background(255);

    if (isAnimating && switchClosed) {
        // Time step: one natural period per real second
        const dt_sim = (deltaTime / 1000) * max(T0, 0.0001);
        animationTime += deltaTime;

        // Sub-stepped Euler integration for stability
        const numSteps = 20;
        const dt_sub   = dt_sim / numSteps;
        for (let s = 0; s < numSteps; s++) {
            const lSI = lVal * 0.001;   // H
            const cSI = cVal * 1e-6;    // F
            const dIL = (vs - rVal * ilNow - vcNow) / lSI * dt_sub;
            const dVc = ilNow / cSI * dt_sub;
            ilNow += dIL;
            vcNow += dVc;
        }
        simTime += dt_sim;

        const lastT = graphData.length > 0 ? graphData[graphData.length - 1].t : -Infinity;
        if (simTime - lastT > max(T0, 0.0001) * 0.015) {
            graphData.push({ t: simTime, vc: vcNow, il: ilNow * 1000 });  // il in mA
        }
    }

    drawCircuit();

    stroke(180); strokeWeight(1);
    line(0, circuitHeight, containerWidth, circuitHeight);

    drawGraphs();
    drawControls();
}

function recalculate() {
    const lSI = lVal * 0.001;
    const cSI = cVal * 1e-6;
    alpha  = rVal / (2 * lSI);
    omega0 = 1 / Math.sqrt(lSI * cSI);
    rCrit  = 2 * Math.sqrt(lSI / cSI);
    T0     = TWO_PI / omega0;

    if (alpha < omega0) {
        omegaD = Math.sqrt(omega0 * omega0 - alpha * alpha);
        dampingType = 'underdamped';
    } else if (Math.abs(alpha - omega0) < omega0 * 0.01) {
        omegaD = 0;
        dampingType = 'critically damped';
    } else {
        omegaD = 0;
        dampingType = 'overdamped';
    }
}

// ══════════════════════════════════════════════════════════════════════════
// CIRCUIT DRAWING
// Layout: Battery(left) — Switch — R — L — (top rail)
//                                          |
//                                         [C] (right vertical)
//                                          |
//         battery(−) ────────────────────(bottom rail)
// ══════════════════════════════════════════════════════════════════════════

function drawCircuit() {
    push();

    const W    = containerWidth;
    const topY = 55;
    const botY = 228;

    // X-coordinates
    const batX   = Math.floor(W * 0.07);
    const swLeft = Math.floor(W * 0.13);
    const swRight= Math.floor(W * 0.20);
    const rLeft  = Math.floor(W * 0.23);
    const rW     = Math.floor(W * 0.16);
    const rRight = rLeft + rW;
    const lLeft  = rRight + Math.floor(W * 0.04);
    const lW     = Math.floor(W * 0.20);
    const lRight = lLeft + lW;
    const capX   = Math.floor(W * 0.87);

    // Capacitor geometry (right side, vertical)
    const capTopY = topY + 8;
    const capBotY = botY - 8;
    const capMidY = Math.round((capTopY + capBotY) / 2);
    const plateW  = 44;
    const gapH    = 20;

    // Store switch hit-box
    swHitX = swLeft - 5; swHitY = topY - 20; swHitW = swRight - swLeft + 10; swHitH = 40;

    // ── Animated wire helper ───────────────────────────────────────────────
    const ilMax  = vs / max(rVal, 0.1);                // A — rough max current
    const iFrac  = constrain(Math.abs(ilNow) / max(ilMax, 0.001), 0, 1);
    const eSpeed = iFrac * 0.06;
    const active = isAnimating && switchClosed && iFrac > 0.005;

    function liveWire(x1, y1, x2, y2) {
        if (active) drawAnimatedWire(x1, y1, x2, y2, eSpeed, 1.0);
        else { stroke(0); strokeWeight(lineWidth); line(x1, y1, x2, y2); }
    }

    // ── Title ──────────────────────────────────────────────────────────────
    fill(0); noStroke(); textSize(14); textAlign(CENTER, TOP);
    text('RLC Series Circuit — Transient Response', W / 2, 10);

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
    textAlign(LEFT, CENTER);  text(vs + ' V', batX + 22, batMidY);

    // ── Switch (inline on top rail) ────────────────────────────────────────
    liveWire(batX, topY, swLeft, topY);
    // Contact dots
    stroke(0); strokeWeight(2); fill(0);
    circle(swLeft, topY, 8);
    circle(swRight, topY, 8);
    strokeWeight(lineWidth);
    if (switchClosed) {
        liveWire(swLeft, topY, swRight, topY);
    } else {
        stroke(0); line(swLeft, topY, swLeft + (swRight - swLeft) * 0.75, topY - 18);
    }
    fill(switchClosed ? color(0, 130, 0) : color(150, 0, 0));
    noStroke(); textSize(10); textAlign(CENTER, BOTTOM);
    text(switchClosed ? 'SW closed' : 'SW open', (swLeft + swRight) / 2, topY - 20);

    // ── Resistor R (top rail) ──────────────────────────────────────────────
    liveWire(swRight, topY, rLeft, topY);
    drawRHorizRLC(rLeft, topY, rW, rVal, 'R');
    liveWire(rRight, topY, lLeft, topY);

    // ── Inductor L (top rail) ──────────────────────────────────────────────
    // Magnetic field glow under inductor
    const ilFrac = constrain(Math.abs(ilNow) / max(ilMax, 0.001), 0, 1);
    if (ilFrac > 0.01) {
        noStroke();
        fill(lerp(200, 80, ilFrac), lerp(180, 40, ilFrac), lerp(255, 200, ilFrac), 160);
        const gh = 18;
        rect(lLeft, topY - gh, lRight - lLeft, gh);
    }
    drawLHorizRLC(lLeft, topY, lW, lVal, 'L');
    liveWire(lRight, topY, capX, topY);

    // ── Top-right corner → cap top ─────────────────────────────────────────
    liveWire(capX, topY, capX, capTopY);

    // ── Capacitor (right side, vertical) ──────────────────────────────────
    const chFrac = constrain(vcNow / max(vs, 0.001), 0, 1);
    if (chFrac > 0.01) {
        const fillH = (gapH - 6) * chFrac;
        noStroke();
        fill(lerp(160, 30, chFrac), lerp(200, 100, chFrac), 255, 190);
        rectMode(CENTER);
        rect(capX, capMidY, plateW * 0.7, max(fillH, 2));
        rectMode(CORNER);
    }
    stroke(0); strokeWeight(5);
    line(capX - plateW / 2, capMidY - gapH / 2, capX + plateW / 2, capMidY - gapH / 2);
    line(capX - plateW / 2, capMidY + gapH / 2, capX + plateW / 2, capMidY + gapH / 2);
    // Wires above and below plates
    stroke(0); strokeWeight(lineWidth);
    line(capX, capTopY, capX, capMidY - gapH / 2);
    line(capX, capMidY + gapH / 2, capX, capBotY);

    fill(200, 0, 0); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text('+', capX - plateW / 2 - 5, capMidY - gapH / 2);
    fill(0, 0, 200);
    text('−', capX - plateW / 2 - 5, capMidY + gapH / 2);
    fill(0); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text('C = ' + cVal + ' µF', capX + plateW / 2 + 6, capMidY - 10);
    fill(0, 70, 190);
    text('Vc = ' + vcNow.toFixed(2) + ' V', capX + plateW / 2 + 6, capMidY + 8);

    // ── Cap bottom → bottom rail ───────────────────────────────────────────
    liveWire(capX, capBotY, capX, botY);

    // ── Ground symbols ─────────────────────────────────────────────────────
    drawGndSymbolRLC(capX, botY);

    // ── Bottom rail ────────────────────────────────────────────────────────
    liveWire(batX, botY, capX, botY);

    // ── Damping info box (top right of circuit area) ───────────────────────
    drawDampingInfo(W, topY);

    // ── Live readout ───────────────────────────────────────────────────────
    fill(0, 70, 190); noStroke(); textSize(11); textAlign(LEFT, TOP);
    const lblY = botY + 22;
    text('IL = ' + (ilNow * 1000).toFixed(2) + ' mA', batX + 10, lblY);
    text('Vc = ' + vcNow.toFixed(2) + ' V', batX + 150, lblY);
    text('t = ' + formatTime(simTime), batX + 280, lblY);

    pop();
}

function drawDampingInfo(W, topY) {
    push();
    const bx = W * 0.27, by = topY + 35;
    const bw = W * 0.23, bh = 70;

    fill(245, 248, 255); stroke(180); strokeWeight(1);
    rect(bx, by, bw, bh, 4);

    const typeColor = dampingType === 'underdamped'      ? color(0, 100, 200) :
                      dampingType === 'critically damped' ? color(0, 150, 50)  :
                                                            color(180, 80, 0);
    fill(typeColor); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text(dampingType.charAt(0).toUpperCase() + dampingType.slice(1),
         bx + bw / 2, by + 5);

    fill(60); textSize(10); textAlign(LEFT, TOP);
    const lx = bx + 8, ly = by + 20;
    text('α = ' + alpha.toFixed(1) + ' rad/s', lx, ly);
    text('ω₀ = ' + omega0.toFixed(1) + ' rad/s', lx, ly + 14);
    text('R_crit = ' + rCrit.toFixed(1) + ' Ω', lx + bw * 0.5, ly);
    if (dampingType === 'underdamped') {
        text('ωd = ' + omegaD.toFixed(1) + ' rad/s', lx + bw * 0.5, ly + 14);
    }
    pop();
}

// ── Horizontal resistor (Ω units) ─────────────────────────────────────────
function drawRHorizRLC(x, railY, w, rOhms, label) {
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

// ── Horizontal inductor (coil humps) ──────────────────────────────────────
function drawLHorizRLC(x, railY, w, lMH, label) {
    push();
    const numCoils = 4;
    const ew       = w * 0.10;
    const coilsW   = w - 2 * ew;
    const coilW    = coilsW / numCoils;
    const coilRad  = 10;
    stroke(0); strokeWeight(lineWidth); noFill();
    line(x, railY, x + ew, railY);
    line(x + w - ew, railY, x + w, railY);
    for (let i = 0; i < numCoils; i++) {
        const cx = x + ew + i * coilW + coilW / 2;
        arc(cx, railY, coilW, coilRad * 2, PI, TWO_PI);
    }
    fill(0); noStroke(); textSize(11); textAlign(CENTER, BOTTOM);
    text((label || 'L') + ' = ' + lMH + ' mH', x + w / 2, railY - coilRad - 3);
    pop();
}

// ── Ground symbol ─────────────────────────────────────────────────────────
function drawGndSymbolRLC(x, y) {
    push();
    stroke(0); strokeWeight(2);
    line(x,      y,      x,      y + 8);
    line(x - 10, y + 8,  x + 10, y + 8);
    line(x - 6,  y + 12, x + 6,  y + 12);
    line(x - 2,  y + 16, x + 2,  y + 16);
    pop();
}

// ══════════════════════════════════════════════════════════════════════════
// GRAPHS
// Left: Vc(t) — capacitor voltage
// Right: IL(t) — inductor current (mA, signed)
// ══════════════════════════════════════════════════════════════════════════

function drawGraphs() {
    push();

    const gTop    = circuitHeight + 18;
    const gBottom = circuitHeight + graphHeight - 20;
    const gMid    = Math.round(containerWidth / 2);
    const g1Left  = 52,        g1Right = gMid - 15;
    const g2Left  = gMid + 18, g2Right = containerWidth - 15;

    // Total time: show 5 natural periods or current sim time, whichever is bigger
    const totalT = max(simTime, 5 * T0, 0.0001);

    // Max current scale: Vs * sqrt(C/L) is natural scale for underdamped
    const lSI    = lVal * 0.001;
    const cSI    = cVal * 1e-6;
    const IscaleMA = max(vs * Math.sqrt(cSI / lSI) * 1000, 1);   // mA

    // ── Voltage graph (Vc) ─────────────────────────────────────────────────
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Capacitor Voltage  Vc(t)', (g1Left + g1Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g1Left, gTop, g1Left, gBottom);
    line(g1Left, gBottom, g1Right, gBottom);

    // Vc axis: 0 to 2*Vs for underdamped overshoot room
    const VcMax = vs * (dampingType === 'underdamped' ? 2.0 : 1.2);

    fill(80); noStroke(); textSize(9);
    const vStep = max(round(VcMax / 4 / 2) * 2, 1);
    for (let v = 0; v <= VcMax; v += vStep) {
        const gy = map(v, 0, VcMax, gBottom, gTop);
        textAlign(RIGHT, CENTER); text(v.toFixed(0) + 'V', g1Left - 3, gy);
        stroke(220); strokeWeight(0.5); line(g1Left, gy, g1Right, gy); noStroke();
    }
    // Dashed Vs line
    const gyVs = map(vs, 0, VcMax, gBottom, gTop);
    drawDashedLineRLC(g1Left, gyVs, g1Right, gyVs, [4, 4], color(0, 100, 220));
    fill(80); noStroke(); textSize(9); textAlign(LEFT, CENTER);
    text('Vs', g1Right - 20, gyVs - 6);

    // Time axis ticks (ms)
    textAlign(CENTER, TOP);
    const totalTms = totalT * 1000;
    const tStep = niceStep(totalTms / 5);
    for (let t = 0; t <= totalTms + tStep * 0.1; t += tStep) {
        const gx = map(t, 0, totalTms, g1Left, g1Right);
        if (gx < g1Left || gx > g1Right) continue;
        text(t.toFixed(0) + 'ms', gx, gBottom + 2);
        stroke(220); strokeWeight(0.5); line(gx, gTop, gx, gBottom); noStroke();
    }

    if (graphData.length > 1) {
        noFill();
        strokeWeight(2.5);
        for (let i = 1; i < graphData.length; i++) {
            const a = graphData[i - 1], b = graphData[i];
            const ax = map(a.t, 0, totalT, g1Left, g1Right);
            const bx = map(b.t, 0, totalT, g1Left, g1Right);
            const ay = constrain(map(a.vc, 0, VcMax, gBottom, gTop), gTop - 5, gBottom + 5);
            const by2= constrain(map(b.vc, 0, VcMax, gBottom, gTop), gTop - 5, gBottom + 5);
            stroke(color(0, 100, 220));
            line(ax, ay, bx, by2);
        }
    }

    // ── Current graph (IL, mA, signed) ─────────────────────────────────────
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Inductor Current  IL(t)', (g2Left + g2Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g2Left, gTop, g2Left, gBottom);
    line(g2Left, gBottom, g2Right, gBottom);

    const IMax = IscaleMA;
    const IMin = dampingType === 'underdamped' ? -IMax * 0.5 : 0;
    const gZero = map(0, IMin, IMax, gBottom, gTop);
    drawDashedLineRLC(g2Left, gZero, g2Right, gZero, [3, 2], color(150));

    fill(80); noStroke(); textSize(9);
    const iStepVal = niceStep((IMax - IMin) / 4);
    const iStart = Math.ceil(IMin / iStepVal) * iStepVal;
    for (let iv = iStart; iv <= IMax * 1.05; iv += iStepVal) {
        const gy = map(iv, IMin, IMax, gBottom, gTop);
        if (gy < gTop || gy > gBottom) continue;
        textAlign(RIGHT, CENTER); text(iv.toFixed(1) + 'mA', g2Left - 3, gy);
        stroke(220); strokeWeight(0.5); line(g2Left, gy, g2Right, gy); noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let t = 0; t <= totalTms + tStep * 0.1; t += tStep) {
        const gx = map(t, 0, totalTms, g2Left, g2Right);
        if (gx < g2Left || gx > g2Right) continue;
        text(t.toFixed(0) + 'ms', gx, gBottom + 2);
        stroke(220); strokeWeight(0.5); line(gx, gTop, gx, gBottom); noStroke();
    }

    if (graphData.length > 1) {
        strokeWeight(2.5);
        for (let i = 1; i < graphData.length; i++) {
            const a = graphData[i - 1], b = graphData[i];
            const ax = map(a.t, 0, totalT, g2Left, g2Right);
            const bx = map(b.t, 0, totalT, g2Left, g2Right);
            const ay = constrain(map(a.il, IMin, IMax, gBottom, gTop), gTop - 5, gBottom + 5);
            const by2= constrain(map(b.il, IMin, IMax, gBottom, gTop), gTop - 5, gBottom + 5);
            stroke(color(180, 60, 0));
            line(ax, ay, bx, by2);
        }
    }

    // Legends
    noStroke(); textSize(9); textAlign(LEFT, TOP);
    fill(0, 100, 220);  text('─ Vc(t)',  g1Left + 4,  gTop - 13);
    fill(180, 60, 0);   text('─ IL(t)',  g2Left + 4,  gTop - 13);

    pop();
}

// ══════════════════════════════════════════════════════════════════════════
// CONTROLS
// ══════════════════════════════════════════════════════════════════════════

function drawControls() {
    fill(245); stroke(200); strokeWeight(1);
    rect(0, drawHeight, containerWidth, controlHeight);

    const startLabel = isAnimating ? 'Stop' : (switchClosed ? 'Resume' : 'Start');
    drawBtnRLC(startLabel, startBtnX, startBtnY, startBtnW, startBtnH, color(70, 130, 180));
    drawBtnRLC('Reset',    resetBtnX, resetBtnY, resetBtnW, resetBtnH, color(100, 100, 130));

    fill(60); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text('ω₀ = ' + omega0.toFixed(0) + ' rad/s   ' +
         'α = '  + alpha.toFixed(0)  + ' rad/s   ' +
         'R_crit = ' + rCrit.toFixed(1) + ' Ω',
         containerWidth - 15, drawHeight + 25);

    drawSlider('Source Voltage Vs:', vs,   1,   20,  sliderX, sy1, sliderWidth, ' V');
    drawSlider('Resistance R:',      rVal, 0,   300, sliderX, sy2, sliderWidth, ' Ω');
    drawSlider('Inductance L:',      lVal, 10,  500, sliderX, sy3, sliderWidth, ' mH');
    drawSlider('Capacitance C:',     cVal, 10,  500, sliderX, sy4, sliderWidth, ' µF');

    if (!switchClosed) {
        fill(120, 50, 150); noStroke(); textSize(10); textAlign(LEFT, CENTER);
        text("Press 'Start' to close the switch and observe the transient response.",
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

function drawBtnRLC(label, x, y, w, h, col) {
    fill(col); stroke(50, 80, 120); strokeWeight(1);
    rect(x, y, w, h, 4);
    fill(255); noStroke(); textSize(12); textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
}

// ══════════════════════════════════════════════════════════════════════════
// HELPERS
// ══════════════════════════════════════════════════════════════════════════

function drawDashedLineRLC(x1, y1, x2, y2, pattern, col) {
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

// Nice round step size for axis ticks
function niceStep(rawStep) {
    const magnitude = Math.pow(10, Math.floor(Math.log10(rawStep)));
    const frac = rawStep / magnitude;
    if (frac < 1.5) return magnitude;
    if (frac < 3.5) return 2 * magnitude;
    if (frac < 7.5) return 5 * magnitude;
    return 10 * magnitude;
}

function formatTime(tSec) {
    if (tSec < 0.001) return (tSec * 1e6).toFixed(1) + ' µs';
    if (tSec < 1)     return (tSec * 1000).toFixed(1) + ' ms';
    return tSec.toFixed(3) + ' s';
}

// ══════════════════════════════════════════════════════════════════════════
// INTERACTION
// ══════════════════════════════════════════════════════════════════════════

function mousePressed() {
    const mx = mouseX, my = mouseY;

    if (inBtnRLC(mx, my, startBtnX, startBtnY, startBtnW, startBtnH)) {
        if (!switchClosed) {
            switchClosed = true;
            isAnimating  = true;
        } else {
            isAnimating = !isAnimating;
        }
        return;
    }
    if (inBtnRLC(mx, my, resetBtnX, resetBtnY, resetBtnW, resetBtnH)) {
        resetSim(); return;
    }

    // Click on switch in circuit diagram
    if (mx >= swHitX && mx <= swHitX + swHitW &&
        my >= swHitY && my <= swHitY + swHitH) {
        if (!switchClosed) {
            switchClosed = true;
            isAnimating  = true;
        }
        return;
    }

    handleSlider(mx, my);
}

function mouseDragged() { handleSlider(mouseX, mouseY); }

function inBtnRLC(mx, my, x, y, w, h) {
    return mx >= x && mx <= x + w && my >= y && my <= y + h;
}

function handleSlider(mx, my) {
    if (my >= sy1 - 10 && my <= sy1 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        vs = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 1, 20), 1, 20));
        recalculate(); resetSim();
    }
    if (my >= sy2 - 10 && my <= sy2 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        rVal = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 0, 300), 0, 300));
        recalculate(); resetSim();
    }
    if (my >= sy3 - 10 && my <= sy3 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        lVal = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 10, 500), 10, 500));
        recalculate(); resetSim();
    }
    if (my >= sy4 - 10 && my <= sy4 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        cVal = round(constrain(map(mx, sliderX, sliderX + sliderWidth, 10, 500), 10, 500));
        recalculate(); resetSim();
    }
}

function resetSim() {
    isAnimating  = false;
    switchClosed = false;
    vcNow        = 0;
    ilNow        = 0;
    simTime      = 0;
    graphData    = [];
    animationTime= 0;
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

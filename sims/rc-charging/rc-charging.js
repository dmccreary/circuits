// RC Charging Circuit MicroSim
// SPDT switch above the capacitor: Position A = open circuit, Position B = charges cap
// Switch flips left (A, open) or right (B, connected) — cap bottom always touches ground
// All controls are canvas-based (no DOM elements) for iframe compatibility
//
// animationTime and lineWidth are globals declared in circuit-lib.js

// Canvas dimensions
let canvasWidth  = 580;
let circuitHeight = 280;
let graphHeight   = 210;
let controlHeight = 130;
let drawHeight;   // circuitHeight + graphHeight
let canvasHeight;
let containerWidth;

// lineWidth is used by drawAnimatedWire in circuit-lib.js
let lineWidth = 3;

// Animation state — start stopped per MicroSim standard
let isAnimating = false;

// Switch state: false = Position A (open), true = Position B (closed/charging)
let switchClosed = false;

// Simulation state
let simTime    = 0;   // elapsed sim time since switch last moved to B (s)
let vcAtClose  = 0;   // capacitor voltage when switch last moved to B (V)
let vcNow      = 0;   // current capacitor voltage (V)
let iNow       = 0;   // current circuit current (mA)
let graphData  = [];  // [{t, vc, i}]

// Circuit parameters (defaults)
let vs   = 9;    // source voltage (V)
let rVal = 10;   // resistance (kΩ)
let cVal = 10;   // capacitance (µF)
let tau  = 0;    // time constant RC (s)

// Canvas control layout
let sliderLeftMargin = 245;
let sliderX, sliderWidth;
let sy1, sy2, sy3;  // slider Y positions

// Button dimensions/positions
let startBtnX, startBtnY, startBtnW = 80,  startBtnH = 26;
let resetBtnX, resetBtnY, resetBtnW = 70,  resetBtnH = 26;
let swBtnX,   swBtnY,   swBtnW = 120, swBtnH = 26;

// Switch hit-box on circuit (set in drawCircuit each frame)
let swLeftX = 0, swRightX = 0, swMidY = 0;

// ===================== SETUP =====================

function setup() {
    drawHeight   = circuitHeight + graphHeight;
    canvasHeight = drawHeight + controlHeight;
    updateCanvasSize();

    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    computeLayout();
    recalculate();

    describe(
        'RC charging circuit with SPDT switch. Position A is open circuit; Position B charges the capacitor through the resistor.',
        LABEL
    );
}

function computeLayout() {
    sliderX     = sliderLeftMargin;
    sliderWidth = containerWidth - sliderX - 20;

    sy1 = drawHeight + 55;
    sy2 = drawHeight + 80;
    sy3 = drawHeight + 105;

    startBtnX = 15;  startBtnY = drawHeight + 12;
    resetBtnX = 105; resetBtnY = drawHeight + 12;
    swBtnX    = 185; swBtnY   = drawHeight + 12;
}

// ===================== DRAW LOOP =====================

function draw() {
    background(255);

    if (isAnimating && switchClosed) {
        // Scale so 1 real second ≈ 1τ
        let dt_sim = (deltaTime / 1000) * tau;
        simTime += dt_sim;
        animationTime += deltaTime;

        // Charge from vcAtClose toward Vs
        vcNow = vs - (vs - vcAtClose) * Math.exp(-simTime / tau);
        iNow  = (vs - vcNow) / Math.max(rVal, 0.001);
        vcNow = constrain(vcNow, 0, vs);

        let lastT = graphData.length > 0 ? graphData[graphData.length - 1].t : -1;
        if (simTime - lastT > tau * 0.02) {
            graphData.push({ t: simTime, vc: vcNow, i: iNow });
        }
    }

    drawCircuit();

    stroke(180); strokeWeight(1);
    line(0, circuitHeight, containerWidth, circuitHeight);

    drawGraphs();
    drawControls();
}

function recalculate() {
    tau = rVal * cVal * 0.001; // R(kΩ) × C(µF) × 1e-3 = seconds
}

// ===================== CIRCUIT DRAWING =====================

function drawCircuit() {
    push();

    // --- Layout (all derived from containerWidth) ---
    let batX   = Math.floor(containerWidth * 0.12);  // battery x-position (left side)
    let topY   = 55;
    let botY   = 228;

    // Resistor on top rail
    let rW     = Math.floor(containerWidth * 0.14);
    let rLeft  = Math.floor(containerWidth * 0.19);
    let rRight = rLeft + rW;

    // SPDT switch: common (C) hangs below top rail at swJuncX, blade flips to A (left/open) or B (right/to cap)
    let swJuncX = Math.floor(containerWidth * 0.53);  // junction point on top rail
    let swCX    = swJuncX;
    let swCY    = topY + 42;                          // switch sits below the top rail
    let swHalfW = Math.floor(containerWidth * 0.10);  // half-span of switch blade
    let swAX    = swCX - swHalfW;                     // terminal A (left, open circuit)
    let swBX    = swCX + swHalfW;                     // terminal B (right, connects to cap)

    // Expose hit-box globals for click detection
    swLeftX  = swAX;
    swRightX = swBX;
    swMidY   = swCY;

    // Capacitor: vertical, directly below terminal B
    let capX    = swBX;
    let capMidY = Math.round((swCY + botY) / 2) + 10;
    let plateW  = 48;
    let gapH    = 20;

    // Animation speed proportional to current fraction
    let I0     = vs / Math.max(rVal, 0.001);
    let iFrac  = (isAnimating && switchClosed) ? iNow / Math.max(I0, 0.001) : 0;
    let eSpeed = iFrac * 0.065;
    let active = switchClosed && isAnimating && iFrac > 0.005;

    function liveWire(x1, y1, x2, y2) {
        if (active) {
            drawAnimatedWire(x1, y1, x2, y2, eSpeed, 1.0);
        } else {
            stroke(0); strokeWeight(lineWidth); line(x1, y1, x2, y2);
        }
    }

    // --- Title ---
    fill(0); noStroke(); textSize(14); textAlign(CENTER, TOP);
    text('RC Charging Circuit', containerWidth / 2, 10);

    // ---- Battery (batX, vertical) ----
    let batMidY = Math.round((topY + botY) / 2);
    liveWire(batX, topY, batX, batMidY - 22);
    liveWire(batX, batMidY + 22, batX, botY);

    // Cell plates
    stroke(0); strokeWeight(2);
    line(batX - 15, batMidY - 18, batX + 15, batMidY - 18);
    strokeWeight(5);
    line(batX - 9,  batMidY - 9,  batX + 9,  batMidY - 9);
    strokeWeight(2);
    line(batX - 15, batMidY + 9,  batX + 15, batMidY + 9);
    strokeWeight(5);
    line(batX - 9,  batMidY + 18, batX + 9,  batMidY + 18);

    // Battery labels
    fill(0); noStroke(); textSize(12);
    textAlign(RIGHT, CENTER);
    text('+', batX - 20, batMidY - 18);
    text('−', batX - 20, batMidY + 18);
    textAlign(LEFT, CENTER);
    text(vs + ' V', batX + 20, batMidY);

    // ---- Top rail: battery+ → resistor → junction ----
    liveWire(batX, topY, rLeft, topY);
    drawRHoriz(rLeft, topY, rW, rVal);
    liveWire(rRight, topY, swJuncX, topY);

    // Vertical drop from junction down to switch common
    liveWire(swJuncX, topY, swCX, swCY);

    // ---- SPDT Switch ----
    drawSPDTSwitch(swAX, swCX, swBX, swCY, switchClosed);

    // ---- Wire from switch terminal B down to capacitor top ----
    // This wire exists whether or not the circuit is complete (it's always wired to B terminal)
    if (switchClosed) {
        liveWire(swBX, swCY, capX, capMidY - gapH / 2);
    } else {
        stroke(0); strokeWeight(lineWidth);
        line(swBX, swCY, capX, capMidY - gapH / 2);
    }

    // ---- Capacitor (vertical, below switch terminal B) ----

    // Top plate (positive)
    stroke(0); strokeWeight(5);
    line(capX - plateW / 2, capMidY - gapH / 2,
         capX + plateW / 2, capMidY - gapH / 2);

    // Charge fill (between plates)
    let chFrac = constrain(vcNow / Math.max(vs, 0.001), 0, 1);
    if (chFrac > 0.01) {
        let fillH = (gapH - 6) * chFrac;
        let r = lerp(160, 30,  chFrac);
        let g = lerp(200, 100, chFrac);
        noStroke(); fill(r, g, 255, 190);
        rectMode(CENTER);
        rect(capX, capMidY, plateW * 0.72, Math.max(fillH, 2));
        rectMode(CORNER);
    }

    // Bottom plate (negative)
    stroke(0); strokeWeight(5);
    line(capX - plateW / 2, capMidY + gapH / 2,
         capX + plateW / 2, capMidY + gapH / 2);

    // Wire: cap bottom → ground (botY)
    liveWire(capX, capMidY + gapH / 2, capX, botY);

    // Capacitor +/− labels
    fill(200, 0, 0); noStroke(); textSize(12);
    textAlign(RIGHT, CENTER);
    text('+', capX - plateW / 2 - 6, capMidY - gapH / 2);
    fill(0, 0, 200);
    text('−', capX - plateW / 2 - 6, capMidY + gapH / 2);

    // Capacitor value + live Vc readout
    fill(0); noStroke(); textSize(11);
    textAlign(LEFT, CENTER);
    text('C = ' + cVal + ' µF', capX + plateW / 2 + 8, capMidY - 10);
    fill(0, 70, 190);
    text('Vc = ' + vcNow.toFixed(2) + ' V', capX + plateW / 2 + 8, capMidY + 8);

    // ---- Ground symbol (directly below capacitor) ----
    stroke(0); strokeWeight(2);
    line(capX,      botY,      capX,      botY + 8);
    line(capX - 10, botY + 8,  capX + 10, botY + 8);
    line(capX - 6,  botY + 12, capX + 6,  botY + 12);
    line(capX - 2,  botY + 16, capX + 2,  botY + 16);

    // ---- Bottom rail: ground (capX) → battery− ----
    liveWire(capX, botY, batX, botY);

    // ---- Live readouts ----
    fill(0, 70, 190); noStroke(); textSize(12); textAlign(LEFT, TOP);
    let lblY = botY + 22;
    text('I = ' + iNow.toFixed(3) + ' mA', batX + 10, lblY);
    text('τ = ' + formatTau(tau), batX + 150, lblY);

    pop();
}

// Horizontal resistor (zigzag), centered on railY
function drawRHoriz(x, railY, w, rKohms) {
    push();
    stroke(0); strokeWeight(lineWidth); noFill();

    let ew   = w * 0.15;
    let peaks = 6;
    let pw   = (w - 2 * ew) / peaks;
    let ph   = 9;

    line(x,         railY, x + ew,      railY);
    line(x + w - ew, railY, x + w,      railY);
    beginShape();
    vertex(x + ew, railY);
    for (let i = 0; i < peaks; i++) {
        let xp = x + ew + i * pw + pw / 2;
        let yp = (i % 2 === 0) ? railY - ph : railY + ph;
        vertex(xp, yp);
    }
    vertex(x + w - ew, railY);
    endShape();

    fill(0); noStroke(); textSize(11); textAlign(CENTER, BOTTOM);
    text('R = ' + rKohms + ' kΩ', x + w / 2, railY - ph - 3);
    pop();
}

// SPDT switch: three terminals at the same Y level
//   xA = terminal A (left, open/dead-end)
//   xC = common/pivot (connected to top rail via vertical drop)
//   xB = terminal B (right, connects down to capacitor)
//   posB: true = blade points to B (circuit closed), false = blade points to A (open)
function drawSPDTSwitch(xA, xC, xB, yC, posB) {
    push();

    // Background highlight box
    let padX = 14, padTop = 34, padBot = 20;
    noStroke();
    fill(posB ? color(215, 240, 255, 200) : color(220, 255, 215, 200));
    rect(xA - padX, yC - padTop, (xB - xA) + padX * 2, padTop + padBot, 4);

    // Terminal contact dots
    fill(0); stroke(0); strokeWeight(1);
    circle(xA, yC, 9);   // A
    circle(xC, yC, 9);   // C (common)
    circle(xB, yC, 9);   // B

    // Terminal labels
    fill(0); noStroke(); textSize(10); textAlign(CENTER, BOTTOM);
    text('A', xA, yC - 5);
    text('B', xB, yC - 5);

    // Blade (pivots from common xC)
    stroke(0); strokeWeight(3);
    if (posB) {
        // Position B: blade connects C → B (straight right)
        line(xC, yC, xB, yC);
    } else {
        // Position A: blade lifts up-left toward A (shows open/disconnected state)
        let tipX = xA + (xC - xA) * 0.12;
        let tipY = yC - 22;
        line(xC, yC, tipX, tipY);
    }

    // State label above switch
    fill(posB ? color(0, 130, 0) : color(180, 60, 0));
    noStroke(); textSize(10); textAlign(CENTER, BOTTOM);
    text(posB ? 'Pos B  (circuit closed)' : 'Pos A  (open circuit)',
         (xA + xB) / 2, yC - 22);

    pop();
}

// ===================== GRAPHS =====================

function drawGraphs() {
    push();

    let gTop    = circuitHeight + 18;
    let gBottom = circuitHeight + graphHeight - 18;
    let gMid    = Math.round(containerWidth / 2);
    let g1Left  = 52,       g1Right = gMid - 15;
    let g2Left  = gMid + 18, g2Right = containerWidth - 15;

    let totalT = Math.max(5 * tau, 0.001);
    let Imax   = Math.max(vs / Math.max(rVal, 0.001), 0.001);

    // ---- Voltage graph ----
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Capacitor Voltage  Vc(t)', (g1Left + g1Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g1Left, gTop, g1Left, gBottom);
    line(g1Left, gBottom, g1Right, gBottom);

    fill(80); noStroke(); textSize(9); textAlign(RIGHT, CENTER);
    let vStep = Math.max(1, Math.ceil(vs / 4));
    for (let v = 0; v <= vs; v += vStep) {
        let y = map(v, 0, vs, gBottom, gTop);
        text(v + 'V', g1Left - 3, y);
        stroke(220); strokeWeight(0.5); line(g1Left, y, g1Right, y); noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        let x = map(i, 0, 5, g1Left, g1Right);
        text(i + 'τ', x, gBottom + 2);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(x, gTop, x, gBottom); noStroke(); }
    }

    // Dashed Vs target
    drawDashedLine(g1Left, gTop, g1Right, gTop, [4, 4], color(100, 100, 220));

    // τ marker
    let tauX1 = map(1, 0, 5, g1Left, g1Right);
    drawDashedLine(tauX1, gTop, tauX1, gBottom, [4, 4], color(255, 140, 0));

    if (graphData.length > 1) {
        stroke(0, 100, 220); strokeWeight(2.5); noFill(); beginShape();
        for (let pt of graphData) {
            let x = constrain(map(pt.t, 0, totalT, g1Left, g1Right), g1Left, g1Right);
            let y = constrain(map(pt.vc, 0, vs, gBottom, gTop), gTop, gBottom);
            vertex(x, y);
        }
        endShape();
    }

    fill(255, 140, 0); noStroke(); textSize(9); textAlign(LEFT, CENTER);
    let y63 = constrain(map(vs * 0.632, 0, vs, gBottom, gTop), gTop, gBottom);
    text('63.2%', tauX1 + 3, y63);

    // ---- Current graph ----
    fill(0); noStroke(); textSize(11); textAlign(CENTER, TOP);
    text('Circuit Current  I(t)', (g2Left + g2Right) / 2, gTop - 15);
    stroke(0); strokeWeight(1);
    line(g2Left, gTop, g2Left, gBottom);
    line(g2Left, gBottom, g2Right, gBottom);

    fill(80); noStroke(); textSize(9); textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        let iv = Imax * i / 4;
        let y  = map(iv, 0, Imax, gBottom, gTop);
        text(iv.toFixed(2) + 'mA', g2Left - 3, y);
        stroke(220); strokeWeight(0.5); line(g2Left, y, g2Right, y); noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        let x = map(i, 0, 5, g2Left, g2Right);
        text(i + 'τ', x, gBottom + 2);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(x, gTop, x, gBottom); noStroke(); }
    }

    drawDashedLine(g2Left, gTop, g2Right, gTop, [4, 4], color(220, 80, 80));
    let tauX2 = map(1, 0, 5, g2Left, g2Right);
    drawDashedLine(tauX2, gTop, tauX2, gBottom, [4, 4], color(255, 140, 0));

    if (graphData.length > 1) {
        stroke(210, 70, 0); strokeWeight(2.5); noFill(); beginShape();
        for (let pt of graphData) {
            let x = constrain(map(pt.t, 0, totalT, g2Left, g2Right), g2Left, g2Right);
            let y = constrain(map(pt.i, 0, Imax,  gBottom, gTop), gTop, gBottom);
            vertex(x, y);
        }
        endShape();
    }

    fill(255, 140, 0); noStroke(); textSize(9); textAlign(LEFT, CENTER);
    let y37 = constrain(map(Imax * 0.368, 0, Imax, gBottom, gTop), gTop, gBottom);
    text('36.8%', tauX2 + 3, y37);

    pop();
}

// ===================== CONTROLS =====================

function drawControls() {
    fill(245); stroke(200); strokeWeight(1);
    rect(0, drawHeight, containerWidth, controlHeight);

    // Buttons
    drawBtn(isAnimating ? 'Stop' : 'Start',
            startBtnX, startBtnY, startBtnW, startBtnH,
            color(70, 130, 180));

    drawBtn('Reset',
            resetBtnX, resetBtnY, resetBtnW, resetBtnH,
            color(100, 100, 130));

    let swLabel = switchClosed ? 'Switch to A' : 'Switch to B';
    let swColor = switchClosed ? color(180, 60, 0) : color(0, 130, 0);
    drawBtn(swLabel, swBtnX, swBtnY, swBtnW, swBtnH, swColor);

    // Info line
    fill(60); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text('τ = ' + formatTau(tau) + '   I₀ = ' + (vs / Math.max(rVal, 0.001)).toFixed(2) + ' mA',
         containerWidth - 15, drawHeight + 25);

    // Sliders
    drawSlider('Source Voltage Vs:', vs,   1, 20,  sliderX, sy1, sliderWidth, ' V');
    drawSlider('Resistance R:',      rVal, 1, 100, sliderX, sy2, sliderWidth, ' kΩ');
    drawSlider('Capacitance C:',     cVal, 1, 100, sliderX, sy3, sliderWidth, ' µF');

    if (!isAnimating) {
        fill(120, 50, 150); noStroke(); textSize(10); textAlign(LEFT, CENTER);
        text("Press 'Start' then 'Switch to B' (or click the switch) to charge the capacitor.",
             15, drawHeight + 45);
    }
}

function drawSlider(label, value, minVal, maxVal, x, y, w, suffix) {
    fill(0); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text(label + ' ' + value + suffix, x - 8, y);

    fill(200); stroke(150); strokeWeight(1);
    rect(x, y - 4, w, 8, 4);

    let fw = map(value, minVal, maxVal, 0, w);
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

// ===================== HELPERS =====================

function drawDashedLine(x1, y1, x2, y2, pattern, col) {
    push();
    stroke(col); strokeWeight(1);
    let d = dist(x1, y1, x2, y2);
    if (d === 0) { pop(); return; }
    let dx = (x2 - x1) / d, dy = (y2 - y1) / d;
    let pos = 0, idx = 0;
    while (pos < d) {
        let sl = min(pattern[idx % pattern.length], d - pos);
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

// ===================== INTERACTION =====================

function mousePressed() {
    let mx = mouseX, my = mouseY;

    // Click on the SPDT switch in the circuit diagram
    if (swLeftX && my >= swMidY - 38 && my <= swMidY + 24 &&
        mx >= swLeftX - 14 && mx <= swRightX + 14) {
        toggleSwitch();
        return;
    }

    // Start / Stop button
    if (inBtn(mx, my, startBtnX, startBtnY, startBtnW, startBtnH)) {
        isAnimating = !isAnimating;
        return;
    }

    // Reset button
    if (inBtn(mx, my, resetBtnX, resetBtnY, resetBtnW, resetBtnH)) {
        resetSim();
        return;
    }

    // Switch button in controls
    if (inBtn(mx, my, swBtnX, swBtnY, swBtnW, swBtnH)) {
        toggleSwitch();
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

function toggleSwitch() {
    switchClosed = !switchClosed;
    if (switchClosed) {
        // Remember voltage at this moment so charging continues from here
        vcAtClose = vcNow;
        simTime   = 0;
        graphData = [];
        iNow = (vs - vcNow) / Math.max(rVal, 0.001);
    }
    // When moved to A, capacitor holds its charge (vcNow unchanged)
}

function handleSlider(mx, my) {
    if (my >= sy1 - 10 && my <= sy1 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        vs = round(map(mx, sliderX, sliderX + sliderWidth, 1, 20));
        vs = constrain(vs, 1, 20);
        recalculate(); resetData();
    }
    if (my >= sy2 - 10 && my <= sy2 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        rVal = round(map(mx, sliderX, sliderX + sliderWidth, 1, 100));
        rVal = constrain(rVal, 1, 100);
        recalculate(); resetData();
    }
    if (my >= sy3 - 10 && my <= sy3 + 10 && mx >= sliderX && mx <= sliderX + sliderWidth) {
        cVal = round(map(mx, sliderX, sliderX + sliderWidth, 1, 100));
        cVal = constrain(cVal, 1, 100);
        recalculate(); resetData();
    }
}

function resetData() {
    graphData = [];
    simTime   = 0;
    vcAtClose = vcNow;
}

function resetSim() {
    isAnimating  = false;
    switchClosed = false;
    simTime      = 0;
    vcAtClose    = 0;
    vcNow        = 0;
    iNow         = 0;
    graphData    = [];
    animationTime = 0;
    recalculate();
}

// ===================== RESPONSIVE =====================

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    computeLayout();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth  = Math.max(500, Math.floor(container.width));
}

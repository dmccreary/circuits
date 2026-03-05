// RC Charge/Discharge Circuit MicroSim
// SPDT switch: Position A charges C through R_charge (battery in circuit)
//              Position B discharges C through R_load (battery disconnected)
//
// Circuit paths:
//   A (charge):    Vs+ → R_charge → SW.A → SW.COM → C+ → [C] → C- → Vs-
//   B (discharge): C+  → SW.COM   → SW.B → R_load  → bottom rail → C-
//
// animationTime and lineWidth are globals declared in circuit-lib.js

let canvasWidth  = 580;
let circuitHeight = 265;
let graphHeight   = 235;
let controlHeight = 130;
let drawHeight;
let canvasHeight;
let containerWidth;

// lineWidth is declared in circuit-lib.js (default 2); override here
let lineWidth = 3;

// Switch state and animation
let switchPos   = 'A';    // 'A' = charging path, 'B' = discharge path
let isAnimating = false;  // start stopped per MicroSim standard

// Simulation state
let simTime     = 0;      // time elapsed since last switch flip (sim seconds)
let vcAtSwitch  = 0;      // Vc value when mode last changed
let vcNow       = 0;      // current capacitor voltage (V)
let iNow        = 0;      // current magnitude (mA)
let graphData   = [];     // [{t, vc, i}] for current mode

// Parameters
let vs      = 10;   // source voltage (V)
let rCharge = 10;   // charging resistance (kΩ)
let rLoad   = 10;   // discharge/load resistance (kΩ)
let cVal    = 10;   // capacitance (µF)

// Derived
let tau = 0;

// DOM elements
let vsSlider, rcSlider, rlSlider, cSlider;
let switchBtn, startStopBtn, resetBtn;
let sliderX = 265;
let sliderWidth;

function setup() {
    drawHeight  = circuitHeight + graphHeight;
    canvasHeight = drawHeight + controlHeight;
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    sliderWidth = containerWidth - sliderX - 20;

    vsSlider = createSlider(1, 20, vs, 1);
    vsSlider.position(sliderX, drawHeight + 38);
    vsSlider.size(sliderWidth);
    vsSlider.input(onParamChange);

    rcSlider = createSlider(1, 100, rCharge, 1);
    rcSlider.position(sliderX, drawHeight + 62);
    rcSlider.size(sliderWidth);
    rcSlider.input(onParamChange);

    rlSlider = createSlider(1, 100, rLoad, 1);
    rlSlider.position(sliderX, drawHeight + 86);
    rlSlider.size(sliderWidth);
    rlSlider.input(onParamChange);

    cSlider = createSlider(1, 100, cVal, 1);
    cSlider.position(sliderX, drawHeight + 110);
    cSlider.size(sliderWidth);
    cSlider.input(onParamChange);

    switchBtn    = createButton('Flip to B (Discharge)');
    switchBtn.position(15, drawHeight + 8);
    switchBtn.mousePressed(flipSwitch);

    startStopBtn = createButton('Start');
    startStopBtn.position(200, drawHeight + 8);
    startStopBtn.mousePressed(toggleAnimation);

    resetBtn = createButton('Reset');
    resetBtn.position(262, drawHeight + 8);
    resetBtn.mousePressed(resetSim);

    recalculate();
    describe('RC charge/discharge circuit with SPDT switch. Position A charges capacitor through R_charge; Position B discharges through R_load.', LABEL);
}

function draw() {
    background(255);

    vs      = parseInt(vsSlider.value());
    rCharge = parseInt(rcSlider.value());
    rLoad   = parseInt(rlSlider.value());
    cVal    = parseInt(cSlider.value());
    recalculate();

    if (isAnimating) {
        let dt_sim = (deltaTime / 1000) * tau; // scale: 1 real second ≈ 1τ
        simTime += dt_sim;
        animationTime += deltaTime;

        if (switchPos === 'A') {
            // Charging: Vc approaches Vs from vcAtSwitch
            vcNow = vs - (vs - vcAtSwitch) * Math.exp(-simTime / tau);
            iNow  = (vs - vcNow) / rCharge;  // mA
        } else {
            // Discharging: Vc decays from vcAtSwitch toward 0
            vcNow = vcAtSwitch * Math.exp(-simTime / tau);
            iNow  = vcNow / rLoad;            // mA (magnitude)
        }
        vcNow = constrain(vcNow, 0, vs);

        let lastT = graphData.length > 0 ? graphData[graphData.length - 1].t : -1;
        if (simTime - lastT > tau * 0.02) {
            graphData.push({ t: simTime, vc: vcNow, i: iNow });
        }
    }

    drawCircuit();

    stroke(180);
    strokeWeight(1);
    line(0, circuitHeight, containerWidth, circuitHeight);

    drawGraphs();
    drawControls();
}

function recalculate() {
    let rNow = (switchPos === 'A') ? rCharge : rLoad;
    tau = rNow * cVal * 0.001; // R(kΩ) * C(µF) * 1e-3 = seconds
}

// ===================== CIRCUIT DRAWING =====================

function drawCircuit() {
    push();

    let cx    = containerWidth / 2;
    let left  = 75;
    let right = min(cx + 185, containerWidth - 55);
    let topY  = 58;
    let botY  = 218;
    let batMidY = (topY + botY) / 2;  // ~138

    // Switch geometry
    let swAX  = left + 148;   // Terminal A on top rail (left contact)
    let swComX = swAX + 42;   // COM on top rail (right contact / pivot)
    let swBY  = botY - 68;    // Terminal B below COM

    // Capacitor (right side, vertical)
    let capX = right;
    let capW = 40;
    let capH = 120;
    let capY = topY; // bounding box top (top wire exits at capY)

    // R_charge: horizontal on top rail
    let rcLeft  = left + 5;
    let rcRight = swAX - 12;
    let rcW     = rcRight - rcLeft;

    // R_load: vertical below SW.B
    let rlTop = swBY + 8;
    let rlBot = botY - 5;
    let rlH   = rlBot - rlTop;

    // Animation speed based on current fraction
    let Iref  = (switchPos === 'A') ? vs / max(rCharge, 0.001)
                                    : vcAtSwitch / max(rLoad, 0.001);
    let iFrac = isAnimating ? abs(iNow) / max(Iref, 0.001) : 0;
    let eSpeed = iFrac * 0.08;
    let eSp    = 1.0;

    let chActive  = (switchPos === 'A' && isAnimating && iFrac > 0.005);
    let disActive = (switchPos === 'B' && isAnimating && iFrac > 0.005);

    function liveWire(x1, y1, x2, y2, active) {
        if (active) {
            drawAnimatedWire(x1, y1, x2, y2, eSpeed, eSp);
        } else {
            stroke(0); strokeWeight(lineWidth); line(x1, y1, x2, y2);
        }
    }

    // --- Title ---
    fill(0); noStroke(); textSize(14); textAlign(CENTER, TOP);
    text('RC Charge/Discharge  —  Switch: ' + switchPos +
         (switchPos === 'A' ? ' (Charging)' : ' (Discharging)'), cx, 6);

    // --- Battery (left, vertical) ---
    stroke(0); strokeWeight(2);
    // Positive plate (longer, top)
    line(left - 14, batMidY - 10, left + 14, batMidY - 10);
    // Negative plate (shorter, bottom)
    strokeWeight(4);
    line(left - 8, batMidY + 10, left + 8, batMidY + 10);

    fill(0); noStroke(); textSize(11);
    textAlign(CENTER, CENTER);
    text('+', left - 24, batMidY - 10);
    text('\u2013', left - 24, batMidY + 10);
    textAlign(LEFT, CENTER);
    text(vs + 'V', left + 20, batMidY);

    // Wire: Vs+ up to top rail
    liveWire(left, batMidY - 10, left, topY, chActive);
    // Wire: Vs- down to bottom rail
    liveWire(left, batMidY + 10, left, botY, chActive || disActive);

    // --- Top rail: left corner to R_charge ---
    liveWire(left, topY, rcLeft, topY, chActive);

    // --- R_charge (horizontal) ---
    drawResistorH(rcLeft, topY, rcW, 28, 'R\u1D04 ' + rCharge + 'k\u03A9');

    // Wire: R_charge to SW.A
    liveWire(rcRight, topY, swAX, topY, chActive);

    // --- SPDT Switch ---
    drawSPDT(swAX, topY, swComX, topY, swComX, swBY);

    // Wire: SW.COM right to C+ (top of capacitor)
    liveWire(swComX, topY, capX, topY, chActive || disActive);

    // --- Capacitor (vertical, right) ---
    drawCapacitor(capX - capW / 2, capY, capW, capH, lineWidth, VERTICAL, '');

    // Capacitor label (manual, to the right)
    fill(0); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text('C ' + cVal + '\u00B5F', capX + capW / 2 + 6, capY + capH / 2);
    fill(200, 40, 40); textSize(12);
    text('+', capX + capW / 2 + 6, capY + capH * 0.28);
    fill(0, 60, 200);
    text('\u2013', capX + capW / 2 + 6, capY + capH * 0.72);

    // Charge fill between capacitor plates
    let chFrac = vcNow / max(vs, 0.001);
    if (chFrac > 0.01) {
        let midY      = capY + capH / 2;
        let gapH      = capH * 0.1; // plate gap height
        let fillH     = gapH * min(chFrac, 1);
        let r = lerp(160, 20,  chFrac);
        let g = lerp(200, 80,  chFrac);
        let b = lerp(255, 255, chFrac);
        noStroke(); fill(r, g, b, 170);
        rectMode(CENTER);
        rect(capX, midY, capW * 0.52, max(fillH, 1.5));
        rectMode(CORNER);
    }

    // Wire: C- (bottom of cap) down to bottom rail
    let capBotY = capY + capH;
    liveWire(capX, capBotY, capX, botY, chActive || disActive);

    // --- Bottom rail ---
    liveWire(capX, botY, left, botY, chActive || disActive);

    // --- R_load path (SW.B → R_load → bottom rail) ---
    // Wire: SW.B down to R_load top
    liveWire(swComX, swBY, swComX, rlTop, disActive);
    // R_load (vertical)
    drawResistorV(swComX, rlTop, 28, rlH, 'R\u2097 ' + rLoad + 'k\u03A9');
    // Wire: R_load bottom to bottom rail
    liveWire(swComX, rlBot, swComX, botY, disActive);

    // --- Ground symbol (bottom center) ---
    let gndX = (left + right) / 2;
    stroke(0); strokeWeight(2);
    line(gndX,      botY,      gndX,      botY + 8);
    line(gndX - 10, botY + 8,  gndX + 10, botY + 8);
    line(gndX - 6,  botY + 12, gndX + 6,  botY + 12);
    line(gndX - 2,  botY + 16, gndX + 2,  botY + 16);

    // --- Live readouts ---
    fill(0, 70, 190); noStroke(); textSize(12); textAlign(LEFT, TOP);
    let lblY = botY + 22;
    text('Vc = ' + vcNow.toFixed(2) + ' V',          left,       lblY);
    text('I = '  + abs(iNow).toFixed(3) + ' mA',     left + 120, lblY);
    text('\u03C4 = ' + formatTau(tau),                left + 250, lblY);

    pop();
}

// Draw SPDT switch symbol
// A (ax,ay): left contact on top rail (connects from R_charge)
// COM (comX,comY): pivot on top rail (connects right to capacitor)
// B (bx,by): lower contact (connects down to R_load)
function drawSPDT(ax, ay, comX, comY, bx, by) {
    // Contact dots
    fill(0); stroke(0); strokeWeight(1);
    circle(ax,   ay,   7);
    circle(comX, comY, 7);
    circle(bx,   by,   7);

    // Dashed stub to B when switch is in A (shows physical contact exists)
    if (switchPos === 'A') {
        drawDashedLine(comX, comY, bx, by, [5, 5], color(180));
    }

    // Blade
    stroke(0); strokeWeight(2.5);
    if (switchPos === 'A') {
        line(comX, comY, ax, ay);   // horizontal left → charging closed
    } else {
        line(comX, comY, bx, by);   // angled down → discharge closed
    }

    // Terminal labels
    fill(50); noStroke(); textSize(10);
    textAlign(CENTER, BOTTOM);
    text('A',   ax,      ay - 6);
    text('COM', comX,    comY - 6);
    text('B',   bx + 14, by);
}

// Horizontal resistor centered on railY
function drawResistorH(x, railY, w, lw_override, label) {
    push();
    strokeWeight(lineWidth); stroke(0); noFill();
    let ew = w * 0.15;
    let peaks = 6;
    let pw = (w - 2 * ew) / peaks;
    let ph = lw_override / 3;

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
    text(label, x + w / 2, railY - ph - 3);
    pop();
}

// Vertical resistor centered on cx
function drawResistorV(cx, y, w, h, label) {
    push();
    strokeWeight(lineWidth); stroke(0); noFill();
    let ew = h * 0.15;
    let peaks = 6;
    let ph = (h - 2 * ew) / peaks;
    let pw = w / 3;

    line(cx, y,         cx, y + ew);
    line(cx, y + h - ew, cx, y + h);
    beginShape();
    vertex(cx, y + ew);
    for (let i = 0; i < peaks; i++) {
        let yp = y + ew + i * ph + ph / 2;
        let xp = (i % 2 === 0) ? cx - pw : cx + pw;
        vertex(xp, yp);
    }
    vertex(cx, y + h - ew);
    endShape();

    fill(0); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text(label, cx + pw + 6, y + h / 2);
    pop();
}

// ===================== GRAPHS =====================

function drawGraphs() {
    push();
    let gTop    = circuitHeight + 14;
    let gBottom = circuitHeight + graphHeight - 28;
    let gMid    = containerWidth / 2;
    let g1Left  = 55, g1Right = gMid - 18;
    let g2Left  = gMid + 28, g2Right = containerWidth - 14;

    let totalT = max(5 * tau, 0.001);
    let Imax   = (switchPos === 'A') ? vs / max(rCharge, 0.001)
                                     : vcAtSwitch / max(rLoad, 0.001);
    Imax = max(Imax, 0.001);
    let col = (switchPos === 'A') ? color(0, 100, 220) : color(190, 55, 30);

    // === Voltage graph ===
    fill(0); noStroke(); textSize(12); textAlign(CENTER, TOP);
    text('Capacitor Voltage Vc(t)', (g1Left + g1Right) / 2, gTop - 11);
    stroke(0); strokeWeight(1);
    line(g1Left, gTop, g1Left, gBottom);
    line(g1Left, gBottom, g1Right, gBottom);

    fill(80); noStroke(); textSize(10); textAlign(RIGHT, CENTER);
    let vStep = max(1, Math.ceil(vs / 4));
    for (let v = 0; v <= vs; v += vStep) {
        let y = map(v, 0, vs, gBottom, gTop);
        text(v + 'V', g1Left - 4, y);
        stroke(220); strokeWeight(0.5);
        line(g1Left, y, g1Right, y);
        noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        let x = map(i, 0, 5, g1Left, g1Right);
        text(i + '\u03C4', x, gBottom + 3);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(x, gTop, x, gBottom); noStroke(); }
    }

    // Dashed target line (Vs for charging, 0 for discharging shown as top)
    drawDashedLine(g1Left, gTop, g1Right, gTop, [4, 4], color(100, 100, 220));

    // τ marker
    let tauX1 = map(1, 0, 5, g1Left, g1Right);
    drawDashedLine(tauX1, gTop, tauX1, gBottom, [4, 4], color(255, 140, 0));

    if (graphData.length > 1) {
        stroke(col); strokeWeight(2.5); noFill(); beginShape();
        for (let pt of graphData) {
            let x = map(pt.t, 0, totalT, g1Left, g1Right);
            let y = map(pt.vc, 0, vs, gBottom, gTop);
            vertex(constrain(x, g1Left, g1Right), constrain(y, gTop, gBottom));
        }
        endShape();
    }

    // 63.2% / 36.8% annotation at τ
    fill(255, 140, 0); noStroke(); textSize(9); textAlign(LEFT, CENTER);
    let pct  = (switchPos === 'A') ? '63.2%' : '36.8%';
    let vcMark = (switchPos === 'A')
        ? vcAtSwitch + (vs - vcAtSwitch) * 0.632
        : vcAtSwitch * 0.368;
    let yMark = constrain(map(vcMark, 0, vs, gBottom, gTop), gTop, gBottom);
    text(pct, tauX1 + 3, yMark);

    // === Current graph ===
    fill(0); noStroke(); textSize(12); textAlign(CENTER, TOP);
    text('Circuit Current I(t)', (g2Left + g2Right) / 2, gTop - 11);
    stroke(0); strokeWeight(1);
    line(g2Left, gTop, g2Left, gBottom);
    line(g2Left, gBottom, g2Right, gBottom);

    fill(80); noStroke(); textSize(10); textAlign(RIGHT, CENTER);
    for (let i = 0; i <= 4; i++) {
        let iv = Imax * i / 4;
        let y  = map(iv, 0, Imax, gBottom, gTop);
        text(iv.toFixed(2) + 'mA', g2Left - 3, y);
        stroke(220); strokeWeight(0.5);
        line(g2Left, y, g2Right, y);
        noStroke();
    }
    textAlign(CENTER, TOP); fill(80);
    for (let i = 0; i <= 5; i++) {
        let x = map(i, 0, 5, g2Left, g2Right);
        text(i + '\u03C4', x, gBottom + 3);
        if (i > 0) { stroke(220); strokeWeight(0.5); line(x, gTop, x, gBottom); noStroke(); }
    }

    drawDashedLine(g2Left, gTop, g2Right, gTop, [4, 4], color(220, 80, 80));

    let tauX2 = map(1, 0, 5, g2Left, g2Right);
    drawDashedLine(tauX2, gTop, tauX2, gBottom, [4, 4], color(255, 140, 0));

    if (graphData.length > 1) {
        stroke(col); strokeWeight(2.5); noFill(); beginShape();
        for (let pt of graphData) {
            let x = map(pt.t, 0, totalT, g2Left, g2Right);
            let y = map(pt.i, 0, Imax,  gBottom, gTop);
            vertex(constrain(x, g2Left, g2Right), constrain(y, gTop, gBottom));
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

    fill(0); noStroke(); textSize(12); textAlign(RIGHT, CENTER);
    let sx = sliderX - 10;
    text('Source Voltage Vs: '       + vs      + ' V',   sx, drawHeight + 46);
    text('Charge Resistance Rc: '    + rCharge + ' k\u03A9', sx, drawHeight + 70);
    text('Load Resistance R\u2097: ' + rLoad   + ' k\u03A9', sx, drawHeight + 94);
    text('Capacitance C: '           + cVal    + ' \u00B5F', sx, drawHeight + 118);

    let I0label = (switchPos === 'A')
        ? (vs / rCharge).toFixed(2)
        : (vcAtSwitch / max(rLoad, 0.001)).toFixed(2);
    fill(60); textAlign(RIGHT, CENTER);
    text('\u03C4 = ' + formatTau(tau) + '    I\u2080 = ' + I0label + ' mA',
         containerWidth - 15, drawHeight + 118);

    if (!isAnimating) {
        fill(150, 50, 50); textAlign(LEFT, CENTER); textSize(11);
        text('Click \u2018Start\u2019 to begin. Use \u2018Flip Switch\u2019 to switch between charge (A) and discharge (B).',
             15, drawHeight + 22);
    }
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
            line(x1 + dx * pos,       y1 + dy * pos,
                 x1 + dx * (pos + sl), y1 + dy * (pos + sl));
        }
        pos += sl; idx++;
    }
    pop();
}

function formatTau(tauSec) {
    if (tauSec >= 1)     return tauSec.toFixed(2) + ' s';
    if (tauSec >= 0.001) return (tauSec * 1000).toFixed(1) + ' ms';
    return (tauSec * 1e6).toFixed(1) + ' \u00B5s';
}

// ===================== EVENT HANDLERS =====================

function flipSwitch() {
    vcAtSwitch = vcNow;
    simTime    = 0;
    graphData  = [];
    switchPos  = (switchPos === 'A') ? 'B' : 'A';
    recalculate();
    switchBtn.html(switchPos === 'A' ? 'Flip to B (Discharge)' : 'Flip to A (Charge)');
}

function toggleAnimation() {
    isAnimating = !isAnimating;
    startStopBtn.html(isAnimating ? 'Stop' : 'Start');
}

function resetSim() {
    isAnimating  = false;
    startStopBtn.html('Start');
    simTime      = 0;
    vcAtSwitch   = 0;
    vcNow        = 0;
    iNow         = 0;
    graphData    = [];
    switchPos    = 'A';
    switchBtn.html('Flip to B (Discharge)');
    animationTime = 0;
    recalculate();
}

function onParamChange() {
    vs      = parseInt(vsSlider.value());
    rCharge = parseInt(rcSlider.value());
    rLoad   = parseInt(rlSlider.value());
    cVal    = parseInt(cSlider.value());
    graphData    = [];
    simTime      = 0;
    vcAtSwitch   = vcNow;
    recalculate();
}

// ===================== RESPONSIVE =====================

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    sliderWidth = containerWidth - sliderX - 20;
    vsSlider.size(sliderWidth);
    rcSlider.size(sliderWidth);
    rlSlider.size(sliderWidth);
    cSlider.size(sliderWidth);
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = max(500, floor(container.width));
    canvasWidth    = containerWidth;
}

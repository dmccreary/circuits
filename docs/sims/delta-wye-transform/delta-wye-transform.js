// Delta-Wye Transform MicroSim
//
// Interactive visualization of Delta (triangle) to Wye (Y) and
// Wye to Delta resistor network transformations.
// Three sliders control input resistor values, a toggle switches
// direction, and the Transform button triggers an animated calculation.

'use strict';

// -- Canvas layout --
let containerWidth;
const canvasH = 520;
const drawAreaH = 520;

// -- Colour palette --
const BG        = [245, 248, 252];
const WIRE      = [50,  55,  70];
const NODE_COL  = [40, 100, 200];
const RES_DELTA = [220, 80,  60];
const RES_WYE   = [40, 160,  80];
const BTN_COL   = [50, 110, 220];
const BTN_HOVER = [35,  85, 190];
const HIGHLIGHT  = [255, 200, 40];
const PANEL_BG   = [255, 255, 255];

// -- Mode --
let deltaToWye = true;   // true = Delta->Wye, false = Wye->Delta

// -- Slider values --
let sliderVals = [30, 60, 90];  // Ra/Rb/Rc or R1/R2/R3
const SLIDER_MIN = 1;
const SLIDER_MAX = 100;

// -- Slider geometry (computed in computeLayout) --
let sliders = [];  // [{x, y, w, val, dragging, label}]
let sliderTrackH = 6;
let sliderKnobR  = 9;

// -- Buttons --
let toggleBtn = {};
let transformBtn = {};

// -- Output values --
let outputVals = [null, null, null];

// -- Animation state --
let animState = 'idle';  // idle, highlight, formula, result
let animTimer = 0;
const ANIM_HIGHLIGHT_MS = 500;
const ANIM_FORMULA_MS   = 800;
const ANIM_RESULT_MS    = 600;
let animStartTime = 0;

// -- Diagram positions (computed in computeLayout) --
let deltaCenter, wyeCenter;
let deltaScale, wyeScale;

// =====================================================================
function setup() {
    updateCanvasSize();
    let cnv = createCanvas(containerWidth, canvasH);
    cnv.parent(document.querySelector('main'));
    computeLayout();
    textFont('Arial');
    noLoop();
    redraw();
}

function updateCanvasSize() {
    containerWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 900);
    containerWidth = max(containerWidth, 480);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasH);
    computeLayout();
    redraw();
}

function computeLayout() {
    let cw = containerWidth;

    // Diagram centers
    deltaCenter = { x: cw * 0.22, y: 175 };
    wyeCenter   = { x: cw * 0.78, y: 175 };
    deltaScale  = min(cw * 0.18, 110);
    wyeScale    = min(cw * 0.15, 90);

    // Sliders
    let sliderW = min(cw * 0.35, 260);
    let sliderX = (cw - sliderW) / 2;
    let sliderY0 = 330;
    let sliderGap = 36;

    let labels = deltaToWye
        ? ['Ra', 'Rb', 'Rc']
        : ['R1', 'R2', 'R3'];

    sliders = [];
    for (let i = 0; i < 3; i++) {
        sliders.push({
            x: sliderX, y: sliderY0 + i * sliderGap,
            w: sliderW, val: sliderVals[i],
            dragging: false, label: labels[i]
        });
    }

    // Toggle button
    let btnW = 80;
    let btnH = 30;
    toggleBtn = {
        x: cw / 2 - btnW / 2, y: 285,
        w: btnW, h: btnH
    };

    // Transform button
    let tbW = 120;
    let tbH = 34;
    transformBtn = {
        x: cw / 2 - tbW / 2, y: 440,
        w: tbW, h: tbH
    };
}

// =====================================================================
// DRAW
// =====================================================================
function draw() {
    background(BG);

    drawTitle();
    drawDeltaDiagram();
    drawArrow();
    drawWyeDiagram();
    drawToggleButton();
    drawSliders();
    drawTransformButton();
    drawFormulas();
    drawOutputValues();

    // Animation
    if (animState !== 'idle') {
        let elapsed = millis() - animStartTime;
        if (animState === 'highlight' && elapsed > ANIM_HIGHLIGHT_MS) {
            animState = 'formula';
            animStartTime = millis();
        } else if (animState === 'formula' && elapsed > ANIM_FORMULA_MS) {
            animState = 'result';
            animStartTime = millis();
            calculateOutput();
        } else if (animState === 'result' && elapsed > ANIM_RESULT_MS) {
            animState = 'idle';
        }
        redraw();
    }
}

function drawTitle() {
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Delta-Wye Transform', containerWidth / 2, 12);
    textStyle(NORMAL);
    textSize(12);
    fill(100);
    text('Resistor network conversion calculator', containerWidth / 2, 36);
}

// -- Delta diagram --
function drawDeltaDiagram() {
    let cx = deltaCenter.x, cy = deltaCenter.y;
    let s = deltaScale;

    // Triangle vertices (A=top, B=bottom-left, C=bottom-right)
    let ax = cx, ay = cy - s * 0.75;
    let bx = cx - s, by = cy + s * 0.55;
    let cxp = cx + s, cyp = cy + s * 0.55;

    let isInput = deltaToWye;
    let resCol = isInput ? (animState === 'highlight' ? HIGHLIGHT : RES_DELTA) : [180, 180, 180];
    let wireCol = isInput ? WIRE : [170, 170, 170];
    let nodeCol = isInput ? NODE_COL : [150, 150, 150];
    let labelCol = isInput ? [30, 30, 30] : [150, 150, 150];

    // Draw resistor edges
    strokeWeight(2.5);
    stroke(wireCol);

    drawResistorLine(ax, ay, bx, by, resCol);  // Ra: A-B
    drawResistorLine(bx, by, cxp, cyp, resCol); // Rb: B-C
    drawResistorLine(cxp, cyp, ax, ay, resCol);  // Rc: C-A

    // Node dots
    fill(nodeCol);
    noStroke();
    circle(ax, ay, 12);
    circle(bx, by, 12);
    circle(cxp, cyp, 12);

    // Node labels
    fill(labelCol);
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('A', ax, ay - 10);
    textAlign(RIGHT, CENTER);
    text('B', bx - 10, by);
    textAlign(LEFT, CENTER);
    text('C', cxp + 10, cyp);

    // Resistor labels
    textSize(12);
    textStyle(NORMAL);
    let raCol = isInput ? RES_DELTA : [180, 180, 180];
    fill(raCol);
    textAlign(RIGHT, CENTER);
    let raMx = (ax + bx) / 2 - 10, raMy = (ay + by) / 2;
    text(getInputLabel(0) + '=' + nf(sliderVals[0], 0, 0) + (isInput ? 'Ω' : ''), raMx - 2, raMy);

    textAlign(CENTER, TOP);
    let rbMx = (bx + cxp) / 2, rbMy = (by + cyp) / 2 + 10;
    text(getInputLabel(1) + '=' + nf(sliderVals[1], 0, 0) + (isInput ? 'Ω' : ''), rbMx, rbMy);

    textAlign(LEFT, CENTER);
    let rcMx = (cxp + ax) / 2 + 10, rcMy = (cyp + ay) / 2;
    text(getInputLabel(2) + '=' + nf(sliderVals[2], 0, 0) + (isInput ? 'Ω' : ''), rcMx + 2, rcMy);

    // Delta label
    textSize(13);
    textAlign(CENTER, CENTER);
    fill(labelCol);
    textStyle(BOLD);
    text('Delta (Δ)', cx, cy + s * 0.55 + 32);
    textStyle(NORMAL);

    // Show output values on delta side if Y->Delta
    if (!deltaToWye && outputVals[0] !== null && (animState === 'result' || animState === 'idle')) {
        fill(RES_DELTA);
        textSize(11);
        textStyle(BOLD);
        textAlign(RIGHT, CENTER);
        text('Ra=' + nf(outputVals[0], 0, 1) + 'Ω', raMx - 2, raMy + 14);
        textAlign(CENTER, TOP);
        text('Rb=' + nf(outputVals[1], 0, 1) + 'Ω', rbMx, rbMy + 14);
        textAlign(LEFT, CENTER);
        text('Rc=' + nf(outputVals[2], 0, 1) + 'Ω', rcMx + 2, rcMy + 14);
        textStyle(NORMAL);
    }
}

// -- Wye diagram --
function drawWyeDiagram() {
    let cx = wyeCenter.x, cy = wyeCenter.y;
    let s = wyeScale;

    // Center node N
    let nx = cx, ny = cy;
    // Branch endpoints (A=top, B=bottom-left, C=bottom-right)
    let ax = cx, ay = cy - s * 1.1;
    let bx = cx - s * 1.0, by = cy + s * 0.7;
    let cxp = cx + s * 1.0, cyp = cy + s * 0.7;

    let isInput = !deltaToWye;
    let resCol = isInput ? (animState === 'highlight' ? HIGHLIGHT : RES_WYE) : [180, 180, 180];
    let wireCol = isInput ? WIRE : [170, 170, 170];
    let nodeCol = isInput ? NODE_COL : [150, 150, 150];
    let labelCol = isInput ? [30, 30, 30] : [150, 150, 150];

    // Draw resistor branches
    strokeWeight(2.5);
    stroke(wireCol);

    drawResistorLine(nx, ny, ax, ay, resCol);   // R1: N-A
    drawResistorLine(nx, ny, bx, by, resCol);   // R2: N-B
    drawResistorLine(nx, ny, cxp, cyp, resCol);  // R3: N-C

    // Center node
    fill(nodeCol);
    noStroke();
    circle(nx, ny, 10);

    // Outer nodes
    circle(ax, ay, 12);
    circle(bx, by, 12);
    circle(cxp, cyp, 12);

    // Node labels
    fill(labelCol);
    textSize(14);
    textStyle(BOLD);
    textAlign(CENTER, BOTTOM);
    text('A', ax, ay - 10);
    textAlign(RIGHT, CENTER);
    text('B', bx - 10, by);
    textAlign(LEFT, CENTER);
    text('C', cxp + 10, cyp);
    textAlign(CENTER, CENTER);
    textSize(10);
    text('N', nx + 12, ny - 10);

    // Resistor labels
    textSize(12);
    textStyle(NORMAL);
    let rCol = isInput ? RES_WYE : [180, 180, 180];
    fill(rCol);

    textAlign(LEFT, CENTER);
    let r1Mx = (nx + ax) / 2 + 8, r1My = (ny + ay) / 2;
    text(getOutputLabel(0) + (isInput ? '=' + nf(sliderVals[0], 0, 0) + 'Ω' : ''), r1Mx, r1My);

    textAlign(RIGHT, CENTER);
    let r2Mx = (nx + bx) / 2 - 8, r2My = (ny + by) / 2;
    text(getOutputLabel(1) + (isInput ? '=' + nf(sliderVals[1], 0, 0) + 'Ω' : ''), r2Mx, r2My);

    textAlign(LEFT, CENTER);
    let r3Mx = (nx + cxp) / 2 + 8, r3My = (ny + cyp) / 2;
    text(getOutputLabel(2) + (isInput ? '=' + nf(sliderVals[2], 0, 0) + 'Ω' : ''), r3Mx, r3My);

    // Wye label
    textSize(13);
    textAlign(CENTER, CENTER);
    fill(labelCol);
    textStyle(BOLD);
    text('Wye (Y)', cx, max(by, cyp) + 32);
    textStyle(NORMAL);

    // Show output values on wye side if Delta->Wye
    if (deltaToWye && outputVals[0] !== null && (animState === 'result' || animState === 'idle')) {
        fill(RES_WYE);
        textSize(11);
        textStyle(BOLD);
        textAlign(LEFT, CENTER);
        text('R1=' + nf(outputVals[0], 0, 1) + 'Ω', r1Mx, r1My + 14);
        textAlign(RIGHT, CENTER);
        text('R2=' + nf(outputVals[1], 0, 1) + 'Ω', r2Mx, r2My + 14);
        textAlign(LEFT, CENTER);
        text('R3=' + nf(outputVals[2], 0, 1) + 'Ω', r3Mx, r3My + 14);
        textStyle(NORMAL);
    }
}

function getInputLabel(i) {
    if (deltaToWye) return ['Ra', 'Rb', 'Rc'][i];
    return ['R1', 'R2', 'R3'][i];
}

function getOutputLabel(i) {
    if (deltaToWye) return ['R1', 'R2', 'R3'][i];
    return ['Ra', 'Rb', 'Rc'][i];
}

// -- Draw a resistor zigzag along a line --
function drawResistorLine(x1, y1, x2, y2, col) {
    let dx = x2 - x1, dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    let ux = dx / len, uy = dy / len;
    let px = -uy, py = ux;  // perpendicular

    let resLen = len * 0.45;
    let startFrac = 0.5 - resLen / (2 * len);
    let endFrac = 0.5 + resLen / (2 * len);

    // Wire segments
    stroke(WIRE);
    strokeWeight(2);
    line(x1, y1, x1 + dx * startFrac, y1 + dy * startFrac);
    line(x1 + dx * endFrac, y1 + dy * endFrac, x2, y2);

    // Zigzag resistor body
    stroke(col);
    strokeWeight(2.5);
    noFill();
    let zigN = 6;
    let zigAmp = 6;
    let sx = x1 + dx * startFrac;
    let sy = y1 + dy * startFrac;
    let segDx = (dx * (endFrac - startFrac)) / zigN;
    let segDy = (dy * (endFrac - startFrac)) / zigN;

    beginShape();
    vertex(sx, sy);
    for (let j = 0; j < zigN; j++) {
        let sign = (j % 2 === 0) ? 1 : -1;
        let mx = sx + segDx * (j + 0.5) + px * zigAmp * sign;
        let my = sy + segDy * (j + 0.5) + py * zigAmp * sign;
        vertex(mx, my);
    }
    vertex(x1 + dx * endFrac, y1 + dy * endFrac);
    endShape();
}

// -- Direction arrow --
function drawArrow() {
    let midX = containerWidth / 2;
    let midY = 175;
    let arrowLen = 40;

    let dir = deltaToWye ? 1 : -1;
    let ax1 = midX - arrowLen * dir / 2;
    let ax2 = midX + arrowLen * dir / 2;

    stroke(BTN_COL);
    strokeWeight(3);
    line(ax1, midY, ax2, midY);
    // Arrowhead
    let headSize = 10;
    line(ax2, midY, ax2 - headSize * dir, midY - headSize * 0.5);
    line(ax2, midY, ax2 - headSize * dir, midY + headSize * 0.5);

    // Label
    noStroke();
    fill(BTN_COL);
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(deltaToWye ? 'Δ → Y' : 'Y → Δ', midX, midY - 20);
    textStyle(NORMAL);
}

// -- Toggle button --
function drawToggleButton() {
    let b = toggleBtn;
    let hover = isInsideRect(mouseX, mouseY, b.x, b.y, b.w, b.h);

    fill(hover ? BTN_HOVER : BTN_COL);
    noStroke();
    rect(b.x, b.y, b.w, b.h, 6);

    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(deltaToWye ? 'Δ → Y' : 'Y → Δ', b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

// -- Sliders --
function drawSliders() {
    let labels = deltaToWye
        ? ['Ra', 'Rb', 'Rc']
        : ['R1', 'R2', 'R3'];
    let cols = deltaToWye ? RES_DELTA : RES_WYE;

    for (let i = 0; i < 3; i++) {
        let s = sliders[i];
        s.label = labels[i];
        let trackY = s.y;

        // Label
        fill(60);
        noStroke();
        textSize(13);
        textAlign(RIGHT, CENTER);
        textStyle(BOLD);
        text(s.label + ':', s.x - 8, trackY);
        textStyle(NORMAL);

        // Track
        stroke(200);
        strokeWeight(sliderTrackH);
        strokeCap(ROUND);
        line(s.x, trackY, s.x + s.w, trackY);

        // Filled portion
        let frac = (s.val - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN);
        stroke(cols);
        strokeWeight(sliderTrackH);
        line(s.x, trackY, s.x + s.w * frac, trackY);

        // Knob
        let kx = s.x + s.w * frac;
        noStroke();
        fill(255);
        stroke(cols);
        strokeWeight(2);
        circle(kx, trackY, sliderKnobR * 2);

        // Value
        noStroke();
        fill(60);
        textSize(12);
        textAlign(LEFT, CENTER);
        text(nf(s.val, 0, 0) + 'Ω', s.x + s.w + 10, trackY);
    }
}

// -- Transform button --
function drawTransformButton() {
    let b = transformBtn;
    let hover = isInsideRect(mouseX, mouseY, b.x, b.y, b.w, b.h);
    let active = animState !== 'idle';

    fill(active ? [100, 100, 100] : (hover ? BTN_HOVER : BTN_COL));
    noStroke();
    rect(b.x, b.y, b.w, b.h, 8);

    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Transform', b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

// -- Formulas --
function drawFormulas() {
    let y0 = 486;
    let showFormula = (animState === 'formula' || animState === 'result' || (animState === 'idle' && outputVals[0] !== null));

    fill(80);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);

    if (deltaToWye) {
        if (showFormula) {
            fill(60);
            textStyle(NORMAL);
            text(
                'R1 = Ra*Rb/(Ra+Rb+Rc)    R2 = Rb*Rc/(Ra+Rb+Rc)    R3 = Ra*Rc/(Ra+Rb+Rc)',
                containerWidth / 2, y0
            );
            let sum = sliderVals[0] + sliderVals[1] + sliderVals[2];
            fill(100);
            textSize(10);
            text(
                'Sum = ' + nf(sum, 0, 0) + 'Ω',
                containerWidth / 2, y0 + 16
            );
        }
    } else {
        if (showFormula) {
            fill(60);
            textStyle(NORMAL);
            text(
                'Ra = (R1*R2+R2*R3+R3*R1)/R2    Rb = .../R3    Rc = .../R1',
                containerWidth / 2, y0
            );
            let p = sliderVals[0] * sliderVals[1] + sliderVals[1] * sliderVals[2] + sliderVals[2] * sliderVals[0];
            fill(100);
            textSize(10);
            text(
                'Product sum = ' + nf(p, 0, 0),
                containerWidth / 2, y0 + 16
            );
        }
    }
}

// -- Output values --
function drawOutputValues() {
    if (outputVals[0] === null) return;
    if (animState === 'highlight' || animState === 'formula') return;

    // The output values are drawn on the respective diagrams (see drawWyeDiagram / drawDeltaDiagram)
}

// =====================================================================
// CALCULATION
// =====================================================================
function calculateOutput() {
    let a = sliderVals[0], b = sliderVals[1], c = sliderVals[2];

    if (deltaToWye) {
        // Delta to Wye: Ra, Rb, Rc -> R1, R2, R3
        let sum = a + b + c;
        outputVals[0] = (a * b) / sum;  // R1 = Ra*Rb / (Ra+Rb+Rc)
        outputVals[1] = (b * c) / sum;  // R2 = Rb*Rc / (Ra+Rb+Rc)
        outputVals[2] = (a * c) / sum;  // R3 = Ra*Rc / (Ra+Rb+Rc)
    } else {
        // Wye to Delta: R1, R2, R3 -> Ra, Rb, Rc
        let prod = a * b + b * c + c * a;
        outputVals[0] = prod / b;  // Ra = prod / R2
        outputVals[1] = prod / c;  // Rb = prod / R3
        outputVals[2] = prod / a;  // Rc = prod / R1
    }
}

function startAnimation() {
    if (animState !== 'idle') return;
    animState = 'highlight';
    animStartTime = millis();
    outputVals = [null, null, null];
    loop();
}

// =====================================================================
// INPUT HANDLING
// =====================================================================
function mousePressed() {
    // Toggle button
    if (isInsideRect(mouseX, mouseY, toggleBtn.x, toggleBtn.y, toggleBtn.w, toggleBtn.h)) {
        deltaToWye = !deltaToWye;
        outputVals = [null, null, null];
        animState = 'idle';
        computeLayout();
        redraw();
        return;
    }

    // Transform button
    if (isInsideRect(mouseX, mouseY, transformBtn.x, transformBtn.y, transformBtn.w, transformBtn.h)) {
        startAnimation();
        return;
    }

    // Sliders
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        let frac = (s.val - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN);
        let kx = s.x + s.w * frac;
        if (dist(mouseX, mouseY, kx, s.y) < sliderKnobR + 5) {
            s.dragging = true;
            loop();
            return;
        }
        // Click on track
        if (mouseX >= s.x - 5 && mouseX <= s.x + s.w + 5 &&
            mouseY >= s.y - 12 && mouseY <= s.y + 12) {
            let newFrac = constrain((mouseX - s.x) / s.w, 0, 1);
            s.val = round(SLIDER_MIN + newFrac * (SLIDER_MAX - SLIDER_MIN));
            sliderVals[i] = s.val;
            s.dragging = true;
            outputVals = [null, null, null];
            loop();
            return;
        }
    }
}

function mouseDragged() {
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        if (s.dragging) {
            let newFrac = constrain((mouseX - s.x) / s.w, 0, 1);
            s.val = round(SLIDER_MIN + newFrac * (SLIDER_MAX - SLIDER_MIN));
            sliderVals[i] = s.val;
            outputVals = [null, null, null];
            redraw();
            return;
        }
    }
}

function mouseReleased() {
    for (let i = 0; i < sliders.length; i++) {
        sliders[i].dragging = false;
    }
    if (animState === 'idle') noLoop();
    redraw();
}

function mouseMoved() {
    redraw();
}

// =====================================================================
// UTILITY
// =====================================================================
function isInsideRect(mx, my, rx, ry, rw, rh) {
    return mx >= rx && mx <= rx + rw && my >= ry && my <= ry + rh;
}

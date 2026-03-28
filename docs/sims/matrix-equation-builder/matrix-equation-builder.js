// Matrix Equation Builder MicroSim
// Interactive visualization of Node Voltage and Mesh Current methods

let canvasWidth;
const canvasHeight = 550;
const margin = 20;

// Circuit parameters
let Vs = 12;
let R1 = 2000;
let R2 = 4000;
let R3 = 3000;

// UI state
let method = 'node'; // 'node' or 'mesh'
let buildStep = -1;  // -1 = not building, 0..3 = matrix entries
let solved = false;
let showCorrespondence = false;
let solutionV1 = 0, solutionV2 = 0;
let solutionI1 = 0, solutionI2 = 0;

// Slider definitions
let sliders = [];
let buttons = [];
let toggleBtn, corrToggle;

// Colors
const BLUE = [40, 100, 220];
const RED = [210, 50, 50];
const GREEN = [30, 150, 60];
const DARK = [40, 40, 50];
const LIGHT_BG = [248, 249, 252];
const PANEL_BG = [255, 255, 255];
const BORDER = [200, 205, 215];
const ACCENT = [60, 130, 240];
const WIRE_COLOR = [50, 60, 80];
const GROUND_COLOR = [100, 110, 130];
const NODE_FILL = [255, 220, 80];
const NODE_STROKE = [200, 160, 20];

// Animation
let animProgress = 0;
let animTarget = -1;

function setup() {
    canvasWidth = min(windowWidth - 20, 900);
    let cnv = createCanvas(canvasWidth, canvasHeight);
    cnv.parent('main');
    textFont('Arial');
    initControls();
}

function windowResized() {
    canvasWidth = min(windowWidth - 20, 900);
    resizeCanvas(canvasWidth, canvasHeight);
    initControls();
}

function initControls() {
    sliders = [];
    buttons = [];

    let sliderX = canvasWidth - 195;
    let sliderW = 160;
    let sy = 15;

    sliders.push({ x: sliderX, y: sy, w: sliderW, label: 'Vs', min: 1, max: 20, val: Vs, unit: 'V', step: 1 });
    sliders.push({ x: sliderX, y: sy + 40, w: sliderW, label: 'R1', min: 100, max: 10000, val: R1, unit: '\u03A9', step: 100 });
    sliders.push({ x: sliderX, y: sy + 80, w: sliderW, label: 'R2', min: 100, max: 10000, val: R2, unit: '\u03A9', step: 100 });
    sliders.push({ x: sliderX, y: sy + 120, w: sliderW, label: 'R3', min: 100, max: 10000, val: R3, unit: '\u03A9', step: 100 });

    // Buttons
    let btnY = sy + 165;
    toggleBtn = { x: sliderX, y: btnY, w: sliderW, h: 28, label: method === 'node' ? 'Node Voltage' : 'Mesh Current', active: true };
    buttons.push(toggleBtn);

    let buildBtn = { x: sliderX, y: btnY + 36, w: 75, h: 28, label: 'Build', action: 'build' };
    let solveBtn = { x: sliderX + 83, y: btnY + 36, w: 77, h: 28, label: 'Solve', action: 'solve' };
    buttons.push(buildBtn);
    buttons.push(solveBtn);

    corrToggle = { x: sliderX, y: btnY + 72, w: sliderW, h: 28, label: 'Show Links', action: 'corr', toggled: showCorrespondence };
    buttons.push(corrToggle);
}

function draw() {
    background(LIGHT_BG);

    // Title
    fill(DARK);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text('Matrix Equation Builder', margin, 12);
    textStyle(NORMAL);
    textSize(11);
    fill(100);
    text(method === 'node' ? 'Node Voltage Method' : 'Mesh Current Method', margin, 32);

    drawControls();
    drawCircuit();
    drawMatrixEquation();

    if (showCorrespondence && buildStep >= 0) {
        drawCorrespondenceLines();
    }

    // Animation
    if (animTarget >= 0 && animProgress < 1) {
        animProgress += 0.04;
        if (animProgress >= 1) {
            animProgress = 1;
        }
    }
}

// ---- Controls ----

function drawControls() {
    let panelX = canvasWidth - 205;
    let panelY = 5;
    let panelW = 200;
    let panelH = 268;

    // Panel background
    fill(PANEL_BG);
    stroke(BORDER);
    strokeWeight(1);
    rect(panelX, panelY, panelW, panelH, 8);

    // Sliders
    for (let s of sliders) {
        drawSlider(s);
    }

    // Buttons
    for (let b of buttons) {
        drawButton(b);
    }
}

function drawSlider(s) {
    let trackY = s.y + 20;
    // Label
    fill(DARK);
    noStroke();
    textSize(11);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(s.label, s.x, s.y);
    textStyle(NORMAL);
    // Value
    textAlign(RIGHT, TOP);
    fill(ACCENT);
    text(formatValue(s.val, s.unit), s.x + s.w, s.y);

    // Track
    stroke(BORDER);
    strokeWeight(3);
    line(s.x, trackY, s.x + s.w, trackY);

    // Filled portion
    let frac = (s.val - s.min) / (s.max - s.min);
    stroke(ACCENT);
    strokeWeight(3);
    line(s.x, trackY, s.x + frac * s.w, trackY);

    // Thumb
    fill(255);
    stroke(ACCENT);
    strokeWeight(2);
    ellipse(s.x + frac * s.w, trackY, 12, 12);
}

function drawButton(b) {
    let hover = mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h;
    let isToggle = (b === toggleBtn);
    let isCorr = (b.action === 'corr');

    if (isToggle) {
        fill(method === 'node' ? [40, 100, 220] : [180, 70, 160]);
    } else if (isCorr) {
        fill(showCorrespondence ? [40, 150, 100] : [160, 170, 180]);
    } else if (b.action === 'solve') {
        fill(hover ? [25, 140, 50] : GREEN);
    } else {
        fill(hover ? [50, 120, 250] : ACCENT);
    }

    noStroke();
    rect(b.x, b.y, b.w, b.h, 5);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(b.label, b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

function formatValue(val, unit) {
    if (unit === '\u03A9') {
        if (val >= 1000) return (val / 1000).toFixed(1) + ' k\u03A9';
        return val + ' \u03A9';
    }
    return val + ' ' + unit;
}

// ---- Circuit Drawing ----

function drawCircuit() {
    let cx = 200; // center of circuit area
    let cy = 165;

    // Circuit panel
    fill(PANEL_BG);
    stroke(BORDER);
    strokeWeight(1);
    rect(margin, 50, canvasWidth - 225, 220, 8);

    push();
    // Layout: left branch = Vs (bottom) + R1 (top), top = R2, right = R3
    let nA = { x: cx - 80, y: cy - 55 }; // Node 1 (top-left)
    let nB = { x: cx + 100, y: cy - 55 }; // Node 2 (top-right)
    let gndL = { x: cx - 80, y: cy + 75 }; // Ground left
    let gndR = { x: cx + 100, y: cy + 75 }; // Ground right
    let midL = cy + 10; // junction between Vs and R1 on left branch

    // Wires - draw segments that components will overlay
    stroke(WIRE_COLOR);
    strokeWeight(2.5);
    // Top wire from nA to nB (R2 will overlay center)
    line(nA.x, nA.y, nB.x, nB.y);
    // Left branch: Node1 down to ground
    line(nA.x, nA.y, nA.x, gndL.y);
    // Right branch: Node2 down to ground
    line(nB.x, nB.y, nB.x, gndR.y);
    // Bottom wire connecting grounds
    line(gndL.x, gndL.y, gndR.x, gndR.y);

    // Voltage source on left branch (bottom half: gndL.y to midL)
    drawVoltageSource(nA.x, gndL.y, nA.x, midL);

    // R1 on left branch (top half: midL to nA.y)
    drawResistor(nA.x, midL, nA.x, nA.y, 'R1');

    // R2 horizontal between nodes
    drawResistorH(nA.x + 12, nA.y, nB.x - 12, nB.y, 'R2');

    // R3 on right side
    drawResistor(nB.x, nB.y, nB.x, gndR.y, 'R3');

    // Ground symbol
    let gndMid = (gndL.x + gndR.x) / 2;
    drawGround(gndMid, gndR.y);

    // Voltage source label
    fill(RED);
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    textStyle(BOLD);
    text('Vs=' + Vs + 'V', nA.x - 20, (gndL.y + midL) / 2);
    textStyle(NORMAL);

    // Node labels
    drawNodeDot(nA.x, nA.y, 'V\u2081', method === 'node' && solved);
    drawNodeDot(nB.x, nB.y, 'V\u2082', method === 'node' && solved);

    // Show solved values on circuit
    if (solved) {
        textSize(11);
        textStyle(BOLD);
        if (method === 'node') {
            fill(GREEN);
            textAlign(CENTER, BOTTOM);
            text('V\u2081 = ' + solutionV1.toFixed(2) + 'V', nA.x, nA.y - 16);
            text('V\u2082 = ' + solutionV2.toFixed(2) + 'V', nB.x, nB.y - 16);
        } else {
            fill([180, 70, 160]);
            textAlign(CENTER, TOP);
            drawMeshArrow((nA.x + nB.x) / 2 - 30, cy + 10, 'I\u2081=' + (solutionI1 * 1000).toFixed(2) + 'mA');
            drawMeshArrow((nA.x + nB.x) / 2 + 60, cy + 10, 'I\u2082=' + (solutionI2 * 1000).toFixed(2) + 'mA');
        }
        textStyle(NORMAL);
    }

    // Mesh current labels (always show in mesh mode)
    if (method === 'mesh' && !solved) {
        drawMeshArrow((nA.x + nB.x) / 2 - 30, cy + 10, 'I\u2081');
        drawMeshArrow((nA.x + nB.x) / 2 + 60, cy + 10, 'I\u2082');
    }

    pop();
}

function drawNodeDot(x, y, label, highlight) {
    fill(highlight ? [30, 180, 70] : NODE_FILL);
    stroke(highlight ? [20, 130, 50] : NODE_STROKE);
    strokeWeight(2);
    ellipse(x, y, 14, 14);
    fill(DARK);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(label, x, y + 9);
    textStyle(NORMAL);
}

function drawVoltageSource(x, yBot, x2, yTop) {
    // Vertical voltage source from (x, yBot) to (x2, yTop)
    let mx = x;
    let my = (yBot + yTop) / 2;
    let r = 14;

    // Wire segments above and below the circle
    stroke(WIRE_COLOR);
    strokeWeight(2.5);
    line(x, yBot, mx, my + r);
    line(mx, my - r, x2, yTop);

    // Circle
    noFill();
    stroke([210, 60, 60]);
    strokeWeight(2);
    ellipse(mx, my, r * 2, r * 2);

    // Plus (top) / minus (bottom)
    textSize(12);
    fill([210, 60, 60]);
    noStroke();
    textAlign(CENTER, CENTER);
    text('+', mx, my - 5);
    text('\u2013', mx, my + 5);
}

function drawResistor(x1, y1, x2, y2, label) {
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;
    let len = dist(x1, y1, x2, y2);
    let rLen = min(len * 0.5, 40);

    stroke(WIRE_COLOR);
    strokeWeight(2.5);
    // Wires to resistor body
    line(x1, y1, mx, my - rLen / 2);
    line(mx, my + rLen / 2, x2, y2);

    // Resistor body (rectangle)
    fill(255);
    stroke([150, 130, 80]);
    strokeWeight(1.5);
    rectMode(CENTER);
    rect(mx, my, 16, rLen, 2);
    rectMode(CORNER);

    // Label
    fill(DARK);
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(label, mx + 12, my);
    textStyle(NORMAL);
}

function drawResistorH(x1, y1, x2, y2, label) {
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;
    let rLen = min(abs(x2 - x1) * 0.4, 40);

    stroke(WIRE_COLOR);
    strokeWeight(2.5);
    line(x1, y1, mx - rLen / 2, my);
    line(mx + rLen / 2, my, x2, y2);

    fill(255);
    stroke([150, 130, 80]);
    strokeWeight(1.5);
    rectMode(CENTER);
    rect(mx, my, rLen, 14, 2);
    rectMode(CORNER);

    fill(DARK);
    noStroke();
    textSize(11);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(label, mx, my + 11);
    textStyle(NORMAL);
}

function drawGround(x, y) {
    stroke(GROUND_COLOR);
    strokeWeight(2);
    line(x - 14, y, x + 14, y);
    line(x - 9, y + 5, x + 9, y + 5);
    line(x - 4, y + 10, x + 4, y + 10);
    noStroke();
    fill(GROUND_COLOR);
    textSize(10);
    textAlign(CENTER, TOP);
    text('GND', x, y + 13);
}

function drawMeshArrow(x, y, label) {
    push();
    noFill();
    stroke([180, 70, 160, 180]);
    strokeWeight(1.5);
    arc(x, y, 30, 30, PI * 0.2, PI * 1.5);
    // Arrowhead
    let ax = x + 15 * cos(PI * 1.5);
    let ay = y + 15 * sin(PI * 1.5);
    fill([180, 70, 160, 180]);
    noStroke();
    triangle(ax - 4, ay - 2, ax + 2, ay - 6, ax + 2, ay + 2);
    // Label
    fill([180, 70, 160]);
    textSize(10);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(label, x, y + 18);
    textStyle(NORMAL);
    pop();
}

// ---- Matrix Equation ----

function drawMatrixEquation() {
    let mxStart = margin + 10;
    let myStart = 290;

    // Matrix panel
    fill(PANEL_BG);
    stroke(BORDER);
    strokeWeight(1);
    rect(margin, 278, canvasWidth - 225, 260, 8);

    // Title
    fill(DARK);
    noStroke();
    textSize(13);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    if (method === 'node') {
        text('[G] \u00B7 [V] = [I]', mxStart, myStart);
    } else {
        text('[R] \u00B7 [I] = [V]', mxStart, myStart);
    }
    textStyle(NORMAL);

    let eqY = myStart + 30;
    let cellW = 100;
    let cellH = 36;
    let matX = mxStart + 15;
    let vecXvar = matX + cellW * 2 + 50;
    let eqSignX = vecXvar - 16;
    let vecXrhs = vecXvar + 60;

    // Compute matrix entries
    let m11, m12, m21, m22, rhs1, rhs2;
    let m11Str, m12Str, m21Str, m22Str, rhs1Str, rhs2Str;
    let varLabel1, varLabel2;

    if (method === 'node') {
        let g1 = 1 / R1, g2 = 1 / R2, g3 = 1 / R3;
        m11 = g1 + g2;
        m12 = -g2;
        m21 = -g2;
        m22 = g2 + g3;
        rhs1 = Vs / R1;
        rhs2 = 0;
        m11Str = fmtG(m11);
        m12Str = fmtG(m12);
        m21Str = fmtG(m21);
        m22Str = fmtG(m22);
        rhs1Str = fmtI(rhs1);
        rhs2Str = '0';
        varLabel1 = 'V\u2081';
        varLabel2 = 'V\u2082';
    } else {
        m11 = R1 + R2;
        m12 = -R2;
        m21 = -R2;
        m22 = R2 + R3;
        rhs1 = Vs;
        rhs2 = 0;
        m11Str = fmtR(m11);
        m12Str = fmtR(m12);
        m21Str = fmtR(m21);
        m22Str = fmtR(m22);
        rhs1Str = Vs + 'V';
        rhs2Str = '0';
        varLabel1 = 'I\u2081';
        varLabel2 = 'I\u2082';
    }

    // Draw bracket for LHS matrix
    stroke(DARK);
    strokeWeight(2);
    noFill();
    // Left bracket
    line(matX - 6, eqY - 4, matX - 10, eqY - 4);
    line(matX - 10, eqY - 4, matX - 10, eqY + cellH * 2 + 4);
    line(matX - 10, eqY + cellH * 2 + 4, matX - 6, eqY + cellH * 2 + 4);
    // Right bracket
    let rbx = matX + cellW * 2 + 6;
    line(rbx, eqY - 4, rbx + 4, eqY - 4);
    line(rbx + 4, eqY - 4, rbx + 4, eqY + cellH * 2 + 4);
    line(rbx + 4, eqY + cellH * 2 + 4, rbx, eqY + cellH * 2 + 4);

    // Matrix cells
    let entries = [
        { r: 0, c: 0, val: m11Str, color: BLUE, desc: method === 'node' ? '1/R1+1/R2' : 'R1+R2' },
        { r: 0, c: 1, val: m12Str, color: RED, desc: method === 'node' ? '-1/R2' : '-R2' },
        { r: 1, c: 0, val: m21Str, color: RED, desc: method === 'node' ? '-1/R2' : '-R2' },
        { r: 1, c: 1, val: m22Str, color: BLUE, desc: method === 'node' ? '1/R2+1/R3' : 'R2+R3' }
    ];

    for (let i = 0; i < entries.length; i++) {
        let e = entries[i];
        let ex = matX + e.c * cellW;
        let ey = eqY + e.r * cellH;
        let show = (buildStep < 0) || (i <= buildStep);
        let animating = (i === buildStep && animProgress < 1);

        if (show) {
            let alpha = animating ? animProgress * 255 : 255;
            // Cell highlight
            noStroke();
            fill(e.color[0], e.color[1], e.color[2], alpha * 0.12);
            rect(ex, ey, cellW - 4, cellH - 2, 4);

            fill(e.color[0], e.color[1], e.color[2], alpha);
            textSize(13);
            textAlign(CENTER, CENTER);
            textStyle(BOLD);
            text(e.val, ex + cellW / 2 - 2, ey + cellH / 2);
            textStyle(NORMAL);

            // Small description
            fill(e.color[0], e.color[1], e.color[2], alpha * 0.6);
            textSize(8);
            textAlign(CENTER, BOTTOM);
            text(e.desc, ex + cellW / 2 - 2, ey + cellH - 2);
        }
    }

    // Multiplication dot
    noStroke();
    fill(DARK);
    textSize(18);
    textAlign(CENTER, CENTER);
    text('\u00B7', rbx + 14, eqY + cellH);

    // Variable vector brackets
    let vvx = rbx + 24;
    stroke(DARK);
    strokeWeight(2);
    noFill();
    line(vvx, eqY - 4, vvx - 4, eqY - 4);
    line(vvx - 4, eqY - 4, vvx - 4, eqY + cellH * 2 + 4);
    line(vvx - 4, eqY + cellH * 2 + 4, vvx, eqY + cellH * 2 + 4);
    let vvx2 = vvx + 32;
    line(vvx2, eqY - 4, vvx2 + 4, eqY - 4);
    line(vvx2 + 4, eqY - 4, vvx2 + 4, eqY + cellH * 2 + 4);
    line(vvx2 + 4, eqY + cellH * 2 + 4, vvx2, eqY + cellH * 2 + 4);

    // Variable labels
    noStroke();
    fill(DARK);
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(varLabel1, vvx + 16, eqY + cellH / 2);
    text(varLabel2, vvx + 16, eqY + cellH + cellH / 2);
    textStyle(NORMAL);

    // Equals sign
    fill(DARK);
    textSize(18);
    textAlign(CENTER, CENTER);
    text('=', vvx2 + 18, eqY + cellH);

    // RHS vector
    let rhsX = vvx2 + 32;
    stroke(DARK);
    strokeWeight(2);
    noFill();
    line(rhsX, eqY - 4, rhsX - 4, eqY - 4);
    line(rhsX - 4, eqY - 4, rhsX - 4, eqY + cellH * 2 + 4);
    line(rhsX - 4, eqY + cellH * 2 + 4, rhsX, eqY + cellH * 2 + 4);
    let rhsX2 = rhsX + 64;
    line(rhsX2, eqY - 4, rhsX2 + 4, eqY - 4);
    line(rhsX2 + 4, eqY - 4, rhsX2 + 4, eqY + cellH * 2 + 4);
    line(rhsX2 + 4, eqY + cellH * 2 + 4, rhsX2, eqY + cellH * 2 + 4);

    // RHS entries
    let rhsEntries = [
        { r: 0, val: rhs1Str, color: GREEN },
        { r: 1, val: rhs2Str, color: GREEN }
    ];
    for (let e of rhsEntries) {
        let ey = eqY + e.r * cellH;
        noStroke();
        fill(e.color[0], e.color[1], e.color[2], 0.12 * 255);
        rect(rhsX, ey, 64, cellH - 2, 4);
        fill(e.color[0], e.color[1], e.color[2]);
        textSize(13);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(e.val, rhsX + 32, ey + cellH / 2);
        textStyle(NORMAL);
    }

    // Solution display
    if (solved) {
        let solY = eqY + cellH * 2 + 20;
        fill(DARK);
        textSize(13);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        text('Solution:', mxStart, solY);
        textStyle(NORMAL);

        if (method === 'node') {
            fill(GREEN);
            textSize(14);
            textStyle(BOLD);
            text('V\u2081 = ' + solutionV1.toFixed(3) + ' V', mxStart + 80, solY);
            text('V\u2082 = ' + solutionV2.toFixed(3) + ' V', mxStart + 240, solY);
            textStyle(NORMAL);
        } else {
            fill([180, 70, 160]);
            textSize(14);
            textStyle(BOLD);
            text('I\u2081 = ' + (solutionI1 * 1000).toFixed(3) + ' mA', mxStart + 80, solY);
            text('I\u2082 = ' + (solutionI2 * 1000).toFixed(3) + ' mA', mxStart + 260, solY);
            textStyle(NORMAL);
        }
    }
}

// ---- Correspondence Lines ----

function drawCorrespondenceLines() {
    // Circuit element positions (must match drawCircuit)
    let cx = 200;
    let cy = 165;
    let nA = { x: cx - 80, y: cy - 55 };
    let nB = { x: cx + 100, y: cy - 55 };
    let midL = cy + 10;

    // R1 center (between midL and nA.y)
    let r1Pos = { x: nA.x, y: (midL + nA.y) / 2 };
    // R2 center (horizontal)
    let r2Pos = { x: (nA.x + nB.x) / 2, y: nA.y };
    // R3 center
    let r3Pos = { x: nB.x, y: (nB.y + cy + 75) / 2 };

    let mxStart = margin + 10;
    let eqY = 320;
    let cellW = 100;
    let cellH = 36;
    let matX = mxStart + 15;

    // Map: matrix cell -> circuit elements
    // m11 (0,0) -> R1, R2
    // m12 (0,1) -> R2
    // m21 (1,0) -> R2
    // m22 (1,1) -> R2, R3

    let connections = [];
    if (buildStep >= 0) {
        connections.push({ from: { x: matX + cellW / 2, y: eqY }, to: r1Pos, color: BLUE, step: 0 });
        connections.push({ from: { x: matX + cellW / 2, y: eqY }, to: r2Pos, color: BLUE, step: 0 });
    }
    if (buildStep >= 1) {
        connections.push({ from: { x: matX + cellW + cellW / 2, y: eqY + cellH / 2 }, to: r2Pos, color: RED, step: 1 });
    }
    if (buildStep >= 2) {
        connections.push({ from: { x: matX + cellW / 2, y: eqY + cellH + cellH / 2 }, to: r2Pos, color: RED, step: 2 });
    }
    if (buildStep >= 3) {
        connections.push({ from: { x: matX + cellW + cellW / 2, y: eqY + cellH }, to: r2Pos, color: BLUE, step: 3 });
        connections.push({ from: { x: matX + cellW + cellW / 2, y: eqY + cellH }, to: r3Pos, color: BLUE, step: 3 });
    }

    for (let c of connections) {
        if (c.step <= buildStep) {
            stroke(c.color[0], c.color[1], c.color[2], 100);
            strokeWeight(1.5);
            drawingContext.setLineDash([4, 4]);
            line(c.from.x, c.from.y, c.to.x, c.to.y);
            drawingContext.setLineDash([]);
            // Small dot at circuit end
            fill(c.color[0], c.color[1], c.color[2], 160);
            noStroke();
            ellipse(c.to.x, c.to.y, 6, 6);
        }
    }
}

// ---- Formatting helpers ----

function fmtG(val) {
    // Format conductance in mS
    let ms = val * 1000;
    if (abs(ms) < 0.01) return '0';
    return ms.toFixed(2) + ' mS';
}

function fmtI(val) {
    // Format current in mA
    let ma = val * 1000;
    return ma.toFixed(2) + ' mA';
}

function fmtR(val) {
    if (val < 0) {
        let av = abs(val);
        if (av >= 1000) return '-' + (av / 1000).toFixed(1) + ' k\u03A9';
        return '-' + av + ' \u03A9';
    }
    if (val >= 1000) return (val / 1000).toFixed(1) + ' k\u03A9';
    return val + ' \u03A9';
}

// ---- Solve ----

function solveSystem() {
    if (method === 'node') {
        let g1 = 1 / R1, g2 = 1 / R2, g3 = 1 / R3;
        let a = g1 + g2, b = -g2, c = -g2, d = g2 + g3;
        let r1 = Vs / R1, r2 = 0;
        let det = a * d - b * c;
        solutionV1 = (r1 * d - b * r2) / det;
        solutionV2 = (a * r2 - r1 * c) / det;
    } else {
        let a = R1 + R2, b = -R2, c = -R2, d = R2 + R3;
        let r1 = Vs, r2 = 0;
        let det = a * d - b * c;
        solutionI1 = (r1 * d - b * r2) / det;
        solutionI2 = (a * r2 - r1 * c) / det;
    }
    solved = true;
}

// ---- Mouse Interaction ----

let draggingSlider = null;

function mousePressed() {
    // Check sliders
    for (let s of sliders) {
        let trackY = s.y + 20;
        let frac = (s.val - s.min) / (s.max - s.min);
        let thumbX = s.x + frac * s.w;
        if (dist(mouseX, mouseY, thumbX, trackY) < 14) {
            draggingSlider = s;
            return;
        }
    }

    // Check buttons
    for (let b of buttons) {
        if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
            if (b === toggleBtn) {
                method = method === 'node' ? 'mesh' : 'node';
                toggleBtn.label = method === 'node' ? 'Node Voltage' : 'Mesh Current';
                buildStep = -1;
                solved = false;
            } else if (b.action === 'build') {
                buildStep++;
                if (buildStep > 3) buildStep = 0;
                animProgress = 0;
                animTarget = buildStep;
                solved = false;
            } else if (b.action === 'solve') {
                buildStep = 3; // show all entries
                animProgress = 1;
                solveSystem();
            } else if (b.action === 'corr') {
                showCorrespondence = !showCorrespondence;
                corrToggle.toggled = showCorrespondence;
                corrToggle.label = showCorrespondence ? 'Hide Links' : 'Show Links';
            }
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider) {
        let s = draggingSlider;
        let frac = constrain((mouseX - s.x) / s.w, 0, 1);
        let raw = s.min + frac * (s.max - s.min);
        s.val = round(raw / s.step) * s.step;
        s.val = constrain(s.val, s.min, s.max);

        // Update globals
        if (s.label === 'Vs') Vs = s.val;
        else if (s.label === 'R1') R1 = s.val;
        else if (s.label === 'R2') R2 = s.val;
        else if (s.label === 'R3') R3 = s.val;

        // Recalculate if solved
        if (solved) solveSystem();
    }
}

function mouseReleased() {
    draggingSlider = null;
}

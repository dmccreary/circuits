// Mesh vs Supermesh Comparison MicroSim
//
// Circuit topology:
//   +--[R1]---A---[R2]--+
//   |         |         |
//  Vs        [R3]       Is or wire
//   |         |         |
//   +---------B---------+
//
// Standard mode: right branch is a wire (0V), two KVL mesh equations
// Supermesh mode: right branch has current source Is

'use strict';

let drawHeight = 340;
let controlHeight = 180;
let canvasHeight;
let containerWidth;

// Mode: 0 = Standard Mesh, 1 = Supermesh
let mode = 0;

// Circuit parameters
let R1 = 2, R2 = 4, R3 = 3; // kOhm
let Vs = 12; // V
let Is = 2;  // A

// Solved mesh currents (mA)
let I1 = 0, I2 = 0;

// Layout
let sliders = [];
let solveBtn = { x: 0, y: 0, w: 100, h: 32 };
let modeBtn = { x: 0, y: 0, w: 200, h: 32 };
let solved = false;

// Colors
const COL_BG = [248, 250, 252];
const COL_WIRE = [40, 40, 40];
const COL_R = [70, 130, 200];
const COL_VS = [220, 60, 60];
const COL_IS = [40, 160, 80];
const COL_I1 = [200, 80, 50];
const COL_I2 = [50, 80, 200];
const COL_SUPER = [255, 140, 0];
const COL_BTN = [55, 90, 160];
const COL_BTN_HOVER = [75, 110, 180];

function setup() {
    updateCanvasSize();
    canvasHeight = drawHeight + controlHeight;
    createCanvas(containerWidth, canvasHeight).parent(document.querySelector('main'));
    textFont('Arial');
    initSliders();
    solveMesh();
}

function updateCanvasSize() {
    containerWidth = max(600, floor(
        document.querySelector('main').getBoundingClientRect().width
    ));
}

function initSliders() {
    let sx = 70;
    let sw = containerWidth - sx - 80;
    let sy = drawHeight + 10;
    let gap = 28;
    sliders = [
        { label: 'R1', min: 1, max: 10, val: R1, unit: 'k\u03A9', x: sx, y: sy, w: sw },
        { label: 'R2', min: 1, max: 10, val: R2, unit: 'k\u03A9', x: sx, y: sy + gap, w: sw },
        { label: 'R3', min: 1, max: 10, val: R3, unit: 'k\u03A9', x: sx, y: sy + gap * 2, w: sw },
        { label: 'Vs', min: 1, max: 20, val: Vs, unit: 'V', x: sx, y: sy + gap * 3, w: sw },
        { label: 'Is', min: 0.5, max: 5, val: Is, unit: 'A', x: sx, y: sy + gap * 4, w: sw },
    ];
}

function solveMesh() {
    if (mode === 0) {
        // Standard mesh: two loops, both CW
        // Loop 1: Vs = I1*R1 + (I1-I2)*R3
        // Loop 2: 0 = I2*R2 + (I2-I1)*R3
        let a11 = R1 + R3, a12 = -R3;
        let a21 = -R3, a22 = R2 + R3;
        let det = a11 * a22 - a12 * a21;
        if (abs(det) < 1e-12) { I1 = 0; I2 = 0; return; }
        I1 = (Vs * a22) / det;
        I2 = (Vs * R3) / det;
    } else {
        // Supermesh: Is in right branch (upward)
        // Supermesh KVL (outer boundary): Vs = I1*R1 + I2*R2
        // Constraint: I2 - I1 = Is
        I2 = (Vs + Is * R1) / (R1 + R2);
        I1 = I2 - Is;
    }
    solved = true;
}

function draw() {
    background(COL_BG);

    // Title
    fill(30);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Mesh vs Supermesh Comparison', containerWidth / 2, 8);

    // Mode toggle button
    modeBtn.x = containerWidth / 2 - 100;
    modeBtn.y = 30;
    modeBtn.w = 200;
    drawButton(modeBtn, mode === 0 ? '\u25C9 Standard Mesh' : '\u25C9 Supermesh', isOver(modeBtn));

    // Divider
    stroke(200);
    strokeWeight(1);
    line(containerWidth / 2, 68, containerWidth / 2, drawHeight - 5);

    // Left: circuit diagram
    fill(30);
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    text('Circuit Diagram', containerWidth * 0.28, 64);
    drawCircuit(containerWidth * 0.28, 175, containerWidth * 0.42);

    // Right: equations and solution
    text('Equations & Solution', containerWidth * 0.72, 64);
    drawEquations(containerWidth * 0.72, 80);

    // Solve button
    solveBtn.x = containerWidth / 2 - 50;
    solveBtn.y = drawHeight - 42;
    solveBtn.w = 100;
    drawButton(solveBtn, 'Solve', isOver(solveBtn));

    // Separator
    stroke(180);
    strokeWeight(1);
    line(0, drawHeight, containerWidth, drawHeight);

    // Sliders
    drawSliders();
}

function drawCircuit(cx, cy, w) {
    let hw = w * 0.42;
    let hh = 80;
    let lx = cx - hw;
    let rx = cx + hw;
    let ty = cy - hh;
    let by = cy + hh;
    let mx = cx;

    // Wires
    stroke(COL_WIRE);
    strokeWeight(2.5);
    noFill();

    // Top wires (leave gap for resistors)
    line(lx, ty, (lx + mx) / 2 - 32, ty);
    line((lx + mx) / 2 + 32, ty, mx, ty);
    line(mx, ty, (mx + rx) / 2 - 32, ty);
    line((mx + rx) / 2 + 32, ty, rx, ty);

    // Left vertical (leave gap for Vs)
    line(lx, ty, lx, cy - 16);
    line(lx, cy + 16, lx, by);

    // Right vertical
    if (mode === 0) {
        line(rx, ty, rx, by);
    } else {
        line(rx, ty, rx, cy - 16);
        line(rx, cy + 16, rx, by);
    }

    // Bottom wire
    line(lx, by, rx, by);

    // Middle vertical (leave gap for R3)
    line(mx, ty, mx, cy - 32);
    line(mx, cy + 32, mx, by);

    // R1
    drawResistorH((lx + mx) / 2, ty, 'R1', R1 + 'k\u03A9');

    // R2
    drawResistorH((mx + rx) / 2, ty, 'R2', R2 + 'k\u03A9');

    // R3
    drawResistorV(mx, cy, 'R3', R3 + 'k\u03A9');

    // Vs
    drawVoltageSource(lx, cy, Vs + 'V');

    // Right branch
    if (mode === 0) {
        fill(100);
        noStroke();
        textSize(9);
        textAlign(CENTER, CENTER);
        text('(wire)', rx + 28, cy);
    } else {
        drawCurrentSource(rx, cy, Is + 'A');
        drawSuperMeshBoundary(lx, rx, ty, by, cx, cy);
    }

    // Mesh current arrows
    if (solved) {
        drawMeshCurrent(cx - hw / 2, cy, I1, 'I\u2081', COL_I1);
        drawMeshCurrent(cx + hw / 2, cy, I2, 'I\u2082', COL_I2);
    }

    // Node labels
    fill(60);
    noStroke();
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('A', mx, ty - 5);
    textAlign(CENTER, TOP);
    text('B', mx, by + 4);

    // GND
    drawGround(mx, by);
}

function drawSuperMeshBoundary(lx, rx, ty, by, cx, cy) {
    noFill();
    stroke(COL_SUPER);
    strokeWeight(2.5);
    drawingContext.setLineDash([7, 5]);

    let pad = 14;
    // Draw dashed boundary around outer loop, with gap at Is
    beginShape();
    vertex(lx - pad, ty - pad);
    vertex(rx + pad, ty - pad);
    vertex(rx + pad, cy - 22);
    endShape();

    beginShape();
    vertex(rx + pad, cy + 22);
    vertex(rx + pad, by + pad);
    vertex(lx - pad, by + pad);
    vertex(lx - pad, ty - pad);
    endShape();

    drawingContext.setLineDash([]);

    // Label
    fill(COL_SUPER);
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Supermesh', rx + pad + 3, ty - pad + 8);
}

function drawResistorH(x, y, label, valStr) {
    push();
    translate(x, y);
    stroke(COL_R);
    strokeWeight(2.5);
    noFill();

    let half = 24;
    let amp = 7;
    let segs = 5;

    beginShape();
    vertex(-half, 0);
    for (let i = 0; i < segs; i++) {
        vertex(map(i + 0.25, 0, segs, -half, half), (i % 2 === 0 ? -amp : amp));
        vertex(map(i + 0.75, 0, segs, -half, half), (i % 2 === 0 ? amp : -amp));
    }
    vertex(half, 0);
    endShape();

    noStroke();
    fill(COL_R);
    textSize(11);
    textAlign(CENTER, TOP);
    text(label, 0, amp + 3);
    textSize(9);
    fill(100);
    text(valStr, 0, amp + 16);
    pop();
}

function drawResistorV(x, y, label, valStr) {
    push();
    translate(x, y);
    stroke(COL_R);
    strokeWeight(2.5);
    noFill();

    let half = 24;
    let amp = 7;
    let segs = 5;

    beginShape();
    vertex(0, -half);
    for (let i = 0; i < segs; i++) {
        vertex((i % 2 === 0 ? -amp : amp), map(i + 0.25, 0, segs, -half, half));
        vertex((i % 2 === 0 ? amp : -amp), map(i + 0.75, 0, segs, -half, half));
    }
    vertex(0, half);
    endShape();

    noStroke();
    fill(COL_R);
    textSize(11);
    textAlign(LEFT, CENTER);
    text(label, amp + 5, -5);
    textSize(9);
    fill(100);
    text(valStr, amp + 5, 9);
    pop();
}

function drawVoltageSource(x, y, valStr) {
    push();
    translate(x, y);
    stroke(COL_VS);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, 28, 28);

    fill(COL_VS);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('+', 0, -8);
    text('\u2013', 0, 7);

    textSize(10);
    textAlign(RIGHT, CENTER);
    text('Vs', -19, -9);
    textSize(9);
    fill(100);
    text(valStr, -19, 5);
    pop();
}

function drawCurrentSource(x, y, valStr) {
    push();
    translate(x, y);
    stroke(COL_IS);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, 28, 28);

    stroke(COL_IS);
    strokeWeight(2);
    line(0, 8, 0, -8);
    fill(COL_IS);
    noStroke();
    triangle(0, -8, -4, -2, 4, -2);

    textSize(10);
    textAlign(LEFT, CENTER);
    text('Is', 19, -9);
    textSize(9);
    fill(100);
    text(valStr, 19, 5);
    pop();
}

function drawGround(x, y) {
    stroke(COL_WIRE);
    strokeWeight(2);
    line(x - 14, y, x + 14, y);
    line(x - 9, y + 4, x + 9, y + 4);
    line(x - 4, y + 8, x + 4, y + 8);
}

function drawMeshCurrent(cx, cy, current, label, col) {
    push();
    translate(cx, cy);

    let r = 28;
    stroke(col[0], col[1], col[2], 180);
    strokeWeight(1.8);
    noFill();
    arc(0, 0, r * 2, r * 2, PI * 0.2, PI * 1.8);

    // Arrowhead
    let ang = PI * 1.8;
    let ax = cos(ang) * r;
    let ay = sin(ang) * r;
    fill(col[0], col[1], col[2], 180);
    noStroke();
    push();
    translate(ax, ay);
    rotate(ang + HALF_PI);
    triangle(0, -5, -3, 3, 3, 3);
    pop();

    // Label with value
    noStroke();
    fill(col);
    textSize(11);
    textAlign(CENTER, CENTER);
    text(label + '=' + nf(current, 1, 2) + 'mA', 0, 2);
    pop();
}

function drawEquations(cx, topY) {
    let y = topY + 18;
    let lh = 21;

    noStroke();
    textAlign(CENTER, TOP);

    if (mode === 0) {
        fill(COL_I1);
        textSize(12);
        text('Loop 1 KVL (CW):', cx, y); y += lh;
        fill(50);
        textSize(11);
        text('Vs = I\u2081\u00B7R1 + (I\u2081 \u2013 I\u2082)\u00B7R3', cx, y); y += lh;
        fill(80);
        textSize(10);
        text(Vs + ' = I\u2081\u00B7' + R1 + 'k + (I\u2081 \u2013 I\u2082)\u00B7' + R3 + 'k', cx, y); y += lh * 1.5;

        fill(COL_I2);
        textSize(12);
        text('Loop 2 KVL (CW):', cx, y); y += lh;
        fill(50);
        textSize(11);
        text('0 = I\u2082\u00B7R2 + (I\u2082 \u2013 I\u2081)\u00B7R3', cx, y); y += lh;
        fill(80);
        textSize(10);
        text('0 = I\u2082\u00B7' + R2 + 'k + (I\u2082 \u2013 I\u2081)\u00B7' + R3 + 'k', cx, y);
    } else {
        fill(COL_SUPER);
        textSize(12);
        text('Supermesh KVL:', cx, y); y += lh;
        fill(50);
        textSize(11);
        text('Vs = I\u2081\u00B7R1 + I\u2082\u00B7R2', cx, y); y += lh;
        fill(80);
        textSize(10);
        text(Vs + ' = I\u2081\u00B7' + R1 + 'k + I\u2082\u00B7' + R2 + 'k', cx, y); y += lh * 1.5;

        fill(COL_IS);
        textSize(12);
        text('Constraint (current source):', cx, y); y += lh;
        fill(50);
        textSize(11);
        text('I\u2082 \u2013 I\u2081 = Is', cx, y); y += lh;
        fill(80);
        textSize(10);
        text('I\u2082 \u2013 I\u2081 = ' + nf(Is, 1, 1), cx, y);
    }

    // Solution box
    if (solved) {
        y += lh * 1.8;
        let boxW = 170;
        let boxH = 52;
        let bx = cx - boxW / 2;

        fill(255);
        stroke(180);
        strokeWeight(1);
        rect(bx, y, boxW, boxH, 6);

        noStroke();
        fill(30);
        textSize(12);
        textAlign(CENTER, TOP);
        text('Solved Currents', cx, y + 4);

        fill(COL_I1);
        textSize(12);
        text('I\u2081 = ' + nf(I1, 1, 3) + ' mA', cx, y + 19);
        fill(COL_I2);
        text('I\u2082 = ' + nf(I2, 1, 3) + ' mA', cx, y + 35);
    }
}

function drawSliders() {
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        if (mode === 0 && s.label === 'Is') continue;

        let y = s.y;

        noStroke();
        fill(40);
        textSize(12);
        textAlign(RIGHT, CENTER);
        text(s.label + ':', s.x - 8, y);

        // Track background
        stroke(200);
        strokeWeight(3);
        line(s.x, y, s.x + s.w, y);

        // Thumb position
        let t = (s.val - s.min) / (s.max - s.min);
        let tx = s.x + t * s.w;

        // Filled portion
        stroke(COL_BTN);
        strokeWeight(3);
        line(s.x, y, tx, y);

        // Thumb
        fill(COL_BTN);
        noStroke();
        ellipse(tx, y, 14, 14);
        fill(255);
        ellipse(tx, y, 6, 6);

        // Value text
        fill(60);
        noStroke();
        textSize(10);
        textAlign(LEFT, CENTER);
        text(nf(s.val, 1, 1) + ' ' + s.unit, s.x + s.w + 8, y);
    }
}

function drawButton(btn, label, hover) {
    fill(hover ? COL_BTN_HOVER : COL_BTN);
    noStroke();
    rect(btn.x, btn.y, btn.w, btn.h, 6);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

function isOver(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
           mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

let draggingSlider = -1;

function mousePressed() {
    if (isOver(modeBtn)) {
        mode = 1 - mode;
        solveMesh();
        return;
    }
    if (isOver(solveBtn)) {
        solveMesh();
        return;
    }
    for (let i = 0; i < sliders.length; i++) {
        if (mode === 0 && sliders[i].label === 'Is') continue;
        let s = sliders[i];
        let t = (s.val - s.min) / (s.max - s.min);
        let tx = s.x + t * s.w;
        if (dist(mouseX, mouseY, tx, s.y) < 14) {
            draggingSlider = i;
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider >= 0) {
        let s = sliders[draggingSlider];
        let t = constrain((mouseX - s.x) / s.w, 0, 1);
        s.val = round((s.min + t * (s.max - s.min)) * 10) / 10;
        s.val = constrain(s.val, s.min, s.max);

        R1 = sliders[0].val;
        R2 = sliders[1].val;
        R3 = sliders[2].val;
        Vs = sliders[3].val;
        Is = sliders[4].val;

        solveMesh();
    }
}

function mouseReleased() {
    draggingSlider = -1;
}

function windowResized() {
    updateCanvasSize();
    canvasHeight = drawHeight + controlHeight;
    resizeCanvas(containerWidth, canvasHeight);
    initSliders();
}

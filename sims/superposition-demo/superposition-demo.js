// Superposition Theorem Demo MicroSim
//
// Circuit topology:
//   +--[R1]--A--[R2]--+
//   |        |        |
//  Vs       [R3]      Is
//   |        |        |
//   +--------B--------+  (GND)
//
// Views:
//   0 = Original (both sources active)
//   1 = V-source only (Is -> open circuit)
//   2 = I-source only (Vs -> short circuit)
//   3 = Combined (show superposition result)

'use strict';

// Canvas
let drawHeight = 320;
let chartHeight = 160;
let controlHeight = 170;
let canvasHeight;
let containerWidth;

// View mode
let viewMode = 0; // 0=Original, 1=V-only, 2=I-only, 3=Combined

// Circuit parameters
let Vs = 12;     // V
let Is = 2;      // A (displayed as mA for the bar chart context)
let R1 = 2;      // kOhm
let R2 = 4;      // kOhm
let R3 = 3;      // kOhm

// Solved quantities (currents in mA through R1)
let I_v = 0;     // contribution from Vs alone
let I_i = 0;     // contribution from Is alone
let I_total = 0; // superposition result

// Colors
const COL_BG = [248, 250, 252];
const COL_WIRE = [40, 40, 40];
const COL_R = [70, 130, 200];
const COL_VS = [220, 60, 60];
const COL_IS = [40, 160, 80];
const COL_IV = [220, 80, 50];
const COL_II = [40, 140, 200];
const COL_ITOT = [140, 60, 180];
const COL_BTN = [55, 90, 160];
const COL_BTN_HOVER = [75, 110, 180];
const COL_BTN_ACTIVE = [35, 65, 130];
const COL_DEAD = [180, 180, 180];

// Layout
let viewBtns = [];
let sliders = [];
let draggingSlider = -1;

function setup() {
    updateCanvasSize();
    canvasHeight = drawHeight + chartHeight + controlHeight;
    createCanvas(containerWidth, canvasHeight).parent(document.querySelector('main'));
    textFont('Arial');
    initLayout();
    solve();
}

function updateCanvasSize() {
    containerWidth = max(560, floor(
        document.querySelector('main').getBoundingClientRect().width
    ));
}

function initLayout() {
    // View buttons
    let bw = min(130, (containerWidth - 40) / 4);
    let bx = (containerWidth - bw * 4 - 12) / 2;
    let by = 30;
    viewBtns = [
        { x: bx, y: by, w: bw, h: 28, label: 'Original', mode: 0 },
        { x: bx + bw + 4, y: by, w: bw, h: 28, label: 'V-source Only', mode: 1 },
        { x: bx + (bw + 4) * 2, y: by, w: bw, h: 28, label: 'I-source Only', mode: 2 },
        { x: bx + (bw + 4) * 3, y: by, w: bw, h: 28, label: 'Combined', mode: 3 },
    ];

    // Sliders
    let sx = 70;
    let sw = containerWidth - sx - 80;
    let sy = drawHeight + chartHeight + 12;
    let gap = 28;
    sliders = [
        { label: 'Vs', min: 0, max: 20, val: Vs, unit: 'V', x: sx, y: sy, w: sw },
        { label: 'Is', min: 0, max: 5, val: Is, unit: 'A', x: sx, y: sy + gap, w: sw },
        { label: 'R1', min: 0.1, max: 10, val: R1, unit: 'k\u03A9', x: sx, y: sy + gap * 2, w: sw },
        { label: 'R2', min: 0.1, max: 10, val: R2, unit: 'k\u03A9', x: sx, y: sy + gap * 3, w: sw },
        { label: 'R3', min: 0.1, max: 10, val: R3, unit: 'k\u03A9', x: sx, y: sy + gap * 4, w: sw },
    ];
}

function solve() {
    // V-source only (Is replaced with open circuit)
    // Circuit: Vs -> R1 -> R3 in series (R2 branch is open since Is is removed)
    // Wait - if Is is open, then R2 is disconnected (no current path through R2)
    // Current through R1 and R3: I' = Vs / (R1 + R3)
    // Node A voltage: VA = Vs * R3 / (R1 + R3)
    // R2 has no current (open on far end)
    I_v = Vs / (R1 + R3); // mA (since R in kOhm, V in V -> mA)

    // I-source only (Vs replaced with short circuit)
    // Circuit: Short where Vs was (left branch is wire)
    // R1 is connected from top-left to A, left branch is shorted (wire from A-bottom to top-left)
    // Actually: with Vs shorted, left branch is a wire.
    // So R1 connects node A to GND (via the short).
    // R3 connects node A to GND.
    // R2 connects node A to the Is terminal.
    // Is flows upward into node A's right side.
    //
    // At node A: R1 and R3 are both to GND, R2 goes to Is terminal (top-right).
    // Network from Is perspective: Is in series with R2, connected to R1 || R3 to ground.
    //
    // Wait let me reconsider. The topology:
    //   +--[R1]--A--[R2]--+
    //   |        |        |
    //  short    [R3]      Is (up)
    //   |        |        |
    //   +--------B--------+  (GND)
    //
    // With the short on the left: top-left and bottom-left are same node = GND.
    // So R1 goes from GND to A. R3 goes from A to GND. R2 goes from A to top-right.
    // Is goes from GND (bottom-right) to top-right (upward).
    //
    // Let's call the top-right node C.
    // At node C: Is comes in, R2 goes to A.
    // At node A: R1 to GND, R3 to GND, R2 to C.
    //
    // R1||R3 from A to GND = (R1*R3)/(R1+R3)
    // Total from C: R2 + R1||R3
    // Voltage at C: Vc = Is * (R2 + R1*R3/(R1+R3))
    // Voltage at A: Va = Vc * (R1||R3) / (R2 + R1||R3) = Is * R1*R3/(R1+R3)
    //
    // Current through R1 (from A to GND, i.e., rightward then down):
    // I_R1'' = Va / R1 = Is * R3 / (R1 + R3)

    let R13 = (R1 * R3) / (R1 + R3);
    I_i = Is * R3 / (R1 + R3); // mA

    // Total by superposition
    I_total = I_v + I_i;
}

function draw() {
    background(COL_BG);

    // Title
    fill(30);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Superposition Theorem', containerWidth / 2, 8);

    // View buttons
    for (let b of viewBtns) {
        let hover = isOver(b);
        let active = (viewMode === b.mode);
        if (active) {
            fill(COL_BTN_ACTIVE);
        } else if (hover) {
            fill(COL_BTN_HOVER);
        } else {
            fill(COL_BTN);
        }
        noStroke();
        rect(b.x, b.y, b.w, b.h, 5);
        fill(255);
        textSize(11);
        textAlign(CENTER, CENTER);
        text(b.label, b.x + b.w / 2, b.y + b.h / 2);
    }

    // Circuit drawing area
    let cx = containerWidth / 2;
    let cy = 170;
    drawCircuit(cx, cy, containerWidth * 0.65);

    // Separator before chart
    stroke(200);
    strokeWeight(1);
    line(10, drawHeight, containerWidth - 10, drawHeight);

    // Bar chart
    drawBarChart(containerWidth / 2, drawHeight + 10, containerWidth - 60, chartHeight - 20);

    // Separator before sliders
    stroke(200);
    strokeWeight(1);
    line(10, drawHeight + chartHeight, containerWidth - 10, drawHeight + chartHeight);

    // Sliders
    drawSliders();
}

function drawCircuit(cx, cy, w) {
    let hw = w * 0.38;
    let hh = 70;

    let lx = cx - hw;
    let rx = cx + hw;
    let ty = cy - hh;
    let by = cy + hh;
    let mx = cx;

    stroke(COL_WIRE);
    strokeWeight(2.5);
    noFill();

    // Top wires
    line(lx, ty, mx - 28, ty);
    line(mx + 28, ty, rx, ty);

    // Bottom wire
    line(lx, by, rx, by);

    // Middle vertical (R3)
    line(mx, ty, mx, cy - 28);
    line(mx, cy + 28, mx, by);

    // Left vertical
    if (viewMode === 2) {
        // Vs is shorted - draw as wire
        stroke(COL_DEAD);
        strokeWeight(3);
        line(lx, ty, lx, by);
        // Label
        noStroke();
        fill(COL_DEAD);
        textSize(9);
        textAlign(RIGHT, CENTER);
        text('(short)', lx - 6, cy);
        stroke(COL_WIRE);
        strokeWeight(2.5);
    } else {
        line(lx, ty, lx, cy - 16);
        line(lx, cy + 16, lx, by);
    }

    // Right vertical
    if (viewMode === 1) {
        // Is is open - draw gap
        line(rx, ty, rx, cy - 18);
        line(rx, cy + 18, rx, by);
        // Gap marks
        stroke(COL_DEAD);
        strokeWeight(2);
        line(rx - 5, cy - 18, rx + 5, cy - 18);
        line(rx - 5, cy + 18, rx + 5, cy + 18);
        noStroke();
        fill(COL_DEAD);
        textSize(9);
        textAlign(LEFT, CENTER);
        text('(open)', rx + 8, cy);
        stroke(COL_WIRE);
        strokeWeight(2.5);
    } else {
        line(rx, ty, rx, cy - 16);
        line(rx, cy + 16, rx, by);
    }

    // R1
    drawResistor((lx + mx) / 2, ty, 'R1', R1 + 'k\u03A9', true);

    // R2
    drawResistor((mx + rx) / 2, ty, 'R2', R2 + 'k\u03A9', true);

    // R3
    drawResistorV(mx, cy, 'R3', R3 + 'k\u03A9');

    // Vs (left)
    if (viewMode !== 2) {
        drawVoltageSource(lx, cy, Vs + 'V', false);
    }

    // Is (right)
    if (viewMode !== 1) {
        drawCurrentSource(rx, cy, Is + 'A', false);
    }

    // GND symbol
    drawGround((lx + rx) / 2, by);

    // Node labels
    fill(60);
    noStroke();
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('A', mx, ty - 5);

    // Current arrows based on view
    if (viewMode === 0 || viewMode === 3) {
        // Show total current through R1
        drawCurrentArrow((lx + mx) / 2, ty - 22, I_total, 'I = ' + nf(I_total, 1, 2) + ' mA', COL_ITOT);
    } else if (viewMode === 1) {
        drawCurrentArrow((lx + mx) / 2, ty - 22, I_v, "I' = " + nf(I_v, 1, 2) + ' mA', COL_IV);
    } else if (viewMode === 2) {
        drawCurrentArrow((lx + mx) / 2, ty - 22, I_i, "I'' = " + nf(I_i, 1, 2) + ' mA', COL_II);
    }

    // View description
    noStroke();
    fill(80);
    textSize(11);
    textAlign(CENTER, TOP);
    let desc = '';
    if (viewMode === 0) desc = 'Original circuit with both sources active';
    else if (viewMode === 1) desc = 'Current source replaced with OPEN circuit';
    else if (viewMode === 2) desc = 'Voltage source replaced with SHORT circuit';
    else desc = 'Superposition: I = I\' + I\'\'';
    text(desc, cx, by + 20);
}

function drawCurrentArrow(x, y, current, label, col) {
    push();
    translate(x, y);

    let dir = current >= 0 ? 1 : -1;
    let len = 30;

    stroke(col);
    strokeWeight(2.5);
    line(-len * dir, 0, len * dir, 0);

    // Arrowhead
    fill(col);
    noStroke();
    let ax = len * dir;
    triangle(ax, 0, ax - 7 * dir, -4, ax - 7 * dir, 4);

    // Label
    noStroke();
    fill(col);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    text(label, 0, -6);

    pop();
}

function drawResistor(x, y, label, valStr, horiz) {
    push();
    translate(x, y);

    stroke(COL_R);
    strokeWeight(2.5);
    noFill();

    let len = 44;
    let amp = 7;
    let segs = 5;
    let half = len / 2;

    line(-half - 8, 0, -half, 0);
    beginShape();
    vertex(-half, 0);
    for (let i = 0; i < segs; i++) {
        let px1 = map(i + 0.25, 0, segs, -half, half);
        vertex(px1, (i % 2 === 0 ? -amp : amp));
        let px2 = map(i + 0.75, 0, segs, -half, half);
        vertex(px2, (i % 2 === 0 ? amp : -amp));
    }
    vertex(half, 0);
    endShape();
    line(half, 0, half + 8, 0);

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

    let len = 44;
    let amp = 7;
    let segs = 5;
    let half = len / 2;

    line(0, -half - 8, 0, -half);
    beginShape();
    vertex(0, -half);
    for (let i = 0; i < segs; i++) {
        let py1 = map(i + 0.25, 0, segs, -half, half);
        vertex((i % 2 === 0 ? -amp : amp), py1);
        let py2 = map(i + 0.75, 0, segs, -half, half);
        vertex((i % 2 === 0 ? amp : -amp), py2);
    }
    vertex(0, half);
    endShape();
    line(0, half, 0, half + 8);

    noStroke();
    fill(COL_R);
    textSize(11);
    textAlign(LEFT, CENTER);
    text(label, amp + 5, -4);
    textSize(9);
    fill(100);
    text(valStr, amp + 5, 10);

    pop();
}

function drawVoltageSource(x, y, valStr, dead) {
    push();
    translate(x, y);

    stroke(dead ? COL_DEAD : COL_VS);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, 26, 26);

    textSize(13);
    fill(dead ? COL_DEAD : COL_VS);
    noStroke();
    textAlign(CENTER, CENTER);
    text('+', 0, -8);
    text('\u2013', 0, 7);

    textSize(10);
    textAlign(RIGHT, CENTER);
    text('Vs', -18, -9);
    textSize(9);
    fill(100);
    text(valStr, -18, 5);

    pop();
}

function drawCurrentSource(x, y, valStr, dead) {
    push();
    translate(x, y);

    stroke(dead ? COL_DEAD : COL_IS);
    strokeWeight(2);
    noFill();
    ellipse(0, 0, 26, 26);

    stroke(dead ? COL_DEAD : COL_IS);
    strokeWeight(2);
    line(0, 7, 0, -7);
    line(0, -7, -3.5, -1.5);
    line(0, -7, 3.5, -1.5);

    noStroke();
    fill(dead ? COL_DEAD : COL_IS);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Is', 18, -9);
    textSize(9);
    fill(100);
    text(valStr, 18, 5);

    pop();
}

function drawGround(x, y) {
    stroke(COL_WIRE);
    strokeWeight(2);
    let w1 = 16, w2 = 10, w3 = 4;
    line(x - w1, y, x + w1, y);
    line(x - w2, y + 5, x + w2, y + 5);
    line(x - w3, y + 10, x + w3, y + 10);
}

function drawBarChart(cx, topY, totalW, totalH) {
    let barW = min(60, totalW / 6);
    let gap = barW * 0.6;
    let groupW = barW * 3 + gap * 2;
    let startX = cx - groupW / 2;
    let baseY = topY + totalH - 25;

    // Title
    fill(40);
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    text('Current through R1 by Superposition', cx, topY);

    // Axis
    stroke(150);
    strokeWeight(1);
    line(startX - 10, baseY, startX + groupW + 10, baseY);

    // Scale
    let maxVal = max(abs(I_v), abs(I_i), abs(I_total), 0.5);
    let scale = (totalH - 50) / maxVal;

    // Bars
    let bars = [
        { val: I_v, label: "I'", sub: '(Vs only)', col: COL_IV },
        { val: I_i, label: "I''", sub: '(Is only)', col: COL_II },
        { val: I_total, label: 'I total', sub: "I'+I''", col: COL_ITOT },
    ];

    for (let i = 0; i < bars.length; i++) {
        let b = bars[i];
        let bx = startX + i * (barW + gap);
        let bh = b.val * scale;

        // Bar
        fill(b.col);
        noStroke();
        if (bh >= 0) {
            rect(bx, baseY - bh, barW, bh, 3, 3, 0, 0);
        } else {
            rect(bx, baseY, barW, -bh, 0, 0, 3, 3);
        }

        // Value on bar
        fill(40);
        textSize(11);
        textAlign(CENTER, BOTTOM);
        let vy = bh >= 0 ? baseY - bh - 3 : baseY - bh + 14;
        text(nf(b.val, 1, 2) + ' mA', bx + barW / 2, vy);

        // Label below
        fill(60);
        textSize(10);
        textAlign(CENTER, TOP);
        text(b.label, bx + barW / 2, baseY + 3);
        fill(120);
        textSize(8);
        text(b.sub, bx + barW / 2, baseY + 15);
    }

    // Plus and equals signs
    fill(80);
    textSize(18);
    textAlign(CENTER, CENTER);
    text('+', startX + barW + gap / 2, baseY - totalH / 3);
    text('=', startX + barW * 2 + gap * 1.5, baseY - totalH / 3);
}

function drawSliders() {
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        let y = s.y;

        noStroke();
        fill(40);
        textSize(12);
        textAlign(RIGHT, CENTER);
        text(s.label + ':', s.x - 8, y);

        stroke(180);
        strokeWeight(2);
        line(s.x, y, s.x + s.w, y);

        let t = (s.val - s.min) / (s.max - s.min);
        let tx = s.x + t * s.w;

        stroke(COL_BTN);
        strokeWeight(3);
        line(s.x, y, tx, y);

        fill(COL_BTN);
        noStroke();
        ellipse(tx, y, 14, 14);

        fill(80);
        textSize(10);
        textAlign(LEFT, CENTER);
        text(nf(s.val, 1, 1) + ' ' + s.unit, s.x + s.w + 6, y);
    }
}

function isOver(btn) {
    return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
           mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mousePressed() {
    // View buttons
    for (let b of viewBtns) {
        if (isOver(b)) {
            viewMode = b.mode;
            return;
        }
    }

    // Sliders
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        let t = (s.val - s.min) / (s.max - s.min);
        let tx = s.x + t * s.w;
        if (dist(mouseX, mouseY, tx, s.y) < 12) {
            draggingSlider = i;
            return;
        }
    }
}

function mouseDragged() {
    if (draggingSlider >= 0) {
        let s = sliders[draggingSlider];
        let t = constrain((mouseX - s.x) / s.w, 0, 1);
        let step = 0.1;
        s.val = round((s.min + t * (s.max - s.min)) / step) * step;
        s.val = constrain(s.val, s.min, s.max);

        Vs = sliders[0].val;
        Is = sliders[1].val;
        R1 = sliders[2].val;
        R2 = sliders[3].val;
        R3 = sliders[4].val;

        solve();
    }
}

function mouseReleased() {
    draggingSlider = -1;
}

function windowResized() {
    updateCanvasSize();
    canvasHeight = drawHeight + chartHeight + controlHeight;
    resizeCanvas(containerWidth, canvasHeight);
    initLayout();
}

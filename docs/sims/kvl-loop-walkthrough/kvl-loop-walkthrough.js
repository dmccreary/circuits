// KVL Loop Walkthrough MicroSim
// Steps through a simple series circuit (battery + 3 resistors)
// demonstrating Kirchhoff's Voltage Law: sum of voltages around a loop = 0.

'use strict';

// ── Canvas ───────────────────────────────────────────────────────────────────
let canvasWidth;
const canvasHeight = 520;

// ── Colors ───────────────────────────────────────────────────────────────────
const BG_COLOR       = '#f8f9fa';
const WIRE_COLOR     = '#555';
const WIRE_HL_COLOR  = '#e67e22';
const NODE_COLOR     = '#2c3e50';
const TEXT_COLOR     = '#2c3e50';
const BATT_COLOR     = '#27ae60';
const RES_COLOR      = '#3498db';
const HL_GLOW        = '#f39c12';
const POS_COLOR      = '#27ae60';
const NEG_COLOR      = '#e74c3c';
const PANEL_BG       = '#eef2f7';
const BTN_COLOR      = '#3498db';
const BTN_HOVER      = '#2980b9';
const BTN_DISABLED   = '#bdc3c8';
const CHECK_COLOR    = '#27ae60';

// ── Circuit layout ───────────────────────────────────────────────────────────
// Rectangular loop: top-left, top-right, bottom-right, bottom-left
let loopLeft, loopRight, loopTop, loopBot;
const LOOP_MARGIN_X = 100;
const LOOP_MARGIN_TOP = 90;
const LOOP_W = 340;
const LOOP_H = 200;

// ── Circuit elements ─────────────────────────────────────────────────────────
// Elements placed along the loop, each with position and info
// Convention: walking clockwise from top-left
// Battery on left side (bottom to top), R1 on top, R2 on right, R3 on bottom
const V_SOURCE = 12;   // Volts
const R1 = 2;          // Ohms
const R2 = 3;          // Ohms
const R3 = 1;          // Ohms
const I_LOOP = V_SOURCE / (R1 + R2 + R3);  // 2A

// Steps: Start, Battery, R1, R2, R3 (back to start)
let steps = [];
let currentStep = 0;
let runningSum = 0;

// ── Buttons ──────────────────────────────────────────────────────────────────
let nextBtn, resetBtn;
const BTN_W = 130;
const BTN_H = 36;
const BTN_R = 8;

// ── Animation ────────────────────────────────────────────────────────────────
let arrowPhase = 0;

function setup() {
    canvasWidth = min(windowWidth, 700);
    let cnv = createCanvas(canvasWidth, canvasHeight);
    cnv.parent('main');
    textFont('Arial');

    computeLayout();
    buildSteps();

    // Buttons positioned in bottom area
    let btnY = canvasHeight - 52;
    let btnGap = 20;
    let totalBtnW = BTN_W * 2 + btnGap;
    let btnStartX = canvasWidth / 2 - totalBtnW / 2;
    nextBtn  = { x: btnStartX, y: btnY, w: BTN_W, h: BTN_H, label: 'Next Element', enabled: true };
    resetBtn = { x: btnStartX + BTN_W + btnGap, y: btnY, w: BTN_W, h: BTN_H, label: 'Reset', enabled: false };
}

function computeLayout() {
    let cx = canvasWidth / 2;
    loopLeft  = cx - LOOP_W / 2;
    loopRight = cx + LOOP_W / 2;
    loopTop   = LOOP_MARGIN_TOP;
    loopBot   = LOOP_MARGIN_TOP + LOOP_H;
}

function buildSteps() {
    let vR1 = -(I_LOOP * R1);
    let vR2 = -(I_LOOP * R2);
    let vR3 = -(I_LOOP * R3);

    steps = [
        { name: 'Start',       element: 'start',   voltage: 0,        sumAfter: 0,            desc: 'Begin walking clockwise from top-left corner' },
        { name: 'Battery (V)', element: 'battery',  voltage: V_SOURCE, sumAfter: V_SOURCE,     desc: 'Voltage source adds +' + V_SOURCE + 'V (rise)' },
        { name: 'R\u2081 (' + R1 + '\u03A9)',  element: 'r1', voltage: vR1, sumAfter: V_SOURCE + vR1, desc: 'Voltage drop: I\u00B7R\u2081 = ' + nf(I_LOOP, 1, 0) + '\u00B7' + R1 + ' = ' + nf(abs(vR1), 1, 0) + 'V' },
        { name: 'R\u2082 (' + R2 + '\u03A9)',  element: 'r2', voltage: vR2, sumAfter: V_SOURCE + vR1 + vR2, desc: 'Voltage drop: I\u00B7R\u2082 = ' + nf(I_LOOP, 1, 0) + '\u00B7' + R2 + ' = ' + nf(abs(vR2), 1, 0) + 'V' },
        { name: 'R\u2083 (' + R3 + '\u03A9)',  element: 'r3', voltage: vR3, sumAfter: 0,       desc: 'Voltage drop: I\u00B7R\u2083 = ' + nf(I_LOOP, 1, 0) + '\u00B7' + R3 + ' = ' + nf(abs(vR3), 1, 0) + 'V' }
    ];

    currentStep = 0;
    runningSum = 0;
}

function draw() {
    background(BG_COLOR);
    arrowPhase += 0.03;

    // Title
    fill(TEXT_COLOR);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text("Kirchhoff's Voltage Law (KVL)", canvasWidth / 2, 12);
    textStyle(NORMAL);
    textSize(13);
    fill('#666');
    text('Sum of voltages around any closed loop equals zero', canvasWidth / 2, 36);

    // Draw circuit
    drawCircuit();

    // Draw current direction arrows on wires
    drawCurrentArrows();

    // Draw info panel
    drawInfoPanel();

    // Draw buttons
    drawButton(nextBtn);
    drawButton(resetBtn);

    // Current label
    fill(TEXT_COLOR);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(ITALIC);
    text('I = ' + nf(I_LOOP, 1, 0) + 'A (clockwise)', canvasWidth / 2, loopTop + LOOP_H / 2);
    textStyle(NORMAL);
}

function drawCircuit() {
    let activeElement = currentStep > 0 ? steps[currentStep].element : null;

    // ── Wires ────────────────────────────────────────────────────────────────
    // Draw the four sides of the loop
    strokeWeight(3);
    strokeCap(ROUND);

    // Left side (battery) - bottom-left to top-left
    stroke(activeElement === 'battery' ? WIRE_HL_COLOR : WIRE_COLOR);
    if (activeElement === 'battery') strokeWeight(4);
    else strokeWeight(3);
    line(loopLeft, loopBot, loopLeft, loopBot - 40);
    line(loopLeft, loopTop + 40, loopLeft, loopTop);

    // Top side (R1) - top-left to top-right
    stroke(activeElement === 'r1' ? WIRE_HL_COLOR : WIRE_COLOR);
    if (activeElement === 'r1') strokeWeight(4);
    else strokeWeight(3);
    line(loopLeft, loopTop, loopLeft + 90, loopTop);
    line(loopRight - 90, loopTop, loopRight, loopTop);

    // Right side (R2) - top-right to bottom-right
    stroke(activeElement === 'r2' ? WIRE_HL_COLOR : WIRE_COLOR);
    if (activeElement === 'r2') strokeWeight(4);
    else strokeWeight(3);
    line(loopRight, loopTop, loopRight, loopTop + 50);
    line(loopRight, loopBot - 50, loopRight, loopBot);

    // Bottom side (R3) - bottom-right to bottom-left
    stroke(activeElement === 'r3' ? WIRE_HL_COLOR : WIRE_COLOR);
    if (activeElement === 'r3') strokeWeight(4);
    else strokeWeight(3);
    line(loopRight, loopBot, loopRight - 90, loopBot);
    line(loopLeft + 90, loopBot, loopLeft, loopBot);

    // ── Corner nodes ─────────────────────────────────────────────────────────
    let corners = [
        [loopLeft, loopTop], [loopRight, loopTop],
        [loopRight, loopBot], [loopLeft, loopBot]
    ];
    for (let c of corners) {
        fill(NODE_COLOR);
        noStroke();
        ellipse(c[0], c[1], 8, 8);
    }

    // Start marker (top-left)
    if (currentStep === 0 || activeElement === 'start') {
        let pulse = map(sin(millis() * 0.004), -1, 1, 8, 16);
        noFill();
        stroke(HL_GLOW);
        strokeWeight(2);
        ellipse(loopLeft, loopTop, pulse * 2, pulse * 2);
    }

    // ── Components ───────────────────────────────────────────────────────────
    drawBattery(loopLeft, loopBot - 40, loopLeft, loopTop + 40, activeElement === 'battery');
    drawResistor(loopLeft + 90, loopTop, loopRight - 90, loopTop, 'R\u2081', R1, activeElement === 'r1');
    drawResistor(loopRight, loopTop + 50, loopRight, loopBot - 50, 'R\u2082', R2, activeElement === 'r2');
    drawResistor(loopRight - 90, loopBot, loopLeft + 90, loopBot, 'R\u2083', R3, activeElement === 'r3');

    // ── Voltage annotations for visited elements ─────────────────────────────
    for (let i = 1; i <= currentStep && i < steps.length; i++) {
        drawVoltageAnnotation(steps[i]);
    }
}

function drawBattery(x1, y1, x2, y2, highlight) {
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;

    // Glow if highlighted
    if (highlight) {
        noFill();
        stroke(HL_GLOW);
        strokeWeight(8);
        stroke(255, 200, 50, 80);
        line(mx - 14, my - 8, mx + 14, my - 8);
        line(mx - 8, my + 8, mx + 8, my + 8);
    }

    // Battery symbol: long thin line (+) and short thick line (-)
    stroke(BATT_COLOR);
    strokeWeight(2);
    // Positive plate (top, longer)
    line(mx - 14, my - 8, mx + 14, my - 8);
    // Negative plate (bottom, shorter, thicker)
    strokeWeight(4);
    line(mx - 8, my + 8, mx + 8, my + 8);

    // + and - labels
    noStroke();
    fill(BATT_COLOR);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('+', mx - 26, my - 8);
    text('\u2013', mx - 26, my + 8);

    // Label
    text(V_SOURCE + 'V', mx + 30, my);
    textStyle(NORMAL);
}

function drawResistor(x1, y1, x2, y2, label, ohms, highlight) {
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;
    let isHorizontal = abs(y2 - y1) < 5;

    // Glow if highlighted
    if (highlight) {
        noFill();
        stroke(255, 200, 50, 80);
        strokeWeight(30);
        if (isHorizontal) {
            line(x1, y1, x2, y2);
        } else {
            line(x1, y1, x2, y2);
        }
    }

    // Resistor box
    fill(255);
    stroke(RES_COLOR);
    strokeWeight(2);
    if (isHorizontal) {
        rectMode(CENTER);
        rect(mx, my, abs(x2 - x1), 24, 4);
    } else {
        rectMode(CENTER);
        rect(mx, my, 24, abs(y2 - y1), 4);
    }
    rectMode(CORNER);

    // Zigzag inside (simplified)
    stroke(RES_COLOR);
    strokeWeight(1.5);
    if (isHorizontal) {
        let w = abs(x2 - x1) - 10;
        let sx = mx - w / 2;
        let segs = 6;
        let segW = w / segs;
        for (let s = 0; s < segs; s++) {
            let lx = sx + s * segW;
            let dir = s % 2 === 0 ? -6 : 6;
            line(lx, my, lx + segW / 2, my + dir);
            line(lx + segW / 2, my + dir, lx + segW, my);
        }
    } else {
        let h = abs(y2 - y1) - 10;
        let sy = min(y1, y2) + 5;
        let segs = 6;
        let segH = h / segs;
        for (let s = 0; s < segs; s++) {
            let ly = sy + s * segH;
            let dir = s % 2 === 0 ? -6 : 6;
            line(mx, ly, mx + dir, ly + segH / 2);
            line(mx + dir, ly + segH / 2, mx, ly + segH);
        }
    }

    // Label
    noStroke();
    fill(TEXT_COLOR);
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    if (isHorizontal) {
        text(label + '=' + ohms + '\u03A9', mx, my - 22);
    } else {
        text(label + '=' + ohms + '\u03A9', mx + 30, my);
    }
    textStyle(NORMAL);
}

function drawVoltageAnnotation(step) {
    let v = step.voltage;
    let sign = v >= 0 ? '+' : '';
    let col = v >= 0 ? POS_COLOR : NEG_COLOR;
    let txt = sign + nf(v, 1, 0) + 'V';

    let ax, ay;
    switch (step.element) {
        case 'battery':
            ax = loopLeft - 48;
            ay = (loopTop + loopBot) / 2;
            break;
        case 'r1':
            ax = (loopLeft + loopRight) / 2;
            ay = loopTop - 28;
            break;
        case 'r2':
            ax = loopRight + 40;
            ay = (loopTop + loopBot) / 2;
            break;
        case 'r3':
            ax = (loopLeft + loopRight) / 2;
            ay = loopBot + 26;
            break;
        default: return;
    }

    // Background pill
    textSize(13);
    textStyle(BOLD);
    let tw = textWidth(txt) + 16;
    fill(255, 240);
    stroke(col);
    strokeWeight(1.5);
    rectMode(CENTER);
    rect(ax, ay, tw, 22, 11);
    rectMode(CORNER);

    // Text
    noStroke();
    fill(col);
    textAlign(CENTER, CENTER);
    text(txt, ax, ay);
    textStyle(NORMAL);
}

function drawCurrentArrows() {
    // Small arrows showing clockwise current direction
    let offset = (arrowPhase % 1);
    stroke(WIRE_COLOR);
    fill(WIRE_COLOR);

    // Top side: left to right
    let topMid = loopLeft + (loopRight - loopLeft) * 0.2;
    drawSmallArrow(topMid, loopTop - 12, 0);

    // Right side: top to bottom
    drawSmallArrow(loopRight + 12, loopTop + LOOP_H * 0.3, HALF_PI);

    // Bottom side: right to left
    let botMid = loopRight - (loopRight - loopLeft) * 0.2;
    drawSmallArrow(botMid, loopBot + 12, PI);

    // Left side: bottom to top
    drawSmallArrow(loopLeft - 12, loopBot - LOOP_H * 0.3, -HALF_PI);
}

function drawSmallArrow(x, y, angle) {
    push();
    translate(x, y);
    rotate(angle);
    noStroke();
    fill(WIRE_COLOR);
    triangle(6, 0, -4, -4, -4, 4);
    pop();
}

function drawInfoPanel() {
    let panelY = loopBot + 50;
    let panelH = 90;

    // Panel background
    fill(PANEL_BG);
    noStroke();
    rect(20, panelY, canvasWidth - 40, panelH, 10);

    let step = steps[currentStep];

    // Step indicator
    fill(TEXT_COLOR);
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text('Step ' + currentStep + ' of ' + (steps.length - 1) + ':  ' + step.name, 36, panelY + 10);
    textStyle(NORMAL);

    // Description
    fill('#555');
    textSize(12);
    text(step.desc, 36, panelY + 30);

    // Running sum
    let sumColor = TEXT_COLOR;
    let isComplete = currentStep === steps.length - 1;
    if (isComplete) sumColor = CHECK_COLOR;

    textSize(15);
    textStyle(BOLD);
    fill(sumColor);
    textAlign(LEFT, TOP);

    let sumText = '\u03A3V = ' + nf(step.sumAfter, 1, 0) + 'V';
    if (isComplete) {
        sumText += '   KVL Satisfied \u2713';
    }
    text(sumText, 36, panelY + 54);
    textStyle(NORMAL);

    // Step voltage boxes at the right
    let boxX = canvasWidth - 200;
    textAlign(LEFT, TOP);
    textSize(11);
    fill('#888');
    text('Voltage walk:', boxX, panelY + 8);

    let walkY = panelY + 24;
    for (let i = 0; i <= currentStep && i < steps.length; i++) {
        let v = steps[i].voltage;
        if (i === 0) continue;
        let sign = v >= 0 ? '+' : '';
        let col = v >= 0 ? POS_COLOR : NEG_COLOR;
        fill(col);
        textSize(11);
        textStyle(BOLD);
        text(sign + nf(v, 1, 0) + 'V', boxX + (i - 1) * 40, walkY);
        if (i < currentStep) {
            fill('#888');
            textStyle(NORMAL);
            text('\u2192', boxX + (i - 1) * 40 + 30, walkY);
        }
    }
    textStyle(NORMAL);
}

function drawButton(btn) {
    let hovering = isInsideBtn(btn, mouseX, mouseY);
    let c;
    if (!btn.enabled) {
        c = color(BTN_DISABLED);
    } else if (hovering) {
        c = color(BTN_HOVER);
    } else {
        c = color(BTN_COLOR);
    }

    // Shadow
    noStroke();
    fill(0, 20);
    rect(btn.x + 2, btn.y + 2, btn.w, btn.h, BTN_R);

    // Button
    fill(c);
    rect(btn.x, btn.y, btn.w, btn.h, BTN_R);

    // Label
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    textStyle(NORMAL);

    // Cursor hint
    if (hovering && btn.enabled) {
        cursor(HAND);
    }
}

function isInsideBtn(btn, mx, my) {
    return mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h;
}

function mousePressed() {
    // Next button
    if (nextBtn.enabled && isInsideBtn(nextBtn, mouseX, mouseY)) {
        if (currentStep < steps.length - 1) {
            currentStep++;
            if (currentStep >= steps.length - 1) {
                nextBtn.enabled = false;
            }
            resetBtn.enabled = true;
        }
    }

    // Reset button
    if (resetBtn.enabled && isInsideBtn(resetBtn, mouseX, mouseY)) {
        currentStep = 0;
        nextBtn.enabled = true;
        resetBtn.enabled = false;
    }
}

function mouseMoved() {
    let overAny = false;
    if (nextBtn.enabled && isInsideBtn(nextBtn, mouseX, mouseY)) overAny = true;
    if (resetBtn.enabled && isInsideBtn(resetBtn, mouseX, mouseY)) overAny = true;
    if (overAny) cursor(HAND);
    else cursor(ARROW);
}

function windowResized() {
    canvasWidth = min(windowWidth, 700);
    resizeCanvas(canvasWidth, canvasHeight);
    computeLayout();

    // Reposition buttons
    let btnY = canvasHeight - 52;
    let btnGap = 20;
    let totalBtnW = BTN_W * 2 + btnGap;
    let btnStartX = canvasWidth / 2 - totalBtnW / 2;
    nextBtn.x = btnStartX;
    nextBtn.y = btnY;
    resetBtn.x = btnStartX + BTN_W + btnGap;
    resetBtn.y = btnY;
}

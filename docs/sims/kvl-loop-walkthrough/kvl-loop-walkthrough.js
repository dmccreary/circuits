// KVL Loop Walkthrough MicroSim — Chapter 3 (Redesign)
// Guided step-by-step KVL demonstration with live equation building
'use strict';

// ── Canvas ────────────────────────────────────────────────────────────────────
let canvasW;
const canvasH = 622;

// ── Circuits 1 palette ────────────────────────────────────────────────────────
const C_BG    = '#eef1fb';
const C_DEEP  = [26,  35, 126];
const C_IND   = [57,  73, 171];
const C_ACC   = [92, 107, 192];
const C_GREEN = [27, 153,  80];
const C_RED   = [211,  47,  47];
const C_AMBER = [255, 160,  20];
const C_WIRE  = [55,  62,  80];
const C_NODE  = [26,  35, 126];

// ── Circuit parameters ────────────────────────────────────────────────────────
const V_SRC  = 12;
const R1V = 2, R2V = 3, R3V = 1;
const I_LOOP = V_SRC / (R1V + R2V + R3V);   // 2 A

// ── Loop geometry (set in computeLayout) ─────────────────────────────────────
let loopLeft, loopRight, loopTop, loopBot, cx;
let midY;           // vertical midpoint of loop
let r1x1, r1x2;    // R1 box x-extents (horizontal)
let r2y1, r2y2;    // R2 box y-extents (vertical)
let r3x1, r3x2;    // R3 box x-extents (horizontal, x1 > x2 = traversal goes left)

const LOOP_H     = 256;
const LOOP_TOP_Y = 68;

// ── Canvas layout regions ─────────────────────────────────────────────────────
const PANEL_Y  = 374;
const PANEL_H  = 112;
const EQ_Y     = PANEL_Y + PANEL_H + 10;
const EQ_H     = 60;
const BTN_Y    = EQ_Y + EQ_H + 10;
const BTN_H    = 36;

// ── Steps ─────────────────────────────────────────────────────────────────────
let steps = [];
let currentStep = 0;

// ── Auto-play ─────────────────────────────────────────────────────────────────
let isAutoPlay   = false;
let autoLastTime = 0;
const AUTO_MS    = 2200;

// ── Buttons ───────────────────────────────────────────────────────────────────
let btnPrev, btnNext, btnReset, btnAuto;

// ── Setup ─────────────────────────────────────────────────────────────────────
function setup() {
    canvasW = min(floor(document.querySelector('main').getBoundingClientRect().width), 700);
    canvasW = max(canvasW, 480);
    createCanvas(canvasW, canvasH).parent(document.querySelector('main'));
    textFont('Arial');
    computeLayout();
    buildSteps();
}

function computeLayout() {
    cx     = canvasW / 2;
    const loopW = min(canvasW - 150, 430);
    loopLeft  = cx - loopW / 2;
    loopRight = cx + loopW / 2;
    loopTop   = LOOP_TOP_Y;
    loopBot   = LOOP_TOP_Y + LOOP_H;
    midY      = (loopTop + loopBot) / 2;

    // Component extents
    const rHalf = min(loopW * 0.17, 72);  // half-width of horizontal resistor boxes
    r1x1 = cx - rHalf;  r1x2 = cx + rHalf;
    r3x1 = cx + rHalf;  r3x2 = cx - rHalf;   // reversed: traversal goes right→left
    const rVhalf = 48;                         // half-height of vertical resistor (R2)
    r2y1 = midY - rVhalf;  r2y2 = midY + rVhalf;

    buildButtons();
}

function buildButtons() {
    const gap = 10;
    const bw  = [96, 96, 90, 88];
    const total = bw.reduce((a, b) => a + b, 0) + gap * (bw.length - 1);
    let bx = cx - total / 2;
    btnPrev  = { x: bx,                          y: BTN_Y, w: bw[0], h: BTN_H };
    btnNext  = { x: bx + bw[0] + gap,            y: BTN_Y, w: bw[1], h: BTN_H };
    btnReset = { x: bx + bw[0] + bw[1] + gap*2,  y: BTN_Y, w: bw[2], h: BTN_H };
    btnAuto  = { x: bx + bw[0]+bw[1]+bw[2]+gap*3, y: BTN_Y, w: bw[3], h: BTN_H };
}

function buildSteps() {
    const vR1 = -(I_LOOP * R1V);
    const vR2 = -(I_LOOP * R2V);
    const vR3 = -(I_LOOP * R3V);
    steps = [
        {
            element: 'start',  voltage: 0,    sumAfter: 0,
            type: 'start',     title: 'Start — Corner A',
            dir:    'Bottom-left corner (− terminal of battery)',
            detail: 'Walk clockwise. Track every voltage rise (+) and drop (−).',
            rule:   'KVL: the algebraic sum of all voltages around a closed loop = 0'
        },
        {
            element: 'battery', voltage: V_SRC, sumAfter: V_SRC,
            type: 'rise',       title: 'Voltage Source  (' + V_SRC + 'V)',
            dir:    'Left side  ↑  (bottom → top, with current)',
            detail: 'Enter − terminal, exit + terminal  →  voltage RISE:  +' + V_SRC + 'V',
            rule:   'Rule: crossing source − to +  →  add the source voltage'
        },
        {
            element: 'r1',     voltage: vR1,  sumAfter: V_SRC + vR1,
            type: 'drop',      title: 'Resistor R₁  (' + R1V + 'Ω)',
            dir:    'Top side  →  (left to right, with current)',
            detail: 'Cross R₁ in current direction  →  voltage DROP:  −' + abs(vR1) + 'V',
            rule:   'Rule: I · R₁ = ' + I_LOOP + ' × ' + R1V + ' = ' + abs(vR1) + 'V  →  subtract'
        },
        {
            element: 'r2',     voltage: vR2,  sumAfter: V_SRC + vR1 + vR2,
            type: 'drop',      title: 'Resistor R₂  (' + R2V + 'Ω)',
            dir:    'Right side  ↓  (top to bottom, with current)',
            detail: 'Cross R₂ in current direction  →  voltage DROP:  −' + abs(vR2) + 'V',
            rule:   'Rule: I · R₂ = ' + I_LOOP + ' × ' + R2V + ' = ' + abs(vR2) + 'V  →  subtract'
        },
        {
            element: 'r3',     voltage: vR3,  sumAfter: 0,
            type: 'drop',      title: 'Resistor R₃  (' + R3V + 'Ω)',
            dir:    'Bottom side  ←  (right to left, with current)',
            detail: 'Cross R₃ in current direction  →  voltage DROP:  −' + abs(vR3) + 'V',
            rule:   'Sum = +' + V_SRC + ' − ' + abs(vR1) + ' − ' + abs(vR2) + ' − ' + abs(vR3) + ' = 0  ✓  KVL Verified!'
        }
    ];
    currentStep = 0;
}

// ── Draw loop ─────────────────────────────────────────────────────────────────
function draw() {
    background(C_BG);

    // Auto-play advance
    if (isAutoPlay && millis() - autoLastTime > AUTO_MS) {
        autoLastTime = millis();
        if (currentStep < steps.length - 1) { currentStep++; }
        else { isAutoPlay = false; }
    }

    drawTitle();
    drawCircuit();
    drawStepPanel();
    drawEquation();
    drawAllButtons();
}

// ── Title ─────────────────────────────────────────────────────────────────────
function drawTitle() {
    noStroke();
    fill(...C_DEEP);
    textAlign(CENTER, TOP); textSize(16); textStyle(BOLD);
    text("Kirchhoff's Voltage Law (KVL) — Loop Walkthrough", cx, 10);
    textStyle(NORMAL);
    fill(...C_ACC);
    textSize(11);
    text('Walk clockwise  ·  + for voltage rises  ·  − for drops  ·  ΣV = 0', cx, 32);
}

// ── Circuit ───────────────────────────────────────────────────────────────────
function drawCircuit() {
    const ae = currentStep > 0 ? steps[currentStep].element : null;

    // Amber glow behind active wire
    if (ae && ae !== 'start') drawWireGlow(ae);

    // Wires (draw before components so components sit on top)
    drawSideWires('battery', ae === 'battery');
    drawSideWires('r1',      ae === 'r1');
    drawSideWires('r2',      ae === 'r2');
    drawSideWires('r3',      ae === 'r3');

    // Components
    drawBattery(ae === 'battery');
    drawResBox(r1x1, loopTop, r1x2, loopTop, 'R₁', R1V, ae === 'r1');
    drawResBox(loopRight, r2y1, loopRight, r2y2, 'R₂', R2V, ae === 'r2');
    drawResBox(r3x1, loopBot, r3x2, loopBot, 'R₃', R3V, ae === 'r3');

    // Corner nodes
    noStroke();
    for (const c of [[loopLeft,loopTop],[loopRight,loopTop],[loopRight,loopBot],[loopLeft,loopBot]]) {
        fill(...C_NODE); ellipse(c[0], c[1], 10, 10);
    }

    // Pulsing start marker at bottom-left (− terminal)
    const pulse = map(sin(millis() * 0.004), -1, 1, 10, 18);
    noFill(); stroke(...C_AMBER); strokeWeight(2);
    ellipse(loopLeft, loopBot, pulse, pulse);
    noStroke(); fill(...C_DEEP);
    textAlign(LEFT, TOP); textSize(10); textStyle(BOLD);
    text('A', loopLeft + 8, loopBot + 7);
    textStyle(NORMAL);

    // Static clockwise direction arrows
    drawDirectionArrows();

    // Loop current label
    noStroke(); fill(...C_ACC);
    textAlign(CENTER, CENTER); textSize(12); textStyle(ITALIC);
    text('I = ' + I_LOOP + ' A  (clockwise)', cx, midY);
    textStyle(NORMAL);

    // Voltage annotations for visited elements
    for (let i = 1; i <= currentStep && i < steps.length; i++) {
        drawVAnnotation(steps[i]);
    }

    // Animated traversal dot on active segment
    if (ae && ae !== 'start') drawTraversalDot(ae);
}

// Endpoints of each element's traversal path (start → end of walk direction)
function segOf(el) {
    switch (el) {
        case 'battery': return [loopLeft, loopBot,  loopLeft, loopTop  ];
        case 'r1':      return [loopLeft, loopTop,  loopRight, loopTop ];
        case 'r2':      return [loopRight, loopTop, loopRight, loopBot ];
        case 'r3':      return [loopRight, loopBot, loopLeft,  loopBot ];
        default: return null;
    }
}

function drawSideWires(el, active) {
    const wCol = active ? color(...C_IND) : color(...C_WIRE);
    const wW   = active ? 4.5 : 3;
    stroke(wCol); strokeWeight(wW); strokeCap(ROUND);

    if (el === 'battery') {
        line(loopLeft, loopTop,  loopLeft, midY - 26);
        line(loopLeft, midY + 26, loopLeft, loopBot);
    } else if (el === 'r1') {
        line(loopLeft,  loopTop, r1x1, loopTop);
        line(r1x2, loopTop, loopRight, loopTop);
    } else if (el === 'r2') {
        line(loopRight, loopTop, loopRight, r2y1);
        line(loopRight, r2y2,    loopRight, loopBot);
    } else if (el === 'r3') {
        line(loopRight, loopBot, r3x1, loopBot);
        line(r3x2, loopBot, loopLeft, loopBot);
    }
}

function drawWireGlow(el) {
    const s = segOf(el); if (!s) return;
    stroke(255, 200, 50, 45); strokeWeight(22); strokeCap(ROUND);
    line(s[0], s[1], s[2], s[3]);
    stroke(255, 160, 20, 100); strokeWeight(10); strokeCap(ROUND);
    line(s[0], s[1], s[2], s[3]);
}

function drawTraversalDot(el) {
    const s = segOf(el); if (!s) return;
    const t  = (millis() * 0.0007) % 1;
    const px = lerp(s[0], s[2], t);
    const py = lerp(s[1], s[3], t);
    noStroke(); fill(...C_AMBER, 130); ellipse(px, py, 18, 18);
    fill(...C_AMBER);                  ellipse(px, py, 9,  9);
}

function drawBattery(highlighted) {
    const x = loopLeft;
    const pyP = midY - 14;   // + plate y
    const pyM = midY + 14;   // − plate y

    if (highlighted) {
        noFill(); stroke(...C_AMBER, 70); strokeWeight(24);
        line(x, pyP - 6, x, pyM + 6);
    }

    stroke(...C_GREEN); strokeWeight(3);
    line(x - 15, pyP, x + 15, pyP);   // long plate = +
    strokeWeight(5);
    line(x - 10, pyM, x + 10, pyM);   // short plate = −

    noStroke(); fill(...C_GREEN);
    textAlign(RIGHT, CENTER); textSize(14); textStyle(BOLD);
    text('+', x - 21, pyP);
    text('\u2212', x - 21, pyM);
    textAlign(LEFT, CENTER); textSize(12);
    text(V_SRC + 'V', x + 20, midY);
    textStyle(NORMAL);
}

function drawResBox(x1, y1, x2, y2, label, ohms, highlighted) {
    const mx   = (x1 + x2) / 2;
    const my   = (y1 + y2) / 2;
    const isH  = abs(y2 - y1) < 5;
    const bw   = isH ? abs(x2 - x1) : 30;
    const bh   = isH ? 30            : abs(y2 - y1);

    if (highlighted) {
        noFill(); stroke(...C_AMBER, 65); strokeWeight(26);
        if (isH) line(mx - bw/2, my, mx + bw/2, my);
        else     line(mx, my - bh/2, mx, my + bh/2);
    }

    // Box
    fill(248, 251, 255); stroke(...C_IND); strokeWeight(2);
    rectMode(CENTER); rect(mx, my, bw, bh, 5); rectMode(CORNER);

    // Zigzag
    stroke(...C_IND); strokeWeight(1.5); noFill();
    if (isH) {
        const w = bw - 12; const sx = mx - w/2; const segs = 6; const sw = w / segs;
        for (let i = 0; i < segs; i++) {
            const lx = sx + i * sw; const d = i % 2 === 0 ? -7 : 7;
            line(lx, my, lx + sw/2, my + d);
            line(lx + sw/2, my + d, lx + sw, my);
        }
    } else {
        const h = bh - 12; const sy = my - h/2; const segs = 6; const sh = h / segs;
        for (let i = 0; i < segs; i++) {
            const ly = sy + i * sh; const d = i % 2 === 0 ? -7 : 7;
            line(mx, ly, mx + d, ly + sh/2);
            line(mx + d, ly + sh/2, mx, ly + sh);
        }
    }

    // Label
    noStroke(); fill(...C_DEEP);
    textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
    if (isH) text(label + ' = ' + ohms + '\u03A9', mx, my - bh/2 - 14);
    else     text(label + ' = ' + ohms + '\u03A9', mx + bw/2 + 32, my);
    textStyle(NORMAL);
}

function drawDirectionArrows() {
    // Clockwise: top→right, right→down, bottom→left, left→up
    drawArrow(cx,            loopTop - 14,  0        );   // top: rightward
    drawArrow(loopRight + 14, midY,          HALF_PI  );   // right: downward
    drawArrow(cx,            loopBot + 14,  PI       );   // bottom: leftward
    drawArrow(loopLeft - 14,  midY,          -HALF_PI );   // left: upward
}

function drawArrow(x, y, angle) {
    push();
    translate(x, y); rotate(angle);
    noStroke(); fill(...C_ACC, 180);
    triangle(9, 0, -6, -5, -6, 5);
    pop();
}

function drawVAnnotation(step) {
    const v   = step.voltage;
    const col = v >= 0 ? color(...C_GREEN) : color(...C_RED);
    const txt = (v >= 0 ? '+' : '\u2212') + abs(v) + 'V';

    let ax, ay;
    switch (step.element) {
        case 'battery': ax = loopLeft - 56;  ay = midY;        break;
        case 'r1':      ax = cx;             ay = loopTop - 46; break;
        case 'r2':      ax = loopRight + 54; ay = midY;        break;
        case 'r3':      ax = cx;             ay = loopBot + 38; break;
        default: return;
    }

    textSize(13); textStyle(BOLD);
    const tw = textWidth(txt) + 18;
    noStroke(); fill(255, 250);
    stroke(col); strokeWeight(1.5);
    rectMode(CENTER); rect(ax, ay, tw, 24, 12); rectMode(CORNER);
    noStroke(); fill(col);
    textAlign(CENTER, CENTER);
    text(txt, ax, ay);
    textStyle(NORMAL);
}

// ── Step instruction panel ────────────────────────────────────────────────────
function drawStepPanel() {
    const s      = steps[currentStep];
    const hH     = 28;
    const pw     = canvasW - 24;

    // Panel background
    noStroke(); fill(247, 249, 255);
    rect(12, PANEL_Y, pw, PANEL_H, 8);

    // Colored header strip (top corners rounded)
    const hCol = s.type === 'rise' ? color(...C_GREEN)
               : s.type === 'drop' ? color(...C_RED)
               :                     color(...C_IND);
    noStroke(); fill(hCol);
    rect(12, PANEL_Y, pw, hH, 8, 8, 0, 0);

    // Header text
    fill(255); noStroke();
    textAlign(LEFT, CENTER); textSize(12); textStyle(BOLD);
    const lbl = currentStep === 0
        ? 'Overview'
        : 'Step ' + currentStep + ' of ' + (steps.length - 1);
    text(lbl + '  —  ' + s.title, 22, PANEL_Y + hH / 2);

    if (s.type !== 'start') {
        textAlign(RIGHT, CENTER); textSize(11);
        text(s.type === 'rise' ? '▲ RISE' : '▼ DROP', 12 + pw - 12, PANEL_Y + hH / 2);
    }
    textStyle(NORMAL);

    // Panel border
    stroke(...C_IND, 55); strokeWeight(1); noFill();
    rect(12, PANEL_Y, pw, PANEL_H, 8);

    // Content rows
    let yl = PANEL_Y + hH + 11;
    const lh = 19;

    noStroke();
    fill(70); textAlign(LEFT, TOP); textSize(11); textStyle(NORMAL);
    text('Direction:  ' + s.dir, 22, yl);
    yl += lh;

    const detCol = s.type === 'rise' ? color(...C_GREEN)
                 : s.type === 'drop' ? color(...C_RED)
                 :                     color(...C_IND);
    fill(detCol); textSize(12); textStyle(BOLD);
    text(s.detail, 22, yl);
    yl += lh + 2;

    fill(90); textSize(11); textStyle(NORMAL);
    text(s.rule, 22, yl);
}

// ── Live equation ─────────────────────────────────────────────────────────────
function drawEquation() {
    // Background card
    noStroke(); fill(245, 247, 255);
    rect(12, EQ_Y, canvasW - 24, EQ_H, 8);
    stroke(...C_IND, 45); strokeWeight(1); noFill();
    rect(12, EQ_Y, canvasW - 24, EQ_H, 8);

    const midEqY = EQ_Y + EQ_H / 2;
    textSize(13); textStyle(BOLD); textFont('Arial');

    // Build colored segments
    const segs = [];
    segs.push({ t: '\u03A3V = ', c: [...C_DEEP] });

    if (currentStep === 0) {
        segs.push({ t: ' . . .', c: [155, 160, 185] });
    } else {
        for (let i = 1; i <= currentStep && i < steps.length; i++) {
            const v = steps[i].voltage;
            if (i > 1) segs.push({ t: ' + ', c: [...C_DEEP] });
            segs.push({
                t: v >= 0 ? '+' + v + 'V' : '(\u2212' + abs(v) + 'V)',
                c: v >= 0 ? [...C_GREEN] : [...C_RED]
            });
        }
        const sum = steps[currentStep].sumAfter;
        const ok  = abs(sum) < 0.001;
        segs.push({ t: ' = ', c: [...C_DEEP] });
        if (ok) {
            segs.push({ t: '0', c: [...C_GREEN] });
            segs.push({ t: '  \u2713 KVL Satisfied', c: [...C_GREEN] });
        } else {
            segs.push({ t: (sum > 0 ? '+' : '') + sum + 'V', c: [...C_IND] });
        }
    }

    // Measure total width to center
    let totalW = 0;
    for (const s of segs) totalW += textWidth(s.t);
    let x = max(22, cx - totalW / 2);

    textAlign(LEFT, CENTER);
    for (const s of segs) {
        noStroke(); fill(...s.c);
        text(s.t, x, midEqY);
        x += textWidth(s.t);
    }
    textStyle(NORMAL);
}

// ── Buttons ───────────────────────────────────────────────────────────────────
function drawAllButtons() {
    drawBtn(btnPrev,  '← Prev',
            currentStep > 0, C_IND);
    drawBtn(btnNext,  'Next →',
            currentStep < steps.length - 1, C_GREEN);
    drawBtn(btnReset, '\u21BA Reset',
            currentStep > 0 || isAutoPlay, [100, 108, 130]);
    drawBtn(btnAuto,  isAutoPlay ? '\u23F8 Pause' : '\u25B6 Auto',
            true, isAutoPlay ? C_IND : [75, 85, 115]);
}

function drawBtn(btn, label, enabled, col) {
    const hov = enabled && isIn(btn, mouseX, mouseY);

    // Drop shadow
    noStroke(); fill(0, enabled ? 14 : 7);
    rect(btn.x + 2, btn.y + 2, btn.w, btn.h, 7);

    // Face
    const c = !enabled ? [188, 192, 206]
            : hov       ? col.map(v => min(255, v + 35))
            :              col;
    fill(...c); noStroke();
    rect(btn.x, btn.y, btn.w, btn.h, 7);

    // Label
    fill(255); noStroke();
    textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
    text(label, btn.x + btn.w / 2, btn.y + btn.h / 2);
    textStyle(NORMAL);

    if (hov) cursor(HAND);
}

function isIn(btn, mx, my) {
    return mx >= btn.x && mx <= btn.x + btn.w &&
           my >= btn.y && my <= btn.y + btn.h;
}

// ── Interaction ───────────────────────────────────────────────────────────────
function mousePressed() {
    if (isIn(btnPrev, mouseX, mouseY) && currentStep > 0) {
        currentStep--;
        isAutoPlay = false;
        return;
    }
    if (isIn(btnNext, mouseX, mouseY) && currentStep < steps.length - 1) {
        currentStep++;
        isAutoPlay = false;
        return;
    }
    if (isIn(btnReset, mouseX, mouseY)) {
        currentStep = 0;
        isAutoPlay  = false;
        return;
    }
    if (isIn(btnAuto, mouseX, mouseY)) {
        isAutoPlay = !isAutoPlay;
        if (isAutoPlay) {
            if (currentStep >= steps.length - 1) currentStep = 0;
            autoLastTime = millis();
        }
    }
}

function mouseMoved() {
    let any = (isIn(btnPrev,  mouseX, mouseY) && currentStep > 0)
           || (isIn(btnNext,  mouseX, mouseY) && currentStep < steps.length - 1)
           || (isIn(btnReset, mouseX, mouseY) && (currentStep > 0 || isAutoPlay))
           ||  isIn(btnAuto,  mouseX, mouseY);
    cursor(any ? HAND : ARROW);
}

// ── Responsive ────────────────────────────────────────────────────────────────
function windowResized() {
    canvasW = min(floor(document.querySelector('main').getBoundingClientRect().width), 700);
    canvasW = max(canvasW, 480);
    resizeCanvas(canvasW, canvasH);
    computeLayout();
}

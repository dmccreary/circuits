// KCL Node Visualization MicroSim — Chapter 3
// Animated KCL demo with numeric inputs + sliders, real-time ΣI check
'use strict';

// ── Canvas & Layout ───────────────────────────────────────────────────────────
let canvasW;
const DRAW_H   = 340;
const STATUS_H = 60;
const CTRL_H   = 148;
const canvasH  = DRAW_H + STATUS_H + CTRL_H;

let cx, cy;  // node center

// ── Design palette (Circuits 1 system) ───────────────────────────────────────
const C_BG_DRAW = '#eef1fb';
const C_BG_CTRL = '#dde1f0';
const C_DEEP    = [26,  35, 126];
const C_PRIMARY = [57,  73, 171];
const C_ACCENT  = [92, 107, 192];
const C_GREEN   = [27, 153,  80];
const C_GREEN_D = [27,  94,  32];
const C_RED     = [211,  47,  47];
const C_RED_D   = [183,  28,  28];
const C_NODE_BG = [26,   35, 126];

// ── Branch config ─────────────────────────────────────────────────────────────
const BRANCH_LEN = 120;
const ANGLES     = [-Math.PI / 2, 0, Math.PI / 2, Math.PI]; // top right bottom left
const LABELS     = ['I₁', 'I₂', 'I₃', 'I₄'];
const DEFAULTS   = [3, 2, -4, -1];
let   currents   = [...DEFAULTS];

// Branch label positions relative to node center
const LBL_CFG = [
    { dx: 0,               dy: -BRANCH_LEN - 16 },  // top
    { dx:  BRANCH_LEN + 26, dy: 0               },  // right
    { dx: 0,               dy:  BRANCH_LEN + 14 },  // bottom
    { dx: -BRANCH_LEN - 26, dy: 0               },  // left
];

// ── Slider + input layout ─────────────────────────────────────────────────────
const INPUT_W    = 60;   // width of numeric input box (px)
const INPUT_GAP  = 10;   // gap between input right-edge and slider left-edge
const SL_LABEL_W = 52;   // space reserved for label text on far left
const SL_VAL_W   = 58;   // space for value display on far right
const SL_H       = 7;
const KNOB_R     = 9;

let sliderX, sliderW;
let sliders = [];
let inputs  = [];        // p5.js DOM input elements

// ── Particles ─────────────────────────────────────────────────────────────────
let dots = [];
const DOTS_PER = 8;

// ── Setup ─────────────────────────────────────────────────────────────────────
function setup() {
    updateSize();
    createCanvas(canvasW, canvasH).parent(document.querySelector('main'));
    textFont('Arial');
    buildLayout();
    buildSliders();
    buildDots();
    buildInputs();   // must come after buildSliders (needs slider positions)
}

function updateSize() {
    const w = document.querySelector('main').getBoundingClientRect().width;
    canvasW = max(420, min(floor(w), 680));
}

function buildLayout() {
    cx = canvasW / 2;
    cy = 192;
    // Slider starts after: left-margin + label + gap + input + gap
    sliderX = SL_LABEL_W + 8 + INPUT_W + INPUT_GAP;   // = 130
    sliderW = canvasW - sliderX - SL_VAL_W - 16;
}

function buildSliders() {
    sliders = [];
    const firstY = DRAW_H + STATUS_H + 30;
    for (let i = 0; i < 4; i++) {
        sliders.push({ x: sliderX, y: firstY + i * 28, val: DEFAULTS[i], drag: false });
    }
}

function buildDots() {
    dots = [];
    for (let b = 0; b < 4; b++) {
        for (let j = 0; j < DOTS_PER; j++) {
            dots.push({ b, t: j / DOTS_PER });
        }
    }
}

// ── Numeric inputs ────────────────────────────────────────────────────────────
function buildInputs() {
    for (const inp of inputs) inp.remove();
    inputs = [];

    for (let i = 0; i < 4; i++) {
        const idx = i;
        const inp = createInput(nf(DEFAULTS[idx], 1, 1));
        inp.attribute('type', 'number');
        inp.attribute('step', '0.5');
        inp.attribute('min', '-5');
        inp.attribute('max', '5');
        inp.addClass('kcl-input');

        // Typing → update slider val immediately
        inp.input(() => {
            const v = parseFloat(inp.value());
            if (isFinite(v) && !isNaN(v)) {
                sliders[idx].val = constrain(v, -5, 5);
            }
        });

        inputs.push(inp);
    }
    positionInputs();
}

function positionInputs() {
    if (inputs.length === 0) return;
    const cvs = document.querySelector('canvas');
    if (!cvs) return;
    const rect = cvs.getBoundingClientRect();
    for (let i = 0; i < 4; i++) {
        const s = sliders[i];
        // Input sits between label and slider in canvas x-space
        inputs[i].position(
            rect.left + s.x - INPUT_W - INPUT_GAP,
            rect.top  + s.y - 12    // 12 ≈ half the 24px input height
        );
    }
}

// ── Draw loop ─────────────────────────────────────────────────────────────────
function draw() {
    background(C_BG_DRAW);

    noStroke();
    fill(C_BG_CTRL);
    rect(0, DRAW_H, canvasW, STATUS_H + CTRL_H);

    // Pull current values from sliders (inputs update sliders directly)
    for (let i = 0; i < 4; i++) currents[i] = sliders[i].val;

    drawTitle();
    drawBranches();
    animateDots();
    drawNode();
    drawStatusBar();
    drawControlPanel();
}

// ── Title ─────────────────────────────────────────────────────────────────────
function drawTitle() {
    noStroke();
    fill(...C_DEEP);
    textAlign(CENTER, TOP);
    textSize(15);
    textStyle(BOLD);
    text("Kirchhoff's Current Law (KCL)", cx, 10);
    textStyle(NORMAL);

    fill(...C_ACCENT);
    textSize(11);
    text('Algebraic sum of currents at any node = 0    ΣI = 0', cx, 30);
}

// ── Branches ──────────────────────────────────────────────────────────────────
function drawBranches() {
    for (let i = 0; i < 4; i++) {
        const a   = ANGLES[i];
        const ex  = cx + cos(a) * BRANCH_LEN;
        const ey  = cy + sin(a) * BRANCH_LEN;
        const v   = currents[i];
        const col = v >= 0 ? color(...C_GREEN) : color(...C_RED);

        // Wire
        stroke(70);
        strokeWeight(3.5);
        line(cx, cy, ex, ey);

        // Endpoint dot
        noStroke();
        fill(col);
        ellipse(ex, ey, 13, 13);

        // Directional arrow at 52% along branch
        if (abs(v) > 0.05) {
            const mid = 0.52;
            const ax  = cx + cos(a) * BRANCH_LEN * mid;
            const ay  = cy + sin(a) * BRANCH_LEN * mid;
            // Positive = toward node (arrow + PI)
            const arrAngle = v > 0 ? a + Math.PI : a;
            const sz = map(abs(v), 0, 5, 7, 14);
            push();
            translate(ax, ay);
            rotate(arrAngle);
            fill(col); noStroke();
            triangle(0, 0, -sz * 1.7, -sz * 0.55, -sz * 1.7, sz * 0.55);
            pop();
        }

        // Label pill
        const lx = cx + LBL_CFG[i].dx;
        const ly = cy + LBL_CFG[i].dy;
        const sg = v >= 0 ? '+' : '';
        noStroke();
        fill(255, 255, 255, 210);
        rect(lx - 39, ly - 10, 78, 20, 5);
        fill(v >= 0 ? color(...C_GREEN_D) : color(...C_RED_D));
        textAlign(CENTER, CENTER);
        textSize(12); textStyle(BOLD);
        text(LABELS[i] + ' = ' + sg + nf(v, 1, 1) + ' A', lx, ly);
        textStyle(NORMAL);
    }
}

// ── Animated dots ─────────────────────────────────────────────────────────────
function animateDots() {
    for (const d of dots) {
        const v = currents[d.b];
        if (abs(v) < 0.1) continue;

        d.t -= v * 0.0028;
        if (d.t > 1) d.t -= 1;
        if (d.t < 0) d.t += 1;

        const a  = ANGLES[d.b];
        const r  = lerp(BRANCH_LEN - 6, 16, d.t);
        const px = cx + cos(a) * r;
        const py = cy + sin(a) * r;

        noStroke();
        fill(v > 0 ? color(...C_GREEN, 210) : color(...C_RED, 210));
        ellipse(px, py, 8, 8);
    }
}

// ── Central node ──────────────────────────────────────────────────────────────
function drawNode() {
    noStroke();
    fill(...C_PRIMARY, 30);  ellipse(cx, cy, 52, 52);
    fill(...C_PRIMARY, 55);  ellipse(cx, cy, 38, 38);
    fill(...C_NODE_BG);      ellipse(cx, cy, 26, 26);
    fill(255);
    textAlign(CENTER, CENTER); textSize(12); textStyle(BOLD);
    text('N', cx, cy);
    textStyle(NORMAL);
}

// ── Status bar ────────────────────────────────────────────────────────────────
function drawStatusBar() {
    const sum = currents.reduce((a, b) => a + b, 0);
    const ok  = abs(sum) < 0.05;
    const sy  = DRAW_H + 4;
    const ph  = STATUS_H - 10;

    noStroke();
    fill(ok ? color(232, 245, 233) : color(253, 237, 237));
    rect(10, sy, canvasW - 20, ph, 10);
    stroke(ok ? color(76, 175, 80) : color(229, 57, 53));
    strokeWeight(1.5); noFill();
    rect(10, sy, canvasW - 20, ph, 10);

    const midY = sy + ph / 2;
    noStroke();

    fill(30);
    textAlign(LEFT, CENTER); textSize(14); textStyle(BOLD);
    text('ΣI = ' + (sum >= 0 ? '+' : '') + nf(sum, 1, 2) + ' A', 22, midY);

    fill(...C_ACCENT);
    textAlign(CENTER, CENTER); textSize(12); textStyle(NORMAL);
    text('( must equal 0 for KCL )', cx, midY);

    textAlign(RIGHT, CENTER); textSize(13); textStyle(BOLD);
    if (ok) {
        fill(...C_GREEN);
        text('✓ KCL Satisfied', canvasW - 22, midY);
    } else {
        const pulse = map(sin(millis() * 0.006), -1, 1, 0.65, 1.0);
        fill(211, 47, 47, pulse * 255);
        text('✗ KCL Violated', canvasW - 22, midY);
    }
    textStyle(NORMAL);
}

// ── Control panel ─────────────────────────────────────────────────────────────
function drawControlPanel() {
    const panelY = DRAW_H + STATUS_H;

    // Header
    noStroke(); fill(...C_DEEP);
    textAlign(CENTER, TOP); textSize(11); textStyle(BOLD);
    text('Adjust Currents    ( + = entering node   |   − = leaving node )', cx, panelY + 6);
    textStyle(NORMAL);

    for (let i = 0; i < 4; i++) {
        const s     = sliders[i];
        const v     = s.val;
        const col   = v >= 0 ? color(...C_GREEN) : color(...C_RED);
        const knobX = map(v, -5, 5, s.x, s.x + sliderW);
        const zeroX = map(0,  -5, 5, s.x, s.x + sliderW);

        // Label — right-aligned just before input box
        noStroke(); fill(30);
        textAlign(RIGHT, CENTER); textSize(12); textStyle(BOLD);
        text(LABELS[i] + ':', s.x - INPUT_W - INPUT_GAP - 6, s.y);
        textStyle(NORMAL);

        // "A" unit — between input and slider
        fill(80);
        textAlign(CENTER, CENTER); textSize(11);
        text('A', s.x - INPUT_GAP / 2, s.y);

        // Track background
        stroke(195); strokeWeight(SL_H); strokeCap(ROUND);
        line(s.x, s.y, s.x + sliderW, s.y);

        // Colored fill from zero to knob
        stroke(col); strokeWeight(SL_H - 1);
        line(zeroX, s.y, knobX, s.y);

        // Zero tick
        stroke(120); strokeWeight(1.5);
        line(zeroX, s.y - 8, zeroX, s.y + 8);

        // Knob
        noStroke(); fill(255);
        ellipse(knobX, s.y, KNOB_R * 2 + 6, KNOB_R * 2 + 6);
        fill(col);
        ellipse(knobX, s.y, KNOB_R * 2, KNOB_R * 2);

        // Right value display
        noStroke();
        fill(v >= 0 ? color(...C_GREEN_D) : color(...C_RED_D));
        textAlign(LEFT, CENTER); textSize(11); textStyle(BOLD);
        text((v >= 0 ? '+' : '') + nf(v, 1, 1) + ' A', s.x + sliderW + 8, s.y);
        textStyle(NORMAL);
    }
}

// ── Mouse / touch interaction ─────────────────────────────────────────────────
function mousePressed() {
    for (const s of sliders) {
        const kx = map(s.val, -5, 5, s.x, s.x + sliderW);
        if (dist(mouseX, mouseY, kx, s.y) < KNOB_R + 8) s.drag = true;
    }
}

function mouseDragged() {
    for (let i = 0; i < sliders.length; i++) {
        const s = sliders[i];
        if (!s.drag) continue;
        let nv = map(mouseX, s.x, s.x + sliderW, -5, 5);
        nv = round(nv * 2) / 2;   // snap to 0.5 A steps
        s.val = constrain(nv, -5, 5);
        // Sync input field unless user is actively typing in it
        if (inputs[i] && document.activeElement !== inputs[i].elt) {
            inputs[i].value(nf(s.val, 1, 1));
        }
    }
}

function mouseReleased() {
    for (const s of sliders) s.drag = false;
}

function touchStarted() { mousePressed(); return false; }
function touchMoved()   { mouseDragged(); return false; }
function touchEnded()   { mouseReleased(); return false; }

// ── Responsive ────────────────────────────────────────────────────────────────
function windowResized() {
    updateSize();
    resizeCanvas(canvasW, canvasH);
    buildLayout();
    buildSliders();
    positionInputs();   // reposition without rebuilding
}

// KCL Node Visualization MicroSim — Chapter 3
// Professional redesign: clean layout, animated currents, real-time KCL check
'use strict';

// ── Canvas & Layout ───────────────────────────────────────────────────────────
let canvasW;
const DRAW_H   = 320;
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
const C_RED     = [211, 47,  47];
const C_RED_D   = [183, 28,  28];
const C_NODE_BG = [26,  35, 126];

// ── Branch config ─────────────────────────────────────────────────────────────
const BRANCH_LEN = 105;
// top, right, bottom, left (Math.PI used — safe before p5 loads)
const ANGLES  = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
const LABELS  = ['I₁', 'I₂', 'I₃', 'I₄'];
const DEFAULTS = [3, 2, -4, -1];
let currents  = [...DEFAULTS];

// Per-branch label alignment  [textAlignH, textAlignY-offset-px]
// We compute positions manually; record h-align constant name for use in draw
const LBL_CFG = [
    // top:    label above endpoint
    { dx: 0,  dy: -BRANCH_LEN - 16, ha: 'CENTER', va: 'BOTTOM' },
    // right:  label right of endpoint
    { dx: BRANCH_LEN + 26, dy: 0, ha: 'LEFT',   va: 'CENTER' },
    // bottom: label below endpoint
    { dx: 0,  dy: BRANCH_LEN + 14, ha: 'CENTER', va: 'TOP'    },
    // left:   label left of endpoint
    { dx: -BRANCH_LEN - 26, dy: 0, ha: 'RIGHT',  va: 'CENTER' },
];

// ── Slider layout ─────────────────────────────────────────────────────────────
const SL_LABEL_W = 56;   // px reserved for left label
const SL_VAL_W   = 70;   // px reserved for right value
const SL_H       = 7;
const KNOB_R     = 9;
let sliderX, sliderW;
let sliders = [];

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
}

function updateSize() {
    const w = document.querySelector('main').getBoundingClientRect().width;
    canvasW = max(420, min(floor(w), 680));
}

function buildLayout() {
    cx = canvasW / 2;
    cy = 185;  // node center Y — leaves room for title above and status below
    sliderX = SL_LABEL_W + 20;
    sliderW = canvasW - sliderX - SL_VAL_W - 18;
}

function buildSliders() {
    sliders = [];
    const firstY = DRAW_H + STATUS_H + 30;
    for (let i = 0; i < 4; i++) {
        sliders.push({ x: sliderX, y: firstY + i * 28, val: currents[i], drag: false });
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

// ── Draw loop ─────────────────────────────────────────────────────────────────
function draw() {
    background(C_BG_DRAW);

    // Control area background
    noStroke();
    fill(C_BG_CTRL);
    rect(0, DRAW_H, canvasW, STATUS_H + CTRL_H);

    // Sync current values from sliders
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

        // Direction arrow at ~52% along branch (clear of node)
        if (abs(v) > 0.05) {
            const mid = 0.52;
            const ax  = cx + cos(a) * BRANCH_LEN * mid;
            const ay  = cy + sin(a) * BRANCH_LEN * mid;
            // Positive = entering node → arrow points toward node (angle + PI)
            const arrAngle = v > 0 ? a + Math.PI : a;
            const sz = map(abs(v), 0, 5, 7, 14);
            push();
            translate(ax, ay);
            rotate(arrAngle);
            fill(col);
            noStroke();
            triangle(0, 0, -sz * 1.7, -sz * 0.55, -sz * 1.7, sz * 0.55);
            pop();
        }

        // Label with white pill background
        const cfg = LBL_CFG[i];
        const lx  = cx + cfg.dx;
        const ly  = cy + cfg.dy;
        const sg  = v >= 0 ? '+' : '';
        const lbl = LABELS[i] + ' = ' + sg + nf(v, 1, 1) + ' A';

        // Background pill
        noStroke();
        fill(255, 255, 255, 210);
        const tw = 78, th = 20;
        rect(lx - tw / 2, ly - th / 2, tw, th, 5);

        // Label text
        fill(v >= 0 ? color(...C_GREEN_D) : color(...C_RED_D));
        textAlign(CENTER, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(lbl, lx, ly);
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
    // Outer halo
    fill(...C_PRIMARY, 30);
    ellipse(cx, cy, 52, 52);
    // Inner glow
    fill(...C_PRIMARY, 55);
    ellipse(cx, cy, 38, 38);
    // Solid core
    fill(...C_NODE_BG);
    ellipse(cx, cy, 26, 26);
    // Label
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('N', cx, cy);
    textStyle(NORMAL);
}

// ── Status bar ────────────────────────────────────────────────────────────────
function drawStatusBar() {
    const sum = currents.reduce((a, b) => a + b, 0);
    const ok  = abs(sum) < 0.05;

    const sy = DRAW_H + 4;
    const pw = canvasW - 20;
    const ph = STATUS_H - 10;

    // Background
    noStroke();
    fill(ok ? color(232, 245, 233) : color(253, 237, 237));
    rect(10, sy, pw, ph, 10);

    // Border
    stroke(ok ? color(76, 175, 80) : color(229, 57, 53));
    strokeWeight(1.5);
    noFill();
    rect(10, sy, pw, ph, 10);

    const midY = sy + ph / 2;

    // Left: ΣI value
    noStroke();
    fill(30);
    textAlign(LEFT, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('ΣI = ' + (sum >= 0 ? '+' : '') + nf(sum, 1, 2) + ' A', 22, midY);
    textStyle(NORMAL);

    // Center: equation reminder
    fill(...C_ACCENT);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('( must equal 0 for KCL )', cx, midY);

    // Right: status
    textAlign(RIGHT, CENTER);
    textSize(13);
    textStyle(BOLD);
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

    // Section header
    noStroke();
    fill(...C_DEEP);
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Adjust Currents    ( + = entering node   |   − = leaving node )', cx, panelY + 6);
    textStyle(NORMAL);

    for (let i = 0; i < 4; i++) {
        const s     = sliders[i];
        const v     = s.val;
        const col   = v >= 0 ? color(...C_GREEN) : color(...C_RED);
        const knobX = map(v, -5, 5, s.x, s.x + sliderW);
        const zeroX = map(0,  -5, 5, s.x, s.x + sliderW);

        // Left label
        noStroke();
        fill(30);
        textAlign(RIGHT, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(LABELS[i] + ':', s.x - 10, s.y);
        textStyle(NORMAL);

        // Track background
        stroke(195);
        strokeWeight(SL_H);
        strokeCap(ROUND);
        line(s.x, s.y, s.x + sliderW, s.y);

        // Colored fill from zero to knob
        stroke(col);
        strokeWeight(SL_H - 1);
        line(zeroX, s.y, knobX, s.y);

        // Zero tick
        stroke(120);
        strokeWeight(1.5);
        line(zeroX, s.y - 8, zeroX, s.y + 8);

        // Knob: white ring + color fill
        noStroke();
        fill(255);
        ellipse(knobX, s.y, KNOB_R * 2 + 6, KNOB_R * 2 + 6);
        fill(col);
        ellipse(knobX, s.y, KNOB_R * 2, KNOB_R * 2);

        // Right value
        noStroke();
        fill(v >= 0 ? color(...C_GREEN_D) : color(...C_RED_D));
        textAlign(LEFT, CENTER);
        textSize(12);
        textStyle(BOLD);
        text((v >= 0 ? '+' : '') + nf(v, 1, 1) + ' A', s.x + sliderW + 10, s.y);
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
    for (const s of sliders) {
        if (!s.drag) continue;
        let nv = map(mouseX, s.x, s.x + sliderW, -5, 5);
        nv = round(nv * 2) / 2;   // snap to 0.5 A steps
        s.val = constrain(nv, -5, 5);
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
}

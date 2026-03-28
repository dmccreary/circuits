// KCL Node Visualization MicroSim
// Interactive demonstration of Kirchhoff's Current Law
// Four branches meet at a central node with animated current flow

'use strict';

let canvasW, canvasH = 500;
let cx, cy;  // node center

// Branch data: angle, current value, particles
const ANGLES = [ -Math.PI/2, 0, Math.PI/2, Math.PI ]; // top, right, bottom, left
const LABELS = ['I₁','I₂','I₃','I₄'];
const DEFAULTS = [3, 2, -4, -1];
let currents = [...DEFAULTS];

// Slider state
const SL_W = 160, SL_H = 6, KNOB_R = 9;
let sliders = [];

// Particles
let dots = [];
const DOTS_PER = 8;

// Layout
const BRANCH_LEN = 100;
const DRAW_TOP = 60;
let nodeY;

function setup() {
    canvasW = min(windowWidth - 4, 680);
    createCanvas(canvasW, canvasH).parent('main');
    textFont('Arial');
    nodeY = DRAW_TOP + 120;
    cx = canvasW / 2;
    cy = nodeY;
    buildSliders();
    buildDots();
}

function buildSliders() {
    sliders = [];
    let left = cx - SL_W / 2 + 30;
    let top = 365;
    for (let i = 0; i < 4; i++) {
        sliders.push({ x: left, y: top + i * 30, val: currents[i], drag: false });
    }
}

function buildDots() {
    dots = [];
    for (let b = 0; b < 4; b++) {
        for (let j = 0; j < DOTS_PER; j++) {
            dots.push({ b: b, t: j / DOTS_PER });
        }
    }
}

function draw() {
    background(248, 249, 252);

    // Title
    noStroke();
    fill(40);
    textAlign(CENTER, TOP);
    textSize(17);
    textStyle(BOLD);
    text("Kirchhoff's Current Law (KCL)", cx, 10);
    textStyle(NORMAL);
    textSize(12);
    fill(100);
    text('The algebraic sum of all currents at a node equals zero', cx, 32);

    // Read slider values
    for (let i = 0; i < 4; i++) currents[i] = sliders[i].val;

    drawBranches();
    animateDots();
    drawNode();
    drawStatus();
    drawPanel();
}

// ── Branches with arrows ────────────────────────────────────────────────

function drawBranches() {
    for (let i = 0; i < 4; i++) {
        let a = ANGLES[i];
        let ex = cx + cos(a) * BRANCH_LEN;
        let ey = cy + sin(a) * BRANCH_LEN;
        let v = currents[i];
        let col = v >= 0 ? color(39, 174, 96) : color(231, 76, 60);

        // Wire
        stroke(100);
        strokeWeight(2.5);
        line(cx, cy, ex, ey);

        // Endpoint dot
        noStroke();
        fill(col);
        ellipse(ex, ey, 12, 12);

        // Arrow at midpoint
        if (abs(v) > 0.05) {
            let mid = 0.55;
            let ax = cx + cos(a) * BRANCH_LEN * mid;
            let ay = cy + sin(a) * BRANCH_LEN * mid;
            let arrAngle = v > 0 ? a + PI : a; // toward node if positive
            let sz = map(abs(v), 0, 5, 5, 12);
            push();
            translate(ax, ay);
            rotate(arrAngle);
            fill(col);
            noStroke();
            triangle(0, 0, -sz * 1.8, -sz * 0.6, -sz * 1.8, sz * 0.6);
            pop();
        }

        // Label
        let ld = BRANCH_LEN + 26;
        let lx = cx + cos(a) * ld;
        let ly = cy + sin(a) * ld;
        noStroke();
        fill(40);
        textAlign(CENTER, CENTER);
        textSize(13);
        textStyle(BOLD);
        let sign = v >= 0 ? '+' : '';
        text(LABELS[i] + ' = ' + sign + nf(v, 1, 1) + ' A', lx, ly);
        textStyle(NORMAL);
    }
}

// ── Animated dots ───────────────────────────────────────────────────────

function animateDots() {
    for (let d of dots) {
        let v = currents[d.b];
        if (abs(v) < 0.1) continue;

        // Move: positive = toward node
        d.t -= v * 0.003;
        if (d.t > 1) d.t -= 1;
        if (d.t < 0) d.t += 1;

        let a = ANGLES[d.b];
        let r = lerp(BRANCH_LEN - 5, 14, d.t);
        let px = cx + cos(a) * r;
        let py = cy + sin(a) * r;

        let c = v > 0 ? color(39, 174, 96, 200) : color(231, 76, 60, 200);
        noStroke();
        fill(c);
        ellipse(px, py, 7, 7);
    }
}

// ── Central node ────────────────────────────────────────────────────────

function drawNode() {
    // Glow
    noStroke();
    fill(44, 62, 80, 40);
    ellipse(cx, cy, 30, 30);
    // Node
    fill(44, 62, 80);
    ellipse(cx, cy, 22, 22);
    // Label
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text('N', cx, cy);
    textStyle(NORMAL);
}

// ── KCL status ──────────────────────────────────────────────────────────

function drawStatus() {
    let sum = currents.reduce((a, b) => a + b, 0);
    let ok = abs(sum) < 0.05;

    let sy = cy + BRANCH_LEN + 48;

    // Background pill
    let pw = 260, ph = 44;
    noStroke();
    fill(ok ? color(232, 245, 233) : color(253, 237, 237));
    rect(cx - pw / 2, sy - ph / 2, pw, ph, 22);

    // Border
    stroke(ok ? color(76, 175, 80) : color(229, 57, 53));
    strokeWeight(2);
    noFill();
    rect(cx - pw / 2, sy - ph / 2, pw, ph, 22);

    // Text
    noStroke();
    textAlign(CENTER, CENTER);

    textSize(15);
    textStyle(BOLD);
    fill(40);
    text('ΣI = ' + (sum >= 0 ? '+' : '') + nf(sum, 1, 1) + ' A', cx, sy - 8);

    textSize(13);
    if (ok) {
        fill(46, 125, 50);
        text('✓ KCL Satisfied', cx, sy + 10);
    } else {
        let pulse = map(sin(millis() * 0.006), -1, 1, 0.6, 1.0);
        fill(229, 57, 53, pulse * 255);
        text('✗ KCL Violated!', cx, sy + 10);
    }
    textStyle(NORMAL);
}

// ── Control panel ───────────────────────────────────────────────────────

function drawPanel() {
    let py = 345;
    let ph = canvasH - py - 6;

    // Panel bg
    noStroke();
    fill(238, 242, 247);
    rect(8, py, canvasW - 16, ph, 10);

    // Title
    fill(60);
    textAlign(CENTER, TOP);
    textSize(11);
    textStyle(BOLD);
    text('Adjust Currents  (+ entering  |  − leaving)', cx, py + 5);
    textStyle(NORMAL);

    for (let i = 0; i < 4; i++) {
        let s = sliders[i];
        let v = s.val;
        let col = v >= 0 ? color(39, 174, 96) : color(231, 76, 60);
        let knobX = map(v, -5, 5, s.x, s.x + SL_W);
        let zeroX = map(0, -5, 5, s.x, s.x + SL_W);

        // Label
        noStroke();
        fill(40);
        textAlign(RIGHT, CENTER);
        textSize(12);
        textStyle(BOLD);
        text(LABELS[i] + ':', s.x - 10, s.y);
        textStyle(NORMAL);

        // Track
        stroke(200);
        strokeWeight(SL_H);
        strokeCap(ROUND);
        line(s.x, s.y, s.x + SL_W, s.y);

        // Fill from zero to knob
        stroke(col);
        strokeWeight(SL_H);
        line(zeroX, s.y, knobX, s.y);

        // Zero tick
        stroke(150);
        strokeWeight(1);
        line(zeroX, s.y - 7, zeroX, s.y + 7);

        // Knob
        noStroke();
        fill(255);
        ellipse(knobX, s.y, KNOB_R * 2 + 4, KNOB_R * 2 + 4);
        fill(col);
        ellipse(knobX, s.y, KNOB_R * 2, KNOB_R * 2);

        // Value text
        fill(col);
        textAlign(LEFT, CENTER);
        textSize(11);
        textStyle(BOLD);
        let sg = v >= 0 ? '+' : '';
        text(sg + nf(v, 1, 1) + ' A', s.x + SL_W + 8, s.y);
        textStyle(NORMAL);
    }
}

// ── Mouse interaction ───────────────────────────────────────────────────

function mousePressed() {
    for (let s of sliders) {
        let kx = map(s.val, -5, 5, s.x, s.x + SL_W);
        if (dist(mouseX, mouseY, kx, s.y) < KNOB_R + 6) {
            s.drag = true;
        }
    }
}

function mouseDragged() {
    for (let s of sliders) {
        if (s.drag) {
            let nv = map(mouseX, s.x, s.x + SL_W, -5, 5);
            nv = round(nv * 2) / 2; // snap 0.5
            s.val = constrain(nv, -5, 5);
        }
    }
}

function mouseReleased() {
    for (let s of sliders) s.drag = false;
}

function touchStarted() {
    mousePressed();
    return false;
}
function touchMoved() {
    mouseDragged();
    return false;
}
function touchEnded() {
    mouseReleased();
    return false;
}

function windowResized() {
    canvasW = min(windowWidth - 4, 680);
    resizeCanvas(canvasW, canvasH);
    cx = canvasW / 2;
    buildSliders();
}

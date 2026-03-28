// KCL Node Visualization MicroSim
// Shows a central node with 4 branches, animated current particles,
// color-coded arrows, and sliders to adjust current magnitudes.
// Demonstrates Kirchhoff's Current Law: sum of currents at a node = 0.

'use strict';

// ── Canvas ───────────────────────────────────────────────────────────────────
let canvasWidth;
const canvasHeight = 500;

// ── Colors ───────────────────────────────────────────────────────────────────
const BG_COLOR      = '#f8f9fa';
const NODE_COLOR    = '#2c3e50';
const WIRE_COLOR    = '#555';
const ENTER_COLOR   = '#27ae60';  // green - current entering
const LEAVE_COLOR   = '#e74c3c';  // red   - current leaving
const SLIDER_TRACK  = '#ccc';
const SLIDER_FILL   = '#3498db';
const SLIDER_KNOB   = '#2980b9';
const TEXT_COLOR    = '#2c3e50';
const PANEL_BG      = '#eef2f7';

// ── Branch layout ────────────────────────────────────────────────────────────
// Angles: top, right, bottom, left
const BRANCH_ANGLES = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
const BRANCH_LABELS = ['I\u2081', 'I\u2082', 'I\u2083', 'I\u2084'];
const BRANCH_LENGTH = 110;

// ── Sliders ──────────────────────────────────────────────────────────────────
let sliders = [];  // {x, y, w, val, min, max, label, dragging}
const SLIDER_W = 180;
const SLIDER_H = 6;
const KNOB_R   = 10;
const SLIDER_MIN = -5;
const SLIDER_MAX = 5;
const DEFAULT_VALS = [3, 2, -4, -1];

// ── Particles ────────────────────────────────────────────────────────────────
let particles = [];  // {branch, t, speed}
const PARTICLE_R = 4;
const PARTICLES_PER_BRANCH = 6;

// ── Node center ──────────────────────────────────────────────────────────────
let cx, cy;

function setup() {
    canvasWidth = min(windowWidth, 700);
    let cnv = createCanvas(canvasWidth, canvasHeight);
    cnv.parent('main');
    textFont('Arial');

    cx = canvasWidth / 2;
    cy = 180;

    // Create sliders in the control panel area
    let sliderStartY = 360;
    let sliderGap = 32;
    let sliderLeft = canvasWidth / 2 - SLIDER_W / 2 + 40;

    for (let i = 0; i < 4; i++) {
        sliders.push({
            x: sliderLeft,
            y: sliderStartY + i * sliderGap,
            w: SLIDER_W,
            val: DEFAULT_VALS[i],
            min: SLIDER_MIN,
            max: SLIDER_MAX,
            label: BRANCH_LABELS[i],
            dragging: false
        });
    }

    // Initialize particles
    for (let b = 0; b < 4; b++) {
        for (let p = 0; p < PARTICLES_PER_BRANCH; p++) {
            particles.push({
                branch: b,
                t: p / PARTICLES_PER_BRANCH,
                speed: 0
            });
        }
    }
}

function draw() {
    background(BG_COLOR);

    // Title
    fill(TEXT_COLOR);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text("Kirchhoff's Current Law (KCL)", canvasWidth / 2, 12);
    textStyle(NORMAL);
    textSize(13);
    fill('#666');
    text('Sum of currents entering a node equals sum leaving', canvasWidth / 2, 36);

    // ── Draw branches and arrows ─────────────────────────────────────────────
    for (let i = 0; i < 4; i++) {
        drawBranch(i);
    }

    // ── Draw particles ───────────────────────────────────────────────────────
    updateAndDrawParticles();

    // ── Draw central node ────────────────────────────────────────────────────
    fill(NODE_COLOR);
    noStroke();
    ellipse(cx, cy, 20, 20);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('N', cx, cy);
    textStyle(NORMAL);

    // ── Control panel ────────────────────────────────────────────────────────
    drawControlPanel();

    // ── KCL status ───────────────────────────────────────────────────────────
    drawKCLStatus();
}

function drawBranch(i) {
    let angle = BRANCH_ANGLES[i];
    let val = sliders[i].val;
    let entering = val > 0;
    let col = entering ? color(ENTER_COLOR) : color(LEAVE_COLOR);

    // Wire from node to endpoint
    let ex = cx + cos(angle) * BRANCH_LENGTH;
    let ey = cy + sin(angle) * BRANCH_LENGTH;

    stroke(WIRE_COLOR);
    strokeWeight(3);
    line(cx, cy, ex, ey);

    // Terminal circle
    fill(col);
    noStroke();
    ellipse(ex, ey, 14, 14);

    // Arrow on wire
    if (abs(val) > 0.01) {
        drawArrow(i, val, col);
    }

    // Label near endpoint
    let labelDist = BRANCH_LENGTH + 28;
    let lx = cx + cos(angle) * labelDist;
    let ly = cy + sin(angle) * labelDist;
    fill(TEXT_COLOR);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(BRANCH_LABELS[i] + ' = ' + nf(val, 1, 1) + 'A', lx, ly);
    textStyle(NORMAL);
}

function drawArrow(i, val, col) {
    let angle = BRANCH_ANGLES[i];
    // Arrow direction: positive = towards node (entering), negative = away from node (leaving)
    let dir = val > 0 ? 1 : -1;

    // Arrow position along the branch (midpoint)
    let arrowDist = BRANCH_LENGTH * 0.55;
    let ax = cx + cos(angle) * arrowDist;
    let ay = cy + sin(angle) * arrowDist;

    // Arrow points toward node if entering, away if leaving
    let arrowAngle = angle + (dir > 0 ? Math.PI : 0);

    push();
    translate(ax, ay);
    rotate(arrowAngle);
    fill(col);
    noStroke();
    let sz = map(abs(val), 0, 5, 6, 14);
    triangle(0, 0, -sz * 1.6, -sz * 0.7, -sz * 1.6, sz * 0.7);
    pop();
}

function updateAndDrawParticles() {
    for (let p of particles) {
        let val = sliders[p.branch].val;
        // Speed proportional to current magnitude, direction based on sign
        // Positive = toward node (t decreases from 1 to 0)
        // Negative = away from node (t increases from 0 to 1)
        let speed = val * 0.004;
        p.t -= speed;

        // Wrap
        if (p.t > 1) p.t -= 1;
        if (p.t < 0) p.t += 1;

        if (abs(val) < 0.1) continue;  // Don't draw if nearly zero

        let angle = BRANCH_ANGLES[p.branch];
        let dist = lerp(BRANCH_LENGTH, 12, p.t);
        let px = cx + cos(angle) * dist;
        let py = cy + sin(angle) * dist;

        let entering = val > 0;
        let c = entering ? color(ENTER_COLOR) : color(LEAVE_COLOR);
        // Fade alpha based on position
        let alpha = map(abs(p.t - 0.5), 0, 0.5, 255, 120);
        c.setAlpha(alpha);
        fill(c);
        noStroke();
        ellipse(px, py, PARTICLE_R * 2, PARTICLE_R * 2);
    }
}

function drawControlPanel() {
    // Panel background
    fill(PANEL_BG);
    noStroke();
    let panelY = 335;
    let panelH = canvasHeight - panelY - 5;
    rect(10, panelY, canvasWidth - 20, panelH, 10);

    // Panel title
    fill(TEXT_COLOR);
    textAlign(CENTER, TOP);
    textSize(13);
    textStyle(BOLD);
    text('Adjust Branch Currents (positive = entering node)', canvasWidth / 2, panelY + 6);
    textStyle(NORMAL);

    // Draw sliders
    for (let i = 0; i < 4; i++) {
        drawSlider(sliders[i], i);
    }
}

function drawSlider(s, idx) {
    let entering = s.val > 0;
    let valColor = entering ? ENTER_COLOR : (s.val < 0 ? LEAVE_COLOR : '#888');

    // Label
    fill(TEXT_COLOR);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(s.label + ':', s.x - 12, s.y);
    textStyle(NORMAL);

    // Track
    stroke(SLIDER_TRACK);
    strokeWeight(SLIDER_H);
    strokeCap(ROUND);
    line(s.x, s.y, s.x + s.w, s.y);

    // Fill to knob
    let knobX = map(s.val, s.min, s.max, s.x, s.x + s.w);
    let zeroX = map(0, s.min, s.max, s.x, s.x + s.w);
    stroke(valColor);
    strokeWeight(SLIDER_H);
    line(zeroX, s.y, knobX, s.y);

    // Zero tick
    stroke('#999');
    strokeWeight(1);
    line(zeroX, s.y - 8, zeroX, s.y + 8);

    // Knob
    fill(valColor);
    noStroke();
    ellipse(knobX, s.y, KNOB_R * 2, KNOB_R * 2);

    // Value
    fill(valColor);
    textAlign(LEFT, CENTER);
    textSize(12);
    textStyle(BOLD);
    let sign = s.val >= 0 ? '+' : '';
    text(sign + nf(s.val, 1, 1) + 'A', s.x + s.w + 10, s.y);
    textStyle(NORMAL);
}

function drawKCLStatus() {
    let total = 0;
    for (let s of sliders) total += s.val;

    let satisfied = abs(total) < 0.05;

    // Status display between circuit and panel
    let statusY = 300;
    textAlign(CENTER, CENTER);
    textSize(20);
    textStyle(BOLD);

    // Sum text
    fill(TEXT_COLOR);
    noStroke();
    let sumStr = '\u03A3I = ' + nf(total, 1, 1) + ' A';
    text(sumStr, canvasWidth / 2, statusY);

    // Status message
    textSize(16);
    if (satisfied) {
        fill(ENTER_COLOR);
        text('KCL Satisfied \u2713', canvasWidth / 2, statusY + 24);
    } else {
        fill(LEAVE_COLOR);
        // Pulsing effect for violation warning
        let pulse = map(sin(millis() * 0.005), -1, 1, 180, 255);
        fill(pulse, 50, 50);
        text('KCL Violated!', canvasWidth / 2, statusY + 24);
    }
    textStyle(NORMAL);
}

// ── Mouse interaction ────────────────────────────────────────────────────────

function mousePressed() {
    for (let s of sliders) {
        let knobX = map(s.val, s.min, s.max, s.x, s.x + s.w);
        if (dist(mouseX, mouseY, knobX, s.y) < KNOB_R + 5) {
            s.dragging = true;
        }
    }
}

function mouseDragged() {
    for (let s of sliders) {
        if (s.dragging) {
            let newVal = map(mouseX, s.x, s.x + s.w, s.min, s.max);
            // Snap to 0.5 increments
            newVal = round(newVal * 2) / 2;
            s.val = constrain(newVal, s.min, s.max);
        }
    }
}

function mouseReleased() {
    for (let s of sliders) {
        s.dragging = false;
    }
}

function windowResized() {
    canvasWidth = min(windowWidth, 700);
    resizeCanvas(canvasWidth, canvasHeight);
    cx = canvasWidth / 2;

    // Reposition sliders
    let sliderLeft = canvasWidth / 2 - SLIDER_W / 2 + 40;
    for (let i = 0; i < 4; i++) {
        sliders[i].x = sliderLeft;
    }
}

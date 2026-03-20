// Kirchhoff's Laws / Mesh Analysis / Node Analysis MicroSim
//
// Circuit topology (same for all three modes):
//
//   V₁ ──[R₁]── A ──[R₃]── V₂
//   |            |           |
//   +           [R₂]         +
//   −            |           −
//   └────────────┴───────────┘
//                GND
//
// Mesh analysis: both mesh currents defined clockwise.
//   I₁ in left loop  → down through R₂
//   I₂ in right loop → down through R₂
// Matrix equation:  [R₁+R₂,  R₂ ] [I₁]   [V₁]
//                   [R₂,  R₂+R₃ ] [I₂] = [V₂]
// Branch currents:
//   cR1 = I₁         (rightward through R₁)
//   cR2 = I₁ + I₂    (downward  through R₂)
//   cR3 = I₂         (leftward  through R₃, into A when positive)

'use strict';

// ── Canvas dimensions ─────────────────────────────────────────────────────────
let drawHeight    = 390;
let controlHeight = 152;
let canvasHeight;
let containerWidth;

// ── Mode ──────────────────────────────────────────────────────────────────────
let mode = 0;   // 0 = KVL/KCL   1 = Mesh   2 = Node

// ── Circuit parameters (user-adjustable) ─────────────────────────────────────
let V1 = 12, V2 = 6;
let R1 = 2,  R2 = 4, R3 = 3;   // Ω

// ── Solved quantities ─────────────────────────────────────────────────────────
let mI1, mI2;   // mesh currents (A)
let cR1;        // rightward through R₁
let cR2;        // downward  through R₂
let cR3;        // leftward  through R₃ (positive = into node A)
let VA;         // node voltage at A (V)

// ── Layout ────────────────────────────────────────────────────────────────────
const TAB_H = 36;
let tabBtns = [];
let leftX, midX, rightX, topY, botY;
let eqLeft, eqW;

const SL_LEFT   = 240;
let sliderX, sliderWidth;
let sy1, sy2, sy3, sy4, sy5;

// ── Setup ─────────────────────────────────────────────────────────────────────
function setup() {
    updateCanvasSize();
    canvasHeight = drawHeight + controlHeight;
    createCanvas(containerWidth, canvasHeight).parent(document.querySelector('main'));
    textFont('Arial');
    computeLayout();
    solve();
}

function updateCanvasSize() {
    containerWidth = max(520, floor(
        document.querySelector('main').getBoundingClientRect().width
    ));
}

function computeLayout() {
    const tw = floor(containerWidth / 3);
    tabBtns = [
        { x: 2,       y: 5, w: tw - 4, h: TAB_H - 5, label: 'KVL & KCL' },
        { x: tw + 2,  y: 5, w: tw - 4, h: TAB_H - 5, label: 'Mesh Analysis' },
        { x: 2*tw+2,  y: 5, w: tw - 4, h: TAB_H - 5, label: 'Node Analysis' },
    ];
    leftX  = floor(containerWidth * 0.07);
    midX   = floor(containerWidth * 0.30);
    rightX = floor(containerWidth * 0.53);
    topY   = TAB_H + 58;
    botY   = drawHeight - 44;
    eqLeft = floor(containerWidth * 0.57);
    eqW    = containerWidth - eqLeft - 8;
    sliderX     = SL_LEFT;
    sliderWidth = containerWidth - SL_LEFT - 18;
    sy1 = drawHeight + 22;
    sy2 = drawHeight + 50;
    sy3 = drawHeight + 78;
    sy4 = drawHeight + 106;
    sy5 = drawHeight + 134;
}

// ── Physics solver ────────────────────────────────────────────────────────────
function solve() {
    // Mesh matrix:  A·x = b
    //   a = R1+R2,  b_coef = R2,  d = R2+R3
    const a = R1 + R2,  b_c = R2,  d = R2 + R3;
    const det = a * d - b_c * b_c;   // R1*R2 + R1*R3 + R2*R3

    if (abs(det) < 1e-9) {
        mI1 = 0; mI2 = 0;
    } else {
        mI1 = (d * V1 - b_c * V2) / det;
        mI2 = (a * V2 - b_c * V1) / det;
    }
    cR1 = mI1;
    cR2 = mI1 + mI2;
    cR3 = mI2;

    // Independent node-voltage check
    const G1 = 1/R1, G2 = 1/R2, G3 = 1/R3;
    VA = (V1*G1 + V2*G3) / (G1 + G2 + G3);
}

// ── Draw loop ─────────────────────────────────────────────────────────────────
function draw() {
    background(255);
    drawTabs();
    if      (mode === 0) drawKVLMode();
    else if (mode === 1) drawMeshMode();
    else                 drawNodeMode();
    drawControls();
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
function drawTabs() {
    for (let i = 0; i < 3; i++) {
        const t = tabBtns[i];
        const on = i === mode;
        fill(on ? color(25, 75, 180) : 215);
        stroke(on ? color(15, 55, 140) : 160);
        strokeWeight(1);
        rect(t.x, t.y, t.w, t.h, 5);
        fill(on ? 255 : 40);
        noStroke();
        textSize(12); textAlign(CENTER, CENTER);
        text(t.label, t.x + t.w/2, t.y + t.h/2);
    }
    stroke(180); strokeWeight(1);
    line(0, TAB_H + 2, containerWidth, TAB_H + 2);
}

// ── Base circuit (shared by all modes) ────────────────────────────────────────
function drawBaseCircuit(shadeMesh1, shadeMesh2, highlightNode) {
    const midY = round((topY + botY) / 2);
    const R2h  = botY - topY;

    // Mesh shading
    if (shadeMesh1) { noStroke(); fill(25, 75, 220, 22);  rect(leftX, topY, midX-leftX, botY-topY, 4); }
    if (shadeMesh2) { noStroke(); fill(210, 80, 20, 22);   rect(midX,  topY, rightX-midX, botY-topY, 4); }

    // Wires
    stroke(0); strokeWeight(2.5);
    line(leftX, topY, midX, topY);       // top-left rail
    line(midX,  topY, rightX, topY);     // top-right rail
    line(leftX, botY, rightX, botY);     // bottom rail
    line(leftX, topY, leftX, midY - 16); // left side upper
    line(leftX, midY + 16, leftX, botY); // left side lower
    line(rightX, topY, rightX, midY - 16);
    line(rightX, midY + 16, rightX, botY);
    // stubs for R2
    line(midX, topY, midX, topY + 4);
    line(midX, botY - 4, midX, botY);

    // Components
    drawResH(leftX, topY, midX - leftX, 'R₁', R1);
    drawResH(midX,  topY, rightX - midX, 'R₃', R3);
    drawResV(midX, topY + 4, R2h - 8, 'R₂', R2);

    // Batteries
    drawBat(leftX,  midY, V1, 'V₁');
    drawBat(rightX, midY, V2, 'V₂');

    // Ground symbols
    drawGnd(leftX,  botY);
    drawGnd(rightX, botY);

    // Node dot at A
    if (highlightNode) {
        stroke(20, 160, 80); strokeWeight(3); noFill();
        ellipse(midX, topY, 16, 16);
    }
    fill(20); stroke(0); strokeWeight(1);
    ellipse(midX, topY, 8, 8);
    fill(0); noStroke(); textSize(11); textAlign(CENTER, BOTTOM);
    text('A', midX, topY - 6);
}

// ── MODE 0: KVL / KCL ────────────────────────────────────────────────────────
function drawKVLMode() {
    drawBaseCircuit(false, false, false);

    const off = 14;   // arrow offset from rail
    // Current arrows (above rail or beside wire)
    drawBranchArrow(leftX + 10, topY, midX - 10, topY, -off, cR1, 'I_R1', [30, 80, 220]);
    drawBranchArrow(midX  + 10, topY, rightX - 10, topY, -off, -cR3, 'I_R3', [200, 70, 20]);
    drawVertArrow(midX, topY + 10, midX, botY - 10, off, cR2, 'I_R2', [20, 150, 80]);

    // Equation panel
    const ex = eqLeft, ew = eqW;
    drawPanel(ex, ew);

    let ey = TAB_H + 14; const lh = 16;

    // KVL header
    fill(25, 75, 180); noStroke(); textSize(12); textAlign(LEFT, TOP);
    text("Kirchhoff's Voltage Law (KVL)", ex + 8, ey); ey += lh + 2;

    // Loop 1
    fill(30, 80, 220); textSize(10);
    text('Loop 1 (clockwise):', ex + 8, ey); ey += lh;
    fill(50); textSize(10);
    text('  V₁ − R₁·I₁ − R₂·(I₁+I₂) = 0', ex + 8, ey); ey += lh;
    const sum1 = V1 - R1*mI1 - R2*(mI1+mI2);
    text(`  ${V1} − ${R1}·${mI1.toFixed(2)} − ${R2}·${cR2.toFixed(2)}`, ex+8, ey); ey += lh;
    fill(abs(sum1) < 0.01 ? color(0,130,0) : color(180,0,0));
    text(`  = ${sum1.toFixed(4)}   ✓`, ex + 8, ey); ey += lh + 5;

    // Loop 2
    fill(200, 70, 20); textSize(10);
    text('Loop 2 (clockwise):', ex + 8, ey); ey += lh;
    fill(50); textSize(10);
    text('  V₂ − R₃·I₂ − R₂·(I₁+I₂) = 0', ex + 8, ey); ey += lh;
    const sum2 = V2 - R3*mI2 - R2*(mI1+mI2);
    text(`  ${V2} − ${R3}·${mI2.toFixed(2)} − ${R2}·${cR2.toFixed(2)}`, ex+8, ey); ey += lh;
    fill(abs(sum2) < 0.01 ? color(0,130,0) : color(180,0,0));
    text(`  = ${sum2.toFixed(4)}   ✓`, ex + 8, ey); ey += lh + 6;

    // KCL
    fill(20, 150, 70); textSize(12);
    text("Kirchhoff's Current Law (KCL)", ex + 8, ey); ey += lh;
    fill(20, 150, 70); textSize(10);
    text('At node A (currents leaving = 0):', ex + 8, ey); ey += lh;
    fill(50); textSize(10);
    text('  −I_R1 + I_R2 + (−I_R3) = 0', ex + 8, ey); ey += lh;
    const kclVal = -cR1 + cR2 + cR3;
    text(`  −${cR1.toFixed(3)} + ${cR2.toFixed(3)} + (${cR3.toFixed(3)})`, ex+8, ey); ey += lh;
    fill(abs(kclVal) < 0.01 ? color(0,130,0) : color(180,0,0));
    text(`  = ${kclVal.toFixed(4)}   ✓`, ex + 8, ey); ey += lh + 6;

    // Summary box
    fill(240); stroke(180); strokeWeight(1);
    rect(ex + 6, ey, ew - 12, 52, 4);
    fill(0); noStroke(); textSize(10);
    ey += 8;
    text(`I_R1 (→ thru R₁): ${cR1.toFixed(3)} A`, ex + 12, ey); ey += 15;
    text(`I_R2 (↓ thru R₂): ${cR2.toFixed(3)} A`, ex + 12, ey); ey += 15;
    text(`I_R3 (← thru R₃): ${(-cR3).toFixed(3)} A`, ex + 12, ey);
}

// ── MODE 1: Mesh Analysis ─────────────────────────────────────────────────────
function drawMeshMode() {
    drawBaseCircuit(true, true, false);

    // Circular mesh-current arrows
    drawMeshLoop(leftX, midX, topY, botY, [25, 80, 220], 'I₁');
    drawMeshLoop(midX, rightX, topY, botY, [200, 75, 20], 'I₂');

    // Equation panel
    const ex = eqLeft, ew = eqW;
    drawPanel(ex, ew);

    let ey = TAB_H + 14; const lh = 16;
    fill(25, 75, 180); noStroke(); textSize(12); textAlign(LEFT, TOP);
    text('Mesh Analysis', ex + 8, ey); ey += lh + 2;

    const det = R1*R2 + R1*R3 + R2*R3;

    fill(30, 80, 220); textSize(10);
    text('KVL — Mesh 1 (left loop):', ex + 8, ey); ey += lh;
    fill(50); textSize(10);
    text('  (R₁+R₂)I₁ + R₂·I₂ = V₁', ex + 8, ey); ey += lh;
    text(`  ${R1+R2}·I₁ + ${R2}·I₂ = ${V1}`, ex + 8, ey); ey += lh + 4;

    fill(200, 75, 20); textSize(10);
    text('KVL — Mesh 2 (right loop):', ex + 8, ey); ey += lh;
    fill(50); textSize(10);
    text('  R₂·I₁ + (R₂+R₃)I₂ = V₂', ex + 8, ey); ey += lh;
    text(`  ${R2}·I₁ + ${R2+R3}·I₂ = ${V2}`, ex + 8, ey); ey += lh + 4;

    fill(80); textSize(10);
    text(`  det = R₁R₂+R₁R₃+R₂R₃ = ${det.toFixed(2)}`, ex + 8, ey); ey += lh + 2;

    fill(0, 120, 0); textSize(11);
    text('Solution:', ex + 8, ey); ey += lh;
    fill(30, 80, 220); textSize(11);
    text(`  I₁ = ${mI1.toFixed(3)} A`, ex + 8, ey); ey += lh;
    fill(200, 75, 20);
    text(`  I₂ = ${mI2.toFixed(3)} A`, ex + 8, ey); ey += lh + 4;

    fill(50); textSize(10);
    text('Branch currents:', ex + 8, ey); ey += lh;
    text(`  I_R1 = I₁         = ${cR1.toFixed(3)} A  →`, ex + 8, ey); ey += lh;
    text(`  I_R2 = I₁+I₂      = ${cR2.toFixed(3)} A  ↓`, ex + 8, ey); ey += lh;
    text(`  I_R3 = I₂         = ${(-cR3).toFixed(3)} A  →`, ex + 8, ey); ey += lh + 4;

    fill(90); textSize(10);
    const P = V1*mI1 + V2*mI2;
    text(`  Power delivered: ${P.toFixed(3)} W`, ex + 8, ey);
}

// ── MODE 2: Node Analysis ─────────────────────────────────────────────────────
function drawNodeMode() {
    drawBaseCircuit(false, false, true);

    // Voltage labels on side nodes
    const midY = round((topY + botY) / 2);
    fill(30, 80, 220); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text(`V₁=${V1}V`, leftX + 14, midY);
    fill(200, 75, 20); textAlign(RIGHT, CENTER);
    text(`V₂=${V2}V`, rightX - 14, midY);
    fill(20, 150, 70); textAlign(CENTER, BOTTOM);
    text(`Vₐ=${VA.toFixed(2)}V`, midX, topY - 16);

    // Branch current arrows
    const off = 14;
    drawBranchArrow(leftX + 10, topY, midX - 10, topY, -off, cR1,  'I_R1', [30, 80, 220]);
    drawBranchArrow(midX + 10,  topY, rightX-10, topY, -off, -cR3, 'I_R3', [200, 70, 20]);
    drawVertArrow(midX, topY+10, midX, botY-10, off, cR2, 'I_R2', [20, 150, 80]);

    // Equation panel
    const ex = eqLeft, ew = eqW;
    drawPanel(ex, ew);

    let ey = TAB_H + 14; const lh = 16;
    fill(20, 150, 70); noStroke(); textSize(12); textAlign(LEFT, TOP);
    text('Node Analysis', ex + 8, ey); ey += lh + 2;

    fill(20, 150, 70); textSize(10);
    text('KCL at node A (currents leaving = 0):', ex + 8, ey); ey += lh;
    fill(50); textSize(10);
    text('  (Vₐ−V₁)/R₁ + Vₐ/R₂ + (Vₐ−V₂)/R₃ = 0', ex + 8, ey); ey += lh + 2;
    text('  Factor Vₐ:', ex + 8, ey); ey += lh;
    text('  Vₐ(1/R₁+1/R₂+1/R₃) = V₁/R₁ + V₂/R₃', ex + 8, ey); ey += lh;

    const G1 = 1/R1, G2 = 1/R2, G3 = 1/R3;
    const Gsum = G1 + G2 + G3;
    const rhs  = V1*G1 + V2*G3;
    text(`  Vₐ · ${Gsum.toFixed(4)} = ${rhs.toFixed(4)}`, ex + 8, ey); ey += lh + 4;

    fill(0, 120, 0); textSize(11);
    text('Solution:', ex + 8, ey); ey += lh;
    fill(20, 150, 70); textSize(12);
    text(`  Vₐ = ${VA.toFixed(3)} V`, ex + 8, ey); ey += lh + 4;

    fill(50); textSize(10);
    text('Branch currents:', ex + 8, ey); ey += lh;
    const iR1_node = (VA - V1) / R1;
    const iR2_node = VA / R2;
    const iR3_node = (VA - V2) / R3;
    text(`  I_R1=(Vₐ−V₁)/R₁ = ${iR1_node.toFixed(3)} A`, ex + 8, ey); ey += lh;
    text(`  I_R2= Vₐ/R₂     = ${iR2_node.toFixed(3)} A`, ex + 8, ey); ey += lh;
    text(`  I_R3=(Vₐ−V₂)/R₃ = ${iR3_node.toFixed(3)} A`, ex + 8, ey); ey += lh + 4;

    // KCL verification
    const kclCheck = iR1_node + iR2_node + iR3_node;
    fill(90); textSize(10);
    text(`  KCL check (sum = ${kclCheck.toFixed(4)})`, ex + 8, ey);
    ey += lh;
    fill(abs(kclCheck) < 0.001 ? color(0, 130, 0) : color(180, 0, 0)); textSize(10);
    text('  ΣI = 0   ✓', ex + 8, ey);
}

// ── Component drawing helpers ─────────────────────────────────────────────────

function drawResH(x, y, w, lbl, val) {
    push();
    stroke(0); strokeWeight(2.5); noFill();
    const ew = w * 0.14, peaks = 6;
    const pw = (w - 2*ew) / peaks, ph = 8;
    line(x, y, x+ew, y);
    line(x+w-ew, y, x+w, y);
    beginShape();
    vertex(x+ew, y);
    for (let i = 0; i < peaks; i++)
        vertex(x+ew + (i+0.5)*pw, i%2===0 ? y-ph : y+ph);
    vertex(x+w-ew, y);
    endShape();
    fill(0); noStroke(); textSize(10); textAlign(CENTER, BOTTOM);
    text(`${lbl}=${val}Ω`, x+w/2, y-ph-3);
    pop();
}

function drawResV(x, t, h, lbl, val) {
    push();
    stroke(0); strokeWeight(2.5); noFill();
    const eh = h*0.14, peaks = 6;
    const ph = (h - 2*eh)/peaks, pw = 8;
    line(x, t,       x, t+eh);
    line(x, t+h-eh,  x, t+h);
    beginShape();
    vertex(x, t+eh);
    for (let i = 0; i < peaks; i++)
        vertex(i%2===0 ? x+pw : x-pw, t+eh + (i+0.5)*ph);
    vertex(x, t+h-eh);
    endShape();
    fill(0); noStroke(); textSize(10); textAlign(LEFT, CENTER);
    text(`${lbl}=${val}Ω`, x+pw+5, t+h/2);
    pop();
}

function drawBat(x, midY, v, lbl) {
    push();
    stroke(0); strokeWeight(2);
    line(x, topY, x, midY - 16);
    line(x, midY + 16, x, botY);
    strokeWeight(4); line(x-12, midY-10, x+12, midY-10);  // long = +
    strokeWeight(2); line(x-7,  midY-2,  x+7,  midY-2);
    strokeWeight(4); line(x-12, midY+2,  x+12, midY+2);
    strokeWeight(2); line(x-7,  midY+10, x+7,  midY+10); // short = −
    fill(0); noStroke(); textSize(10);
    textAlign(RIGHT, CENTER);
    text('+', x-16, midY-10);
    text('−', x-16, midY+10);
    textAlign(LEFT, CENTER);
    text(`${lbl}=${v}V`, x+15, midY);
    pop();
}

function drawGnd(x, y) {
    push(); stroke(0); strokeWeight(2);
    line(x, y, x, y+8);
    line(x-10, y+8,  x+10, y+8);
    line(x-6,  y+12, x+6,  y+12);
    line(x-2,  y+16, x+2,  y+16);
    pop();
}

// Horizontal branch arrow (arrowhead if positive = rightward, else leftward)
function drawBranchArrow(x1, y, x2, yy, yOff, current, lbl, col) {
    if (abs(current) < 0.001) return;
    push();
    const c   = color(...col);
    const dir = current > 0 ? 1 : -1;
    const ax1 = dir > 0 ? x1 : x2;
    const ax2 = dir > 0 ? x2 : x1;
    const ay  = y + yOff;
    stroke(c); strokeWeight(1.5); fill(c);
    line(ax1, ay, ax2 - dir*7, ay);
    triangle(ax2, ay, ax2 - dir*8, ay-4, ax2 - dir*8, ay+4);
    noStroke(); textSize(9); textAlign(CENTER, BOTTOM);
    text(`${lbl}=${abs(current).toFixed(2)}A`, (x1+x2)/2, ay - 3);
    pop();
}

// Vertical branch arrow for R2 (downward if positive)
function drawVertArrow(x, y1, x2, y2, xOff, current, lbl, col) {
    if (abs(current) < 0.001) return;
    push();
    const c   = color(...col);
    const dir = current > 0 ? 1 : -1;
    const ax  = x + xOff;
    const ay1 = dir > 0 ? y1 : y2;
    const ay2 = dir > 0 ? y2 : y1;
    stroke(c); strokeWeight(1.5); fill(c);
    line(ax, ay1, ax, ay2 - dir*7);
    triangle(ax, ay2, ax-4, ay2 - dir*8, ax+4, ay2 - dir*8);
    noStroke(); textSize(9); textAlign(LEFT, CENTER);
    text(`${lbl}=${abs(current).toFixed(2)}A`, ax + 6, (y1+y2)/2);
    pop();
}

// Circular mesh-current loop arrow (clockwise)
function drawMeshLoop(x1, x2, y1, y2, col, lbl) {
    push();
    const cx = (x1+x2)/2, cy = (y1+y2)/2;
    const rx = (x2-x1)*0.30, ry = (y2-y1)*0.28;
    stroke(color(...col)); strokeWeight(2); noFill();
    // Draw arc (nearly full circle, gap at start for arrowhead)
    arc(cx, cy, rx*2, ry*2, 0.25, TWO_PI - 0.25);
    // Arrowhead at end of arc (clockwise → arrowhead pointing downward-left at top)
    const ang = TWO_PI - 0.25;
    const ax = cx + rx * cos(ang), ay = cy + ry * sin(ang);
    const tx = -rx * sin(ang), ty = ry * cos(ang);   // tangent direction (CW)
    const tlen = sqrt(tx*tx + ty*ty);
    const ndx = tx/tlen * 9, ndy = ty/tlen * 9;
    fill(color(...col)); noStroke();
    triangle(ax, ay, ax - ndx + ndy*0.4, ay - ndy - ndx*0.4,
                     ax - ndx - ndy*0.4, ay - ndy + ndx*0.4);
    // Label
    fill(color(...col)); noStroke(); textSize(13); textAlign(CENTER, CENTER);
    text(lbl, cx, cy);
    pop();
}

function drawPanel(ex, ew) {
    fill(245, 248, 255); stroke(185); strokeWeight(1);
    rect(ex, TAB_H + 6, ew, drawHeight - TAB_H - 12, 6);
}

// ── Controls ──────────────────────────────────────────────────────────────────
function drawControls() {
    fill(245); stroke(200); strokeWeight(1);
    rect(0, drawHeight, containerWidth, controlHeight);

    drawSlider('V₁:', V1, 1, 20,  sy1, ' V');
    drawSlider('V₂:', V2, 0, 20,  sy2, ' V');
    drawSlider('R₁:', R1, 1, 20,  sy3, ' Ω');
    drawSlider('R₂:', R2, 1, 20,  sy4, ' Ω');
    drawSlider('R₃:', R3, 1, 20,  sy5, ' Ω');
}

function drawSlider(label, value, lo, hi, y, suffix) {
    fill(50); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text(label + ' ' + value + suffix, sliderX - 8, y);
    fill(200); stroke(160); strokeWeight(1);
    rect(sliderX, y-4, sliderWidth, 8, 4);
    const fw = map(value, lo, hi, 0, sliderWidth);
    fill(60, 110, 200); noStroke();
    rect(sliderX, y-4, fw, 8, 4);
    fill(255); stroke(60, 110, 200); strokeWeight(2);
    ellipse(sliderX + fw, y, 14, 14);
}

// ── Interaction ────────────────────────────────────────────────────────────────
function mousePressed() {
    for (let i = 0; i < 3; i++) {
        const t = tabBtns[i];
        if (mouseX >= t.x && mouseX <= t.x+t.w &&
            mouseY >= t.y && mouseY <= t.y+t.h) {
            mode = i; return;
        }
    }
    handleSliders(mouseX, mouseY);
}

function mouseDragged() { handleSliders(mouseX, mouseY); }

function handleSliders(mx, my) {
    function rd(y, lo, hi) {
        if (my >= y-11 && my <= y+11 && mx >= sliderX && mx <= sliderX+sliderWidth)
            return round(constrain(map(mx, sliderX, sliderX+sliderWidth, lo, hi), lo, hi));
        return null;
    }
    let changed = false, v;
    if ((v = rd(sy1, 1, 20)) !== null) { V1 = v; changed = true; }
    if ((v = rd(sy2, 0, 20)) !== null) { V2 = v; changed = true; }
    if ((v = rd(sy3, 1, 20)) !== null) { R1 = v; changed = true; }
    if ((v = rd(sy4, 1, 20)) !== null) { R2 = v; changed = true; }
    if ((v = rd(sy5, 1, 20)) !== null) { R3 = v; changed = true; }
    if (changed) solve();
}

// ── Responsive ────────────────────────────────────────────────────────────────
function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    computeLayout();
}

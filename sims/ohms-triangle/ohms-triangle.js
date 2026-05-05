// Ohm's Law Triangle and Calculator MicroSim
//
// Click any section of the triangle to "cover" it — that quantity
// becomes the unknown.  The two sliders control the known values and
// the result updates live.  Power P is always shown as a bonus.
//
//         ╱▔▔▔╲
//        ╱  V  ╲          V = I × R
//       ╱───┬───╲         I = V / R
//      │ I  │  R │        R = V / I
//       ╲───┴───╱

'use strict';

// ── Canvas layout ─────────────────────────────────────────────────────────────
let drawHeight    = 420;
let controlHeight = 120;
let canvasHeight;
let containerWidth;

// ── Mode: which quantity is the unknown ──────────────────────────────────────
let solving = 0;   // 0 = solve V,  1 = solve I,  2 = solve R

// ── Adjustable knowns (persist across mode switches) ─────────────────────────
let knownV  = 12;    // V   (used when solving = 1 or 2)
let knownI  = 100;   // mA  (used when solving = 0 or 2)
let knownR  = 120;   // Ω   (used when solving = 0 or 1)

// ── Computed display values (set by solve()) ──────────────────────────────────
let dispV, dispI, dispR, dispP;

// ── Triangle geometry (computed in computeLayout()) ───────────────────────────
let tTop, tBotL, tBotR, tBotM;    // outer triangle vertices + bottom midpoint
let tMidL, tMidR, tMidC;          // midpoints of angled edges + their centre

let triCX, triCY;                  // triangle visual centre

// ── Slider layout ─────────────────────────────────────────────────────────────
const SL_LEFT = 225;
let sliderX, sliderWidth;
let sy1, sy2;

// ── Circuits 1 design-system palette ─────────────────────────────────────────
const COL_BG_DRAW = '#eef1fb';        // light indigo tint – drawing area
const COL_BG_CTRL = '#dde1f0';        // muted indigo – control area
const COL_DEEP    = [26,  35, 126];   // dark indigo – titles
const COL_PRIMARY = [57,  73, 171];   // indigo – buttons
const COL_ACCENT  = [92, 107, 192];   // medium indigo
const COL_V = [249, 168,  37];        // amber gold – voltage
const COL_I = [57,  73,  171];        // indigo – current
const COL_R = [46,  125,  50];        // green – resistance
const COL_P = [92,  107, 192];        // medium indigo – power

// ═════════════════════════════════════════════════════════════════════════════
// SETUP
// ═════════════════════════════════════════════════════════════════════════════
function setup() {
    updateCanvasSize();
    canvasHeight = drawHeight + controlHeight;
    createCanvas(containerWidth, canvasHeight).parent(document.querySelector('main'));
    computeLayout();
    solve();
}

function updateCanvasSize() {
    containerWidth = max(480, floor(
        document.querySelector('main').getBoundingClientRect().width
    ));
}

function computeLayout() {
    // Triangle: centred in the left ~46 % of the canvas
    triCX = floor(containerWidth * 0.24);
    triCY = floor(drawHeight * 0.47);
    const hw = min(floor(containerWidth * 0.20), 130);  // half-base width
    const h  = floor(hw * 1.73);                        // equilateral height

    tTop  = { x: triCX,      y: triCY - round(h * 2/3) };
    tBotL = { x: triCX - hw, y: triCY + round(h / 3)   };
    tBotR = { x: triCX + hw, y: triCY + round(h / 3)   };
    tBotM = { x: triCX,      y: tBotL.y                 };

    // Midpoints of the two slanted sides (mark the dividing line)
    tMidL = midPt(tTop, tBotL);
    tMidR = midPt(tTop, tBotR);
    tMidC = { x: triCX, y: round((tMidL.y + tMidR.y) / 2) };

    sliderX     = SL_LEFT;
    sliderWidth = containerWidth - SL_LEFT - 18;
    sy1 = drawHeight + 34;
    sy2 = drawHeight + 82;
}

function midPt(a, b) { return { x: round((a.x + b.x)/2), y: round((a.y + b.y)/2) }; }

// ═════════════════════════════════════════════════════════════════════════════
// SOLVER
// ═════════════════════════════════════════════════════════════════════════════
function solve() {
    const I_A = knownI / 1000;
    let V, I_out, R;

    if (solving === 0) {
        I_out = I_A;
        R     = knownR;
        V     = I_out * R;
    } else if (solving === 1) {
        V     = knownV;
        R     = knownR;
        I_out = R > 0 ? V / R : 0;
    } else {
        V     = knownV;
        I_out = I_A;
        R     = I_out > 0 ? V / I_out : 0;
    }

    dispV = V;
    dispI = I_out * 1000;   // A → mA for display
    dispR = R;
    dispP = V * I_out;
}

// ═════════════════════════════════════════════════════════════════════════════
// DRAW LOOP
// ═════════════════════════════════════════════════════════════════════════════
function draw() {
    // Drawing area
    background(COL_BG_DRAW);
    // Control area
    noStroke(); fill(COL_BG_CTRL);
    rect(0, drawHeight, containerWidth, controlHeight);

    // Title
    fill(...COL_DEEP); noStroke(); textSize(16); textStyle(BOLD); textAlign(CENTER, TOP);
    text("Ohm's Law — Triangle & Calculator", containerWidth / 2, 8);
    textStyle(NORMAL);
    fill(...COL_ACCENT); textSize(11);
    text('Click a section of the triangle to solve for that quantity.', containerWidth / 2, 30);

    drawTriangle();
    drawPanel();
    drawControls();
}

// ═════════════════════════════════════════════════════════════════════════════
// TRIANGLE
// ═════════════════════════════════════════════════════════════════════════════
function drawTriangle() {
    // ── Section fills ──────────────────────────────────────────────────────
    // Covered section gets a dark semi-transparent overlay; others use full colour
    drawSect([tTop,  tMidL, tMidC, tMidR], secCol(0));   // V  — top kite
    drawSect([tMidL, tBotL, tBotM, tMidC], secCol(1));   // I  — bottom-left
    drawSect([tMidC, tBotM, tBotR, tMidR], secCol(2));   // R  — bottom-right

    // ── Internal dividing lines ────────────────────────────────────────────
    stroke(50); strokeWeight(2);
    line(tMidL.x, tMidL.y, tMidR.x, tMidR.y);   // horizontal
    line(tMidC.x, tMidC.y, tBotM.x,  tBotM.y);   // vertical

    // ── Outer border ───────────────────────────────────────────────────────
    noFill(); stroke(30); strokeWeight(2);
    triangle(tTop.x, tTop.y, tBotL.x, tBotL.y, tBotR.x, tBotR.y);

    // ── Section labels ─────────────────────────────────────────────────────
    const centres = [
        cg(tTop,  tMidL, tMidC, tMidR),
        cg(tMidL, tBotL, tBotM, tMidC),
        cg(tMidC, tBotM, tBotR, tMidR),
    ];
    const syms = ['V', 'I', 'R'];
    const fSize = constrain(floor(containerWidth * 0.038), 16, 26);

    for (let s = 0; s < 3; s++) {
        const c = centres[s];
        noStroke(); textSize(fSize); textAlign(CENTER, CENTER);
        if (solving === s) {
            // "covered" section: show ? in white with circular indicator
            fill(255, 255, 255, 200);
            ellipse(c.x, c.y, fSize * 1.6, fSize * 1.6);
            fill(30); text('?', c.x, c.y);
        } else {
            fill(20); text(syms[s], c.x, c.y);
        }
    }

    // ── Formula for the unknown ────────────────────────────────────────────
    const formulas = ['V = I × R', 'I = V / R', 'R = V / I'];
    fill(20); noStroke(); textSize(14); textAlign(CENTER, TOP);
    text(formulas[solving], triCX, tBotL.y + 16);

    // ── Instruction ────────────────────────────────────────────────────────
    fill(140); noStroke(); textSize(10); textAlign(CENTER, TOP);
    text('tap a section to solve for that quantity', triCX, tBotL.y + 36);
}

function drawSect(pts, col) {
    fill(col); stroke(50); strokeWeight(1);
    beginShape();
    for (const p of pts) vertex(p.x, p.y);
    endShape(CLOSE);
}

function secCol(s) {
    const cols = [COL_V, COL_I, COL_R];
    return solving === s
        ? color(60, 60, 60, 55)           // dimmed/covered
        : color(...cols[s]);
}

function cg(...pts) {   // centroid of any number of {x,y} points
    return {
        x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
        y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
    };
}

// ═════════════════════════════════════════════════════════════════════════════
// CALCULATOR PANEL  (right half)
// ═════════════════════════════════════════════════════════════════════════════
function drawPanel() {
    const px = floor(containerWidth * 0.51);
    const pw = containerWidth - px - 10;
    const pY = 28;
    const pH = drawHeight - pY - 10;

    // Panel background
    fill(238, 241, 255); stroke(...COL_PRIMARY, 60); strokeWeight(1.5);
    rect(px, pY, pw, pH, 8);

    // Panel header strip
    noStroke(); fill(...COL_DEEP);
    rect(px, pY, pw, 28, 8, 8, 0, 0);
    fill(255); textSize(12); textStyle(BOLD); textAlign(CENTER, CENTER);
    text('Values & Results', px + pw/2, pY + 14);
    textStyle(NORMAL);

    let ey = pY + 34;
    const lh = 54;

    fill(...COL_ACCENT); noStroke(); textSize(11); textAlign(LEFT, TOP);

    valueRow(px+8, ey, pw-16, COL_V, 'V', 'Voltage',    fmtV(dispV), solving===0); ey += lh;
    valueRow(px+8, ey, pw-16, COL_I, 'I', 'Current',    fmtI(dispI), solving===1); ey += lh;
    valueRow(px+8, ey, pw-16, COL_R, 'R', 'Resistance', fmtR(dispR), solving===2); ey += lh;

    stroke(200); strokeWeight(1);
    line(px+14, ey-6, px+pw-14, ey-6);

    valueRow(px+8, ey, pw-16, COL_P, 'P', 'Power', fmtP(dispP), false); ey += lh;

    fill(140); noStroke(); textSize(9); textAlign(LEFT, TOP);
    text('P = V·I  =  I²·R  =  V²/R', px + 14, ey - 2);
}

function valueRow(x, y, w, col, sym, name, valStr, isResult) {
    const c = color(...col);

    // Row background
    if (isResult) {
        fill(red(c), green(c), blue(c), 45);
        stroke(c); strokeWeight(2);
    } else {
        fill(250); stroke(215); strokeWeight(1);
    }
    rect(x, y, w, 46, 6);

    // Symbol badge
    fill(c); noStroke();
    rect(x+4, y+5, 36, 36, 5);
    fill(20); noStroke(); textSize(18); textAlign(CENTER, CENTER);
    text(sym, x+22, y+23);

    // Label
    fill(100); noStroke(); textSize(9); textAlign(LEFT, TOP);
    text(name, x+48, y+7);

    // Value  — large if result
    const vSize = isResult ? 16 : 14;
    fill(isResult ? color(max(0,red(c)-70), max(0,green(c)-70), max(0,blue(c)-70)) : 25);
    noStroke(); textSize(vSize); textAlign(RIGHT, CENTER);
    text(valStr, x+w-8, y+23);

    // "RESULT" badge
    if (isResult) {
        fill(max(0,red(c)-60), max(0,green(c)-60), max(0,blue(c)-60));
        noStroke(); textSize(8); textAlign(LEFT, BOTTOM);
        text('RESULT', x+48, y+40);
    }
}

// ── Number formatters ─────────────────────────────────────────────────────────
function fmtV(v)  { return v.toFixed(2) + ' V'; }
function fmtI(mA) {
    if (mA >= 1000) return (mA/1000).toFixed(3) + ' A';
    return mA.toFixed(1) + ' mA';
}
function fmtR(r)  {
    if (r >= 1000) return (r/1000).toFixed(2) + ' kΩ';
    return r.toFixed(1) + ' Ω';
}
function fmtP(w)  {
    if (w >= 1)     return w.toFixed(3) + ' W';
    if (w >= 0.001) return (w*1000).toFixed(2) + ' mW';
    return (w*1e6).toFixed(1) + ' µW';
}

// ═════════════════════════════════════════════════════════════════════════════
// CONTROLS
// ═════════════════════════════════════════════════════════════════════════════
function drawControls() {
    // Background is already drawn in draw()
    fill(...COL_DEEP); noStroke(); textSize(11); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Adjust the two known values:', 12, drawHeight + 13);
    textStyle(NORMAL);

    if (solving === 0) {
        drawSlider('Current I:',    knownI, 1, 500,  sy1, ' mA', COL_I);
        drawSlider('Resistance R:', knownR, 1, 1000, sy2, ' Ω',  COL_R);
    } else if (solving === 1) {
        drawSlider('Voltage V:',    knownV, 1, 50,   sy1, ' V',  COL_V);
        drawSlider('Resistance R:', knownR, 1, 1000, sy2, ' Ω',  COL_R);
    } else {
        drawSlider('Voltage V:',    knownV, 1, 50,   sy1, ' V',  COL_V);
        drawSlider('Current I:',    knownI, 1, 500,  sy2, ' mA', COL_I);
    }
}

function drawSlider(label, value, lo, hi, y, suffix, col) {
    fill(40); noStroke(); textSize(11); textAlign(RIGHT, CENTER);
    text(label + ' ' + round(value) + suffix, sliderX - 8, y);

    fill(210); stroke(160); strokeWeight(1);
    rect(sliderX, y-5, sliderWidth, 10, 5);

    const fw = map(value, lo, hi, 0, sliderWidth);
    fill(color(...col)); noStroke();
    rect(sliderX, y-5, fw, 10, 5);

    fill(255); stroke(color(...col)); strokeWeight(2);
    ellipse(sliderX + fw, y, 16, 16);
}

// ═════════════════════════════════════════════════════════════════════════════
// INTERACTION
// ═════════════════════════════════════════════════════════════════════════════
function mousePressed() {
    const s = hitSection(mouseX, mouseY);
    if (s >= 0) { solving = s; solve(); return; }
    handleSliders(mouseX, mouseY);
}

function mouseDragged() { handleSliders(mouseX, mouseY); }

// ── Triangle hit test ─────────────────────────────────────────────────────────
function hitSection(mx, my) {
    if (!ptInTri(mx, my, tTop, tBotL, tBotR)) return -1;
    if (my <= tMidC.y)  return 0;   // V
    if (mx <= triCX)    return 1;   // I
    return 2;                        // R
}

function ptInTri(px, py, a, b, c) {
    const d1 = edgeSide(px, py, a, b);
    const d2 = edgeSide(px, py, b, c);
    const d3 = edgeSide(px, py, c, a);
    return !((d1<0||d2<0||d3<0) && (d1>0||d2>0||d3>0));
}

function edgeSide(px, py, a, b) {
    return (px - b.x) * (a.y - b.y) - (a.x - b.x) * (py - b.y);
}

// ── Slider interaction ────────────────────────────────────────────────────────
function handleSliders(mx, my) {
    function rd(y, lo, hi) {
        if (my < y-12 || my > y+12 || mx < sliderX || mx > sliderX+sliderWidth) return null;
        return round(constrain(map(mx, sliderX, sliderX+sliderWidth, lo, hi), lo, hi));
    }
    let changed = false, v;
    if (solving === 0) {
        if ((v = rd(sy1, 1, 500))  !== null) { knownI = v; changed = true; }
        if ((v = rd(sy2, 1, 1000)) !== null) { knownR = v; changed = true; }
    } else if (solving === 1) {
        if ((v = rd(sy1, 1, 50))   !== null) { knownV = v; changed = true; }
        if ((v = rd(sy2, 1, 1000)) !== null) { knownR = v; changed = true; }
    } else {
        if ((v = rd(sy1, 1, 50))   !== null) { knownV = v; changed = true; }
        if ((v = rd(sy2, 1, 500))  !== null) { knownI = v; changed = true; }
    }
    if (changed) solve();
}

// ═════════════════════════════════════════════════════════════════════════════
// RESPONSIVE
// ═════════════════════════════════════════════════════════════════════════════
function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    computeLayout();
}

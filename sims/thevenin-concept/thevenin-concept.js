// thevenin-equivalent.js
// Thevenin Equivalent Circuit MicroSim
// Chapter 4: Network Theorems — Thevenin's Theorem
//
// Circuit topology (original):
//
//   +──[R1]──+──o A
//   |        |
//  (Vs)     [R2]    Load RL between terminals A and B
//   |        |
//   +────────+──o B
//
// Values: Vs=12V, R1=4Ω, R2=8Ω  →  Vth=8V, Rth=8/3≈2.67Ω
//
// 5-Stage progression:
//   1: Original circuit with terminals A-B
//   2: Measure open-circuit voltage (Vth = V across R2)
//   3: Find Thevenin resistance (short Vs, compute R1∥R2)
//   4: Show Thevenin equivalent circuit
//   5: Connect load RL to both; verify identical VL and IL

// ── Layout ─────────────────────────────────────────────────
let cw;                             // canvas width (responsive)
const CIRC_H  = 252;                // circuit drawing region
const PLOT_H  = 198;                // I-V plot region
const CTRL_H  = 90;                 // controls region
const DRAW_H  = CIRC_H + PLOT_H;   // 450
let ch;

// ── Circuit constants ───────────────────────────────────────
const Vs  = 12;
const R1  = 4;
const R2  = 8;
const Vth = Vs * R2 / (R1 + R2);        // 8.0 V
const Rth = (R1 * R2) / (R1 + R2);      // 2.667 Ω
const Isc = Vth / Rth;                   // 3.0 A

// ── State ───────────────────────────────────────────────────
let stage = 1;
let RL    = 20;    // load resistance (Ω), 1–100

// ── UI ──────────────────────────────────────────────────────
let btns   = [];
let slider = { x: 0, y: 0, w: 0, dragging: false };

// ── Palette ─────────────────────────────────────────────────
const C_WIRE    = [20, 20, 20];
const C_R       = [50, 100, 205];
const C_VS      = [200, 55, 55];
const C_THEV    = [120, 40, 190];
const C_LOAD    = [45, 150, 70];
const C_TERM    = [25, 145, 85];
const C_HL      = [205, 150, 0];
const C_BTN     = [55, 90, 170];
const C_CIRC_BG = [237, 244, 255];

// ══════════════════════════════════════════════════════════
// p5.js LIFECYCLE
// ══════════════════════════════════════════════════════════

function setup() {
    updateSize();
    const canvas = createCanvas(cw, ch);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
}

function windowResized() {
    updateSize();
    resizeCanvas(cw, ch);
}

function updateSize() {
    const m = document.querySelector('main');
    cw = m ? max(520, m.getBoundingClientRect().width | 0) : 600;
    ch = DRAW_H + CTRL_H;
}

function draw() {
    background(248, 249, 252);
    drawCircuitRegion();
    drawPlotRegion();
    drawControlRegion();
}

// ══════════════════════════════════════════════════════════
// CIRCUIT REGION  (y: 0 → CIRC_H)
// ══════════════════════════════════════════════════════════

function drawCircuitRegion() {
    fill(...C_CIRC_BG);
    stroke(175, 190, 215);
    strokeWeight(1);
    rect(0, 0, cw, CIRC_H);

    // Vertical divider between the two circuit columns
    stroke(185); strokeWeight(1);
    line(cw / 2, 34, cw / 2, CIRC_H - 2);

    // Column headers
    noStroke(); textStyle(BOLD); textAlign(CENTER, TOP); textSize(13);
    fill(40, 75, 160);
    text('Original Circuit', cw * 0.25, 5);

    if (stage >= 4) {
        fill(100, 35, 175);
        text('Thévenin Equivalent', cw * 0.75, 5);
    } else {
        fill(150, 150, 175);
        text('Thévenin Equivalent', cw * 0.75, 5);
        textStyle(NORMAL); textSize(10); fill(130, 130, 160);
        text('(complete stages 1–3 to derive)', cw * 0.75, 21);
    }
    textStyle(NORMAL);

    const on = origNodes();
    drawOrigCircuit(on);

    if (stage >= 4) {
        drawThevCircuit(thevNodes());
    }

    if (stage === 2) annotateVth(on);
    if (stage === 3) annotateRth(on);
}

// ── Node geometry ───────────────────────────────────────────

function origNodes() {
    const hw   = cw * 0.5;
    const cx   = hw * 0.5;
    const cy   = CIRC_H * 0.54;
    const span = min(hw * 0.62, 188);
    const hh   = min(78, CIRC_H * 0.30);
    return {
        lx: cx - span * 0.50,   // battery center x
        jx: cx + span * 0.06,   // R1-R2 junction x
        tx: cx + span * 0.44,   // terminal x
        ty: cy - hh,            // top y
        by: cy + hh,            // bottom y
        cy
    };
}

function thevNodes() {
    const hw   = cw * 0.5;
    const cx   = cw * 0.5 + hw * 0.5;
    const cy   = CIRC_H * 0.54;
    const span = min(hw * 0.60, 180);
    const hh   = min(78, CIRC_H * 0.30);
    return {
        lx: cx - span * 0.46,   // Vth source x
        tx: cx + span * 0.38,   // terminal x
        ty: cy - hh,
        by: cy + hh,
        cy
    };
}

// ── Original circuit ────────────────────────────────────────

function drawOrigCircuit(n) {
    const { lx, jx, tx, ty, by, cy } = n;
    const srcShort = (stage === 3);

    // Full wires (drawn first; components drawn on top)
    stroke(...C_WIRE); strokeWeight(2.5);
    line(lx, ty, jx, ty);    // top: source column → junction
    line(jx, ty, tx, ty);    // top: junction → terminal A
    line(lx, by, jx, by);    // bottom: source column → junction
    line(jx, by, tx, by);    // bottom: junction → terminal B
    line(jx, ty, jx, by);    // vertical at junction (R2 lives here)

    if (srcShort) {
        // Stage 3: short-circuit the voltage source
        stroke(185, 65, 65); strokeWeight(2.5);
        line(lx, ty, lx, by);
        noStroke(); fill(165, 55, 55);
        textAlign(CENTER, CENTER); textSize(11);
        text('0V', lx, cy);
    } else {
        stroke(...C_WIRE); strokeWeight(2.5);
        line(lx, ty, lx, cy - 18);   // wire above source circle
        line(lx, cy + 18, lx, by);   // wire below source circle
        drawVSource(lx, cy, 'Vs', Vs + 'V', C_VS);
    }

    // R1 (horizontal, on top wire between lx and jx)
    const r1col = (stage === 3) ? C_HL : C_R;
    drawResistorH((lx + jx) * 0.5, ty, (jx - lx) * 0.74, 'R1', R1 + '\u03A9', r1col);

    // R2 (vertical, at jx between ty and by)
    const r2col = (stage === 2 || stage === 3) ? C_HL : C_R;
    drawResistorV(jx, (ty + by) * 0.5, (by - ty) * 0.64, 'R2', R2 + '\u03A9', r2col);

    // Terminals + optional load
    drawTerminals(tx, ty, by, stage === 5);

    if (stage === 5) showLoadValues(tx - 10, by);
}

// ── Thevenin equivalent circuit ─────────────────────────────

function drawThevCircuit(n) {
    const { lx, tx, ty, by, cy } = n;

    stroke(...C_WIRE); strokeWeight(2.5);
    line(lx, ty, tx, ty);          // top wire
    line(lx, by, tx, by);          // bottom wire
    line(lx, ty, lx, cy - 18);     // wire above Vth source
    line(lx, cy + 18, lx, by);     // wire below Vth source

    drawVSource(lx, cy, 'Vth', Vth.toFixed(1) + 'V', C_THEV);

    // Rth on top wire
    drawResistorH((lx + tx) * 0.5, ty, (tx - lx) * 0.64, 'Rth', Rth.toFixed(2) + '\u03A9', C_THEV);

    drawTerminals(tx, ty, by, stage === 5);

    if (stage === 5) showLoadValues(tx - 10, by);
}

function showLoadValues(cx, by) {
    const VL = Vth * RL / (Rth + RL);
    const IL = VL / RL;
    noStroke(); fill(25, 125, 50);
    textAlign(CENTER, TOP); textSize(12);
    text('VL = ' + VL.toFixed(2) + ' V', cx, by + 7);
    text('IL = ' + (IL * 1000).toFixed(1) + ' mA', cx, by + 23);
}

// ── Component symbol helpers ─────────────────────────────────

// Voltage source: circle with + / − , vertical orientation at (cx, cy)
function drawVSource(cx, cy, label, valStr, col) {
    const r = 17;
    fill(...C_CIRC_BG);          // hides the wire running behind the circle
    stroke(...col); strokeWeight(2);
    circle(cx, cy, r * 2);

    fill(...col); noStroke();
    textAlign(CENTER, CENTER); textSize(13);
    text('+', cx, cy - 7);
    text('\u2212', cx, cy + 7);   // minus sign

    textAlign(RIGHT, CENTER); textSize(11);
    text(label, cx - r - 4, cy - 8);
    fill(90); textSize(9);
    text(valStr, cx - r - 4, cy + 7);
}

// Horizontal zigzag resistor, centered at (cx, cy), visual width totalW
function drawResistorH(cx, cy, totalW, label, valStr, col) {
    const bw  = totalW * 0.38;   // half-body width
    const amp = 7;
    const seg = 5;

    stroke(...col); strokeWeight(2.5); noFill();
    beginShape();
    vertex(cx - bw, cy);
    for (let i = 0; i < seg; i++) {
        vertex(lerp(cx - bw, cx + bw, (i + 0.25) / seg), cy + (i % 2 === 0 ? -amp : amp));
        vertex(lerp(cx - bw, cx + bw, (i + 0.75) / seg), cy + (i % 2 === 0 ? amp : -amp));
    }
    vertex(cx + bw, cy);
    endShape();

    noStroke(); fill(...col);
    textAlign(CENTER, BOTTOM); textSize(11);
    text(label, cx, cy - amp - 2);
    fill(90); textSize(9);
    text(valStr, cx, cy - amp - 14);
}

// Vertical zigzag resistor, centered at (cx, cy), visual height totalH
function drawResistorV(cx, cy, totalH, label, valStr, col) {
    const bh  = totalH * 0.38;
    const amp = 7;
    const seg = 5;

    stroke(...col); strokeWeight(2.5); noFill();
    beginShape();
    vertex(cx, cy - bh);
    for (let i = 0; i < seg; i++) {
        vertex(cx + (i % 2 === 0 ? -amp : amp), lerp(cy - bh, cy + bh, (i + 0.25) / seg));
        vertex(cx + (i % 2 === 0 ? amp : -amp), lerp(cy - bh, cy + bh, (i + 0.75) / seg));
    }
    vertex(cx, cy + bh);
    endShape();

    noStroke(); fill(...col);
    textAlign(LEFT, CENTER); textSize(11);
    text(label, cx + amp + 5, cy - 8);
    fill(90); textSize(9);
    text(valStr, cx + amp + 5, cy + 7);
}

// Terminal dots at (tx, ty) and (tx, by) with optional load resistor
function drawTerminals(tx, ty, by, showLoad) {
    fill(...C_TERM); stroke(...C_TERM); strokeWeight(1.5);
    circle(tx, ty, 10);
    circle(tx, by, 10);

    noStroke(); fill(...C_TERM);
    textAlign(LEFT, CENTER); textSize(13);
    text('A', tx + 7, ty);
    text('B', tx + 7, by);

    if (!showLoad) return;

    const lx = tx + 32;
    stroke(...C_LOAD); strokeWeight(2);
    line(tx, ty, lx, ty);
    line(tx, by, lx, by);
    drawResistorV(lx, (ty + by) * 0.5, (by - ty) * 0.64, 'RL', RL.toFixed(0) + '\u03A9', C_LOAD);
}

// ── Stage annotations ────────────────────────────────────────

function annotateVth(n) {
    const { jx, ty, by } = n;
    // Yellow highlight behind R2
    fill(255, 240, 100, 90); noStroke();
    rect(jx - 20, ty, 40, by - ty, 4);

    // Formula label below circuit
    noStroke(); fill(125, 90, 0);
    textAlign(CENTER, BOTTOM); textStyle(BOLD); textSize(13);
    text('Vth = 8.0 V  (= voltage across R2)', cw * 0.25, CIRC_H - 3);
    textStyle(NORMAL);
}

function annotateRth(n) {
    const { lx, jx, ty, by } = n;
    // Purple highlight box around the R1 + source region
    fill(215, 200, 255, 80); stroke(120, 70, 210); strokeWeight(1);
    rect(lx - 28, ty - 8, jx - lx + 36, by - ty + 16, 4);

    // Formula label below circuit
    noStroke(); fill(85, 35, 165);
    textAlign(CENTER, BOTTOM); textStyle(BOLD); textSize(13);
    text('Rth = R1\u2225R2 = (4\xD78)/(4+8) = 2.67 \u03A9', cw * 0.25, CIRC_H - 3);
    textStyle(NORMAL);
}

// ══════════════════════════════════════════════════════════
// I-V PLOT REGION  (y: CIRC_H → DRAW_H)
// ══════════════════════════════════════════════════════════

function drawPlotRegion() {
    const y0 = CIRC_H;
    const pL = 60, pR = 25;
    const pT = y0 + 24;
    const pW = cw - pL - pR;
    const pH = PLOT_H - 44;

    fill(252, 252, 244); stroke(185); strokeWeight(1);
    rect(0, y0, cw, PLOT_H);

    noStroke(); fill(45);
    textAlign(CENTER, TOP); textStyle(BOLD); textSize(13);
    text('I-V Characteristic  (Terminals A-B)', cw / 2, y0 + 5);
    textStyle(NORMAL);

    fill(255); stroke(145); strokeWeight(1);
    rect(pL, pT, pW, pH);

    // Placeholder while Thevenin params are not yet known
    if (stage < 4) {
        noStroke(); fill(160);
        textAlign(CENTER, CENTER); textSize(12);
        text('I-V curve appears after Stage 3.', pL + pW / 2, pT + pH / 2 - 8);
        text('Derive Vth and Rth first (stages 1-3).', pL + pW / 2, pT + pH / 2 + 10);
        return;
    }

    // Axis extents with headroom
    const VMAX = Vth * 1.18;
    const IMAX = Isc * 1.18;
    const toX  = v => pL + (v / VMAX) * pW;
    const toY  = i => pT + pH - (i / IMAX) * pH;

    // Grid lines and axis tick labels
    const nV = 4, nI = 4;
    stroke(218); strokeWeight(0.5);
    for (let k = 0; k <= nV; k++) {
        const gx = pL + (k / nV) * pW;
        line(gx, pT, gx, pT + pH);
        noStroke(); fill(110);
        textAlign(CENTER, TOP); textSize(10);
        text((k * Vth / nV).toFixed(1) + 'V', gx, pT + pH + 2);
        stroke(218); strokeWeight(0.5);
    }
    for (let k = 0; k <= nI; k++) {
        const gy = pT + pH - (k / nI) * pH;
        line(pL, gy, pL + pW, gy);
        noStroke(); fill(110);
        textAlign(RIGHT, CENTER); textSize(10);
        text((k * Isc / nI).toFixed(1), pL - 3, gy);
        stroke(218); strokeWeight(0.5);
    }

    // Axis labels
    noStroke(); fill(70);
    textAlign(CENTER, TOP); textSize(11);
    text('Voltage (V)', pL + pW / 2, pT + pH + 15);
    push();
    translate(pL - 44, pT + pH / 2);
    rotate(-HALF_PI);
    textAlign(CENTER, CENTER); textSize(11);
    text('Current (A)', 0, 0);
    pop();

    // Theoretical Thevenin I-V line:  I = (Vth - V) / Rth
    stroke(150, 145, 215); strokeWeight(2); noFill();
    line(toX(0), toY(Isc), toX(Vth), toY(0));

    // Annotate endpoints
    noStroke(); fill(130, 125, 200);
    circle(toX(0),   toY(Isc), 6);
    circle(toX(Vth), toY(0),   6);
    textSize(9);
    textAlign(LEFT, CENTER);
    text('Isc = ' + Isc.toFixed(1) + ' A', toX(0) + 4, toY(Isc));
    textAlign(CENTER, BOTTOM);
    text('Voc = ' + Vth.toFixed(1) + ' V', toX(Vth), toY(0) - 4);

    // Stage 5: swept operating points + highlighted current RL
    if (stage === 5) {
        fill(210, 75, 42, 200); noStroke();
        for (let r = 1; r <= 100; r += 2) {
            const V = Vth * r / (Rth + r);
            circle(toX(V), toY(V / r), 5);
        }

        const VL = Vth * RL / (Rth + RL);
        const IL = VL / RL;
        stroke(210, 75, 42); strokeWeight(2.5); fill(255);
        circle(toX(VL), toY(IL), 14);
        noStroke(); fill(155, 40, 10);
        textAlign(LEFT, CENTER); textSize(11);
        text('RL = ' + RL.toFixed(0) + ' \u03A9', toX(VL) + 10, toY(IL));

        // Legend
        fill(210, 75, 42);
        circle(pL + 7, pT + 11, 7);
        fill(45); textAlign(LEFT, CENTER); textSize(11);
        text('Original circuit \u2261 Th\u00E9venin equivalent (both trace the same line!)',
             pL + 16, pT + 11);
    }
}

// ══════════════════════════════════════════════════════════
// CONTROL REGION  (y: DRAW_H → ch)
// ══════════════════════════════════════════════════════════

const STAGE_INFO = [
    'Stage 1 \u2013 Original circuit: Vs=12V, R1=4\u03A9, R2=8\u03A9.  Click \u201CFind Vth \u2192\u201D to measure the open-circuit voltage.',
    'Stage 2 \u2013 Open circuit (no load): Vth = Vs\xD7R2/(R1+R2) = 12\xD78/12 = 8.0 V.  Click \u201CFind Rth \u2192\u201D next.',
    'Stage 3 \u2013 Short Vs, look into terminals: Rth = R1\u2225R2 = (4\xD78)/(4+8) = 2.67 \u03A9.  Click \u201CShow Equiv \u2192\u201D.',
    'Stage 4 \u2013 Th\u00E9venin equivalent: 8V source + 2.67\u03A9 in series.  Identical to original at terminals A-B!',
    'Stage 5 \u2013 Load connected to both circuits.  Drag the slider \u2014 VL and IL are identical on both sides.',
];

function drawControlRegion() {
    const y0 = DRAW_H;
    fill(241, 241, 244); stroke(185); strokeWeight(1);
    rect(0, y0, cw, CTRL_H);

    noStroke(); fill(45);
    textAlign(LEFT, TOP); textSize(12);
    text(STAGE_INFO[stage - 1], 12, y0 + 8, cw - 24);

    buildBtns(y0);
    for (const b of btns) drawBtn(b);
    if (stage === 5) drawSlider(y0);
}

function buildBtns(y0) {
    btns = [];
    const by = y0 + 52, bh = 28;
    let bx = 12;
    const add = (id, lbl, w) => {
        btns.push({ id, lbl, x: bx, y: by, w, h: bh });
        bx += w + 8;
    };
    if      (stage === 1) add('findVth',     'Find Vth \u2192',        120);
    else if (stage === 2) add('findRth',     'Find Rth \u2192',        120);
    else if (stage === 3) add('showEquiv',   'Show Equiv \u2192',      140);
    else if (stage === 4) add('connectLoad', 'Connect Load \u2192',    155);
    add('reset', '\u21BA Reset', 88);
}

function drawBtn(b) {
    const hov = (mouseX >= b.x && mouseX <= b.x + b.w &&
                 mouseY >= b.y && mouseY <= b.y + b.h);
    fill(hov ? [78, 118, 202] : C_BTN);
    stroke(28, 58, 140); strokeWeight(1);
    rect(b.x, b.y, b.w, b.h, 5);
    noStroke(); fill(255);
    textAlign(CENTER, CENTER); textSize(13);
    text(b.lbl, b.x + b.w / 2, b.y + b.h / 2);
}

function drawSlider(y0) {
    const sy = y0 + 66;
    const sx = 240;
    const sw = cw - sx - 24;
    const sv = map(RL, 1, 100, 0, sw);
    slider.x = sx; slider.y = sy; slider.w = sw;

    noStroke(); fill(45);
    textAlign(RIGHT, CENTER); textSize(13);
    text('Load RL: ' + RL.toFixed(0) + ' \u03A9', sx - 8, sy);

    stroke(188); strokeWeight(6); strokeCap(ROUND);
    line(sx, sy, sx + sw, sy);
    stroke(80, 130, 200);
    line(sx, sy, sx + sv, sy);
    fill(255); stroke(55, 100, 185); strokeWeight(2);
    circle(sx + sv, sy, 18);
}

// ══════════════════════════════════════════════════════════
// MOUSE INTERACTION
// ══════════════════════════════════════════════════════════

function mousePressed() {
    for (const b of btns) {
        if (mouseX >= b.x && mouseX <= b.x + b.w &&
            mouseY >= b.y && mouseY <= b.y + b.h) {
            handleBtn(b.id);
            return;
        }
    }
    if (stage === 5) {
        const sv = map(RL, 1, 100, 0, slider.w);
        if (dist(mouseX, mouseY, slider.x + sv, slider.y) < 14) {
            slider.dragging = true;
        }
    }
}

function mouseDragged() {
    if (slider.dragging) {
        RL = constrain(map(mouseX, slider.x, slider.x + slider.w, 1, 100), 1, 100);
    }
}

function mouseReleased() {
    slider.dragging = false;
}

function handleBtn(id) {
    switch (id) {
        case 'findVth':     stage = 2; break;
        case 'findRth':     stage = 3; break;
        case 'showEquiv':   stage = 4; break;
        case 'connectLoad': stage = 5; break;
        case 'reset':       stage = 1; RL = 20; break;
    }
}

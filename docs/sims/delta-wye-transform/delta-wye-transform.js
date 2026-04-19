'use strict';

// ── Palette ──────────────────────────────────────────────────────────────────
const COL_BG      = [245, 248, 252];
const COL_PANEL   = [255, 255, 255];
const COL_WIRE    = [50,  55,  70];
const COL_NODE    = [40, 100, 200];
const COL_DELTA   = [210,  65,  45];   // red-orange for Δ
const COL_WYE     = [25,  150,  75];   // green for Y
const COL_RESULT  = [25,  100, 195];
const COL_SEG_BG  = [215, 220, 232];
const COL_SEG_ACT = [50,  110, 220];

// ── State ─────────────────────────────────────────────────────────────────────
let mode    = 0;                   // 0 = Δ→Y, 1 = Y→Δ
let inVals  = [30, 60, 90];        // Ra/Rb/Rc  or  R1/R2/R3
let outVals = [null, null, null];
const R_MIN = 1, R_MAX = 200;

// ── Canvas ────────────────────────────────────────────────────────────────────
let cw;
const canvasH = 740;

// ── Layout constants ──────────────────────────────────────────────────────────
const LABEL_W      = 52;
const INPUT_W      = 68;
const UNIT_W       = 24;
const TRACK_PAD_L  = 20;
const TRACK_OFFS   = LABEL_W + INPUT_W + UNIT_W + 12;   // 156
const TRACK_PAD_R  = 82;

let trackStart, trackEnd, trackLen;

const SEG_W = 210, SEG_H = 32;
let segX;
const SEG_Y = 60;

const DIAG_Y      = 232;          // vertical centre of both diagrams
const PAN_TOP     = 98;
const PAN_H       = 265;
const SLIDER_PAN_Y = 371;
const SLOT_BASE   = SLIDER_PAN_Y + 30;   // 401
const SLOT_GAP    = 38;

// ── DOM sliders + inputs ──────────────────────────────────────────────────────
let sliders  = [];
let inpElems = [];

// ── Helpers ───────────────────────────────────────────────────────────────────
function fillA(col, a) { fill(col[0], col[1], col[2], a); }

function fmtRU(v) {
    if (v === null || v === undefined) return '\u2014';
    if (v >= 1000) return nf(v / 1000, 0, 2) + 'k\u03A9';
    if (v >= 100)  return nf(v, 0, 1) + '\u03A9';
    if (v >= 10)   return nf(v, 0, 1) + '\u03A9';
    return nf(v, 0, 2) + '\u03A9';
}

// ── Setup ─────────────────────────────────────────────────────────────────────
function setup() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 900);
    cw = max(cw, 500);
    let cnv = createCanvas(cw, canvasH);
    cnv.parent(document.querySelector('main'));
    textFont('Arial');
    buildLayout();
    makeInputElems();
    solve();
    noLoop();
    setTimeout(reportHeight, 150);
}

function windowResized() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 900);
    cw = max(cw, 500);
    buildLayout();
    repositionInputs();
    resizeCanvas(cw, canvasH);
    redraw();
}

function buildLayout() {
    segX       = cw / 2 - SEG_W / 2;
    trackStart = TRACK_PAD_L + TRACK_OFFS;
    trackEnd   = cw - TRACK_PAD_R;
    trackLen   = trackEnd - trackStart;
}

function reportHeight() {
    try { window.parent.postMessage({ type: 'microsim-height', height: canvasH }, '*'); } catch(e) {}
}

// ── HTML input elements ───────────────────────────────────────────────────────
function makeInputElems() {
    for (let i = 0; i < 3; i++) {
        let inp = createInput(str(inVals[i]));
        inp.parent(document.querySelector('main'));
        inp.style('width',        (INPUT_W - 6) + 'px');
        inp.style('font-size',    '13px');
        inp.style('padding',      '3px 5px');
        inp.style('border',       '1px solid #bbb');
        inp.style('border-radius','4px');
        inp.style('text-align',   'right');
        inp.style('position',     'absolute');
        inp.style('box-sizing',   'border-box');
        const idx = i;
        function handler() {
            let v = parseFloat(this.value);
            if (!isNaN(v) && v > 0) {
                inVals[idx] = constrain(v, 0.1, 9999);
                solve();
                redraw();
            }
        }
        inp.elt.addEventListener('change', handler);
        inp.elt.addEventListener('input',  handler);
        inpElems.push(inp);
    }
    repositionInputs();
}

function repositionInputs() {
    let canvas = document.querySelector('canvas');
    if (!canvas) return;
    let rect = canvas.getBoundingClientRect();
    for (let i = 0; i < 3; i++) {
        let sy = SLOT_BASE + i * SLOT_GAP;
        inpElems[i].style('left', (rect.left + TRACK_PAD_L + LABEL_W + 4) + 'px');
        inpElems[i].style('top',  (rect.top  + sy - 13) + 'px');
    }
}

// ── Solve ─────────────────────────────────────────────────────────────────────
function solve() {
    let a = inVals[0], b = inVals[1], c = inVals[2];
    if (mode === 0) {
        let sum = a + b + c;
        outVals = [(a * b) / sum, (b * c) / sum, (a * c) / sum];
    } else {
        let P = a * b + b * c + c * a;
        outVals = [P / b, P / c, P / a];
    }
}

// ── Draw ──────────────────────────────────────────────────────────────────────
function draw() {
    background(COL_BG);
    drawTitle();
    drawSegControl();
    drawDiagramPanels();
    drawArrow();
    drawSlidersPanel();
    drawFormulaSection();
    drawResultsCard();
    drawExplanation();
}

// ── Title ─────────────────────────────────────────────────────────────────────
function drawTitle() {
    noStroke();
    textAlign(CENTER, TOP);
    textSize(20); textStyle(BOLD); fill(30);
    text('Delta\u2013Wye Transformation', cw / 2, 10);
    textStyle(NORMAL);
    textSize(12); fill(110);
    text('Interactive resistor network converter  \u00B7  \u0394\u2194Y', cw / 2, 37);
}

// ── Segmented control ─────────────────────────────────────────────────────────
function drawSegControl() {
    let hw = SEG_W / 2;
    let labels = ['\u0394 \u2192 Y', 'Y \u2192 \u0394'];

    noStroke(); fill(COL_SEG_BG);
    rect(segX, SEG_Y, SEG_W, SEG_H, 8);

    for (let i = 0; i < 2; i++) {
        let x = segX + i * hw;
        let active = (mode === i);
        if (active) {
            fill(COL_SEG_ACT);
            if (i === 0) rect(x, SEG_Y, hw, SEG_H, 8, 0, 0, 8);
            else         rect(x, SEG_Y, hw, SEG_H, 0, 8, 8, 0);
        }
        fill(active ? 255 : 70);
        textSize(14); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(labels[i], x + hw / 2, SEG_Y + SEG_H / 2);
        textStyle(NORMAL);
    }

    stroke(175); strokeWeight(1); noFill();
    rect(segX, SEG_Y, SEG_W, SEG_H, 8);
    stroke(175);
    line(segX + hw, SEG_Y, segX + hw, SEG_Y + SEG_H);
}

// ── Diagram panels ────────────────────────────────────────────────────────────
function drawDiagramPanels() {
    let lcx = cw * 0.22;
    let rcx = cw * 0.78;
    let lCol = mode === 0 ? COL_DELTA : COL_WYE;
    let rCol = mode === 0 ? COL_WYE   : COL_DELTA;

    // Tinted backgrounds
    noStroke();
    fillA(lCol, 18); rect(4, PAN_TOP, cw / 2 - 8, PAN_H, 8);
    fillA(rCol, 18); rect(cw / 2 + 4, PAN_TOP, cw / 2 - 8, PAN_H, 8);

    // Accent top border
    fill(lCol); noStroke(); rect(4,           PAN_TOP, cw / 2 - 8, 4, 8, 8, 0, 0);
    fill(rCol);              rect(cw / 2 + 4, PAN_TOP, cw / 2 - 8, 4, 8, 8, 0, 0);

    // Networks
    if (mode === 0) {
        drawDeltaNet(lcx, DIAG_Y, inVals,  true);
        drawWyeNet  (rcx, DIAG_Y, outVals, false);
    } else {
        drawWyeNet  (lcx, DIAG_Y, inVals,  true);
        drawDeltaNet(rcx, DIAG_Y, outVals, false);
    }

    // Panel footer labels
    let lLabel = mode === 0 ? 'Input  \u0394  Network' : 'Input  Y  Network';
    let rLabel = mode === 0 ? 'Output  Y  Network' : 'Output  \u0394  Network';
    noStroke();
    fill(lCol); textSize(12); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text(lLabel, lcx, PAN_TOP + PAN_H - 6);
    fill(rCol);
    text(rLabel, rcx, PAN_TOP + PAN_H - 6);
    textStyle(NORMAL);
}

// ── Delta network ─────────────────────────────────────────────────────────────
function drawDeltaNet(cx, cy, vals, isInput) {
    let s      = min(cw * 0.145, 90);
    let rCol   = isInput ? COL_DELTA : [185, 185, 185];
    let wCol   = isInput ? COL_WIRE  : [185, 185, 185];
    let nCol   = isInput ? COL_NODE  : [160, 160, 160];
    let tFill  = isInput ? 30        : 160;

    // Vertices A (top), B (bottom-left), C (bottom-right)
    let ax = cx,      ay = cy - s * 0.82;
    let bx = cx - s,  by = cy + s * 0.56;
    let ex = cx + s,  ey = cy + s * 0.56;   // 'e' avoids conflict with Math.E... use ex/ey

    drawResEdge(ax, ay, bx,  by,  rCol, wCol);
    drawResEdge(bx, by, ex,  ey,  rCol, wCol);
    drawResEdge(ex, ey, ax,  ay,  rCol, wCol);

    fill(nCol); noStroke();
    circle(ax, ay, 13); circle(bx, by, 13); circle(ex, ey, 13);

    fill(tFill); textSize(14); textStyle(BOLD);
    textAlign(CENTER, BOTTOM); text('A', ax, ay - 10);
    textAlign(RIGHT,  CENTER); text('B', bx - 10, by);
    textAlign(LEFT,   CENTER); text('C', ex + 10, ey);
    textStyle(NORMAL);

    fill(rCol); textSize(11);

    // Ra label (A-B edge, offset outward)
    let raMx = (ax + bx) / 2, raMy = (ay + by) / 2;
    let raNx = -(by - ay),    raNy =  (bx - ax);
    let raNL = sqrt(raNx * raNx + raNy * raNy);
    let off = 18;
    textAlign(CENTER, CENTER);
    if (vals[0] !== null)
        text('Ra=' + fmtRU(vals[0]), raMx + raNx / raNL * off, raMy + raNy / raNL * off);

    // Rb label (B-C edge, below)
    textAlign(CENTER, TOP);
    if (vals[1] !== null)
        text('Rb=' + fmtRU(vals[1]), (bx + ex) / 2, max(by, ey) + 10);

    // Rc label (C-A edge, offset outward)
    let rcMx = (ex + ax) / 2, rcMy = (ey + ay) / 2;
    let rcNx = -(ay - ey),    rcNy =  (ax - ex);
    let rcNL = sqrt(rcNx * rcNx + rcNy * rcNy);
    textAlign(CENTER, CENTER);
    if (vals[2] !== null)
        text('Rc=' + fmtRU(vals[2]), rcMx + rcNx / rcNL * off, rcMy + rcNy / rcNL * off);
}

// ── Wye network ───────────────────────────────────────────────────────────────
function drawWyeNet(cx, cy, vals, isInput) {
    let s     = min(cw * 0.115, 74);
    let rCol  = isInput ? COL_WYE   : [185, 185, 185];
    let wCol  = isInput ? COL_WIRE  : [185, 185, 185];
    let nCol  = isInput ? COL_NODE  : [160, 160, 160];
    let tFill = isInput ? 30        : 160;

    let nx = cx, ny = cy;
    let ax = cx,      ay = cy - s * 1.15;
    let bx = cx - s,  by = cy + s * 0.72;
    let fx = cx + s,  fy = cy + s * 0.72;

    drawResEdge(nx, ny, ax, ay, rCol, wCol);
    drawResEdge(nx, ny, bx, by, rCol, wCol);
    drawResEdge(nx, ny, fx, fy, rCol, wCol);

    fill(nCol); noStroke();
    circle(nx, ny, 10);
    circle(ax, ay, 13); circle(bx, by, 13); circle(fx, fy, 13);

    fill(tFill); textSize(14); textStyle(BOLD);
    textAlign(CENTER, BOTTOM); text('A', ax, ay - 10);
    textAlign(RIGHT,  CENTER); text('B', bx - 10, by);
    textAlign(LEFT,   CENTER); text('C', fx + 10, fy);
    fill(isInput ? 80 : 155);
    textSize(10); textAlign(CENTER, CENTER); text('N', nx + 13, ny);
    textStyle(NORMAL);

    fill(rCol); textSize(11);
    textAlign(LEFT,  CENTER);
    if (vals[0] !== null) text('R1=' + fmtRU(vals[0]), (nx + ax) / 2 + 8, (ny + ay) / 2);
    textAlign(RIGHT, CENTER);
    if (vals[1] !== null) text('R2=' + fmtRU(vals[1]), (nx + bx) / 2 - 8, (ny + by) / 2);
    textAlign(LEFT,  CENTER);
    if (vals[2] !== null) text('R3=' + fmtRU(vals[2]), (nx + fx) / 2 + 8, (ny + fy) / 2);
}

// ── Resistor zigzag edge ──────────────────────────────────────────────────────
function drawResEdge(x1, y1, x2, y2, rCol, wCol) {
    let dx = x2 - x1, dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    if (len < 1) return;
    let ux = dx / len, uy = dy / len;
    let px = -uy,      py =  ux;

    const sf = 0.275, ef = 0.725;

    stroke(wCol); strokeWeight(2);
    line(x1, y1, x1 + dx * sf, y1 + dy * sf);
    line(x1 + dx * ef, y1 + dy * ef, x2, y2);

    stroke(rCol); strokeWeight(2.5); noFill();
    let n = 6, amp = 5.5;
    let sx = x1 + dx * sf, sy = y1 + dy * sf;
    let sdx = dx * (ef - sf) / n, sdy = dy * (ef - sf) / n;
    beginShape();
    vertex(sx, sy);
    for (let j = 0; j < n; j++) {
        let sign = (j % 2 === 0) ? 1 : -1;
        vertex(sx + sdx * (j + 0.5) + px * amp * sign,
               sy + sdy * (j + 0.5) + py * amp * sign);
    }
    vertex(x1 + dx * ef, y1 + dy * ef);
    endShape();
}

// ── Arrow ─────────────────────────────────────────────────────────────────────
function drawArrow() {
    let midX = cw / 2, midY = DIAG_Y;
    let hl = 30;
    stroke(COL_SEG_ACT); strokeWeight(3);
    line(midX - hl, midY, midX + hl, midY);
    line(midX + hl, midY, midX + hl - 10, midY - 6);
    line(midX + hl, midY, midX + hl - 10, midY + 6);
    noStroke(); fill(COL_SEG_ACT);
    textSize(11); textAlign(CENTER, BOTTOM);
    text(mode === 0 ? '\u0394 \u2192 Y' : 'Y \u2192 \u0394', midX, midY - 8);
}

// ── Sliders panel ─────────────────────────────────────────────────────────────
function drawSlidersPanel() {
    const panH = 130;
    noStroke(); fill(COL_PANEL);
    rect(0, SLIDER_PAN_Y, cw, panH);

    // Section header
    noStroke(); fill(100); textSize(11); textAlign(LEFT, TOP);
    text('Input resistors:', TRACK_PAD_L, SLIDER_PAN_Y + 8);

    let labels = mode === 0 ? ['Ra', 'Rb', 'Rc'] : ['R1', 'R2', 'R3'];
    let tCol   = mode === 0 ? COL_DELTA : COL_WYE;

    sliders = [];
    for (let i = 0; i < 3; i++) {
        let sy = SLOT_BASE + i * SLOT_GAP;
        sliders.push({ x: trackStart, y: sy, w: trackLen, dragging: false });

        // Label
        noStroke(); fill(55);
        textSize(13); textStyle(BOLD); textAlign(RIGHT, CENTER);
        text(labels[i] + ':', TRACK_PAD_L + LABEL_W, sy);
        textStyle(NORMAL);

        // Unit (Ω after input box)
        fill(90); textSize(12); textAlign(LEFT, CENTER);
        text('\u03A9', TRACK_PAD_L + LABEL_W + INPUT_W + 6, sy);

        // Track background
        stroke(210); strokeWeight(6); strokeCap(ROUND);
        line(trackStart, sy, trackEnd, sy);

        // Track fill
        let frac = constrain((inVals[i] - R_MIN) / (R_MAX - R_MIN), 0, 1);
        stroke(tCol); strokeWeight(6);
        line(trackStart, sy, trackStart + trackLen * frac, sy);

        // Knob
        let kx = trackStart + trackLen * frac;
        noStroke(); fill(255); stroke(tCol); strokeWeight(2);
        circle(kx, sy, 18);

        // Value right of track
        noStroke(); fill(60); textSize(12); textAlign(LEFT, CENTER);
        text(fmtRU(inVals[i]), trackEnd + 6, sy);
    }
}

// ── Formula section ───────────────────────────────────────────────────────────
function drawFormulaSection() {
    const y0 = 508;
    const cardH = 112;
    const gap = 8;
    let cardW = (cw - 40 - gap * 2) / 3;

    // Header
    noStroke(); fill(80); textSize(11); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Conversion Formulas:', 20, y0 - 14);
    textStyle(NORMAL);

    let outLbls = mode === 0 ? ['R1', 'R2', 'R3'] : ['Ra', 'Rb', 'Rc'];
    let accent   = mode === 0 ? COL_WYE : COL_DELTA;
    let a = inVals[0], b = inVals[1], c = inVals[2];

    let numTops, numBots, subs;
    if (mode === 0) {
        let sum = a + b + c;
        numTops = ['Ra \u00B7 Rb', 'Rb \u00B7 Rc', 'Ra \u00B7 Rc'];
        numBots = ['Ra + Rb + Rc', 'Ra + Rb + Rc', 'Ra + Rb + Rc'];
        subs    = [
            fmtRU(a) + '\u00B7' + fmtRU(b) + ' / ' + fmtRU(sum),
            fmtRU(b) + '\u00B7' + fmtRU(c) + ' / ' + fmtRU(sum),
            fmtRU(a) + '\u00B7' + fmtRU(c) + ' / ' + fmtRU(sum)
        ];
    } else {
        let P = a * b + b * c + c * a;
        numTops = ['R1R2+R2R3+R3R1', 'R1R2+R2R3+R3R1', 'R1R2+R2R3+R3R1'];
        numBots = ['R2', 'R3', 'R1'];
        subs    = [
            fmtRU(P) + ' / ' + fmtRU(b),
            fmtRU(P) + ' / ' + fmtRU(c),
            fmtRU(P) + ' / ' + fmtRU(a)
        ];
    }

    for (let i = 0; i < 3; i++) {
        let cx = 20 + i * (cardW + gap);
        let res = outVals[i] !== null ? outLbls[i] + ' = ' + fmtRU(outVals[i]) : '\u2014';
        drawFormulaCard(cx, y0, cardW, cardH,
            outLbls[i], numTops[i], numBots[i], subs[i], res, accent);
    }
}

function drawFormulaCard(x, y, w, h, title, numTop, numBot, subText, result, accent) {
    // Shadow
    noStroke(); fill(0, 0, 0, 8);
    rect(x + 2, y + 2, w, h, 6);

    // Card bg
    fill(COL_PANEL);
    rect(x, y, w, h, 6);

    // Accent bar
    fill(accent);
    rect(x, y, 5, h, 6, 0, 0, 6);

    let tx = x + 14;

    // Title
    fill(accent); textSize(13); textStyle(BOLD); textAlign(LEFT, TOP);
    text(title + ' =', tx, y + 8);
    textStyle(NORMAL);

    // Fraction display
    let fracCX = x + w / 2 + 4;
    let numY  = y + 33;
    let lineY = y + 45;
    let denY  = y + 57;

    fill(55); textSize(10); textAlign(CENTER, CENTER);
    text(numTop, fracCX, numY);

    textSize(10);
    let lw = max(textWidth(numTop), textWidth(numBot)) + 18;
    stroke(100); strokeWeight(1);
    line(fracCX - lw / 2, lineY, fracCX + lw / 2, lineY);

    noStroke(); fill(55); textSize(10); textAlign(CENTER, CENTER);
    text(numBot, fracCX, denY);

    // Substitution
    fill(125); textSize(9.5); textAlign(LEFT, TOP);
    text('= ' + subText, tx, y + 68);

    // Result — prominent
    fill(COL_RESULT); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text(result, tx, y + 86);
    textStyle(NORMAL);
}

// ── Results card ──────────────────────────────────────────────────────────────
function drawResultsCard() {
    if (outVals[0] === null) return;
    const y0 = 633, h = 52;
    let outLbls = mode === 0 ? ['R1', 'R2', 'R3'] : ['Ra', 'Rb', 'Rc'];
    let accent   = mode === 0 ? COL_WYE : COL_DELTA;

    noStroke(); fill(0, 0, 0, 6);
    rect(22, y0 + 2, cw - 44, h, 6);
    fill(COL_PANEL);
    rect(20, y0, cw - 40, h, 6);
    fill(accent);
    rect(20, y0, 5, h, 6, 0, 0, 6);

    fill(accent); textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Results:', 32, y0 + h / 2);
    textStyle(NORMAL);

    fill(COL_RESULT); textSize(17); textStyle(BOLD);
    let spacing = (cw - 130) / 3;
    for (let i = 0; i < 3; i++) {
        textAlign(CENTER, CENTER);
        text(outLbls[i] + ' = ' + fmtRU(outVals[i]), 110 + i * spacing + spacing / 2, y0 + h / 2);
    }
    textStyle(NORMAL);
}

// ── Explanation panel ─────────────────────────────────────────────────────────
function drawExplanation() {
    const y0 = 698, h = 34;
    let msg = mode === 0
        ? '\u0394\u2192Y: Each Wye resistor = product of its two adjacent Delta resistors \u00F7 sum of all three Delta resistors.'
        : 'Y\u2192\u0394: Each Delta resistor = (R\u2081R\u2082+R\u2082R\u2083+R\u2083R\u2081) \u00F7 the opposite Wye resistor.  Both networks are electrically identical at terminals A, B, C.';
    let col = mode === 0 ? COL_DELTA : COL_WYE;

    noStroke(); fillA(col, 22);
    rect(20, y0, cw - 40, h, 6);
    stroke(col); strokeWeight(1.5); noFill();
    rect(20, y0, cw - 40, h, 6);

    fill(50); noStroke(); textSize(11); textAlign(LEFT, CENTER);
    text(msg, 30, y0 + h / 2, cw - 60);
}

// ── Input handling ─────────────────────────────────────────────────────────────
function mousePressed() {
    // Segmented control
    let hw = SEG_W / 2;
    if (mouseY >= SEG_Y && mouseY <= SEG_Y + SEG_H) {
        for (let i = 0; i < 2; i++) {
            if (mouseX >= segX + i * hw && mouseX <= segX + (i + 1) * hw) {
                if (mode !== i) {
                    mode = i;
                    solve();
                    for (let j = 0; j < 3; j++) inpElems[j].value(str(inVals[j]));
                    redraw();
                }
                return;
            }
        }
    }

    // Sliders
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        if (!s) continue;
        let frac = constrain((inVals[i] - R_MIN) / (R_MAX - R_MIN), 0, 1);
        let kx = s.x + s.w * frac;
        if (dist(mouseX, mouseY, kx, s.y) < 14) {
            s.dragging = true; loop(); return;
        }
        if (mouseX >= s.x && mouseX <= s.x + s.w && abs(mouseY - s.y) < 14) {
            let newFrac = constrain((mouseX - s.x) / s.w, 0, 1);
            inVals[i] = round(R_MIN + newFrac * (R_MAX - R_MIN));
            inpElems[i].value(str(inVals[i]));
            solve(); s.dragging = true; loop(); return;
        }
    }
}

function mouseDragged() {
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        if (!s || !s.dragging) continue;
        let newFrac = constrain((mouseX - s.x) / s.w, 0, 1);
        inVals[i] = round(R_MIN + newFrac * (R_MAX - R_MIN));
        inpElems[i].value(str(inVals[i]));
        solve(); redraw(); return;
    }
}

function mouseReleased() {
    for (let s of sliders) if (s) s.dragging = false;
    noLoop();
    redraw();
}

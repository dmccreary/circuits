// Superposition Principle Demonstrator MicroSim — v2
'use strict';

let canvasWidth;
let canvasHeight = 500;
const margin    = 14;
const controlsY = 438;  // divider between circuit+chart area and controls

// View mode: 0=Original, 1=V-only, 2=I-only, 3=Combined
let viewMode = 0;

// Circuit parameters
let Vs = 12, Is = 2, R1 = 2, R2 = 4, R3 = 3;

// Solved currents (mA through R1)
let I_v = 0, I_i = 0, I_total = 0;

let sliders      = [];
let activeSlider = -1;
let segBtns      = [];
let leftPanelX, leftPanelW, rightPanelX, rightPanelW;
let np = {};   // circuit geometry

// ── Column widths ─────────────────────────────────────────────────────────────
const LABEL_W      = 40;
const INPUT_W      = 62;
const UNIT_W       = 28;
const TRACK_OFFSET = LABEL_W + INPUT_W + UNIT_W + 8;

// ── Colors ────────────────────────────────────────────────────────────────────
const colBg          = [245, 247, 250];
const colPanel       = [255, 255, 255];
const colPanelHead   = [241, 245, 249];
const colBorder      = [203, 213, 225];
const colText        = [30,  41,  59];
const colTextLight   = [100, 116, 139];
const colBtnBg       = [59,  130, 246];
const colBtnHover    = [37,  99,  235];
const colHover       = [241, 245, 249];
const colSliderTrack = [203, 213, 225];
const colGround      = [90,  105, 120];

const COL_WIRE = [51,  65,  85];
const COL_R    = [70,  130, 200];
const COL_VS   = [210, 45,  45];
const COL_IS   = [22,  163, 74];
const COL_IV   = [210, 80,  40];   // I' contribution
const COL_II   = [50,  110, 200];  // I'' contribution
const COL_ITOT = [147, 51,  234];  // I total
const COL_DEAD = [175, 185, 195];

const colBlueBg  = [239, 246, 255];
const colAccent  = [59,  130, 246];
const colGreenBg = [240, 253, 244];
const colGreen   = [22,  163, 74];
const colPurpleBg= [250, 245, 255];
const colPurple  = [147, 51,  234];
const colRedBg   = [254, 242, 242];

// Segmented control: one accent color per mode
const SEG_COLS = [colBtnBg, COL_VS, COL_IS, COL_ITOT];

// ── Setup ─────────────────────────────────────────────────────────────────────

function setup() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 800);
    createCanvas(canvasWidth, canvasHeight).parent(document.querySelector('main'));
    textFont('Arial');
    initSliders();
    buildLayout();
    solve();
    window.addEventListener('message', e => {
        if (e.data && e.data.type === 'microsim-height-request') postHeightToParent();
    });
}

function windowResized() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 800);
    buildLayout();
}

function postHeightToParent() {
    if (window.parent !== window)
        window.parent.postMessage({ type:'microsim-height', height:canvasHeight }, '*');
}

// ── Sliders + inputs ──────────────────────────────────────────────────────────

function initSliders() {
    const configs = [
        { label:'Vs', unit:'V',       min:0,   max:24, val:Vs,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{Vs=v;} },
        { label:'Is', unit:'mA',      min:0,   max:5,  val:Is,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{Is=v;} },
        { label:'R1', unit:'k\u03A9', min:0.1, max:10, val:R1,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{R1=v;} },
        { label:'R2', unit:'k\u03A9', min:0.1, max:10, val:R2,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{R2=v;} },
        { label:'R3', unit:'k\u03A9', min:0.1, max:10, val:R3,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{R3=v;} },
    ];
    sliders = configs.map(c => {
        const inp = createInput(c.fmt(c.val));
        styleInp(inp);
        const s = { label:c.label, unit:c.unit, min:c.min, max:c.max,
                    val:c.val, fmt:c.fmt, setter:c.setter, inp, trackX:0, trackW:0, y:0 };
        inp.input(() => {
            const raw = c.toRaw(inp.value());
            if (isNaN(raw)) return;
            s.val = constrain(raw, c.min, c.max);
            c.setter(s.val);
            solve();
        });
        inp.elt.addEventListener('blur', () => inp.value(c.fmt(s.val)));
        return s;
    });
}

function styleInp(inp) {
    inp.style('font-size',    '12px');
    inp.style('font-family',  'Arial,sans-serif');
    inp.style('padding',      '3px 6px');
    inp.style('border',       '1.5px solid #94a3b8');
    inp.style('border-radius','4px');
    inp.style('text-align',   'right');
    inp.style('color',        '#1e293b');
    inp.style('background',   '#f8fafc');
    inp.style('box-sizing',   'border-box');
    inp.style('outline',      'none');
    inp.style('position',     'absolute');
    inp.size(INPUT_W);
}

// ── Layout ────────────────────────────────────────────────────────────────────

function buildLayout() {
    const pGap = 10;
    leftPanelX  = margin;
    leftPanelW  = floor(canvasWidth / 2) - margin - floor(pGap / 2);
    rightPanelX = floor(canvasWidth / 2) + floor(pGap / 2);
    rightPanelW = canvasWidth - rightPanelX - margin;

    // Circuit geometry
    const cx = canvasWidth / 2;
    const hw = min(155, floor(canvasWidth * 0.195));
    np = { cx, hw, lx:cx-hw, rx:cx+hw, mx:cx,
           circTop:165, circBot:295, circCy:230 };

    // Segmented control buttons
    const ctrlW = min(canvasWidth - 2*margin, 520);
    const segW  = floor(ctrlW / 4);
    const ctrlX = floor((canvasWidth - ctrlW) / 2);
    segBtns = [
        { x:ctrlX,           y:52, w:segW,         h:32, label:'Original',     mode:0 },
        { x:ctrlX+segW,      y:52, w:segW,         h:32, label:'V-source Only', mode:1 },
        { x:ctrlX+segW*2,    y:52, w:segW,         h:32, label:'I-source Only', mode:2 },
        { x:ctrlX+segW*3,    y:52, w:ctrlW-segW*3, h:32, label:'Combined',      mode:3 },
    ];

    // Slider track geometry (left panel)
    const sliderTrackX = leftPanelX + TRACK_OFFSET;
    const sliderTrackW = leftPanelW - TRACK_OFFSET - 10;
    const sliderStartY = controlsY + 50;
    const sliderGap    = 36;
    const inputH       = 24;

    sliders.forEach((s, i) => {
        s.y      = sliderStartY + i * sliderGap;
        s.trackX = sliderTrackX;
        s.trackW = sliderTrackW;
    });

    const minH = sliders[4].y + inputH / 2 + 22;
    if (minH !== canvasHeight) {
        canvasHeight = minH;
        resizeCanvas(canvasWidth, canvasHeight);
    }
    postHeightToParent();

    const cr   = document.querySelector('canvas').getBoundingClientRect();
    const offX = cr.left + window.scrollX;
    const offY = cr.top  + window.scrollY;
    sliders.forEach(s => {
        s.inp.position(offX + leftPanelX + LABEL_W + 4, offY + s.y - inputH / 2);
        s.inp.size(INPUT_W);
    });
}

// ── Solve ─────────────────────────────────────────────────────────────────────

function solve() {
    // V-source only (Is → open): R1 and R3 in series, R2 floats
    I_v = (R1 + R3 > 0) ? Vs / (R1 + R3) : 0;
    // I-source only (Vs → short): Is current divides through R1 and R3 to GND
    I_i = (R1 + R3 > 0) ? Is * R3 / (R1 + R3) : 0;
    // Superposition sum
    I_total = I_v + I_i;
}

// ── Draw ──────────────────────────────────────────────────────────────────────

function draw() {
    background(colBg);
    drawTitleBar();
    drawSegControl();
    drawPill();
    drawCircuitArea();
    drawChartSection();
    drawSectionDivider();
    drawLeftPanel();
    drawRightPanel();
}

// ── Title bar ─────────────────────────────────────────────────────────────────

function drawTitleBar() {
    noStroke(); fill(colText);
    textSize(17); textAlign(LEFT, TOP); textStyle(BOLD);
    text('Superposition Principle Demonstrator', margin, 9);
    textStyle(NORMAL);
    fill(colTextLight); textSize(11);
    text('Linear circuits: total response = sum of each source\u2019s contribution acting alone', margin, 31);
}

// ── Segmented mode control ────────────────────────────────────────────────────

function drawSegControl() {
    const first = segBtns[0];
    const totalW = segBtns.reduce((s,b) => s+b.w, 0);

    // Outer container
    fill(colPanelHead); stroke(colBorder); strokeWeight(1.5);
    rect(first.x, first.y, totalW, first.h, 6);

    for (let i = 0; i < segBtns.length; i++) {
        const b = segBtns[i];
        const active = viewMode === b.mode;
        const hover  = !active && mouseX>=b.x && mouseX<=b.x+b.w
                                && mouseY>=b.y && mouseY<=b.y+b.h;
        noStroke();
        if (active) {
            fill(SEG_COLS[i]);
            const tl = i===0 ? 5 : 0, tr = i===segBtns.length-1 ? 5 : 0;
            rect(b.x, b.y, b.w, b.h, [tl, tr, tr, tl]);
        } else if (hover) {
            fill(colHover);
            rect(b.x, b.y, b.w, b.h);
        }
        // Divider
        if (i < segBtns.length-1) {
            stroke(colBorder); strokeWeight(1);
            line(b.x+b.w, b.y+5, b.x+b.w, b.y+b.h-5);
        }
        // Label
        noStroke(); fill(active ? 255 : colText);
        textSize(11); textAlign(CENTER, CENTER);
        textStyle(active ? BOLD : NORMAL);
        text(b.label, b.x+b.w/2, b.y+b.h/2);
        textStyle(NORMAL);
    }
}

// ── Explanation pill ──────────────────────────────────────────────────────────

const PILL_MSGS = [
    'Both sources active simultaneously \u2014 full circuit with Vs and Is driving current through R1.',
    'Is \u2192 open circuit (removed). Only Vs drives the circuit.  I\u2032 = Vs / (R1 + R3)',
    'Vs \u2192 short circuit (wire). Only Is drives the circuit.  I\u2033 = Is \u00B7 R3 / (R1 + R3)',
    'Superposition: I_total = I\u2032 + I\u2033 \u2014 individual contributions add linearly.',
];
const PILL_BGCOL  = [colBlueBg, colRedBg,  colGreenBg, colPurpleBg];
const PILL_ACCCOL = [colAccent, COL_VS,    COL_IS,     COL_ITOT];

function drawPill() {
    const py = 90, ph = 28, pw = canvasWidth - 2*margin;
    fill(PILL_BGCOL[viewMode]);
    stroke(PILL_ACCCOL[viewMode]); strokeWeight(1);
    rect(margin, py, pw, ph, 4);
    noStroke(); fill(PILL_ACCCOL[viewMode]);
    textSize(10.5); textAlign(LEFT, CENTER); textStyle(ITALIC);
    text(PILL_MSGS[viewMode], margin+10, py+ph/2);
    textStyle(NORMAL);
}

// ── Circuit drawing ───────────────────────────────────────────────────────────

function drawCircuitArea() {
    const { lx, rx, mx, circTop, circBot, circCy } = np;
    const r1cx = (lx+mx)/2;
    const r2cx = (mx+rx)/2;

    // Current arrow above R1 (at circTop-20)
    const arrowY = circTop - 22;
    if (viewMode === 0 || viewMode === 3) {
        drawCurrentArrow(r1cx, arrowY, I_total, 'I = '+nf(I_total,1,2)+' mA', COL_ITOT);
    } else if (viewMode === 1) {
        drawCurrentArrow(r1cx, arrowY, I_v,    "I\u2032 = "+nf(I_v,1,2)+' mA', COL_IV);
    } else {
        drawCurrentArrow(r1cx, arrowY, I_i,    "I\u2033 = "+nf(I_i,1,2)+' mA', COL_II);
    }

    // Wires
    stroke(COL_WIRE); strokeWeight(2.5); noFill();
    line(lx, circTop, r1cx-32, circTop);
    line(r1cx+32, circTop, mx, circTop);
    line(mx, circTop, r2cx-32, circTop);
    line(r2cx+32, circTop, rx, circTop);
    line(lx, circBot, rx, circBot);
    line(mx, circTop, mx, circCy-30);
    line(mx, circCy+30, mx, circBot);

    // Left vertical (Vs branch)
    if (viewMode === 2) {
        stroke(COL_DEAD); strokeWeight(3);
        line(lx, circTop, lx, circBot);
        noStroke(); fill(COL_DEAD); textSize(9); textAlign(RIGHT, CENTER); textStyle(ITALIC);
        text('short', lx-5, circCy);
        textStyle(NORMAL);
    } else {
        stroke(COL_WIRE); strokeWeight(2.5);
        line(lx, circTop, lx, circCy-15);
        line(lx, circCy+15, lx, circBot);
    }

    // Right vertical (Is branch)
    if (viewMode === 1) {
        stroke(COL_WIRE); strokeWeight(2.5);
        line(rx, circTop, rx, circCy-16);
        line(rx, circCy+16, rx, circBot);
        stroke(COL_DEAD); strokeWeight(2);
        line(rx-6, circCy-16, rx+6, circCy-16);
        line(rx-6, circCy+16, rx+6, circCy+16);
        noStroke(); fill(COL_DEAD); textSize(9); textAlign(LEFT, CENTER); textStyle(ITALIC);
        text('open', rx+8, circCy);
        textStyle(NORMAL);
    } else {
        stroke(COL_WIRE); strokeWeight(2.5);
        line(rx, circTop, rx, circCy-15);
        line(rx, circCy+15, rx, circBot);
    }

    // Components
    drawResistorH(r1cx, circTop, 'R1', R1.toFixed(1)+' k\u03A9');
    drawResistorH(r2cx, circTop, 'R2', R2.toFixed(1)+' k\u03A9');
    drawResistorV(mx, circCy, 'R3', R3.toFixed(1)+' k\u03A9');

    if (viewMode !== 2) drawVsSource(lx, circCy);
    if (viewMode !== 1) drawIsSource(rx, circCy);

    // Node A — highlighted dot
    const nodeR = 9;
    fill(colAccent); stroke(255); strokeWeight(2);
    ellipse(mx, circTop, nodeR*2, nodeR*2);
    fill(255); noStroke(); textSize(9); textStyle(BOLD);
    textAlign(CENTER, CENTER); text('A', mx, circTop);
    textStyle(NORMAL);

    // GND
    drawGround(mx, circBot);
}

function drawCurrentArrow(x, y, current, label, col) {
    push(); translate(x, y);
    const len = 28;
    stroke(col[0], col[1], col[2]); strokeWeight(2.5);
    line(-len, 0, len, 0);
    fill(col[0], col[1], col[2]); noStroke();
    triangle(len, 0, len-8, -5, len-8, 5);
    noStroke(); fill(col[0], col[1], col[2]);
    textSize(11); textStyle(BOLD); textAlign(CENTER, BOTTOM);
    text(label, 0, -6);
    textStyle(NORMAL);
    pop();
}

function drawResistorH(x, y, label, valStr) {
    push(); translate(x, y);
    stroke(COL_R); strokeWeight(2.5); noFill();
    const half=24, amp=7, segs=5;
    beginShape();
    vertex(-half, 0);
    for (let i=0; i<segs; i++) {
        vertex(map(i+0.25, 0, segs, -half, half), i%2===0 ? -amp : amp);
        vertex(map(i+0.75, 0, segs, -half, half), i%2===0 ? amp : -amp);
    }
    vertex(half, 0);
    endShape();
    noStroke(); fill(COL_R); textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
    text(label, 0, amp+3);
    textStyle(NORMAL); fill(colTextLight); textSize(9);
    text(valStr, 0, amp+15);
    pop();
}

function drawResistorV(x, y, label, valStr) {
    push(); translate(x, y);
    stroke(COL_R); strokeWeight(2.5); noFill();
    const half=24, amp=7, segs=5;
    beginShape();
    vertex(0, -half);
    for (let i=0; i<segs; i++) {
        vertex(i%2===0 ? -amp : amp, map(i+0.25, 0, segs, -half, half));
        vertex(i%2===0 ? amp : -amp, map(i+0.75, 0, segs, -half, half));
    }
    vertex(0, half);
    endShape();
    noStroke(); fill(COL_R); textSize(11); textStyle(BOLD); textAlign(LEFT, CENTER);
    text(label, amp+5, -5);
    textStyle(NORMAL); fill(colTextLight); textSize(9);
    text(valStr, amp+5, 9);
    pop();
}

function drawVsSource(x, y) {
    stroke(COL_VS); strokeWeight(2); noFill();
    ellipse(x, y, 28, 28);
    noStroke(); fill(COL_VS);
    textSize(13); textAlign(CENTER, CENTER);
    text('+', x, y-8); textSize(15); text('\u2013', x, y+7);
    textSize(11); textStyle(BOLD); text('Vs', x-22, y-8);
    textStyle(NORMAL); fill(colTextLight); textSize(9);
    text(Vs.toFixed(1)+' V', x-22, y+6);
}

function drawIsSource(x, y) {
    stroke(COL_IS); strokeWeight(2); noFill();
    ellipse(x, y, 28, 28);
    stroke(COL_IS); strokeWeight(1.5);
    line(x, y+8, x, y-8);
    fill(COL_IS); noStroke();
    triangle(x, y-9, x-4, y-3, x+4, y-3);
    textSize(11); textStyle(BOLD); fill(COL_IS);
    text('Is', x+20, y-8);
    textStyle(NORMAL); fill(colTextLight); textSize(9);
    text(Is.toFixed(1)+' mA', x+20, y+6);
}

function drawGround(x, y) {
    stroke(colGround); strokeWeight(2);
    line(x-15, y+4, x+15, y+4);
    line(x-9,  y+8, x+9,  y+8);
    line(x-4,  y+12, x+4, y+12);
    noStroke(); fill(colGround); textSize(9); textAlign(CENTER, TOP);
    text('GND', x, y+15);
}

// ── Bar chart ─────────────────────────────────────────────────────────────────

function drawChartSection() {
    const chartTop = np.circBot + 10;
    const chartBot = controlsY - 8;
    const chartH   = chartBot - chartTop;
    const cx = canvasWidth / 2;

    // Section background
    fill(colPanel); stroke(colBorder); strokeWeight(1);
    rect(margin, chartTop, canvasWidth-2*margin, chartH, 5);

    // Title
    noStroke(); fill(colText); textSize(12); textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('Current through R1 — Superposition Breakdown', cx, chartTop+8);
    textStyle(NORMAL);

    // Equation line
    noStroke(); fill(COL_ITOT); textSize(11); textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('I_total = I\u2032 + I\u2033', cx, chartTop+24);
    textStyle(NORMAL);

    const baseY    = chartBot - 28;
    const axisTop  = chartTop + 44;
    const drawH    = baseY - axisTop;
    const maxVal   = max(abs(I_v), abs(I_i), abs(I_total), 0.1);
    const scale    = drawH / (maxVal * 1.15);
    const barW     = min(52, (canvasWidth-2*margin-80) / 5);
    const gap      = barW * 0.55;
    const groupW   = barW * 3 + gap * 2;
    const startX   = cx - groupW / 2;

    // Axis
    stroke(colBorder); strokeWeight(1);
    line(startX-14, baseY, startX+groupW+14, baseY);

    const bars = [
        { val:I_v,     label:"I\u2032",    sub:'(Vs only)',  col:COL_IV   },
        { val:I_i,     label:"I\u2033",    sub:'(Is only)',  col:COL_II   },
        { val:I_total, label:'I_total',    sub:"= I\u2032+I\u2033", col:COL_ITOT, highlight:true },
    ];

    for (let i=0; i<bars.length; i++) {
        const b  = bars[i];
        const bx = startX + i*(barW+gap);
        const bh = max(b.val * scale, 2);

        // Highlighted total bar gets a subtle glow ring
        if (b.highlight) {
            fill(b.col[0], b.col[1], b.col[2], 30);
            noStroke();
            rect(bx-4, baseY-bh-4, barW+8, bh+4, 4);
        }

        // Bar
        fill(b.col); noStroke();
        rect(bx, baseY-bh, barW, bh, [3,3,0,0]);

        // Value above bar
        fill(b.col); textSize(11); textStyle(BOLD); textAlign(CENTER, BOTTOM);
        text(nf(b.val,1,2)+' mA', bx+barW/2, baseY-bh-4);
        textStyle(NORMAL);

        // Label below axis
        fill(b.col); textSize(11); textStyle(BOLD); textAlign(CENTER, TOP);
        text(b.label, bx+barW/2, baseY+4);
        textStyle(NORMAL);
        fill(colTextLight); textSize(9); textAlign(CENTER, TOP);
        text(b.sub, bx+barW/2, baseY+17);
    }

    // Plus and equals signs between bars
    fill(colText); textSize(16); textAlign(CENTER, CENTER);
    const midY = baseY - max(I_v, I_i, I_total)*scale/2 - 4;
    text('+', startX+barW+gap/2,   midY);
    text('=', startX+barW*2+gap*1.5, midY);
}

// ── Section divider ───────────────────────────────────────────────────────────

function drawSectionDivider() {
    stroke(colBorder); strokeWeight(1);
    line(0, controlsY, canvasWidth, controlsY);
}

// ── Left panel (sliders) ──────────────────────────────────────────────────────

function drawLeftPanel() {
    const panelH = canvasHeight - controlsY - margin;
    const py     = controlsY + floor(margin/2);
    fill(colPanel); stroke(colBorder); strokeWeight(1);
    rect(leftPanelX, py, leftPanelW, panelH-floor(margin/2), 6);
    fill(colPanelHead); noStroke();
    rect(leftPanelX, py, leftPanelW, 28, [6,6,0,0]);
    fill(colText); textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Parameters', leftPanelX+10, py+14);
    textStyle(NORMAL);

    sliders.forEach(s => drawOneSlider(s));
}

function drawOneSlider(s) {
    const trackY = s.y + 10;
    const frac   = (s.val-s.min) / (s.max-s.min);
    const thumbX = s.trackX + frac*s.trackW;

    noStroke(); fill(colText);
    textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
    text(s.label, leftPanelX+8, s.y);
    textStyle(NORMAL);
    fill(colTextLight); textSize(10); textAlign(LEFT, CENTER);
    text(s.unit, leftPanelX+LABEL_W+INPUT_W+6, s.y);
    stroke(colSliderTrack); strokeWeight(3);
    line(s.trackX, trackY, s.trackX+s.trackW, trackY);
    fill(colBtnBg); noStroke();
    ellipse(thumbX, trackY, 14, 14);
}

// ── Right panel (explanation) ─────────────────────────────────────────────────

function drawRightPanel() {
    const panelH = canvasHeight - controlsY - margin;
    const py     = controlsY + floor(margin/2);
    fill(colPanel); stroke(colBorder); strokeWeight(1);
    rect(rightPanelX, py, rightPanelW, panelH-floor(margin/2), 6);
    fill(colPanelHead); noStroke();
    rect(rightPanelX, py, rightPanelW, 28, [6,6,0,0]);
    fill(colText); textSize(12); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Superposition', rightPanelX+10, py+14);
    textStyle(NORMAL);

    const cx = rightPanelX + 10;
    const cw = rightPanelW - 20;
    let y    = py + 36;

    // Principle card
    drawExpCard(cx, y, cw, 52,
        'Principle',
        'Total response = \u03A3 (individual responses)',
        'Applies to any linear circuit with multiple independent sources.',
        colBlueBg, colAccent);
    y += 60;

    // Mode-specific card
    if (viewMode === 0) {
        drawExpCard(cx, y, cw, 52,
            'Current Mode: Both sources active',
            'I = Vs/(R1+R3) + Is\u00B7R3/(R1+R3)',
            'Both Vs and Is contribute simultaneously.',
            colBlueBg, colAccent);
    } else if (viewMode === 1) {
        drawExpCard(cx, y, cw, 66,
            'Step 1: V-source only (Is \u2192 open)',
            "I\u2032 = Vs / (R1 + R3)",
            "I\u2032 = "+Vs.toFixed(1)+" / ("
                +R1.toFixed(1)+" + "+R3.toFixed(1)+") = "
                +nf(I_v,1,3)+" mA",
            'R2 carries no current; Is is open-circuited.',
            colRedBg, COL_VS);
    } else if (viewMode === 2) {
        drawExpCard(cx, y, cw, 66,
            'Step 2: I-source only (Vs \u2192 short)',
            "I\u2033 = Is \u00B7 R3 / (R1 + R3)",
            "I\u2033 = "+Is.toFixed(1)+"\u00B7"+R3.toFixed(1)
                +" / ("+R1.toFixed(1)+"+"+R3.toFixed(1)+") = "
                +nf(I_i,1,3)+" mA",
            'Vs short-circuits: R1 and R3 share Is via a current divider.',
            colGreenBg, COL_IS);
    } else {
        drawExpCard(cx, y, cw, 66,
            'Combined: Superposition sum',
            "I_total = I\u2032 + I\u2033",
            nf(I_v,1,3)+" + "+nf(I_i,1,3)+" = "+nf(I_total,1,3)+" mA",
            'Note: R2 does not affect I through R1 in this topology.',
            colPurpleBg, COL_ITOT);
    }
}

function drawExpCard(x, y, w, h, title, formula, detail, bgCol, accCol, extra) {
    fill(bgCol); stroke(colBorder); strokeWeight(1);
    rect(x, y, w, h, 5);
    noStroke(); fill(accCol[0], accCol[1], accCol[2]);
    rect(x, y, 4, h, [5,0,0,5]);
    fill(accCol); textSize(9.5); textStyle(BOLD); textAlign(LEFT, TOP);
    text(title, x+10, y+6);
    fill(colText); textSize(11); textStyle(BOLD);
    text(formula, x+10, y+20);
    fill(colTextLight); textSize(9.5); textStyle(NORMAL);
    text(detail, x+10, y+35);
    if (extra) { fill(colTextLight); textSize(9); textStyle(ITALIC); text(extra, x+10, y+49); }
    textStyle(NORMAL);
}

// ── Interaction ───────────────────────────────────────────────────────────────

function mousePressed() {
    for (const b of segBtns) {
        if (mouseX>=b.x && mouseX<=b.x+b.w && mouseY>=b.y && mouseY<=b.y+b.h) {
            viewMode = b.mode; return;
        }
    }
    for (let i=0; i<sliders.length; i++) {
        const s = sliders[i];
        const tx = s.trackX + (s.val-s.min)/(s.max-s.min)*s.trackW;
        if (dist(mouseX, mouseY, tx, s.y+10) < 14) { activeSlider=i; return; }
    }
}

function mouseDragged() {
    if (activeSlider < 0) return;
    const s = sliders[activeSlider];
    const frac = constrain((mouseX-s.trackX)/s.trackW, 0, 1);
    s.val = Math.round((s.min + frac*(s.max-s.min))*10)/10;
    s.val = constrain(s.val, s.min, s.max);
    s.setter(s.val);
    s.inp.value(s.fmt(s.val));
    solve();
}

function mouseReleased() { activeSlider = -1; }

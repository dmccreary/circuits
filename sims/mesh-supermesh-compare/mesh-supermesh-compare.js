// Mesh vs Supermesh Comparison MicroSim — v2
'use strict';

let canvasWidth;
let canvasHeight = 500;
const margin    = 14;
const controlsY = 290;

let mode = 0;        // 0 = Standard Mesh, 1 = Supermesh
let modeSelect;

let R1 = 2, R2 = 4, R3 = 3;   // kΩ
let Vs = 12;                    // V
let Is = 2;                     // mA
let I1 = 0, I2 = 0;
let solved = false;

let sliders      = [];
let activeSlider = -1;
let leftPanelX, leftPanelW, rightPanelX, rightPanelW;
let solveBtn = { x:0, y:0, w:100, h:32 };
let resetBtn = { x:0, y:0, w:100, h:32 };
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

// Circuit element colors
const COL_WIRE  = [51,  65,  85];
const COL_R     = [70,  130, 200];
const COL_VS    = [210, 45,  45];
const COL_IS    = [22,  163, 74];
const COL_I1    = [200, 80,  50];
const COL_I2    = [50,  100, 200];
const COL_SUPER = [147, 51,  234];

// Card background / accent pairs
const colBlueBg   = [239, 246, 255];
const colAccent   = [59,  130, 246];
const colGreenBg  = [240, 253, 244];
const colGreen    = [22,  163, 74];
const colPurpleBg = [250, 245, 255];
const colPurple   = [147, 51,  234];

// ── Setup ─────────────────────────────────────────────────────────────────────

function setup() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 800);
    createCanvas(canvasWidth, canvasHeight).parent(document.querySelector('main'));
    textFont('Arial');
    initSliders();
    initModeSelect();
    buildLayout();
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
        { label:'R1', unit:'k\u03A9', min:0.5, max:10, val:R1,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{R1=v;} },
        { label:'R2', unit:'k\u03A9', min:0.5, max:10, val:R2,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{R2=v;} },
        { label:'R3', unit:'k\u03A9', min:0.5, max:10, val:R3,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{R3=v;} },
        { label:'Vs', unit:'V',       min:1,   max:24, val:Vs,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{Vs=v;} },
        { label:'Is', unit:'mA',      min:0.5, max:5,  val:Is,
          fmt:v=>v.toFixed(1), toRaw:s=>parseFloat(s), setter:v=>{Is=v;} },
    ];

    sliders = configs.map(c => {
        const inp = createInput(c.fmt(c.val));
        styleInp(inp);
        const s = { label:c.label, unit:c.unit, min:c.min, max:c.max,
                    val:c.val, fmt:c.fmt, setter:c.setter,
                    inp, trackX:0, trackW:0, y:0 };
        inp.input(() => {
            if (c.label === 'Is' && mode === 0) return;
            const raw = c.toRaw(inp.value());
            if (isNaN(raw) || raw <= 0) return;
            s.val = constrain(raw, c.min, c.max);
            c.setter(s.val);
            solved = false;
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

// ── Mode selector ─────────────────────────────────────────────────────────────

function initModeSelect() {
    modeSelect = createSelect();
    modeSelect.option('Standard Mesh', '0');
    modeSelect.option('Supermesh',     '1');
    modeSelect.value('0');
    modeSelect.style('font-size',    '12px');
    modeSelect.style('font-family',  'Arial,sans-serif');
    modeSelect.style('padding',      '4px 8px');
    modeSelect.style('border',       '1.5px solid #8b5cf6');
    modeSelect.style('border-radius','6px');
    modeSelect.style('background',   '#f5f3ff');
    modeSelect.style('color',        '#1e293b');
    modeSelect.style('font-weight',  'bold');
    modeSelect.style('cursor',       'pointer');
    modeSelect.style('position',     'absolute');
    modeSelect.style('width',        '150px');
    modeSelect.elt.addEventListener('change', function() {
        mode = parseInt(this.value);
        solved = false;
        refreshIsInputStyle();
    });
}

function refreshIsInputStyle() {
    const s = sliders[4];
    if (mode === 0) {
        s.inp.style('background', '#f1f5f9');
        s.inp.style('color',      '#94a3b8');
    } else {
        s.inp.style('background', '#f8fafc');
        s.inp.style('color',      '#1e293b');
    }
}

// ── Layout ────────────────────────────────────────────────────────────────────

function buildLayout() {
    const pGap = 10;
    leftPanelX  = margin;
    leftPanelW  = floor(canvasWidth / 2) - margin - floor(pGap / 2);
    rightPanelX = floor(canvasWidth / 2) + floor(pGap / 2);
    rightPanelW = canvasWidth - rightPanelX - margin;

    // Circuit geometry (centered in upper area, y:80–280)
    const cx = canvasWidth / 2;
    const hw = min(160, floor(canvasWidth * 0.205));
    np = { cx, hw, lx:cx-hw, rx:cx+hw, mx:cx,
           circTop:108, circBot:262, circCy:185 };

    // Slider track geometry
    const sliderTrackX = leftPanelX + TRACK_OFFSET;
    const sliderTrackW = leftPanelW - TRACK_OFFSET - 10;
    const sliderStartY = controlsY + 82;
    const sliderGap    = 38;
    const inputH       = 24;

    sliders.forEach((s, i) => {
        s.y      = sliderStartY + i * sliderGap;
        s.trackX = sliderTrackX;
        s.trackW = sliderTrackW;
    });

    const lastBottom = sliderStartY + 4 * sliderGap + inputH / 2;
    const btnGap = 8;
    solveBtn.w = floor((leftPanelW - 24 - btnGap) * 0.62);
    solveBtn.h = 32;
    solveBtn.x = leftPanelX + 12;
    solveBtn.y = lastBottom + 18;
    resetBtn.w = leftPanelW - 24 - btnGap - solveBtn.w;
    resetBtn.h = 32;
    resetBtn.x = solveBtn.x + solveBtn.w + btnGap;
    resetBtn.y = solveBtn.y;

    const minH = solveBtn.y + solveBtn.h + 22;
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
    modeSelect.position(offX + leftPanelX + 52, offY + controlsY + 38);
    refreshIsInputStyle();
}

// ── Draw ──────────────────────────────────────────────────────────────────────

function draw() {
    background(colBg);
    drawTitleBar();
    drawCircuitArea();
    drawSectionDivider();
    drawLeftPanel();
    drawRightPanel();
}

function drawTitleBar() {
    noStroke(); fill(colText);
    textSize(17); textAlign(LEFT, TOP); textStyle(BOLD);
    text('Mesh vs Supermesh Comparison', margin, 9);
    textStyle(NORMAL);

    fill(colTextLight); textSize(11);
    text('KVL-based loop analysis — choose mode to compare the two approaches', margin, 31);

    // Explanation pill — color/text changes with mode
    const py = 50, pw = canvasWidth - 2*margin, ph = 28;
    fill(mode === 0 ? colBlueBg : colPurpleBg);
    stroke(mode === 0 ? colAccent : colPurple); strokeWeight(1);
    rect(margin, py, pw, ph, 4);
    noStroke(); fill(mode === 0 ? colAccent : colPurple);
    textSize(10.5); textAlign(LEFT, CENTER); textStyle(ITALIC);
    const msg = mode === 0
        ? 'Standard Mesh: write a KVL equation clockwise around each independent loop. Two equations, two unknowns.'
        : 'Supermesh: Is sits between meshes — exclude it, write one outer KVL, then add constraint I\u2082\u2013I\u2081 = Is.';
    text(msg, margin + 10, py + ph / 2);
    textStyle(NORMAL);
}

function drawCircuitArea() {
    drawCircuit();
    if (mode === 1) drawSupermeshBoundary();
    if (solved) {
        drawMeshArrow((np.lx+np.mx)/2, np.circCy, I1, 'I\u2081', COL_I1);
        drawMeshArrow((np.mx+np.rx)/2, np.circCy, I2, 'I\u2082', COL_I2);
    }
}

function drawSectionDivider() {
    stroke(colBorder); strokeWeight(1);
    line(0, controlsY, canvasWidth, controlsY);
}

// ── Circuit drawing ───────────────────────────────────────────────────────────

function drawCircuit() {
    const { lx, rx, mx, circTop, circBot, circCy } = np;
    const r1cx = (lx + mx) / 2;
    const r2cx = (mx + rx) / 2;

    stroke(COL_WIRE); strokeWeight(2.5); noFill();

    // Top wires (gaps for R1, R2)
    line(lx,       circTop, r1cx-32, circTop);
    line(r1cx+32,  circTop, mx,      circTop);
    line(mx,       circTop, r2cx-32, circTop);
    line(r2cx+32,  circTop, rx,      circTop);

    // Left vertical (gap for Vs, r=14)
    line(lx, circTop,    lx, circCy-16);
    line(lx, circCy+16,  lx, circBot);

    // Right vertical
    if (mode === 0) {
        line(rx, circTop, rx, circBot);
    } else {
        line(rx, circTop,    rx, circCy-16);
        line(rx, circCy+16,  rx, circBot);
    }

    // Middle vertical (gap for R3)
    line(mx, circTop,    mx, circCy-32);
    line(mx, circCy+32,  mx, circBot);

    // Bottom wire
    line(lx, circBot, rx, circBot);

    // Components
    drawResistorH(r1cx,  circTop, 'R1', R1.toFixed(1)+' k\u03A9');
    drawResistorH(r2cx,  circTop, 'R2', R2.toFixed(1)+' k\u03A9');
    drawResistorV(mx,    circCy,  'R3', R3.toFixed(1)+' k\u03A9');
    drawVsSource(lx, circCy);

    if (mode === 0) {
        noStroke(); fill(colTextLight); textSize(9);
        textAlign(LEFT, CENTER); textStyle(ITALIC);
        text('wire', rx+6, circCy);
        textStyle(NORMAL);
    } else {
        drawIsSource(rx, circCy);
    }

    // Node labels A (top-mid) / B (bot-mid)
    noStroke(); fill(colText); textSize(10);
    textAlign(CENTER, BOTTOM); text('A', mx, circTop-6);
    textAlign(CENTER, TOP);    text('B', mx, circBot+4);

    drawGround(mx, circBot);
}

function drawSupermeshBoundary() {
    const { lx, rx, circTop, circBot, circCy } = np;
    const pad = 14;
    stroke(COL_SUPER); strokeWeight(2);
    drawingContext.setLineDash([8, 5]); noFill();
    beginShape();
    vertex(lx-pad, circTop-pad);
    vertex(rx+pad, circTop-pad);
    vertex(rx+pad, circCy-18);
    endShape();
    beginShape();
    vertex(rx+pad, circCy+18);
    vertex(rx+pad, circBot+pad);
    vertex(lx-pad, circBot+pad);
    vertex(lx-pad, circTop-pad);
    endShape();
    drawingContext.setLineDash([]);
    noStroke(); fill(COL_SUPER);
    textSize(10); textAlign(LEFT, CENTER); textStyle(BOLD);
    text('Supermesh', rx+pad+3, circTop-pad+6);
    textStyle(NORMAL);
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
    noStroke(); fill(COL_R);
    textSize(11); textAlign(CENTER, TOP); textStyle(BOLD);
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
    noStroke(); fill(COL_R);
    textSize(11); textAlign(LEFT, CENTER); textStyle(BOLD);
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
    line(x-16, y+4,  x+16, y+4);
    line(x-10, y+8,  x+10, y+8);
    line(x-4,  y+12, x+4,  y+12);
    noStroke(); fill(colGround); textSize(9); textAlign(CENTER, TOP);
    text('GND', x, y+15);
}

function drawMeshArrow(cx, cy, current, label, col) {
    push(); translate(cx, cy);
    const r = 30;
    stroke(col[0], col[1], col[2], 150); strokeWeight(2); noFill();
    arc(0, 0, r*2, r*2, PI*0.12, PI*1.88);
    const ang = PI*1.88;
    fill(col[0], col[1], col[2], 150); noStroke();
    push(); translate(cos(ang)*r, sin(ang)*r); rotate(ang+HALF_PI);
    triangle(0, -5, -3, 3, 3, 3);
    pop();
    noStroke(); fill(col);
    textSize(10); textAlign(CENTER, CENTER); textStyle(BOLD);
    text(label, 0, -3);
    textStyle(NORMAL); textSize(9);
    text(nf(current, 1, 2)+' mA', 0, 9);
    pop();
}

// ── Left panel ────────────────────────────────────────────────────────────────

function drawLeftPanel() {
    const panelH = canvasHeight - controlsY - margin;
    const py = controlsY + floor(margin/2);

    fill(colPanel); stroke(colBorder); strokeWeight(1);
    rect(leftPanelX, py, leftPanelW, panelH - floor(margin/2), 6);

    fill(colPanelHead); noStroke();
    rect(leftPanelX, py, leftPanelW, 28, [6,6,0,0]);
    fill(colText); textSize(12); textAlign(LEFT, CENTER); textStyle(BOLD);
    text('Controls', leftPanelX+10, py+14);
    textStyle(NORMAL);

    // "Mode:" label (HTML select sits to its right)
    fill(colText); noStroke();
    textSize(11); textAlign(LEFT, CENTER); textStyle(BOLD);
    text('Mode:', leftPanelX+10, controlsY+52);
    textStyle(NORMAL);

    // Sliders
    sliders.forEach((s, i) => drawOneSlider(s, i===4 && mode===0));

    drawSolveButton();
    drawResetButton();
}

function drawOneSlider(s, dimmed) {
    const trackY  = s.y + 10;
    const frac    = (s.val - s.min) / (s.max - s.min);
    const thumbX  = s.trackX + frac * s.trackW;
    const trkCol  = dimmed ? [220,225,232] : colSliderTrack;
    const thmCol  = dimmed ? [185,195,205] : colBtnBg;
    const txtCol  = dimmed ? colTextLight : colText;
    const unitCol = dimmed ? [185,195,210] : colTextLight;

    noStroke(); fill(txtCol);
    textSize(12); textAlign(LEFT, CENTER); textStyle(BOLD);
    text(s.label, leftPanelX+8, s.y);
    textStyle(NORMAL);

    fill(unitCol); textSize(10); textAlign(LEFT, CENTER);
    text(s.unit, leftPanelX+LABEL_W+INPUT_W+6, s.y);

    stroke(trkCol); strokeWeight(3);
    line(s.trackX, trackY, s.trackX+s.trackW, trackY);

    if (!dimmed) {
        fill(thmCol); noStroke();
        ellipse(thumbX, trackY, 14, 14);
    }
}

function drawSolveButton() {
    const b = solveBtn;
    const h = mouseX>=b.x && mouseX<=b.x+b.w && mouseY>=b.y && mouseY<=b.y+b.h;
    noStroke(); fill(h ? colBtnHover : colBtnBg);
    rect(b.x, b.y, b.w, b.h, 7);
    fill(255); textSize(13); textAlign(CENTER, CENTER); textStyle(BOLD);
    text('Solve \u25B6', b.x+b.w/2, b.y+b.h/2);
    textStyle(NORMAL);
}

function drawResetButton() {
    const b = resetBtn;
    const h = mouseX>=b.x && mouseX<=b.x+b.w && mouseY>=b.y && mouseY<=b.y+b.h;
    noStroke(); fill(h ? [180,180,185] : [148,163,184]);
    rect(b.x, b.y, b.w, b.h, 7);
    fill(255); textSize(12); textAlign(CENTER, CENTER); textStyle(BOLD);
    text('Reset', b.x+b.w/2, b.y+b.h/2);
    textStyle(NORMAL);
}

// ── Right panel ───────────────────────────────────────────────────────────────

function drawRightPanel() {
    const panelH = canvasHeight - controlsY - margin;
    const py = controlsY + floor(margin/2);

    fill(colPanel); stroke(colBorder); strokeWeight(1);
    rect(rightPanelX, py, rightPanelW, panelH - floor(margin/2), 6);

    fill(colPanelHead); noStroke();
    rect(rightPanelX, py, rightPanelW, 28, [6,6,0,0]);
    fill(colText); textSize(12); textAlign(LEFT, CENTER); textStyle(BOLD);
    text('Analysis', rightPanelX+10, py+14);
    textStyle(NORMAL);

    const cx = rightPanelX + 10;
    const cw = rightPanelW - 20;
    const cardH = 76;
    const gap   = 8;
    let y = py + 36;

    if (mode === 0) {
        drawEqCard(cx, y, cw, cardH,
            'Loop 1 \u2014 KVL (clockwise)',
            'Vs = I\u2081\u00B7R1 + (I\u2081\u2013I\u2082)\u00B7R3',
            Vs.toFixed(1)+' V = I\u2081\u00B7'+R1.toFixed(1)+'k + (I\u2081\u2013I\u2082)\u00B7'+R3.toFixed(1)+'k',
            'Voltage source drives the left mesh; R3 carries the difference current.',
            colBlueBg, COL_I1);
        y += cardH + gap;
        drawEqCard(cx, y, cw, cardH,
            'Loop 2 \u2014 KVL (clockwise)',
            '0 = I\u2082\u00B7R2 + (I\u2082\u2013I\u2081)\u00B7R3',
            '0 = I\u2082\u00B7'+R2.toFixed(1)+'k + (I\u2082\u2013I\u2081)\u00B7'+R3.toFixed(1)+'k',
            'No source in right loop; all drops sum to zero.',
            colBlueBg, COL_I2);
    } else {
        drawEqCard(cx, y, cw, cardH,
            'Supermesh KVL \u2014 outer boundary (skip Is)',
            'Vs = I\u2081\u00B7R1 + I\u2082\u00B7R2',
            Vs.toFixed(1)+' V = I\u2081\u00B7'+R1.toFixed(1)+'k + I\u2082\u00B7'+R2.toFixed(1)+'k',
            'Trace the outer loop; R3 drops cancel because Is is excluded.',
            colPurpleBg, COL_SUPER);
        y += cardH + gap;
        drawEqCard(cx, y, cw, cardH,
            'Constraint \u2014 current source',
            'I\u2082 \u2013 I\u2081 = Is',
            'I\u2082 \u2013 I\u2081 = '+Is.toFixed(1)+' mA',
            'Is directly fixes the difference between the two mesh currents.',
            colGreenBg, COL_IS);
    }

    y += cardH + gap;

    if (solved) {
        drawSolutionCard(cx, y, cw);
    } else {
        fill(colHover); stroke(colBorder); strokeWeight(1);
        rect(cx, y, cw, 44, 5);
        noStroke(); fill(colTextLight);
        textSize(10); textAlign(CENTER, CENTER); textStyle(ITALIC);
        text('Press Solve \u25B6 to calculate mesh currents', cx+cw/2, y+22);
        textStyle(NORMAL);
    }
}

function drawEqCard(x, y, w, h, title, formula, withVals, explanation, bgCol, accCol) {
    fill(bgCol); stroke(colBorder); strokeWeight(1);
    rect(x, y, w, h, 5);
    noStroke(); fill(accCol[0], accCol[1], accCol[2]);
    rect(x, y, 4, h, [5,0,0,5]);
    fill(accCol); textSize(9.5); textAlign(LEFT, TOP); textStyle(BOLD);
    text(title, x+10, y+6);
    fill(colText); textSize(12); textStyle(BOLD);
    text(formula, x+10, y+21);
    fill(colTextLight); textSize(10); textStyle(NORMAL);
    text(withVals, x+10, y+38);
    fill(colTextLight); textSize(9); textStyle(ITALIC);
    text(explanation, x+10, y+53);
    textStyle(NORMAL);
}

function drawSolutionCard(x, y, w) {
    const h = 64;
    fill(colGreenBg);
    stroke(colGreen[0], colGreen[1], colGreen[2], 180); strokeWeight(1.5);
    rect(x, y, w, h, 5);
    noStroke(); fill(colGreen[0], colGreen[1], colGreen[2]);
    rect(x, y, 4, h, [5,0,0,5]);
    fill(colGreen); textSize(10); textAlign(LEFT, TOP); textStyle(BOLD);
    text('Solved Mesh Currents', x+10, y+6);
    fill(COL_I1); textSize(13); textStyle(BOLD);
    text('I\u2081 = '+nf(I1,1,3)+' mA', x+10, y+22);
    fill(COL_I2);
    text('I\u2082 = '+nf(I2,1,3)+' mA', x+w/2, y+22);
    textStyle(NORMAL);
    fill(colTextLight); textSize(9); textStyle(ITALIC);
    const check = mode===0
        ? 'R3 branch: I\u2081\u2013I\u2082 = '+nf(I1-I2,1,3)+' mA'
        : 'Check: I\u2082\u2013I\u2081 = '+nf(I2-I1,1,3)+' mA  =  Is ('+Is.toFixed(1)+' mA)';
    text(check, x+10, y+47);
    textStyle(NORMAL);
}

// ── Solve ─────────────────────────────────────────────────────────────────────

function solveMesh() {
    if (mode === 0) {
        const a11=R1+R3, a12=-R3, a21=-R3, a22=R2+R3;
        const det = a11*a22 - a12*a21;
        if (abs(det) < 1e-12) { I1=0; I2=0; return; }
        I1 = (Vs * a22) / det;
        I2 = (Vs * R3)  / det;
    } else {
        // Outer KVL: Vs = I1*R1 + I2*R2,  Constraint: I2-I1 = Is
        // → I2 = I1+Is → Vs = I1*(R1+R2) + Is*R2 → I1 = (Vs-Is*R2)/(R1+R2)
        // Equivalent form verified: I2=(Vs+Is*R1)/(R1+R2), I1=I2-Is
        I2 = (Vs + Is*R1) / (R1+R2);
        I1 = I2 - Is;
    }
    solved = true;
}

// ── Interaction ───────────────────────────────────────────────────────────────

function inBtn(b) {
    return mouseX>=b.x && mouseX<=b.x+b.w && mouseY>=b.y && mouseY<=b.y+b.h;
}

function mousePressed() {
    if (inBtn(solveBtn)) { solveMesh(); return; }
    if (inBtn(resetBtn)) { I1=0; I2=0; solved=false; return; }
    for (let i=0; i<sliders.length; i++) {
        if (i===4 && mode===0) continue;
        const s = sliders[i];
        const tx = s.trackX + (s.val-s.min)/(s.max-s.min)*s.trackW;
        if (dist(mouseX, mouseY, tx, s.y+10) < 14) { activeSlider=i; return; }
    }
}

function mouseDragged() {
    if (activeSlider < 0) return;
    const s = sliders[activeSlider];
    const frac = constrain((mouseX-s.trackX)/s.trackW, 0, 1);
    s.val = Math.round((s.min + frac*(s.max-s.min))*10) / 10;
    s.val = constrain(s.val, s.min, s.max);
    s.setter(s.val);
    s.inp.value(s.fmt(s.val));
    solved = false;
}

function mouseReleased() { activeSlider = -1; }

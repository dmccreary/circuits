// Supernode Analysis MicroSim — Redesigned

let canvasWidth;
const canvasHeight = 580;
const margin = 14;

// Circuit parameters
let vs = 5;
let r1 = 1000, r2 = 2000, r3 = 1000;

// Sliders
let sliders = [];
let activeSlider = -1;

// Supernode toggle
let showSupernode = true;
let supernodeCbX, supernodeCbY;

// Solve button
let solveBtn = { x: 0, y: 0, w: 110, h: 34 };
let solved = false;
let v1 = 0, v2 = 0;

// Panel geometry (computed in buildLayout)
let leftPanelX, leftPanelW, rightPanelX, rightPanelW;
const controlsY = 328;

// Colors
const colBg         = [245, 247, 250];
const colPanel      = [255, 255, 255];
const colPanelHead  = [241, 245, 249];
const colBorder     = [203, 213, 225];
const colText       = [30,  41,  59];
const colTextLight  = [100, 116, 139];
const colNode       = [59,  130, 246];
const colWire       = [51,  65,  85];
const colSource     = [220, 50,  50];
const colResistor   = [80,  95,  115];
const colSupernode  = [147, 51,  234];
const colAccent     = [59,  130, 246];
const colGreen      = [22,  163, 74];
const colGreenBg    = [240, 253, 244];
const colYellow     = [161, 98,  7];
const colYellowBg   = [255, 251, 235];
const colBlueBg     = [239, 246, 255];
const colHover      = [241, 245, 249];
const colSliderTrack = [203, 213, 225];
const colSliderThumb = [59,  130, 246];
const colBtnBg      = [59,  130, 246];
const colBtnHover   = [37,  99,  235];
const colGround     = [90,  105, 120];

// Node positions
let nodePos = {};

function setup() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 800);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    buildLayout();
}

function windowResized() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 800);
    resizeCanvas(canvasWidth, canvasHeight);
    buildLayout();
}

function buildLayout() {
    let panelGap = 10;
    leftPanelX = margin;
    leftPanelW = floor(canvasWidth / 2) - margin - floor(panelGap / 2);
    rightPanelX = floor(canvasWidth / 2) + floor(panelGap / 2);
    rightPanelW = canvasWidth - rightPanelX - margin;

    // Circuit: centered, taller
    let cx = canvasWidth / 2;
    let circTop = 90;
    let circBot = 305;
    let n1x = cx - 75;
    let n2x = cx + 75;
    let srcX = max(margin + 20, cx - 210);

    nodePos = {
        src_top: { x: srcX, y: circTop },
        src_bot: { x: srcX, y: circBot },
        n1:      { x: n1x,  y: circTop },
        n2:      { x: n2x,  y: circTop },
        n1_bot:  { x: n1x,  y: circBot },
        n2_bot:  { x: n2x,  y: circBot },
    };

    // Sliders: label+value on the left, track on the right within left panel
    let labelColW = 95;
    let sliderTrackX = leftPanelX + labelColW;
    let sliderTrackW = leftPanelW - labelColW - 14;
    let sliderStartY = controlsY + 52;
    let sliderGap = 42;

    sliders = [
        { trackX: sliderTrackX, y: sliderStartY,              trackW: sliderTrackW,
          label: 'Vs', unit: 'V',  min: 1,   max: 20,    val: vs,
          fmt: (v) => v.toFixed(1),        setter: (v) => { vs = v; } },
        { trackX: sliderTrackX, y: sliderStartY + sliderGap,  trackW: sliderTrackW,
          label: 'R1', unit: 'kΩ', min: 100, max: 10000, val: r1,
          fmt: (v) => (v / 1000).toFixed(1), setter: (v) => { r1 = v; } },
        { trackX: sliderTrackX, y: sliderStartY + sliderGap * 2, trackW: sliderTrackW,
          label: 'R2', unit: 'kΩ', min: 100, max: 10000, val: r2,
          fmt: (v) => (v / 1000).toFixed(1), setter: (v) => { r2 = v; } },
        { trackX: sliderTrackX, y: sliderStartY + sliderGap * 3, trackW: sliderTrackW,
          label: 'R3', unit: 'kΩ', min: 100, max: 10000, val: r3,
          fmt: (v) => (v / 1000).toFixed(1), setter: (v) => { r3 = v; } },
    ];

    supernodeCbX = leftPanelX + 10;
    supernodeCbY = sliderStartY + sliderGap * 4 + 6;

    solveBtn.x = leftPanelX + (leftPanelW - solveBtn.w) / 2;
    solveBtn.y = supernodeCbY + 30;

    solved = false;
}

// ─── Draw ────────────────────────────────────────────────────────────────────

function draw() {
    background(colBg);
    drawTitleBar();
    drawCircuit();
    if (showSupernode) drawSupernodeBoundary();
    drawNodeLabels();
    if (solved) drawSolvedValues();
    drawSectionDivider();
    drawLeftPanel();
    drawRightPanel();
}

function drawTitleBar() {
    noStroke();
    fill(colText);
    textSize(17);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Supernode Analysis', margin, 9);
    textStyle(NORMAL);

    fill(colTextLight);
    textSize(11);
    text('Nodal analysis when a voltage source connects two non-reference nodes', margin, 31);

    // Blue explanation pill
    let py = 50, pw = canvasWidth - 2 * margin, ph = 30;
    fill(colBlueBg);
    stroke(colAccent[0], colAccent[1], colAccent[2], 90);
    strokeWeight(1);
    rect(margin, py, pw, ph, 5);
    noStroke();
    fill(35, 90, 185);
    textSize(11);
    textAlign(LEFT, CENTER);
    textStyle(ITALIC);
    text(
        'A supernode encloses Node\u2081 and Node\u2082 joined by Vs. ' +
        'Apply KCL to the combined boundary, then add the constraint: V\u2081\u2013V\u2082 = Vs.',
        margin + 10, py + ph / 2
    );
    textStyle(NORMAL);
}

function drawSectionDivider() {
    stroke(colBorder);
    strokeWeight(1);
    line(margin, controlsY - 6, canvasWidth - margin, controlsY - 6);
}

// ─── Left Panel ──────────────────────────────────────────────────────────────

function drawLeftPanel() {
    let panelH = canvasHeight - controlsY - margin;

    fill(colPanel);
    stroke(colBorder);
    strokeWeight(1);
    rect(leftPanelX, controlsY, leftPanelW, panelH, 6);

    // Header bar
    fill(colPanelHead);
    noStroke();
    rect(leftPanelX, controlsY, leftPanelW, 28, 6, 6, 0, 0);
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Controls', leftPanelX + 10, controlsY + 14);
    textStyle(NORMAL);

    drawSliders();
    drawSupernodeCheckbox();
    drawSolveButton();
}

function drawSliders() {
    for (let s of sliders) drawOneSlider(s);
}

function drawOneSlider(s) {
    let thumbR = 8;
    let trackY = s.y + 10;
    let frac = (s.val - s.min) / (s.max - s.min);
    let thumbX = s.trackX + frac * s.trackW;

    // Label (bold, left-aligned)
    noStroke();
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(s.label, leftPanelX + 10, s.y);
    textStyle(NORMAL);

    // Value badge (right-aligned before track)
    fill(colAccent);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text(s.fmt(s.val) + '\u00A0' + s.unit, s.trackX - 5, s.y);

    // Track background
    stroke(colSliderTrack);
    strokeWeight(3);
    line(s.trackX, trackY, s.trackX + s.trackW, trackY);

    // Filled portion
    stroke(colSliderThumb);
    strokeWeight(3);
    line(s.trackX, trackY, thumbX, trackY);

    // Thumb
    let hovering = dist(mouseX, mouseY, thumbX, trackY) < thumbR + 5;
    noStroke();
    fill(hovering ? colBtnHover : colSliderThumb);
    ellipse(thumbX, trackY, thumbR * 2, thumbR * 2);
    fill(255);
    ellipse(thumbX, trackY, thumbR - 1, thumbR - 1);
}

function drawSupernodeCheckbox() {
    let size = 16;
    let hovering = mouseInRect(supernodeCbX, supernodeCbY, size + 130, size);
    stroke(colBorder);
    strokeWeight(1.5);
    fill(showSupernode ? colSupernode : (hovering ? colHover : colPanel));
    rect(supernodeCbX, supernodeCbY, size, size, 3);
    if (showSupernode) {
        stroke(255);
        strokeWeight(2);
        noFill();
        line(supernodeCbX + 3, supernodeCbY + 8,  supernodeCbX + 7,  supernodeCbY + 12);
        line(supernodeCbX + 7, supernodeCbY + 12, supernodeCbX + 13, supernodeCbY + 4);
    }
    noStroke();
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Show Supernode Boundary', supernodeCbX + size + 7, supernodeCbY + size / 2);
}

function drawSolveButton() {
    let b = solveBtn;
    let hovering = mouseInRect(b.x, b.y, b.w, b.h);
    noStroke();
    fill(hovering ? colBtnHover : colBtnBg);
    rect(b.x, b.y, b.w, b.h, 7);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Solve \u25B6', b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

// ─── Right Panel ─────────────────────────────────────────────────────────────

function drawRightPanel() {
    let panelH = canvasHeight - controlsY - margin;

    fill(colPanel);
    stroke(colBorder);
    strokeWeight(1);
    rect(rightPanelX, controlsY, rightPanelW, panelH, 6);

    // Header bar
    fill(colPanelHead);
    noStroke();
    rect(rightPanelX, controlsY, rightPanelW, 28, 6, 6, 0, 0);
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Analysis', rightPanelX + 10, controlsY + 14);
    textStyle(NORMAL);

    drawEquationCards();
}

function drawEquationCards() {
    let cx = rightPanelX + 10;
    let cw = rightPanelW - 20;
    let y = controlsY + 38;
    let cardH = 52;
    let gap = 8;

    // Card 1 — Constraint
    drawEqCard(cx, y, cw, cardH,
        'Constraint Equation',
        'V\u2081 \u2013 V\u2082 = Vs = ' + vs.toFixed(1) + ' V',
        'The voltage source fixes the difference between V\u2081 and V\u2082.',
        colYellowBg, colYellow);

    y += cardH + gap;

    // Card 2 — KCL
    drawEqCard(cx, y, cw, cardH,
        'KCL at Supernode Boundary',
        '(10\u2013V\u2081)/R1 = V\u2081/R2 + V\u2082/R3',
        'Sum of currents leaving the combined supernode envelope = 0.',
        colBlueBg, colAccent);

    y += cardH + gap;

    // Card 3 — Results
    if (solved) {
        drawResultCard(cx, y, cw, cardH + 14);
    } else {
        fill(248, 249, 251);
        stroke(colBorder);
        strokeWeight(1);
        rect(cx, y, cw, cardH, 5);
        noStroke();
        fill(colTextLight);
        textSize(11);
        textAlign(CENTER, CENTER);
        textStyle(ITALIC);
        text('Press \u201CSolve \u25B6\u201D to calculate node voltages', cx + cw / 2, y + cardH / 2);
        textStyle(NORMAL);
    }
}

function drawEqCard(x, y, w, h, title, eq, note, bgColor, accentColor) {
    fill(bgColor);
    stroke(accentColor[0], accentColor[1], accentColor[2], 110);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    // Left accent bar
    noStroke();
    fill(accentColor);
    rect(x, y, 4, h, 5, 0, 0, 5);

    // Title
    textSize(10);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(title, x + 12, y + 7);
    textStyle(NORMAL);

    // Equation
    fill(colText);
    textSize(12.5);
    textStyle(BOLD);
    text(eq, x + 12, y + 20);
    textStyle(NORMAL);

    // Note
    fill(colTextLight);
    textSize(9.5);
    text(note, x + 12, y + 37);
}

function drawResultCard(x, y, w, h) {
    fill(colGreenBg);
    stroke(colGreen[0], colGreen[1], colGreen[2], 140);
    strokeWeight(1.5);
    rect(x, y, w, h, 5);

    noStroke();
    fill(colGreen);
    rect(x, y, 4, h, 5, 0, 0, 5);

    fill(colGreen);
    textSize(10);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Solved Node Voltages', x + 12, y + 7);
    textStyle(NORMAL);

    // V1 and V2 side by side
    fill(colText);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('V\u2081 = ' + v1.toFixed(3) + ' V', x + 12,     y + 22);
    text('V\u2082 = ' + v2.toFixed(3) + ' V', x + w / 2,  y + 22);
    textStyle(NORMAL);

    // Verification
    fill(colTextLight);
    textSize(9.5);
    text('Check: V\u2081\u2013V\u2082 = ' + (v1 - v2).toFixed(3) + ' V  \u2260  Vs = ' + vs.toFixed(1) + ' V \u2713', x + 12, y + h - 16);
}

// ─── Circuit Drawing ──────────────────────────────────────────────────────────

function drawCircuit() {
    let p = nodePos;

    stroke(colWire);
    strokeWeight(2.5);

    // Ground bus
    line(p.src_bot.x, p.src_bot.y, p.n2_bot.x, p.n2_bot.y);

    // Left vertical wire
    line(p.src_top.x, p.src_top.y, p.src_bot.x, p.src_bot.y);

    // Top wire: source to Node1
    line(p.src_top.x, p.src_top.y, p.n1.x, p.n1.y);

    // R1 on top wire
    drawResistor(p.src_top.x, p.src_top.y, p.n1.x, p.n1.y, 'R1');

    // Vs between Node1 and Node2
    drawVoltageSource(p.n1.x, p.n1.y, p.n2.x, p.n2.y, 'Vs');

    // R2: Node1 to GND
    line(p.n1.x, p.n1.y, p.n1_bot.x, p.n1_bot.y);
    drawResistor(p.n1.x, p.n1.y, p.n1_bot.x, p.n1_bot.y, 'R2');

    // R3: Node2 to GND
    line(p.n2.x, p.n2.y, p.n2_bot.x, p.n2_bot.y);
    drawResistor(p.n2.x, p.n2.y, p.n2_bot.x, p.n2_bot.y, 'R3');

    // 10V main source
    drawMainSource(p.src_top.x, p.src_top.y, p.src_bot.x, p.src_bot.y);

    // Ground symbol
    drawGroundSymbol((p.src_bot.x + p.n2_bot.x) / 2, p.src_bot.y);
}

function drawResistor(x1, y1, x2, y2, label) {
    let dx = x2 - x1, dy = y2 - y1;
    let len2 = sqrt(dx * dx + dy * dy);
    if (len2 === 0) return;
    let ux = dx / len2, uy = dy / len2;
    let px = -uy,       py = ux;

    let rLen = 40;
    let sf = 0.5 - rLen / (2 * len2);
    let ef = 0.5 + rLen / (2 * len2);
    let sx = x1 + dx * sf, sy = y1 + dy * sf;
    let ex = x1 + dx * ef, ey = y1 + dy * ef;

    stroke(colWire);
    strokeWeight(2.5);
    line(x1, y1, sx, sy);
    line(ex, ey, x2, y2);

    let numZags = 6, zagAmp = 7;
    stroke(colResistor);
    strokeWeight(2);
    noFill();
    beginShape();
    vertex(sx, sy);
    for (let i = 1; i < numZags; i++) {
        let t = i / numZags;
        let zx = sx + (ex - sx) * t;
        let zy = sy + (ey - sy) * t;
        let side = (i % 2 === 0) ? 1 : -1;
        vertex(zx + px * zagAmp * side, zy + py * zagAmp * side);
    }
    vertex(ex, ey);
    endShape();

    // Label
    let lx = (sx + ex) / 2 + px * 18;
    let ly = (sy + ey) / 2 + py * 18;
    noStroke();
    fill(colResistor);
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(label, lx, ly);
    textStyle(NORMAL);
}

function drawVoltageSource(x1, y1, x2, y2, label) {
    let cx2 = (x1 + x2) / 2, cy2 = (y1 + y2) / 2;
    let r = 18;
    let dx = x2 - x1, dy = y2 - y1;
    let len2 = sqrt(dx * dx + dy * dy);
    let ux = dx / len2, uy = dy / len2;

    stroke(colWire);
    strokeWeight(2.5);
    line(x1, y1, cx2 - ux * r, cy2 - uy * r);
    line(cx2 + ux * r, cy2 + uy * r, x2, y2);

    stroke(colSource);
    strokeWeight(2);
    noFill();
    ellipse(cx2, cy2, r * 2, r * 2);

    noStroke();
    fill(colSource);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('+', cx2 - 7, cy2);
    textSize(16);
    text('\u2013', cx2 + 8, cy2);

    textSize(12);
    textStyle(BOLD);
    text(label + ' = ' + vs.toFixed(1) + 'V', cx2, cy2 - r - 14);
    textStyle(NORMAL);
}

function drawMainSource(x1, y1, x2, y2) {
    let cx2 = (x1 + x2) / 2, cy2 = (y1 + y2) / 2;
    let r = 18;

    stroke(colSource);
    strokeWeight(2);
    noFill();
    ellipse(cx2, cy2, r * 2, r * 2);

    noStroke();
    fill(colSource);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('+', cx2, cy2 - 6);
    textSize(16);
    text('\u2013', cx2, cy2 + 7);

    textSize(12);
    textStyle(BOLD);
    text('10V', cx2 - r - 22, cy2);
    textStyle(NORMAL);
}

function drawGroundSymbol(x, y) {
    stroke(colGround);
    strokeWeight(2);
    let w1 = 18, w2 = 11, w3 = 5, gap = 5;
    line(x - w1, y + 4,         x + w1, y + 4);
    line(x - w2, y + 4 + gap,   x + w2, y + 4 + gap);
    line(x - w3, y + 4 + gap*2, x + w3, y + 4 + gap*2);

    noStroke();
    fill(colGround);
    textSize(10);
    textAlign(CENTER, TOP);
    text('GND (Ref)', x, y + 20);
}

function drawSupernodeBoundary() {
    let p = nodePos;
    let cx2 = (p.n1.x + p.n2.x) / 2;
    let cy2 = p.n1.y;
    let ew = (p.n2.x - p.n1.x) + 76;
    let eh = 60;

    // Filled semi-transparent interior
    noStroke();
    fill(147, 51, 234, 22);
    ellipse(cx2, cy2, ew, eh);

    // Dashed outline
    stroke(colSupernode);
    strokeWeight(2.2);
    drawingContext.setLineDash([9, 5]);
    noFill();
    ellipse(cx2, cy2, ew, eh);
    drawingContext.setLineDash([]);

    // Label above
    noStroke();
    fill(colSupernode);
    textSize(11);
    textAlign(CENTER, BOTTOM);
    textStyle(BOLD);
    text('Supernode', cx2, cy2 - eh / 2 - 4);
    textStyle(NORMAL);
}

function drawNodeLabels() {
    let p = nodePos;
    let r = 13;

    // Node 1
    stroke(colNode);
    strokeWeight(2);
    fill(colNode);
    ellipse(p.n1.x, p.n1.y, r * 2, r * 2);
    fill(255);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('1', p.n1.x, p.n1.y);
    textStyle(NORMAL);

    // Node 2
    stroke(colNode);
    strokeWeight(2);
    fill(colNode);
    ellipse(p.n2.x, p.n2.y, r * 2, r * 2);
    fill(255);
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('2', p.n2.x, p.n2.y);
    textStyle(NORMAL);
}

function drawSolvedValues() {
    let p = nodePos;

    function voltageTag(nx, ny, label, val) {
        let str = label + ' = ' + val.toFixed(2) + ' V';
        noStroke();
        textSize(12);
        let tw = textWidth(str) + 14;
        let tx = nx - tw / 2;
        let ty = ny + 16;
        fill(colGreenBg);
        stroke(colGreen[0], colGreen[1], colGreen[2], 180);
        strokeWeight(1.5);
        rect(tx, ty, tw, 22, 4);
        noStroke();
        fill(colGreen);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(str, nx, ty + 11);
        textStyle(NORMAL);
    }

    voltageTag(p.n1.x, p.n1.y, 'V\u2081', v1);
    voltageTag(p.n2.x, p.n2.y, 'V\u2082', v2);
}

// ─── Solve ────────────────────────────────────────────────────────────────────

function solveCircuit() {
    // Constraint: V1 - V2 = Vs  →  V2 = V1 - Vs
    // KCL:  (10 - V1)/R1 = V1/R2 + V2/R3
    // Substituting: 10/R1 + Vs/R3 = V1*(1/R1 + 1/R2 + 1/R3)
    let numerator   = 10 / r1 + vs / r3;
    let denominator = 1 / r1 + 1 / r2 + 1 / r3;
    v1 = numerator / denominator;
    v2 = v1 - vs;
    solved = true;
}

// ─── Interaction ──────────────────────────────────────────────────────────────

function mousePressed() {
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        let frac = (s.val - s.min) / (s.max - s.min);
        let thumbX = s.trackX + frac * s.trackW;
        let trackY = s.y + 10;
        if (dist(mouseX, mouseY, thumbX, trackY) < 14) {
            activeSlider = i;
            return;
        }
    }

    if (mouseInRect(supernodeCbX, supernodeCbY, 150, 16)) {
        showSupernode = !showSupernode;
        return;
    }

    let b = solveBtn;
    if (mouseInRect(b.x, b.y, b.w, b.h)) {
        solveCircuit();
        return;
    }
}

function mouseDragged() {
    if (activeSlider < 0) return;
    let s = sliders[activeSlider];
    let frac = constrain((mouseX - s.trackX) / s.trackW, 0, 1);
    let newVal;
    if (s.label === 'Vs') {
        newVal = round((s.min + frac * (s.max - s.min)) * 2) / 2;
    } else {
        newVal = round((s.min + frac * (s.max - s.min)) / 100) * 100;
    }
    s.val = constrain(newVal, s.min, s.max);
    s.setter(s.val);
    solved = false;
}

function mouseReleased() {
    activeSlider = -1;
}

function mouseInRect(rx, ry, rw, rh) {
    return mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh;
}

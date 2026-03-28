// Supernode Analysis MicroSim
// Circuit with voltage source between two non-reference nodes creating a supernode

let canvasWidth;
const canvasHeight = 480;
const margin = 20;

// Circuit parameters
let vs = 5;       // Voltage source (V)
let r1 = 1000;    // R1 (ohms)
let r2 = 2000;    // R2 (ohms)
let r3 = 1000;    // R3 (ohms)

// Slider data
let sliders = [];
let activeSlider = -1;

// Supernode boundary toggle
let showSupernode = true;
let supernodeCbX, supernodeCbY;

// Solve button
let solveBtn = { x: 0, y: 0, w: 80, h: 30 };
let solved = false;
let v1 = 0, v2 = 0; // Node voltages

// Colors
const colBg = [248, 250, 252];
const colPanel = [255, 255, 255];
const colBorder = [203, 213, 225];
const colText = [30, 41, 59];
const colTextLight = [100, 116, 139];
const colNode = [59, 130, 246];
const colWire = [51, 65, 85];
const colSource = [239, 68, 68];
const colResistor = [107, 114, 128];
const colSupernode = [147, 51, 234];    // purple
const colSupernodeFill = [147, 51, 234, 25];
const colAccent = [59, 130, 246];
const colGreen = [34, 197, 94];
const colHover = [241, 245, 249];
const colSliderTrack = [203, 213, 225];
const colSliderThumb = [59, 130, 246];
const colBtnBg = [59, 130, 246];
const colBtnHover = [37, 99, 235];
const colGround = [107, 114, 128];

// Node positions (set in setup)
let nodePos = {};

function setup() {
    canvasWidth = min(windowWidth - 40, 800);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('main');
    textFont('Arial');
    buildLayout();
}

function windowResized() {
    canvasWidth = min(windowWidth - 40, 800);
    resizeCanvas(canvasWidth, canvasHeight);
    buildLayout();
}

function buildLayout() {
    // Circuit layout
    // Topology:
    //   Node 1 ---[Vs]+--- Node 2
    //     |                  |
    //    [R1]              [R2]
    //     |                  |
    //   GND ----[R3]---- GND (Node 0, reference)
    //
    // Better: standard supernode circuit
    //        Node1 ----[Vs]---- Node2
    //          |                   |
    //         [R1]               [R2]
    //          |                   |
    //         GND ------[R3]----- GND
    //
    // Actually, let's have a proper topology:
    //   Vs connects Node1 to Node2 (floating source)
    //   R1 from Node1 to GND
    //   R2 from Node2 to GND
    //   R3 from Node2 to GND (or Node1 to GND for variety)
    //   ... We need R3 somewhere meaningful.
    //
    // Classic supernode: Is = source from GND to Node1, Vs between Node1-Node2
    // Let me use: current source Is or another arrangement.
    //
    // Simpler practical circuit:
    //   Independent source Vs1 from GND to Node1 through R1
    //   Dependent source Vs between Node1 and Node2
    //   R2 from Node2 to GND
    //   R3 from Node1 to GND
    //
    // Let's do the classic textbook supernode:
    //          +---[R1]---Node1---[Vs]---Node2---[R2]---+
    //          |            |                      |      |
    //         [Vs_main]    [R3]                  (nothing)|
    //          |            |                      |      |
    //         GND---------GND--------------------GND----GND
    //
    // Simplest meaningful:
    //   Vs_in (10V) connected from GND to Node_A through R1
    //   Vs (floating) between Node1 and Node2
    //   R2 from Node1 to GND, R3 from Node2 to GND
    //
    // Even simpler textbook version:
    //   A voltage source V_s is connected between Node1 and Node2 (both non-ref)
    //   R1 from a main voltage source to Node1
    //   R2 from Node1 to GND
    //   R3 from Node2 to GND
    //   Main source: 10V from left
    //
    // Final chosen circuit:
    //   Left: 10V source from GND up to top wire
    //   Top wire goes right, through R1 to Node1
    //   Node1 connects via Vs to Node2 (the supernode pair)
    //   Node1 connects via R2 to GND
    //   Node2 connects via R3 to GND
    //   This gives us a proper supernode (Vs between Node1 and Node2)
    //   Main source is fixed at 10V.

    let cx = canvasWidth / 2;
    let circTop = 70;
    let circBot = 260;
    let circLeft = max(60, cx - 220);
    let circRight = min(canvasWidth - 60, cx + 220);
    let midX = (circLeft + circRight) / 2;
    let n1x = midX - 60;
    let n2x = midX + 80;

    nodePos = {
        src_top: { x: circLeft, y: circTop },
        n1: { x: n1x, y: circTop },
        n2: { x: n2x, y: circTop },
        src_bot: { x: circLeft, y: circBot },
        n1_bot: { x: n1x, y: circBot },
        n2_bot: { x: n2x, y: circBot },
        gnd_left: { x: circLeft, y: circBot },
        gnd_right: { x: circRight, y: circBot }
    };

    // Sliders
    let sliderX = margin + 10;
    let sliderW = min(canvasWidth - 2 * margin - 20, 200);
    let sliderY = 300;
    let sliderGap = 38;

    sliders = [
        { x: sliderX, y: sliderY, w: sliderW, label: 'Vs', unit: 'V', min: 1, max: 20, val: vs, fmt: (v) => v.toFixed(1), setter: (v) => { vs = v; } },
        { x: sliderX, y: sliderY + sliderGap, w: sliderW, label: 'R1', unit: 'kΩ', min: 100, max: 10000, val: r1, fmt: (v) => (v / 1000).toFixed(1), setter: (v) => { r1 = v; } },
        { x: sliderX, y: sliderY + sliderGap * 2, w: sliderW, label: 'R2', unit: 'kΩ', min: 100, max: 10000, val: r2, fmt: (v) => (v / 1000).toFixed(1), setter: (v) => { r2 = v; } },
        { x: sliderX, y: sliderY + sliderGap * 3, w: sliderW, label: 'R3', unit: 'kΩ', min: 100, max: 10000, val: r3, fmt: (v) => (v / 1000).toFixed(1), setter: (v) => { r3 = v; } }
    ];

    // Supernode checkbox position
    supernodeCbX = sliderX;
    supernodeCbY = sliderY + sliderGap * 4 + 5;

    // Solve button
    solveBtn.x = sliderX + sliderW + 40;
    solveBtn.y = sliderY + sliderGap * 2 - 5;
    solveBtn.w = 90;
    solveBtn.h = 34;

    solved = false;
}

function draw() {
    background(colBg);
    drawTitle();
    drawCircuit();
    if (showSupernode) drawSupernodeBoundary();
    drawNodeLabels();
    if (solved) drawSolvedValues();
    drawSliders();
    drawSupernodeCheckbox();
    drawSolveButton();
    drawEquations();
}

function drawTitle() {
    fill(colText);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Supernode Analysis', margin + 5, 10);
    textStyle(NORMAL);
    textSize(11);
    fill(colTextLight);
    text('Voltage source Vs between Node 1 and Node 2 (non-reference nodes)', margin + 5, 30);
}

function drawCircuit() {
    let p = nodePos;

    // Ground bus (bottom wire)
    stroke(colWire);
    strokeWeight(2.5);
    line(p.src_bot.x, p.src_bot.y, p.n2_bot.x, p.n2_bot.y);

    // Left vertical wire (main source side)
    line(p.src_top.x, p.src_top.y, p.src_bot.x, p.src_bot.y);

    // Top wire from source to Node1
    line(p.src_top.x, p.src_top.y, p.n1.x, p.n1.y);

    // R1: between source top and Node1 (on top wire)
    drawResistor(p.src_top.x, p.src_top.y, p.n1.x, p.n1.y, 'R1');

    // Vs: between Node1 and Node2 (floating voltage source - the supernode creator)
    drawVoltageSource(p.n1.x, p.n1.y, p.n2.x, p.n2.y, 'Vs');

    // R2: Node1 to GND (vertical)
    line(p.n1.x, p.n1.y, p.n1_bot.x, p.n1_bot.y);
    drawResistor(p.n1.x, p.n1.y, p.n1_bot.x, p.n1_bot.y, 'R2');

    // R3: Node2 to GND (vertical)
    line(p.n2.x, p.n2.y, p.n2_bot.x, p.n2_bot.y);
    drawResistor(p.n2.x, p.n2.y, p.n2_bot.x, p.n2_bot.y, 'R3');

    // Main source: 10V on the left side
    drawMainSource(p.src_top.x, p.src_top.y, p.src_bot.x, p.src_bot.y);

    // Ground symbol
    drawGroundSymbol((p.src_bot.x + p.n2_bot.x) / 2, p.src_bot.y);
}

function drawResistor(x1, y1, x2, y2, label) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let len2 = sqrt(dx * dx + dy * dy);
    if (len2 === 0) return;
    let ux = dx / len2;
    let uy = dy / len2;
    let px = -uy;
    let py = ux;

    let rLen = 36;
    let startFrac = 0.5 - rLen / (2 * len2);
    let endFrac = 0.5 + rLen / (2 * len2);

    let sx = x1 + dx * startFrac;
    let sy = y1 + dy * startFrac;
    let ex = x1 + dx * endFrac;
    let ey = y1 + dy * endFrac;

    stroke(colWire);
    strokeWeight(2.5);
    line(x1, y1, sx, sy);
    line(ex, ey, x2, y2);

    let numZags = 6;
    let zagAmp = 6;
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

    let lx = (sx + ex) / 2 + px * 16;
    let ly = (sy + ey) / 2 + py * 16;
    noStroke();
    fill(colResistor);
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(label, lx, ly);
    textStyle(NORMAL);
}

function drawVoltageSource(x1, y1, x2, y2, label) {
    let cx2 = (x1 + x2) / 2;
    let cy2 = (y1 + y2) / 2;
    let r = 16;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let len2 = sqrt(dx * dx + dy * dy);
    let ux = dx / len2;
    let uy = dy / len2;

    stroke(colWire);
    strokeWeight(2.5);
    line(x1, y1, cx2 - ux * r, cy2 - uy * r);
    line(cx2 + ux * r, cy2 + uy * r, x2, y2);

    stroke(colSource);
    strokeWeight(2);
    noFill();
    ellipse(cx2, cy2, r * 2, r * 2);

    fill(colSource);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('+', cx2 - 7, cy2);
    textSize(16);
    text('\u2013', cx2 + 7, cy2);

    textSize(12);
    textStyle(BOLD);
    text(label + ' = ' + vs.toFixed(1) + 'V', cx2, cy2 - r - 12);
    textStyle(NORMAL);
}

function drawMainSource(x1, y1, x2, y2) {
    let cx2 = (x1 + x2) / 2;
    let cy2 = (y1 + y2) / 2;
    let r = 16;

    // Source is drawn on the wire (already drawn)
    // Just draw the circle symbol
    stroke(colSource);
    strokeWeight(2);
    noFill();
    ellipse(cx2, cy2, r * 2, r * 2);

    fill(colSource);
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('+', cx2, cy2 - 6);
    textSize(16);
    text('\u2013', cx2, cy2 + 6);

    textSize(12);
    textStyle(BOLD);
    text('10V', cx2 - r - 20, cy2);
    textStyle(NORMAL);
}

function drawGroundSymbol(x, y) {
    stroke(colGround);
    strokeWeight(2);
    let w1 = 16, w2 = 10, w3 = 4;
    let gap = 4;
    line(x - w1, y + 4, x + w1, y + 4);
    line(x - w2, y + 4 + gap, x + w2, y + 4 + gap);
    line(x - w3, y + 4 + gap * 2, x + w3, y + 4 + gap * 2);

    noStroke();
    fill(colGround);
    textSize(11);
    textAlign(CENTER, TOP);
    text('GND (Ref)', x, y + 18);
}

function drawSupernodeBoundary() {
    let p = nodePos;
    let n1 = p.n1;
    let n2 = p.n2;

    // Dashed ellipse around Node1, Vs, Node2
    let cx2 = (n1.x + n2.x) / 2;
    let cy2 = n1.y;
    let ew = (n2.x - n1.x) + 70;
    let eh = 55;

    stroke(colSupernode);
    strokeWeight(2);
    drawingContext.setLineDash([8, 5]);
    noFill();
    ellipse(cx2, cy2, ew, eh);

    // Fill with semi-transparent
    fill(colSupernodeFill[0], colSupernodeFill[1], colSupernodeFill[2], colSupernodeFill[3]);
    noStroke();
    drawingContext.setLineDash([]);
    ellipse(cx2, cy2, ew, eh);

    // Label
    noStroke();
    fill(colSupernode);
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Supernode', cx2, cy2 - eh / 2 - 10);
    textStyle(NORMAL);
    drawingContext.setLineDash([]);
}

function drawNodeLabels() {
    let p = nodePos;

    // Node 1
    fill(colNode);
    noStroke();
    ellipse(p.n1.x, p.n1.y, 20, 20);
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('1', p.n1.x, p.n1.y);
    textStyle(NORMAL);

    // Node 2
    fill(colNode);
    ellipse(p.n2.x, p.n2.y, 20, 20);
    fill(255);
    textSize(11);
    textStyle(BOLD);
    text('2', p.n2.x, p.n2.y);
    textStyle(NORMAL);

    // Source node (top-left junction)
    fill(colNode[0], colNode[1], colNode[2], 150);
    noStroke();
    // No label needed, it's connected to the 10V source
}

function drawSolvedValues() {
    let p = nodePos;

    // V1 label near Node 1
    fill(colGreen);
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    textStyle(BOLD);

    // V1 box
    let v1Str = 'V1 = ' + v1.toFixed(2) + 'V';
    let v1w = textWidth(v1Str) + 14;
    let v1x = p.n1.x;
    let v1y = p.n1.y + 14;
    fill(255);
    stroke(colGreen);
    strokeWeight(1.5);
    rect(v1x - v1w / 2, v1y, v1w, 22, 4);
    fill(colGreen);
    noStroke();
    textAlign(CENTER, CENTER);
    text(v1Str, v1x, v1y + 11);

    // V2 box
    let v2Str = 'V2 = ' + v2.toFixed(2) + 'V';
    let v2w = textWidth(v2Str) + 14;
    let v2x = p.n2.x;
    let v2y = p.n2.y + 14;
    fill(255);
    stroke(colGreen);
    strokeWeight(1.5);
    rect(v2x - v2w / 2, v2y, v2w, 22, 4);
    fill(colGreen);
    noStroke();
    text(v2Str, v2x, v2y + 11);
    textStyle(NORMAL);
}

function drawSliders() {
    for (let i = 0; i < sliders.length; i++) {
        drawSlider(sliders[i]);
    }
}

function drawSlider(s) {
    let thumbR = 8;
    let trackY = s.y + 10;

    // Label
    fill(colText);
    noStroke();
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(s.label + ':', s.x, s.y);
    textStyle(NORMAL);

    // Value display
    textAlign(RIGHT, CENTER);
    fill(colAccent);
    textSize(12);
    text(s.fmt(s.val) + ' ' + s.unit, s.x + s.w, s.y);

    // Track
    stroke(colSliderTrack);
    strokeWeight(3);
    line(s.x, trackY, s.x + s.w, trackY);

    // Filled track
    let frac = (s.val - s.min) / (s.max - s.min);
    let thumbX = s.x + frac * s.w;
    stroke(colSliderThumb);
    strokeWeight(3);
    line(s.x, trackY, thumbX, trackY);

    // Thumb
    let hovering = dist(mouseX, mouseY, thumbX, trackY) < thumbR + 4;
    fill(hovering ? colBtnHover : colSliderThumb);
    noStroke();
    ellipse(thumbX, trackY, thumbR * 2, thumbR * 2);
    fill(255);
    ellipse(thumbX, trackY, thumbR, thumbR);
}

function drawSupernodeCheckbox() {
    let size = 16;
    let hovering = mouseInRect(supernodeCbX, supernodeCbY, size + 120, size);
    stroke(colBorder);
    strokeWeight(1.5);
    fill(showSupernode ? colSupernode : (hovering ? colHover : colPanel));
    rect(supernodeCbX, supernodeCbY, size, size, 3);
    if (showSupernode) {
        stroke(255);
        strokeWeight(2);
        noFill();
        line(supernodeCbX + 3, supernodeCbY + 8, supernodeCbX + 7, supernodeCbY + 12);
        line(supernodeCbX + 7, supernodeCbY + 12, supernodeCbX + 13, supernodeCbY + 4);
    }
    noStroke();
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Show Supernode', supernodeCbX + size + 6, supernodeCbY + size / 2);
}

function drawSolveButton() {
    let b = solveBtn;
    let hovering = mouseInRect(b.x, b.y, b.w, b.h);
    fill(hovering ? colBtnHover : colBtnBg);
    noStroke();
    rect(b.x, b.y, b.w, b.h, 6);
    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Solve', b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

function drawEquations() {
    let eqX = solveBtn.x - 20;
    let eqY = solveBtn.y + solveBtn.h + 20;

    fill(colText);
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Equations:', eqX, eqY);
    textStyle(NORMAL);

    let lineH = 18;
    eqY += lineH + 4;

    textSize(11);
    fill(colTextLight);

    // Constraint equation: V1 - V2 = Vs
    text('Constraint:  V1 \u2013 V2 = Vs = ' + vs.toFixed(1) + 'V', eqX, eqY);
    eqY += lineH;

    // Supernode KCL: currents leaving supernode = currents entering
    // (10 - V1)/R1 = V1/R2 + V2/R3
    // Actually from our circuit:
    // At supernode (Node1 + Node2): sum of currents = 0
    // Current into Node1 through R1: (10 - V1)/R1
    // Current out of Node1 through R2: V1/R2
    // Current out of Node2 through R3: V2/R3
    // KCL: (10-V1)/R1 = V1/R2 + V2/R3
    let r1k = (r1 / 1000).toFixed(1);
    let r2k = (r2 / 1000).toFixed(1);
    let r3k = (r3 / 1000).toFixed(1);
    text('KCL:  (10\u2013V1)/R1 = V1/R2 + V2/R3', eqX, eqY);
    eqY += lineH;

    if (solved) {
        fill(colGreen);
        textStyle(BOLD);
        text('V1 = ' + v1.toFixed(3) + 'V,  V2 = ' + v2.toFixed(3) + 'V', eqX, eqY);
        textStyle(NORMAL);
    }
}

function solveCircuit() {
    // Circuit:
    // 10V source -> R1 -> Node1 -> Vs -> Node2
    //                      |               |
    //                     R2              R3
    //                      |               |
    //                     GND             GND
    //
    // Constraint: V1 - V2 = Vs
    // KCL at supernode: (10 - V1)/R1 = V1/R2 + V2/R3
    //
    // Substituting V2 = V1 - Vs into KCL:
    // (10 - V1)/R1 = V1/R2 + (V1 - Vs)/R3
    // (10 - V1)/R1 = V1/R2 + V1/R3 - Vs/R3
    // 10/R1 - V1/R1 = V1/R2 + V1/R3 - Vs/R3
    // 10/R1 + Vs/R3 = V1*(1/R1 + 1/R2 + 1/R3)
    // V1 = (10/R1 + Vs/R3) / (1/R1 + 1/R2 + 1/R3)

    let numerator = 10 / r1 + vs / r3;
    let denominator = 1 / r1 + 1 / r2 + 1 / r3;
    v1 = numerator / denominator;
    v2 = v1 - vs;
    solved = true;
}

function mousePressed() {
    // Check sliders
    for (let i = 0; i < sliders.length; i++) {
        let s = sliders[i];
        let frac = (s.val - s.min) / (s.max - s.min);
        let thumbX = s.x + frac * s.w;
        let trackY = s.y + 10;
        if (dist(mouseX, mouseY, thumbX, trackY) < 14) {
            activeSlider = i;
            return;
        }
    }

    // Check supernode checkbox
    if (mouseInRect(supernodeCbX, supernodeCbY, 130, 16)) {
        showSupernode = !showSupernode;
        return;
    }

    // Check solve button
    let b = solveBtn;
    if (mouseInRect(b.x, b.y, b.w, b.h)) {
        solveCircuit();
        return;
    }
}

function mouseDragged() {
    if (activeSlider >= 0) {
        let s = sliders[activeSlider];
        let frac = constrain((mouseX - s.x) / s.w, 0, 1);
        let newVal;
        if (s.label === 'Vs') {
            newVal = s.min + frac * (s.max - s.min);
            newVal = round(newVal * 2) / 2; // snap to 0.5
        } else {
            newVal = s.min + frac * (s.max - s.min);
            newVal = round(newVal / 100) * 100; // snap to 100
        }
        s.val = constrain(newVal, s.min, s.max);
        s.setter(s.val);
        solved = false; // reset when parameters change
    }
}

function mouseReleased() {
    activeSlider = -1;
}

function mouseInRect(rx, ry, rw, rh) {
    return mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh;
}

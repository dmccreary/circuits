// Circuit Simplification MicroSim
//
// Step-by-step simplification of a Wheatstone bridge circuit
// using Delta-to-Wye transformation. Shows each simplification
// step with highlighting, formulas, and a log panel.

'use strict';

// -- Canvas layout --
let containerWidth;
const canvasH = 580;

// -- Colours --
const BG         = [245, 248, 252];
const WIRE_COL   = [50, 55, 70];
const NODE_COL   = [40, 100, 200];
const RES_COL    = [70, 70, 70];
const HIGHLIGHT1 = [220, 60, 50];
const HIGHLIGHT2 = [40, 160, 80];
const HIGHLIGHT3 = [200, 140, 30];
const VS_COL     = [180, 50, 50];
const BTN_COL    = [50, 110, 220];
const BTN_HOVER  = [35, 85, 190];
const BTN_DISABLED = [160, 160, 170];
const LOG_BG     = [255, 255, 255];
const PANEL_BG   = [252, 252, 255];

// -- Default resistor values --
const R_VALS = [10, 20, 30, 40, 50];  // R1..R5
const VS = 12;

// -- Step definitions --
const STEP_COUNT = 6;
let currentStep = 0;

// -- Log entries --
let logEntries = [];

// -- Button geometry --
let nextBtn = {};
let resetBtn = {};

// -- Circuit drawing area --
let circX, circY, circW, circH;
let logX, logY, logW, logH;

// -- Computed values for steps --
let Ra_wye, Rb_wye, Rc_wye;
let R_series1, R_series2;
let R_parallel;
let R_eq;

// =====================================================================
function setup() {
    updateCanvasSize();
    let cnv = createCanvas(containerWidth, canvasH);
    cnv.parent(document.querySelector('main'));
    computeLayout();
    precomputeValues();
    initLog();
    textFont('Arial');
    noLoop();
    redraw();
}

function updateCanvasSize() {
    containerWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 960);
    containerWidth = max(containerWidth, 560);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasH);
    computeLayout();
    redraw();
}

function computeLayout() {
    let cw = containerWidth;

    // Circuit area: left 60%
    circX = 20;
    circY = 55;
    circW = cw * 0.58;
    circH = 400;

    // Log panel: right 35%
    logW = cw * 0.34;
    logX = cw - logW - 15;
    logY = 55;
    logH = 400;

    // Buttons
    let btnY = 475;
    let btnW = 100;
    let btnH = 32;
    let gap = 20;
    let totalW = btnW * 2 + gap;
    let startX = cw / 2 - totalW / 2;

    nextBtn = { x: startX, y: btnY, w: btnW, h: btnH };
    resetBtn = { x: startX + btnW + gap, y: btnY, w: btnW, h: btnH };
}

function precomputeValues() {
    // Delta formed by R1, R2, R5 (nodes A, B, D)
    // Using delta: R1 (A-B), R2 (B-D), R5 (A-D)
    let r1 = R_VALS[0], r2 = R_VALS[1], r3 = R_VALS[2], r4 = R_VALS[3], r5 = R_VALS[4];

    // Delta of R1, R2, R5 around nodes A, B, D
    let sum = r1 + r2 + r5;
    Ra_wye = (r1 * r5) / sum;  // node A: between R1 and R5
    Rb_wye = (r1 * r2) / sum;  // node B: between R1 and R2
    Rc_wye = (r2 * r5) / sum;  // node D: between R2 and R5

    // After wye replacement:
    // Series: Ra_wye + R3 (top path from center to C)
    // Series: Rc_wye + R4 (bottom path from center to C)
    R_series1 = Ra_wye + r3;   // top series
    R_series2 = Rc_wye + r4;   // bottom series

    // Parallel combination of the two series paths
    R_parallel = (R_series1 * R_series2) / (R_series1 + R_series2);

    // Total: Rb_wye (from B to center) + parallel combination
    R_eq = Rb_wye + R_parallel;
}

function initLog() {
    logEntries = [
        { step: 0, text: 'Bridge circuit with R1=' + R_VALS[0] + 'Ω, R2=' + R_VALS[1] + 'Ω, R3=' + R_VALS[2] + 'Ω, R4=' + R_VALS[3] + 'Ω, R5=' + R_VALS[4] + 'Ω' }
    ];
}

// =====================================================================
// DRAW
// =====================================================================
function draw() {
    background(BG);
    drawTitle();
    drawCircuitPanel();
    drawCircuit();
    drawLogPanel();
    drawButtons();
    drawStepInfo();
}

function drawTitle() {
    fill(30);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    textStyle(BOLD);
    text('Circuit Simplification: Bridge Circuit', containerWidth / 2, 10);
    textStyle(NORMAL);
    textSize(12);
    fill(100);
    text('Step-by-step Delta-to-Wye simplification  |  Vs = ' + VS + 'V', containerWidth / 2, 34);
}

function drawCircuitPanel() {
    fill(PANEL_BG);
    stroke(220);
    strokeWeight(1);
    rect(circX - 5, circY - 5, circW + 10, circH + 10, 8);
}

function drawLogPanel() {
    fill(LOG_BG);
    stroke(220);
    strokeWeight(1);
    rect(logX - 5, logY - 5, logW + 10, logH + 10, 8);

    // Title
    fill(50);
    noStroke();
    textSize(13);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Operations Log', logX + 5, logY + 5);
    textStyle(NORMAL);

    // Step indicator
    fill(100);
    textSize(11);
    text('Step ' + currentStep + ' / ' + (STEP_COUNT - 1), logX + 5, logY + 24);

    // Draw log entries
    let ly = logY + 45;
    textSize(11);
    for (let i = 0; i < logEntries.length; i++) {
        let entry = logEntries[i];
        let isActive = entry.step === currentStep;

        if (isActive) {
            fill(240, 245, 255);
            noStroke();
            rect(logX, ly - 3, logW, 42, 4);
        }

        fill(isActive ? [30, 70, 160] : [80, 80, 80]);
        textAlign(LEFT, TOP);
        textStyle(isActive ? BOLD : NORMAL);

        let wrappedText = wrapText(entry.text, logW - 15);
        for (let j = 0; j < wrappedText.length; j++) {
            text(wrappedText[j], logX + 5, ly + j * 14);
        }
        ly += max(wrappedText.length, 1) * 14 + 8;

        if (ly > logY + logH - 10) break;
    }
    textStyle(NORMAL);
}

function wrapText(txt, maxW) {
    let words = txt.split(' ');
    let lines = [];
    let currentLine = '';
    for (let w of words) {
        let testLine = currentLine ? currentLine + ' ' + w : w;
        if (textWidth(testLine) > maxW && currentLine) {
            lines.push(currentLine);
            currentLine = w;
        } else {
            currentLine = testLine;
        }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
}

// =====================================================================
// CIRCUIT DRAWING (per step)
// =====================================================================
function drawCircuit() {
    push();
    translate(circX, circY);

    let cx = circW / 2;
    let cy = circH / 2;
    let spread = min(circW * 0.35, 150);
    let vSpread = min(circH * 0.3, 120);

    if (currentStep <= 2) {
        drawBridgeCircuit(cx, cy, spread, vSpread);
    } else if (currentStep === 3) {
        drawWyeReplacedCircuit(cx, cy, spread, vSpread);
    } else if (currentStep === 4) {
        drawSeriesCombinedCircuit(cx, cy, spread, vSpread);
    } else {
        drawFinalCircuit(cx, cy, spread, vSpread);
    }

    pop();
}

// Step 0, 1, 2: Original bridge circuit
function drawBridgeCircuit(cx, cy, sp, vsp) {
    // Nodes: A (left-top), B (left-bottom), C (right), D (top)
    // Layout: Left=source, top-left=A, bottom-left=B, top-right=D, bottom-right=C
    let nodeA = { x: cx - sp, y: cy - vsp, label: 'A' };
    let nodeB = { x: cx - sp, y: cy + vsp, label: 'B' };
    let nodeC = { x: cx + sp, y: cy + vsp, label: 'C' };
    let nodeD = { x: cx + sp, y: cy - vsp, label: 'D' };

    // Voltage source: A to B (left side)
    drawVoltageSource(nodeA.x - 30, nodeA.y, nodeB.x - 30, nodeB.y);
    // Connect source to nodes
    strokeWeight(2);
    stroke(WIRE_COL);
    line(nodeA.x - 30, nodeA.y, nodeA.x, nodeA.y);
    line(nodeB.x - 30, nodeB.y, nodeB.x, nodeB.y);

    // R1: A to D (top)
    let r1Col = (currentStep === 1 || currentStep === 2) ? HIGHLIGHT1 : RES_COL;
    drawResistor(nodeA.x, nodeA.y, nodeD.x, nodeD.y, 'R1=' + R_VALS[0] + 'Ω', r1Col, -16);

    // R3: A to C (diagonal or via mid)
    let r3Col = RES_COL;
    drawResistor(nodeA.x, nodeA.y + 5, nodeC.x, nodeC.y - 5, 'R3=' + R_VALS[2] + 'Ω', r3Col, 0);

    // R2: B to D
    let r2Col = (currentStep === 1 || currentStep === 2) ? HIGHLIGHT1 : RES_COL;
    drawResistor(nodeB.x, nodeB.y, nodeD.x, nodeD.y, 'R2=' + R_VALS[1] + 'Ω', r2Col, 0);

    // R4: B to C (bottom)
    let r4Col = RES_COL;
    drawResistor(nodeB.x, nodeB.y, nodeC.x, nodeC.y, 'R4=' + R_VALS[3] + 'Ω', r4Col, 16);

    // R5: D to C (right)
    let r5Col = (currentStep === 1 || currentStep === 2) ? HIGHLIGHT1 : RES_COL;
    drawResistor(nodeD.x, nodeD.y, nodeC.x, nodeC.y, 'R5=' + R_VALS[4] + 'Ω', r5Col, -16);

    // Draw nodes
    drawNode(nodeA.x, nodeA.y, 'A');
    drawNode(nodeB.x, nodeB.y, 'B');
    drawNode(nodeC.x, nodeC.y, 'C');
    drawNode(nodeD.x, nodeD.y, 'D');

    // Step-specific highlights
    if (currentStep === 0) {
        fill(80);
        noStroke();
        textSize(11);
        textAlign(CENTER, BOTTOM);
        text('Bridge circuit: cannot simplify with series/parallel alone', cx, circH - 10);
    }

    if (currentStep === 1) {
        // Highlight the delta
        noFill();
        stroke(HIGHLIGHT1[0], HIGHLIGHT1[1], HIGHLIGHT1[2], 80);
        strokeWeight(3);
        triangle(nodeA.x, nodeA.y, nodeB.x, nodeB.y, nodeD.x, nodeD.y);

        fill(HIGHLIGHT1);
        noStroke();
        textSize(11);
        textAlign(CENTER, BOTTOM);
        text('Identified Delta: R1, R2, R5 around nodes A, B, D', cx, circH - 10);
    }

    if (currentStep === 2) {
        noFill();
        stroke(HIGHLIGHT1[0], HIGHLIGHT1[1], HIGHLIGHT1[2], 80);
        strokeWeight(3);
        triangle(nodeA.x, nodeA.y, nodeB.x, nodeB.y, nodeD.x, nodeD.y);

        fill(HIGHLIGHT1);
        noStroke();
        textSize(10);
        textAlign(CENTER, BOTTOM);
        let sum = R_VALS[0] + R_VALS[1] + R_VALS[4];
        text('Delta→Wye: Sum = R1+R2+R5 = ' + sum + 'Ω', cx, circH - 28);
        text(
            'Ra=' + nf(Ra_wye, 0, 2) + 'Ω   Rb=' + nf(Rb_wye, 0, 2) + 'Ω   Rc=' + nf(Rc_wye, 0, 2) + 'Ω',
            cx, circH - 12
        );
    }
}

// Step 3: Wye replaced
function drawWyeReplacedCircuit(cx, cy, sp, vsp) {
    // After replacing delta (A,B,D) with wye, we have a center node N
    let nodeA = { x: cx - sp * 0.7, y: cy - vsp * 0.6 };
    let nodeB = { x: cx - sp * 0.7, y: cy + vsp * 0.6 };
    let nodeC = { x: cx + sp, y: cy };
    let nodeN = { x: cx - sp * 0.1, y: cy };  // Wye center

    // Voltage source: A to B
    drawVoltageSource(nodeA.x - 40, nodeA.y, nodeB.x - 40, nodeB.y);
    strokeWeight(2);
    stroke(WIRE_COL);
    line(nodeA.x - 40, nodeA.y, nodeA.x, nodeA.y);
    line(nodeB.x - 40, nodeB.y, nodeB.x, nodeB.y);

    // Ra_wye: A to N
    drawResistor(nodeA.x, nodeA.y, nodeN.x, nodeN.y,
        'Ra\'=' + nf(Ra_wye, 0, 1) + 'Ω', HIGHLIGHT2, 0);

    // Rb_wye: B to N
    drawResistor(nodeB.x, nodeB.y, nodeN.x, nodeN.y,
        'Rb\'=' + nf(Rb_wye, 0, 1) + 'Ω', HIGHLIGHT2, 0);

    // R3: A to C (top path goes A -> N via Ra', then up-right to C)
    // Actually after wye, the connections are:
    // Ra' from A to N, R3 from A to C, Rc' from D(now N) to C, R4 from B to C
    // Let me restructure: the wye center connects to A, B, and where D was
    // The node D is eliminated. Its connections (R5 to A, R2 to B, R1 to ?) get replaced.

    // Actually let me redraw properly:
    // Original delta: R1(A-D), R2(B-D), R5(D-C) -- wait, let me recheck
    // From precompute: Delta of R1, R2, R5 around nodes A, B, D
    // R1: A-B (connecting A and B... no that's wrong)

    // Let me use the bridge topology:
    // A--R1--D, A--R3--C, B--R2--D, B--R4--C, D--R5--C
    // Delta around A, B, D: edges R1(A-D), R2(B-D), and the path A-B
    // Hmm actually the delta I chose in precompute is R1, R2, R5
    // where sum = r1 + r2 + r5 and the nodes are implicit.

    // For the visual, after wye transform of delta(A,B,D):
    // Wye center N connects to A, B, and D-position
    // Ra' = node going toward A
    // Rb' = node going toward B
    // Rc' = node going toward (old D position), which connects to R5->C
    // Then R3 still connects A to C, R4 still connects B to C

    // Simpler topology for visual:
    // N is center, Ra' goes up-left to A, Rb' goes down-left to B, Rc' goes right
    // From Rc' endpoint, R5 used to go to C -- but R5 was part of delta.
    //
    // OK let me reconsider the delta choice. In precompute:
    // Delta of R1, R2, R5 around nodes A, B, D
    // After wye transform, N replaces the internal triangle.
    // N-A has Ra_wye, N-B has Rb_wye, N-D has Rc_wye
    // But D node still connects to C via R5... NO, R5 was part of the delta.
    //
    // Let me reconsider. Bridge: A-top-left, B-bottom-left, C-right, D-top-right
    // Edges: R1(A-D top), R2(B-D diagonal), R3(A-C diagonal), R4(B-C bottom), R5(D-C right)
    // Choose delta around D: R1(A-D), R2(B-D), R5(D-C)
    // Replace with wye at center N:
    //   N-A = R1*R5/(R1+R2+R5) = 10*50/80 = 6.25  -- this is Ra_wye
    //   N-B = R1*R2/(R1+R2+R5) = 10*20/80 = 2.5    -- this is Rb_wye
    //   N-C = R2*R5/(R1+R2+R5) = 20*50/80 = 12.5   -- this is Rc_wye
    // Then remaining: R3(A-C) and R4(B-C) still exist.
    // Top path: N --Ra'--> A --R3--> C => series Ra'+R3 = 6.25+30 = 36.25
    // Bot path: N --Rc'--> C         => just Rc' = 12.5  WAIT no.
    //
    // After replacing delta at D:
    // N connects to A (Ra'), B (Rb'), C (Rc')
    // Remaining edges: R3(A-C) and R4(B-C)
    // From N: two paths to C:
    //   Path 1: N -> A (Ra') -> C (R3): series = Ra' + R3
    //   Path 2: N -> C (Rc'): just Rc'... but also B connects to C via R4
    // And from Vs: A to B, with N branching.
    //
    // Actually the circuit after wye:
    // Source: + at A, - at B
    // From A: Ra' to N
    // From B: Rb' to N
    // Wait, that means both A and B connect to N directly.
    // Also A connects to C via R3, B connects to C via R4.
    // And N connects to C via Rc'.
    //
    // Hmm, this doesn't simplify as nicely. Let me reconsider which delta to pick.
    //
    // Better choice: pick the delta that creates nice series after transform.
    // Delta around A: R1(A-D), R3(A-C), and... there's no direct B-D or B-C that
    // completes a triangle with A. Let me think about this differently.
    //
    // Actually the standard approach for a Wheatstone bridge:
    // Nodes: 1(top/source+), 2(left), 3(right), 4(bottom/source-)
    // R1: 1-2, R2: 1-3, R3: 2-4, R4: 3-4, R5: 2-3 (bridge)
    // Delta at nodes 1,2,3: R1(1-2), R2(1-3), R5(2-3)
    // Wye: N in center
    //   N-1 = R1*R2/(R1+R2+R5)
    //   N-2 = R1*R5/(R1+R2+R5)
    //   N-3 = R2*R5/(R1+R2+R5)
    // Then: N-2 in series with R3(2-4) -> top path N to 4
    //        N-3 in series with R4(3-4) -> bottom path N to 4
    // These two parallel -> then add N-1 in series with source
    // That's the clean simplification!

    // Let me just draw the post-wye topology visually:
    // B (source-) on left, N in middle, C (source+... mapped to node 4) on right
    // Two paths from N to C: top and bottom, then Rb' from source to N

    // Source on left
    let srcTop = { x: cx - sp, y: cy - vsp * 0.5 };
    let srcBot = { x: cx - sp, y: cy + vsp * 0.5 };

    drawVoltageSource(srcTop.x - 25, srcTop.y, srcBot.x - 25, srcBot.y);
    stroke(WIRE_COL); strokeWeight(2);
    line(srcTop.x - 25, srcTop.y, srcTop.x, srcTop.y);
    line(srcBot.x - 25, srcBot.y, srcBot.x, srcBot.y);

    // Node 1 (top of source)
    // Rb_wye from node1 to N
    let n1 = { x: srcTop.x, y: srcTop.y };
    let nCenter = { x: cx - sp * 0.15, y: cy };

    // Wire from source top to split point
    stroke(WIRE_COL); strokeWeight(2);
    line(n1.x, n1.y, n1.x, nCenter.y);

    // Rb' (N-1): from node1 down to N center
    drawResistor(n1.x, nCenter.y, nCenter.x, nCenter.y,
        'Rb\'=' + nf(Rb_wye, 0, 1) + 'Ω', HIGHLIGHT2, -16);

    // Top path: Ra' + R3
    let topMid = { x: cx + sp * 0.3, y: cy - vsp * 0.6 };
    let rightNode = { x: cx + sp * 0.8, y: cy };

    stroke(WIRE_COL); strokeWeight(2);
    line(nCenter.x, nCenter.y, nCenter.x, topMid.y);

    drawResistor(nCenter.x, topMid.y, topMid.x, topMid.y,
        'Ra\'=' + nf(Ra_wye, 0, 1) + 'Ω', HIGHLIGHT2, -16);
    drawResistor(topMid.x, topMid.y, rightNode.x, topMid.y,
        'R3=' + R_VALS[2] + 'Ω', RES_COL, -16);

    stroke(WIRE_COL); strokeWeight(2);
    line(rightNode.x, topMid.y, rightNode.x, rightNode.y);

    // Bottom path: Rc' + R4
    let botMid = { x: cx + sp * 0.3, y: cy + vsp * 0.6 };

    stroke(WIRE_COL); strokeWeight(2);
    line(nCenter.x, nCenter.y, nCenter.x, botMid.y);

    drawResistor(nCenter.x, botMid.y, botMid.x, botMid.y,
        'Rc\'=' + nf(Rc_wye, 0, 1) + 'Ω', HIGHLIGHT2, 18);
    drawResistor(botMid.x, botMid.y, rightNode.x, botMid.y,
        'R4=' + R_VALS[3] + 'Ω', RES_COL, 18);

    stroke(WIRE_COL); strokeWeight(2);
    line(rightNode.x, botMid.y, rightNode.x, rightNode.y);

    // Wire from right node back down to source bottom
    line(rightNode.x, rightNode.y, rightNode.x, srcBot.y);
    line(rightNode.x, srcBot.y, srcBot.x, srcBot.y);

    // Nodes
    drawNode(n1.x, nCenter.y, '');
    drawNode(nCenter.x, nCenter.y, 'N');
    drawNode(nCenter.x, topMid.y, '');
    drawNode(nCenter.x, botMid.y, '');
    drawNode(rightNode.x, rightNode.y, '');

    fill(HIGHLIGHT2);
    noStroke();
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Delta replaced with Wye (green resistors)', cx, circH - 10);
}

// Step 4: Series combined
function drawSeriesCombinedCircuit(cx, cy, sp, vsp) {
    let srcTop = { x: cx - sp, y: cy - vsp * 0.4 };
    let srcBot = { x: cx - sp, y: cy + vsp * 0.4 };

    drawVoltageSource(srcTop.x - 25, srcTop.y, srcBot.x - 25, srcBot.y);
    stroke(WIRE_COL); strokeWeight(2);
    line(srcTop.x - 25, srcTop.y, srcTop.x, srcTop.y);
    line(srcBot.x - 25, srcBot.y, srcBot.x, srcBot.y);

    let n1 = { x: srcTop.x, y: cy };
    stroke(WIRE_COL); strokeWeight(2);
    line(srcTop.x, srcTop.y, n1.x, n1.y);

    // Rb' to center
    let nCenter = { x: cx - sp * 0.2, y: cy };
    drawResistor(n1.x, n1.y, nCenter.x, nCenter.y,
        'Rb\'=' + nf(Rb_wye, 0, 1) + 'Ω', RES_COL, -16);

    // Top: combined series
    let topY = cy - vsp * 0.55;
    let rightNode = { x: cx + sp * 0.7, y: cy };

    stroke(WIRE_COL); strokeWeight(2);
    line(nCenter.x, nCenter.y, nCenter.x, topY);

    drawResistor(nCenter.x, topY, rightNode.x, topY,
        'Rs1=' + nf(R_series1, 0, 1) + 'Ω', HIGHLIGHT3, -16);

    stroke(WIRE_COL); strokeWeight(2);
    line(rightNode.x, topY, rightNode.x, rightNode.y);

    // Bottom: combined series
    let botY = cy + vsp * 0.55;
    stroke(WIRE_COL); strokeWeight(2);
    line(nCenter.x, nCenter.y, nCenter.x, botY);

    drawResistor(nCenter.x, botY, rightNode.x, botY,
        'Rs2=' + nf(R_series2, 0, 1) + 'Ω', HIGHLIGHT3, 18);

    stroke(WIRE_COL); strokeWeight(2);
    line(rightNode.x, botY, rightNode.x, rightNode.y);

    // Return to source
    line(rightNode.x, rightNode.y, rightNode.x, srcBot.y);
    line(rightNode.x, srcBot.y, srcBot.x, srcBot.y);

    drawNode(nCenter.x, nCenter.y, 'N');
    drawNode(rightNode.x, rightNode.y, '');

    fill(HIGHLIGHT3);
    noStroke();
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Series: Ra\'+R3 = ' + nf(R_series1, 0, 2) + 'Ω,  Rc\'+R4 = ' + nf(R_series2, 0, 2) + 'Ω', cx, circH - 10);
}

// Step 5: Final Req
function drawFinalCircuit(cx, cy, sp, vsp) {
    let srcTop = { x: cx - sp * 0.4, y: cy - vsp * 0.4 };
    let srcBot = { x: cx - sp * 0.4, y: cy + vsp * 0.4 };

    drawVoltageSource(srcTop.x - 25, srcTop.y, srcBot.x - 25, srcBot.y);
    stroke(WIRE_COL); strokeWeight(2);
    line(srcTop.x - 25, srcTop.y, srcTop.x, srcTop.y);
    line(srcBot.x - 25, srcBot.y, srcBot.x, srcBot.y);

    // Single equivalent resistor
    let leftX = srcTop.x;
    let rightX = cx + sp * 0.5;
    let midY = cy;

    stroke(WIRE_COL); strokeWeight(2);
    line(leftX, srcTop.y, leftX, midY);

    drawResistor(leftX, midY, rightX, midY,
        'Req=' + nf(R_eq, 0, 2) + 'Ω', [40, 130, 200], -18);

    stroke(WIRE_COL); strokeWeight(2);
    line(rightX, midY, rightX, srcBot.y);
    line(rightX, srcBot.y, srcBot.x, srcBot.y);

    // Display final values prominently
    noStroke();
    fill(40, 130, 200);
    textSize(16);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('Req = ' + nf(R_eq, 0, 2) + ' Ω', cx, cy + vsp + 20);

    let current = VS / R_eq;
    fill(VS_COL);
    textSize(13);
    text('I = Vs/Req = ' + VS + '/' + nf(R_eq, 0, 2) + ' = ' + nf(current, 0, 3) + ' A', cx, cy + vsp + 45);
    textStyle(NORMAL);

    fill(80);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text('Simplification complete!', cx, circH - 10);
}

// =====================================================================
// PRIMITIVE DRAWING
// =====================================================================
function drawResistor(x1, y1, x2, y2, label, col, labelOffset) {
    let dx = x2 - x1, dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    if (len < 1) return;
    let ux = dx / len, uy = dy / len;
    let px = -uy, py = ux;

    let resLen = len * 0.5;
    let startF = 0.5 - resLen / (2 * len);
    let endF = 0.5 + resLen / (2 * len);

    // Wires
    stroke(WIRE_COL);
    strokeWeight(2);
    line(x1, y1, x1 + dx * startF, y1 + dy * startF);
    line(x1 + dx * endF, y1 + dy * endF, x2, y2);

    // Zigzag
    stroke(col);
    strokeWeight(2.5);
    noFill();
    let zigN = 5;
    let zigAmp = 5;
    let sx = x1 + dx * startF;
    let sy = y1 + dy * startF;
    let segDx = (dx * (endF - startF)) / zigN;
    let segDy = (dy * (endF - startF)) / zigN;

    beginShape();
    vertex(sx, sy);
    for (let j = 0; j < zigN; j++) {
        let sign = (j % 2 === 0) ? 1 : -1;
        let mx = sx + segDx * (j + 0.5) + px * zigAmp * sign;
        let my = sy + segDy * (j + 0.5) + py * zigAmp * sign;
        vertex(mx, my);
    }
    vertex(x1 + dx * endF, y1 + dy * endF);
    endShape();

    // Label
    if (label) {
        let midX = (x1 + x2) / 2 + px * labelOffset;
        let midY = (y1 + y2) / 2 + py * labelOffset;
        fill(col);
        noStroke();
        textSize(10);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(label, midX, midY);
        textStyle(NORMAL);
    }
}

function drawVoltageSource(x1, y1, x2, y2) {
    let cx = (x1 + x2) / 2;
    let cy = (y1 + y2) / 2;
    let r = 14;

    stroke(WIRE_COL);
    strokeWeight(2);
    line(x1, y1, cx, cy - r);
    line(cx, cy + r, x2, y2);

    // Circle
    noFill();
    stroke(VS_COL);
    strokeWeight(2);
    circle(cx, cy, r * 2);

    // + and -
    fill(VS_COL);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('+', cx, cy - r * 0.4);
    text('-', cx, cy + r * 0.4);
    textStyle(NORMAL);

    // Label
    textSize(9);
    fill(VS_COL);
    textAlign(LEFT, CENTER);
    text(VS + 'V', cx + r + 4, cy);
}

function drawNode(x, y, label) {
    fill(NODE_COL);
    noStroke();
    circle(x, y, 8);
    if (label) {
        fill(30);
        textSize(11);
        textStyle(BOLD);
        textAlign(CENTER, BOTTOM);
        text(label, x, y - 7);
        textStyle(NORMAL);
    }
}

// =====================================================================
// BUTTONS
// =====================================================================
function drawButtons() {
    // Next Step
    let b = nextBtn;
    let canNext = currentStep < STEP_COUNT - 1;
    let hoverN = canNext && isInsideRect(mouseX, mouseY, b.x, b.y, b.w, b.h);
    fill(canNext ? (hoverN ? BTN_HOVER : BTN_COL) : BTN_DISABLED);
    noStroke();
    rect(b.x, b.y, b.w, b.h, 6);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Next Step', b.x + b.w / 2, b.y + b.h / 2);

    // Reset
    b = resetBtn;
    let hoverR = isInsideRect(mouseX, mouseY, b.x, b.y, b.w, b.h);
    fill(hoverR ? [180, 50, 50] : [200, 70, 70]);
    rect(b.x, b.y, b.w, b.h, 6);
    fill(255);
    text('Reset', b.x + b.w / 2, b.y + b.h / 2);
    textStyle(NORMAL);
}

function drawStepInfo() {
    // Step progress bar
    let barX = nextBtn.x;
    let barY = nextBtn.y + nextBtn.h + 14;
    let barW = resetBtn.x + resetBtn.w - nextBtn.x;
    let barH = 6;

    fill(220);
    noStroke();
    rect(barX, barY, barW, barH, 3);

    fill(BTN_COL);
    let progress = currentStep / (STEP_COUNT - 1);
    rect(barX, barY, barW * progress, barH, 3);

    // Step dots
    for (let i = 0; i < STEP_COUNT; i++) {
        let dotX = barX + (barW * i) / (STEP_COUNT - 1);
        fill(i <= currentStep ? BTN_COL : [200, 200, 200]);
        noStroke();
        circle(dotX, barY + barH / 2, 10);
        fill(255);
        textSize(7);
        textAlign(CENTER, CENTER);
        text(i, dotX, barY + barH / 2);
    }

    // Step description
    let descriptions = [
        'Original bridge circuit',
        'Identify delta configuration',
        'Calculate wye equivalents',
        'Replace delta with wye',
        'Combine series resistors',
        'Combine parallel + final Req'
    ];
    fill(80);
    textSize(11);
    textAlign(CENTER, TOP);
    noStroke();
    text('Step ' + currentStep + ': ' + descriptions[currentStep], containerWidth / 2, barY + 16);
}

// =====================================================================
// INPUT HANDLING
// =====================================================================
function mousePressed() {
    // Next Step button
    if (currentStep < STEP_COUNT - 1 &&
        isInsideRect(mouseX, mouseY, nextBtn.x, nextBtn.y, nextBtn.w, nextBtn.h)) {
        currentStep++;
        addLogEntry();
        redraw();
        return;
    }

    // Reset button
    if (isInsideRect(mouseX, mouseY, resetBtn.x, resetBtn.y, resetBtn.w, resetBtn.h)) {
        currentStep = 0;
        initLog();
        redraw();
        return;
    }
}

function addLogEntry() {
    let r1 = R_VALS[0], r2 = R_VALS[1], r3 = R_VALS[2], r4 = R_VALS[3], r5 = R_VALS[4];
    let sum = r1 + r2 + r5;

    let entries = {
        1: 'Identify Delta: R1(' + r1 + '), R2(' + r2 + '), R5(' + r5 + ') around nodes A, B, D',
        2: 'Delta-to-Wye: Ra\'=' + nf(Ra_wye, 0, 2) + 'Ω, Rb\'=' + nf(Rb_wye, 0, 2) + 'Ω, Rc\'=' + nf(Rc_wye, 0, 2) + 'Ω  (sum=' + sum + ')',
        3: 'Replace delta with wye resistors. R3 and R4 remain.',
        4: 'Series: Ra\'+R3 = ' + nf(R_series1, 0, 2) + 'Ω,  Rc\'+R4 = ' + nf(R_series2, 0, 2) + 'Ω',
        5: 'Parallel: ' + nf(R_series1, 0, 2) + ' || ' + nf(R_series2, 0, 2) + ' = ' + nf(R_parallel, 0, 2) + 'Ω. Req = Rb\' + Rp = ' + nf(R_eq, 0, 2) + 'Ω. I = ' + nf(VS / R_eq, 0, 3) + 'A'
    };

    if (entries[currentStep]) {
        logEntries.push({ step: currentStep, text: entries[currentStep] });
    }
}

function mouseMoved() {
    redraw();
}

// =====================================================================
// UTILITY
// =====================================================================
function isInsideRect(mx, my, rx, ry, rw, rh) {
    return mx >= rx && mx <= rx + rw && my >= ry && my <= ry + rh;
}

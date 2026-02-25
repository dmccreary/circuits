// RC Charging Circuit MicroSim
// Visualizes RC charging with circuit schematic, animated current flow,
// and synchronized voltage/current graphs
// Uses drawAnimatedWire, drawResistor, drawCapacitor from circuit-lib.js
// Note: circuit-lib.js declares globals: animationTime, isRunning, defaultLineWidth

// Canvas dimensions
let canvasWidth = 580;
let circuitHeight = 250;   // Top: circuit schematic
let graphHeight = 250;     // Bottom: dual graphs
let controlHeight = 110;   // Controls area
let drawHeight;             // circuitHeight + graphHeight
let canvasHeight;
let margin = 10;
let sliderLeftMargin = 250;

// Responsive
let containerWidth;

// Simulation state
let switchClosed = false;
let simTime = 0;           // Simulation time in seconds
// animationTime is declared in circuit-lib.js
let graphData = [];         // Array of {t, vc, i} points for plotting

// Circuit parameters (defaults from chapter spec)
let vs = 10;       // Source voltage (V)
let rVal = 10;     // Resistance (kΩ)
let cVal = 10;     // Capacitance (µF)

// Computed values
let tau;            // Time constant (seconds)
let iInitial;       // Initial current (mA)
let vcNow = 0;     // Current capacitor voltage
let iNow = 0;      // Current current

// UI positions
let sliderX, sliderWidth;
let sliderY1, sliderY2, sliderY3;
let buttonX, buttonY;

// lineWidth is used by circuit-lib.js drawAnimatedWire
// It's not declared with let/const in the lib, so we declare it here
lineWidth = 3;

// Simulation speed: how many simulated seconds per real second
let simSpeed;

function setup() {
    drawHeight = circuitHeight + graphHeight;
    canvasHeight = drawHeight + controlHeight;
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    sliderX = sliderLeftMargin;
    sliderWidth = containerWidth - sliderX - 20;
    sliderY1 = drawHeight + 18;
    sliderY2 = drawHeight + 40;
    sliderY3 = drawHeight + 62;
    buttonX = 15;
    buttonY = drawHeight + 82;

    recalculate();

    describe('Interactive RC charging circuit simulation showing circuit schematic with animated electron flow and real-time voltage and current graphs.', LABEL);
}

function draw() {
    background(255);

    // Update simulation if switch is closed
    if (switchClosed) {
        let dt = deltaTime / 1000; // Convert ms to seconds
        simTime += dt * simSpeed;
        animationTime += deltaTime;  // global from circuit-lib.js

        // Calculate instantaneous values
        vcNow = vs * (1 - Math.exp(-simTime / tau));
        iNow = iInitial * Math.exp(-simTime / tau);

        // Record data point for graphs
        if (graphData.length === 0 || simTime - graphData[graphData.length - 1].t > tau * 0.01) {
            graphData.push({ t: simTime, vc: vcNow, i: iNow });
        }

        // Stop at 5τ (fully charged)
        if (simTime >= 5 * tau) {
            simTime = 5 * tau;
            vcNow = vs;
            iNow = 0;
        }
    }

    drawCircuitDiagram();

    // Divider between circuit and graphs
    stroke(180);
    strokeWeight(1);
    line(0, circuitHeight, containerWidth, circuitHeight);

    drawGraphs();
    drawControls();
}

function recalculate() {
    // tau in seconds: R(kΩ) * C(µF) = R*1000 * C*1e-6 = R*C * 1e-3
    tau = rVal * cVal * 0.001;
    // Initial current in mA: Vs / R(kΩ) = mA
    iInitial = vs / rVal;
    // Simulation speed: run 5τ in ~5 seconds
    simSpeed = tau;
    // Reset instantaneous if switch open
    if (!switchClosed) {
        vcNow = 0;
        iNow = 0;
    }
}

// ==================== CIRCUIT SCHEMATIC ====================

function drawCircuitDiagram() {
    push();

    // Circuit layout coordinates
    let cx = containerWidth / 2;
    let cy = circuitHeight / 2;
    let loopW = Math.min(containerWidth - 80, 420);
    let loopH = 140;
    let left = cx - loopW / 2;
    let right = cx + loopW / 2;
    let topY = cy - loopH / 2;
    let bottomY = cy + loopH / 2;

    // Title
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text("RC Charging Circuit", cx, 8);

    // Calculate electron animation speed based on current
    let currentFraction = switchClosed ? iNow / Math.max(iInitial, 0.001) : 0;
    let electronSpeed = currentFraction * 0.08;
    let electronSpacing = 1.0;

    // Battery on left side (vertical) - custom schematic symbol
    let battMidY = cy;

    // Battery plates
    stroke(0);
    strokeWeight(2);
    // Positive plate (top, longer line)
    line(left - 12, battMidY - 5, left + 12, battMidY - 5);
    strokeWeight(4);
    // Negative plate (bottom, shorter line)
    line(left - 7, battMidY + 5, left + 7, battMidY + 5);

    // Battery labels
    noStroke();
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text("+", left - 20, battMidY - 5);
    text("\u2013", left - 20, battMidY + 5);
    textAlign(LEFT, CENTER);
    text(vs + "V", left + 18, battMidY);

    // Helper: draw wire segment, animated if current flowing
    function wireSegment(x1, y1, x2, y2) {
        if (switchClosed && currentFraction > 0.001) {
            drawAnimatedWire(x1, y1, x2, y2, electronSpeed, electronSpacing);
        } else {
            stroke(0);
            strokeWeight(lineWidth);
            line(x1, y1, x2, y2);
        }
    }

    // Top wire: battery+ up to top rail
    wireSegment(left, battMidY - 5, left, topY);
    // Bottom wire: battery- down to bottom rail
    wireSegment(left, battMidY + 5, left, bottomY);

    // Switch on top rail
    let switchX = left + 50;
    let switchLen = 40;
    let switchEndX = switchX + switchLen;

    // Wire from battery top corner to switch
    wireSegment(left, topY, switchX, topY);

    // Switch symbol
    stroke(0);
    strokeWeight(lineWidth);
    fill(0);
    circle(switchX, topY, 6);
    circle(switchEndX, topY, 6);

    if (switchClosed) {
        stroke(0);
        strokeWeight(lineWidth);
        line(switchX, topY, switchEndX, topY);
    } else {
        stroke(0);
        strokeWeight(lineWidth);
        line(switchX, topY, switchEndX, topY - 20);
    }

    // Switch label
    noStroke();
    fill(100);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    text(switchClosed ? "Closed" : "Open", switchX + switchLen / 2, topY - 22);

    // Wire from switch to resistor
    let resX = switchEndX + 20;
    let resW = 80;
    let resH = 30;
    wireSegment(switchEndX, topY, resX, topY);

    // Resistor (horizontal on top rail)
    stroke(0);
    noFill();
    drawResistorClean(resX, topY - resH / 2, resW, resH, lineWidth, HORIZONTAL, "R " + rVal + "k\u03A9");

    // Wire from resistor to right corner
    let resEndX = resX + resW;
    wireSegment(resEndX, topY, right, topY);

    // Right vertical wire down to capacitor
    let capH = 60;
    let capW = 40;
    let capY = cy - capH / 2;
    wireSegment(right, topY, right, capY);

    // Capacitor (vertical on right side) - 7-param signature from circuit-lib.js
    stroke(0);
    noFill();
    drawCapacitor(right - capW / 2, capY, capW, capH, lineWidth, VERTICAL, "C " + cVal + "\u00B5F");

    // Capacitor charge indicator — color fill between plates
    let chargeFraction = vcNow / Math.max(vs, 0.001);
    if (chargeFraction > 0.01) {
        let plateGapPercent = 0.1;
        let plateTopY = capY + capH * (0.5 - plateGapPercent / 2);
        let plateBotY = capY + capH * (0.5 + plateGapPercent / 2);
        let fillH = (plateBotY - plateTopY) * Math.min(chargeFraction, 1);
        noStroke();
        let r = lerp(200, 30, chargeFraction);
        let g = lerp(220, 100, chargeFraction);
        let b = lerp(255, 255, chargeFraction);
        fill(r, g, b, 150);
        rectMode(CENTER);
        rect(right, (plateTopY + plateBotY) / 2, 16, Math.max(fillH, 2));
        rectMode(CORNER);
    }

    // Wire from capacitor bottom to bottom rail
    wireSegment(right, capY + capH, right, bottomY);

    // Bottom rail (right to left, back to battery)
    wireSegment(right, bottomY, left, bottomY);

    // Ground symbol at bottom center
    let gndX = cx;
    stroke(0);
    strokeWeight(2);
    line(gndX, bottomY, gndX, bottomY + 8);
    line(gndX - 10, bottomY + 8, gndX + 10, bottomY + 8);
    line(gndX - 6, bottomY + 12, gndX + 6, bottomY + 12);
    line(gndX - 2, bottomY + 16, gndX + 2, bottomY + 16);

    // Display current values on circuit
    noStroke();
    fill(0, 100, 200);
    textSize(12);
    textAlign(LEFT, TOP);
    let infoX = left + 5;
    let infoY = bottomY + 22;
    text("Vc = " + vcNow.toFixed(2) + " V", infoX, infoY);
    text("I = " + iNow.toFixed(3) + " mA", infoX + 120, infoY);
    text("\u03C4 = " + formatTau(tau), infoX + 250, infoY);

    pop();
}

function formatTau(tauSec) {
    if (tauSec >= 1) {
        return tauSec.toFixed(2) + " s";
    } else if (tauSec >= 0.001) {
        return (tauSec * 1000).toFixed(1) + " ms";
    } else {
        return (tauSec * 1e6).toFixed(1) + " \u00B5s";
    }
}

// Resistor drawing without debug bounding box (circuit-lib.js drawResistor has one)
function drawResistorClean(x, y, rwidth, rheight, lw, orientation, label) {
    push();
    strokeWeight(lw);
    stroke(0);
    noFill();

    let endWirePercent = 0.15;
    let peaks = 6;

    if (orientation === HORIZONTAL) {
        let halfHeight = y + rheight / 2;
        let endWireLength = rwidth * endWirePercent;
        let peakWidth = (rwidth - 2 * endWireLength) / peaks;
        let peakHeight = rheight / 3;

        line(x, halfHeight, x + endWireLength, halfHeight);
        line(x + rwidth - endWireLength, halfHeight, x + rwidth, halfHeight);

        beginShape();
        vertex(x + endWireLength, halfHeight);
        for (let i = 0; i <= peaks - 1; i++) {
            let xPos = x + endWireLength + i * peakWidth + peakWidth / 2;
            let yPos = (i % 2 === 0) ? halfHeight - peakHeight : halfHeight + peakHeight;
            vertex(xPos, yPos);
        }
        vertex(x + rwidth - endWireLength, halfHeight);
        endShape();

        // Label above
        fill(0);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(12);
        text(label, x + rwidth / 2, y - 2);
    }
    pop();
}

// ==================== GRAPHS ====================

function drawGraphs() {
    push();

    let gTop = circuitHeight + 10;
    let gBottom = circuitHeight + graphHeight - 30;
    let gMid = containerWidth / 2;

    // Left graph: Vc(t)
    let g1Left = 60;
    let g1Right = gMid - 25;

    // Right graph: I(t)
    let g2Left = gMid + 35;
    let g2Right = containerWidth - 20;

    let totalTime = 5 * tau;

    // === Voltage Graph ===
    noStroke();
    fill(0);
    textSize(13);
    textAlign(CENTER, TOP);
    text("Capacitor Voltage Vc(t)", (g1Left + g1Right) / 2, gTop - 8);

    // Axes
    stroke(0);
    strokeWeight(1);
    line(g1Left, gTop, g1Left, gBottom);
    line(g1Left, gBottom, g1Right, gBottom);

    // Y axis labels (voltage)
    noStroke();
    fill(80);
    textSize(10);
    textAlign(RIGHT, CENTER);
    let vStep = Math.ceil(vs / 4);
    for (let v = 0; v <= vs; v += vStep) {
        let y = map(v, 0, vs, gBottom, gTop);
        text(v + "V", g1Left - 5, y);
        stroke(220);
        strokeWeight(0.5);
        line(g1Left, y, g1Right, y);
        noStroke();
    }

    // X axis labels (time in τ)
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 5; i++) {
        let x = map(i, 0, 5, g1Left, g1Right);
        text(i + "\u03C4", x, gBottom + 3);
        if (i > 0) {
            stroke(220);
            strokeWeight(0.5);
            line(x, gTop, x, gBottom);
            noStroke();
        }
    }

    // Tau marker line (dashed at t=τ)
    let tauX1 = map(1, 0, 5, g1Left, g1Right);
    drawDashedLine(tauX1, gTop, tauX1, gBottom, [4, 4], color(255, 140, 0));

    // Steady-state line (dashed at Vs)
    drawDashedLine(g1Left, gTop, g1Right, gTop, [4, 4], color(100, 100, 255));

    // Plot Vc data
    if (graphData.length > 1) {
        stroke(0, 100, 220);
        strokeWeight(2.5);
        noFill();
        beginShape();
        for (let pt of graphData) {
            let x = map(pt.t, 0, totalTime, g1Left, g1Right);
            let y = map(pt.vc, 0, vs, gBottom, gTop);
            vertex(constrain(x, g1Left, g1Right), constrain(y, gTop, gBottom));
        }
        endShape();
    }

    // 63.2% marker at τ
    noStroke();
    fill(255, 140, 0);
    textSize(9);
    textAlign(LEFT, CENTER);
    let y63 = map(vs * 0.632, 0, vs, gBottom, gTop);
    text("63.2%", tauX1 + 3, y63);

    // === Current Graph ===
    noStroke();
    fill(0);
    textSize(13);
    textAlign(CENTER, TOP);
    text("Circuit Current I(t)", (g2Left + g2Right) / 2, gTop - 8);

    // Axes
    stroke(0);
    strokeWeight(1);
    line(g2Left, gTop, g2Left, gBottom);
    line(g2Left, gBottom, g2Right, gBottom);

    // Y axis labels (current in mA)
    noStroke();
    fill(80);
    textSize(10);
    textAlign(RIGHT, CENTER);
    let iMax = iInitial;
    for (let i = 0; i <= 4; i++) {
        let iVal = (iMax / 4) * i;
        let y = map(iVal, 0, iMax, gBottom, gTop);
        text(iVal.toFixed(2) + "mA", g2Left - 3, y);
        stroke(220);
        strokeWeight(0.5);
        line(g2Left, y, g2Right, y);
        noStroke();
    }

    // X axis labels (time in τ)
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 5; i++) {
        let x = map(i, 0, 5, g2Left, g2Right);
        text(i + "\u03C4", x, gBottom + 3);
        if (i > 0) {
            stroke(220);
            strokeWeight(0.5);
            line(x, gTop, x, gBottom);
            noStroke();
        }
    }

    // Tau marker
    let tauX2 = map(1, 0, 5, g2Left, g2Right);
    drawDashedLine(tauX2, gTop, tauX2, gBottom, [4, 4], color(255, 140, 0));

    // I₀ line
    drawDashedLine(g2Left, gTop, g2Right, gTop, [4, 4], color(255, 100, 100));

    // Plot I data
    if (graphData.length > 1) {
        stroke(220, 50, 50);
        strokeWeight(2.5);
        noFill();
        beginShape();
        for (let pt of graphData) {
            let x = map(pt.t, 0, totalTime, g2Left, g2Right);
            let y = map(pt.i, 0, iMax, gBottom, gTop);
            vertex(constrain(x, g2Left, g2Right), constrain(y, gTop, gBottom));
        }
        endShape();
    }

    // 36.8% marker at τ
    noStroke();
    fill(255, 140, 0);
    textSize(9);
    textAlign(LEFT, CENTER);
    let y37 = map(iMax * 0.368, 0, iMax, gBottom, gTop);
    text("36.8%", tauX2 + 3, y37);

    pop();
}

function drawDashedLine(x1, y1, x2, y2, pattern, col) {
    push();
    stroke(col);
    strokeWeight(1);
    let d = dist(x1, y1, x2, y2);
    if (d === 0) { pop(); return; }
    let dx = (x2 - x1) / d;
    let dy = (y2 - y1) / d;
    let pos = 0;
    let idx = 0;
    while (pos < d) {
        let segLen = Math.min(pattern[idx % pattern.length], d - pos);
        if (idx % 2 === 0) {
            line(x1 + dx * pos, y1 + dy * pos, x1 + dx * (pos + segLen), y1 + dy * (pos + segLen));
        }
        pos += segLen;
        idx++;
    }
    pop();
}

// ==================== CONTROLS ====================

function drawControls() {
    // Background
    fill(245);
    stroke(200);
    strokeWeight(1);
    rect(0, drawHeight, containerWidth, controlHeight);

    // Slider 1: Source Voltage
    drawCtrlSlider("Source Voltage Vs:", vs, 1, 20, sliderX, sliderY1, sliderWidth, " V");

    // Slider 2: Resistance
    drawCtrlSlider("Resistance R:", rVal, 1, 100, sliderX, sliderY2, sliderWidth, " k\u03A9");

    // Slider 3: Capacitance
    drawCtrlSlider("Capacitance C:", cVal, 1, 100, sliderX, sliderY3, sliderWidth, " \u00B5F");

    // Close/Open Switch button
    let switchLabel = switchClosed ? "Open Switch" : "Close Switch";
    drawCtrlButton(switchLabel, buttonX, buttonY, 100, 22);

    // Reset button
    drawCtrlButton("Reset", buttonX + 110, buttonY, 60, 22);

    // Tau display
    noStroke();
    fill(0);
    textSize(11);
    textAlign(RIGHT, CENTER);
    text("\u03C4 = " + formatTau(tau) + "   I\u2080 = " + iInitial.toFixed(2) + " mA", containerWidth - 15, buttonY + 11);
}

function drawCtrlSlider(label, value, minVal, maxVal, x, y, w, suffix) {
    fill(0);
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    text(label + " " + value + suffix, x - 10, y);

    // Track
    fill(200);
    stroke(150);
    strokeWeight(1);
    rect(x, y - 4, w, 8, 4);

    // Fill
    let fillWidth = map(value, minVal, maxVal, 0, w);
    fill(70, 130, 180);
    noStroke();
    rect(x, y - 4, fillWidth, 8, 4);

    // Handle
    let handleX = x + fillWidth;
    fill(255);
    stroke(70, 130, 180);
    strokeWeight(2);
    ellipse(handleX, y, 14, 14);
}

function drawCtrlButton(label, x, y, w, h) {
    fill(70, 130, 180);
    stroke(50, 100, 150);
    strokeWeight(1);
    rect(x, y, w, h, 4);

    fill(255);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
}

// ==================== INTERACTION ====================

function mousePressed() {
    // Slider 1: Voltage
    if (mouseY >= sliderY1 - 10 && mouseY <= sliderY1 + 10 &&
        mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
        vs = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 20));
        vs = constrain(vs, 1, 20);
        onParameterChange();
    }

    // Slider 2: Resistance
    if (mouseY >= sliderY2 - 10 && mouseY <= sliderY2 + 10 &&
        mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
        rVal = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 100));
        rVal = constrain(rVal, 1, 100);
        onParameterChange();
    }

    // Slider 3: Capacitance
    if (mouseY >= sliderY3 - 10 && mouseY <= sliderY3 + 10 &&
        mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
        cVal = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 100));
        cVal = constrain(cVal, 1, 100);
        onParameterChange();
    }

    // Close/Open Switch button
    if (mouseX >= buttonX && mouseX <= buttonX + 100 &&
        mouseY >= buttonY && mouseY <= buttonY + 22) {
        switchClosed = !switchClosed;
        if (switchClosed && simTime >= 5 * tau) {
            resetSimulation();
            switchClosed = true;
        }
    }

    // Reset button
    if (mouseX >= buttonX + 110 && mouseX <= buttonX + 170 &&
        mouseY >= buttonY && mouseY <= buttonY + 22) {
        resetSimulation();
    }
}

function mouseDragged() {
    // Slider 1
    if (mouseY >= sliderY1 - 10 && mouseY <= sliderY1 + 10 &&
        mouseX >= sliderX - 10 && mouseX <= sliderX + sliderWidth + 10) {
        vs = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 20));
        vs = constrain(vs, 1, 20);
        onParameterChange();
    }

    // Slider 2
    if (mouseY >= sliderY2 - 10 && mouseY <= sliderY2 + 10 &&
        mouseX >= sliderX - 10 && mouseX <= sliderX + sliderWidth + 10) {
        rVal = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 100));
        rVal = constrain(rVal, 1, 100);
        onParameterChange();
    }

    // Slider 3
    if (mouseY >= sliderY3 - 10 && mouseY <= sliderY3 + 10 &&
        mouseX >= sliderX - 10 && mouseX <= sliderX + sliderWidth + 10) {
        cVal = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 100));
        cVal = constrain(cVal, 1, 100);
        onParameterChange();
    }
}

function onParameterChange() {
    recalculate();
    if (!switchClosed) {
        graphData = [];
        simTime = 0;
        animationTime = 0;
    }
}

function resetSimulation() {
    switchClosed = false;
    simTime = 0;
    animationTime = 0;
    vcNow = 0;
    iNow = 0;
    graphData = [];
    recalculate();
}

// ==================== RESPONSIVE ====================

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, canvasHeight);
    sliderWidth = containerWidth - sliderX - 20;
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.max(500, Math.floor(container.width));
    canvasWidth = containerWidth;
}

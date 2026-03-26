// Water Flow Analogy MicroSim
// Demonstrates how electric current flow is analogous to water flow in pipes
// Split screen: water system (top) and electrical circuit (bottom)
// Uses drawAnimatedWire pattern from p5-circuit-lib.js

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 10;
let sliderLeftMargin = 250; // Room for label + value text on left of slider

// Responsive design
let containerWidth;
let containerHeight = canvasHeight;

// Simulation state - start stopped by default
let isAnimating = false;
let animationTime = 0;

// Control values (using canvas-based controls)
let pressureVoltage = 6;       // 1-12 range
let pipeDiameter = 2;          // 1-3 range (narrow, medium, wide)

// UI element positions (calculated in setup)
let sliderY1, sliderY2;
let sliderX, sliderWidth;
let buttonX, buttonY;

// Wire/pipe drawing parameters
let lineWidth = 8;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));

    // Calculate control positions
    sliderX = sliderLeftMargin;
    sliderWidth = containerWidth - sliderX - 20; // Small margin on right (labels are on left now)
    sliderY1 = drawHeight + 25;
    sliderY2 = drawHeight + 50;
    buttonX = 15;
    buttonY = drawHeight + 75;

    describe('Split-screen simulation comparing water flow in pipes to electric current in wires, with interactive controls for pressure/voltage and pipe/wire diameter.', LABEL);
}

function draw() {
    background(255);

    // Update animation if running
    if (isAnimating) {
        animationTime += deltaTime;
    }

    // Calculate flow rate based on pressure and diameter
    let flowRate = calculateFlowRate();

    // Draw top half: Water system
    drawWaterSystem(flowRate);

    // Draw divider line
    stroke(100);
    strokeWeight(2);
    line(0, drawHeight / 2, containerWidth, drawHeight / 2);

    // Draw bottom half: Electrical circuit
    drawElectricalCircuit(flowRate);

    // Draw control area
    drawControls(flowRate);
}

function calculateFlowRate() {
    // Flow rate increases with pressure/voltage and pipe diameter
    // Speed parameter for drawAnimatedWire/Pipe
    // Diameter has a dramatic effect: narrow=1x, medium=4x, wide=9x
    let diameterFactor = pipeDiameter * pipeDiameter;
    return (pressureVoltage / 12) * diameterFactor * 0.015;
}

// Draws an animated pipe with water droplets flowing
// Adapted from drawAnimatedWire pattern in p5-circuit-lib.js
function drawAnimatedPipe(x1, y1, x2, y2, speed, spacing, pipeWidth, particleColor) {
    let distance = dist(x1, y1, x2, y2);
    let spacingPixels = spacing * 50; // Convert spacing to pixels

    // Draw the pipe (lighter blue background)
    stroke(100, 149, 237);
    strokeWeight(pipeWidth);
    line(x1, y1, x2, y2);

    // Draw inner pipe (water color)
    stroke(173, 216, 230, 180);
    strokeWeight(pipeWidth - 4);
    line(x1, y1, x2, y2);

    // Draw moving water droplets
    if (spacingPixels > 0 && distance > 0) {
        fill(particleColor);
        noStroke();

        // Calculate single offset position (0 to spacingPixels)
        // This ensures all particles maintain consistent spacing
        let firstPos = (animationTime * speed) % spacingPixels;

        // Draw particles evenly spaced from that offset
        // Particle size scales with pipe diameter: 6, 10, 14
        let particleSize = 4 + pipeDiameter * 3;
        for (let pos = firstPos; pos < distance; pos += spacingPixels) {
            let t = pos / distance;
            let x = lerp(x1, x2, t);
            let y = lerp(y1, y2, t);
            circle(x, y, particleSize);
        }
    }
}

// Draws an animated wire with electrons flowing
// Based on drawAnimatedWire from p5-circuit-lib.js
function drawAnimatedWire(x1, y1, x2, y2, speed, spacing, wireWidth) {
    let distance = dist(x1, y1, x2, y2);
    let spacingPixels = spacing * 50; // Convert spacing to pixels

    // Draw the wire
    stroke(50);
    strokeWeight(wireWidth);
    line(x1, y1, x2, y2);

    // Draw moving electrons
    if (spacingPixels > 0 && distance > 0) {
        fill(255, 0, 0);
        noStroke();

        // Calculate single offset position (0 to spacingPixels)
        // This ensures all electrons maintain consistent spacing
        let firstPos = (animationTime * speed) % spacingPixels;

        // Draw electrons evenly spaced from that offset
        // Electron size scales with wire gauge: 5, 8, 11
        let particleSize = 3 + pipeDiameter * 2.5;
        for (let pos = firstPos; pos < distance; pos += spacingPixels) {
            let t = pos / distance;
            let x = lerp(x1, x2, t);
            let y = lerp(y1, y2, t);
            circle(x, y, particleSize);
        }
    }
}

function drawWaterSystem(flowRate) {
    let topY = 10;
    let bottomY = drawHeight / 2 - 10;
    let centerY = (topY + bottomY) / 2;

    // Title
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text("Water System", containerWidth / 2, topY);

    // Calculate pipe thickness based on diameter setting
    // Narrow=8, Medium=18, Wide=28 - very noticeable difference
    let pipeWidth = 8 + (pipeDiameter - 1) * 10;

    // Draw pump (left side)
    let pumpX = 50;
    let pumpY = centerY;
    let pumpSize = 50;

    // Pump body
    fill(70, 130, 180);
    stroke(40, 80, 130);
    strokeWeight(2);
    ellipse(pumpX, pumpY, pumpSize, pumpSize);

    // Pump label
    fill(255);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text("PUMP", pumpX, pumpY - 8);
    text(pressureVoltage + " PSI", pumpX, pumpY + 6);

    // Pipe circuit positions
    let pipeLeft = pumpX + pumpSize / 2 + 5;
    let pipeRight = containerWidth - 90;
    let pipeTop = centerY - 45;
    let pipeBottom = centerY + 45;

    // Animation speed based on flow rate
    let speed = flowRate * 27;  // Slow speed for visibility
    // Wider pipes have MORE particles (closer spacing)
    // Narrow=2.0, Medium=1.0, Wide=0.5 spacing units
    let spacing = 2.5 / pipeDiameter;

    // Water droplet color
    let waterColor = color(0, 100, 255, 220);

    // Draw animated pipes forming a loop
    // Top pipe (left to right)
    drawAnimatedPipe(pipeLeft, pipeTop, pipeRight, pipeTop, speed, spacing, pipeWidth, waterColor);

    // Right pipe (top to bottom)
    drawAnimatedPipe(pipeRight, pipeTop, pipeRight, pipeBottom, speed, spacing, pipeWidth, waterColor);

    // Bottom pipe (right to left)
    drawAnimatedPipe(pipeRight, pipeBottom, pipeLeft, pipeBottom, speed, spacing, pipeWidth, waterColor);

    // Left pipe connections (to pump)
    drawAnimatedPipe(pipeLeft, pipeBottom, pipeLeft, pumpY + pumpSize / 4, speed, spacing, pipeWidth, waterColor);
    drawAnimatedPipe(pipeLeft, pumpY - pumpSize / 4, pipeLeft, pipeTop, speed, spacing, pipeWidth, waterColor);

    // Pressure gauge
    let gaugeX = containerWidth - 55;
    let gaugeY = centerY - 55;

    fill(255);
    stroke(0);
    strokeWeight(1);
    ellipse(gaugeX, gaugeY, 35, 35);

    fill(0);
    noStroke();
    textSize(8);
    text("PSI", gaugeX, gaugeY - 5);
    textSize(10);
    text(pressureVoltage, gaugeX, gaugeY + 6);

    // Draw gauge needle
    stroke(255, 0, 0);
    strokeWeight(2);
    let needleAngle = map(pressureVoltage, 1, 12, -PI * 0.7, PI * 0.7);
    let needleLen = 12;
    line(gaugeX, gaugeY, gaugeX + cos(needleAngle - PI / 2) * needleLen, gaugeY + sin(needleAngle - PI / 2) * needleLen);

    // Flow meter
    let flowMeterX = containerWidth - 55;
    let flowMeterY = centerY + 55;

    fill(240);
    stroke(0);
    strokeWeight(1);
    rect(flowMeterX - 20, flowMeterY - 15, 40, 30, 3);

    fill(0);
    noStroke();
    textSize(8);
    textAlign(CENTER, CENTER);
    text("FLOW", flowMeterX, flowMeterY - 5);
    textSize(9);
    let displayFlow = (flowRate * 1000).toFixed(1);
    text(displayFlow + " L/s", flowMeterX, flowMeterY + 6);
}

function drawElectricalCircuit(flowRate) {
    let topY = drawHeight / 2 + 10;
    let bottomY = drawHeight - 10;
    let centerY = (topY + bottomY) / 2;

    // Title
    fill(0);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text("Electrical Circuit", containerWidth / 2, topY);

    // Calculate wire thickness based on diameter setting
    // Narrow=4, Medium=10, Wide=16 - very noticeable difference
    let wireWidth = 4 + (pipeDiameter - 1) * 6;

    // Draw battery (left side)
    let battX = 50;
    let battY = centerY;
    let battWidth = 30;
    let battHeight = 50;

    // Battery body
    fill(255, 215, 0);
    stroke(180, 150, 0);
    strokeWeight(2);
    rect(battX - battWidth / 2, battY - battHeight / 2, battWidth, battHeight, 3);

    // Battery terminal
    fill(100);
    rect(battX - 5, battY - battHeight / 2 - 5, 10, 5);

    // Battery labels
    fill(0);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text("+", battX, battY - 15);
    text("-", battX, battY + 15);
    textSize(9);
    text(pressureVoltage + "V", battX, battY);

    // Wire circuit positions
    let wireLeft = battX + battWidth / 2 + 5;
    let wireRight = containerWidth - 90;
    let wireTop = centerY - 45;
    let wireBottom = centerY + 45;

    // Animation speed based on flow rate
    let speed = flowRate * 27;  // Slow speed for visibility
    // Wider wires have MORE electrons (closer spacing)
    // Narrow=2.0, Medium=1.0, Wide=0.5 spacing units
    let spacing = 2.5 / pipeDiameter;

    // Draw animated wires forming a loop
    // Top wire (left to right)
    drawAnimatedWire(wireLeft, wireTop, wireRight, wireTop, speed, spacing, wireWidth);

    // Right wire (top to bottom)
    drawAnimatedWire(wireRight, wireTop, wireRight, wireBottom, speed, spacing, wireWidth);

    // Bottom wire (right to left)
    drawAnimatedWire(wireRight, wireBottom, wireLeft, wireBottom, speed, spacing, wireWidth);

    // Left wire connections (to battery)
    drawAnimatedWire(wireLeft, wireBottom, wireLeft, battY + battHeight / 2, speed, spacing, wireWidth);
    drawAnimatedWire(wireLeft, battY - battHeight / 2, wireLeft, wireTop, speed, spacing, wireWidth);

    // Voltmeter
    let vmX = containerWidth - 55;
    let vmY = centerY - 55;

    fill(255);
    stroke(0);
    strokeWeight(1);
    ellipse(vmX, vmY, 35, 35);

    fill(255, 0, 0);
    textSize(8);
    textAlign(CENTER, CENTER);
    text("V", vmX, vmY - 5);
    fill(0);
    textSize(10);
    text(pressureVoltage, vmX, vmY + 6);

    // Ammeter
    let amX = containerWidth - 55;
    let amY = centerY + 55;

    fill(240);
    stroke(0);
    strokeWeight(1);
    rect(amX - 20, amY - 15, 40, 30, 3);

    fill(0);
    noStroke();
    textSize(8);
    text("A", amX, amY - 5);
    textSize(9);
    let current = (flowRate * 100).toFixed(1);
    text(current + " mA", amX, amY + 6);
}

function drawControls(flowRate) {
    // Control area background
    fill(245);
    stroke(200);
    strokeWeight(1);
    rect(0, drawHeight, containerWidth, controlHeight);

    // Slider 1: Pressure/Voltage
    drawSlider("Pump Pressure / Voltage:", pressureVoltage, 1, 12, sliderX, sliderY1, sliderWidth, " units");

    // Slider 2: Pipe/Wire Diameter
    let diamLabels = ["Narrow", "Medium", "Wide"];
    drawSlider("Pipe / Wire Size:", pipeDiameter, 1, 3, sliderX, sliderY2, sliderWidth, " (" + diamLabels[pipeDiameter - 1] + ")");

    // Draw tick marks under Pipe/Wire slider
    drawSliderTicks(sliderX, sliderY2 + 8, sliderWidth, ["Narrow", "Medium", "Wide"]);

    // Start/Stop button in lower left
    let startStopLabel = isAnimating ? "Stop" : "Start";
    drawButton(startStopLabel, buttonX, buttonY, 60, 20);

    // Reset button next to Start/Stop
    drawButton("Reset", buttonX + 70, buttonY, 60, 20);

    // Flow/Current display
    fill(0);
    noStroke();
    textSize(11);
    textAlign(RIGHT, CENTER);
    let displayCurrent = (flowRate * 100).toFixed(1);
    text("Flow Rate / Current: " + displayCurrent, containerWidth - 15, buttonY + 10);
}

function drawSlider(label, value, minVal, maxVal, x, y, w, suffix) {
    // Label and value combined on the left of the slider
    fill(0);
    noStroke();
    textSize(12);
    textAlign(RIGHT, CENTER);
    text(label + " " + value + suffix, x - 10, y);

    // Slider track
    fill(200);
    stroke(150);
    strokeWeight(1);
    rect(x, y - 4, w, 8, 4);

    // Slider fill
    let fillWidth = map(value, minVal, maxVal, 0, w);
    fill(70, 130, 180);
    noStroke();
    rect(x, y - 4, fillWidth, 8, 4);

    // Slider handle
    let handleX = x + fillWidth;
    fill(255);
    stroke(70, 130, 180);
    strokeWeight(2);
    ellipse(handleX, y, 14, 14);
}

function drawSliderTicks(x, y, w, labels) {
    // Draw tick marks and labels under a slider
    fill(80);
    noStroke();
    textSize(9);
    textAlign(CENTER, TOP);

    let numTicks = labels.length;
    for (let i = 0; i < numTicks; i++) {
        let tickX = x + (i / (numTicks - 1)) * w;

        // Draw tick mark
        stroke(150);
        strokeWeight(1);
        line(tickX, y, tickX, y + 4);

        // Draw label
        noStroke();
        text(labels[i], tickX, y + 5);
    }
}

function drawButton(label, x, y, w, h) {
    // Button background
    fill(70, 130, 180);
    stroke(50, 100, 150);
    strokeWeight(1);
    rect(x, y, w, h, 4);

    // Button text
    fill(255);
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(label, x + w / 2, y + h / 2);
}

function mousePressed() {
    // Check slider 1 (Pressure/Voltage)
    if (mouseY >= sliderY1 - 10 && mouseY <= sliderY1 + 10) {
        if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
            pressureVoltage = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 12));
            pressureVoltage = constrain(pressureVoltage, 1, 12);
        }
    }

    // Check slider 2 (Diameter)
    if (mouseY >= sliderY2 - 10 && mouseY <= sliderY2 + 10) {
        if (mouseX >= sliderX && mouseX <= sliderX + sliderWidth) {
            pipeDiameter = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 3));
            pipeDiameter = constrain(pipeDiameter, 1, 3);
        }
    }

    // Check Start/Stop button
    if (mouseX >= buttonX && mouseX <= buttonX + 60 &&
        mouseY >= buttonY && mouseY <= buttonY + 20) {
        isAnimating = !isAnimating;
    }

    // Check Reset button (moved to right of Start/Stop)
    if (mouseX >= buttonX + 70 && mouseX <= buttonX + 130 &&
        mouseY >= buttonY && mouseY <= buttonY + 20) {
        resetSimulation();
    }
}

function mouseDragged() {
    // Allow dragging on sliders
    if (mouseY >= sliderY1 - 10 && mouseY <= sliderY1 + 10) {
        if (mouseX >= sliderX - 10 && mouseX <= sliderX + sliderWidth + 10) {
            pressureVoltage = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 12));
            pressureVoltage = constrain(pressureVoltage, 1, 12);
        }
    }

    if (mouseY >= sliderY2 - 10 && mouseY <= sliderY2 + 10) {
        if (mouseX >= sliderX - 10 && mouseX <= sliderX + sliderWidth + 10) {
            pipeDiameter = round(map(mouseX, sliderX, sliderX + sliderWidth, 1, 3));
            pipeDiameter = constrain(pipeDiameter, 1, 3);
        }
    }
}

function resetSimulation() {
    pressureVoltage = 6;
    pipeDiameter = 2;
    isAnimating = false;  // Start stopped after reset
    animationTime = 0;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);

    // Recalculate control positions
    sliderWidth = containerWidth - sliderX - 20; // Small margin on right (labels are on left now)
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}

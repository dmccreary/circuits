// Responsive Wire Simulation
let canvasWidth, canvasHeight;
let plotAreaWidth, plotAreaHeight;
let controlAreaHeight;
let wireMargin;
let lineWidth;

let state = false;
let button;
let speedSlider;
let spacingSlider;

// Responsive scaling factors
let scaleFactor = 1;
let minWidth = 400;
let maxWidth = 900;

function setup() {
    calculateDimensions();
    
    // Create canvas and attach to container
    let canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('canvas-container');
    
    frameRate(30);
    
    createControls();
}

function calculateDimensions() {
    // Get container width
    let container = document.getElementById('canvas-container');
    let containerWidth = container.offsetWidth;
    
    // Calculate responsive dimensions
    canvasWidth = Math.max(minWidth, Math.min(maxWidth, containerWidth - 40));
    
    // Calculate scale factor based on a reference width of 700
    scaleFactor = canvasWidth / 700;
    
    // Set dimensions based on scale factor
    canvasHeight = Math.floor(400 * scaleFactor);
    plotAreaWidth = canvasWidth;
    plotAreaHeight = Math.floor(300 * scaleFactor);
    controlAreaHeight = canvasHeight - plotAreaHeight;
    
    // Scale other elements
    wireMargin = Math.floor(50 * scaleFactor);
    lineWidth = Math.max(3, Math.floor(10 * scaleFactor));
}

function createControls() {
    // Remove existing controls if they exist
    if (speedSlider) speedSlider.remove();
    if (spacingSlider) spacingSlider.remove();
    if (button) button.remove();
    
    // Calculate control positions
    let sliderWidth = Math.floor(200 * scaleFactor);
    let sliderX = Math.floor(120 * scaleFactor);
    let buttonX = Math.floor(350 * scaleFactor);
    let controlY1 = plotAreaHeight + Math.floor(20 * scaleFactor);
    let controlY2 = plotAreaHeight + Math.floor(50 * scaleFactor);
    
    // Create speed slider
    speedSlider = createSlider(0.02, 0.5, 0.25, 0.03);
    speedSlider.position(sliderX, controlY1);
    speedSlider.size(sliderWidth);
    
    // Create spacing slider
    spacingSlider = createSlider(0.15, 1.5, 1, 0.05);
    spacingSlider.position(sliderX, controlY2);
    spacingSlider.size(sliderWidth);
    
    // Create toggle button
    button = createButton('ON/OFF');
    button.position(buttonX, controlY1);
    button.mousePressed(toggleState);
    button.style('padding', '8px 16px');
    button.style('font-size', Math.floor(14 * scaleFactor) + 'px');
}

function draw() {
    // Clear background
    background(255);
    
    // Draw plot area background
    stroke('silver');
    fill("aliceblue");
    rect(0, 0, canvasWidth, plotAreaHeight);
    
    // Draw control area background
    noStroke();
    fill('white');
    rect(0, plotAreaHeight, canvasWidth, controlAreaHeight);
    
    // Add border between areas
    stroke('#dee2e6');
    strokeWeight(1);
    line(0, plotAreaHeight, canvasWidth, plotAreaHeight);
    
    // Get slider values
    let currentSpeed = speedSlider.value();
    let currentSpacing = spacingSlider.value();
    
    // Calculate wire positions
    let rightEdge = plotAreaWidth - wireMargin;
    let bottomEdge = plotAreaHeight - wireMargin;
    
    // Draw the four wires in a square
    drawAnimatedWire(wireMargin, wireMargin, rightEdge, wireMargin, currentSpeed, currentSpacing, "black", state);
    drawAnimatedWire(rightEdge, wireMargin, rightEdge, bottomEdge, currentSpeed, currentSpacing, "black", state);
    drawAnimatedWire(rightEdge, bottomEdge, wireMargin, bottomEdge, currentSpeed, currentSpacing, "black", state);
    drawAnimatedWire(wireMargin, bottomEdge, wireMargin, wireMargin, currentSpeed, currentSpacing, "black", state);
    
    // Draw labels
    drawLabels(currentSpeed, currentSpacing);
}

function drawLabels(currentSpeed, currentSpacing) {
    fill('black');
    noStroke();
    textSize(Math.floor(14 * scaleFactor));
    
    let labelX = Math.floor(10 * scaleFactor);
    let labelY1 = plotAreaHeight + Math.floor(33 * scaleFactor);
    let labelY2 = plotAreaHeight + Math.floor(66 * scaleFactor);
    
    text('Speed: ' + currentSpeed.toFixed(3), labelX, labelY1);
    text('Spacing: ' + currentSpacing.toFixed(2), labelX, labelY2);
}

function drawAnimatedWire(x1, y1, x2, y2, speed, spacing, color, state) {
    let distance = dist(x1, y1, x2, y2);
    let spacingPixels = spacing * 50 * scaleFactor;
    let numCircles = Math.floor(distance / spacingPixels);
    
    // Draw the wire
    stroke(0);
    strokeWeight(lineWidth);
    line(x1, y1, x2, y2);

    // Draw moving electrons if animation is on
    if (state && numCircles > 0) {
        for (let i = 0; i <= numCircles; i++) {
            let circlePos = (millis() * speed + i * spacingPixels) % distance;
            let x = lerp(x1, x2, circlePos / distance);
            let y = lerp(y1, y2, circlePos / distance);

            fill(255, 0, 0);
            noStroke();
            let circleSize = Math.max(6, Math.floor(9 * scaleFactor));
            circle(x, y, circleSize);
        }
    }
}

function toggleState() {
    state = !state;
}

function windowResized() {
    // Recalculate dimensions and recreate canvas
    calculateDimensions();
    resizeCanvas(canvasWidth, canvasHeight);
    createControls();
}

// Handle orientation change on mobile devices
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        windowResized();
    }, 100);
});

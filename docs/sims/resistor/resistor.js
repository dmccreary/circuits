// Resistor Orientation Test
// This program demonstrates drawing resistors in both horizontal and vertical orientations
// with customizable labels and responsive design

// Constants for orientation strings
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 400;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 100;                     // Height of controls region
let canvasHeight = drawHeight + controlHeight; // Total canvas height
let margin = 25;                            // Margin for visual elements
let defaultTextSize = 16;                   // Base text size for readability

// Global variables for responsive design
let containerWidth;                         // Calculated from container upon resize
let containerHeight = canvasHeight;         // Usually fixed height on page

// Control variables
let orientationButton;
let currentOrientation = HORIZONTAL;
let resetButton;
let lineWidthSlider;
let leftSliderMargin = 150; // Margin for left side of slider

// Resistor drawing parameters
let resistorWidth = 120;
let resistorHeight = 40;

// Sample resistor data
let resistors = [
  { label: "220Ω", color: "brown" },
  { label: "1KΩ", color: "red" },
  { label: "10KΩ", color: "orange" },
  { label: "100KΩ", color: "yellow" }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  
  // Create orientation toggle button
  orientationButton = createButton('Switch to Vertical');
  orientationButton.position(10, drawHeight + 10);
  orientationButton.mousePressed(toggleOrientation);
  
  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(160, drawHeight + 10);
  resetButton.mousePressed(resetResistors);
  
  // Create line width slider
  lineWidthSlider = createSlider(1, 5, 2);
  lineWidthSlider.position(leftSliderMargin, drawHeight + 60);
  lineWidthSlider.size(containerWidth - 140);

  describe('Resistor drawing test showing resistors in different orientations with customizable line width and labels.', LABEL);
}

function draw() {
  // Draw simulation area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, containerWidth, drawHeight);
  
  // Draw controls area background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, containerWidth, controlHeight);
  
  // Draw title
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text("Resistor Orientation Test", containerWidth/2, margin/2);
  
  // Reset text properties
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Get current line width
  let currentLineWidth = lineWidthSlider.value();
  
  // Calculate responsive resistor positions
  let numResistors = resistors.length;
  let spacing, startX, startY;
  
  if (currentOrientation === HORIZONTAL) {
    // Horizontal layout - arrange vertically
    spacing = (drawHeight - 2 * margin) / numResistors;
    startX = containerWidth / 2;
    startY = margin + spacing / 2;
    
    for (let i = 0; i < numResistors; i++) {
      let x = startX - resistorWidth / 2;
      let y = startY + i * spacing - resistorHeight / 2;
      
      drawResistor(x, y, resistorWidth, resistorHeight, currentLineWidth, 
                  HORIZONTAL, resistors[i].label);
    }
  } else {
    // Vertical layout - arrange horizontally
    spacing = (containerWidth - 2 * margin) / numResistors;
    startX = margin + spacing / 2;
    startY = drawHeight / 2;
    
    for (let i = 0; i < numResistors; i++) {
      let x = startX + i * spacing - resistorHeight / 2; // Note: using height for width when vertical
      let y = startY - resistorWidth / 2; // Note: using width for height when vertical
      
      drawResistor(x, y, resistorHeight, resistorWidth, currentLineWidth, 
                  VERTICAL, resistors[i].label);
    }
  }
  
  // Draw control labels
  drawControlLabels();
}

function drawResistor(x, y, rwidth, rheight, lineWidth, orientation, label) {
  push(); // Save drawing state
  
  // Light gray background
  fill(230);
  stroke('gray');
  strokeWeight(1);
  rect(x, y, rwidth, rheight);
  
  strokeWeight(lineWidth);
  stroke('black');
  noFill();
  
  // The percent of the length of the resistor that is taken by each end wire
  let endWirePercent = 0.15;
  let endWireLength = rwidth * endWirePercent;
  
  // Number of zig-zag peaks (international symbol uses 6)
  let peaks = 6;
  let peakWidth = (rwidth - 2 * endWireLength) / peaks;
  let peakHeight = rheight / 3;
  
  if (orientation === HORIZONTAL) {
    let halfHeight = y + rheight / 2;
    
    // Left end wire
    line(x, halfHeight, x + endWireLength, halfHeight);
    
    // Right end wire 
    line(x + rwidth - endWireLength, halfHeight, x + rwidth, halfHeight);
    
    // Zigzag pattern
    beginShape();
    noFill();
    vertex(x + endWireLength, halfHeight);
    for (let i = 0; i <= peaks - 1; i++) {
      let xPos = x + endWireLength + i * peakWidth + peakWidth / 2;
      let yPos = (i % 2 === 0) ? 
          halfHeight - peakHeight : 
          halfHeight + peakHeight;
      vertex(xPos, yPos);
    }
    vertex(x + rwidth - endWireLength, halfHeight);
    endShape();
    
    // Draw label below resistor
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(label, x + rwidth / 2, y + rheight + 5);
    
  } else if (orientation === VERTICAL) {
    let halfWidth = x + rwidth / 2;
    endWireLength = rheight * endWirePercent;
    peakHeight = rwidth / 3;
    peakWidth = (rheight - 2 * endWireLength) / peaks;
    
    // Top end wire
    line(halfWidth, y, halfWidth, y + endWireLength);
    
    // Bottom end wire
    line(halfWidth, y + rheight - endWireLength, halfWidth, y + rheight);
    
    // Zigzag pattern
    beginShape();
    noFill();
    vertex(halfWidth, y + endWireLength);
    for (let i = 0; i <= peaks - 1; i++) {
      let yPos = y + endWireLength + i * peakWidth + peakWidth / 2;
      let xPos = (i % 2 === 0) ?
        halfWidth - peakHeight : 
        halfWidth + peakHeight;
      vertex(xPos, yPos);
    }
    vertex(halfWidth, y + rheight - endWireLength);
    endShape();
    
    // Draw label to the right of resistor
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(label, x + rwidth + 10, y + rheight / 2);
  }
  
  pop(); // Restore drawing state
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Current orientation
  text(`Orientation: ${currentOrientation.toUpperCase()}`, 10, drawHeight + 50);
  
  // Line width
  text(`Line Width: ${lineWidthSlider.value()}`, 10, drawHeight + 65);
}

function toggleOrientation() {
  if (currentOrientation === HORIZONTAL) {
    currentOrientation = VERTICAL;
    orientationButton.html('Switch to Horizontal');
  } else {
    currentOrientation = HORIZONTAL;
    orientationButton.html('Switch to Vertical');
  }
  redraw();
}

function resetResistors() {
  currentOrientation = HORIZONTAL;
  orientationButton.html('Switch to Vertical');
  lineWidthSlider.value(2);
  redraw();
}

// Required functions for responsive design
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
  
  // Resize slider to match new width
  lineWidthSlider.size(containerWidth - leftSliderMargin - 20);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
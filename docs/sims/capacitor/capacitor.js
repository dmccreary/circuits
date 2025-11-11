// Capacitor Orientation Test
// This program demonstrates drawing capacitors in both horizontal and vertical orientations
// with customizable labels and responsive design

// Constants for orientation strings
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 400;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 110;                     // Height of controls region
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

// Capacitor drawing parameters
let capacitorWidth = 120;
let capacitorHeight = 40;

// Sample capacitor data
let capacitors = [
  { label: "10μF", color: "blue" },
  { label: "100nF", color: "green" },
  { label: "1000pF", color: "orange" },
  { label: "47μF", color: "purple" }
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
  resetButton.mousePressed(resetCapacitors);
  
  // Create line width slider
  lineWidthSlider = createSlider(1, 5, 2);
  lineWidthSlider.position(leftSliderMargin, drawHeight + 55);
  lineWidthSlider.size(containerWidth - 140);

  describe('Capacitor drawing test showing capacitors in different orientations with customizable line width and labels.', LABEL);
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
  text("Capacitor Drawing Test", containerWidth/2, margin/2);
  
  // Reset text properties
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Get current line width
  let currentLineWidth = lineWidthSlider.value();
  
  // Calculate responsive capacitor positions
  let numCapacitors = capacitors.length;
  let spacing, startX, startY;
  
  if (currentOrientation === HORIZONTAL) {
    // Horizontal layout - arrange vertically
    spacing = (drawHeight - 2 * margin) / numCapacitors;
    startX = containerWidth / 2;
    startY = margin + spacing / 2;
    
    for (let i = 0; i < numCapacitors; i++) {
      let x = startX - capacitorWidth / 2;
      let y = startY + i * spacing - capacitorHeight / 2;
      
      drawCapacitor(x, y, capacitorWidth, capacitorHeight, currentLineWidth, 
                  HORIZONTAL, capacitors[i].label);
    }
  } else {
    // Vertical layout - arrange horizontally
    spacing = (containerWidth - 2 * margin) / numCapacitors;
    startX = margin + spacing / 2;
    startY = drawHeight / 2;
    
    for (let i = 0; i < numCapacitors; i++) {
      let x = startX + i * spacing - capacitorHeight / 2; // Note: using height for width when vertical
      let y = startY - capacitorWidth / 2; // Note: using width for height when vertical
      
      drawCapacitor(x, y, capacitorHeight, capacitorWidth, currentLineWidth, 
                  VERTICAL, capacitors[i].label);
    }
  }
  
  // Draw control labels
  drawControlLabels();
}

function drawCapacitor(x, y, cwidth, cheight, lineWidth, orientation, label) {
  push(); // Save drawing state
  
  // Light gray background for debugging
  // fill(230);
  stroke('black');
  strokeWeight(1);
  // outline box for debugging
  // rect(x, y, cwidth, cheight);
  
  strokeWeight(lineWidth);
  stroke('black');
  noFill();
  
  // The percent of the length of the capacitor that is taken by each end wire
  let endWirePercent = 0.2;
  let endWireLength = cwidth * endWirePercent;
  
  // Gap between capacitor plates (as percentage of total length)
  let plateGapPercent = 0.1;
  let plateGap = cwidth * plateGapPercent;
  
  // Length of each capacitor plate
  let plateLength = cheight * 0.6; // Plates are 60% of the height
  
  if (orientation === HORIZONTAL) {
    let centerY = y + cheight / 2;
    let centerX = x + cwidth / 2;
    let plateStartY = centerY - plateLength / 2;
    let plateEndY = centerY + plateLength / 2;
    
    // Left end wire
    line(x, centerY, centerX - plateGap / 2, centerY);
    
    // Right end wire 
    line(centerX + plateGap / 2, centerY, x + cwidth, centerY);
    
    // Left plate (vertical line)
    line(centerX - plateGap / 2, plateStartY, centerX - plateGap / 2, plateEndY);
    
    // Right plate (vertical line)
    line(centerX + plateGap / 2, plateStartY, centerX + plateGap / 2, plateEndY);
    
    // Draw label below capacitor
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(label, x + cwidth / 2, y + cheight + 5);
    
  } else if (orientation === VERTICAL) {
    let centerX = x + cwidth / 2;
    let centerY = y + cheight / 2;
    endWireLength = cheight * endWirePercent;
    plateGap = cheight * plateGapPercent;
    plateLength = cwidth * 0.6; // Plates are 60% of the width
    let plateStartX = centerX - plateLength / 2;
    let plateEndX = centerX + plateLength / 2;
    
    // Top end wire
    line(centerX, y, centerX, centerY - plateGap / 2);
    
    // Bottom end wire
    line(centerX, centerY + plateGap / 2, centerX, y + cheight);
    
    // Top plate (horizontal line)
    line(plateStartX, centerY - plateGap / 2, plateEndX, centerY - plateGap / 2);
    
    // Bottom plate (horizontal line)
    line(plateStartX, centerY + plateGap / 2, plateEndX, centerY + plateGap / 2);
    
    // Draw label to the right of capacitor
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(label, x + cwidth + 10, y + cheight / 2);
  }
  
  pop(); // Restore drawing state
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Current orientation
  text(`Orientation: ${currentOrientation.toUpperCase()}`, 10, drawHeight + 45);
  
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

function resetCapacitors() {
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
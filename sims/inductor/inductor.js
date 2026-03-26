// Inductor Orientation Test
// This program demonstrates drawing inductors in both horizontal and vertical orientations
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

// Inductor drawing parameters
let inductorWidth = 120;
let inductorHeight = 40;

// Sample inductor data
let inductors = [
  { label: "10mH", color: "blue" },
  { label: "1H", color: "green" },
  { label: "100μH", color: "orange" },
  { label: "47mH", color: "purple" }
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
  resetButton.mousePressed(resetInductors);
  
  // Create line width slider
  lineWidthSlider = createSlider(1, 5, 2);
  lineWidthSlider.position(leftSliderMargin, drawHeight + 55);
  lineWidthSlider.size(containerWidth - 140);

  describe('Inductor drawing test showing inductors in different orientations with customizable line width and labels.', LABEL);
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
  text("Inductor Drawing Test", containerWidth/2, margin/2);
  
  // Reset text properties
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Get current line width
  let currentLineWidth = lineWidthSlider.value();
  
  // Calculate responsive inductor positions
  let numInductors = inductors.length;
  let spacing, startX, startY;
  
  if (currentOrientation === HORIZONTAL) {
    // Horizontal layout - arrange vertically
    spacing = (drawHeight - 2 * margin) / numInductors;
    startX = containerWidth / 2;
    startY = margin + spacing / 2;
    
    for (let i = 0; i < numInductors; i++) {
      let x = startX - inductorWidth / 2;
      let y = startY + i * spacing - inductorHeight / 2;
      
      drawInductor(x, y, inductorWidth, inductorHeight, currentLineWidth, 
                  HORIZONTAL, inductors[i].label);
    }
  } else {
    // Vertical layout - arrange horizontally
    spacing = (containerWidth - 2 * margin) / numInductors;
    startX = margin + spacing / 2;
    startY = drawHeight / 2;
    
    for (let i = 0; i < numInductors; i++) {
      let x = startX + i * spacing - inductorHeight / 2; // Note: using height for width when vertical
      let y = startY - inductorWidth / 2; // Note: using width for height when vertical
      
      drawInductor(x, y, inductorHeight, inductorWidth, currentLineWidth, 
                  VERTICAL, inductors[i].label);
    }
  }
  
  // Draw control labels
  drawControlLabels();
}

function drawInductor(x, y, iwidth, iheight, lineWidth, orientation, label) {
  push(); // Save drawing state
  
  strokeWeight(lineWidth);
  stroke('black');
  noFill();
  
  // The percent of the length of the inductor that is taken by each end wire
  let endWirePercent = 0.15;
  let endWireLength = iwidth * endWirePercent;
  
  // Number of coils in the inductor symbol
  let numCoils = 4;
  let coilsWidth = iwidth - 2 * endWireLength;
  let coilWidth = coilsWidth / numCoils;
  let coilRadius = iheight / 3; // Radius of each semicircular coil
  
  if (orientation === HORIZONTAL) {
    let centerY = y + iheight / 2;
    
    // Left end wire
    line(x, centerY, x + endWireLength, centerY);
    
    // Right end wire 
    line(x + iwidth - endWireLength, centerY, x + iwidth, centerY);
    
    // Draw coils (all facing upward like wound wire)
    for (let i = 0; i < numCoils; i++) {
      let coilStartX = x + endWireLength + i * coilWidth;
      let coilEndX = coilStartX + coilWidth;
      
      // Each coil is a semicircle sitting on the centerline, all facing upward
      arc(coilStartX + coilWidth/2, centerY, coilWidth, coilRadius * 2, PI, TWO_PI);
    }
    
    // Draw label below inductor
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(label, x + iwidth / 2, y + iheight + 5);
    
  } else if (orientation === VERTICAL) {
    let centerX = x + iwidth / 2;
    endWireLength = iheight * endWirePercent;
    coilsWidth = iheight - 2 * endWireLength;
    coilWidth = coilsWidth / numCoils;
    coilRadius = iwidth / 3; // Radius of each semicircular coil
    
    // Top end wire
    line(centerX, y, centerX, y + endWireLength);
    
    // Bottom end wire
    line(centerX, y + iheight - endWireLength, centerX, y + iheight);
    
    // Draw coils (all facing right like wound wire)
    for (let i = 0; i < numCoils; i++) {
      let coilStartY = y + endWireLength + i * coilWidth;
      let coilEndY = coilStartY + coilWidth;
      
      // Each coil is a semicircle sitting on the centerline, all facing right
      arc(centerX, coilStartY + coilWidth/2, coilRadius * 2, coilWidth, PI + HALF_PI, HALF_PI);
    }
    
    // Draw label to the right of inductor
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(label, x + iwidth + 10, y + iheight / 2);
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

function resetInductors() {
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
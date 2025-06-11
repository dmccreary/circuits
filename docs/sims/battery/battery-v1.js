
function drawBattery(x1, y1, batWidth, batHeight) {
  batteryWidth = batWidth;
  batteryHeight = batHeight;
  goldTopPercent = .30;
  // "-" and "+" horizontal line x margin
  hlinex = batteryWidth/5
  strokeWeight(2);
  fill('gold')
  rect(x1, y1, batteryWidth, batteryHeight*goldTopPercent)
  fill('black')
  rect(x1, y1+batteryHeight*goldTopPercent, batteryWidth, batteryHeight*(1-goldTopPercent))
  // horizontal line x margin
  hlinex = batteryWidth/5
  // draw the minus in white
  stroke('white')
  strokeWeight(2)
  line(x1 + batteryWidth/4, y1 + batteryHeight*.9, x1+   
       batteryWidth/4*3, y1 + batteryHeight*.9);
  
  // draw the plus at the top of the battery
  stroke('black')
  // horizontal black line of the "+"
  line(x1+hlinex, y1 + batteryHeight*.15, x1+   
       hlinex*4, y1 + batteryHeight*.15);
  // verticl line of tbe "+""
  line(x1 + batteryWidth/2, y1 + batteryHeight*.05, 
       x1 + batteryWidth/2, y1 + batteryHeight*.25);
}
// Battery Orientation Test
// This program demonstrates drawing batteries in both horizontal and vertical orientations
// The batteries are drawn responsively and can be toggled between orientations

// Constants for orientation strings
const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 400;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 80;                     // Height of controls region
let canvasHeight = drawHeight + controlHeight; // Total canvas height
let margin = 25;                            // Margin for visual elements
let defaultTextSize = 16;                   // Base text size for readability

// Global variables for responsive design
let containerWidth;                         // Calculated from container upon resize
let containerHeight = canvasHeight;         // Usually fixed height on page

// Control variables
let orientationButton;
let currentOrientation = VERTICAL;
let resetButton;

// Battery drawing parameters
let batteryWidth = 60;
let batteryHeight = 120;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  
  // Create orientation toggle button
  orientationButton = createButton('Switch to Horizontal');
  orientationButton.position(10, drawHeight + 10);
  orientationButton.mousePressed(toggleOrientation);
  
  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(160, drawHeight + 10);
  resetButton.mousePressed(resetBatteries);

  describe('Battery drawing test showing batteries in different orientations that can be toggled between horizontal and vertical layouts.', LABEL);
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
  text("Battery Orientation Test", containerWidth/2, margin/2);
  
  // Reset text properties
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Calculate responsive battery positions
  let spacing = containerWidth / 4;
  let startX = spacing / 2;
  let centerY = drawHeight / 2;
  
  // Draw multiple batteries in current orientation
  for (let i = 0; i < 3; i++) {
    let x = startX + i * spacing;
    let y = centerY;
    
    // Adjust position based on orientation for centering
    if (currentOrientation === HORIZONTAL) {
      x -= batteryHeight / 2;  // Adjust for horizontal battery width
      y -= batteryWidth / 2;   // Adjust for horizontal battery height
      drawBattery(x, y, batteryHeight, batteryWidth, HORIZONTAL);
    } else {
      x -= batteryWidth / 2;   // Adjust for vertical battery width
      y -= batteryHeight / 2;  // Adjust for vertical battery height
      drawBattery(x, y, batteryWidth, batteryHeight, VERTICAL);
    }
  }
  
  // Draw labels for each battery
  fill('black');
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(defaultTextSize);
  
  for (let i = 0; i < 3; i++) {
    let x = startX + i * spacing;
    let labelY = centerY + (currentOrientation === HORIZONTAL ? batteryWidth/2 + 20 : batteryHeight/2 + 20);
    text(`Battery ${i + 1}`, x, labelY);
  }
  
  // Draw current orientation status
  fill('black');
  textAlign(LEFT, CENTER);
  text(`Current Orientation: ${currentOrientation.toUpperCase()}`, 10, drawHeight + 50);
}

// Enhanced drawBattery function with orientation support
function drawBattery(x, y, width, height, orientation) {
  push(); // Save current drawing state
  
  if (orientation === HORIZONTAL) {
    drawHorizontalBattery(x, y, width, height);
  } else {
    drawVerticalBattery(x, y, width, height);
  }
  
  pop(); // Restore drawing state
}

function drawVerticalBattery(x, y, width, height) {
  let goldTopPercent = 0.30;
  
  strokeWeight(2);
  
  // Draw gold top section (positive terminal)
  fill('gold');
  stroke('black');
  rect(x, y, width, height * goldTopPercent);
  
  // Draw black bottom section (negative terminal)
  fill('black');
  rect(x, y + height * goldTopPercent, width, height * (1 - goldTopPercent));
  
  // Draw the minus sign in white on the black section
  stroke('white');
  strokeWeight(2);
  line(x + width/4, y + height * 0.9, 
       x + width * 3/4, y + height * 0.9);
  
  // Draw the plus sign in black on the gold section
  stroke('black');
  strokeWeight(2);
  // Horizontal line of the "+"
  line(x + width/5, y + height * 0.15, 
       x + width * 4/5, y + height * 0.15);
  // Vertical line of the "+"
  line(x + width/2, y + height * 0.05, 
       x + width/2, y + height * 0.25);
}

function drawHorizontalBattery(x, y, width, height) {
  let goldLeftPercent = 0.30;
  
  strokeWeight(2);
  
  // Draw gold left section (positive terminal)
  fill('gold');
  stroke('black');
  rect(x, y, width * goldLeftPercent, height);
  
  // Draw black right section (negative terminal)
  fill('black');
  rect(x + width * goldLeftPercent, y, width * (1 - goldLeftPercent), height);
  
  // Draw the plus sign in black on the gold section (left)
  stroke('black');
  strokeWeight(2);
  let plusCenterX = x + width * goldLeftPercent / 2;
  let plusCenterY = y + height / 2;
  // Horizontal line of the "+"
  line(plusCenterX - width * 0.08, plusCenterY, 
       plusCenterX + width * 0.08, plusCenterY);
  // Vertical line of the "+"
  line(plusCenterX, plusCenterY - height * 0.15, 
       plusCenterX, plusCenterY + height * 0.15);
  
  // Draw the minus sign in white on the black section (right)
  stroke('white');
  strokeWeight(2);
  let minusCenterX = x + width * goldLeftPercent + width * (1 - goldLeftPercent) / 2;
  let minusCenterY = y + height / 2;
  line(minusCenterX - width * 0.08, minusCenterY, 
       minusCenterX + width * 0.08, minusCenterY);
}

function toggleOrientation() {
  if (currentOrientation === VERTICAL) {
    currentOrientation = HORIZONTAL;
    orientationButton.html('Switch to Vertical');
  } else {
    currentOrientation = VERTICAL;
    orientationButton.html('Switch to Horizontal');
  }
  redraw();
}

function resetBatteries() {
  currentOrientation = VERTICAL;
  orientationButton.html('Switch to Horizontal');
  redraw();
}

// Required functions for responsive design
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
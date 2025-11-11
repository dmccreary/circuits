
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
let lineWidth = 2;

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
  // resetButton.mousePressed(resetBatteries);

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
  text("Circuit Library Drawing Test", containerWidth/2, margin/2);
  
  // Reset text properties
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  if (currentOrientation === HORIZONTAL) {
     drawBattery(margin, margin * 2, 100, 50, currentOrientation);
  } else {
     drawBattery(margin, margin * 2, 50, 100, currentOrientation);
  }     

  drawSwitch(margin+ 200, margin * 2, 50, 100, currentOrientation);

  drawResistor(margin + 300, margin * 2, 100, 50, currentOrientation, "1k");

  drawCapacitor(margin + 400, margin * 2, 50, 100, currentOrientation, "100uF");

  drawInductor(margin + 500, margin * 2, 100, 50, currentOrientation, "200");
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
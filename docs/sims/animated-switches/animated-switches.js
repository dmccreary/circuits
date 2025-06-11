// Animated Wire Circuit Simulation with Horizontal and Vertical Switches
// This simulation draws a square wire circuit with animated circles moving along 
// the wires simulating the flow of electric current by representing electron flow.
// The speed and spacing of the circles can be controlled with sliders, 
// and the animation can be toggled on and off with a button.
// Added horizontal and vertical switches that break the current when in the off position.

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 400;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 120;                    // Height of controls region (increased for switch controls)
let canvasHeight = drawHeight + controlHeight; // Total canvas height
let margin = 40;                            // Margin for visual elements
let sliderLeftMargin = 115;                 // Left margin for slider positioning
let defaultTextSize = 16;                   // Base text size for readability

// Global variables for responsive design
let containerWidth;                         // Calculated from container upon resize
let containerHeight = canvasHeight;         // Usually fixed height on page

// Simulation variables
let isRunning = false;
let animationTime = 0;                      // Track animation time independently
let speedSlider;
let spacingSlider;
let startButton;
let resetButton;
let horizSwitchButton;
let vertSwitchButton;

// Wire drawing parameters
let wireMargin = 50;
let lineWidth = 8;

// Switch variables
let horizSwitchClosed = true;               // true = closed/on, false = open/off
let vertSwitchClosed = true;                // true = closed/on, false = open/off
let horizSwitchX, horizSwitchY;             // Horizontal switch position
let vertSwitchX, vertSwitchY;               // Vertical switch position
let switchLength = 50;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  
  // Calculate switch positions
  updateSwitchPositions();
  
  // Create speed control slider
  speedSlider = createSlider(0.02, 0.5, 0.25, 0.03);
  speedSlider.position(sliderLeftMargin, drawHeight + 35);
  speedSlider.size(containerWidth - sliderLeftMargin - 25);
  
  // Create spacing control slider  
  spacingSlider = createSlider(0.15, 1.5, 1.0, 0.05);
  spacingSlider.position(sliderLeftMargin, drawHeight + 55);
  spacingSlider.size(containerWidth - sliderLeftMargin - 25);
  
  // Create start/pause button
  startButton = createButton('Start');
  startButton.position(10, drawHeight + 10);
  startButton.mousePressed(toggleSimulation);
  
  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(70, drawHeight + 10);
  resetButton.mousePressed(resetSimulation);
  
  // Create horizontal switch control button
  horizSwitchButton = createButton('H-Switch: ON');
  horizSwitchButton.position(140, drawHeight + 10);
  horizSwitchButton.mousePressed(toggleHorizSwitch);
  
  // Create vertical switch control button
  vertSwitchButton = createButton('V-Switch: ON');
  vertSwitchButton.position(250, drawHeight + 10);
  vertSwitchButton.mousePressed(toggleVertSwitch);

  describe('Wire circuit simulation with horizontal and vertical switches showing electron flow through a square wire loop when both switches are on. Speed and spacing are controllable.', LABEL);
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
  text("Wire Circuit with Two Switches", containerWidth/2, margin/2);
  
  // Reset text properties for other elements
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Get current slider values
  let currentSpeed = speedSlider.value();
  let currentSpacing = spacingSlider.value();
  
  // Current flows only when both switches are closed
  let currentFlowing = horizSwitchClosed && vertSwitchClosed;
  
  // Update animation time only when running and both switches are on
  if (isRunning && currentFlowing) {
    animationTime += deltaTime;
  }
  
  // Calculate wire boundaries with responsive margins
  let circuitMargin = margin*2;
  let rightEdge = containerWidth - circuitMargin;
  let bottomEdge = drawHeight - circuitMargin;
  
  // Draw the four wires forming a square circuit
  // Top wire (left to right) - split around horizontal switch
  let horizSwitchLeft = horizSwitchX;
  let horizSwitchRight = horizSwitchX + switchLength;
  
  // Left portion of top wire
  drawAnimatedWire(circuitMargin, circuitMargin, horizSwitchLeft, circuitMargin, currentSpeed, currentSpacing, currentFlowing);
  
  // Right portion of top wire
  drawAnimatedWire(horizSwitchRight, circuitMargin, rightEdge, circuitMargin, currentSpeed, currentSpacing, currentFlowing);
  
  // Right wire (top to bottom) - split around vertical switch
  let vertSwitchTop = vertSwitchY;
  let vertSwitchBottom = vertSwitchY + switchLength;
  
  // Top portion of right wire
  drawAnimatedWire(rightEdge, circuitMargin, rightEdge, vertSwitchTop, currentSpeed, currentSpacing, currentFlowing);
  
  // Bottom portion of right wire
  drawAnimatedWire(rightEdge, vertSwitchBottom, rightEdge, bottomEdge, currentSpeed, currentSpacing, currentFlowing);
  
  // Bottom wire (right to left)
  drawAnimatedWire(rightEdge, bottomEdge, circuitMargin, bottomEdge, currentSpeed, currentSpacing, currentFlowing);
  
  // Left wire (bottom to top)
  drawAnimatedWire(circuitMargin, bottomEdge, circuitMargin, circuitMargin, currentSpeed, currentSpacing, currentFlowing);
  
  // Draw the switches using the drawSwitch function from switch.js
  drawSwitch(horizSwitchX, horizSwitchY, switchLength, horizSwitchClosed, "HORIZ");
  drawSwitch(vertSwitchX, vertSwitchY, switchLength, vertSwitchClosed, "VERT");
  
  // Draw control labels
  drawControlLabels();
}

// Draw a black line with red circles as current from (x1,y1) to (x2,y2) 
function drawAnimatedWire(x1, y1, x2, y2, speed, spacing, currentFlowing) {
  // Calculate wire properties
  let distance = dist(x1, y1, x2, y2);
  let spacingPixels = spacing * 50; // Convert spacing to pixels
  let numElectrons = Math.floor(distance / spacingPixels);
  
  // Draw the wire
  stroke('black');
  strokeWeight(lineWidth);
  line(x1, y1, x2, y2);
  
  // Draw moving electrons only if current is flowing
  if (currentFlowing && numElectrons > 0) {
    fill('red');
    noStroke();
    
    for (let i = 0; i <= numElectrons; i++) {
      // Calculate electron position using animationTime
      let electronPos = (animationTime * speed + i * spacingPixels) % distance;
      let x = lerp(x1, x2, electronPos / distance);
      let y = lerp(y1, y2, electronPos / distance);
      
      // Draw electron as red circle
      let electronSize = 8;
      circle(x, y, electronSize);
    }
  }
}

// Draw an on/off switch at (x,y) of length len
// Orientation parameter "HORIZ" or "VERT"
// From switch.js file
function drawSwitch(x, y, len, isClosed, orientation) {
  circle(x, y, 4);
  if (orientation == "HORIZ") {
    circle(x+len, y, 4);
    stroke(0);
    strokeWeight(3);
    fill('black');
    if(isClosed) {
      line(x, y, x + len, y);
      strokeWeight(0);
      text('on', x+15, y-10);
    } else {
      line(x, y, x + len * .8, y - len * .6);
      strokeWeight(0);
      text('off', x + 20, y);
    }
  } else {
    circle(x, y+len, 4);
    stroke(0);
    strokeWeight(2);
    fill('black');
    if(isClosed) {
      line(x, y, x, y + len);
      strokeWeight(0);
      text('on', x+7, y+29);
    } else { 
      line(x, y, x + len*.8, y + len * .6);
      strokeWeight(0);
      text('off', x, y+29);
    }
  }
}

function drawControlLabels() {
  push();
  translate(0, 30);
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Speed label and value
  text('Speed: ' + speedSlider.value().toFixed(3), 10, drawHeight + 15);

  // Spacing label and value  
  text('Spacing: ' + spacingSlider.value().toFixed(2), 10, drawHeight + 35);
  
  // Current status
  let currentStatus = (horizSwitchClosed && vertSwitchClosed) ? "FLOWING" : "BLOCKED";
  fill(currentStatus === "FLOWING" ? 'green' : 'red');
  text('Current: ' + currentStatus, 10, drawHeight + 95);
  
  pop();
}

function toggleSimulation() {
  isRunning = !isRunning;
  startButton.html(isRunning ? 'Pause' : 'Start');
}

function toggleHorizSwitch() {
  horizSwitchClosed = !horizSwitchClosed;
  horizSwitchButton.html('H-Switch: ' + (horizSwitchClosed ? 'ON' : 'OFF'));
  
  // Reset animation time when switch changes to avoid sudden jumps
  if (!horizSwitchClosed) {
    animationTime = 0;
  }
}

function toggleVertSwitch() {
  vertSwitchClosed = !vertSwitchClosed;
  vertSwitchButton.html('V-Switch: ' + (vertSwitchClosed ? 'ON' : 'OFF'));
  
  // Reset animation time when switch changes to avoid sudden jumps
  if (!vertSwitchClosed) {
    animationTime = 0;
  }
}

function resetSimulation() {
  // Reset sliders to default values
  speedSlider.value(0.25);
  spacingSlider.value(1.0);
  
  // Reset animation time
  animationTime = 0;
  
  // Stop simulation
  isRunning = false;
  startButton.html('Start');
  
  // Turn both switches on
  horizSwitchClosed = true;
  vertSwitchClosed = true;
  horizSwitchButton.html('H-Switch: ON');
  vertSwitchButton.html('V-Switch: ON');
  
  // Redraw to show reset state
  redraw();
}

function updateSwitchPositions() {
  let circuitMargin = margin*2;
  let rightEdge = containerWidth - circuitMargin;
  
  // Horizontal switch on top wire
  horizSwitchX = containerWidth / 2 - switchLength / 2;  // Center of top wire
  horizSwitchY = circuitMargin;                          // Top wire y-position
  
  // Vertical switch on right wire
  vertSwitchX = rightEdge;                               // Right wire x-position
  vertSwitchY = drawHeight / 2 - switchLength / 2;       // Center of right wire
}

// Handle mouse clicks on switches
function mousePressed() {
  
  // area around the switch to be sensitive to clicks
  clickMargin = 30;
  // Check if click is on horizontal switch
  if (mouseX >= horizSwitchX && mouseX <= horizSwitchX + switchLength &&
      mouseY >= horizSwitchY - clickMargin && mouseY <= horizSwitchY + clickMargin) {
    toggleHorizSwitch();
    return;
  }
  
  // Check if click is on vertical switch
  if (mouseX >= vertSwitchX - clickMargin && mouseX <= vertSwitchX + clickMargin &&
      mouseY >= vertSwitchY && mouseY <= vertSwitchY + switchLength) {
    toggleVertSwitch();
    return;
  }
  
}

// Required functions for responsive design
function windowResized() {
  updateCanvasSize();
  updateSwitchPositions();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
  
  // Resize sliders to match new width
  speedSlider.size(containerWidth - sliderLeftMargin - 15);
  spacingSlider.size(containerWidth - sliderLeftMargin - 15);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
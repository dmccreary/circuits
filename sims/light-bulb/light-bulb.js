// Animated Wire Circuit Simulation with Vertical Switch and Light Bulb
// This simulation draws a square wire circuit with animated circles moving along 
// the wires simulating the flow of electric current by representing electron flow.
// The speed and spacing of the circles can be controlled with sliders, 
// and the animation can be toggled on and off with a button.
// Added a vertical switch and light bulb that shows brightness based on current flow.
// Dan McCreary - June 2025

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 400;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 80;                    // Height of controls region
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
let vertSwitchButton;

// Wire drawing parameters
let wireMargin = 50;
let lineWidth = 8;

// Switch and light bulb variables
let vertSwitchClosed = true;                // true = closed/on, false = open/off
let vertSwitchX, vertSwitchY;               // Vertical switch position
let lightBulbX, lightBulbY;                 // Light bulb position
let switchLength = 50;
let bulbWidth = 70;
let bulbHeight = 70;

// Circuit orientation constants
const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';


function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  
  // Calculate switch and light bulb positions
  updateComponentPositions();
  
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
  
  // Create vertical switch control button
  vertSwitchButton = createButton('Switch: ON');
  vertSwitchButton.position(140, drawHeight + 10);
  vertSwitchButton.mousePressed(toggleVertSwitch);

  describe('Wire circuit simulation with a vertical switch and light bulb showing electron flow through a square wire loop when the switch is on. The light bulb glows when current flows. Speed and spacing are controllable.', LABEL);
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
  text("Circuit with Switch and Light Bulb", containerWidth/2, margin/2);
  
  // Reset text properties for other elements
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Get current slider values
  let currentSpeed = speedSlider.value();
  let currentSpacing = spacingSlider.value();
  
  // Current flows only when switch is closed
  let currentFlowing = vertSwitchClosed;
  
  // Update animation time only when running and switch is on
  if (isRunning && currentFlowing) {
    animationTime += deltaTime;
  }
  
  // Calculate wire boundaries with responsive margins
  let circuitMargin = margin*2;
  let rightEdge = containerWidth - circuitMargin;
  let bottomEdge = drawHeight - circuitMargin;
  
  // Draw the four wires forming a square circuit
  // Top wire (left to right) - now continuous, no horizontal switch
  drawAnimatedWire(circuitMargin, circuitMargin, rightEdge, circuitMargin, currentSpeed, currentSpacing, currentFlowing);
  
  // Right wire (top to bottom) - split around vertical switch and light bulb
  let vertSwitchTop = vertSwitchY;
  let vertSwitchBottom = vertSwitchY + switchLength;
  let lightBulbTop = lightBulbY - bulbHeight/2;
  let lightBulbBottom = lightBulbY + bulbHeight/2;
  
  // Top portion of right wire (top to switch)
  drawAnimatedWire(rightEdge, circuitMargin, rightEdge, vertSwitchTop, currentSpeed, currentSpacing, currentFlowing);
  
  // Middle portion of right wire (switch to light bulb)
  drawAnimatedWire(rightEdge, vertSwitchBottom, rightEdge, lightBulbTop, currentSpeed, currentSpacing, currentFlowing);
  
  // Bottom portion of right wire (light bulb to bottom)
  drawAnimatedWire(rightEdge, lightBulbBottom, rightEdge, bottomEdge, currentSpeed, currentSpacing, currentFlowing);
  
  // Bottom wire (right to left)
  drawAnimatedWire(rightEdge, bottomEdge, circuitMargin, bottomEdge, currentSpeed, currentSpacing, currentFlowing);
  
  // Left wire (bottom to top)
  drawAnimatedWire(circuitMargin, bottomEdge, circuitMargin, circuitMargin, currentSpeed, currentSpacing, currentFlowing);
  
  // Draw the vertical switch
  drawSwitch(vertSwitchX, vertSwitchY, switchLength, vertSwitchClosed, VERTICAL);
  
  // Draw the light bulb with brightness based on current flow
  let bulbBrightness = (currentFlowing && isRunning) ? 1.0 : 0.0;
  drawLightBulb(lightBulbX, lightBulbY, bulbWidth, bulbHeight, bulbBrightness);
  
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

function drawLightBulb(x, y, width, height, brightness) {
  push();
  translate(x, y);
  
  // Calculate bulb color based on brightness (black to yellow)
  let bulbColor;
  if (brightness === 0) {
    bulbColor = color(0); // Black when off
  } else {
    // Yellow when on, with intensity based on brightness
    bulbColor = color(255 * brightness, 255 * brightness, 0);
  }
  
  // Draw bulb outline (always black)
  stroke('black');
  strokeWeight(3);
  noFill();
  
  // Draw the main bulb shape (circle)
  let bulbRadius = min(width, height) * 0.4;
  circle(0, -height/4, bulbRadius * 2);
  
  // Draw the screw base (rectangle)
  let baseWidth = width * 0.3;
  let baseHeight = height * 0.3;
  rect(-baseWidth/2, height/4 - baseHeight/2, baseWidth, baseHeight);
  
  // Fill the bulb with brightness color
  fill(bulbColor);
  noStroke();
  circle(0, -height/4, bulbRadius * 1.8);
  
  // Add filament lines when bright
  if (brightness > 0.3) {
    stroke('orange');
    strokeWeight(2);
    // Draw simple filament pattern
    line(-bulbRadius/2, -height/4, bulbRadius/2, -height/4);
    line(-bulbRadius/3, -height/4 - bulbRadius/3, bulbRadius/3, -height/4 + bulbRadius/3);
  }
  
  // Add connection points
  stroke('black');
  strokeWeight(4);
  // Not needed for now
  // Top connection
  // line(0, -height/2, 0, -height/4 - bulbRadius);
  // Bottom connection  
  // line(0, height/4 + baseHeight/2, 0, height/2);
  
  pop();
}

// Draw an on/off switch at (x,y) of length len
// Orientation parameter "HORIZ" or "VERT"
function drawSwitch(x, y, len, isClosed, orientation) {
  circle(x, y, 4);
  if (orientation === HORIZONTAL) {
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
  
  // Current and bulb status
  let currentStatus = vertSwitchClosed ? "FLOWING" : "BLOCKED";
  fill(currentStatus === "FLOWING" ? 'green' : 'red');
  text('Current: ' + currentStatus, 10, drawHeight + 75);
  
  let bulbStatus = (vertSwitchClosed && isRunning) ? "BRIGHT" : "OFF";
  fill(bulbStatus === "BRIGHT" ? 'yellow' : 'gray');
  text('Bulb: ' + bulbStatus, 150, drawHeight + 75);
  
  pop();
}

function toggleSimulation() {
  isRunning = !isRunning;
  startButton.html(isRunning ? 'Pause' : 'Start');
}

function toggleVertSwitch() {
  vertSwitchClosed = !vertSwitchClosed;
  vertSwitchButton.html('Switch: ' + (vertSwitchClosed ? 'ON' : 'OFF'));
  
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
  
  // Turn switch on
  vertSwitchClosed = true;
  vertSwitchButton.html('Switch: ON');
  
  // Redraw to show reset state
  redraw();
}

function updateComponentPositions() {
  let circuitMargin = margin*2;
  let rightEdge = containerWidth - circuitMargin;
  
  // Vertical switch on right wire
  vertSwitchX = rightEdge;                               // Right wire x-position
  vertSwitchY = drawHeight / 3 - switchLength / 2;       // Upper third of right wire
  
  // Light bulb below the switch
  lightBulbX = rightEdge;                                // Same x as switch
  lightBulbY = drawHeight * 2/3;                         // Lower third of right wire
}

// Handle mouse clicks on switches and light bulb
function mousePressed() {
  
  // area around the switch to be sensitive to clicks
  clickMargin = 30;
  
  // Check if click is on vertical switch
  if (mouseX >= vertSwitchX - clickMargin && mouseX <= vertSwitchX + clickMargin &&
      mouseY >= vertSwitchY && mouseY <= vertSwitchY + switchLength) {
    toggleVertSwitch();
    return;
  }
  
  // Check if click is on light bulb (for fun interaction)
  if (mouseX >= lightBulbX - bulbWidth/2 && mouseX <= lightBulbX + bulbWidth/2 &&
      mouseY >= lightBulbY - bulbHeight/2 && mouseY <= lightBulbY + bulbHeight/2) {
    // Could add some fun interaction here, like a temporary flash
    return;
  }
}

// Required functions for responsive design
function windowResized() {
  updateCanvasSize();
  updateComponentPositions();
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
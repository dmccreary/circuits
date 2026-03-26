// Simple Series Circuit with Digital Current Meter
// This simulation shows a 5V battery, digital current meter, LED, and potentiometer
// The LED brightness changes with current (0-20mA) controlled by the potentiometer
// Following standard MicroSim layout with responsive design

// Canvas dimensions following standard MicroSim layout
let canvasWidth = 400;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 80;                     // Height of controls region
let canvasHeight = drawHeight + controlHeight; // Total canvas height
let margin = 25;                            // Margin for visual elements
let sliderLeftMargin = 180;                 // Left margin for slider positioning
let defaultTextSize = 16;                   // Base text size for readability

// Global variables for responsive design
let containerWidth;                         // Calculated from container upon resize
let containerHeight = canvasHeight;         // Usually fixed height on page

// Control variables
let potSlider;
let resetButton;

// Circuit parameters
let batteryVoltage = 5.0;                   // 5V battery
let maxCurrent = 0.020;                     // 20mA maximum current
let currentCurrent = 0;                     // Current through circuit
let ledForwardVoltage = 2.0;                // LED forward voltage drop
let fixedResistance = 150;                  // Fixed series resistance in ohms

// Component positions (will be updated in setup based on canvas size)
let batteryX, batteryY;
let meterX, meterY;
let ledX, ledY;
let potX, potY;

// Circuit wire coordinates
let wirePoints = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  
  // Create potentiometer control slider (0-1000 ohms)
  potSlider = createSlider(100, 1000, 500, 10);
  potSlider.position(sliderLeftMargin, drawHeight + 35);
  potSlider.size(containerWidth - sliderLeftMargin - 25);
  
  // Create reset button
  resetButton = createButton('Reset');
  resetButton.position(10, drawHeight + 10);
  resetButton.mousePressed(resetCircuit);
  
  // Calculate component positions
  updateComponentPositions();
  
  describe('Simple series circuit simulation with 5V battery, digital current meter, LED, and variable potentiometer showing current from 0-20mA.', LABEL);
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
  text("Series Circuit with Current Meter", containerWidth/2, margin/2);
  
  // Reset text properties
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Calculate current through circuit
  calculateCurrent();
  
  // Draw circuit wires
  drawCircuitWires();
  
  // Draw components
  drawBattery(batteryX, batteryY, 80, 30, batteryVoltage);
  drawDigitalMeter(meterX, meterY, 120, 40, currentCurrent);
  drawLED(ledX, ledY, 30, currentCurrent);
  drawPotentiometer(potX, potY, 60, 30, potSlider.value());
  
  // Draw control labels
  drawControlLabels();
}

function calculateCurrent() {
  // Calculate total circuit resistance
  let potResistance = potSlider.value();
  let totalResistance = fixedResistance + potResistance;
  
  // Calculate current using Ohm's law: I = (V - Vf) / R
  // Subtracting LED forward voltage drop
  let effectiveVoltage = batteryVoltage - ledForwardVoltage;
  currentCurrent = effectiveVoltage / totalResistance;
  
  // Clamp current to reasonable range
  currentCurrent = constrain(currentCurrent, 0, maxCurrent);
}

function drawCircuitWires() {
  stroke('black');
  strokeWeight(3);
  noFill();
  
  // Define wire path coordinates
  let wireWidth = 3;
  
  // Left vertical wire (battery to top)
  line(batteryX + 40, batteryY, batteryX + 40, meterY + 20);
  
  // Top horizontal wire (battery to meter)
  line(batteryX + 40, meterY + 20, meterX, meterY + 20);
  
  // Top right wire (meter to LED)
  line(meterX + 120, meterY + 20, ledX + 15, meterY + 20);
  
  // Right vertical wire (top to LED)
  line(ledX + 15, meterY + 20, ledX + 15, ledY);
  
  // Right vertical wire (LED to bottom)
  line(ledX + 15, ledY + 30, ledX + 15, potY + 15);
  
  // Bottom horizontal wire (LED to pot)
  line(ledX + 15, potY + 15, potX + 30, potY + 15);
  
  // Bottom left wire (pot to battery)
  line(potX, potY + 15, batteryX + 40, potY + 15);
  
  // Left vertical wire (bottom to battery)
  line(batteryX + 40, potY + 15, batteryX + 40, batteryY + 30);
}

function drawBattery(x, y, w, h, voltage) {
  push();
  
  // Battery body
  fill(220);
  stroke('black');
  strokeWeight(2);
  rect(x, y, w, h);
  
  // Positive terminal
  fill('red');
  rect(x + w - 10, y - 3, 6, h + 6);
  
  // Negative terminal  
  fill('black');
  rect(x + 4, y + h/2 - 2, 6, 4);
  
  // Battery label
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text(voltage + 'V', x + w/2, y + h/2);
  
  // Plus and minus labels
  textSize(12);
  text('+', x + w - 7, y - 10);
  text('-', x + 7, y - 10);
  
  pop();
}

function drawDigitalMeter(x, y, w, h, current) {
  push();
  
  // Meter body
  fill(50);
  stroke('black');
  strokeWeight(2);
  rect(x, y, w, h);
  
  // Display screen
  fill(0, 100, 0);
  stroke('darkgreen');
  strokeWeight(1);
  rect(x + 5, y + 5, w - 10, h - 10);
  
  // Current reading
  fill('lime');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  let currentMA = (current * 1000).toFixed(1);
  text(currentMA + ' mA', x + w/2, y + h/2);
  
  // Meter label
  fill('white');
  textSize(10);
  textAlign(CENTER, TOP);
  text('CURRENT METER', x + w/2, y + h + 2);
  
  pop();
}

function drawLED(x, y, size, current) {
  push();
  
  // LED brightness based on current - more responsive scaling
  let brightness = map(current, 0, maxCurrent, 10, 255); // Minimum brightness of 10 instead of 0
  brightness = constrain(brightness, 10, 255);
  
  // For very low currents, make it dimmer
  if (current < 0.002) { // Less than 2mA
    brightness = map(current, 0, 0.002, 0, 200);
  }
  
  // LED body with enhanced brightness scaling
  fill(brightness, brightness * 0.1, brightness * 0.1); // Slight orange tint for realism
  stroke('black');
  strokeWeight(2);
  circle(x + size/2, y + size/2, size);
  
  // LED leads
  strokeWeight(2);
  line(x + size/2, y, x + size/2, y - 10);      // Top lead (anode)
  line(x + size/2, y + size, x + size/2, y + size + 10); // Bottom lead (cathode)
  
  // LED symbol inside
  stroke('red');
  strokeWeight(1);
  fill('red');
  triangle(x + size/2 - 6, y + size/2 - 6, 
           x + size/2 + 6, y + size/2,
           x + size/2 - 6, y + size/2 + 6);
  
  // LED label
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('LED', x + size/2, y + size + 15);
  
  pop();
}

function drawPotentiometer(x, y, w, h, resistance) {
  push();
  
  // Potentiometer body
  fill(150);
  stroke('black');
  strokeWeight(2);
  rect(x, y, w, h);
  
  // Wiper position (based on resistance value)
  let wiperPos = map(resistance, 100, 1000, 5, w - 5);
  
  // Wiper line
  stroke('red');
  strokeWeight(2);
  line(x + wiperPos, y, x + wiperPos, y + h);
  
  // Connection points
  fill('silver');
  stroke('black');
  strokeWeight(1);
  circle(x, y + h/2, 6);           // Left terminal
  circle(x + w, y + h/2, 6);       // Right terminal
  circle(x + wiperPos, y - 3, 6);  // Wiper terminal
  
  // Potentiometer label
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('POT', x + w/2, y + h + 5);
  text(resistance + 'Ω', x + w/2, y + h + 18);
  
  pop();
}

function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  
  // Potentiometer resistance label
  text('Pot Resistance: ' + potSlider.value() + 'Ω', 10, drawHeight + 40);
  
  // Circuit information
  text('Total R: ' + (fixedResistance + potSlider.value()) + 'Ω', 10, drawHeight + 60);
}

function resetCircuit() {
  // Reset potentiometer to middle value
  potSlider.value(500);
  redraw();
}

function updateComponentPositions() {
  let circuitMargin = margin * 2;
  let centerX = containerWidth / 2;
  let centerY = drawHeight / 2;
  
  // Position components around the circuit
  batteryX = circuitMargin;                           // Left side
  batteryY = centerY - 15;
  
  meterX = centerX - 60;                              // Top center
  meterY = circuitMargin + 40;
  
  ledX = containerWidth - circuitMargin - 30;         // Right side
  ledY = centerY - 15;
  
  potX = centerX - 30;                                // Bottom center
  potY = drawHeight - circuitMargin - 60;
}

// Required functions for responsive design
function windowResized() {
  updateCanvasSize();
  updateComponentPositions();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
  
  // Resize slider to match new width
  potSlider.size(containerWidth - sliderLeftMargin - 25);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
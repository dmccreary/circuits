let canvasWidth = 600;
let canvasHeight = 600;
let plotWidth = canvasWidth;
let plotHeight = 500;
let controlWidth = canvasWidth;
let controlHeight = 100;
let margin = 50;
let plotMargin = margin;


let voltageSlider;
let voltage = 0.7; // Default voltage value (in volts)
let current_mA = 1; // Default current value (in milliamps)

// Shockley equation constants for the diode
const I_s = 1e-12; // Reverse saturation current in Amps
const V_t = 0.0335; // Thermal voltage in Volts

// Plot area dimensions
const plotX0 = plotMargin; // Left margin
const plotX1 = plotWidth - plotMargin; // Right margin
const plotY0 = plotHeight - plotMargin; // Bottom margin
const plotY1 = plotMargin;  // Top margin

// Voltage and Current ranges
const vMin = 0;
const vMax = 1.0;   // Max voltage 1V
const iMin = 0;
const iMax = 10;    // Max current 10mA

function setup() {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    
    // Connect to the main in the HTML DOM
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    // larger text so you can read it from the back of the classroom
    textSize(16);
  
  // Create slider for voltage control
  voltageSlider = createSlider(vMin, vMax, 0.7, 0.01); // Slider from 0V to 1V
  voltageSlider.position(50, plotHeight + 50); // Position in the control area
  voltageSlider.size(500);
}

function draw() {
  background(255); // Clear the canvas

  drawPlotArea();   // Draw the plot area with grid, labels, and I-V curve
  drawControlArea(); // Draw the control area with slider and values
}

function drawPlotArea() {
  // Plot area background
  fill('aliceblue');
  noStroke();
  rect(0, 0, width, canvasWidth - 2*margin);

  // Draw grid lines
  strokeWeight(1); // thin weight
  stroke('silver'); // Gray color for grid lines

  // Vertical grid lines (Voltage)
  for (let v = vMin; v <= vMax; v += 0.1) {
    let x = map(v, vMin, vMax, plotX0, plotX1);
    line(x, plotY0, x, plotY1);
  }

  // Horizontal grid lines (Current)
  for (let i = iMin; i <= iMax; i += 1) {
    let y = map(i, iMin, iMax, plotY0, plotY1);
    line(plotX0, y, plotX1, y);
  }

  // Draw tick marks and labels on the axes
  drawAxes();

  // Draw the I-V curve
  drawIVCurve();

  // Draw the red circle at the selected voltage
  drawOperatingPoint();
}

function drawAxes() {
  fill(0); // Black color for text
  
  textSize(12);
  
  // X-axis (Voltage) tick marks and labels
  textAlign(CENTER, TOP);
  for (let v = vMin; v <= vMax; v += 0.2) {
    let x = map(v, vMin, vMax, plotX0, plotX1);
    // Tick marks
    line(x, plotY0, x, plotY0 + 5);
    // Labels
    text(v.toFixed(1), x, plotY0 + 10);
  }

  // Y-axis (Current) tick marks and labels
  textAlign(RIGHT, CENTER);
  for (let i = iMin; i <= iMax; i += 1) {
    let y = map(i, iMin, iMax, plotY0, plotY1);
    // Tick marks
    line(plotX0 - 5, y, plotX0, y);
    // Labels
    text(i.toFixed(0), plotX0 - 10, y);
  }

  // Axis labels
  textSize(14);
  textAlign(CENTER, TOP);
  text("Voltage (V)", (plotX0 + plotX1) / 2, plotY0 + 30);

  push();
  translate(20, (plotY0 + plotY1) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, BOTTOM);
  text("Current (mA)", 0, 0);
  pop();

  // Title
  textSize(18);
  textAlign(CENTER, TOP);
  text("Silicon Diode Current vs. Voltage", width / 2, 10);
}

function drawIVCurve() {
  stroke('green');
  strokeWeight(3);
  noFill();
  beginShape();
  for (let v = vMin; v <= vMax; v += 0.005) {
    let i = I_s * (exp(v / V_t) - 1) * 1000; // Current in mA
    if (i > iMax) {
      i = iMax; // Limit to max current for plotting
    }
    let x = map(v, vMin, vMax, plotX0, plotX1);
    let y = map(i, iMin, iMax, plotY0, plotY1);
    vertex(x, y);
  }
  endShape();
}

function drawOperatingPoint() {
  // Update voltage and current based on slider
  voltage = voltageSlider.value();
  let current = I_s * (exp(voltage / V_t) - 1);
  current_mA = current * 1000; // Convert to mA
  if (current_mA > iMax) {
    current_mA = iMax; // Limit current for display
  }

  // Map voltage and current to pixel coordinates
  let x = map(voltage, vMin, vMax, plotX0, plotX1);
  let y = map(current_mA, iMin, iMax, plotY0, plotY1);

  // Draw red circle at the operating point
  fill('red');
  noStroke();
  circle(x, y, 10);
}

function drawControlArea() {
  // Control area background
  fill(255); // White
  noStroke();
  rect(0, 500, width, 100);

  // Display voltage and current values
  fill(0); // Black text
  textSize(14);
  textAlign(LEFT, TOP);
  text("Input Voltage (V): " + voltage.toFixed(2), 50, plotHeight + 10);
  text("Output Current (mA): " + current_mA.toFixed(2), 50, plotHeight + 30);
}

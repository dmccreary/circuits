let canvasWidth = 600;
let canvasHeight = 600;
let plotWidth = canvasWidth;
let plotHeight = 500;
let controlWidth = canvasWidth;
let controlHeight = 100;
let margin = 50;
let plotMargin = margin;

let voltageSlider;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  
  // Connect to the main in the HTML DOM
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  
  // larger text so you can read it from the back of the classroom
  textSize(16);

  // Create the voltage slider
  voltageSlider = createSlider(0, 5, 2.5, 0.01); // min, max, default, step
  voltageSlider.position(margin, plotHeight + 70); // Place in the control area
  voltageSlider.size(canvasWidth - margin*2);
}

function draw() {
  
  background(245);

  // Draw plot region background
  stroke(1);
  rect(0, 0, canvasWidth, canvasHeight);
  noStroke();
  fill('aliceblue');
  rect(0, 0, width, plotHeight);
  
  
  // Draw grid lines
  drawGrid();
  
  // Draw axes
  drawAxes();
  
  // Plot the I-V curve
  plotIVCurve();
  
  // Draw the operating point
  drawOperatingPoint();
  
  // Draw controls area
  drawControls();
}

function drawGrid() {
  stroke('lightgray');
  strokeWeight(1);
  
  // Vertical grid lines every 0.1V
  for (let v = 0; v <= 5; v += .5) {
    let x = map(v, 0, 5, plotMargin, plotHeight + plotMargin);
    line(x, plotMargin, x, plotHeight - plotMargin);
  }
  
  // Horizontal grid lines every .5 mA
  for (let i = 0; i <= 5; i += .5) {
    let y = map(i, 0, 5, plotHeight - plotMargin, plotMargin);
    line(plotMargin, y, plotHeight + plotMargin, y);
  }
}

function drawAxes() {
  stroke(0);
  strokeWeight(2);
  
  // X-axis
  line(plotMargin, plotHeight - plotMargin, plotHeight + plotMargin, plotHeight - plotMargin);
  
  // Y-axis
  line(plotMargin, plotMargin, plotMargin, plotHeight - plotMargin);
  
  // Axis labels and tick marks
  fill(0);
  noStroke();
  textSize(12);
  textAlign(CENTER, CENTER);
  
  // X-axis ticks and labels
  for (let v = 0; v <= 5; v += .5) {
    let x = map(v, 0, 5, plotMargin, plotHeight + plotMargin);
    stroke(0);
    // tick line - too much chart ink
    // line(x, 445, x, 455); // Tick mark
    noStroke();
    text(v.toFixed(1), x, 465); // Label
  }
  
  // Y-axis ticks and labels
  for (let i = 0; i <= 5; i += 0.5) {
    let y = map(i, 0, 5, plotHeight - plotMargin, plotMargin);
    // stroke(0);
    // tick line
    // line(45, y, 55, y); // Tick mark
    noStroke();
    text(i.toFixed(1), 35, y); // Label
  }
  
  // Axis labels
  // Horizontal X Axix
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Voltage (V)', canvasWidth/2, 485);
  
  // Vertical Y Axis
  push();
  translate(15, 250);
  rotate(-PI/2);
  text('Current (mA)', 0, 0);
  pop();
  
  // Title
  textSize(24);
  text('Current vs. Voltage for 1K Resistor', canvasWidth/2, 25);
}

function plotIVCurve() {
  stroke('green');
  strokeWeight(3);
  noFill();
  beginShape();
  // draw with 1/100 volt vertex points
  for (let v = 0; v <= 5; v += 0.01) {
    let i = (v / 1000) * 1000; // Convert A to mA
    let x = map(v, 0, 5, plotMargin, plotWidth - plotMargin);
    let y = map(i, 0, 5, plotHeight - plotMargin, plotMargin);
    vertex(x, y);
  }
  endShape();
}

function drawOperatingPoint() {
  let v = voltageSlider.value();
  let i = (v / 1000) * 1000; // in mA
  let x = map(v, 0, 5, plotMargin, plotHeight + plotMargin);
  let y = map(i, 0, 5, plotHeight - plotMargin, plotMargin);
  
  fill('red');
  noStroke();
  circle(x, y, 10);
}

function drawControls() {
  fill(255);
  noStroke();
  rect(0, plotHeight, canvasWidth, controlHeight);
  
  fill(0);
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Input Voltage: ' + voltageSlider.value().toFixed(2) + ' V', margin, 525);
  let current = (voltageSlider.value() / 1000) * 1000; // in mA
  text('Output Current: ' + current.toFixed(2) + ' mA', margin, 550);
}

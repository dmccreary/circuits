// MicroSim of a Capacitor Being Charged

let canvasWidth = 600;
let canvasHeight = 600;

let plotWidth = canvasWidth;
let plotHeight = 500;
let plotMargin = 60;

let controlWidth = canvasWidth;
let controlHeight = 100;

let R = 5000; // Default resistance in ohms
let C = 0.0005; // Capacitance in farads
let V0 = 5; // Initial voltage in volts
let time = 0;
let charging = true;
let voltage = 0;
let voltageData = [];
let simulationRunning = false;


let rSlider, cSlider;
let rLabel, cLabel;
let chargeButton, dischargeButton, startButton, stopButton;

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
    
  // Connect to the main in the HTML DOM
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  // larger text so you can read it from the back of the classroom
  textSize(16);

  // Create sliders for R and C
  rSlider = createSlider(100, 10000, R, 100);
  rSlider.position(140, 520);
  
  cSlider = createSlider(0.00001, 0.001, C, 0.00001);
  cSlider.position(140, 560);

  // Create labels for sliders
  rLabel = createDiv(`Resistance (R): ${R} Ω`);
  rLabel.position(20, 505);
  cLabel = createDiv(`Capacitance (C): ${(C * 1e6).toFixed(2)} μF`);
  cLabel.position(20, 545);

  // Create buttons for charging and discharging
  chargeButton = createButton('Charge');
  chargeButton.position(400, 520);
  chargeButton.mousePressed(() => {
    charging = true;
    resetSimulation();
  });

  dischargeButton = createButton('Discharge');
  dischargeButton.position(470, 520);
  dischargeButton.mousePressed(() => {
    charging = false;
    resetSimulation();
  });

  // Create Start and Stop buttons
  startButton = createButton('Start');
  startButton.position(400, 560);
  startButton.mousePressed(() => {
    simulationRunning = true;
  });

  stopButton = createButton('Stop');
  stopButton.position(450, 560);
  stopButton.mousePressed(() => {
    simulationRunning = false;
  });
  
  resetButton = createButton('Reset');
  resetButton.position(500, 560);
  resetButton.mousePressed(() => {
    resetSimulation();
  });
  
  resetSimulation();
}

function draw() {
  // make the background drawing region light gray
  fill('aliceblue');
  rect(0, 0, canvasWidth, canvasWidth);
  // make the background of the controls white
  fill('white')
  rect(0, plotHeight, canvasWidth, canvasHeight-controlHeight);
  
  drawGrid();
  drawAxes();

  // Update R and C from sliders and update labels
  R = rSlider.value();
  C = cSlider.value();
  rLabel.html(`Resistance (R): ${R} Ω`);
  cLabel.html(`Capacitance (C): ${(C * 1e6).toFixed(2)} μF`);

  // Calculate time constant
  let tau = R * C;

  // Update voltage based on charging or discharging if simulation is running
  if (simulationRunning) {
    if (charging) {
      voltage = V0 * (1 - exp(-time / tau));
    } else {
      voltage = V0 * exp(-time / tau);
    }

    // Update time and store voltage data
    time += deltaTime / 1000;
    voltageData.push(voltage);
  }

  // Draw axes
  drawAxes();

  // Plot voltage over time
  drawVoltageGraph();

  // Display current voltage
  fill(0);
  noStroke();
  textSize(16);
  text(`Voltage: ${voltage.toFixed(2)} V`, plotMargin, plotHeight-20);
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
    // text(v.toFixed(1), x, plotHeight - plotMargin + 10); // Label
  }
  
  // Y-axis ticks and labels
  for (let i = 0; i <= 5; i += 0.5) {
    let y = map(i, 0, 5, plotHeight - plotMargin, plotMargin);
    // stroke(0);
    // tick line
    // line(45, y, 55, y); // Tick mark
    noStroke();
    text(i.toFixed(1), plotMargin - 15, y); // Label
  }
  
  // Axis labels
  // Horizontal X Axix
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Time (s)', canvasWidth/2, plotHeight - plotMargin/2);
  
  // Vertical Y Axis
  push();
  translate(15, plotHeight/2);
  rotate(-PI/2);
  text('Voltage (volts)', 0, 5);
  pop();
  
  // Title
  textSize(24);
  text('Voltage Across Capacitor vs Time', canvasWidth/2, plotMargin/2);
}

function resetSimulation() {
  time = 0;
  voltageData = [];
  if (charging) {
    voltage = 0;
  } else {
    voltage = V0;
  }
}


function drawVoltageGraph() {
  noFill();
  stroke(0, 0, 255);
  beginShape();
  for (let i = 0; i < voltageData.length; i++) {
    // there are bugs in this area
    let x = map(i, 0, voltageData.length, plotMargin, plotWidth - plotMargin+20);
    let y = map(voltageData[i], 0, V0, plotWidth - plotMargin*2 - 40, plotMargin);
    vertex(x, y);
  }
  endShape();
}

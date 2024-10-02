let R = 1000; // Resistance in ohms
let C = 0.0001; // Capacitance in farads
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
  createCanvas(600, 600);

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

  resetSimulation();
}

function draw() {
  background(255);

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
  textSize(16);
  text(`Voltage: ${voltage.toFixed(2)} V`, 20, 480);
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

function drawAxes() {
  stroke(0);
  line(50, 450, 550, 450); // X-axis
  line(50, 450, 50, 50);   // Y-axis

  // Labels
  textSize(12);
  fill(0);
  text('Time (s)', 275, 470);
  text('Voltage (V)', 10, 50);
}

function drawVoltageGraph() {
  noFill();
  stroke(0, 0, 255);
  beginShape();
  for (let i = 0; i < voltageData.length; i++) {
    let x = map(i, 0, voltageData.length, 50, 550);
    let y = map(voltageData[i], 0, V0, 450, 50);
    vertex(x, y);
  }
  endShape();
}

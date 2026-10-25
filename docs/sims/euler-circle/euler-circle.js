// Euler's Formula on the Unit Circle MicroSim
// CANVAS_HEIGHT: 530
// A unit phasor e^(j*theta) on the complex plane. Its projection on the real
// axis is cos(theta) and its projection on the imaginary axis is sin(theta):
//     e^(j*theta) = cos(theta) + j sin(theta)
// Default is a step-through of key angles; continuous rotation is optional.
// Bloom Level: Understand (L2) - explain
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let drawHeight = 440;
// control region: one button row and one slider row
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// colors (text uses the darker shade of each for contrast)
const REAL_COLOR = 'royalblue';
const IMAG_COLOR = 'forestgreen';
const IMAG_TEXT = 'darkgreen';
const PHASOR_COLOR = 'crimson';
const ANGLE_COLOR = 'darkviolet';

// step-through angles from the chapter specification, with exact values
const KEY_ANGLES = [0, 30, 45, 60, 90, 180, 270, 360];
const KEY_INFO = {
  0:   { rad: '0',    note: 'e^(j0) = 1: the phasor starts on the positive real axis' },
  30:  { rad: 'π/6',  note: 'cos 30° = √3/2 ≈ 0.866     sin 30° = 1/2' },
  45:  { rad: 'π/4',  note: 'cos 45° = sin 45° = √2/2 ≈ 0.707' },
  60:  { rad: 'π/3',  note: 'cos 60° = 1/2     sin 60° = √3/2 ≈ 0.866' },
  90:  { rad: 'π/2',  note: 'e^(jπ/2) = j: purely imaginary' },
  180: { rad: 'π',    note: "e^(jπ) = −1, so e^(jπ) + 1 = 0  (Euler's identity)" },
  270: { rad: '3π/2', note: 'e^(j3π/2) = −j: purely imaginary' },
  360: { rad: '2π',   note: 'e^(j2π) = 1: one full revolution, back to the start' }
};

// state
let thetaDeg = 0;          // current angle, 0 to 360 degrees
let isAnimating = false;   // repo standard: animations start stopped
let showWaves = true;
let speedSlider;           // rotation speed in degrees per second

// canvas-drawn buttons (repo standard: no DOM buttons)
let backButton = { x: 0, y: 0, w: 0, h: 28 };
let stepButton = { x: 0, y: 0, w: 0, h: 28 };
let startButton = { x: 0, y: 0, w: 0, h: 28 };
let resetButton = { x: 0, y: 0, w: 0, h: 28 };
let wavesButton = { x: 0, y: 0, w: 0, h: 28 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  speedSlider = createSlider(10, 120, 40, 5);
  speedSlider.position(sliderLeftMargin, drawHeight + 52);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe("A unit circle on the complex plane with a phasor at angle theta. The phasor's projection on the real axis is cosine theta and its projection on the imaginary axis is sine theta. Two side plots trace the cosine and sine waveforms as the angle advances. Buttons step through key angles or rotate the phasor continuously.", LABEL);
}

function draw() {
  updateCanvasSize();

  // drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  // control region (repo standard: light gray)
  fill(245);
  rect(0, drawHeight, canvasWidth, controlHeight);

  // continuous rotation only while running
  if (isAnimating) {
    thetaDeg += speedSlider.value() * (deltaTime / 1000);
    if (thetaDeg >= 360) thetaDeg -= 360;
  }

  let th = radians(thetaDeg);
  let c = Math.cos(th);
  let s = Math.sin(th);
  // exact values at the key angles (avoids 6.1e-17 instead of 0)
  if (isKeyAngle()) {
    c = Math.round(c * 1e9) / 1e9;
    s = Math.round(s * 1e9) / 1e9;
  }

  drawHeader(c, s);

  // layout: unit circle on the left, cos and sin plots stacked on the right
  let panelTop = 104;
  let panelH = drawHeight - panelTop - 10;
  if (showWaves) {
    let circleW = Math.min(panelH + 10, canvasWidth * 0.5);
    drawCirclePanel(10, panelTop, circleW, panelH, th, c, s);
    let plotLeft = 10 + circleW + 8;
    let plotW = canvasWidth - plotLeft - 10;
    let plotH = (panelH - 8) / 2;
    drawWavePlot(plotLeft, panelTop, plotW, plotH, 'Real part = cos θ', REAL_COLOR, REAL_COLOR, Math.cos, c, false);
    drawWavePlot(plotLeft, panelTop + plotH + 8, plotW, plotH, 'Imaginary part = sin θ', IMAG_COLOR, IMAG_TEXT, Math.sin, s, true);
  } else {
    let circleW = Math.min(canvasWidth - 20, panelH * 1.6);
    drawCirclePanel((canvasWidth - circleW) / 2, panelTop, circleW, panelH, th, c, s);
  }
  drawControls();
}

function isKeyAngle() {
  return KEY_INFO.hasOwnProperty(thetaDeg);
}

// number with three decimals, a true minus sign and no "-0.000"
function fmt3(v) {
  let t = Math.abs(v).toFixed(3);
  if (parseFloat(t) === 0) return t;
  return (v < 0 ? '−' : '') + t;
}

function angleText() {
  return (isKeyAngle() ? thetaDeg : thetaDeg.toFixed(1)) + '°';
}

// ---------- title, formula with live values, key-angle note ----------
function drawHeader(c, s) {
  let small = canvasWidth < 600;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(small ? 19 : 22);
  text("Euler's Formula on the Unit Circle", canvasWidth / 2, 8);

  // the formula
  drawRichLine([
    { t: 'e', c: 'black' }, { t: 'jθ', c: ANGLE_COLOR, sup: true },
    { t: ' = ', c: 'black' }, { t: 'cos θ', c: REAL_COLOR },
    { t: ' + j ', c: 'black' }, { t: 'sin θ', c: IMAG_TEXT }
  ], canvasWidth / 2, 38, small ? 17 : 20, true);

  // the formula with the current angle and values
  let a = angleText();
  drawRichLine([
    { t: 'e', c: 'black' }, { t: 'j' + a, c: ANGLE_COLOR, sup: true },
    { t: ' = cos ' + a + ' + j sin ' + a + ' = ', c: 'black' },
    { t: fmt3(c), c: REAL_COLOR },
    { t: s < 0 && parseFloat(Math.abs(s).toFixed(3)) !== 0 ? ' − j' : ' + j', c: 'black' },
    { t: Math.abs(s).toFixed(3), c: IMAG_TEXT }
  ], canvasWidth / 2, 64, small ? 13 : 16, false);

  // angle in radians and the exact values at key angles
  noStroke();
  textAlign(CENTER, TOP);
  textSize(small ? 11.5 : 13.5);
  fill('dimgray');
  let rad = isKeyAngle() ? KEY_INFO[thetaDeg].rad : radians(thetaDeg).toFixed(3);
  let line = 'θ = ' + a + ' = ' + rad + ' rad';
  if (isKeyAngle()) line += '      ' + KEY_INFO[thetaDeg].note;
  text(line, canvasWidth / 2, 86);
}

// one centered line of text made of colored pieces; pieces marked sup are raised
function drawRichLine(parts, cx, y, size, bold) {
  textStyle(bold ? BOLD : NORMAL);
  let total = 0;
  for (let p of parts) {
    textSize(p.sup ? size * 0.72 : size);
    p.w = textWidth(p.t);
    total += p.w;
  }
  let x = cx - total / 2;
  noStroke();
  textAlign(LEFT, TOP);
  for (let p of parts) {
    textSize(p.sup ? size * 0.72 : size);
    fill(p.c);
    text(p.t, x, p.sup ? y - size * 0.22 : y);
    x += p.w;
  }
  textStyle(NORMAL);
}

// ---------- unit circle on the complex plane ----------
function drawCirclePanel(px, py, pw, ph, th, c, s) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);

  // the circle uses the panel above the two caption lines at the bottom
  let bandH = ph - 44;
  let cx = px + pw / 2;
  let cy = py + 6 + bandH / 2;
  let R = Math.min(pw, bandH) / 2 - 30;
  let small = R < 95;

  // axes
  stroke('gray');
  strokeWeight(1);
  line(cx - R - 20, cy, cx + R + 20, cy);
  line(cx, cy - R - 20, cx, cy + R + 20);
  noStroke();
  fill('dimgray');
  textSize(small ? 10.5 : 12);
  // axis names sit inside the circle so the phasor label outside never covers them
  textAlign(CENTER, TOP);
  text('Real axis', cx + R * 0.5, cy + 20);
  textAlign(RIGHT, CENTER);
  text(small ? 'Imag. axis' : 'Imaginary axis', cx - 7, cy - R * 0.62);

  // unit circle and the axis values where it crosses
  noFill();
  stroke('darkgray');
  strokeWeight(1.5);
  circle(cx, cy, 2 * R);
  noStroke();
  fill('dimgray');
  // axis values just inside the circle, leaving the outside free for the phasor label
  textAlign(RIGHT, TOP);
  text('1', cx + R - 5, cy + 5);
  textAlign(LEFT, TOP);
  text('−1', cx - R + 5, cy + 5);
  textAlign(LEFT, TOP);
  text('j', cx + 6, cy - R + 5);
  textAlign(LEFT, BOTTOM);
  text('−j', cx + 6, cy + R - 5);

  // small marks at the step-through angles
  for (let k of KEY_ANGLES) {
    let kr = radians(k);
    fill(k === thetaDeg ? PHASOR_COLOR : 'darkgray');
    noStroke();
    circle(cx + R * Math.cos(kr), cy - R * Math.sin(kr), 6);
  }

  let tipX = cx + R * c;
  let tipY = cy - R * s;

  // dotted projection lines from the tip to each axis
  drawingContext.setLineDash([3, 4]);
  strokeWeight(1.5);
  stroke(REAL_COLOR);
  line(tipX, tipY, tipX, cy);
  stroke(IMAG_COLOR);
  line(tipX, tipY, cx, tipY);
  drawingContext.setLineDash([]);

  // projections: cos on the real axis (blue), sin on the imaginary axis (green)
  strokeWeight(5);
  stroke(REAL_COLOR);
  line(cx, cy, tipX, cy);
  stroke(IMAG_COLOR);
  line(cx, cy, cx, tipY);

  // angle arc, counterclockwise from the positive real axis
  if (thetaDeg > 0.01) {
    noFill();
    stroke(ANGLE_COLOR);
    strokeWeight(2);
    let arcR = R * 0.28;
    arc(cx, cy, 2 * arcR, 2 * arcR, -th, 0);
    noStroke();
    fill(ANGLE_COLOR);
    textStyle(BOLD);
    textSize(small ? 12 : 14);
    textAlign(CENTER, CENTER);
    let dir = Math.min(th / 2, radians(150));
    text('θ', cx + (arcR + 11) * Math.cos(dir), cy - (arcR + 11) * Math.sin(dir));
    textStyle(NORMAL);
  }

  // the phasor
  stroke(PHASOR_COLOR);
  strokeWeight(3);
  line(cx, cy, tipX, tipY);
  fill(PHASOR_COLOR);
  noStroke();
  push();
  translate(tipX, tipY);
  rotate(-th);
  triangle(2, 0, -11, -5, -11, 5);
  pop();
  // phasor label just outside the circle
  textStyle(BOLD);
  textSize(small ? 12 : 14);
  textAlign(CENTER, CENTER);
  let lx = cx + (R + 20) * Math.cos(th);
  let ly = cy - (R + 16) * Math.sin(th);
  fill(255, 255, 255, 215);
  rect(lx - 13, ly - 11, 26, 20, 4);
  drawRichLine([{ t: 'e', c: PHASOR_COLOR }, { t: 'jθ', c: PHASOR_COLOR, sup: true }], lx, ly - 7, small ? 12 : 14, true);

  // projection values under the circle
  noStroke();
  textSize(small ? 11 : 13);
  textAlign(LEFT, BOTTOM);
  fill(REAL_COLOR);
  text('Real part = cos θ = ' + fmt3(c), px + 8, py + ph - 20);
  fill(IMAG_TEXT);
  text('Imaginary part = sin θ = ' + fmt3(s), px + 8, py + ph - 5);
}

// ---------- cos or sin waveform being traced ----------
function drawWavePlot(px, py, pw, ph, title, lineColor, textColor, fn, value, showAngleLabels) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);

  let left = px + 34;
  let right = px + pw - 12;
  let top = py + 26;
  let bottom = py + ph - (showAngleLabels ? 22 : 10);
  let xOf = (deg) => map(deg, 0, 360, left, right);
  let yOf = (v) => map(v, -1.15, 1.15, bottom, top);

  // heading with the current value
  noStroke();
  fill(textColor);
  textStyle(BOLD);
  textSize(pw < 230 ? 12 : 14);
  textAlign(LEFT, TOP);
  text(title + ' = ' + fmt3(value), px + 8, py + 6);
  textStyle(NORMAL);

  // grid
  textSize(11.5);
  for (let v of [-1, 0, 1]) {
    stroke(v === 0 ? 'gray' : 'gainsboro');
    strokeWeight(1);
    line(left, yOf(v), right, yOf(v));
    noStroke();
    fill('dimgray');
    textAlign(RIGHT, CENTER);
    text((v < 0 ? '−' : '') + Math.abs(v), left - 4, yOf(v));
  }
  for (let d = 0; d <= 360; d += 90) {
    stroke('gainsboro');
    strokeWeight(1);
    line(xOf(d), top, xOf(d), bottom);
    if (showAngleLabels) {
      noStroke();
      fill('dimgray');
      textAlign(CENTER, TOP);
      text(d + '°', xOf(d), bottom + 5);
    }
  }

  // the whole curve, faint and dashed: where the trace is going
  noFill();
  stroke('silver');
  strokeWeight(1.5);
  drawingContext.setLineDash([4, 4]);
  beginShape();
  for (let d = 0; d <= 360; d += 2) vertex(xOf(d), yOf(fn(radians(d))));
  endShape();
  drawingContext.setLineDash([]);

  // the part traced so far, from 0 to the current angle
  stroke(lineColor);
  strokeWeight(3);
  beginShape();
  for (let d = 0; d < thetaDeg; d += 1) vertex(xOf(d), yOf(fn(radians(d))));
  vertex(xOf(thetaDeg), yOf(value));
  endShape();

  // current point
  stroke(lineColor);
  strokeWeight(1);
  drawingContext.setLineDash([2, 3]);
  line(xOf(thetaDeg), top, xOf(thetaDeg), bottom);
  drawingContext.setLineDash([]);
  stroke('white');
  strokeWeight(1.5);
  fill(lineColor);
  circle(xOf(thetaDeg), yOf(value), 11);
}

// ---------- control region ----------
function drawControls() {
  let small = canvasWidth < 520;
  let by = drawHeight + 10;
  textSize(small ? 13 : 15);
  let gap = small ? 5 : 8;
  let pad = small ? 16 : 22;
  backButton.x = 10;
  backButton.w = textWidth('Back') + pad;
  stepButton.x = backButton.x + backButton.w + gap;
  stepButton.w = textWidth('Step') + pad;
  startButton.x = stepButton.x + stepButton.w + gap;
  startButton.w = textWidth('Start') + pad;
  resetButton.x = startButton.x + startButton.w + gap;
  resetButton.w = textWidth('Reset') + pad;
  wavesButton.x = resetButton.x + resetButton.w + gap;
  wavesButton.w = textWidth('Waveforms: Off') + pad;
  for (let b of [backButton, stepButton, startButton, resetButton, wavesButton]) b.y = by;
  drawButton(backButton, 'Back', false);
  drawButton(stepButton, 'Step', false);
  drawButton(startButton, isAnimating ? 'Stop' : 'Start', isAnimating);
  drawButton(resetButton, 'Reset', false);
  drawButton(wavesButton, showWaves ? 'Waveforms: On' : 'Waveforms: Off', showWaves);

  if (canvasWidth >= 660) {
    noStroke();
    fill('dimgray');
    textSize(13);
    textAlign(LEFT, CENTER);
    text('Step: 0°, 30°, 45°, 60°, 90°, 180°, 270°, 360°', wavesButton.x + wavesButton.w + 12, by + 15);
  }

  // speed slider label and value
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(RIGHT, CENTER);
  text('Rotation speed: ' + speedSlider.value() + '°/s', sliderLeftMargin - 10, drawHeight + 63);
}

function drawButton(btn, label, active) {
  let hover = isOver(btn);
  stroke(active ? 'steelblue' : 'gray');
  strokeWeight(1);
  if (active) fill(hover ? 'royalblue' : 'steelblue');
  else fill(hover ? 'gainsboro' : 'white');
  rect(btn.x, btn.y, btn.w, btn.h, 6);
  noStroke();
  fill(active ? 'white' : 'black');
  textAlign(CENTER, CENTER);
  text(label, btn.x + btn.w / 2, btn.y + btn.h / 2 + 1);
}

function isOver(btn) {
  return mouseX >= btn.x && mouseX <= btn.x + btn.w &&
         mouseY >= btn.y && mouseY <= btn.y + btn.h;
}

function mousePressed() {
  if (isOver(stepButton)) {
    // stop and move to the next key angle; after 360 degrees start over at 0
    isAnimating = false;
    let next = KEY_ANGLES.find((k) => k > thetaDeg + 1e-6);
    thetaDeg = next === undefined ? 0 : next;
  } else if (isOver(backButton)) {
    // stop and move to the previous key angle
    isAnimating = false;
    let prev = KEY_ANGLES.filter((k) => k < thetaDeg - 1e-6).pop();
    thetaDeg = prev === undefined ? 0 : prev;
  } else if (isOver(startButton)) {
    isAnimating = !isAnimating;
    if (isAnimating && thetaDeg >= 360) thetaDeg = 0;
  } else if (isOver(resetButton)) {
    // reset returns to the stopped state at 0 degrees
    isAnimating = false;
    thetaDeg = 0;
  } else if (isOver(wavesButton)) {
    showWaves = !showWaves;
  }
}

// ---------- responsive sizing ----------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  speedSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

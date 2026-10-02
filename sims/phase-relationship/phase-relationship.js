// Phase Relationship Visualizer MicroSim
// CANVAS_HEIGHT: 515
// Students compare two sinusoids of the same amplitude and frequency
//   v1(t) = Vm sin(wt)          (reference, blue)
//   v2(t) = Vm sin(wt + phi)    (phase-shifted, red)
// and interpret "leads" and "lags" on both a waveform plot and a phasor diagram.
// Bloom Level: Understand (L2) - compare
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let drawHeight = 400;
// control region: one slider row and two button rows
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// signal parameters (frequency and amplitude are fixed by the specification)
const FREQ = 5;                 // Hz
const PERIOD = 1 / FREQ;        // 0.2 s
const T_WINDOW = 2 * PERIOD;    // plot shows two cycles (400 ms)
const DEFAULT_PHI = 45;         // degrees: v2 leads v1
// slow motion: one 200 ms cycle is stretched over 6 seconds of viewing time
const SLOW_MOTION = PERIOD / 6;

// state
let phaseSlider;
let isAnimating = false;   // repo standard: animations start stopped
let simTime = 0;           // signal time in seconds
let showPhasors = true;

// canvas-drawn buttons (repo standard: no DOM buttons)
let startButton = { x: 0, y: 0, w: 0, h: 28 };
let resetButton = { x: 0, y: 0, w: 0, h: 28 };
let phasorButton = { x: 0, y: 0, w: 0, h: 28 };
let quickValues = [0, 90, 180, -90];
let quickButtons = quickValues.map(() => ({ x: 0, y: 0, w: 0, h: 28 }));

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  phaseSlider = createSlider(-180, 180, DEFAULT_PHI, 1);
  phaseSlider.position(sliderLeftMargin, drawHeight + 8);
  phaseSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Two sinusoidal waveforms of equal amplitude and frequency, one blue reference and one red phase-shifted signal, shown beside a phasor diagram. A slider sets the phase difference and a label states whether signal 2 leads or lags signal 1.', LABEL);
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

  // advance the slow-motion clock only while running
  if (isAnimating) {
    simTime += (deltaTime / 1000) * SLOW_MOTION;
    if (simTime >= T_WINDOW) simTime -= T_WINDOW;
  }

  let phiDeg = phaseSlider.value();
  let phi = radians(phiDeg);

  drawHeader(phiDeg);

  // panel layout: waveform plot on the left, phasor diagram on the right
  let panelTop = 96;
  let panelBottom = drawHeight - 10;
  let phasorW = showPhasors ? constrain(canvasWidth * 0.34, 165, 270) : 0;
  let waveLeft = 10;
  let waveRight = showPhasors ? canvasWidth - phasorW - 18 : canvasWidth - 10;

  drawWaveformPanel(waveLeft, panelTop, waveRight - waveLeft, panelBottom - panelTop, phi, phiDeg);
  if (showPhasors) {
    drawPhasorPanel(canvasWidth - phasorW - 10, panelTop, phasorW, panelBottom - panelTop, phi, phiDeg);
  }
  drawControls(phiDeg);
}

// ---------- title, relationship statement and formulas ----------
function drawHeader(phiDeg) {
  let small = canvasWidth < 600;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(small ? 19 : 22);
  text('Phase Relationship Visualizer', canvasWidth / 2, 8);

  // the relationship in words
  let a = Math.abs(phiDeg);
  let statement, detail;
  let dtMs = a / 360 * PERIOD * 1000;
  if (phiDeg === 0) {
    statement = 'Signals are IN PHASE';
    detail = 'φ = 0°: the peaks of v₁ and v₂ line up';
  } else if (a === 180) {
    statement = 'Signals are in ANTIPHASE';
    detail = 'φ = ±180°: each peak of v₂ lines up with a trough of v₁';
  } else if (phiDeg > 0) {
    statement = 'v₂ LEADS v₁ by ' + a + '°' + (a === 90 ? ' (quadrature)' : '');
    detail = 'v₂ peaks ' + dtMs.toFixed(1) + ' ms BEFORE v₁   (Δt = φ/360° × T,  T = 200 ms)';
  } else {
    statement = 'v₂ LAGS v₁ by ' + a + '°' + (a === 90 ? ' (quadrature)' : '');
    detail = 'v₂ peaks ' + dtMs.toFixed(1) + ' ms AFTER v₁   (Δt = |φ|/360° × T,  T = 200 ms)';
  }
  textStyle(BOLD);
  textSize(small ? 17 : 20);
  fill('darkviolet');
  text(statement, canvasWidth / 2, 36);
  textStyle(NORMAL);
  textSize(small ? 12 : 14);
  fill('black');
  text(detail, canvasWidth / 2, 62);

  // formulas, color matched to the curves
  let sign = phiDeg < 0 ? '−' : '+';
  let f1 = 'v₁(t) = Vm sin(ωt)';
  let f2 = 'v₂(t) = Vm sin(ωt ' + sign + ' ' + a + '°)';
  textSize(small ? 12 : 14);
  let gap = 24;
  let total = textWidth(f1) + gap + textWidth(f2);
  let x = canvasWidth / 2 - total / 2;
  textAlign(LEFT, TOP);
  fill('royalblue');
  text(f1, x, 80);
  fill('crimson');
  text(f2, x + textWidth(f1) + gap, 80);
}

// ---------- waveform plot ----------
function drawWaveformPanel(px, py, pw, ph, phi, phiDeg) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);

  // plot area inside the panel
  let left = px + 44;
  let right = px + pw - 12;
  let top = py + 58;         // room above the curves for the legend and phase marker
  let bottom = py + ph - 26; // room below for the time labels
  let midY = (top + bottom) / 2;
  let amp = (bottom - top) / 2 - 4;
  let narrow = (right - left) < 260;

  let xOf = (t) => map(t, 0, T_WINDOW, left, right);
  let yOf = (v) => midY - v * amp;   // v in units of Vm

  // grid: vertical lines every 50 ms (a quarter period)
  textSize(12);
  for (let ms = 0; ms <= 400; ms += 50) {
    let x = xOf(ms / 1000);
    stroke(ms % 100 === 0 ? 'lightgray' : 'whitesmoke');
    strokeWeight(1);
    line(x, top - 4, x, bottom + 4);
    if (ms % (narrow ? 200 : 100) === 0) {
      noStroke();
      fill('dimgray');
      textAlign(CENTER, TOP);
      text(ms + (ms === 400 ? ' ms' : ''), x - (ms === 400 ? 10 : 0), bottom + 8);
    }
  }
  // horizontal lines at +Vm, 0, -Vm
  let levels = [[1, '+Vm'], [0, '0'], [-1, '−Vm']];
  for (let [v, label] of levels) {
    stroke(v === 0 ? 'gray' : 'lightgray');
    strokeWeight(1);
    line(left, yOf(v), right, yOf(v));
    noStroke();
    fill('dimgray');
    textAlign(RIGHT, CENTER);
    text(label, left - 5, yOf(v));
  }

  // v1 reference (blue, drawn wide so it stays visible under v2 when in phase)
  noFill();
  stroke('royalblue');
  strokeWeight(5);
  beginShape();
  for (let x = left; x <= right; x += 1) {
    let t = map(x, left, right, 0, T_WINDOW);
    vertex(x, yOf(sin(TWO_PI * FREQ * t)));
  }
  endShape();
  // v2 phase-shifted (red, narrower, on top)
  stroke('crimson');
  strokeWeight(2.5);
  beginShape();
  for (let x = left; x <= right; x += 1) {
    let t = map(x, left, right, 0, T_WINDOW);
    vertex(x, yOf(sin(TWO_PI * FREQ * t + phi)));
  }
  endShape();

  // curve name tags at the left edge of the legend row
  noStroke();
  textSize(13);
  textAlign(LEFT, CENTER);
  let tag1 = narrow ? '━ v₁' : '━ v₁ reference';
  let tag2 = narrow ? '━ v₂' : '━ v₂ shifted';
  fill('royalblue');
  text(tag1, px + 10, py + 13);
  fill('crimson');
  text(tag2, px + 10 + textWidth(tag1) + 14, py + 13);
  // time of the dotted cursor (the instant shown in the phasor diagram)
  fill('dimgray');
  textAlign(RIGHT, CENTER);
  text((narrow ? 't = ' : 'cursor: t = ') + (simTime * 1000).toFixed(0) + ' ms', px + pw - 10, py + 13);

  // phase marker between corresponding peaks in the second cycle
  // v1 peaks at wt = 450 degrees (t = 250 ms); v2 peaks at wt = 450 - phi degrees
  let t1 = (450 / 360) * PERIOD;
  let t2 = ((450 - phiDeg) / 360) * PERIOD;
  let x1 = xOf(t1);
  let x2 = xOf(t2);
  let yPeak = yOf(1);
  let yMark = top - 12;
  // dashed guides up from each peak
  drawingContext.setLineDash([4, 3]);
  strokeWeight(1.5);
  stroke('royalblue');
  line(x1, yPeak, x1, yMark - 6);
  stroke('crimson');
  line(x2, yPeak, x2, yMark - 6);
  drawingContext.setLineDash([]);
  // peak dots
  noStroke();
  fill('royalblue');
  circle(x1, yPeak, 10);
  fill('crimson');
  circle(x2, yPeak, 7);
  // the phase angle arrow
  let label = 'φ = ' + (phiDeg > 0 ? '+' : (phiDeg < 0 ? '−' : '')) + Math.abs(phiDeg) + '°';
  textSize(14);
  textStyle(BOLD);
  fill('darkviolet');
  if (phiDeg !== 0) {
    stroke('darkviolet');
    strokeWeight(2);
    line(x1, yMark, x2, yMark);
    noStroke();
    if (Math.abs(x2 - x1) > 18) {
      let d = x2 > x1 ? 1 : -1;
      triangle(x1, yMark, x1 + d * 8, yMark - 4, x1 + d * 8, yMark + 4);
      triangle(x2, yMark, x2 - d * 8, yMark - 4, x2 - d * 8, yMark + 4);
    }
  }
  textAlign(CENTER, BOTTOM);
  let lx = constrain((x1 + x2) / 2, left + 30, right - 30);
  text(label, lx, yMark - 5);
  textStyle(NORMAL);

  // moving time cursor with the instantaneous values
  let xc = xOf(simTime);
  stroke('dimgray');
  strokeWeight(1);
  drawingContext.setLineDash([2, 3]);
  line(xc, top - 4, xc, bottom + 4);
  drawingContext.setLineDash([]);
  let wt = TWO_PI * FREQ * simTime;
  stroke('white');
  strokeWeight(1.5);
  fill('royalblue');
  circle(xc, yOf(sin(wt)), 11);
  fill('crimson');
  circle(xc, yOf(sin(wt + phi)), 11);
}

// ---------- phasor diagram ----------
function drawPhasorPanel(px, py, pw, ph, phi, phiDeg) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);

  noStroke();
  fill('black');
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, TOP);
  text('Phasor Diagram', px + pw / 2, py + 6);
  textStyle(NORMAL);

  let cx = px + pw / 2;
  let cy = py + ph / 2 + 4;
  let R = Math.min(pw, ph - 60) / 2 - 22;

  // circle of radius Vm and axes
  noFill();
  stroke('lightgray');
  strokeWeight(1);
  circle(cx, cy, 2 * R);
  stroke('gray');
  line(cx - R - 14, cy, cx + R + 14, cy);
  line(cx, cy - R - 14, cx, cy + R + 14);

  // both phasors rotate counterclockwise at w; v2 is ahead of v1 by phi
  let wt = TWO_PI * FREQ * simTime;
  let a1 = wt;
  let a2 = wt + phi;
  let tip1 = { x: cx + R * cos(a1), y: cy - R * sin(a1) };
  let tip2 = { x: cx + R * cos(a2), y: cy - R * sin(a2) };

  // projections onto the vertical axis give the instantaneous values Vm sin(angle)
  drawingContext.setLineDash([3, 3]);
  strokeWeight(1);
  stroke('royalblue');
  line(tip1.x, tip1.y, cx, tip1.y);
  stroke('crimson');
  line(tip2.x, tip2.y, cx, tip2.y);
  drawingContext.setLineDash([]);
  noStroke();
  fill('royalblue');
  circle(cx, tip1.y, 8);
  fill('crimson');
  circle(cx, tip2.y, 8);

  // angle arc from V1 to V2
  if (phiDeg !== 0) {
    noFill();
    stroke('darkviolet');
    strokeWeight(2);
    let arcR = R * 0.42;
    // p5 angles are clockwise on screen, so negate the math angles
    if (phi > 0) arc(cx, cy, 2 * arcR, 2 * arcR, -a2, -a1);
    else arc(cx, cy, 2 * arcR, 2 * arcR, -a1, -a2);
    let am = (a1 + a2) / 2;
    noStroke();
    fill('darkviolet');
    textSize(13);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text('φ', cx + (arcR + 11) * cos(am), cy - (arcR + 11) * sin(am));
    textStyle(NORMAL);
  }

  // V1 wide, V2 narrower on top so both show when they coincide
  drawArrow(cx, cy, tip1.x, tip1.y, 'royalblue', 5);
  drawArrow(cx, cy, tip2.x, tip2.y, 'crimson', 2.5);

  // tip labels
  noStroke();
  textSize(14);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  // nudge each label to the side away from the other phasor
  let side = phi >= 0 ? 1 : -1;
  fill('royalblue');
  text('V₁', cx + (R + 13) * cos(a1 - side * 0.22), cy - (R + 13) * sin(a1 - side * 0.22));
  fill('crimson');
  text('V₂', cx + (R + 13) * cos(a2 + side * 0.22), cy - (R + 13) * sin(a2 + side * 0.22));
  textStyle(NORMAL);

  // caption
  fill('dimgray');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text(pw < 215 ? 'Rotation: counterclockwise' : 'Both rotate counterclockwise at ω', px + pw / 2, py + ph - 20);
  text('Dot height = v(t) at the cursor', px + pw / 2, py + ph - 5);
}

function drawArrow(x1, y1, x2, y2, col, weight) {
  stroke(col);
  strokeWeight(weight);
  line(x1, y1, x2, y2);
  let ang = atan2(y2 - y1, x2 - x1);
  let s = 6 + weight * 1.5;
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(ang);
  triangle(3, 0, -s, -s / 2, -s, s / 2);
  pop();
}

// ---------- control region ----------
function drawControls(phiDeg) {
  let small = canvasWidth < 520;
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(RIGHT, CENTER);
  let v = (phiDeg > 0 ? '+' : (phiDeg < 0 ? '−' : '')) + Math.abs(phiDeg) + '°';
  text('Phase difference φ: ' + v, sliderLeftMargin - 10, drawHeight + 19);

  // row 2: animation and phasor diagram buttons
  textSize(small ? 13 : 15);
  let y2 = drawHeight + 42;
  startButton.x = 10;
  startButton.y = y2;
  startButton.w = textWidth('Start') + 26;
  resetButton.x = startButton.x + startButton.w + 8;
  resetButton.y = y2;
  resetButton.w = textWidth('Reset') + 22;
  phasorButton.x = resetButton.x + resetButton.w + 8;
  phasorButton.y = y2;
  phasorButton.w = textWidth('Phasor Diagram: Off') + 22;
  drawButton(startButton, isAnimating ? 'Stop' : 'Start', isAnimating);
  drawButton(resetButton, 'Reset', false);
  drawButton(phasorButton, showPhasors ? 'Phasor Diagram: On' : 'Phasor Diagram: Off', showPhasors);
  if (!small) {
    noStroke();
    fill('dimgray');
    textSize(13);
    textAlign(LEFT, CENTER);
    text('Start rotates the phasors in slow motion', phasorButton.x + phasorButton.w + 12, y2 + 15);
  }

  // row 3: quick select buttons
  let y3 = drawHeight + 78;
  noStroke();
  fill('black');
  textSize(small ? 13 : 15);
  textAlign(LEFT, CENTER);
  text('Quick select:', 10, y3 + 15);
  let x = 10 + textWidth('Quick select:') + 10;
  for (let i = 0; i < quickValues.length; i++) {
    let q = quickValues[i];
    let label = (q < 0 ? '−' : '') + Math.abs(q) + '°';
    quickButtons[i].x = x;
    quickButtons[i].y = y3;
    quickButtons[i].w = textWidth('−180°') + 18;
    drawButton(quickButtons[i], label, phiDeg === q);
    x += quickButtons[i].w + 8;
  }
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
  if (isOver(startButton)) {
    isAnimating = !isAnimating;
  } else if (isOver(resetButton)) {
    // reset returns to the stopped state with the default phase
    isAnimating = false;
    simTime = 0;
    showPhasors = true;
    phaseSlider.value(DEFAULT_PHI);
  } else if (isOver(phasorButton)) {
    showPhasors = !showPhasors;
  } else {
    for (let i = 0; i < quickButtons.length; i++) {
      if (isOver(quickButtons[i])) phaseSlider.value(quickValues[i]);
    }
  }
}

// ---------- responsive sizing ----------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  phaseSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

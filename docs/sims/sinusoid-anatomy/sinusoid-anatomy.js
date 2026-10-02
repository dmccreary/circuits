// Sinusoidal Waveform Anatomy MicroSim
// CANVAS_HEIGHT: 575
// Students explain how amplitude, frequency and phase shape a sinusoid
// v(t) = Vm sin(2*PI*f*t + phi)  or  v(t) = Vm cos(2*PI*f*t + phi)
// Bloom Level: Understand (L2) - explain
// The time axis and voltage axis are FIXED so that changing a slider
// visibly changes the waveform, not just the axis labels.
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
// fixed-height drawing region above the controls
let drawHeight = 440;
// control region: three slider rows plus one button row
let controlHeight = 135;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
// room for a right-aligned "label: value" to the left of each slider
let sliderLeftMargin = 185;
let defaultTextSize = 16;

// fixed plot window
const T_MIN = -0.05;   // seconds
const T_MAX = 0.20;    // seconds
const V_RANGE = 13;    // plot shows -13 V to +13 V

// default parameter values (from the chapter specification)
const DEFAULT_VM = 5;
const DEFAULT_F = 10;
const DEFAULT_PHI = 0;

// controls
let ampSlider, freqSlider, phaseSlider;
let showRMS = true;      // toggle: show/hide the RMS level
let useCosine = false;   // toggle: sine or cosine reference

// canvas-drawn buttons (repo standard: no DOM buttons)
let rmsButton = { x: 0, y: 0, w: 0, h: 28 };
let refButton = { x: 0, y: 0, w: 0, h: 28 };
let resetButton = { x: 0, y: 0, w: 0, h: 28 };

// plot geometry, recomputed every frame from the canvas width
let plotLeft, plotRight, plotTop, plotBottom, plotMidY, gutter;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  ampSlider = createSlider(1, 10, DEFAULT_VM, 0.1);
  ampSlider.position(sliderLeftMargin, drawHeight + 8);
  ampSlider.size(canvasWidth - sliderLeftMargin - margin);

  freqSlider = createSlider(1, 100, DEFAULT_F, 1);
  freqSlider.position(sliderLeftMargin, drawHeight + 38);
  freqSlider.size(canvasWidth - sliderLeftMargin - margin);

  phaseSlider = createSlider(-180, 180, DEFAULT_PHI, 1);
  phaseSlider.position(sliderLeftMargin, drawHeight + 68);
  phaseSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('A sinusoidal voltage waveform with labeled peak, peak-to-peak, RMS level, period, zero crossings and phase shift. Sliders change amplitude, frequency and phase and the formula updates in real time.', LABEL);
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

  // read the controls
  let Vm = ampSlider.value();
  let f = freqSlider.value();
  let phiDeg = phaseSlider.value();
  let phi = radians(phiDeg);
  let omega = TWO_PI * f;
  let T = 1 / f;

  // plot geometry
  gutter = canvasWidth >= 600 ? 150 : 118;
  plotLeft = 52;
  plotRight = canvasWidth - gutter;
  plotTop = 112;
  plotBottom = drawHeight - 60;
  plotMidY = (plotTop + plotBottom) / 2;

  drawPlotFrame();
  drawAmplitudeLevels(Vm);
  drawWaveforms(Vm, omega, phi);
  drawZeroCrossings(omega, phi);
  drawPhaseShift(Vm, omega, phi, phiDeg);
  drawPeriodMarker(Vm, omega, phi, T);
  drawHeader(Vm, f, phiDeg, omega, T);
  drawControls(Vm, f, phiDeg);
}

// ---------- coordinate helpers ----------
function xOf(t) {
  return map(t, T_MIN, T_MAX, plotLeft, plotRight);
}

function yOf(v) {
  return map(v, -V_RANGE, V_RANGE, plotBottom, plotTop);
}

// the waveform in the currently selected form
function wave(Vm, omega, phi, t) {
  return useCosine ? Vm * cos(omega * t + phi) : Vm * sin(omega * t + phi);
}

// time of the "reference feature" nearest t = 0:
// the rising zero crossing for the sine form, the positive peak for the cosine form
function featureTime(omega, phi) {
  return -phi / omega;
}

// ---------- plot frame, grid and axes ----------
function drawPlotFrame() {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(plotLeft, plotTop, plotRight - plotLeft, plotBottom - plotTop);

  // horizontal grid every 5 V
  textSize(13);
  for (let v = -10; v <= 10; v += 5) {
    stroke(v === 0 ? 'gray' : 'gainsboro');
    strokeWeight(v === 0 ? 1.5 : 1);
    line(plotLeft, yOf(v), plotRight, yOf(v));
    noStroke();
    fill('dimgray');
    textAlign(RIGHT, CENTER);
    text((v > 0 ? '+' : (v < 0 ? '−' : '')) + Math.abs(v) + ' V', plotLeft - 5, yOf(v));
  }

  // vertical grid every 50 ms
  for (let ms = -50; ms <= 200; ms += 50) {
    let x = xOf(ms / 1000);
    stroke(ms === 0 ? 'dimgray' : 'gainsboro');
    strokeWeight(ms === 0 ? 1.5 : 1);
    line(x, plotTop, x, plotBottom);
    noStroke();
    fill('dimgray');
    textAlign(CENTER, TOP);
    text((ms < 0 ? '−' : '') + Math.abs(ms) + (ms === 200 ? ' ms' : ''), x, plotBottom + 4);
  }

  // label the t = 0 reference line
  noStroke();
  fill('dimgray');
  textAlign(LEFT, TOP);
  text('t = 0', xOf(0) + 4, plotTop + 3);
}

// ---------- peak, RMS and peak-to-peak levels ----------
function drawAmplitudeLevels(Vm) {
  let yPeak = yOf(Vm);
  let yTrough = yOf(-Vm);
  let small = canvasWidth < 600;
  let labelX = plotRight + 26;

  // peak lines (+Vm and -Vm)
  stroke('crimson');
  strokeWeight(1.5);
  drawingContext.setLineDash([6, 4]);
  line(plotLeft, yPeak, plotRight + 20, yPeak);
  line(plotLeft, yTrough, plotRight + 20, yTrough);
  drawingContext.setLineDash([]);

  // peak label sits above the +Vm line
  noStroke();
  fill('crimson');
  textSize(small ? 12 : 14);
  textAlign(LEFT, BOTTOM);
  text('Peak Vm = ' + Vm.toFixed(1) + ' V', labelX, yPeak - 1);

  // RMS line and label (label sits below the RMS line)
  if (showRMS) {
    let Vrms = Vm / Math.SQRT2;
    let yRms = yOf(Vrms);
    stroke('darkviolet');
    strokeWeight(1.5);
    drawingContext.setLineDash([2, 4]);
    line(plotLeft, yRms, plotRight + 20, yRms);
    drawingContext.setLineDash([]);
    noStroke();
    fill('darkviolet');
    textAlign(LEFT, TOP);
    text('RMS = ' + Vrms.toFixed(2) + ' V', labelX, yRms + 2);
  }

  // peak-to-peak arrow in the right gutter
  let ax = plotRight + 12;
  stroke('darkorange');
  strokeWeight(2);
  line(ax, yPeak, ax, yTrough);
  fill('darkorange');
  noStroke();
  triangle(ax, yPeak, ax - 5, yPeak + 9, ax + 5, yPeak + 9);
  triangle(ax, yTrough, ax - 5, yTrough - 9, ax + 5, yTrough - 9);
  fill('sienna');
  textAlign(LEFT, TOP);
  text('Peak-to-peak', labelX, yTrough + 3);
  text('Vpp = ' + (2 * Vm).toFixed(1) + ' V', labelX, yTrough + (small ? 17 : 20));
}

// ---------- reference and main waveform ----------
function drawWaveforms(Vm, omega, phi) {
  // clip the curves to the plot rectangle
  drawingContext.save();
  drawingContext.beginPath();
  drawingContext.rect(plotLeft, plotTop, plotRight - plotLeft, plotBottom - plotTop);
  drawingContext.clip();

  // dashed zero-phase reference
  noFill();
  stroke('darkgray');
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 5]);
  beginShape();
  for (let x = plotLeft; x <= plotRight; x += 1) {
    let t = map(x, plotLeft, plotRight, T_MIN, T_MAX);
    vertex(x, yOf(wave(Vm, omega, 0, t)));
  }
  endShape();
  drawingContext.setLineDash([]);

  // main waveform
  stroke('royalblue');
  strokeWeight(3);
  beginShape();
  for (let x = plotLeft; x <= plotRight; x += 0.5) {
    let t = map(x, plotLeft, plotRight, T_MIN, T_MAX);
    vertex(x, yOf(wave(Vm, omega, phi, t)));
  }
  endShape();

  // mark the positive peaks
  let T = TWO_PI / omega;
  let tPeak = useCosine ? featureTime(omega, phi) : featureTime(omega, phi) + T / 4;
  let k0 = Math.ceil((T_MIN - tPeak) / T);
  fill('crimson');
  noStroke();
  for (let k = k0; tPeak + k * T <= T_MAX; k++) {
    circle(xOf(tPeak + k * T), yOf(Vm), 8);
  }
  drawingContext.restore();
}

// ---------- zero crossings ----------
function drawZeroCrossings(omega, phi) {
  // sine form: zeros where omega*t + phi = k*PI
  // cosine form: zeros where omega*t + phi = PI/2 + k*PI
  let halfT = PI / omega;
  let t0 = (useCosine ? (HALF_PI - phi) : -phi) / omega;
  let k0 = Math.ceil((T_MIN - t0) / halfT);
  stroke('seagreen');
  strokeWeight(2);
  fill('white');
  for (let k = k0; t0 + k * halfT <= T_MAX + 1e-9; k++) {
    circle(xOf(t0 + k * halfT), plotMidY, 9);
  }
  // legend entry in the lower-left corner of the plot
  circle(plotLeft + 14, plotBottom - 12, 9);
  noStroke();
  fill('darkgreen');
  textSize(13);
  textAlign(LEFT, CENTER);
  text('zero crossings', plotLeft + 24, plotBottom - 12);
}

// ---------- phase shift from the reference ----------
function drawPhaseShift(Vm, omega, phi, phiDeg) {
  if (phiDeg === 0) return;
  // reference feature is at t = 0; the shifted waveform's same feature is at -phi/omega
  let tShift = featureTime(omega, phi);
  let y = useCosine ? yOf(Vm) : plotMidY;
  let x0 = xOf(0);
  let x1 = constrain(xOf(tShift), plotLeft, plotRight);
  let clipped = xOf(tShift) < plotLeft || xOf(tShift) > plotRight;

  stroke('mediumvioletred');
  strokeWeight(4);
  line(x0, y, x1, y);
  // end caps (an arrow head if the shifted feature lies outside the window)
  strokeWeight(2);
  line(x0, y - 7, x0, y + 7);
  if (clipped) {
    let dir = x1 < x0 ? -1 : 1;
    line(x1, y, x1 - dir * 8, y - 6);
    line(x1, y, x1 - dir * 8, y + 6);
  } else {
    line(x1, y - 7, x1, y + 7);
  }

  // label with a white backing so it stays readable over the grid
  let label = 'phase shift';
  textSize(13);
  let lw = textWidth(label) + 8;
  let lx = constrain((x0 + x1) / 2, plotLeft + lw / 2 + 2, plotRight - lw / 2 - 2);
  let ly = y + 16;
  noStroke();
  fill(255, 255, 255, 225);
  rect(lx - lw / 2, ly - 9, lw, 18, 4);
  fill('mediumvioletred');
  textAlign(CENTER, CENTER);
  text(label, lx, ly);
}

// ---------- period marker below the plot ----------
function drawPeriodMarker(Vm, omega, phi, T) {
  // One complete cycle can be measured between ANY two matching points.
  // Candidates, a quarter period apart: rising zero crossing, positive peak,
  // falling zero crossing, negative peak. Use the first pair that fits in the window.
  // The preferred pair starts at or after t = 0 and uses the same feature as the
  // phase reference (rising zero crossing for sine, positive peak for cosine).
  let tRise = useCosine ? featureTime(omega, phi) - T / 4 : featureTime(omega, phi);
  let levels = [0, Vm, 0, -Vm];
  let order = useCosine ? [1, 2, 3, 0] : [0, 1, 2, 3];
  let best = null;
  for (let tStart of [0, T_MIN]) {
    for (let q of order) {
      let tq = tRise + q * T / 4;
      let k = Math.ceil((tStart - tq) / T - 1e-9);
      let tA = tq + k * T;
      if (best === null && tA + T <= T_MAX + 1e-9) {
        best = { tA: tA, fits: true, level: levels[q] };
      }
    }
  }
  if (best === null) {
    // no complete cycle fits: start at the earliest reference feature in the window
    let q = order[0];
    let tq = tRise + q * T / 4;
    let k = Math.ceil((T_MIN - tq) / T - 1e-9);
    best = { tA: tq + k * T, fits: false, level: levels[q] };
  }
  let y = plotBottom + 36;
  let xA = xOf(best.tA);
  let xB = best.fits ? xOf(best.tA + T) : plotRight;
  let yFeat = yOf(best.level);

  // dashed guides from the matching waveform points down to the marker
  stroke('teal');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(xA, yFeat, xA, y);
  if (best.fits) line(xB, yFeat, xB, y);
  drawingContext.setLineDash([]);

  // double-headed arrow
  strokeWeight(2);
  line(xA, y, xB, y);
  fill('teal');
  noStroke();
  triangle(xA, y, xA + 9, y - 5, xA + 9, y + 5);
  triangle(xB, y, xB - 9, y - 5, xB - 9, y + 5);

  // label centered on the arrow
  let label = best.fits
    ? 'Period T = 1/f = ' + formatMs(T)
    : 'Period T = 1/f = ' + formatMs(T) + ' (extends past the plot)';
  textSize(14);
  let lw = textWidth(label) + 10;
  let lx = constrain((xA + xB) / 2, lw / 2 + 4, canvasWidth - lw / 2 - 4);
  fill('aliceblue');
  rect(lx - lw / 2, y + 5, lw, 17);
  fill('teal');
  textAlign(CENTER, TOP);
  text(label, lx, y + 6);
}

// ---------- title, live formula and derived values ----------
function drawHeader(Vm, f, phiDeg, omega, T) {
  let small = canvasWidth < 600;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(small ? 19 : 22);
  text('Sinusoidal Waveform Anatomy', canvasWidth / 2, 8);

  // live formula
  let fn = useCosine ? 'cos' : 'sin';
  let sign = phiDeg < 0 ? '−' : '+';
  let formula = 'v(t) = ' + Vm.toFixed(1) + ' ' + fn + '(2π·' + f + '·t ' + sign + ' ' + Math.abs(phiDeg) + '°) V';
  fill('royalblue');
  textStyle(BOLD);
  textSize(small ? 16 : 19);
  text(formula, canvasWidth / 2, 37);
  textStyle(NORMAL);

  // derived values
  fill('black');
  textSize(small ? 12 : 14);
  text('ω = 2πf = ' + omega.toFixed(1) + ' rad/s        T = 1/f = ' + formatMs(T), canvasWidth / 2, 65);

  // phase description
  let dt = Math.abs(phiDeg) / 360 * T;
  let phaseText;
  if (phiDeg === 0) {
    phaseText = 'φ = 0°: in phase with the dashed reference ' + (useCosine ? 'Vm cos(ωt)' : 'Vm sin(ωt)');
  } else if (phiDeg > 0) {
    phaseText = 'φ = +' + phiDeg + '°: shifted LEFT by ' + formatMs(dt) + ' (leads the dashed reference)';
  } else {
    phaseText = 'φ = −' + Math.abs(phiDeg) + '°: shifted RIGHT by ' + formatMs(dt) + ' (lags the dashed reference)';
  }
  fill('mediumvioletred');
  text(phaseText, canvasWidth / 2, 87);
}

function formatMs(seconds) {
  let ms = seconds * 1000;
  if (ms >= 100) return ms.toFixed(0) + ' ms';
  if (ms >= 10) return ms.toFixed(1) + ' ms';
  return ms.toFixed(2) + ' ms';
}

// ---------- control region ----------
function drawControls(Vm, f, phiDeg) {
  // slider labels and values, right-aligned just before each slider
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(RIGHT, CENTER);
  text('Amplitude Vm: ' + Vm.toFixed(1) + ' V', sliderLeftMargin - 10, drawHeight + 19);
  text('Frequency f: ' + f + ' Hz', sliderLeftMargin - 10, drawHeight + 49);
  text('Phase φ: ' + (phiDeg > 0 ? '+' : (phiDeg < 0 ? '−' : '')) + Math.abs(phiDeg) + '°', sliderLeftMargin - 10, drawHeight + 79);

  // button row
  let by = drawHeight + 100;
  let small = canvasWidth < 520;
  textSize(small ? 13 : 15);
  let rmsLabel = showRMS ? 'RMS Level: On' : 'RMS Level: Off';
  let refLabel = useCosine ? 'Reference: cos(ωt)' : 'Reference: sin(ωt)';
  rmsButton.x = 10;
  rmsButton.y = by;
  rmsButton.w = textWidth('RMS Level: Off') + 22;
  refButton.x = rmsButton.x + rmsButton.w + 8;
  refButton.y = by;
  refButton.w = textWidth('Reference: cos(ωt)') + 22;
  resetButton.x = refButton.x + refButton.w + 8;
  resetButton.y = by;
  resetButton.w = textWidth('Reset') + 22;
  drawButton(rmsButton, rmsLabel, showRMS);
  drawButton(refButton, refLabel, false);
  drawButton(resetButton, 'Reset', false);
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
  if (isOver(rmsButton)) {
    showRMS = !showRMS;
  } else if (isOver(refButton)) {
    useCosine = !useCosine;
  } else if (isOver(resetButton)) {
    ampSlider.value(DEFAULT_VM);
    freqSlider.value(DEFAULT_F);
    phaseSlider.value(DEFAULT_PHI);
    showRMS = true;
    useCosine = false;
  }
}

// ---------- responsive sizing ----------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  ampSlider.size(canvasWidth - sliderLeftMargin - margin);
  freqSlider.size(canvasWidth - sliderLeftMargin - margin);
  phaseSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

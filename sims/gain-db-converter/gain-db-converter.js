// Gain and Decibel Converter MicroSim
// CANVAS_HEIGHT: 510
// Students convert between linear gain and decibels for voltage and power gains.
//   Voltage gain:  dB = 20 log10(Av)     Av = 10^(dB/20)
//   Power gain:    dB = 10 log10(Ap)     Ap = 10^(dB/10)
// The left plot shows what the gain does to a 1 V peak input signal; the log
// scale shows where the gain sits between x0.001 and x1000.
// Bloom Level: Apply (L3) - calculate
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let drawHeight = 425;
// control region: one slider row and one button row
let controlHeight = 85;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 215;
let defaultTextSize = 16;

// colors
const IN_COLOR = 'royalblue';
const OUT_COLOR = 'crimson';
const DB_COLOR = 'darkviolet';

// state
let entryMode = 'linear';   // 'linear' = enter the gain ratio, 'db' = enter decibels
let gainMode = 'voltage';   // 'voltage' (20 log) or 'power' (10 log)
let gain = 10;              // linear gain ratio (default Av = 10)
let dB = 20;                // the same gain in decibels

let gainSlider;

// canvas-drawn buttons (repo standard: no DOM buttons)
let entryButton = { x: 0, y: 0, w: 0, h: 28 };
let modeButton = { x: 0, y: 0, w: 0, h: 28 };
let resetButton = { x: 0, y: 0, w: 0, h: 28 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // One slider serves both entry modes; configureSlider() sets its range.
  gainSlider = createSlider(-3, 3, 1, 0.002);
  gainSlider.position(sliderLeftMargin, drawHeight + 8);
  gainSlider.size(canvasWidth - sliderLeftMargin - margin);
  gainSlider.input(readSlider);
  configureSlider();

  describe('A gain and decibel converter. A plot compares a 1 volt input sine wave with the output sine wave scaled by the gain. A panel shows the gain as a linear ratio and in decibels with the conversion formulas, a logarithmic scale marks the gain between times 0.001 and times 1000, and a quick reference table lists common values.', LABEL);
}

// ---------- conversions ----------
function dbFactor() {
  return gainMode === 'voltage' ? 20 : 10;
}

function gainToDb(g) {
  return dbFactor() * Math.log10(g);
}

function dbToGain(d) {
  return Math.pow(10, d / dbFactor());
}

// Set the slider's range for the current entry mode and move it to the current gain.
// Linear entry: the slider is the exponent of 10 (a logarithmic slider from 0.001 to 1000).
// Decibel entry: the slider is whole decibels (+/-60 dB voltage, +/-30 dB power).
function configureSlider() {
  if (entryMode === 'linear') {
    gainSlider.attribute('min', -3);
    gainSlider.attribute('max', 3);
    gainSlider.attribute('step', 0.002);
    gainSlider.value(Math.log10(gain));
  } else {
    let limit = 3 * dbFactor();
    gainSlider.attribute('min', -limit);
    gainSlider.attribute('max', limit);
    gainSlider.attribute('step', 1);
    gainSlider.value(dB);
  }
}

// Read the slider and update both forms of the gain.
function readSlider() {
  if (entryMode === 'linear') {
    // round the entered gain to two significant figures so the number shown
    // is exactly the number used in the calculation
    gain = Number(Math.pow(10, gainSlider.value()).toPrecision(2));
    dB = gainToDb(gain);
  } else {
    dB = gainSlider.value();
    gain = dbToGain(dB);
  }
}

// ---------- number formatting ----------
function fmtGain(g) {
  return String(Number(g.toPrecision(entryMode === 'linear' ? 2 : 4)));
}

function fmtDb(d, digits) {
  let t = Math.abs(d).toFixed(digits);
  if (parseFloat(t) === 0) return t;
  return (d < 0 ? '−' : '+') + t;
}

function fmtVolts(v) {
  if (v >= 1) return String(Number(v.toPrecision(3))) + ' V';
  return String(Number((v * 1000).toPrecision(3))) + ' mV';
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

  // title
  let small = canvasWidth < 600;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(small ? 19 : 22);
  text('Gain and Decibel Converter', canvasWidth / 2, 8);

  // layout: signal plot (left) and conversion panel (right), then the log scale
  // and the quick reference table across the full width
  let panelTop = 40;
  let panelH = 212;
  let half = (canvasWidth - 30) / 2;
  drawSignalPanel(10, panelTop, half, panelH);
  drawConversionPanel(20 + half, panelTop, half, panelH);
  drawLogScale(10, panelTop + panelH + 6, canvasWidth - 20, 76);
  drawQuickReference(10, panelTop + panelH + 88, canvasWidth - 20, 76);
  drawControls();
}

// ---------- input and output signals ----------
function drawSignalPanel(px, py, pw, ph) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);
  let small = pw < 260;

  // a voltage gain scales the amplitude directly; a power gain scales it by the square root
  let ampRatio = gainMode === 'voltage' ? gain : Math.sqrt(gain);
  let vin = 1;                 // input: fixed 1 V peak
  let vout = ampRatio * vin;   // output peak
  let top = Math.max(vin, vout);

  // legend: input and output peak values
  noStroke();
  textStyle(BOLD);
  textSize(small ? 11.5 : 13.5);
  textAlign(LEFT, TOP);
  fill(IN_COLOR);
  text('━ Input: ' + fmtVolts(vin) + ' peak', px + 8, py + 7);
  fill(OUT_COLOR);
  text('━ Output: ' + fmtVolts(vout) + ' peak', px + 8, py + 24);
  textStyle(NORMAL);

  // plot area
  let left = px + (small ? 44 : 56);
  let right = px + pw - 10;
  let pTop = py + 48;
  let pBottom = py + ph - 44;
  let midY = (pTop + pBottom) / 2;
  let ampPx = (pBottom - pTop) / 2 - 3;   // pixels for the larger of the two peaks

  // axis: the scale follows the larger signal
  stroke('gainsboro');
  strokeWeight(1);
  line(left, midY - ampPx, right, midY - ampPx);
  line(left, midY + ampPx, right, midY + ampPx);
  stroke('gray');
  line(left, midY, right, midY);
  line(left, pTop, left, pBottom);
  noStroke();
  fill('dimgray');
  textSize(small ? 10.5 : 12);
  textAlign(RIGHT, CENTER);
  text('+' + fmtVolts(top), left - 4, midY - ampPx);
  text('0', left - 4, midY);
  text('−' + fmtVolts(top), left - 4, midY + ampPx);

  // input (wide) then output (narrow, on top) so both show at unity gain
  noFill();
  stroke(IN_COLOR);
  strokeWeight(5);
  beginShape();
  for (let x = left; x <= right; x += 1) {
    let ph2 = map(x, left, right, 0, 2 * TWO_PI);
    vertex(x, midY - (vin / top) * ampPx * Math.sin(ph2));
  }
  endShape();
  stroke(OUT_COLOR);
  strokeWeight(2.5);
  beginShape();
  for (let x = left; x <= right; x += 1) {
    let ph2 = map(x, left, right, 0, 2 * TWO_PI);
    vertex(x, midY - (vout / top) * ampPx * Math.sin(ph2));
  }
  endShape();

  // what the gain does, in words
  noStroke();
  fill('black');
  textSize(small ? 11 : 13);
  textAlign(CENTER, BOTTOM);
  let g = fmtGain(gain);
  let line1, line2;
  if (gainMode === 'voltage') {
    line1 = small ? 'Output = ' + g + ' × input' : 'Output amplitude = ' + g + ' × input amplitude';
  } else {
    line1 = 'Output power = ' + g + ' × input power';
  }
  if (gainMode === 'power') {
    line2 = 'Amplitude ratio = √Ap = ' + Number(ampRatio.toPrecision(3));
  } else if (Math.min(vin, vout) / top < 0.04) {
    line2 = small ? 'Smaller signal too small to see' : 'Smaller signal is too small to see on a linear axis';
  } else {
    line2 = gain > 1 ? 'Amplification' : (gain < 1 ? 'Attenuation' : 'Unity gain: output = input');
  }
  text(line1, px + pw / 2, py + ph - 23);
  fill('dimgray');
  text(line2, px + pw / 2, py + ph - 6);
}

// ---------- conversion display ----------
function drawConversionPanel(px, py, pw, ph) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);
  let small = pw < 260;
  let sub = gainMode === 'voltage' ? 'V' : 'P';
  let factor = dbFactor();
  let x = px + 10;
  let y = py + 8;
  let big = small ? 16 : 21;
  let fs = small ? 11.5 : 14;
  let lh = small ? 18 : 21;

  // heading
  noStroke();
  fill('black');
  textStyle(BOLD);
  textSize(small ? 13 : 15);
  textAlign(LEFT, TOP);
  text(gainMode === 'voltage' ? 'Voltage gain' : 'Power gain', x, y);
  textStyle(NORMAL);
  y += small ? 20 : 24;

  // the two forms, with the entered one marked
  let g = fmtGain(gain);
  drawRich([
    { t: 'A', c: OUT_COLOR }, { t: sub, c: OUT_COLOR, sub: true }, { t: ' = ' + g, c: OUT_COLOR },
    { t: entryMode === 'linear' ? '   (entered)' : '', c: 'dimgray', scale: 0.6 }
  ], x, y, big, true);
  y += big + 9;
  drawRich([
    { t: fmtDb(dB, 2) + ' dB', c: DB_COLOR },
    { t: entryMode === 'db' ? '   (entered)' : '', c: 'dimgray', scale: 0.6 }
  ], x, y, big, true);
  y += big + 9;

  stroke('silver');
  strokeWeight(1);
  line(x, y, px + pw - 10, y);
  y += 7;

  // linear to decibels
  drawRich([
    { t: 'dB = ' + factor + '·log₁₀(A', c: DB_COLOR }, { t: sub, c: DB_COLOR, sub: true }, { t: ')', c: DB_COLOR }
  ], x, y, fs, false);
  y += lh;
  drawRich([
    { t: '    = ' + factor + '·log₁₀(' + g + ') = ' + fmtDb(dB, 2) + ' dB', c: DB_COLOR }
  ], x, y, fs, false);
  y += lh + 5;

  // decibels back to linear
  drawRich([
    { t: 'A', c: OUT_COLOR }, { t: sub, c: OUT_COLOR, sub: true }, { t: ' = 10', c: OUT_COLOR },
    { t: '(dB/' + factor + ')', c: OUT_COLOR, sup: true }
  ], x, y, fs, false);
  y += lh;
  drawRich([
    { t: '     = 10', c: OUT_COLOR },
    { t: '(' + fmtDb(dB, entryMode === 'db' ? 0 : 2) + '/' + factor + ')', c: OUT_COLOR, sup: true },
    { t: ' = ' + g, c: OUT_COLOR }
  ], x, y, fs, false);
}

// one left-aligned line of colored pieces; pieces may be raised (sup) or lowered (sub)
function drawRich(parts, x, y, size, bold) {
  textStyle(bold ? BOLD : NORMAL);
  noStroke();
  textAlign(LEFT, TOP);
  for (let p of parts) {
    let s = size * (p.sup || p.sub ? 0.72 : (p.scale || 1));
    textSize(s);
    fill(p.c);
    let dy = 0;
    if (p.sup) dy = -size * 0.25;
    else if (p.sub) dy = size * 0.38;
    else if (p.scale) dy = size * (1 - p.scale) * 0.75;
    text(p.t, x, y + dy);
    x += textWidth(p.t);
  }
  textStyle(NORMAL);
}

// ---------- logarithmic scale from x0.001 to x1000 ----------
function drawLogScale(px, py, pw, ph) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);
  let small = pw < 560;
  let left = px + 44;
  let right = px + pw - 44;
  let barY = py + 31;
  let factor = dbFactor();
  let xOf = (e) => map(e, -3, 3, left, right);

  // attenuation and amplification halves
  noStroke();
  fill('seashell');
  rect(left, barY - 7, xOf(0) - left, 14);
  fill('honeydew');
  rect(xOf(0), barY - 7, right - xOf(0), 14);
  stroke('gray');
  strokeWeight(1);
  noFill();
  rect(left, barY - 7, right - left, 14);

  textSize(small ? 10.5 : 12);
  for (let e = -3; e <= 3; e++) {
    // major tick at each decade: ratio above, decibels below
    stroke('dimgray');
    strokeWeight(1.5);
    line(xOf(e), barY - 11, xOf(e), barY + 11);
    noStroke();
    fill('black');
    textAlign(CENTER, BOTTOM);
    text('×' + String(Math.pow(10, e) < 1 ? Number(Math.pow(10, e).toPrecision(1)) : Math.pow(10, e)), xOf(e), barY - 12);
    fill(DB_COLOR);
    textAlign(CENTER, TOP);
    text(fmtDb(e * factor, 0) + ' dB', xOf(e), barY + 12);
    // minor ticks at x2 and x5 inside each decade
    if (e < 3) {
      stroke('darkgray');
      strokeWeight(1);
      for (let m of [2, 5]) {
        let xm = xOf(e + Math.log10(m));
        line(xm, barY - 7, xm, barY + 7);
      }
    }
  }
  // region names inside the bar
  noStroke();
  fill('dimgray');
  textSize(small ? 9.5 : 11);
  textAlign(CENTER, CENTER);
  text('attenuation', (left + xOf(0)) / 2, barY);
  text('amplification', (xOf(0) + right) / 2, barY);

  // marker at the current gain
  // (a needle that stays inside the bar so it never covers the tick labels)
  let xm = xOf(constrain(Math.log10(gain), -3, 3));
  stroke('white');
  strokeWeight(7);
  line(xm, barY - 8, xm, barY + 8);
  stroke('black');
  strokeWeight(3.5);
  line(xm, barY - 10, xm, barY + 10);
  fill('black');
  noStroke();
  circle(xm, barY, 10);

  // caption
  fill('dimgray');
  textSize(small ? 10 : 11.5);
  textAlign(CENTER, BOTTOM);
  text('Logarithmic scale: every ×10 in ' + (gainMode === 'voltage' ? 'voltage' : 'power') + ' adds ' + factor + ' dB', px + pw / 2, py + ph - 2);
}

// ---------- quick reference table ----------
function drawQuickReference(px, py, pw, ph) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 6);
  let small = pw < 560;
  let rows = [
    ['Quick reference', 'Voltage gain (20·log₁₀)', 'Power gain (10·log₁₀)'],
    ['× 2', '+6.02 dB  (≈ +6 dB)', '+3.01 dB  (≈ +3 dB)'],
    ['× 10', '+20 dB', '+10 dB'],
    ['× 0.5', '−6.02 dB  (≈ −6 dB)', '−3.01 dB  (≈ −3 dB)']
  ];
  if (small) {
    rows[0] = ['Ratio', 'Voltage (20·log₁₀)', 'Power (10·log₁₀)'];
    rows[1] = ['× 2', '+6.02 dB', '+3.01 dB'];
    rows[3] = ['× 0.5', '−6.02 dB', '−3.01 dB'];
  }
  let colX = [px + pw * 0.14, px + pw * 0.46, px + pw * 0.80];
  let rowH = (ph - 8) / 4;

  // highlight the column for the current mode
  let hc = gainMode === 'voltage' ? 1 : 2;
  noStroke();
  fill('lavender');
  rect(colX[hc] - pw * 0.16, py + 3, pw * 0.32, ph - 6, 5);

  textSize(small ? 11 : 13);
  textAlign(CENTER, CENTER);
  for (let r = 0; r < rows.length; r++) {
    let y = py + 4 + rowH * (r + 0.5);
    textStyle(r === 0 ? BOLD : NORMAL);
    for (let c = 0; c < 3; c++) {
      fill(c === 0 || r === 0 ? 'black' : DB_COLOR);
      text(rows[r][c], colX[c], y);
    }
    if (r === 0) {
      stroke('silver');
      line(px + 8, py + 4 + rowH, px + pw - 8, py + 4 + rowH);
      noStroke();
    }
  }
  textStyle(NORMAL);
}

// ---------- control region ----------
function drawControls() {
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(RIGHT, CENTER);
  let label = entryMode === 'linear'
    ? 'Linear gain: ' + fmtGain(gain)
    : 'Gain in dB: ' + fmtDb(dB, 0) + ' dB';
  text(label, sliderLeftMargin - 10, drawHeight + 19);

  let small = canvasWidth < 520;
  let by = drawHeight + 46;
  textSize(small ? 12.5 : 15);
  entryButton.x = 10;
  entryButton.y = by;
  entryButton.w = textWidth('Enter as: Linear gain') + 22;
  modeButton.x = entryButton.x + entryButton.w + 8;
  modeButton.y = by;
  modeButton.w = textWidth('Mode: Voltage gain') + 22;
  resetButton.x = modeButton.x + modeButton.w + 8;
  resetButton.y = by;
  resetButton.w = textWidth('Reset') + 22;
  drawButton(entryButton, entryMode === 'linear' ? 'Enter as: Linear gain' : 'Enter as: Decibels', false);
  drawButton(modeButton, gainMode === 'voltage' ? 'Mode: Voltage gain' : 'Mode: Power gain', false);
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
  if (isOver(entryButton)) {
    // switch which form is entered; the slider snaps to the nearest value it can hold
    entryMode = entryMode === 'linear' ? 'db' : 'linear';
    if (entryMode === 'db') {
      dB = constrain(Math.round(dB), -3 * dbFactor(), 3 * dbFactor());
    }
    configureSlider();
    readSlider();
  } else if (isOver(modeButton)) {
    // switch between voltage and power gain, keeping the entered number
    gainMode = gainMode === 'voltage' ? 'power' : 'voltage';
    if (entryMode === 'db') {
      dB = constrain(dB, -3 * dbFactor(), 3 * dbFactor());
    }
    configureSlider();
    readSlider();
  } else if (isOver(resetButton)) {
    entryMode = 'linear';
    gainMode = 'voltage';
    gain = 10;
    dB = 20;
    configureSlider();
    readSlider();
  }
}

// ---------- responsive sizing ----------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  gainSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

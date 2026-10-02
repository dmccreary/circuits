// DC and AC Component Separator MicroSim
// CANVAS_HEIGHT: 620
// A composite signal v(t) = VDC + Vm sin(2*PI*f*t) is separated into
//   its DC component  VDC            (the average value, a constant)
//   its AC component  Vm sin(2*PI*f*t)  (the oscillation around the average)
// All three plots use the same volts-per-pixel scale so the parts can be compared.
// Bloom Level: Understand (L2) - classify
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let drawHeight = 490;
// control region: three slider rows plus one button row
let controlHeight = 130;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 205;
let defaultTextSize = 16;

// default parameter values (from the chapter specification)
const DEFAULT_VDC = 2.5;
const DEFAULT_VM = 2;
const DEFAULT_F = 5;

// fixed plot window: 1 second of signal
const T_MAX = 1.0;
// three stacked plots, all 15 V tall so the scale (px per volt) is identical
const PLOT_H = 105;
const PLOT_GAP = 25;        // room for each plot's heading
const FIRST_PLOT_TOP = 102;

// colors: one per signal part, also named in every heading
const COMPOSITE_COLOR = 'darkslateblue';
const DC_COLOR = 'darkorange';
const DC_TEXT_COLOR = 'sienna';   // darker shade of the DC color for readable text
const AC_COLOR = 'royalblue';

let dcSlider, acSlider, freqSlider;
let showLabels = true;

// canvas-drawn buttons (repo standard: no DOM buttons)
let labelsButton = { x: 0, y: 0, w: 0, h: 28 };
let resetButton = { x: 0, y: 0, w: 0, h: 28 };

// plot geometry, recomputed each frame
let plotLeft, plotRight, sideW;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  dcSlider = createSlider(0, 5, DEFAULT_VDC, 0.1);
  dcSlider.position(sliderLeftMargin, drawHeight + 8);
  dcSlider.size(canvasWidth - sliderLeftMargin - margin);

  acSlider = createSlider(0, 5, DEFAULT_VM, 0.1);
  acSlider.position(sliderLeftMargin, drawHeight + 38);
  acSlider.size(canvasWidth - sliderLeftMargin - margin);

  freqSlider = createSlider(1, 20, DEFAULT_F, 1);
  freqSlider.position(sliderLeftMargin, drawHeight + 68);
  freqSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Three stacked plots: a composite signal made of a DC offset plus a sinusoid, its DC component drawn as a flat line, and its AC component drawn as a sinusoid centered on zero. A signal-flow sketch shows an averaging block extracting the DC part and a coupling capacitor passing the AC part.', LABEL);
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

  let Vdc = dcSlider.value();
  let Vm = acSlider.value();
  let f = freqSlider.value();

  // layout: plots on the left, signal-flow sketch in a column on the right
  sideW = constrain(canvasWidth * 0.27, 112, 195);
  plotLeft = 50;
  plotRight = canvasWidth - sideW - 8;

  let top1 = FIRST_PLOT_TOP;
  let top2 = top1 + PLOT_H + PLOT_GAP;
  let top3 = top2 + PLOT_H + PLOT_GAP;

  drawHeader(Vdc, Vm, f);

  // 1. composite signal, range -5 V to +10 V
  drawPlot(top1, -5, 10, [-5, 0, 5, 10], false);
  drawHeading(top1, COMPOSITE_COLOR, 'Composite signal  v(t) = VDC + vAC(t)',
    'max ' + volts(Vdc + Vm) + ',  min ' + volts(Vdc - Vm));
  drawCurve(top1, -5, 10, COMPOSITE_COLOR, (t) => Vdc + Vm * sin(TWO_PI * f * t));
  if (showLabels) drawLevelLine(top1, -5, 10, Vdc, DC_COLOR, 'average = ' + Vdc.toFixed(1) + ' V');

  // 2. DC component only, same range as the composite plot
  drawPlot(top2, -5, 10, [-5, 0, 5, 10], false);
  drawHeading(top2, DC_TEXT_COLOR, 'DC component  VDC = ' + Vdc.toFixed(1) + ' V', 'constant');
  drawCurve(top2, -5, 10, DC_COLOR, (t) => Vdc);

  // 3. AC component only, centered on zero, same 15 V span
  drawPlot(top3, -7.5, 7.5, [-5, 0, 5], true);
  drawHeading(top3, AC_COLOR, 'AC component  vAC(t) = ' + Vm.toFixed(1) + ' sin(2π·' + f + '·t) V', '');
  drawCurve(top3, -7.5, 7.5, AC_COLOR, (t) => Vm * sin(TWO_PI * f * t));

  drawSignalFlow(top1, top2, top3);
  drawControls(Vdc, Vm, f);
}

// ---------- title, formula and calculated values ----------
function drawHeader(Vdc, Vm, f) {
  let small = canvasWidth < 640;
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(small ? 19 : 22);
  text('DC and AC Component Separator', canvasWidth / 2, 8);

  textStyle(BOLD);
  textSize(small ? 15 : 18);
  fill(COMPOSITE_COLOR);
  text('v(t) = ' + Vdc.toFixed(1) + ' + ' + Vm.toFixed(1) + ' sin(2π·' + f + '·t) V', canvasWidth / 2, 36);
  textStyle(NORMAL);

  // calculated values
  let acRms = Vm / Math.SQRT2;
  let totalRms = Math.sqrt(Vdc * Vdc + acRms * acRms);
  textSize(small ? 12 : 14);
  fill('black');
  let line1 = small
    ? 'DC = ' + Vdc.toFixed(2) + ' V     AC RMS = ' + acRms.toFixed(2) + ' V     Total RMS = ' + totalRms.toFixed(2) + ' V'
    : 'DC = ' + Vdc.toFixed(2) + ' V      AC RMS = Vm/√2 = ' + acRms.toFixed(2) + ' V      Total RMS = √(VDC² + AC RMS²) = ' + totalRms.toFixed(2) + ' V';
  text(line1, canvasWidth / 2, 62);
}

// voltage with a true minus sign
function volts(v) {
  return (v < 0 ? '−' : '') + Math.abs(v).toFixed(1) + ' V';
}

// ---------- one plot frame with grid ----------
function drawPlot(top, vMin, vMax, gridVolts, showTimeLabels) {
  let bottom = top + PLOT_H;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(plotLeft, top, plotRight - plotLeft, PLOT_H);

  textSize(12);
  for (let v of gridVolts) {
    let y = map(v, vMin, vMax, bottom, top);
    if (v !== vMin && v !== vMax) {
      stroke(v === 0 ? 'gray' : 'gainsboro');
      strokeWeight(1);
      line(plotLeft, y, plotRight, y);
    }
    noStroke();
    fill('dimgray');
    textAlign(RIGHT, CENTER);
    // keep the top and bottom labels inside the plot's vertical extent
    let ly = constrain(y, top + 6, bottom - 6);
    text((v > 0 ? '+' : (v < 0 ? '−' : '')) + Math.abs(v) + ' V', plotLeft - 5, ly);
  }
  // vertical grid every 0.2 s
  for (let i = 0; i <= 5; i++) {
    let t = i * 0.2;
    let x = map(t, 0, T_MAX, plotLeft, plotRight);
    if (i > 0 && i < 5) {
      stroke('gainsboro');
      strokeWeight(1);
      line(x, top, x, bottom);
    }
    if (showTimeLabels) {
      noStroke();
      fill('dimgray');
      textAlign(i === 0 ? LEFT : (i === 5 ? RIGHT : CENTER), TOP);
      text(t.toFixed(1) + (i === 5 ? ' s' : ''), x, bottom + 4);
    }
  }
}

// heading above a plot: colored name on the left, note on the right
function drawHeading(top, col, title, note) {
  let small = canvasWidth < 640;
  noStroke();
  textStyle(BOLD);
  textSize(small ? 12 : 14);
  fill(col);
  textAlign(LEFT, BOTTOM);
  text(title, plotLeft, top - 4);
  let used = textWidth(title);
  textStyle(NORMAL);
  if (note) {
    textSize(small ? 11 : 13);
    fill('dimgray');
    // put the note beside the title if it fits, otherwise inside the plot's top edge
    if (plotLeft + used + 16 + textWidth(note) <= plotRight) {
      textAlign(RIGHT, BOTTOM);
      text(note, plotRight, top - 4);
    } else {
      textAlign(RIGHT, TOP);
      text(note, plotRight - 5, top + 3);
    }
  }
}

// dashed horizontal level with a label (used for the average on the composite plot)
function drawLevelLine(top, vMin, vMax, v, col, label) {
  let bottom = top + PLOT_H;
  let y = map(v, vMin, vMax, bottom, top);
  stroke(col);
  strokeWeight(2);
  drawingContext.setLineDash([7, 5]);
  line(plotLeft, y, plotRight, y);
  drawingContext.setLineDash([]);
  noStroke();
  fill(col);
  textSize(12);
  textStyle(BOLD);
  textAlign(LEFT, BOTTOM);
  // white backing keeps the label readable over the curve
  let w = textWidth(label) + 8;
  let ly = Math.min(y + 30, bottom - 3);
  fill(255, 255, 255, 220);
  rect(plotLeft + 6, ly - 15, w, 16, 3);
  fill(DC_TEXT_COLOR);
  text(label, plotLeft + 10, ly);
  textStyle(NORMAL);
}

function drawCurve(top, vMin, vMax, col, fn) {
  let bottom = top + PLOT_H;
  noFill();
  stroke(col);
  strokeWeight(2.5);
  beginShape();
  for (let x = plotLeft; x <= plotRight; x += 0.5) {
    let t = map(x, plotLeft, plotRight, 0, T_MAX);
    vertex(x, map(fn(t), vMin, vMax, bottom, top));
  }
  endShape();
}

// ---------- signal-flow sketch: how the parts are extracted ----------
function drawSignalFlow(top1, top2, top3) {
  let small = sideW < 160;
  let y1 = top1 + PLOT_H / 2;
  let y2 = top2 + PLOT_H / 2;
  let y3 = top3 + PLOT_H / 2;
  let xIn = plotRight;                    // right edge of the plots
  let xTrunk = canvasWidth - 16;          // vertical trunk near the right edge
  let xMid = (xIn + xTrunk) / 2 + 2;

  // composite signal leaves plot 1 and runs down the trunk
  stroke(COMPOSITE_COLOR);
  strokeWeight(2.5);
  noFill();
  line(xIn, y1, xTrunk, y1);
  line(xTrunk, y1, xTrunk, y3);
  fill(COMPOSITE_COLOR);
  noStroke();
  circle(xTrunk, y2, 7);
  textSize(small ? 11 : 13);
  textAlign(CENTER, BOTTOM);
  text('v(t)', xMid, y1 - 4);

  // branch A: averaging block feeds the DC plot
  let boxW = small ? 46 : 68;
  let boxH = 26;
  stroke(COMPOSITE_COLOR);
  strokeWeight(2.5);
  line(xTrunk, y2, xMid + boxW / 2, y2);
  stroke(DC_COLOR);
  line(xMid - boxW / 2, y2, xIn + 9, y2);
  fill(DC_COLOR);
  noStroke();
  triangle(xIn + 1, y2, xIn + 11, y2 - 6, xIn + 11, y2 + 6);
  fill('white');
  stroke(DC_COLOR);
  strokeWeight(2);
  rect(xMid - boxW / 2, y2 - boxH / 2, boxW, boxH, 5);
  noStroke();
  fill(DC_TEXT_COLOR);
  textAlign(CENTER, CENTER);
  textSize(small ? 11 : 13);
  text(small ? 'avg' : 'average', xMid, y2 + 1);

  // branch B: coupling capacitor feeds the AC plot
  let capW = small ? 46 : 68;
  stroke(COMPOSITE_COLOR);
  strokeWeight(2.5);
  line(xTrunk, y3, xMid + capW / 2, y3);
  drawCapacitorSymbol(xMid - capW / 2, y3 - 16, capW, 32, 2.5);
  stroke(AC_COLOR);
  strokeWeight(2.5);
  line(xMid - capW / 2, y3, xIn + 9, y3);
  fill(AC_COLOR);
  noStroke();
  triangle(xIn + 1, y3, xIn + 11, y3 - 6, xIn + 11, y3 + 6);

  // explanatory labels (the component labels the toggle shows and hides)
  if (showLabels) {
    let textW = xTrunk - xIn - 14;
    noStroke();
    textSize(small ? 11 : 12.5);
    fill(DC_TEXT_COLOR);
    textAlign(CENTER, TOP);
    text(small ? 'Average = DC component' : 'Average value = DC component', xIn + 8, y2 + boxH / 2 + 5, textW);
    fill(AC_COLOR);
    textAlign(CENTER, BOTTOM);
    text(small ? 'Oscillation = AC component' : 'Oscillation around average = AC component', xIn + 8, y3 - 62, textW, 42);
    textAlign(CENTER, TOP);
    text(small ? 'Capacitor blocks DC, passes AC' : 'Coupling capacitor: blocks DC, passes AC', xIn + 8, y3 + 20, textW);
  }
}

// Horizontal capacitor schematic symbol. The geometry mirrors drawCapacitor() in
// src/circuits-js-lib/p5-circuit-lib.js (end wires 35% of the length, plates 50%
// of the height); it is copied here so the sketch stays self-contained.
function drawCapacitorSymbol(x, y, cwidth, cheight, lineWidth) {
  let halfHeight = y + cheight / 2;
  let endWire = cwidth * 0.42;
  let plateH = cheight * 0.75;
  let plateX1 = x + endWire;
  let plateX2 = x + cwidth - endWire;
  strokeWeight(lineWidth);
  noFill();
  stroke(AC_COLOR);
  line(x, halfHeight, plateX1, halfHeight);
  line(plateX1, halfHeight - plateH / 2, plateX1, halfHeight + plateH / 2);
  stroke(COMPOSITE_COLOR);
  line(plateX2, halfHeight, x + cwidth, halfHeight);
  line(plateX2, halfHeight - plateH / 2, plateX2, halfHeight + plateH / 2);
}

// ---------- control region ----------
function drawControls(Vdc, Vm, f) {
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(RIGHT, CENTER);
  text('DC offset VDC: ' + Vdc.toFixed(1) + ' V', sliderLeftMargin - 10, drawHeight + 19);
  text('AC amplitude Vm: ' + Vm.toFixed(1) + ' V', sliderLeftMargin - 10, drawHeight + 49);
  text('Frequency f: ' + f + ' Hz', sliderLeftMargin - 10, drawHeight + 79);

  let by = drawHeight + 97;
  textSize(15);
  labelsButton.x = 10;
  labelsButton.y = by;
  labelsButton.w = textWidth('Component Labels: Off') + 22;
  resetButton.x = labelsButton.x + labelsButton.w + 8;
  resetButton.y = by;
  resetButton.w = textWidth('Reset') + 22;
  drawButton(labelsButton, showLabels ? 'Component Labels: On' : 'Component Labels: Off', showLabels);
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
  if (isOver(labelsButton)) {
    showLabels = !showLabels;
  } else if (isOver(resetButton)) {
    dcSlider.value(DEFAULT_VDC);
    acSlider.value(DEFAULT_VM);
    freqSlider.value(DEFAULT_F);
    showLabels = true;
  }
}

// ---------- responsive sizing ----------
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  dcSlider.size(canvasWidth - sliderLeftMargin - margin);
  acSlider.size(canvasWidth - sliderLeftMargin - margin);
  freqSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

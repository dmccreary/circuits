// Natural Frequency Calculator MicroSim
// Students calculate natural frequency from inductance and capacitance values
// and observe the inverse square root relationship f0 = 1 / (2*PI*sqrt(LC))
// Bloom Level: Apply (L3) - calculate
// MicroSim template version 2026.02

// global variables for width and height
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

// Sliders
let inductanceSlider;
let capacitanceSlider;

// Logarithmic slider range: 0 to 1000 mapped to log scale
let sliderSteps = 1000;

// Inductance range: 0.1 mH to 100 mH (1e-4 to 0.1 H)
let L_min = 1e-4;
let L_max = 0.1;

// Capacitance range: 0.01 uF to 100 uF (1e-8 to 1e-4 F)
let C_min = 1e-8;
let C_max = 1e-4;

// Compute default slider positions for L=10mH and C=1uF
// L=10mH=0.01H: t = (log10(0.01)-log10(1e-4))/(log10(0.1)-log10(1e-4)) = (-2-(-4))/(-1-(-4)) = 2/3
let defaultL = Math.round(sliderSteps * 2 / 3); // 667
// C=1uF=1e-6F: t = (log10(1e-6)-log10(1e-8))/(log10(1e-4)-log10(1e-8)) = (-6-(-8))/(-4-(-8)) = 2/4
let defaultC = Math.round(sliderSteps * 2 / 4); // 500

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // Create logarithmic sliders (linear 0-1000, mapped to log scale)
  inductanceSlider = createSlider(0, sliderSteps, defaultL, 1);
  inductanceSlider.position(sliderLeftMargin, drawHeight + 5);
  inductanceSlider.size(canvasWidth - sliderLeftMargin - margin);

  capacitanceSlider = createSlider(0, sliderSteps, defaultC, 1);
  capacitanceSlider.position(sliderLeftMargin, drawHeight + 40);
  capacitanceSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Interactive calculator showing natural frequency of an LC circuit. Adjust inductance and capacitance sliders to see how natural frequency changes.', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing area background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area background
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get logarithmic values from sliders
  let L = logMap(inductanceSlider.value(), 0, sliderSteps, L_min, L_max);
  let C = logMap(capacitanceSlider.value(), 0, sliderSteps, C_min, C_max);

  // Calculate natural frequency
  let LC = L * C;
  let omega0 = 1.0 / sqrt(LC);
  let f0 = omega0 / (2 * PI);
  let period = 1.0 / f0;

  // Format display values
  let L_display = formatEngineering(L, 'H');
  let C_display = formatEngineering(C, 'F');

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(24);
  text('Natural Frequency Calculator', canvasWidth / 2, 8);

  // Reset text defaults
  textSize(defaultTextSize);
  textAlign(LEFT, TOP);

  // ---- Calculator Display Region ----
  let calcX = margin;
  let calcY = 42;
  let calcW = canvasWidth - 2 * margin;
  let calcH = 170;

  // Calculator background panel
  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(calcX, calcY, calcW, calcH, 10);

  noStroke();
  fill(0);
  textSize(15);

  let lineY = calcY + 14;
  let lineSpacing = 22;
  let col1 = calcX + 15;

  // Component values display
  text('L = ' + L_display, col1, lineY);
  text('C = ' + C_display, col1 + calcW / 2 - 15, lineY);
  lineY += lineSpacing;

  // LC product
  text('LC = ' + formatEngineering(LC, 's\u00B2'), col1, lineY);
  lineY += lineSpacing + 2;

  // Separator line
  stroke(200);
  line(col1, lineY, calcX + calcW - 15, lineY);
  noStroke();
  lineY += 6;

  // Step-by-step calculation
  fill(0, 0, 180);
  text('\u03C9\u2080 = 1/\u221A(LC) = 1/\u221A(' + LC.toExponential(3) + ')', col1, lineY);
  lineY += lineSpacing;
  text('\u03C9\u2080 = ' + formatWithUnit(omega0, 'rad/s'), col1, lineY);
  lineY += lineSpacing;

  fill(180, 0, 0);
  textSize(16);
  text('f\u2080 = \u03C9\u2080/(2\u03C0) = ' + formatWithUnit(f0, 'Hz'), col1, lineY);
  lineY += lineSpacing;

  textSize(15);
  fill(0, 120, 0);
  text('T = 1/f\u2080 = ' + formatEngineering(period, 's'), col1, lineY);

  // ---- Log-Log Plot Region ----
  let plotLeft = margin + 50;
  let plotRight = canvasWidth - margin;
  let plotTop2 = calcY + calcH + 20;
  let plotBottom2 = drawHeight - 15;
  let plotW = plotRight - plotLeft;
  let plotH = plotBottom2 - plotTop2;

  // Plot background
  fill(255);
  stroke(200);
  strokeWeight(1);
  rect(plotLeft, plotTop2, plotW, plotH);

  // Plot title
  noStroke();
  fill(0);
  textSize(13);
  textAlign(CENTER, BOTTOM);
  text('f\u2080 vs LC Product (log-log)', (plotLeft + plotRight) / 2, plotTop2 - 2);

  // LC and f0 ranges for plot axes
  let lcMin = L_min * C_min; // 1e-12
  let lcMax = L_max * C_max; // 1e-5
  let f0Max = 1 / (2 * PI * sqrt(lcMin));
  let f0Min = 1 / (2 * PI * sqrt(lcMax));

  let logLCmin = log(lcMin) / log(10);
  let logLCmax = log(lcMax) / log(10);
  let logFmin = log(f0Min) / log(10);
  let logFmax = log(f0Max) / log(10);

  // Draw grid lines
  textSize(9);

  // Vertical grid lines (LC axis)
  textAlign(CENTER, TOP);
  for (let exp = ceil(logLCmin); exp <= floor(logLCmax); exp++) {
    let px = map(exp, logLCmin, logLCmax, 0, plotW);
    stroke(230);
    strokeWeight(1);
    line(plotLeft + px, plotTop2, plotLeft + px, plotBottom2);
    noStroke();
    fill(120);
    text('1e' + exp, plotLeft + px, plotBottom2 + 2);
  }

  // Horizontal grid lines (f0 axis)
  textAlign(RIGHT, CENTER);
  for (let exp = ceil(logFmin); exp <= floor(logFmax); exp++) {
    let py = map(exp, logFmin, logFmax, plotH, 0);
    stroke(230);
    strokeWeight(1);
    line(plotLeft, plotTop2 + py, plotRight, plotTop2 + py);
    noStroke();
    fill(120);
    text('1e' + exp, plotLeft - 3, plotTop2 + py);
  }

  // Draw curve: f0 = 1/(2*pi*sqrt(LC))
  stroke(0, 100, 200);
  strokeWeight(2);
  noFill();
  beginShape();
  for (let px = 0; px <= plotW; px += 2) {
    let logLC = map(px, 0, plotW, logLCmin, logLCmax);
    let lcVal = pow(10, logLC);
    let fVal = 1 / (2 * PI * sqrt(lcVal));
    let py = map(log(fVal) / log(10), logFmin, logFmax, plotH, 0);
    vertex(plotLeft + px, plotTop2 + py);
  }
  endShape();

  // Current point on curve
  let curLogLC = log(LC) / log(10);
  let curLogF = log(f0) / log(10);
  let dotX = plotLeft + map(curLogLC, logLCmin, logLCmax, 0, plotW);
  let dotY = plotTop2 + map(curLogF, logFmin, logFmax, plotH, 0);
  dotX = constrain(dotX, plotLeft, plotRight);
  dotY = constrain(dotY, plotTop2, plotBottom2);

  // Crosshair lines
  stroke(255, 0, 0, 80);
  strokeWeight(1);
  line(dotX, plotTop2, dotX, plotBottom2);
  line(plotLeft, dotY, plotRight, dotY);

  // Red dot
  fill(255, 0, 0);
  noStroke();
  circle(dotX, dotY, 10);

  // ---- Control Area Labels ----
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  text('L: ' + L_display, 10, drawHeight + 15);
  text('C: ' + C_display, 10, drawHeight + 50);
}

// Map a linear slider value (0-1000) to a logarithmic scale
function logMap(value, inMin, inMax, outMin, outMax) {
  let t = (value - inMin) / (inMax - inMin);
  let logMin = log(outMin) / log(10);
  let logMax = log(outMax) / log(10);
  return pow(10, logMin + t * (logMax - logMin));
}

// Format a value in engineering notation with SI prefix
function formatEngineering(value, unit) {
  let prefixes = [
    { exp: -12, prefix: 'p' },
    { exp: -9,  prefix: 'n' },
    { exp: -6,  prefix: '\u00B5' },
    { exp: -3,  prefix: 'm' },
    { exp: 0,   prefix: '' },
    { exp: 3,   prefix: 'k' },
    { exp: 6,   prefix: 'M' },
    { exp: 9,   prefix: 'G' }
  ];

  if (value === 0) return '0 ' + unit;

  let absVal = abs(value);
  let bestPrefix = prefixes[0];

  for (let i = prefixes.length - 1; i >= 0; i--) {
    if (absVal >= pow(10, prefixes[i].exp)) {
      bestPrefix = prefixes[i];
      break;
    }
  }

  let scaled = value / pow(10, bestPrefix.exp);
  let decimals = scaled >= 100 ? 1 : (scaled >= 10 ? 2 : 3);
  return scaled.toFixed(decimals) + ' ' + bestPrefix.prefix + unit;
}

// Format a value with SI prefix and append a unit string
function formatWithUnit(value, unit) {
  if (value >= 1e9) return (value / 1e9).toFixed(2) + ' G' + unit;
  if (value >= 1e6) return (value / 1e6).toFixed(2) + ' M' + unit;
  if (value >= 1e3) return (value / 1e3).toFixed(2) + ' k' + unit;
  if (value >= 1) return value.toFixed(2) + ' ' + unit;
  if (value >= 1e-3) return (value * 1e3).toFixed(2) + ' m' + unit;
  if (value >= 1e-6) return (value * 1e6).toFixed(2) + ' \u00B5' + unit;
  return value.toExponential(3) + ' ' + unit;
}

// Responsive resize
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  inductanceSlider.size(canvasWidth - sliderLeftMargin - margin);
  capacitanceSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

// Complex Number Visualizer MicroSim
// CANVAS_HEIGHT: 560
// Students convert a complex number between rectangular form z = a + jb
// and polar form z = r at angle theta, with the calculation shown step by step.
//   r = sqrt(a^2 + b^2)      theta = atan(b/a) with quadrant adjustment
//   a = r cos(theta)         b = r sin(theta)
// Engineers write j (not i) for sqrt(-1) because i is reserved for current.
// Bloom Level: Apply (L3) - calculate
// MicroSim template version 2026.03

// global variables for width and height
let containerWidth; // calculated from the container on init and on resize
let canvasWidth = 400;
let drawHeight = 450;
// control region: two slider rows plus one button row
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;

let margin = 25;
let sliderLeftMargin = 200;
let defaultTextSize = 16;

// the complex plane shows -7.5 to +7.5 on both axes
const PLANE_RANGE = 7.5;

// colors (text uses the darker shade of each for contrast)
const REAL_COLOR = 'royalblue';
const IMAG_COLOR = 'forestgreen';
const IMAG_TEXT = 'darkgreen';
const MAG_COLOR = 'crimson';
const ANGLE_COLOR = 'darkviolet';

// state: the number is stored in both forms; the entry mode decides which is the source
let mode = 'rect';        // 'rect' = enter a and b, 'polar' = enter r and theta
let a = 3, b = 4;         // default z = 3 + j4, the 3-4-5 triangle
let r = 5, thetaDeg = 53.13;
let answerHidden = false; // quiz mode hides the converted form

let aSlider, bSlider, rSlider, thetaSlider;

// canvas-drawn buttons (repo standard: no DOM buttons)
let modeButton = { x: 0, y: 0, w: 0, h: 28 };
let quizButton = { x: 0, y: 0, w: 0, h: 28 };
let answerButton = { x: 0, y: 0, w: 0, h: 28 };

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  textSize(defaultTextSize);

  // rectangular entry sliders
  aSlider = createSlider(-5, 5, 3, 0.1);
  aSlider.position(sliderLeftMargin, drawHeight + 8);
  aSlider.input(() => { a = aSlider.value(); updateFromRect(); });
  bSlider = createSlider(-5, 5, 4, 0.1);
  bSlider.position(sliderLeftMargin, drawHeight + 38);
  bSlider.input(() => { b = bSlider.value(); updateFromRect(); });

  // polar entry sliders
  rSlider = createSlider(0, 7, 5, 0.1);
  rSlider.position(sliderLeftMargin, drawHeight + 8);
  rSlider.input(() => { r = rSlider.value(); updateFromPolar(); });
  thetaSlider = createSlider(-180, 180, 53, 1);
  thetaSlider.position(sliderLeftMargin, drawHeight + 38);
  thetaSlider.input(() => { thetaDeg = thetaSlider.value(); updateFromPolar(); });

  resizeSliders();
  updateFromRect();
  showModeSliders();

  describe('A complex plane showing one complex number as a point with its real part, imaginary part, magnitude vector and angle arc. A side panel shows the number in rectangular and polar form together with the worked conversion. Sliders enter the number in either form.', LABEL);
}

// ---------- conversions ----------
function updateFromRect() {
  r = Math.sqrt(a * a + b * b);
  // atan2 applies the quadrant adjustment and returns -180..180 degrees
  thetaDeg = r === 0 ? 0 : degrees(Math.atan2(b, a));
}

function updateFromPolar() {
  let th = radians(thetaDeg);
  a = r * Math.cos(th);
  b = r * Math.sin(th);
}

function showModeSliders() {
  if (mode === 'rect') {
    aSlider.show(); bSlider.show(); rSlider.hide(); thetaSlider.hide();
  } else {
    aSlider.hide(); bSlider.hide(); rSlider.show(); thetaSlider.show();
  }
}

// number formatting with a true minus sign and no "-0.00"
function fmt(v, digits) {
  let s = Math.abs(v).toFixed(digits);
  if (parseFloat(s) === 0) return s;
  return (v < 0 ? '−' : '') + s;
}

// an entered value: one decimal when it sits on the slider grid, two when it was
// carried over exactly from the other form
function fmtEntry(v) {
  return Math.abs(v * 10 - Math.round(v * 10)) < 1e-6 ? fmt(v, 1) : fmt(v, 2);
}

// an entered angle: whole degrees on the slider grid, otherwise two decimals
function fmtAngle(v) {
  return (Math.abs(v - Math.round(v)) < 1e-6 ? fmt(v, 0) : fmt(v, 2)) + '°';
}

// rectangular form string, e.g. "3.00 − j4.00"
function rectString(digits) {
  return fmt(a, digits) + (b < 0 && parseFloat(Math.abs(b).toFixed(digits)) !== 0 ? ' − j' : ' + j') + Math.abs(b).toFixed(digits);
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
  text('Complex Number Visualizer', canvasWidth / 2, 8);

  // layout: square complex plane on the left, display panel on the right
  let planeTop = 40;
  let planeSize = Math.min(drawHeight - planeTop - 10, Math.max(170, canvasWidth - 270));
  let planeLeft = 10;
  let panelLeft = planeLeft + planeSize + 10;
  let panelW = canvasWidth - panelLeft - 10;

  drawPlane(planeLeft, planeTop, planeSize);
  drawPanel(panelLeft, planeTop, panelW, drawHeight - planeTop - 10);
  drawControls();
}

// ---------- complex plane ----------
function drawPlane(px, py, size) {
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(px, py, size, size);

  let cx = px + size / 2;
  let cy = py + size / 2;
  let u = size / (2 * PLANE_RANGE);   // pixels per unit
  let small = size < 300;

  // grid every unit, labels every 2 units
  textSize(small ? 10 : 12);
  for (let k = -7; k <= 7; k++) {
    stroke(k === 0 ? 'gray' : 'gainsboro');
    strokeWeight(k === 0 ? 1.5 : 1);
    line(cx + k * u, py, cx + k * u, py + size);
    line(px, cy - k * u, px + size, cy - k * u);
  }
  noStroke();
  fill('dimgray');
  for (let k = -6; k <= 6; k += 2) {
    if (k === 0) continue;
    textAlign(CENTER, TOP);
    text((k < 0 ? '−' : '') + Math.abs(k), cx + k * u, cy + 3);
    textAlign(RIGHT, CENTER);
    text((k < 0 ? '−j' : 'j') + Math.abs(k), cx - 4, cy - k * u);
  }
  textAlign(RIGHT, BOTTOM);
  text('Real axis', px + size - 4, cy - 3);
  textAlign(LEFT, TOP);
  text('Imaginary axis', cx + 5, py + 3);

  // the point
  let zx = cx + a * u;
  let zy = cy - b * u;
  let th = radians(thetaDeg);

  // dotted projections onto each axis
  drawingContext.setLineDash([3, 4]);
  strokeWeight(1.5);
  stroke(IMAG_COLOR);
  line(zx, zy, zx, cy);
  stroke(REAL_COLOR);
  line(zx, zy, cx, zy);
  drawingContext.setLineDash([]);

  // real part along the real axis (blue), imaginary part along the imaginary axis (green)
  strokeWeight(5);
  stroke(REAL_COLOR);
  line(cx, cy, zx, cy);
  stroke(IMAG_COLOR);
  line(cx, cy, cx, zy);

  // angle arc from the positive real axis to the vector
  let arcR = Math.max(18, 1.3 * u);
  if (r > 0.05 && Math.abs(thetaDeg) > 0.01) {
    noFill();
    stroke(ANGLE_COLOR);
    strokeWeight(2);
    // p5 measures angles clockwise on screen, so the math angle is negated
    if (th > 0) arc(cx, cy, 2 * arcR, 2 * arcR, -th, 0);
    else arc(cx, cy, 2 * arcR, 2 * arcR, 0, -th);
  }

  // magnitude vector (red arrow)
  if (r > 0.05) {
    stroke(MAG_COLOR);
    strokeWeight(3);
    line(cx, cy, zx, zy);
    fill(MAG_COLOR);
    noStroke();
    push();
    translate(zx, zy);
    rotate(-th);
    triangle(0, 0, -12, -5, -12, 5);
    pop();
  }
  // the point z
  fill('black');
  noStroke();
  circle(zx, zy, 9);

  // short color-coded tags; the values are shown in the panel on the right
  textStyle(BOLD);
  textSize(small ? 12 : 15);
  // a: beside the blue segment, on the side away from the point
  if (Math.abs(a) * u > 14) tag('a', (cx + zx) / 2, cy + (b >= 0 ? 15 : -15), REAL_COLOR);
  // b: beside the green segment, on the side away from the point
  if (Math.abs(b) * u > 14) tag('b', cx + (a >= 0 ? -13 : 13), (cy + zy) / 2, IMAG_TEXT);
  if (r * u > 30) {
    // r: beside the vector, on the side facing the imaginary axis
    // (or the other side when the vector lies almost on that axis, to stay clear of the b tag)
    let side = (a >= 0) === (b >= 0) ? 1 : -1;
    if (Math.abs(a) * u < 20) side = -side;
    let nx = -Math.sin(th), ny = -Math.cos(th);   // screen normal, left of the vector
    tag('r', cx + 0.6 * (zx - cx) + side * nx * 13, cy + 0.6 * (zy - cy) + side * ny * 13, MAG_COLOR);
    // theta: just outside the arc, never more than 40 degrees from the real axis
    if (Math.abs(thetaDeg) > 0.01) {
      let dir = constrain(th / 2, -radians(40), radians(40));
      tag('θ', cx + (arcR + 12) * Math.cos(dir), cy - (arcR + 12) * Math.sin(dir), ANGLE_COLOR);
    }
  }
  // z: beyond the tip of the vector
  let tagR = r * u + 15;
  tag('z', constrain(cx + tagR * Math.cos(th), px + 10, px + size - 10),
           constrain(cy - tagR * Math.sin(th), py + 10, py + size - 10), 'black');
  textStyle(NORMAL);
}

// one-letter tag on a translucent white pad
function tag(label, x, y, col) {
  let w = textWidth(label) + 6;
  noStroke();
  fill(255, 255, 255, 215);
  rect(x - w / 2, y - 9, w, 18, 4);
  fill(col);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ---------- display panel: both forms and the worked conversion ----------
function drawPanel(px, py, pw, ph) {
  fill(255, 255, 255, 235);
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 10);

  let small = pw < 250;
  let fs = small ? 12 : 15;       // body text
  let lh = small ? 18 : 23;       // line height
  let x = px + 12;
  let y = py + 12;
  let hidePolar = answerHidden && mode === 'rect';
  let hideRect = answerHidden && mode === 'polar';

  noStroke();
  textAlign(LEFT, TOP);

  // --- the two forms ---
  textStyle(BOLD);
  textSize(fs);
  fill('black');
  text('Rectangular form' + (mode === 'rect' ? '  (entered)' : ''), x, y);
  y += lh;
  textSize(fs + 3);
  fill(REAL_COLOR);
  text(hideRect ? 'z = ?  +  j ?' : 'z = ' + rectString(2), x, y);
  y += lh + 8;

  textSize(fs);
  fill('black');
  text('Polar form' + (mode === 'polar' ? '  (entered)' : ''), x, y);
  y += lh;
  textSize(fs + 3);
  fill(MAG_COLOR);
  let polarText;
  if (hidePolar) polarText = 'z = ?  ∠  ?°';
  else if (r < 0.005) polarText = 'z = 0  (angle undefined)';
  else polarText = 'z = ' + fmt(r, 2) + ' ∠ ' + fmt(thetaDeg, 2) + '°';
  text(polarText, x, y);
  y += lh + 6;
  textStyle(NORMAL);

  // divider
  stroke('silver');
  line(x, y, px + pw - 12, y);
  noStroke();
  y += 9;

  // --- the worked conversion ---
  textSize(fs);
  textStyle(BOLD);
  fill('black');
  text(mode === 'rect' ? 'Convert to polar' : 'Convert to rectangular', x, y);
  textStyle(NORMAL);
  y += lh + 2;

  let fsCalc = small ? 11.5 : 14;
  textSize(fsCalc);
  let lhc = small ? 17 : 21;
  if (mode === 'rect') {
    fill(MAG_COLOR);
    text('r = √(a² + b²)', x, y); y += lhc;
    text('   = √(' + squaredText(a) + ' + ' + squaredText(b) + ') = ' + (answerHidden ? '?' : fmt(r, 2)), x, y);
    y += lhc + 6;
    fill(ANGLE_COLOR);
    text('θ = tan⁻¹(b / a)', x, y); y += lhc;
    if (r < 0.005) {
      text('   undefined when r = 0', x, y); y += lhc;
    } else if (Math.abs(a) < 0.005) {
      // a = 0: the point is on the imaginary axis
      text('   a = 0, so θ = ' + (answerHidden ? '?' : (b > 0 ? '90°' : '−90°')), x, y); y += lhc;
      fill('dimgray');
      text('   (on the imaginary axis)', x, y); y += lhc;
    } else {
      let principal = degrees(Math.atan(b / a));   // calculator result, -90..90 degrees
      text('   = tan⁻¹(' + paren(b) + ' / ' + paren(a) + ')', x, y); y += lhc;
      text(answerHidden ? '   = ?' : '   = ' + fmt(principal, 2) + '°  (calculator)', x, y); y += lhc + 4;
      // quadrant adjustment
      fill('dimgray');
      let quadrant, adjust;
      if (a > 0) {
        quadrant = b >= 0 ? 'Quadrant I' : 'Quadrant IV';
        adjust = 'a > 0: no adjustment';
      } else if (b >= 0) {
        quadrant = 'Quadrant II';
        adjust = 'a < 0: add 180°';
      } else {
        quadrant = 'Quadrant III';
        adjust = 'a < 0: subtract 180°';
      }
      if (small) {
        text(quadrant + ':', x, y); y += lhc;
        text(adjust, x, y); y += lhc;
      } else {
        text(quadrant + ' — ' + adjust, x, y); y += lhc;
      }
      fill(ANGLE_COLOR);
      textStyle(BOLD);
      text(answerHidden ? 'θ = ?' : 'θ = ' + fmt(thetaDeg, 2) + '°', x, y); y += lhc;
      textStyle(NORMAL);
    }
  } else {
    let thIn = fmtAngle(thetaDeg);
    fill(REAL_COLOR);
    text('a = r cos θ', x, y); y += lhc;
    text('   = ' + fmtEntry(r) + ' × cos(' + thIn + ')', x, y); y += lhc;
    text(answerHidden ? '   = ?' : '   = ' + fmt(a, 2), x, y); y += lhc + 6;
    fill(IMAG_TEXT);
    text('b = r sin θ', x, y); y += lhc;
    text('   = ' + fmtEntry(r) + ' × sin(' + thIn + ')', x, y); y += lhc;
    text(answerHidden ? '   = ?' : '   = ' + fmt(b, 2), x, y); y += lhc;
  }

  // quiz prompt at the bottom of the panel
  if (answerHidden) {
    fill('black');
    textStyle(ITALIC);
    textSize(small ? 11 : 13);
    textAlign(LEFT, BOTTOM);
    text('Work it out, then click Show Answer.', x, py + ph - 8, pw - 20);
    textStyle(NORMAL);
  }
}

// "3.0²" or "(−4.0)²"  (named squaredText because p5.js already defines sq())
function squaredText(v) {
  return paren(v) + '²';
}

// negative numbers in parentheses inside a formula
function paren(v) {
  let s = fmtEntry(v);
  return s.startsWith('−') ? '(' + s + ')' : s;
}

// ---------- control region ----------
function drawControls() {
  noStroke();
  fill('black');
  textSize(defaultTextSize);
  textAlign(RIGHT, CENTER);
  if (mode === 'rect') {
    text('Real part a: ' + fmtEntry(a), sliderLeftMargin - 10, drawHeight + 19);
    text('Imaginary part b: ' + fmtEntry(b), sliderLeftMargin - 10, drawHeight + 49);
  } else {
    text('Magnitude r: ' + fmtEntry(r), sliderLeftMargin - 10, drawHeight + 19);
    text('Angle θ: ' + fmtAngle(thetaDeg), sliderLeftMargin - 10, drawHeight + 49);
  }

  let small = canvasWidth < 520;
  let by = drawHeight + 74;
  textSize(small ? 12.5 : 15);
  modeButton.x = 10;
  modeButton.y = by;
  modeButton.w = textWidth('Enter: Rectangular (a, b)') + 22;
  quizButton.x = modeButton.x + modeButton.w + 8;
  quizButton.y = by;
  quizButton.w = textWidth('New Problem') + 22;
  answerButton.x = quizButton.x + quizButton.w + 8;
  answerButton.y = by;
  answerButton.w = textWidth('Show Answer') + 22;
  drawButton(modeButton, mode === 'rect' ? 'Enter: Rectangular (a, b)' : 'Enter: Polar (r, θ)', false);
  drawButton(quizButton, 'New Problem', false);
  drawButton(answerButton, answerHidden ? 'Show Answer' : 'Hide Answer', answerHidden);
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
  if (isOver(modeButton)) {
    // switch entry mode but keep the same complex number
    if (mode === 'rect') {
      mode = 'polar';
      rSlider.value(r);
      thetaSlider.value(thetaDeg);
    } else {
      mode = 'rect';
      aSlider.value(a);
      bSlider.value(b);
    }
    showModeSliders();
  } else if (isOver(quizButton)) {
    newProblem();
  } else if (isOver(answerButton)) {
    answerHidden = !answerHidden;
  }
}

// quiz mode: a random number in the current entry form, with the other form hidden
function newProblem() {
  if (mode === 'rect') {
    do {
      a = Math.floor(Math.random() * 11) - 5;
      b = Math.floor(Math.random() * 11) - 5;
    } while (a === 0 && b === 0);
    aSlider.value(a);
    bSlider.value(b);
    updateFromRect();
  } else {
    r = Math.floor(Math.random() * 7) + 1;
    thetaDeg = (Math.floor(Math.random() * 24) - 11) * 15;   // -165 to 180 in 15 degree steps
    rSlider.value(r);
    thetaSlider.value(thetaDeg);
    updateFromPolar();
  }
  answerHidden = true;
}

// ---------- responsive sizing ----------
function resizeSliders() {
  let w = canvasWidth - sliderLeftMargin - margin;
  aSlider.size(w);
  bSlider.size(w);
  rSlider.size(w);
  thetaSlider.size(w);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  resizeSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}

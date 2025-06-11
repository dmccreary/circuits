// testing of on/off electical switch functions
let canvasWidth;                      // Initial width that will be updated responsively
let drawHeight = 400;                       // Height of simulation/drawing area
let controlHeight = 50;                     // Height of controls region
let canvasHeight = drawHeight + controlHeight; // Total canvas height
let margin = 25;                            // Margin for visual elements

// Global variables for responsive design
let containerWidth;                         // Calculated from container upon resize
let containerHeight = canvasHeight;         // Usually fixed height on page

// test switch
let isSwitchClosed = false;

// y offset of the horizontal line to test horizontal switches
let topLine = 50;
// x offsent of the vertical line to test vertical switches
let leftLine = 100;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  // create toggle button that will toggle all the switches
  buttonToggle = createButton('Toggle All Switchs');
  buttonToggle.position(20, drawHeight + 10);
  buttonToggle.mousePressed(toggleSwitch);
}

function toggleSwitch() {
  isSwitchClosed = !isSwitchClosed;
}

// small functions to make it easier to draw horizontal and vertical lines
// horizontal line
function hline(x,y,w) {
  strokeWeight(1);
  line(x, y, x+w, y);
}

// vertical line
function vline(x,y,w) {
  strokeWeight(1);
  line(x, y, x, y+w);
}

// draw an on/off switch at (x,y) of length l
// Orientation parameter "HORIZ" or "VERT"
function drawSwitch(x, y, len, isClosed, orientation) {
  circle(x, y, 4);
  if (orientation == HORIZONTAL) {
    circle(x+len, y, 4)
    stroke(0);
    strokeWeight(3);
    fill('black');
    if(isClosed) {
      line(x, y, x + len, y);
      strokeWeight(0);
      text('on', x+15, y-10)
    } else {
      line(x, y, x + len * .8, y - len * .6);
      strokeWeight(0);
      text('off', x + 20, y);
    }
    // Vert
  } else {
    circle(x, y+len, 4)
    stroke(0);
    strokeWeight(2);
    fill('black');
    if(isClosed) {
      line(x, y, x, y + len);
      strokeWeight(0);
      text('on',x+7,y+29);
    } else { 
      line(x, y, x + len*.8, y + len * .6);
      strokeWeight(0);
      text('off', x , y+29);
    }
  }
}

function draw() {
  // Draw simulation area background aliceblue with a light gray border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, containerWidth, drawHeight, 5);
  
  // Draw controls area background in white with a light gray border
  fill('white');
  rect(0, drawHeight, containerWidth, controlHeight, 5);
  
  // draw two horizontal switches and toggle their state
  // x,y and width
  hline(0, topLine, 100);
  // closed - on - 1
  drawSwitch(100, topLine, 50, isSwitchClosed ? 1 : 0, 'HORIZ')
  hline(150, topLine, 50);
  drawSwitch(200, topLine, 50, isSwitchClosed ? 0 : 1, 'HORIZ')
  hline(250, topLine, 400);
  
  // draw two vertical switches and toggle their state
  vline(leftLine, 100, 100);
  // on
  drawSwitch(leftLine, 200, 50, isSwitchClosed ? 1 : 0, "VERT");
  vline(leftLine, 250, 50);
  drawSwitch(leftLine, 300, 50, isSwitchClosed ? 0 : 1, "VERT");
  vline(leftLine, 350, 50);
}

// Required functions for responsive design
function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
  
  // Resize sliders to match new width
  speedSlider.size(containerWidth - sliderLeftMargin - 15);
  spacingSlider.size(containerWidth - sliderLeftMargin - 15);
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
/* Circuit Library for p5.js
 * This library provides functions to draw basic circuit components
 * such as resistors, capacitors, inductors, and batteries.
 * It supports both horizontal and vertical orientations, and is responsive
 * to different line widths and labels.
 * Dan McCreary - June 2025
 */
// Global variables for wire animation
let isRunning = false;
// Track animation time independently and update in draw loop with deltaTime
let animationTime = 0; 

// Default line for line width for all components
// overridden by individual component functions
let defaultLineWidth = 2;

// draw a black line with red circles as current from (x1,y1) to (y1,y2) 
// the speed of the electrons is controlled by the speed parameter
// Note that drawAnimatedWire function depends on the global variable animationTime
// which should be updated in the main draw loop like this:
// if (isRunning) {
//    animationTime += deltaTime;
// }
// Note that deltaTime is a p5.js builtin global that contains the amount of time 
// it took draw() to execute during the previous frame.

function drawAnimatedWire(x1, y1, x2, y2, speed, spacing) {
  // Calculate wire properties
  let distance = dist(x1, y1, x2, y2);
  let spacingPixels = spacing * 50; // Convert spacing to pixels
  let numElectrons = Math.floor(distance / spacingPixels);
  
  // Draw the wire
  stroke('black');
  strokeWeight(lineWidth);
  line(x1, y1, x2, y2);
  
  // Draw moving electrons (always draw them, but only move when running)
  if (numElectrons > 0) {
    fill('red');
    noStroke();
    
    for (let i = 0; i <= numElectrons; i++) {
      // Calculate electron position using animationTime instead of millis()
      let electronPos = (animationTime * speed + i * spacingPixels) % distance;
      let x = lerp(x1, x2, electronPos / distance);
      let y = lerp(y1, y2, electronPos / distance);
      
      // Draw electron as red circle
      let electronSize = 8; // Fixed size for simplicity
      circle(x, y, electronSize);
    }
  }
}

// Single drawBattery function with orientation support using rotation
// Note this is not a DC Power source symbol
function drawBattery(x, y, width, height, orientation) {
  push(); // Save current drawing state
  
  if (orientation === HORIZONTAL) {
    // For horizontal orientation, rotate the coordinate system
    translate(x + width/2, y + height/2); // Move to center of battery
    rotate(PI/2); // Rotate 90 degrees
    // Draw vertical battery centered at origin, but swap width/height for rotation
    drawVerticalBatteryAtOrigin(-height/2, -width/2, height, width);
  } else {
    // For vertical orientation, draw normally
    drawVerticalBatteryAtOrigin(x, y, width, height);
  }
  
  pop(); // Restore drawing state
}

// Helper function that draws a vertical battery at the specified position
function drawVerticalBatteryAtOrigin(x, y, width, height) {
  let goldTopPercent = 0.30;
  
  strokeWeight(2);
  
  // Draw gold top section (positive terminal)
  fill('gold');
  stroke('black');
  rect(x, y, width, height * goldTopPercent);
  
  // Draw black bottom section (negative terminal)
  fill('black');
  rect(x, y + height * goldTopPercent, width, height * (1 - goldTopPercent));
  
  // Draw the minus sign in white on the black section
  stroke('white');
  strokeWeight(2);
  line(x + width/4, y + height * 0.9, 
       x + width * 3/4, y + height * 0.9);
  
  // Draw the plus sign in black on the gold section
  stroke('black');
  strokeWeight(2);
  // Horizontal line of the "+"
  line(x + width/5, y + height * 0.15, 
       x + width * 4/5, y + height * 0.15);
  // Vertical line of the "+"
  line(x + width/2, y + height * 0.05, 
       x + width/2, y + height * 0.25);
}

function drawCapacitor(x, y, cwidth, cheight, lineWidth, orientation, label) {
  push(); // Save drawing state
  
  // Light gray background for debugging
  // fill(230);
  stroke('black');
  strokeWeight(1);
  // outline box for debugging
  // rect(x, y, cwidth, cheight);
  
  strokeWeight(2);
  stroke('black');
  noFill();
  
  // The percent of the length of the capacitor that is taken by each end wire
  let endWirePercent = 0.2;
  let endWireLength = cwidth * endWirePercent;
  
  // Gap between capacitor plates (as percentage of total length)
  let plateGapPercent = 0.1;
  let plateGap = cwidth * plateGapPercent;
  
  // Length of each capacitor plate
  let plateLength = cheight * 0.6; // Plates are 60% of the height
  
  if (orientation === HORIZONTAL) {
    let centerY = y + cheight / 2;
    let centerX = x + cwidth / 2;
    let plateStartY = centerY - plateLength / 2;
    let plateEndY = centerY + plateLength / 2;
    
    // Left end wire
    line(x, centerY, centerX - plateGap / 2, centerY);
    
    // Right end wire 
    line(centerX + plateGap / 2, centerY, x + cwidth, centerY);
    
    // Left plate (vertical line)
    line(centerX - plateGap / 2, plateStartY, centerX - plateGap / 2, plateEndY);
    
    // Right plate (vertical line)
    line(centerX + plateGap / 2, plateStartY, centerX + plateGap / 2, plateEndY);
    
    // Draw label below capacitor
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(label, x + cwidth / 2, y + cheight + 5);
    
  } else if (orientation === VERTICAL) {
    let centerX = x + cwidth / 2;
    let centerY = y + cheight / 2;
    endWireLength = cheight * endWirePercent;
    plateGap = cheight * plateGapPercent;
    plateLength = cwidth * 0.6; // Plates are 60% of the width
    let plateStartX = centerX - plateLength / 2;
    let plateEndX = centerX + plateLength / 2;
    
    // Top end wire
    line(centerX, y, centerX, centerY - plateGap / 2);
    
    // Bottom end wire
    line(centerX, centerY + plateGap / 2, centerX, y + cheight);
    
    // Top plate (horizontal line)
    line(plateStartX, centerY - plateGap / 2, plateEndX, centerY - plateGap / 2);
    
    // Bottom plate (horizontal line)
    line(plateStartX, centerY + plateGap / 2, plateEndX, centerY + plateGap / 2);
    
    // Draw label to the right of capacitor
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(label, x + cwidth + 10, y + cheight / 2);
  }
  
  pop(); // Restore drawing state
}

function drawInductor(x, y, iwidth, iheight, lineWidth, orientation, label) {
  push(); // Save drawing state
  
  // Should be global parameter lineWidth
  strokeWeight(2);
  stroke('black');
  noFill();
  
  // The percent of the length of the inductor that is taken by each end wire
  let endWirePercent = 0.15;
  let endWireLength = iwidth * endWirePercent;
  
  // Number of coils in the inductor symbol
  let numCoils = 4;
  let coilsWidth = iwidth - 2 * endWireLength;
  let coilWidth = coilsWidth / numCoils;
  let coilRadius = iheight / 3; // Radius of each semicircular coil
  
  if (orientation === HORIZONTAL) {
    let centerY = y + iheight / 2;
    
    // Left end wire
    line(x, centerY, x + endWireLength, centerY);
    
    // Right end wire 
    line(x + iwidth - endWireLength, centerY, x + iwidth, centerY);
    
    // Draw coils (all facing upward like wound wire)
    for (let i = 0; i < numCoils; i++) {
      let coilStartX = x + endWireLength + i * coilWidth;
      let coilEndX = coilStartX + coilWidth;
      
      // Each coil is a semicircle sitting on the centerline, all facing upward
      arc(coilStartX + coilWidth/2, centerY, coilWidth, coilRadius * 2, PI, TWO_PI);
    }
    
    // Draw label below inductor
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(label, x + iwidth / 2, y + iheight + 5);
    
  } else if (orientation === VERTICAL) {
    let centerX = x + iwidth / 2;
    endWireLength = iheight * endWirePercent;
    coilsWidth = iheight - 2 * endWireLength;
    coilWidth = coilsWidth / numCoils;
    coilRadius = iwidth / 3; // Radius of each semicircular coil
    
    // Top end wire
    line(centerX, y, centerX, y + endWireLength);
    
    // Bottom end wire
    line(centerX, y + iheight - endWireLength, centerX, y + iheight);
    
    // Draw coils (all facing right like wound wire)
    for (let i = 0; i < numCoils; i++) {
      let coilStartY = y + endWireLength + i * coilWidth;
      let coilEndY = coilStartY + coilWidth;
      
      // Each coil is a semicircle sitting on the centerline, all facing right
      arc(centerX, coilStartY + coilWidth/2, coilRadius * 2, coilWidth, PI + HALF_PI, HALF_PI);
    }
    
    // Draw label to the right of inductor
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(label, x + iwidth + 10, y + iheight / 2);
  }
  
  pop(); // Restore drawing state
}

// draw an on/off switch at (x,y) of length l
// Orientation parameter HORIZONTAL or VERTICAL
function drawSwitch(x, y, len, isClosed, orientation) {
  circle(x, y, 4);
  // Draw the switch based on orientation
  if (orientation === HORIZONTAL) {
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
    // Draw the vertical switch
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

function drawResistor(x, y, rwidth, rheight, lineWidth, orientation, label) {
  push(); // Save drawing state
  
  // Light gray background
  fill(230);
  stroke('gray');
  strokeWeight(1);
  rect(x, y, rwidth, rheight);
  
  // Set stroke properties for the resistor - should be a parameter?
  strokeWeight(2);
  stroke('black');
  noFill();
  
  // The percent of the length of the resistor that is taken by each end wire
  let endWirePercent = 0.15;
  let endWireLength = rwidth * endWirePercent;
  
  // Number of zig-zag peaks (international symbol uses 6)
  let peaks = 6;
  let peakWidth = (rwidth - 2 * endWireLength) / peaks;
  let peakHeight = rheight / 3;
  
  if (orientation === HORIZONTAL) {
    let halfHeight = y + rheight / 2;
    
    // Left end wire
    line(x, halfHeight, x + endWireLength, halfHeight);
    
    // Right end wire 
    line(x + rwidth - endWireLength, halfHeight, x + rwidth, halfHeight);
    
    // Zigzag pattern
    beginShape();
    noFill();
    vertex(x + endWireLength, halfHeight);
    for (let i = 0; i <= peaks - 1; i++) {
      let xPos = x + endWireLength + i * peakWidth + peakWidth / 2;
      let yPos = (i % 2 === 0) ? 
          halfHeight - peakHeight : 
          halfHeight + peakHeight;
      vertex(xPos, yPos);
    }
    vertex(x + rwidth - endWireLength, halfHeight);
    endShape();
    
    // Draw label below resistor
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text(label, x + rwidth / 2, y + rheight + 5);
    
  } else if (orientation === VERTICAL) {
    let halfWidth = x + rwidth / 2;
    endWireLength = rheight * endWirePercent;
    peakHeight = rwidth / 3;
    peakWidth = (rheight - 2 * endWireLength) / peaks;
    
    // Top end wire
    line(halfWidth, y, halfWidth, y + endWireLength);
    
    // Bottom end wire
    line(halfWidth, y + rheight - endWireLength, halfWidth, y + rheight);
    
    // Zigzag pattern
    beginShape();
    noFill();
    vertex(halfWidth, y + endWireLength);
    for (let i = 0; i <= peaks - 1; i++) {
      let yPos = y + endWireLength + i * peakWidth + peakWidth / 2;
      let xPos = (i % 2 === 0) ?
        halfWidth - peakHeight : 
        halfWidth + peakHeight;
      vertex(xPos, yPos);
    }
    vertex(halfWidth, y + rheight - endWireLength);
    endShape();
    
    // Draw label to the right of resistor
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(label, x + rwidth + 10, y + rheight / 2);
  }
  
  pop(); // Restore drawing state
}
/*
Functions for drawing circuit components using the p5.js library
Author: Dan McCreary
Date: December 2025

Component Functions:
- drawAnimatedWire(x1, y1, x2, y2, speed, spacing): Draws a wire with animated current flow
- drawBattery(x, y, width, height, orientation, level): Draws a battery with specified level
- drawPhotoresistor(x, y, size): Draws a photoresistor symbol
- drawResistorHorizPhysical(x, y, w, h, bands): Draws a physical resistor with color bands
- drawResistor(x, y, width, height, lineWidth, orientation, label, labelPosition): Draws a schematic resistor
- drawInductor(x, y, width, height, lineWidth, orientation, label, labelPosition): Draws a schematic inductor
- drawCapacitor(x, y, width, height, lineWidth, orientation, label, labelPosition): Draws a schematic capacitor

Common Parameters:
- orientation: HORIZONTAL (0) or VERTICAL (1)
- labelPosition: TOP (101), BOTTOM (102), LEFT (37), or RIGHT (39)
- lineWidth: stroke weight for component drawing

*/

// Define orientation constants (not provided by p5.js)
// Using window assignment to avoid redeclaration errors
if (typeof HORIZONTAL === 'undefined') window.HORIZONTAL = 0;
if (typeof VERTICAL === 'undefined') window.VERTICAL = 1;

// Note: This library also uses p5.js constants: TOP, BOTTOM, LEFT, RIGHT
// These are automatically available when p5.js is loaded

// Draw a black line with red circles as current from (x1,y1) to (x2,y2)
// note that lineWidth is a global variable for the entire circuit
// speed is in pixels per second, spacing is in "circuit units" (1 unit = 50 pixels)
// Note that this fixes the electron spacing issue by calculating a single offset position
// and then drawing electrons at consistent intervals from that position.
function drawAnimatedWire(x1, y1, x2, y2, speed, spacing) {
  let distance = dist(x1, y1, x2, y2);
  let spacingPixels = spacing * 50; // Convert spacing to pixels

  // Draw the wire
  stroke('black');
  strokeWeight(lineWidth);
  line(x1, y1, x2, y2);

  // Draw moving electrons (always draw them, but only move when running)
  if (spacingPixels > 0 && distance > 0) {
    fill('red');
    noStroke();

    // Calculate single offset position (0 to spacingPixels)
    // This ensures all electrons maintain consistent spacing
    let firstPos = (animationTime * speed) % spacingPixels;

    // Draw electrons evenly spaced from that offset
    for (let pos = firstPos; pos < distance; pos += spacingPixels) {
      let t = pos / distance;
      let x = lerp(x1, x2, t);
      let y = lerp(y1, y2, t);
      circle(x, y, 8);
    }
  }
}

function drawBattery(x, y, width, height, orientation, level) {
  push(); // Save current transformation
  
  if (orientation === "horizontal") {
    // For horizontal orientation, we'll swap width and height and use rotation
    translate(x + height, y);
    rotate(PI/2);
    x = 0;
    y = 0;
    // Swap width and height
    let temp = width;
    width = height;
    height = temp;
  } else {
    translate(x, y);
    x = 0;
    y = 0;
  }
  
  // Calculate battery proportions
  let terminalHeight = height * 0.1; // Height of the positive terminal
  let bodyHeight = height - terminalHeight;
  let goldPercent = 0.4; // Proportion of the battery that is gold (positive)
  let goldHeight = bodyHeight * goldPercent;
  let blackHeight = bodyHeight * (1 - goldPercent);
  let batteryBorder = width * 0.1;
  let innerWidth = width - (batteryBorder * 2);
  
  // Draw battery outline
  strokeWeight(2);
  stroke(100);
  fill(240);
  rect(0, 0, width, height, 5, 5, 5, 5); // Rounded corners
  
  // Positive terminal (smaller rectangle at top)
  fill(220);
  noStroke();
  rect(width * 0.3, -terminalHeight, width * 0.4, terminalHeight);
  
  // Positive electrode (gold)
  fill('gold');
  rect(batteryBorder, batteryBorder, innerWidth, goldHeight);
  
  // Negative electrode (black)
  fill('black');
  rect(batteryBorder, batteryBorder + goldHeight, innerWidth, blackHeight);
  
  // Calculate battery level height/width
  let levelHeight = map(level, 0, 100, 0, bodyHeight - batteryBorder * 2);
  
  // Determine color based on battery level
  let levelColor;
  if (level < 20) {
    levelColor = color(255, 0, 0); // Red for low battery
  } else if (level < 50) {
    levelColor = color(255, 165, 0); // Orange for medium battery
  } else {
    levelColor = color(0, 255, 0); // Green for high battery
  }
  
  // Draw battery level (starting from bottom)
  fill(levelColor);
  rect(
    batteryBorder * 1.5, 
    height - batteryBorder - levelHeight, 
    innerWidth - batteryBorder, 
    levelHeight
  );
  
  // Draw battery terminals
  strokeWeight(2);
  stroke(50);
  
  // Positive terminal symbol (+)
  let centerX = width / 2;
  let plusY = batteryBorder + goldHeight / 2;
  line(centerX - 10, plusY, centerX + 10, plusY);
  line(centerX, plusY - 10, centerX, plusY + 10);
  
  // Negative terminal symbol (-)
  let minusY = batteryBorder + goldHeight + blackHeight / 2;
  stroke('gray');
  line(centerX - 10, minusY*1.2, centerX + 10, minusY*1.2);
  
  pop(); // Restore original transformation
}


function drawPhotoresistor(x, y, size) {
  let radius = size / 2;

  // Draw outer circle (component body)
  fill(240);
  stroke(0);
  strokeWeight(3);
  circle(x, y, size);

  // Draw inner light-sensitive area (slightly smaller circle)
  fill(255);
  strokeWeight(2);
  circle(x, y, size * 0.85);

  // Draw serpentine pattern (horizontal zigzag lines)
  drawSerpentinePattern(x, y, size * 0.45);

  // Draw two terminal connection points
  fill(200);
  stroke(0);
  strokeWeight(2);
  let terminalSize = size * 0.12;
  circle(x - radius * 0.6, y, terminalSize);
  circle(x + radius * 0.6, y, terminalSize);
}

function drawSerpentinePattern(x, y, patternWidth) {
  // Draw horizontal serpentine lines with curved corners
  let numLines = 7; // number of horizontal segments
  let lineSpacing = patternWidth * 0.25; // vertical spacing between lines
  let amplitude = patternWidth * 0.45; // how wide the zigzag goes
  let startY = y - (numLines - 1) * lineSpacing / 2;
  let cornerRadius = lineSpacing * 0.5; // radius for curved corners

  stroke(0);
  strokeWeight(5);
  noFill();

  // Draw the serpentine path as a continuous curved line
  beginShape();

  // Start at top left
  vertex(x - amplitude, startY);

  for (let i = 0; i < numLines - 1; i++) {
    let currentY = startY + i * lineSpacing;
    let nextY = startY + (i + 1) * lineSpacing;
    let midY = (currentY + nextY) / 2;

    if (i % 2 === 0) {
      // Moving right, then curve down on right side
      // Horizontal line to corner start
      vertex(x + amplitude - cornerRadius, currentY);
      // First curve: horizontal to vertical (top-right quarter circle)
      quadraticVertex(x + amplitude, currentY, x + amplitude, midY);
      // Second curve: vertical to horizontal (bottom-right quarter circle)
      quadraticVertex(x + amplitude, nextY, x + amplitude - cornerRadius, nextY);
    } else {
      // Moving left, then curve down on left side
      // Horizontal line to corner start
      vertex(x - amplitude + cornerRadius, currentY);
      // First curve: horizontal to vertical (top-left quarter circle)
      quadraticVertex(x - amplitude, currentY, x - amplitude, midY);
      // Second curve: vertical to horizontal (bottom-left quarter circle)
      quadraticVertex(x - amplitude, nextY, x - amplitude + cornerRadius, nextY);
    }
  }

  // Final horizontal line
  let lastY = startY + (numLines - 1) * lineSpacing;
  if ((numLines - 1) % 2 === 0) {
    vertex(x + amplitude, lastY);
  } else {
    vertex(x - amplitude, lastY);
  }

  endShape();
}

// draw a physical horizontal resistor with rounded corners
// Note this is not a logical resistor and there is no label
function drawResistorHorizPhysical(x, y, w, h, bands) {
  
  // Draw the wire below
  fill('black');
  rect(x-30, y+20, w+60, 10);
  // Draw the resistor body - the 5th parameter is corner roundness
  fill("tan");
  rect(x, y, w, h, 10);

  // Draw the bands
  for (let i = 0; i < bands.length; i++) {
    fill(bands[i]);
    rect(x + 20 + i * 30, y, 20, h);
  }
}

function drawResistor(x, y, rwidth, rheight, lineWidth, orientation, label, labelPosition) {
  strokeWeight(lineWidth);
  // the percent of the length of the resistor that is taken by each end wire
  endWirePercent = .15
  endWireLength = rwidth * endWirePercent
  // draw end wires
  halfHeight = y+rheight/2
  
  // number of zig-zag peaks
  // The international symbol is 6
  let peaks = 6;
  let peakWidth = (rwidth-2*endWireLength) / peaks;
  let peakHeight = rheight / 3;

  if (orientation === HORIZONTAL) {
    beginShape();
    // left end wire
    line(x, halfHeight,x + endWireLength,halfHeight);
    // right end wire 
    line(x + rwidth-endWireLength, halfHeight,
       x+rwidth,halfHeight);
    vertex(x+endWireLength, halfHeight);
    for(let i = 0; i <= peaks -1; i++) {
      let xPos = x+endWireLength + i * peakWidth + peakWidth/2;
      let yPos = (i % 2 === 0) ? 
          halfHeight - peakHeight : 
          halfHeight + peakHeight;
      vertex(xPos, yPos);
    }
    vertex(x + rwidth-endWireLength , halfHeight);
    endShape();
  } 
  else if (orientation === VERTICAL) {
    halfwidth = x+rwidth/2
    endWireLength = rheight * endWirePercent
    let peakHeight = rwidth / 3;
    let peakWidth = (rheight-2*endWireLength) / peaks;
    beginShape();
      // end wire
      vertex(halfwidth, y);
      vertex(halfwidth, y+endWireLength);
      for(let i = 0; i <= peaks - 1; i++) {
        let yPos = y+endWireLength + i * peakWidth + peakWidth/2;
        let xPos = (i % 2 === 0) ?
          halfwidth - peakHeight : 
          halfwidth + peakHeight;
        vertex(xPos, yPos);
      }
      // end wire
      vertex(halfwidth, y + rheight - endWireLength);
      vertex(halfwidth, y + rheight);
    endShape();
  }

  // Draw label if provided
  if (label) {
    push();
    noStroke();
    fill(0);

    // Scale font size based on resistor dimensions
    let resistorSize = orientation === HORIZONTAL ? rwidth : rheight;
    let fontSize = Math.max(8, Math.min(24, resistorSize * 0.12));
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    let labelX, labelY;
    let centerX = x + rwidth / 2;
    let centerY = y + rheight / 2;
    let padding = fontSize * 1.2;

    if (orientation === HORIZONTAL) {
      if (labelPosition === TOP) {
        labelX = centerX;
        labelY = centerY - peakHeight - padding;
      } else if (labelPosition === BOTTOM) {
        labelX = centerX;
        labelY = centerY + peakHeight + padding;
      } else if (labelPosition === LEFT) {
        labelX = x - padding;
        labelY = centerY;
        textAlign(RIGHT, CENTER);
      } else if (labelPosition === RIGHT) {
        labelX = x + rwidth + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      } else {
        // Default to TOP for horizontal
        labelX = centerX;
        labelY = centerY - peakHeight - padding;
      }
    } else if (orientation === VERTICAL) {
      let vertPeakHeight = rwidth / 3;
      if (labelPosition === TOP) {
        labelX = centerX;
        labelY = y - padding;
        textAlign(CENTER, BOTTOM);
      } else if (labelPosition === BOTTOM) {
        labelX = centerX;
        labelY = y + rheight + padding;
        textAlign(CENTER, TOP);
      } else if (labelPosition === LEFT) {
        labelX = centerX - vertPeakHeight - padding;
        labelY = centerY;
        textAlign(RIGHT, CENTER);
      } else if (labelPosition === RIGHT) {
        labelX = centerX + vertPeakHeight + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      } else {
        // Default to RIGHT for vertical
        labelX = centerX + vertPeakHeight + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      }
    }

    text(label, labelX, labelY);
    pop();
  }
}


/* Draw a schematic inductor symbol with end wires and optional label
   Parameters:
   - x, y: top-left corner position
   - iwidth, iheight: width and height of the component area
   - lineWidth: stroke weight for drawing
   - orientation: HORIZONTAL or VERTICAL
   - label: optional text label (e.g., "L1", "10mH")
   - labelPosition: TOP, BOTTOM, LEFT, or RIGHT
*/
function drawInductor(x, y, iwidth, iheight, lineWidth, orientation, label, labelPosition) {
  strokeWeight(lineWidth);
  stroke(0);
  noFill();

  // the percent of the length of the inductor that is taken by each end wire
  let endWirePercent = 0.15;

  // number of humps/coils
  let numCoils = 4;

  if (orientation === HORIZONTAL) {
    let halfHeight = y + iheight / 2;
    let endWireLength = iwidth * endWirePercent;
    let coilWidth = (iwidth - 2 * endWireLength) / numCoils;
    let coilHeight = iheight / 3;

    // Draw left end wire
    line(x, halfHeight, x + endWireLength, halfHeight);
    // Draw right end wire
    line(x + iwidth - endWireLength, halfHeight, x + iwidth, halfHeight);

    // Draw coils (semicircular humps)
    for (let i = 0; i < numCoils; i++) {
      let coilX = x + endWireLength + i * coilWidth + coilWidth / 2;
      arc(coilX, halfHeight, coilWidth, coilHeight * 2, PI, TWO_PI);
    }
  } else if (orientation === VERTICAL) {
    let halfWidth = x + iwidth / 2;
    let endWireLength = iheight * endWirePercent;
    let coilHeight = (iheight - 2 * endWireLength) / numCoils;
    let coilWidth = iwidth / 3;

    // Draw top end wire
    line(halfWidth, y, halfWidth, y + endWireLength);
    // Draw bottom end wire
    line(halfWidth, y + iheight - endWireLength, halfWidth, y + iheight);

    // Draw coils (semicircular humps going right)
    for (let i = 0; i < numCoils; i++) {
      let coilY = y + endWireLength + i * coilHeight + coilHeight / 2;
      arc(halfWidth, coilY, coilWidth * 2, coilHeight, -HALF_PI, HALF_PI);
    }
  }

  // Draw label if provided
  if (label) {
    push();
    noStroke();
    fill(0);

    // Scale font size based on inductor dimensions
    let inductorSize = orientation === HORIZONTAL ? iwidth : iheight;
    let fontSize = Math.max(8, Math.min(24, inductorSize * 0.12));
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    let labelX, labelY;
    let centerX = x + iwidth / 2;
    let centerY = y + iheight / 2;
    let padding = fontSize * 1.2;
    let coilHeight = (orientation === HORIZONTAL) ? iheight / 3 : iwidth / 3;

    if (orientation === HORIZONTAL) {
      if (labelPosition === TOP) {
        labelX = centerX;
        labelY = centerY - coilHeight - padding;
      } else if (labelPosition === BOTTOM) {
        labelX = centerX;
        labelY = centerY + padding;
      } else if (labelPosition === LEFT) {
        labelX = x - padding;
        labelY = centerY;
        textAlign(RIGHT, CENTER);
      } else if (labelPosition === RIGHT) {
        labelX = x + iwidth + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      } else {
        // Default to TOP for horizontal
        labelX = centerX;
        labelY = centerY - coilHeight - padding;
      }
    } else if (orientation === VERTICAL) {
      if (labelPosition === TOP) {
        labelX = centerX;
        labelY = y - padding;
        textAlign(CENTER, BOTTOM);
      } else if (labelPosition === BOTTOM) {
        labelX = centerX;
        labelY = y + iheight + padding;
        textAlign(CENTER, TOP);
      } else if (labelPosition === LEFT) {
        labelX = centerX - coilHeight - padding;
        labelY = centerY;
        textAlign(RIGHT, CENTER);
      } else if (labelPosition === RIGHT) {
        labelX = centerX + coilHeight + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      } else {
        // Default to RIGHT for vertical
        labelX = centerX + coilHeight + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      }
    }

    text(label, labelX, labelY);
    pop();
  }
}

/* Draw a schematic capacitor symbol with end wires and optional label
   Parameters:
   - x, y: top-left corner position
   - cwidth, cheight: width and height of the component area
   - lineWidth: stroke weight for drawing
   - orientation: HORIZONTAL or VERTICAL
   - label: optional text label (e.g., "C1", "10µF")
   - labelPosition: TOP, BOTTOM, LEFT, or RIGHT
*/
function drawCapacitor(x, y, cwidth, cheight, lineWidth, orientation, label, labelPosition) {
  strokeWeight(lineWidth);
  stroke(0);
  noFill();

  // the percent of the length of the capacitor that is taken by each end wire
  let endWirePercent = 0.35;
  // gap between the two plates (as percent of component length)
  let gapPercent = 0.15;
  // plate size as percent of component width/height
  let plateSizePercent = 0.5;

  if (orientation === HORIZONTAL) {
    let halfHeight = y + cheight / 2;
    let endWireLength = cwidth * endWirePercent;
    let gapWidth = cwidth * gapPercent;
    let plateHeight = cheight * plateSizePercent;
    let plateX1 = x + endWireLength;
    let plateX2 = x + cwidth - endWireLength;

    // Draw left end wire
    line(x, halfHeight, plateX1, halfHeight);
    // Draw right end wire
    line(plateX2, halfHeight, x + cwidth, halfHeight);

    // Draw left plate (vertical line)
    line(plateX1, halfHeight - plateHeight / 2, plateX1, halfHeight + plateHeight / 2);
    // Draw right plate (vertical line)
    line(plateX2, halfHeight - plateHeight / 2, plateX2, halfHeight + plateHeight / 2);
  } else if (orientation === VERTICAL) {
    let halfWidth = x + cwidth / 2;
    let endWireLength = cheight * endWirePercent;
    let gapHeight = cheight * gapPercent;
    let plateWidth = cwidth * plateSizePercent;
    let plateY1 = y + endWireLength;
    let plateY2 = y + cheight - endWireLength;

    // Draw top end wire
    line(halfWidth, y, halfWidth, plateY1);
    // Draw bottom end wire
    line(halfWidth, plateY2, halfWidth, y + cheight);

    // Draw top plate (horizontal line)
    line(halfWidth - plateWidth / 2, plateY1, halfWidth + plateWidth / 2, plateY1);
    // Draw bottom plate (horizontal line)
    line(halfWidth - plateWidth / 2, plateY2, halfWidth + plateWidth / 2, plateY2);
  }

  // Draw label if provided
  if (label) {
    push();
    noStroke();
    fill(0);

    // Scale font size based on capacitor dimensions
    let capacitorSize = orientation === HORIZONTAL ? cwidth : cheight;
    let fontSize = Math.max(8, Math.min(24, capacitorSize * 0.12));
    textSize(fontSize);
    textAlign(CENTER, CENTER);

    let labelX, labelY;
    let centerX = x + cwidth / 2;
    let centerY = y + cheight / 2;
    let padding = fontSize * 1.2;
    let plateOffset = (orientation === HORIZONTAL) ? cheight * plateSizePercent / 2 : cwidth * plateSizePercent / 2;

    if (orientation === HORIZONTAL) {
      if (labelPosition === TOP) {
        labelX = centerX;
        labelY = centerY - plateOffset - padding;
      } else if (labelPosition === BOTTOM) {
        labelX = centerX;
        labelY = centerY + plateOffset + padding;
      } else if (labelPosition === LEFT) {
        labelX = x - padding;
        labelY = centerY;
        textAlign(RIGHT, CENTER);
      } else if (labelPosition === RIGHT) {
        labelX = x + cwidth + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      } else {
        // Default to TOP for horizontal
        labelX = centerX;
        labelY = centerY - plateOffset - padding;
      }
    } else if (orientation === VERTICAL) {
      if (labelPosition === TOP) {
        labelX = centerX;
        labelY = y - padding;
        textAlign(CENTER, BOTTOM);
      } else if (labelPosition === BOTTOM) {
        labelX = centerX;
        labelY = y + cheight + padding;
        textAlign(CENTER, TOP);
      } else if (labelPosition === LEFT) {
        labelX = centerX - plateOffset - padding;
        labelY = centerY;
        textAlign(RIGHT, CENTER);
      } else if (labelPosition === RIGHT) {
        labelX = centerX + plateOffset + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      } else {
        // Default to RIGHT for vertical
        labelX = centerX + plateOffset + padding;
        labelY = centerY;
        textAlign(LEFT, CENTER);
      }
    }

    text(label, labelX, labelY);
    pop();
  }
}
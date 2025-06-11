/*
    A library for animating circuits in JavaScript using the p5.js
    animation library.

    All circuits have the following parameters:
    REQUIRED
    (x,y) - the upper left corner of the circuit on the canvas
    (w,h) - the width and height of the circuit
    OPTIONAL PARAMETERS
    orientation - the orientation of the circuit, either HORIZONTAL or VERTICAL
    Note that these are static values defined as strings in the library.
    label - the label of the circuit
    state - the state of the circuit element - this is often a value like the brightness of a bulb from 0 to 1

*/

const HORIZONTAL = "HORIZONTAL";
const VERTICAL = "VERTICAL";

// draw a black line with red circles as current from (x1,y1) to (y1,y2) 
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


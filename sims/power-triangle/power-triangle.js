// Power Triangle Visualization MicroSim
// Helps students identify which formula to use for power calculations
// Based on the relationship P = VI and Ohm's Law V = IR
// MicroSim template version 2026.02

// Canvas dimensions - REQUIRED structure
let containerWidth;
let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Triangle dimensions
let triangleSize = 180;
let triangleCenterX;
let triangleCenterY = 140;

// Colors for variables
const colorP = '#FFD700';  // Gold for Power
const colorV = '#4169E1';  // Royal Blue for Voltage
const colorI = '#228B22';  // Forest Green for Current
const colorR = '#FF8C00';  // Dark Orange for Resistance

// Input state
let activeInput = null;  // Which input field is active: 'V', 'I', 'R', or null
let inputValues = { V: '', I: '', R: '' };
let calculatedP = null;

// Covered variable state
let coveredVar = null;  // 'P', 'V', 'I', or null

// Button positions
let calcButtonX, calcButtonY;
let clearButtonX, clearButtonY;
let buttonWidth = 80;
let buttonHeight = 30;

// Input field positions
let inputFields = {};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Initialize input field positions (will be updated in draw)
    updateInputFieldPositions();

    describe('Interactive power triangle visualization for calculating power, voltage, current using P=VI formula', LABEL);
}

function updateInputFieldPositions() {
    let calcPanelX = canvasWidth * 0.6;
    let fieldWidth = 80;
    let fieldHeight = 24;
    let startY = 110;
    let spacing = 35;

    inputFields = {
        V: { x: calcPanelX + 100, y: startY, w: fieldWidth, h: fieldHeight },
        I: { x: calcPanelX + 100, y: startY + spacing, w: fieldWidth, h: fieldHeight },
        R: { x: calcPanelX + 100, y: startY + spacing * 2, w: fieldWidth, h: fieldHeight }
    };

    // Button positions in control area
    calcButtonX = canvasWidth * 0.6 + 20;
    calcButtonY = drawHeight + 25;
    clearButtonX = calcButtonX + buttonWidth + 20;
    clearButtonY = drawHeight + 25;
}

function draw() {
    updateCanvasSize();
    updateInputFieldPositions();

    // Drawing area background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area background
    fill('white');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(24);
    text('Power Triangle', canvasWidth * 0.25, 15);

    // Reset text settings
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);

    // Draw the power triangle
    triangleCenterX = canvasWidth * 0.25;
    drawPowerTriangle();

    // Draw formula reference
    drawFormulaReference();

    // Draw calculator panel
    drawCalculatorPanel();

    // Draw control area buttons
    drawControlButtons();

    // Draw instructions
    drawInstructions();
}

function drawPowerTriangle() {
    let cx = triangleCenterX;
    let cy = triangleCenterY;
    let size = triangleSize;

    // Triangle vertices
    let topX = cx;
    let topY = cy - size/2;
    let leftX = cx - size/2;
    let leftY = cy + size/3;
    let rightX = cx + size/2;
    let rightY = cy + size/3;

    // Draw triangle outline
    stroke(100);
    strokeWeight(2);
    noFill();
    triangle(topX, topY, leftX, leftY, rightX, rightY);

    // Draw P (Power) at top
    let pCovered = coveredVar === 'P';
    if (pCovered) {
        fill(100);
        stroke(100);
        strokeWeight(1);
        ellipse(topX, topY + 35, 50, 35);
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text('?', topX, topY + 35);
    } else {
        fill(colorP);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(32);
        text('P', topX, topY + 35);
    }

    // Draw V (Voltage) at bottom left
    let vCovered = coveredVar === 'V';
    if (vCovered) {
        fill(100);
        stroke(100);
        strokeWeight(1);
        ellipse(leftX + 35, leftY - 20, 50, 35);
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text('?', leftX + 35, leftY - 20);
    } else {
        fill(colorV);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(32);
        text('V', leftX + 35, leftY - 20);
    }

    // Draw I (Current) at bottom right
    let iCovered = coveredVar === 'I';
    if (iCovered) {
        fill(100);
        stroke(100);
        strokeWeight(1);
        ellipse(rightX - 35, rightY - 20, 50, 35);
        fill('white');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text('?', rightX - 35, rightY - 20);
    } else {
        fill(colorI);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(32);
        text('I', rightX - 35, rightY - 20);
    }

    // Draw multiplication symbol between V and I
    fill(80);
    textSize(20);
    text('\u00D7', cx, leftY - 20);

    // Show revealed formula when variable is covered
    if (coveredVar) {
        drawRevealedFormula();
    }
}

function drawRevealedFormula() {
    let formulaY = triangleCenterY + triangleSize/2 + 30;

    textAlign(CENTER, CENTER);
    textSize(20);
    noStroke();

    fill('black');
    text('Formula:', triangleCenterX, formulaY - 25);

    textSize(28);
    if (coveredVar === 'P') {
        // P = V × I
        fill(colorP);
        text('P', triangleCenterX - 50, formulaY);
        fill('black');
        text('=', triangleCenterX - 20, formulaY);
        fill(colorV);
        text('V', triangleCenterX + 5, formulaY);
        fill('black');
        text('\u00D7', triangleCenterX + 30, formulaY);
        fill(colorI);
        text('I', triangleCenterX + 55, formulaY);
    } else if (coveredVar === 'V') {
        // V = P / I
        fill(colorV);
        text('V', triangleCenterX - 50, formulaY);
        fill('black');
        text('=', triangleCenterX - 20, formulaY);
        fill(colorP);
        text('P', triangleCenterX + 5, formulaY);
        fill('black');
        text('/', triangleCenterX + 30, formulaY);
        fill(colorI);
        text('I', triangleCenterX + 55, formulaY);
    } else if (coveredVar === 'I') {
        // I = P / V
        fill(colorI);
        text('I', triangleCenterX - 50, formulaY);
        fill('black');
        text('=', triangleCenterX - 20, formulaY);
        fill(colorP);
        text('P', triangleCenterX + 5, formulaY);
        fill('black');
        text('/', triangleCenterX + 30, formulaY);
        fill(colorV);
        text('V', triangleCenterX + 55, formulaY);
    }
}

function drawFormulaReference() {
    let refX = 15;
    let refY = drawHeight - 55;

    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(refX, refY, 200, 50, 5);

    noStroke();
    fill('black');
    textAlign(LEFT, TOP);
    textSize(14);
    text('Power Equations:', refX + 10, refY + 5);
    textSize(13);
    text('P = V\u00D7I   P = I\u00B2R   P = V\u00B2/R', refX + 10, refY + 25);
}

function drawCalculatorPanel() {
    let panelX = canvasWidth * 0.55;
    let panelY = 50;
    let panelWidth = canvasWidth * 0.42;
    let panelHeight = 220;

    // Panel background
    fill(255, 255, 255, 240);
    stroke(180);
    strokeWeight(1);
    rect(panelX, panelY, panelWidth, panelHeight, 10);

    // Panel title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('Calculator', panelX + panelWidth/2, panelY + 10);

    // Instructions
    textSize(12);
    fill(80);
    text('Enter any two values', panelX + panelWidth/2, panelY + 32);

    // Input fields
    textAlign(LEFT, CENTER);
    textSize(16);

    let labelX = panelX + 15;
    let startY = 110;
    let spacing = 35;

    // Voltage input
    fill(colorV);
    text('Voltage (V):', labelX, startY + 12);
    drawInputField('V', inputFields.V);

    // Current input
    fill(colorI);
    text('Current (A):', labelX, startY + spacing + 12);
    drawInputField('I', inputFields.I);

    // Resistance input
    fill(colorR);
    text('Resistance (\u03A9):', labelX, startY + spacing * 2 + 12);
    drawInputField('R', inputFields.R);

    // Power result
    fill(colorP);
    textSize(18);
    text('Power (W):', labelX, startY + spacing * 3 + 15);

    // Display calculated power
    if (calculatedP !== null) {
        fill('black');
        textAlign(LEFT, CENTER);
        textSize(20);
        let powerStr = calculatedP.toFixed(4);
        // Remove trailing zeros after decimal
        powerStr = parseFloat(powerStr).toString();
        text(powerStr + ' W', labelX + 110, startY + spacing * 3 + 15);
    } else {
        fill(150);
        textSize(16);
        text('--', labelX + 110, startY + spacing * 3 + 15);
    }
}

function drawInputField(varName, field) {
    // Field background
    if (activeInput === varName) {
        fill(255, 255, 220);
        stroke(colorV);
        strokeWeight(2);
    } else {
        fill(255);
        stroke(150);
        strokeWeight(1);
    }
    rect(field.x, field.y, field.w, field.h, 3);

    // Field value
    noStroke();
    fill('black');
    textAlign(LEFT, CENTER);
    textSize(14);
    let displayVal = inputValues[varName];
    if (activeInput === varName && frameCount % 60 < 30) {
        displayVal += '|';  // Blinking cursor
    }
    text(displayVal, field.x + 5, field.y + field.h/2);
}

function drawControlButtons() {
    // Calculate button
    let isOverCalc = isMouseOverButton(calcButtonX, calcButtonY, buttonWidth, buttonHeight);
    fill(isOverCalc ? '#45a049' : '#4CAF50');
    stroke(isOverCalc ? '#3d8b40' : '#45a049');
    strokeWeight(1);
    rect(calcButtonX, calcButtonY, buttonWidth, buttonHeight, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Calculate', calcButtonX + buttonWidth/2, calcButtonY + buttonHeight/2);

    // Clear button
    let isOverClear = isMouseOverButton(clearButtonX, clearButtonY, buttonWidth, buttonHeight);
    fill(isOverClear ? '#f44336' : '#e57373');
    stroke(isOverClear ? '#d32f2f' : '#ef5350');
    strokeWeight(1);
    rect(clearButtonX, clearButtonY, buttonWidth, buttonHeight, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    text('Clear', clearButtonX + buttonWidth/2, clearButtonY + buttonHeight/2);
}

function drawInstructions() {
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Click P, V, or I in triangle to reveal formula', 15, drawHeight + 25);
}

function isMouseOverButton(bx, by, bw, bh) {
    return mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh;
}

function mousePressed() {
    // Check triangle variable clicks
    checkTriangleClick();

    // Check input field clicks
    checkInputFieldClick();

    // Check button clicks
    if (isMouseOverButton(calcButtonX, calcButtonY, buttonWidth, buttonHeight)) {
        calculatePower();
    }
    if (isMouseOverButton(clearButtonX, clearButtonY, buttonWidth, buttonHeight)) {
        clearAll();
    }
}

function checkTriangleClick() {
    let cx = triangleCenterX;
    let cy = triangleCenterY;
    let size = triangleSize;

    // P position (top)
    let pX = cx;
    let pY = cy - size/2 + 35;
    if (dist(mouseX, mouseY, pX, pY) < 30) {
        coveredVar = (coveredVar === 'P') ? null : 'P';
        return;
    }

    // V position (bottom left)
    let vX = cx - size/2 + 35;
    let vY = cy + size/3 - 20;
    if (dist(mouseX, mouseY, vX, vY) < 30) {
        coveredVar = (coveredVar === 'V') ? null : 'V';
        return;
    }

    // I position (bottom right)
    let iX = cx + size/2 - 35;
    let iY = cy + size/3 - 20;
    if (dist(mouseX, mouseY, iX, iY) < 30) {
        coveredVar = (coveredVar === 'I') ? null : 'I';
        return;
    }
}

function checkInputFieldClick() {
    for (let varName in inputFields) {
        let field = inputFields[varName];
        if (mouseX >= field.x && mouseX <= field.x + field.w &&
            mouseY >= field.y && mouseY <= field.y + field.h) {
            activeInput = varName;
            return;
        }
    }
    // Click outside all fields deactivates
    activeInput = null;
}

function keyPressed() {
    if (activeInput === null) return;

    if (keyCode === BACKSPACE) {
        inputValues[activeInput] = inputValues[activeInput].slice(0, -1);
        return false;
    }

    if (keyCode === ENTER || keyCode === RETURN) {
        calculatePower();
        return false;
    }

    if (keyCode === TAB) {
        // Cycle through inputs
        if (activeInput === 'V') activeInput = 'I';
        else if (activeInput === 'I') activeInput = 'R';
        else if (activeInput === 'R') activeInput = 'V';
        return false;
    }
}

function keyTyped() {
    if (activeInput === null) return;

    // Allow numbers and decimal point
    if ((key >= '0' && key <= '9') || key === '.') {
        // Prevent multiple decimal points
        if (key === '.' && inputValues[activeInput].includes('.')) return false;
        inputValues[activeInput] += key;
    }
    return false;
}

function calculatePower() {
    let V = parseFloat(inputValues.V);
    let I = parseFloat(inputValues.I);
    let R = parseFloat(inputValues.R);

    let validV = !isNaN(V) && V > 0;
    let validI = !isNaN(I) && I > 0;
    let validR = !isNaN(R) && R > 0;

    // Count valid inputs
    let validCount = (validV ? 1 : 0) + (validI ? 1 : 0) + (validR ? 1 : 0);

    if (validCount < 2) {
        calculatedP = null;
        return;
    }

    // Calculate based on available values
    if (validV && validI) {
        // P = V × I
        calculatedP = V * I;
    } else if (validI && validR) {
        // P = I² × R
        calculatedP = I * I * R;
    } else if (validV && validR) {
        // P = V² / R
        calculatedP = (V * V) / R;
    }
}

function clearAll() {
    inputValues = { V: '', I: '', R: '' };
    calculatedP = null;
    activeInput = null;
    coveredVar = null;
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    updateInputFieldPositions();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}

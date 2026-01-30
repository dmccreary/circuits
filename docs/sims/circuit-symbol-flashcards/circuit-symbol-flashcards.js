// Circuit Symbol Flashcard Trainer MicroSim
// Helps students identify common circuit schematic symbols and recall their names and functions
// Uses the p5-circuit-lib.js for standard component drawing functions
// MicroSim template version 2026.02

// Canvas dimensions - REQUIRED structure
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Flashcard data - 16 symbols as specified
const symbols = [
    {
        name: "Resistor (US)",
        description: "Opposes current flow. The zigzag pattern represents resistance.",
        category: "Passive"
    },
    {
        name: "Resistor (EU)",
        description: "European/IEC style resistor symbol. Rectangle represents resistance.",
        category: "Passive"
    },
    {
        name: "Capacitor",
        description: "Stores energy in electric field. Two parallel plates separated by gap.",
        category: "Passive"
    },
    {
        name: "Polarized Capacitor",
        description: "Electrolytic capacitor with polarity. Curved plate is negative.",
        category: "Passive"
    },
    {
        name: "Inductor",
        description: "Stores energy in magnetic field. Coiled wire symbol.",
        category: "Passive"
    },
    {
        name: "DC Voltage Source",
        description: "Provides constant voltage. Long line is positive terminal.",
        category: "Sources"
    },
    {
        name: "AC Voltage Source",
        description: "Provides alternating voltage. Sine wave indicates AC.",
        category: "Sources"
    },
    {
        name: "Current Source",
        description: "Provides constant current. Arrow shows current direction.",
        category: "Sources"
    },
    {
        name: "Dependent Voltage Source",
        description: "Voltage controlled by another circuit variable. Diamond shape.",
        category: "Sources"
    },
    {
        name: "Dependent Current Source",
        description: "Current controlled by another circuit variable. Diamond with arrow.",
        category: "Sources"
    },
    {
        name: "Ground (Earth)",
        description: "Earth ground connection. Used for safety and power systems.",
        category: "Connections"
    },
    {
        name: "Ground (Signal)",
        description: "Signal reference point. May not connect to physical earth.",
        category: "Connections"
    },
    {
        name: "Wire Crossing",
        description: "Wires cross without connecting. No dot at intersection.",
        category: "Connections"
    },
    {
        name: "Wire Junction",
        description: "Wires connect at this point. Dot indicates connection.",
        category: "Connections"
    },
    {
        name: "Switch (SPST)",
        description: "Single-pole single-throw switch. Opens/closes circuit.",
        category: "Passive"
    },
    {
        name: "Op-Amp",
        description: "Operational amplifier. Triangle shape with +/- inputs.",
        category: "Active"
    }
];

// Flashcard state
let currentCard = 0;
let isFlipped = false;
let shuffledOrder = [];
let score = 0;
let attempted = 0;

// Mode: "Learn" (default), "Flip", or "Quiz"
let currentMode = "Learn";
const modes = ["Learn", "Flip", "Quiz"];

// Category filter
let currentCategory = "All";
const categories = ["All", "Passive", "Sources", "Connections", "Active"];

// Animation
let flipProgress = 0;
let isFlipping = false;

// Button positions (calculated in draw)
let flipBtnX, flipBtnY;
let prevBtnX, prevBtnY;
let nextBtnX, nextBtnY;
let shuffleBtnX, shuffleBtnY;
let modeBtnX, modeBtnY;
let buttonWidth = 70;
let buttonHeight = 28;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);

    // Initialize shuffled order
    resetCardOrder();

    describe('Circuit symbol flashcard trainer with 16 schematic symbols, flip animation, and quiz mode for learning electrical component symbols', LABEL);
}

function resetCardOrder() {
    shuffledOrder = [];
    for (let i = 0; i < symbols.length; i++) {
        if (currentCategory === "All" || symbols[i].category === currentCategory) {
            shuffledOrder.push(i);
        }
    }
    currentCard = 0;
    isFlipped = false;
}

function shuffleCards() {
    // Fisher-Yates shuffle
    for (let i = shuffledOrder.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffledOrder[i], shuffledOrder[j]] = [shuffledOrder[j], shuffledOrder[i]];
    }
    currentCard = 0;
    isFlipped = false;
    if (currentMode === "Quiz") {
        score = 0;
        attempted = 0;
    }
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
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(22);
    text('Circuit Symbol Flashcards', canvasWidth / 2, 10);

    // Progress indicator
    textSize(14);
    fill(100);
    let progressText = (currentCard + 1) + ' / ' + shuffledOrder.length;
    if (currentMode === "Quiz") {
        progressText += '   Score: ' + score + '/' + attempted;
    }
    text(progressText, canvasWidth / 2, 38);

    // Mode indicator
    textSize(12);
    fill(60, 60, 150);
    text('Mode: ' + currentMode, canvasWidth / 2, 55);

    // Category indicator
    textSize(11);
    fill(80);
    text('Category: ' + currentCategory, canvasWidth / 2, 70);

    // Draw flashcard
    drawFlashcard();

    // Draw description overlay in Learn mode
    if (currentMode === "Learn" && showingDescription) {
        drawDescriptionOverlay();
        descriptionTimer--;
        if (descriptionTimer <= 0) {
            showingDescription = false;
        }
    }

    // Draw controls
    drawControls();

    // Handle flip animation
    if (isFlipping) {
        flipProgress += 0.15;
        if (flipProgress >= 1) {
            flipProgress = 0;
            isFlipping = false;
        }
    }
}

function drawDescriptionOverlay() {
    let symbol = symbols[shuffledOrder[currentCard]];
    let cardWidth = min(320, canvasWidth - 60);
    let cardX = (canvasWidth - cardWidth) / 2;

    // Semi-transparent overlay panel at bottom of card area
    let panelWidth = cardWidth - 20;
    let panelHeight = 60;
    let panelX = cardX + 10;
    let panelY = 85 + 220 - panelHeight - 10;

    // Fade based on timer
    let alpha = min(230, descriptionTimer * 2);

    fill(255, 250, 240, alpha);
    stroke(150, 120, 80, alpha);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Description text
    fill(60, 60, 60, alpha);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(NORMAL);
    text(symbol.description, panelX + panelWidth / 2, panelY + panelHeight / 2, panelWidth - 20, panelHeight - 10);
}

function drawFlashcard() {
    let cardWidth = min(320, canvasWidth - 60);
    let cardHeight = 220;
    let cardX = (canvasWidth - cardWidth) / 2;
    let cardY = 85;

    // Card shadow
    noStroke();
    fill(180, 180, 180, 100);
    rect(cardX + 4, cardY + 4, cardWidth, cardHeight, 12);

    let symbol = symbols[shuffledOrder[currentCard]];

    // LEARN MODE: Show symbol with name underneath (no flipping)
    if (currentMode === "Learn") {
        // Card background
        fill(255);
        stroke(150);
        strokeWeight(2);
        rect(cardX, cardY, cardWidth, cardHeight, 12);

        // Draw symbol
        drawSymbol(shuffledOrder[currentCard], cardX + cardWidth / 2, cardY + cardHeight / 2 - 35, 80);

        // Show name underneath symbol
        fill('black');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(18);
        textStyle(BOLD);
        text(symbol.name, cardX + cardWidth / 2, cardY + cardHeight - 65);

        // Category badge
        textStyle(NORMAL);
        textSize(11);
        fill(100, 100, 200);
        text('[' + symbol.category + ']', cardX + cardWidth / 2, cardY + cardHeight - 40);

        // Hint text
        fill(120);
        textSize(11);
        text('Click card for description', cardX + cardWidth / 2, cardY + cardHeight - 20);

        return;
    }

    // FLIP and QUIZ MODES: Use flip animation
    let scaleX = isFlipping ? abs(cos(flipProgress * PI)) : 1;

    push();
    translate(cardX + cardWidth / 2, cardY + cardHeight / 2);
    scale(scaleX, 1);

    // Determine if showing front or back based on flip state
    let showingAnswer = isFlipped;
    if (isFlipping && flipProgress > 0.5) {
        showingAnswer = !isFlipped;
    }

    // Card fill
    if (showingAnswer) {
        fill(255, 250, 240);  // Warm white for answer side
    } else {
        fill(255);  // White for symbol side
    }
    stroke(150);
    strokeWeight(2);
    rect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 12);

    // Card content
    if (!showingAnswer) {
        // Front: Show symbol only
        drawSymbol(shuffledOrder[currentCard], 0, -15, 80);

        // Hint text
        fill(100);
        noStroke();
        textAlign(CENTER, BOTTOM);
        textSize(12);
        if (currentMode === "Quiz") {
            text('(Click to reveal answer)', 0, cardHeight / 2 - 15);
        } else {
            text('(Click to flip)', 0, cardHeight / 2 - 15);
        }
    } else {
        // Back: Show name and description
        fill('black');
        noStroke();
        textAlign(CENTER, TOP);
        textSize(20);
        textStyle(BOLD);
        text(symbol.name, 0, -cardHeight / 2 + 25);

        textStyle(NORMAL);
        textSize(14);
        fill(60);
        textAlign(CENTER, CENTER);
        // Word wrap the description
        text(symbol.description, 0, 15, cardWidth - 40, 80);

        // Category badge
        textSize(11);
        fill(100, 100, 200);
        text('[' + symbol.category + ']', 0, cardHeight / 2 - 30);
    }

    pop();
}

function drawSymbol(index, cx, cy, size) {
    stroke(0);
    strokeWeight(2);
    noFill();

    let hw = size / 2;  // half width for positioning

    switch(index) {
        case 0: // Resistor (US) - zigzag
            drawResistorUS(cx, cy, size);
            break;

        case 1: // Resistor (EU) - rectangle
            drawResistorEU(cx, cy, size);
            break;

        case 2: // Capacitor - two parallel lines
            drawCapacitorSymbol(cx, cy, size);
            break;

        case 3: // Polarized Capacitor
            drawPolarizedCapacitor(cx, cy, size);
            break;

        case 4: // Inductor - coils
            drawInductorSymbol(cx, cy, size);
            break;

        case 5: // DC Voltage Source
            drawDCSource(cx, cy, size);
            break;

        case 6: // AC Voltage Source
            drawACSource(cx, cy, size);
            break;

        case 7: // Current Source
            drawCurrentSource(cx, cy, size);
            break;

        case 8: // Dependent Voltage Source
            drawDependentVoltageSource(cx, cy, size);
            break;

        case 9: // Dependent Current Source
            drawDependentCurrentSource(cx, cy, size);
            break;

        case 10: // Ground (Earth)
            drawEarthGround(cx, cy, size);
            break;

        case 11: // Ground (Signal)
            drawSignalGround(cx, cy, size);
            break;

        case 12: // Wire Crossing (no connection)
            drawWireCrossing(cx, cy, size);
            break;

        case 13: // Wire Junction (connection)
            drawWireJunction(cx, cy, size);
            break;

        case 14: // Switch (SPST)
            drawSwitch(cx, cy, size);
            break;

        case 15: // Op-Amp
            drawOpAmp(cx, cy, size);
            break;
    }
}

// Symbol drawing functions
function drawResistorUS(cx, cy, size) {
    let hw = size * 0.6;
    let peaks = 6;
    let peakWidth = (hw * 2 * 0.7) / peaks;
    let peakHeight = size * 0.25;

    // End wires
    line(cx - hw, cy, cx - hw * 0.7, cy);
    line(cx + hw * 0.7, cy, cx + hw, cy);

    // Zigzag
    beginShape();
    vertex(cx - hw * 0.7, cy);
    for (let i = 0; i < peaks; i++) {
        let x = cx - hw * 0.7 + (i + 0.5) * peakWidth;
        let y = (i % 2 === 0) ? cy - peakHeight : cy + peakHeight;
        vertex(x, y);
    }
    vertex(cx + hw * 0.7, cy);
    endShape();
}

function drawResistorEU(cx, cy, size) {
    let hw = size * 0.5;
    let hh = size * 0.2;

    // End wires
    line(cx - hw - size * 0.15, cy, cx - hw, cy);
    line(cx + hw, cy, cx + hw + size * 0.15, cy);

    // Rectangle
    rect(cx - hw, cy - hh, hw * 2, hh * 2);
}

function drawCapacitorSymbol(cx, cy, size) {
    let hw = size * 0.5;
    let plateHeight = size * 0.4;
    let gap = size * 0.12;

    // End wires
    line(cx - hw, cy, cx - gap, cy);
    line(cx + gap, cy, cx + hw, cy);

    // Plates
    line(cx - gap, cy - plateHeight, cx - gap, cy + plateHeight);
    line(cx + gap, cy - plateHeight, cx + gap, cy + plateHeight);
}

function drawPolarizedCapacitor(cx, cy, size) {
    let hw = size * 0.5;
    let plateHeight = size * 0.4;
    let gap = size * 0.12;

    // End wires
    line(cx - hw, cy, cx - gap, cy);
    line(cx + gap, cy, cx + hw, cy);

    // Straight plate (positive)
    line(cx - gap, cy - plateHeight, cx - gap, cy + plateHeight);

    // Curved plate (negative)
    noFill();
    arc(cx + gap + size * 0.15, cy, size * 0.3, plateHeight * 2, PI/2 + 0.3, 3*PI/2 - 0.3);

    // Plus sign
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(14);
    text('+', cx - hw + 8, cy - plateHeight - 5);
    stroke(0);
}

function drawInductorSymbol(cx, cy, size) {
    let hw = size * 0.5;
    let numCoils = 4;
    let coilWidth = (hw * 2 * 0.7) / numCoils;
    let coilHeight = size * 0.25;

    // End wires
    line(cx - hw, cy, cx - hw * 0.7, cy);
    line(cx + hw * 0.7, cy, cx + hw, cy);

    // Coils (semicircles)
    noFill();
    for (let i = 0; i < numCoils; i++) {
        let x = cx - hw * 0.7 + (i + 0.5) * coilWidth;
        arc(x, cy, coilWidth, coilHeight * 2, PI, TWO_PI);
    }
}

function drawDCSource(cx, cy, size) {
    let hw = size * 0.4;
    let gap = size * 0.08;

    // End wires
    line(cx - hw - size * 0.15, cy, cx - gap * 2, cy);
    line(cx + gap * 2, cy, cx + hw + size * 0.15, cy);

    // Long line (positive)
    strokeWeight(2);
    line(cx - gap * 2, cy - size * 0.35, cx - gap * 2, cy + size * 0.35);

    // Short line (negative)
    strokeWeight(3);
    line(cx + gap * 2, cy - size * 0.2, cx + gap * 2, cy + size * 0.2);
    strokeWeight(2);

    // Plus and minus labels
    noStroke();
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('+', cx - gap * 2 - 12, cy - size * 0.25);
    text('-', cx + gap * 2 + 12, cy - size * 0.15);
    stroke(0);
}

function drawACSource(cx, cy, size) {
    let r = size * 0.35;

    // End wires
    line(cx - r - size * 0.2, cy, cx - r, cy);
    line(cx + r, cy, cx + r + size * 0.2, cy);

    // Circle
    noFill();
    circle(cx, cy, r * 2);

    // Sine wave inside
    beginShape();
    noFill();
    for (let a = -PI; a <= PI; a += 0.1) {
        let x = cx + map(a, -PI, PI, -r * 0.6, r * 0.6);
        let y = cy + sin(a) * r * 0.3;
        vertex(x, y);
    }
    endShape();
}

function drawCurrentSource(cx, cy, size) {
    let r = size * 0.35;

    // End wires
    line(cx - r - size * 0.2, cy, cx - r, cy);
    line(cx + r, cy, cx + r + size * 0.2, cy);

    // Circle
    noFill();
    circle(cx, cy, r * 2);

    // Arrow inside (pointing right)
    let arrowLen = r * 0.8;
    line(cx - arrowLen / 2, cy, cx + arrowLen / 2, cy);
    line(cx + arrowLen / 2, cy, cx + arrowLen / 2 - 8, cy - 6);
    line(cx + arrowLen / 2, cy, cx + arrowLen / 2 - 8, cy + 6);
}

function drawDependentVoltageSource(cx, cy, size) {
    let hw = size * 0.35;

    // End wires
    line(cx - hw - size * 0.2, cy, cx - hw, cy);
    line(cx + hw, cy, cx + hw + size * 0.2, cy);

    // Diamond shape
    noFill();
    beginShape();
    vertex(cx - hw, cy);
    vertex(cx, cy - hw * 0.8);
    vertex(cx + hw, cy);
    vertex(cx, cy + hw * 0.8);
    endShape(CLOSE);

    // Plus/minus inside
    noStroke();
    fill(0);
    textSize(12);
    textAlign(CENTER, CENTER);
    text('+', cx - hw * 0.4, cy);
    text('-', cx + hw * 0.4, cy);
    stroke(0);
}

function drawDependentCurrentSource(cx, cy, size) {
    let hw = size * 0.35;

    // End wires
    line(cx - hw - size * 0.2, cy, cx - hw, cy);
    line(cx + hw, cy, cx + hw + size * 0.2, cy);

    // Diamond shape
    noFill();
    beginShape();
    vertex(cx - hw, cy);
    vertex(cx, cy - hw * 0.8);
    vertex(cx + hw, cy);
    vertex(cx, cy + hw * 0.8);
    endShape(CLOSE);

    // Arrow inside
    let arrowLen = hw * 0.8;
    line(cx - arrowLen / 2, cy, cx + arrowLen / 2, cy);
    line(cx + arrowLen / 2, cy, cx + arrowLen / 2 - 6, cy - 4);
    line(cx + arrowLen / 2, cy, cx + arrowLen / 2 - 6, cy + 4);
}

function drawEarthGround(cx, cy, size) {
    let hw = size * 0.35;

    // Vertical line down
    line(cx, cy - size * 0.3, cx, cy);

    // Three horizontal lines of decreasing width
    line(cx - hw, cy, cx + hw, cy);
    line(cx - hw * 0.65, cy + 8, cx + hw * 0.65, cy + 8);
    line(cx - hw * 0.3, cy + 16, cx + hw * 0.3, cy + 16);
}

function drawSignalGround(cx, cy, size) {
    let hw = size * 0.35;

    // Vertical line down
    line(cx, cy - size * 0.3, cx, cy);

    // Triangle
    noFill();
    triangle(cx - hw, cy, cx + hw, cy, cx, cy + hw * 0.9);
}

function drawWireCrossing(cx, cy, size) {
    let hw = size * 0.4;

    // Horizontal wire
    line(cx - hw, cy, cx + hw, cy);

    // Vertical wire with hop
    line(cx, cy - hw, cx, cy - 6);
    noFill();
    arc(cx, cy, 12, 12, PI, TWO_PI);  // hop over
    line(cx, cy + 6, cx, cy + hw);
}

function drawWireJunction(cx, cy, size) {
    let hw = size * 0.4;

    // Horizontal wire
    line(cx - hw, cy, cx + hw, cy);

    // Vertical wire
    line(cx, cy - hw, cx, cy + hw);

    // Junction dot
    fill(0);
    noStroke();
    circle(cx, cy, 8);
    stroke(0);
}

function drawSwitch(cx, cy, size) {
    let hw = size * 0.45;

    // End wires
    line(cx - hw, cy, cx - hw * 0.4, cy);
    line(cx + hw * 0.4, cy, cx + hw, cy);

    // Contact points
    fill(0);
    circle(cx - hw * 0.4, cy, 6);
    noFill();
    circle(cx + hw * 0.4, cy, 6);

    // Switch arm (open position)
    line(cx - hw * 0.4, cy, cx + hw * 0.3, cy - size * 0.35);
}

function drawOpAmp(cx, cy, size) {
    let hw = size * 0.5;
    let hh = size * 0.45;

    // Triangle body
    noFill();
    beginShape();
    vertex(cx - hw * 0.7, cy - hh);
    vertex(cx + hw * 0.7, cy);
    vertex(cx - hw * 0.7, cy + hh);
    endShape(CLOSE);

    // Input wires
    line(cx - hw, cy - hh * 0.5, cx - hw * 0.7, cy - hh * 0.5);
    line(cx - hw, cy + hh * 0.5, cx - hw * 0.7, cy + hh * 0.5);

    // Output wire
    line(cx + hw * 0.7, cy, cx + hw, cy);

    // Plus/minus labels
    noStroke();
    fill(0);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('-', cx - hw * 0.5, cy - hh * 0.5);
    text('+', cx - hw * 0.5, cy + hh * 0.5);
    stroke(0);
}

function drawControls() {
    let btnY = drawHeight + 12;
    let btnY2 = drawHeight + 47;

    // Row 1: Navigation buttons
    prevBtnX = 20;
    prevBtnY = btnY;
    flipBtnX = prevBtnX + buttonWidth + 10;
    flipBtnY = btnY;
    nextBtnX = flipBtnX + buttonWidth + 10;
    nextBtnY = btnY;

    // Row 2: Shuffle, Mode, Category
    shuffleBtnX = 20;
    shuffleBtnY = btnY2;
    modeBtnX = shuffleBtnX + buttonWidth + 10;
    modeBtnY = btnY2;

    // Draw Prev button
    drawButton(prevBtnX, prevBtnY, buttonWidth, buttonHeight, 'Prev', '#757575', currentCard > 0);

    // Draw Flip button (disabled in Learn mode)
    let flipEnabled = currentMode !== "Learn";
    drawButton(flipBtnX, flipBtnY, buttonWidth, buttonHeight, 'Flip', '#2196F3', flipEnabled);

    // Draw Next button
    drawButton(nextBtnX, nextBtnY, buttonWidth, buttonHeight, 'Next', '#757575', currentCard < shuffledOrder.length - 1);

    // Draw Shuffle button
    drawButton(shuffleBtnX, shuffleBtnY, buttonWidth, buttonHeight, 'Shuffle', '#FF9800', true);

    // Draw Mode button - color based on current mode
    let modeColor;
    if (currentMode === "Learn") {
        modeColor = '#4CAF50';  // Green for learn
    } else if (currentMode === "Flip") {
        modeColor = '#2196F3';  // Blue for flip
    } else {
        modeColor = '#f44336';  // Red for quiz
    }
    drawButton(modeBtnX, modeBtnY, buttonWidth, buttonHeight, currentMode, modeColor, true);

    // Category selector (right side of row 1)
    fill('black');
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(12);
    text('Category:', canvasWidth - 90, btnY + buttonHeight / 2);

    // Category dropdown area
    let catX = canvasWidth - 85;
    let catWidth = 70;
    let isOverCat = mouseX >= catX && mouseX <= catX + catWidth &&
                    mouseY >= btnY && mouseY <= btnY + buttonHeight;
    fill(isOverCat ? '#e3f2fd' : 'white');
    stroke(150);
    strokeWeight(1);
    rect(catX, btnY, catWidth, buttonHeight, 4);

    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(currentCategory, catX + catWidth / 2, btnY + buttonHeight / 2);

    // Instructions (row 2, right side)
    fill(80);
    textSize(11);
    textAlign(RIGHT, CENTER);
    if (currentMode === "Learn") {
        text('Browse symbols with names shown', canvasWidth - 15, btnY2 + buttonHeight / 2);
    } else if (currentMode === "Quiz") {
        text('Test yourself - flip to check', canvasWidth - 15, btnY2 + buttonHeight / 2);
    } else {
        text('Click card or Flip to reveal', canvasWidth - 15, btnY2 + buttonHeight / 2);
    }
}

function drawButton(x, y, w, h, label, baseColor, enabled) {
    let isOver = mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;

    if (enabled) {
        fill(isOver ? lerpColor(color(baseColor), color(255), 0.2) : baseColor);
        stroke(lerpColor(color(baseColor), color(0), 0.2));
    } else {
        fill(200);
        stroke(180);
    }
    strokeWeight(1);
    rect(x, y, w, h, 5);

    fill(enabled ? 'white' : 150);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text(label, x + w / 2, y + h / 2);
}

function mousePressed() {
    // Check navigation buttons
    if (isOverButton(prevBtnX, prevBtnY, buttonWidth, buttonHeight) && currentCard > 0) {
        currentCard--;
        isFlipped = false;
        return;
    }

    // Flip button only works in Flip and Quiz modes
    if (isOverButton(flipBtnX, flipBtnY, buttonWidth, buttonHeight) && currentMode !== "Learn") {
        flipCard();
        return;
    }

    if (isOverButton(nextBtnX, nextBtnY, buttonWidth, buttonHeight) && currentCard < shuffledOrder.length - 1) {
        currentCard++;
        isFlipped = false;
        return;
    }

    if (isOverButton(shuffleBtnX, shuffleBtnY, buttonWidth, buttonHeight)) {
        shuffleCards();
        return;
    }

    // Mode button - cycle through modes
    if (isOverButton(modeBtnX, modeBtnY, buttonWidth, buttonHeight)) {
        let idx = modes.indexOf(currentMode);
        currentMode = modes[(idx + 1) % modes.length];
        isFlipped = false;
        // Reset score when entering Quiz mode
        if (currentMode === "Quiz") {
            score = 0;
            attempted = 0;
            shuffleCards();
        }
        return;
    }

    // Check category selector
    let catX = canvasWidth - 85;
    let catWidth = 70;
    let btnY = drawHeight + 12;
    if (mouseX >= catX && mouseX <= catX + catWidth &&
        mouseY >= btnY && mouseY <= btnY + buttonHeight) {
        // Cycle through categories
        let idx = categories.indexOf(currentCategory);
        currentCategory = categories[(idx + 1) % categories.length];
        resetCardOrder();
        return;
    }

    // Check if clicking on flashcard
    let cardWidth = min(320, canvasWidth - 60);
    let cardHeight = 220;
    let cardX = (canvasWidth - cardWidth) / 2;
    let cardY = 85;

    if (mouseX >= cardX && mouseX <= cardX + cardWidth &&
        mouseY >= cardY && mouseY <= cardY + cardHeight) {
        if (currentMode === "Learn") {
            // In Learn mode, clicking shows description in an alert or we can show a tooltip
            // For now, let's show it as a temporary flip to see description
            showLearnDescription();
        } else {
            flipCard();
        }
    }
}

// Show description panel for Learn mode
let showingDescription = false;
let descriptionTimer = 0;

function showLearnDescription() {
    showingDescription = true;
    descriptionTimer = 180;  // Show for 3 seconds at 60fps
}

function flipCard() {
    if (!isFlipping && currentMode !== "Learn") {
        isFlipping = true;
        flipProgress = 0;
        // Update flip state after animation starts
        setTimeout(() => {
            isFlipped = !isFlipped;
            if (currentMode === "Quiz" && isFlipped) {
                attempted++;
                // In quiz mode, this is self-assessment
                // User tracks their own correctness
            }
        }, 200);
    }
}

function isOverButton(x, y, w, h) {
    return mouseX >= x && mouseX <= x + w && mouseY >= y && mouseY <= y + h;
}

function keyPressed() {
    if (key === ' ' || key === 'Enter') {
        if (currentMode === "Learn") {
            showLearnDescription();
        } else {
            flipCard();
        }
    } else if (keyCode === LEFT_ARROW && currentCard > 0) {
        currentCard--;
        isFlipped = false;
        showingDescription = false;
    } else if (keyCode === RIGHT_ARROW && currentCard < shuffledOrder.length - 1) {
        currentCard++;
        isFlipped = false;
        showingDescription = false;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}

// Ground Symbol Reference Guide MicroSim
// Helps students identify and distinguish between different ground symbols
// used in circuit schematics
// MicroSim template version 2026.02

// Canvas dimensions - REQUIRED structure
let containerWidth;
let canvasWidth = 400;
let drawHeight = 370;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

// Ground symbol data
const groundSymbols = [
    {
        name: "Earth Ground",
        shortName: "Earth",
        description: "Connected to physical earth. Used in power systems, safety grounds, and building wiring.",
        use: "Power systems, safety"
    },
    {
        name: "Chassis Ground",
        shortName: "Chassis",
        description: "Connected to equipment metal enclosure. Used for shielding and equipment grounding.",
        use: "Equipment enclosures"
    },
    {
        name: "Signal Ground",
        shortName: "Signal",
        description: "Common reference point in circuits. May not connect to earth. Used in audio and signal circuits.",
        use: "Audio, signal circuits"
    },
    {
        name: "Digital Ground",
        shortName: "DGND",
        description: "Reference for digital circuits. Often separated from analog ground to reduce noise.",
        use: "Digital circuits"
    },
    {
        name: "Analog Ground",
        shortName: "AGND",
        description: "Reference for sensitive analog circuits. Kept separate from digital ground for noise isolation.",
        use: "Sensitive analog circuits"
    },
    {
        name: "Common Ground",
        shortName: "Common",
        description: "General reference point shared by circuit sections. The basic ground symbol variant.",
        use: "General circuits"
    }
];

// Grid layout
let gridCols = 3;
let gridRows = 2;
let cellWidth, cellHeight;
let hoveredIndex = -1;

// Quiz mode
let quizMode = false;
let quizIndex = -1;
let score = 0;
let questionsAnswered = 0;
let feedback = "";
let feedbackTimer = 0;

// Button positions
let quizButtonX, quizButtonY;
let resetButtonX, resetButtonY;
let buttonWidth = 100;
let buttonHeight = 30;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    textSize(defaultTextSize);
    calculateGrid();

    describe('Ground symbol reference guide showing 6 types of electrical ground symbols with hover descriptions and quiz mode', LABEL);
}

function calculateGrid() {
    cellWidth = (canvasWidth - 2 * margin) / gridCols;
    cellHeight = (drawHeight - 130) / gridRows;  // Leave room for title (60) and info panel (70)
}

function draw() {
    updateCanvasSize();
    calculateGrid();

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
    text('Ground Symbol Reference', canvasWidth / 2, 10);

    // Reset text settings
    textAlign(LEFT, CENTER);
    textSize(defaultTextSize);

    // Check for hover
    checkHover();

    // Draw the symbol grid
    drawSymbolGrid();

    // Draw info panel if hovering (and not in quiz mode)
    if (hoveredIndex >= 0 && !quizMode) {
        drawInfoPanel();
    }

    // Draw quiz feedback
    if (quizMode && feedback !== "") {
        drawFeedback();
    }

    // Draw control area
    drawControlArea();

    // Decrease feedback timer
    if (feedbackTimer > 0) {
        feedbackTimer--;
        if (feedbackTimer === 0) {
            feedback = "";
            if (quizMode) {
                startNewQuestion();
            }
        }
    }
}

function checkHover() {
    hoveredIndex = -1;

    for (let i = 0; i < groundSymbols.length; i++) {
        let col = i % gridCols;
        let row = Math.floor(i / gridCols);
        let x = margin + col * cellWidth;
        let y = 45 + row * cellHeight;

        if (mouseX >= x && mouseX <= x + cellWidth &&
            mouseY >= y && mouseY <= y + cellHeight) {
            hoveredIndex = i;
            break;
        }
    }
}

function drawSymbolGrid() {
    for (let i = 0; i < groundSymbols.length; i++) {
        let col = i % gridCols;
        let row = Math.floor(i / gridCols);
        let x = margin + col * cellWidth;
        let y = 45 + row * cellHeight;
        let centerX = x + cellWidth / 2;
        let centerY = y + cellHeight / 2 - 10;

        // Cell background
        if (hoveredIndex === i) {
            fill(220, 235, 255);
            stroke(100, 150, 255);
            strokeWeight(2);
        } else if (quizMode && quizIndex === i) {
            fill(255, 255, 200);
            stroke(200, 180, 0);
            strokeWeight(2);
        } else {
            fill(255);
            stroke(200);
            strokeWeight(1);
        }
        rect(x + 5, y + 5, cellWidth - 10, cellHeight - 10, 8);

        // Draw the ground symbol
        stroke(0);
        strokeWeight(2);
        drawGroundSymbol(i, centerX, centerY);

        // Label (hidden in quiz mode for the question symbol)
        if (!quizMode || quizIndex !== i) {
            fill('black');
            noStroke();
            textAlign(CENTER, TOP);
            textSize(13);
            text(groundSymbols[i].shortName, centerX, centerY + 45);
        } else {
            fill(150);
            noStroke();
            textAlign(CENTER, TOP);
            textSize(13);
            text("???", centerX, centerY + 45);
        }
    }
}

function drawGroundSymbol(index, cx, cy) {
    let size = 35;

    // Vertical line down to symbol (common to all)
    line(cx, cy - size/2, cx, cy);

    switch(index) {
        case 0: // Earth Ground - three decreasing horizontal lines
            line(cx - size/2, cy, cx + size/2, cy);
            line(cx - size/3, cy + 8, cx + size/3, cy + 8);
            line(cx - size/6, cy + 16, cx + size/6, cy + 16);
            break;

        case 1: // Chassis Ground - three lines with bottom connection
            line(cx - size/2, cy, cx + size/2, cy);
            line(cx - size/3, cy + 8, cx + size/3, cy + 8);
            line(cx - size/6, cy + 16, cx + size/6, cy + 16);
            // Diagonal lines to indicate chassis
            line(cx - size/2 - 5, cy + 5, cx - size/2, cy);
            line(cx + size/2, cy, cx + size/2 + 5, cy + 5);
            break;

        case 2: // Signal Ground - triangle pointing down
            noFill();
            triangle(cx - size/2, cy, cx + size/2, cy, cx, cy + size/2);
            break;

        case 3: // Digital Ground - triangle with D
            noFill();
            triangle(cx - size/2, cy, cx + size/2, cy, cx, cy + size/2);
            noStroke();
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(12);
            text("D", cx, cy + 12);
            stroke(0);
            strokeWeight(2);
            break;

        case 4: // Analog Ground - triangle with A
            noFill();
            triangle(cx - size/2, cy, cx + size/2, cy, cx, cy + size/2);
            noStroke();
            fill(0);
            textAlign(CENTER, CENTER);
            textSize(12);
            text("A", cx, cy + 12);
            stroke(0);
            strokeWeight(2);
            break;

        case 5: // Common Ground - single horizontal line with downward serifs
            line(cx - size/2, cy, cx + size/2, cy);
            // Small vertical lines at ends
            line(cx - size/2, cy, cx - size/2, cy + 8);
            line(cx + size/2, cy, cx + size/2, cy + 8);
            line(cx, cy, cx, cy + 8);
            break;
    }
}

function drawInfoPanel() {
    let symbol = groundSymbols[hoveredIndex];
    let panelWidth = canvasWidth - 2 * margin;
    let panelHeight = 55;
    let panelX = margin;
    let panelY = drawHeight - panelHeight - 10;

    // Panel background
    fill(255, 255, 255, 245);
    stroke(100, 150, 255);
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Symbol name
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    textStyle(BOLD);
    text(symbol.name, panelX + 10, panelY + 8);

    // Description
    textStyle(NORMAL);
    textSize(12);
    fill(60);
    text(symbol.description, panelX + 10, panelY + 28, panelWidth - 20, 40);
}

function drawFeedback() {
    let panelWidth = canvasWidth - 2 * margin;
    let panelHeight = 40;
    let panelX = margin;
    let panelY = drawHeight - panelHeight - 10;

    // Panel background
    if (feedback.startsWith("Correct")) {
        fill(200, 255, 200, 245);
        stroke(0, 150, 0);
    } else {
        fill(255, 200, 200, 245);
        stroke(200, 0, 0);
    }
    strokeWeight(2);
    rect(panelX, panelY, panelWidth, panelHeight, 8);

    // Feedback text
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text(feedback, panelX + panelWidth/2, panelY + panelHeight/2);
    textStyle(NORMAL);
}

function drawControlArea() {
    // Update button positions
    quizButtonX = 20;
    quizButtonY = drawHeight + 10;
    resetButtonX = quizButtonX + buttonWidth + 20;
    resetButtonY = drawHeight + 10;

    // Quiz Mode button
    let isOverQuiz = isMouseOverButton(quizButtonX, quizButtonY, buttonWidth, buttonHeight);
    if (quizMode) {
        fill(isOverQuiz ? '#1565C0' : '#1976D2');
        stroke(isOverQuiz ? '#0D47A1' : '#1565C0');
    } else {
        fill(isOverQuiz ? '#43A047' : '#4CAF50');
        stroke(isOverQuiz ? '#2E7D32' : '#43A047');
    }
    strokeWeight(1);
    rect(quizButtonX, quizButtonY, buttonWidth, buttonHeight, 5);

    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(quizMode ? 'Exit Quiz' : 'Quiz Mode', quizButtonX + buttonWidth/2, quizButtonY + buttonHeight/2);

    // Reset button
    let isOverReset = isMouseOverButton(resetButtonX, resetButtonY, buttonWidth, buttonHeight);
    fill(isOverReset ? '#757575' : '#9E9E9E');
    stroke(isOverReset ? '#616161' : '#757575');
    strokeWeight(1);
    rect(resetButtonX, resetButtonY, buttonWidth, buttonHeight, 5);

    fill('white');
    noStroke();
    text('Reset', resetButtonX + buttonWidth/2, resetButtonY + buttonHeight/2);

    // Score display (in quiz mode)
    if (quizMode) {
        fill('black');
        textAlign(LEFT, CENTER);
        textSize(14);
        text('Score: ' + score + '/' + questionsAnswered, resetButtonX + buttonWidth + 30, drawHeight + 25);
    }

    // Instructions
    fill(80);
    textAlign(RIGHT, CENTER);
    textSize(12);
    if (quizMode) {
        text('Click the highlighted symbol\'s name', canvasWidth - 20, drawHeight + 25);
    } else {
        text('Hover over symbols for details', canvasWidth - 20, drawHeight + 25);
    }
}

function isMouseOverButton(bx, by, bw, bh) {
    return mouseX >= bx && mouseX <= bx + bw && mouseY >= by && mouseY <= by + bh;
}

function mousePressed() {
    // Check Quiz Mode button
    if (isMouseOverButton(quizButtonX, quizButtonY, buttonWidth, buttonHeight)) {
        toggleQuizMode();
        return;
    }

    // Check Reset button
    if (isMouseOverButton(resetButtonX, resetButtonY, buttonWidth, buttonHeight)) {
        resetQuiz();
        return;
    }

    // In quiz mode, check if clicking on a symbol
    if (quizMode && hoveredIndex >= 0 && feedbackTimer === 0) {
        checkAnswer(hoveredIndex);
    }
}

function toggleQuizMode() {
    quizMode = !quizMode;
    if (quizMode) {
        resetQuiz();
        startNewQuestion();
    } else {
        quizIndex = -1;
        feedback = "";
        feedbackTimer = 0;
    }
}

function resetQuiz() {
    score = 0;
    questionsAnswered = 0;
    feedback = "";
    feedbackTimer = 0;
    if (quizMode) {
        startNewQuestion();
    }
}

function startNewQuestion() {
    quizIndex = Math.floor(Math.random() * groundSymbols.length);
    feedback = "";
}

function checkAnswer(selectedIndex) {
    questionsAnswered++;
    if (selectedIndex === quizIndex) {
        score++;
        feedback = "Correct! " + groundSymbols[quizIndex].name;
    } else {
        feedback = "Incorrect. That was " + groundSymbols[quizIndex].name;
    }
    feedbackTimer = 90;  // Show feedback for 1.5 seconds at 60fps
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    calculateGrid();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}

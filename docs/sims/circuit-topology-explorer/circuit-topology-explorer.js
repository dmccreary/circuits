// Circuit Topology Explorer MicroSim
// Shows circuit schematics with nodes, branches, loops, and meshes

let canvasWidth;
const canvasHeight = 550;
const margin = 20;

// Circuit selection
let selectedCircuit = 0; // 0: Simple Loop, 1: Two-Mesh, 2: Bridge
const circuitNames = ['Simple Loop', 'Two-Mesh', 'Bridge Circuit'];

// Toggle states
let showNodes = true;
let showBranches = true;
let showLoops = false;
let showMeshes = false;

// Dropdown state
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownW, dropdownH;

// Checkbox positions (set in setup)
let checkboxes = [];

// Colors
const colBg = [248, 250, 252];
const colNode = [59, 130, 246];       // blue
const colBranch = [51, 65, 85];       // dark slate
const colMesh1 = [147, 197, 253, 50]; // light blue
const colMesh2 = [253, 186, 116, 50]; // light orange
const colMesh3 = [167, 243, 208, 50]; // light green
const colLoop = [99, 102, 241];       // indigo
const colSource = [239, 68, 68];      // red
const colResistor = [107, 114, 128];  // gray
const colText = [30, 41, 59];
const colPanel = [255, 255, 255];
const colBorder = [203, 213, 225];
const colAccent = [59, 130, 246];
const colHover = [241, 245, 249];

// Circuit data: nodes, branches, meshes
let circuits = [];

function setup() {
    canvasWidth = min(windowWidth - 40, 800);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent('main');
    textFont('Arial');
    buildCircuits();
    setupControls();
}

function windowResized() {
    canvasWidth = min(windowWidth - 40, 800);
    resizeCanvas(canvasWidth, canvasHeight);
    buildCircuits();
    setupControls();
}

function buildCircuits() {
    let cx = canvasWidth / 2;
    let cy = 310;
    let w = min(canvasWidth - 120, 500);
    let h = 200;
    let hw = w / 2;
    let hh = h / 2;

    // Simple Loop: 3 nodes, 3 branches, 1 mesh
    // A(top-left) -- B(top-right) -- C(bottom-right) -- A(bottom-left same as A)
    // Actually: rectangle with source on left, R1 on top, R2 on right
    let sl_A = { x: cx - hw, y: cy - hh, label: 'A' };
    let sl_B = { x: cx + hw, y: cy - hh, label: 'B' };
    let sl_C = { x: cx + hw, y: cy + hh, label: 'C' };
    // Actually for simple loop with 3 nodes we need a triangular or 3-node arrangement
    // Let's do: A(top-left), B(top-right), C(bottom-center) with source A-C, R1 A-B, R2 B-C
    // Better: rectangular with A(top-left), B(top-right), and wire along bottom
    // Simple Loop: A -- R1 -- B -- R2 -- C -- Vs -- A (but that's actually still a single loop)
    // Let me do: 3 nodes in a triangle-like arrangement
    // Simplest: A(left), B(top-right), C(bottom-right)

    // Reconsider: Simple Loop with 1 source + 2 resistors = 3 components, 3 nodes
    // A --[Vs]--> B --[R1]--> C --[R2]--> A  (series circuit, single mesh)
    let sA = { x: cx - hw, y: cy - hh, label: 'A' };
    let sB = { x: cx + hw, y: cy - hh, label: 'B' };
    let sC = { x: cx + hw, y: cy + hh, label: 'C' };
    // Connect: A-bottom to C via wire, C to B via R2, B to A via R1...
    // Better layout: rectangular
    let sD_pos = { x: cx - hw, y: cy + hh }; // this is same node as A (wire from A bottom to A top)

    // Let me just use a clean rectangular layout:
    // A(top-left) - R1 - B(top-right)
    // |                    |
    // Vs                  R2
    // |                    |
    // C(bot-left) ------- D(bot-right)  where C and D are connected by wire
    // But that's 4 nodes... For 3 nodes: merge C and D
    // A(top-left) - R1 - B(top-right)
    // |                    |
    // Vs                  R2
    // |                    |
    // C(bottom, spans full width)

    circuits = [];

    // === SIMPLE LOOP ===
    let s_nodes = [
        { x: cx - hw, y: cy - hh, label: 'A' },
        { x: cx + hw, y: cy - hh, label: 'B' },
        { x: cx, y: cy + hh, label: 'C' }
    ];
    let s_branches = [
        { from: 0, to: 1, type: 'resistor', label: 'R1', mid: null },
        { from: 1, to: 2, type: 'resistor', label: 'R2', mid: null },
        { from: 2, to: 0, type: 'source', label: 'Vs', mid: null }
    ];
    let s_meshes = [
        { nodeIndices: [0, 1, 2], color: colMesh1 }
    ];
    circuits.push({
        nodes: s_nodes, branches: s_branches, meshes: s_meshes,
        n: 3, b: 3, m: 1
    });

    // === TWO-MESH ===
    // 4 nodes, 5 branches, 2 meshes
    // A --- R1 --- B --- R2 --- C
    // |           |            |
    // Vs          R3          R4... no, spec says 1 source + 3 resistors, 5 branches
    // Wait: 4 nodes, 5 branches: b = n-1+m => 5 = 4-1+2 = 5. Check.
    // 1 source + 3 resistors = 4 components. But 5 branches...
    // Branches are connections between nodes. We can have wire branches.
    // Layout:
    // A(top-left) --R1-- B(top-right)
    // |                   |
    // Vs                 R2
    // |                   |
    // D(bot-left) --R3-- C(bot-right)
    // That's 4 nodes, 4 branches, and b=n-1+m => 4=3+m => m=1. Only 1 mesh.
    // For 2 meshes we need 5 branches. Add a branch B-D or A-C.
    // Better:
    // A --R1-- B --R2-- C
    // |        |        |
    // Vs      R3       (wire)
    // |        |        |
    // D ------wire----- (D connects bottom)
    // Nodes: A(tl), B(tm), C(tr), D(bottom spanning)
    // Branches: A-B(R1), B-C(R2), A-D(Vs), B-D(R3), C-D(wire)
    // That's 5 branches, 4 nodes, 2 meshes.

    let tm_hw = hw * 0.9;
    let t_nodes = [
        { x: cx - tm_hw, y: cy - hh, label: 'A' },
        { x: cx, y: cy - hh, label: 'B' },
        { x: cx + tm_hw, y: cy - hh, label: 'C' },
        { x: cx, y: cy + hh, label: 'D' }
    ];
    let t_branches = [
        { from: 0, to: 1, type: 'resistor', label: 'R1', mid: null },
        { from: 1, to: 2, type: 'resistor', label: 'R2', mid: null },
        { from: 0, to: 3, type: 'source', label: 'Vs', mid: { x: cx - tm_hw, y: cy + hh } },
        { from: 1, to: 3, type: 'resistor', label: 'R3', mid: null },
        { from: 2, to: 3, type: 'wire', label: '', mid: { x: cx + tm_hw, y: cy + hh } }
    ];
    let t_meshes = [
        { nodeIndices: [0, 1, 3], color: colMesh1, extraPoints: [{ x: cx - tm_hw, y: cy + hh }] },
        { nodeIndices: [1, 2, 3], color: colMesh2, extraPoints: [{ x: cx + tm_hw, y: cy + hh }] }
    ];
    circuits.push({
        nodes: t_nodes, branches: t_branches, meshes: t_meshes,
        n: 4, b: 5, m: 2
    });

    // === BRIDGE (Wheatstone) ===
    // 4 nodes, 6 branches, 3 meshes
    // Classic diamond shape:
    //       A (top)
    //      / \
    //    R1   R2
    //    /     \
    //   B -R5- C
    //    \     /
    //    R3   R4
    //      \ /
    //       D (bottom, with Vs from D to A)
    // Nodes: A, B, C, D
    // Branches: A-B(R1), A-C(R2), B-C(R5), B-D(R3), C-D(R4), D-A(Vs)
    // 6 branches, 4 nodes. b=n-1+m => 6=3+m => m=3.

    let bh = hh * 0.95;
    let bw2 = hw * 0.75;
    let b_nodes = [
        { x: cx, y: cy - bh, label: 'A' },
        { x: cx - bw2, y: cy, label: 'B' },
        { x: cx + bw2, y: cy, label: 'C' },
        { x: cx, y: cy + bh, label: 'D' }
    ];
    let b_branches = [
        { from: 0, to: 1, type: 'resistor', label: 'R1', mid: null },
        { from: 0, to: 2, type: 'resistor', label: 'R2', mid: null },
        { from: 1, to: 2, type: 'resistor', label: 'R5', mid: null },
        { from: 1, to: 3, type: 'resistor', label: 'R3', mid: null },
        { from: 2, to: 3, type: 'resistor', label: 'R4', mid: null },
        { from: 3, to: 0, type: 'source', label: 'Vs', mid: null }
    ];
    // For the bridge source, draw it on the left side as a vertical branch
    // Actually let's route it: D to A directly (vertical)
    let b_meshes = [
        { nodeIndices: [0, 1, 2], color: colMesh1 },      // top triangle
        { nodeIndices: [1, 2, 3], color: colMesh2 },      // bottom triangle
        { nodeIndices: [0, 1, 3], color: colMesh3 }       // left outer
    ];
    circuits.push({
        nodes: b_nodes, branches: b_branches, meshes: b_meshes,
        n: 4, b: 6, m: 3
    });
}

function setupControls() {
    dropdownX = margin;
    dropdownY = 10;
    dropdownW = 180;
    dropdownH = 32;

    let cbX = dropdownX + dropdownW + 30;
    let cbGap = 100;
    checkboxes = [
        { x: cbX, y: dropdownY + 6, label: 'Nodes', state: () => showNodes, toggle: () => { showNodes = !showNodes; } },
        { x: cbX + cbGap, y: dropdownY + 6, label: 'Branches', state: () => showBranches, toggle: () => { showBranches = !showBranches; } },
        { x: cbX + cbGap * 2, y: dropdownY + 6, label: 'Loops', state: () => showLoops, toggle: () => { showLoops = !showLoops; } },
        { x: cbX + cbGap * 3, y: dropdownY + 6, label: 'Meshes', state: () => showMeshes, toggle: () => { showMeshes = !showMeshes; } }
    ];
}

function draw() {
    background(colBg);

    drawControlPanel();
    drawCircuit();
    drawInfoPanel();
}

function drawControlPanel() {
    // Panel background
    fill(colPanel);
    stroke(colBorder);
    strokeWeight(1);
    rect(margin - 5, 2, canvasWidth - 2 * margin + 10, 44, 8);

    // Dropdown button
    let hovering = mouseInRect(dropdownX, dropdownY, dropdownW, dropdownH);
    fill(hovering ? colHover : colPanel);
    stroke(colBorder);
    strokeWeight(1.5);
    rect(dropdownX, dropdownY, dropdownW, dropdownH, 6);
    fill(colText);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text(circuitNames[selectedCircuit], dropdownX + 10, dropdownY + dropdownH / 2);
    // Arrow
    let ax = dropdownX + dropdownW - 22;
    let ay = dropdownY + dropdownH / 2;
    fill(colText);
    triangle(ax, ay - 3, ax + 10, ay - 3, ax + 5, ay + 4);

    // Checkboxes
    for (let cb of checkboxes) {
        drawCheckbox(cb);
    }

    // Dropdown menu (drawn last/on top in draw order handled later)
}

function drawCheckbox(cb) {
    let size = 16;
    let hovering = mouseInRect(cb.x, cb.y, size, size);
    stroke(colBorder);
    strokeWeight(1.5);
    fill(cb.state() ? colAccent : (hovering ? colHover : colPanel));
    rect(cb.x, cb.y, size, size, 3);
    if (cb.state()) {
        stroke(255);
        strokeWeight(2);
        noFill();
        line(cb.x + 3, cb.y + 8, cb.x + 7, cb.y + 12);
        line(cb.x + 7, cb.y + 12, cb.x + 13, cb.y + 4);
    }
    noStroke();
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    text(cb.label, cb.x + size + 5, cb.y + size / 2);
}

function drawCircuit() {
    let c = circuits[selectedCircuit];

    // Draw meshes (filled regions)
    if (showMeshes) {
        for (let mesh of c.meshes) {
            drawMeshRegion(c, mesh);
        }
    }

    // Draw branches
    if (showBranches) {
        for (let br of c.branches) {
            drawBranch(c, br);
        }
    }

    // Draw loop arrows
    if (showLoops) {
        for (let i = 0; i < c.meshes.length; i++) {
            drawLoopArrow(c, c.meshes[i], i);
        }
    }

    // Draw nodes
    if (showNodes) {
        for (let nd of c.nodes) {
            drawNode(nd);
        }
    }

    // Draw dropdown overlay if open
    if (dropdownOpen) {
        drawDropdownMenu();
    }
}

function drawMeshRegion(c, mesh) {
    let col = mesh.color;
    fill(col[0], col[1], col[2], col[3]);
    stroke(col[0], col[1], col[2], 100);
    strokeWeight(1);
    beginShape();
    for (let idx of mesh.nodeIndices) {
        vertex(c.nodes[idx].x, c.nodes[idx].y);
    }
    if (mesh.extraPoints) {
        for (let pt of mesh.extraPoints) {
            vertex(pt.x, pt.y);
        }
    }
    endShape(CLOSE);
}

function drawBranch(c, br) {
    let n1 = c.nodes[br.from];
    let n2 = c.nodes[br.to];
    let mx, my;

    if (br.mid) {
        mx = br.mid.x;
        my = br.mid.y;
        // Draw two-segment branch
        if (br.type === 'source') {
            drawWireSeg(n1.x, n1.y, mx, my);
            drawWireSeg(mx, my, n2.x, n2.y);
            let smx = (n1.x + mx) / 2;
            let smy = (n1.y + my) / 2;
            // Check if vertical or horizontal for better placement
            if (abs(n1.x - mx) < 5) {
                // vertical segment - put source symbol here
                drawSourceSymbol(n1.x, (n1.y + my) / 2, br.label, true);
            } else {
                drawSourceSymbol((n1.x + mx) / 2, n1.y, br.label, false);
            }
        } else if (br.type === 'wire') {
            drawWireSeg(n1.x, n1.y, mx, my);
            drawWireSeg(mx, my, n2.x, n2.y);
        } else {
            drawWireSeg(n1.x, n1.y, mx, my);
            drawWireSeg(mx, my, n2.x, n2.y);
        }
    } else {
        mx = (n1.x + n2.x) / 2;
        my = (n1.y + n2.y) / 2;
        if (br.type === 'resistor') {
            drawResistorOnLine(n1.x, n1.y, n2.x, n2.y, br.label);
        } else if (br.type === 'source') {
            drawSourceOnLine(n1.x, n1.y, n2.x, n2.y, br.label);
        } else {
            drawWireSeg(n1.x, n1.y, n2.x, n2.y);
        }
    }
}

function drawWireSeg(x1, y1, x2, y2) {
    stroke(colBranch);
    strokeWeight(2.5);
    line(x1, y1, x2, y2);
}

function drawResistorOnLine(x1, y1, x2, y2, label) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    let ux = dx / len;
    let uy = dy / len;
    let px = -uy; // perpendicular
    let py = ux;

    // Wire segments before and after resistor
    let rLen = 40; // resistor zigzag length
    let startFrac = 0.5 - rLen / (2 * len);
    let endFrac = 0.5 + rLen / (2 * len);

    let sx = x1 + dx * startFrac;
    let sy = y1 + dy * startFrac;
    let ex = x1 + dx * endFrac;
    let ey = y1 + dy * endFrac;

    // Wires
    stroke(colBranch);
    strokeWeight(2.5);
    line(x1, y1, sx, sy);
    line(ex, ey, x2, y2);

    // Zigzag resistor
    let numZags = 6;
    let zagAmp = 7;
    stroke(colResistor);
    strokeWeight(2);
    noFill();
    beginShape();
    vertex(sx, sy);
    for (let i = 1; i < numZags; i++) {
        let t = i / numZags;
        let zx = sx + (ex - sx) * t;
        let zy = sy + (ey - sy) * t;
        let side = (i % 2 === 0) ? 1 : -1;
        vertex(zx + px * zagAmp * side, zy + py * zagAmp * side);
    }
    vertex(ex, ey);
    endShape();

    // Label
    let lx = (sx + ex) / 2 + px * 18;
    let ly = (sy + ey) / 2 + py * 18;
    noStroke();
    fill(colResistor);
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(label, lx, ly);
    textStyle(NORMAL);
}

function drawSourceOnLine(x1, y1, x2, y2, label) {
    let dx = x2 - x1;
    let dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    let ux = dx / len;
    let uy = dy / len;
    let px = -uy;
    let py = ux;

    let cx = (x1 + x2) / 2;
    let cy2 = (y1 + y2) / 2;
    let r = 18;

    // Wires to circle
    stroke(colBranch);
    strokeWeight(2.5);
    line(x1, y1, cx - ux * r, cy2 - uy * r);
    line(cx + ux * r, cy2 + uy * r, x2, y2);

    // Circle
    stroke(colSource);
    strokeWeight(2);
    noFill();
    ellipse(cx, cy2, r * 2, r * 2);

    // Plus and minus
    fill(colSource);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    text('+', cx - ux * 8 + px * 0, cy2 - uy * 8 + py * 0);
    textSize(18);
    text('-', cx + ux * 8, cy2 + uy * 8);

    // Label
    let lx = cx + px * (r + 16);
    let ly = cy2 + py * (r + 16);
    textSize(13);
    fill(colSource);
    textStyle(BOLD);
    text(label, lx, ly);
    textStyle(NORMAL);
}

function drawSourceSymbol(cx, cy, label, vertical) {
    let r = 18;
    stroke(colSource);
    strokeWeight(2);
    noFill();
    ellipse(cx, cy, r * 2, r * 2);

    fill(colSource);
    noStroke();
    textSize(16);
    textAlign(CENTER, CENTER);
    if (vertical) {
        text('+', cx, cy - 7);
        textSize(18);
        text('-', cx, cy + 7);
        textSize(13);
        textStyle(BOLD);
        text(label, cx - r - 16, cy);
    } else {
        text('+', cx - 7, cy);
        textSize(18);
        text('-', cx + 7, cy);
        textSize(13);
        textStyle(BOLD);
        text(label, cx, cy - r - 12);
    }
    textStyle(NORMAL);
}

function drawNode(nd) {
    // Filled circle
    fill(colNode);
    noStroke();
    ellipse(nd.x, nd.y, 22, 22);
    // Label
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(nd.label, nd.x, nd.y);
    textStyle(NORMAL);
}

function drawLoopArrow(c, mesh, idx) {
    // Compute centroid
    let cx2 = 0, cy2 = 0;
    for (let i of mesh.nodeIndices) {
        cx2 += c.nodes[i].x;
        cy2 += c.nodes[i].y;
    }
    if (mesh.extraPoints) {
        for (let pt of mesh.extraPoints) {
            cx2 += pt.x;
            cy2 += pt.y;
        }
        let total = mesh.nodeIndices.length + mesh.extraPoints.length;
        cx2 /= total;
        cy2 /= total;
    } else {
        cx2 /= mesh.nodeIndices.length;
        cy2 /= mesh.nodeIndices.length;
    }

    // Draw circular arrow
    let r = 20;
    noFill();
    stroke(colLoop);
    strokeWeight(2);
    arc(cx2, cy2, r * 2, r * 2, -PI * 0.8, PI * 0.5);
    // Arrowhead
    let ax2 = cx2 + r * cos(PI * 0.5);
    let ay2 = cy2 + r * sin(PI * 0.5);
    fill(colLoop);
    noStroke();
    let aSize = 6;
    triangle(ax2 - aSize, ay2 - aSize / 2, ax2 + aSize / 2, ay2, ax2 - aSize, ay2 + aSize / 2);

    // Label
    textSize(12);
    textAlign(CENTER, CENTER);
    fill(colLoop);
    textStyle(BOLD);
    text('I' + (idx + 1), cx2, cy2);
    textStyle(NORMAL);
}

function drawInfoPanel() {
    let c = circuits[selectedCircuit];
    let panelY = canvasHeight - 100;
    let panelH = 85;

    fill(colPanel);
    stroke(colBorder);
    strokeWeight(1);
    rect(margin, panelY, canvasWidth - 2 * margin, panelH, 8);

    // Counters
    fill(colText);
    noStroke();
    textSize(15);
    textAlign(LEFT, TOP);
    let tx = margin + 15;
    let ty = panelY + 12;

    textStyle(BOLD);
    text('Topology Counts', tx, ty);
    textStyle(NORMAL);

    ty += 24;
    textSize(14);

    // Node count
    fill(colNode);
    text('Nodes (n): ' + c.n, tx, ty);

    // Branch count
    fill(colBranch);
    text('Branches (b): ' + c.b, tx + 150, ty);

    // Mesh count
    fill(colLoop);
    text('Meshes (m): ' + c.m, tx + 330, ty);

    // Formula
    ty += 26;
    let bCalc = c.n - 1 + c.m;
    let verified = (bCalc === c.b);
    fill(colText);
    textSize(14);
    textStyle(BOLD);
    let formula = 'b = n - 1 + m  =>  ' + c.b + ' = ' + c.n + ' - 1 + ' + c.m + ' = ' + bCalc;
    text(formula, tx, ty);

    // Verification badge
    let fw = textWidth(formula);
    if (verified) {
        fill(34, 197, 94);
        textSize(13);
        text('  Verified', tx + fw + 5, ty);
    } else {
        fill(239, 68, 68);
        textSize(13);
        text('  Mismatch!', tx + fw + 5, ty);
    }
    textStyle(NORMAL);
}

function drawDropdownMenu() {
    let x = dropdownX;
    let y = dropdownY + dropdownH + 2;
    let w = dropdownW;
    let itemH = 32;

    // Shadow
    noStroke();
    fill(0, 0, 0, 20);
    rect(x + 3, y + 3, w, itemH * circuitNames.length, 6);

    // Menu background
    fill(colPanel);
    stroke(colBorder);
    strokeWeight(1);
    rect(x, y, w, itemH * circuitNames.length, 6);

    for (let i = 0; i < circuitNames.length; i++) {
        let iy = y + i * itemH;
        let hovering = mouseInRect(x, iy, w, itemH);
        if (hovering) {
            fill(colHover);
            noStroke();
            rect(x + 1, iy + 1, w - 2, itemH - 2, i === 0 ? 5 : 0, i === 0 ? 5 : 0,
                i === circuitNames.length - 1 ? 5 : 0, i === circuitNames.length - 1 ? 5 : 0);
        }
        fill(i === selectedCircuit ? colAccent : colText);
        noStroke();
        textSize(13);
        textAlign(LEFT, CENTER);
        text(circuitNames[i], x + 12, iy + itemH / 2);
    }
}

function mousePressed() {
    // Check dropdown
    if (dropdownOpen) {
        let x = dropdownX;
        let y = dropdownY + dropdownH + 2;
        let itemH = 32;
        for (let i = 0; i < circuitNames.length; i++) {
            if (mouseInRect(x, y + i * itemH, dropdownW, itemH)) {
                selectedCircuit = i;
                dropdownOpen = false;
                return;
            }
        }
        dropdownOpen = false;
        return;
    }

    // Check dropdown button
    if (mouseInRect(dropdownX, dropdownY, dropdownW, dropdownH)) {
        dropdownOpen = !dropdownOpen;
        return;
    }

    // Check checkboxes
    for (let cb of checkboxes) {
        if (mouseInRect(cb.x, cb.y, 16, 16)) {
            cb.toggle();
            return;
        }
    }
}

function mouseInRect(rx, ry, rw, rh) {
    return mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh;
}

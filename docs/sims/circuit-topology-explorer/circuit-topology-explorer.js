// Circuit Topology Explorer MicroSim — Redesigned

let canvasWidth;
const canvasHeight = 620;
const margin = 12;

// Circuit selection
let selectedCircuit = 0;
const circuitNames = ['Simple Loop', 'Two-Mesh', 'Bridge Circuit'];

// Toggle states
let showNodes = true;
let showBranches = true;
let showLoops = false;
let showMeshes = false;

// What was last focused (for explanation panel)
let lastFocus = 'overview'; // 'nodes' | 'branches' | 'loops' | 'meshes' | 'overview'

// Dropdown
let dropdownOpen = false;
let dropdownX, dropdownY, dropdownW, dropdownH;

// Toggle pill buttons
let toggleButtons = [];

// Layout regions (computed in buildLayout)
let diagramX, diagramY, diagramW, diagramH;
let explX, explY, explW, explH;
let cardY, cardH;

// ── Colors ──────────────────────────────────────────────────────────────────
const colBg         = [245, 247, 250];
const colNode       = [37,  99,  235];        // blue-600
const colBranch     = [51,  65,  85];         // slate-700
const colMesh1      = [147, 197, 253, 65];    // blue tint
const colMesh2      = [253, 186, 116, 65];    // orange tint
const colMesh3      = [167, 243, 208, 65];    // green tint
const colLoop       = [99,  102, 241];        // indigo-500
const colSource     = [220,  38,  38];        // red-600
const colResistor   = [71,   85, 105];        // slate-600
const colText       = [15,   23,  42];
const colMuted      = [100, 116, 139];        // slate-500
const colPanel      = [255, 255, 255];
const colBorder     = [203, 213, 225];
const colAccent     = [37,   99, 235];
const colHover      = [241, 245, 249];
const colCardBg     = [239, 246, 255];
const colCardBorder = [147, 197, 253];
const colGreenBg    = [220, 252, 231];
const colGreenText  = [22,  163,  74];

let circuits = [];

// ── Definitions for explanation panel ───────────────────────────────────────
const definitions = {
    overview: {
        title: 'Circuit Topology',
        body: 'Topology describes the structure of a circuit — how nodes, branches, and meshes connect. Use the toggles above to highlight each element and explore how they relate.',
        formula: 'b = n \u2212 1 + m',
        formulaNote: 'This formula links branches, nodes, and meshes for any planar circuit.'
    },
    nodes: {
        title: 'Nodes',
        body: 'A node is a junction where two or more branches meet. Nodes are where KCL (Kirchhoff\u2019s Current Law) is applied — the sum of currents entering equals the sum leaving.',
        formula: 'KCL: \u03a3 I\u1d62\u2099 = \u03a3 I\u2092\u1d64\u209c',
        formulaNote: 'n \u2212 1 independent node equations needed.'
    },
    branches: {
        title: 'Branches',
        body: 'A branch is a single two-terminal element (resistor, source, or wire) connecting two nodes. Each branch carries one current, so b branches give b unknowns.',
        formula: 'KVL + KCL = b equations',
        formulaNote: 'b = n \u2212 1 + m'
    },
    loops: {
        title: 'Loops',
        body: 'A loop is any closed path through the circuit. KVL (Kirchhoff\u2019s Voltage Law) states the sum of voltages around any closed loop equals zero.',
        formula: 'KVL: \u03a3 V = 0',
        formulaNote: 'Each mesh provides one independent KVL equation.'
    },
    meshes: {
        title: 'Meshes',
        body: 'A mesh is a loop that contains no smaller loops inside it (a "window" of the circuit). The number of independent KVL equations equals the number of meshes.',
        formula: 'm = b \u2212 n + 1',
        formulaNote: 'Meshes are the smallest independent loops.'
    }
};

// ── Setup & Resize ───────────────────────────────────────────────────────────
function setup() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 820);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    buildLayout();
    buildCircuits();
    setupControls();
}

function windowResized() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 820);
    resizeCanvas(canvasWidth, canvasHeight);
    buildLayout();
    buildCircuits();
    setupControls();
}

function buildLayout() {
    const ctrlH = 52;
    const bottomH = 118;
    const gutter = 10;
    const mainTop = ctrlH + gutter;
    const mainBot = canvasHeight - bottomH - gutter;
    const mainH = mainBot - mainTop;

    // Diagram occupies left ~57%
    diagramW = floor(canvasWidth * 0.56) - margin;
    diagramX = margin;
    diagramY = mainTop;
    diagramH = mainH;

    // Explanation panel: right remainder
    explX = diagramX + diagramW + gutter;
    explY = mainTop;
    explW = canvasWidth - explX - margin;
    explH = mainH;

    // Bottom topology card
    cardY = mainBot + gutter;
    cardH = bottomH;
}

// ── Circuit Data ─────────────────────────────────────────────────────────────
function buildCircuits() {
    const cx = diagramX + diagramW / 2;
    const cy = diagramY + diagramH / 2 - 10;
    const w  = min(diagramW - 40, 340);
    const h  = min(diagramH - 60, 200);
    const hw = w / 2;
    const hh = h / 2;

    circuits = [];

    // ── SIMPLE LOOP: 3 nodes, 3 branches, 1 mesh ──
    circuits.push({
        nodes: [
            { x: cx - hw, y: cy - hh, label: 'A' },
            { x: cx + hw, y: cy - hh, label: 'B' },
            { x: cx,      y: cy + hh, label: 'C' }
        ],
        branches: [
            { from: 0, to: 1, type: 'resistor', label: 'R1', mid: null },
            { from: 1, to: 2, type: 'resistor', label: 'R2', mid: null },
            { from: 2, to: 0, type: 'source',   label: 'Vs', mid: null }
        ],
        meshes: [
            { nodeIndices: [0, 1, 2], extraPoints: null, color: colMesh1 }
        ],
        n: 3, b: 3, m: 1
    });

    // ── TWO-MESH: 4 nodes, 5 branches, 2 meshes ──
    const tm = hw * 0.92;
    circuits.push({
        nodes: [
            { x: cx - tm, y: cy - hh, label: 'A' },
            { x: cx,      y: cy - hh, label: 'B' },
            { x: cx + tm, y: cy - hh, label: 'C' },
            { x: cx,      y: cy + hh, label: 'D' }
        ],
        branches: [
            { from: 0, to: 1, type: 'resistor', label: 'R1', mid: null },
            { from: 1, to: 2, type: 'resistor', label: 'R2', mid: null },
            { from: 0, to: 3, type: 'source',   label: 'Vs', mid: { x: cx - tm, y: cy + hh } },
            { from: 1, to: 3, type: 'resistor', label: 'R3', mid: null },
            { from: 2, to: 3, type: 'wire',     label: '',   mid: { x: cx + tm, y: cy + hh } }
        ],
        meshes: [
            { nodeIndices: [0, 1, 3], extraPoints: [{ x: cx - tm, y: cy + hh }], color: colMesh1 },
            { nodeIndices: [1, 2, 3], extraPoints: [{ x: cx + tm, y: cy + hh }], color: colMesh2 }
        ],
        n: 4, b: 5, m: 2
    });

    // ── BRIDGE: 4 nodes, 6 branches, 3 meshes ──
    const bh2 = hh * 0.95;
    const bw2 = hw * 0.72;
    circuits.push({
        nodes: [
            { x: cx,       y: cy - bh2, label: 'A' },
            { x: cx - bw2, y: cy,       label: 'B' },
            { x: cx + bw2, y: cy,       label: 'C' },
            { x: cx,       y: cy + bh2, label: 'D' }
        ],
        branches: [
            { from: 0, to: 1, type: 'resistor', label: 'R1', mid: null },
            { from: 0, to: 2, type: 'resistor', label: 'R2', mid: null },
            { from: 1, to: 2, type: 'resistor', label: 'R5', mid: null },
            { from: 1, to: 3, type: 'resistor', label: 'R3', mid: null },
            { from: 2, to: 3, type: 'resistor', label: 'R4', mid: null },
            { from: 3, to: 0, type: 'source',   label: 'Vs', mid: null }
        ],
        meshes: [
            { nodeIndices: [0, 1, 2], extraPoints: null, color: colMesh1 },
            { nodeIndices: [1, 2, 3], extraPoints: null, color: colMesh2 },
            { nodeIndices: [0, 1, 3], extraPoints: null, color: colMesh3 }
        ],
        n: 4, b: 6, m: 3
    });
}

// ── Controls ─────────────────────────────────────────────────────────────────
function setupControls() {
    dropdownX = margin;
    dropdownY = 10;
    dropdownW = 175;
    dropdownH = 32;

    // Toggle pill buttons: [label, getter, setter, focusKey, activeColor]
    const btnDefs = [
        { label: 'Nodes',    get: () => showNodes,    set: () => { showNodes    = !showNodes;    lastFocus = 'nodes'; },    key: 'nodes',    col: colNode },
        { label: 'Branches', get: () => showBranches, set: () => { showBranches = !showBranches; lastFocus = 'branches'; }, key: 'branches', col: colBranch },
        { label: 'Loops',    get: () => showLoops,    set: () => { showLoops    = !showLoops;    lastFocus = 'loops'; },    key: 'loops',    col: colLoop },
        { label: 'Meshes',   get: () => showMeshes,   set: () => { showMeshes   = !showMeshes;   lastFocus = 'meshes'; },   key: 'meshes',   col: colMesh1 }
    ];

    // Lay out pills starting after dropdown + label
    const labelW  = 120; // "Display Options:"
    let bx = dropdownX + dropdownW + labelW + 8;
    const bGap = 8;
    const bH  = 28;
    toggleButtons = [];

    for (let def of btnDefs) {
        // Measure approx width: label + padding
        const bW = def.label.length * 7 + 24;
        toggleButtons.push({ x: bx, y: 12, w: bW, h: bH, ...def });
        bx += bW + bGap;
    }
}

// ── Main Draw ─────────────────────────────────────────────────────────────────
function draw() {
    background(colBg[0], colBg[1], colBg[2]);
    drawControlBar();
    drawDiagramPanel();
    drawExplPanel();
    drawTopologyCard();
    if (dropdownOpen) drawDropdownMenu();
}

// ── Control Bar ───────────────────────────────────────────────────────────────
function drawControlBar() {
    // Panel
    fill(colPanel[0], colPanel[1], colPanel[2]);
    stroke(colBorder[0], colBorder[1], colBorder[2]);
    strokeWeight(1);
    rect(margin, 5, canvasWidth - 2 * margin, 42, 8);

    // Circuit dropdown
    const hov = mouseInRect(dropdownX, dropdownY, dropdownW, dropdownH);
    fill(hov ? colHover[0] : colPanel[0], hov ? colHover[1] : colPanel[1], hov ? colHover[2] : colPanel[2]);
    stroke(colBorder[0], colBorder[1], colBorder[2]);
    strokeWeight(1.5);
    rect(dropdownX, dropdownY, dropdownW, dropdownH, 6);
    fill(colText[0], colText[1], colText[2]);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text(circuitNames[selectedCircuit], dropdownX + 10, dropdownY + dropdownH / 2);
    // Arrow
    const ax = dropdownX + dropdownW - 20;
    const ay = dropdownY + dropdownH / 2;
    fill(colMuted[0], colMuted[1], colMuted[2]);
    triangle(ax, ay - 4, ax + 10, ay - 4, ax + 5, ay + 4);

    // "Display Options:" label
    fill(colMuted[0], colMuted[1], colMuted[2]);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Display Options:', dropdownX + dropdownW + 10, dropdownY + dropdownH / 2);

    // Toggle pill buttons
    for (const btn of toggleButtons) {
        drawPillToggle(btn);
    }
}

function drawPillToggle(btn) {
    const on  = btn.get();
    const hov = mouseInRect(btn.x, btn.y, btn.w, btn.h);
    const c   = btn.col;

    noStroke();
    if (on) {
        fill(c[0], c[1], c[2]);
        rect(btn.x, btn.y, btn.w, btn.h, btn.h / 2);
        fill(255, 255, 255);
    } else {
        stroke(colBorder[0], colBorder[1], colBorder[2]);
        strokeWeight(1.5);
        fill(hov ? colHover[0] : colPanel[0], hov ? colHover[1] : colPanel[1], hov ? colHover[2] : colPanel[2]);
        rect(btn.x, btn.y, btn.w, btn.h, btn.h / 2);
        noStroke();
        fill(colMuted[0], colMuted[1], colMuted[2]);
    }
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(btn.label, btn.x + btn.w / 2, btn.y + btn.h / 2);
}

// ── Diagram Panel ─────────────────────────────────────────────────────────────
function drawDiagramPanel() {
    // Panel background
    fill(colPanel[0], colPanel[1], colPanel[2]);
    stroke(colBorder[0], colBorder[1], colBorder[2]);
    strokeWeight(1);
    rect(diagramX, diagramY, diagramW, diagramH, 10);

    // Title
    fill(colText[0], colText[1], colText[2]);
    noStroke();
    textSize(13);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text(circuitNames[selectedCircuit], diagramX + diagramW / 2, diagramY + 10);
    textStyle(NORMAL);

    // Clip drawing to panel
    drawingContext.save();
    drawingContext.beginPath();
    drawingContext.roundRect(diagramX + 1, diagramY + 1, diagramW - 2, diagramH - 2, 9);
    drawingContext.clip();

    drawCircuit();

    drawingContext.restore();
}

function drawCircuit() {
    const c = circuits[selectedCircuit];

    if (showMeshes) {
        for (const mesh of c.meshes) drawMeshRegion(c, mesh);
    }
    if (showBranches) {
        for (const br of c.branches) drawBranch(c, br);
    }
    if (showLoops) {
        for (let i = 0; i < c.meshes.length; i++) drawLoopArrow(c, c.meshes[i], i);
    }
    if (showNodes) {
        for (const nd of c.nodes) drawNode(nd);
    }
}

function drawMeshRegion(c, mesh) {
    const col = mesh.color;
    fill(col[0], col[1], col[2], col[3]);
    stroke(col[0], col[1], col[2], 110);
    strokeWeight(1.5);
    beginShape();
    for (const idx of mesh.nodeIndices) vertex(c.nodes[idx].x, c.nodes[idx].y);
    if (mesh.extraPoints) for (const pt of mesh.extraPoints) vertex(pt.x, pt.y);
    endShape(CLOSE);
}

function drawBranch(c, br) {
    const n1 = c.nodes[br.from];
    const n2 = c.nodes[br.to];

    if (br.mid) {
        const mx = br.mid.x, my = br.mid.y;
        if (br.type === 'source') {
            // Determine which segment is longer — put source there
            const d1 = dist(n1.x, n1.y, mx, my);
            const d2 = dist(mx, my, n2.x, n2.y);
            if (d1 >= d2) {
                drawSourceOnLine(n1.x, n1.y, mx, my, br.label);
                drawWireSeg(mx, my, n2.x, n2.y);
            } else {
                drawWireSeg(n1.x, n1.y, mx, my);
                drawSourceOnLine(mx, my, n2.x, n2.y, br.label);
            }
        } else {
            drawWireSeg(n1.x, n1.y, mx, my);
            drawWireSeg(mx, my, n2.x, n2.y);
        }
    } else {
        if (br.type === 'resistor')      drawResistorOnLine(n1.x, n1.y, n2.x, n2.y, br.label);
        else if (br.type === 'source')   drawSourceOnLine(n1.x, n1.y, n2.x, n2.y, br.label);
        else                             drawWireSeg(n1.x, n1.y, n2.x, n2.y);
    }
}

function drawWireSeg(x1, y1, x2, y2) {
    stroke(colBranch[0], colBranch[1], colBranch[2]);
    strokeWeight(2.5);
    line(x1, y1, x2, y2);
}

function drawResistorOnLine(x1, y1, x2, y2, label) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    const px = -uy,      py = ux;
    const rLen = 44;
    const sf = 0.5 - rLen / (2 * len);
    const ef = 0.5 + rLen / (2 * len);
    const sx = x1 + dx * sf, sy = y1 + dy * sf;
    const ex = x1 + dx * ef, ey = y1 + dy * ef;

    stroke(colBranch[0], colBranch[1], colBranch[2]); strokeWeight(2.5);
    line(x1, y1, sx, sy);
    line(ex, ey, x2, y2);

    const numZags = 6, zagAmp = 8;
    stroke(colResistor[0], colResistor[1], colResistor[2]); strokeWeight(2); noFill();
    beginShape();
    vertex(sx, sy);
    for (let i = 1; i < numZags; i++) {
        const t = i / numZags;
        const side = (i % 2 === 0) ? 1 : -1;
        vertex(sx + (ex - sx) * t + px * zagAmp * side,
               sy + (ey - sy) * t + py * zagAmp * side);
    }
    vertex(ex, ey);
    endShape();

    // Label
    noStroke(); fill(colResistor[0], colResistor[1], colResistor[2]); textSize(12); textAlign(CENTER, CENTER); textStyle(BOLD);
    text(label, (sx + ex) / 2 + px * 20, (sy + ey) / 2 + py * 20);
    textStyle(NORMAL);
}

function drawSourceOnLine(x1, y1, x2, y2, label) {
    const dx = x2 - x1, dy = y2 - y1;
    const len = sqrt(dx * dx + dy * dy);
    const ux = dx / len, uy = dy / len;
    const px = -uy, py = ux;
    const cx2 = (x1 + x2) / 2, cy2 = (y1 + y2) / 2;
    const r = 18;

    stroke(colBranch[0], colBranch[1], colBranch[2]); strokeWeight(2.5);
    line(x1, y1, cx2 - ux * r, cy2 - uy * r);
    line(cx2 + ux * r, cy2 + uy * r, x2, y2);

    stroke(colSource[0], colSource[1], colSource[2]); strokeWeight(2); noFill();
    ellipse(cx2, cy2, r * 2, r * 2);

    fill(colSource[0], colSource[1], colSource[2]); noStroke(); textAlign(CENTER, CENTER);
    textSize(14); text('+', cx2 - ux * 7, cy2 - uy * 7);
    textSize(16); text('\u2212', cx2 + ux * 7, cy2 + uy * 7);

    textSize(12); textStyle(BOLD);
    text(label, cx2 + px * (r + 16), cy2 + py * (r + 16));
    textStyle(NORMAL);
}

function drawNode(nd) {
    // Glow ring
    noStroke();
    fill(colNode[0], colNode[1], colNode[2], 50);
    ellipse(nd.x, nd.y, 32, 32);
    // Solid dot
    fill(colNode[0], colNode[1], colNode[2]);
    ellipse(nd.x, nd.y, 22, 22);
    // Label
    fill(255); textSize(12); textAlign(CENTER, CENTER); textStyle(BOLD);
    text(nd.label, nd.x, nd.y);
    textStyle(NORMAL);
}

function drawLoopArrow(c, mesh, idx) {
    let cx2 = 0, cy2 = 0;
    let total = mesh.nodeIndices.length;
    for (const i of mesh.nodeIndices) { cx2 += c.nodes[i].x; cy2 += c.nodes[i].y; }
    if (mesh.extraPoints) {
        for (const pt of mesh.extraPoints) { cx2 += pt.x; cy2 += pt.y; total++; }
    }
    cx2 /= total; cy2 /= total;

    const r = 22;
    noFill(); stroke(colLoop[0], colLoop[1], colLoop[2]); strokeWeight(2.5);
    arc(cx2, cy2, r * 2, r * 2, -PI * 0.75, PI * 0.55);

    // Arrowhead
    const ax2 = cx2 + r * cos(PI * 0.55);
    const ay2 = cy2 + r * sin(PI * 0.55);
    fill(colLoop[0], colLoop[1], colLoop[2]); noStroke();
    const aSize = 6;
    triangle(ax2 - aSize, ay2 - aSize / 2, ax2 + aSize / 2, ay2, ax2 - aSize, ay2 + aSize / 2);

    noStroke(); fill(colLoop[0], colLoop[1], colLoop[2]); textSize(11); textAlign(CENTER, CENTER); textStyle(BOLD);
    text('I' + (idx + 1), cx2, cy2);
    textStyle(NORMAL);
}

// ── Explanation Panel ─────────────────────────────────────────────────────────
function drawExplPanel() {
    // Panel background
    fill(colPanel[0], colPanel[1], colPanel[2]);
    stroke(colBorder[0], colBorder[1], colBorder[2]);
    strokeWeight(1);
    rect(explX, explY, explW, explH, 10);

    const def = definitions[lastFocus] || definitions['overview'];
    const c   = circuits[selectedCircuit];
    const pad = 16;
    let ty = explY + pad;

    // Header strip
    noStroke();
    fill(colCardBg[0], colCardBg[1], colCardBg[2]);
    rect(explX + 1, explY + 1, explW - 2, 38, 9, 9, 0, 0);

    // Title
    fill(colAccent[0], colAccent[1], colAccent[2]); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text(def.title, explX + pad, ty + 4);
    textStyle(NORMAL);

    ty += 48;

    // Body text (word-wrapped)
    fill(colText[0], colText[1], colText[2]); textSize(12); textAlign(LEFT, TOP);
    const bodyLines = wrapText(def.body, explW - pad * 2);
    for (const line of bodyLines) {
        text(line, explX + pad, ty);
        ty += 18;
    }

    ty += 10;

    // Formula box
    fill(colCardBg[0], colCardBg[1], colCardBg[2]); stroke(colCardBorder[0], colCardBorder[1], colCardBorder[2]); strokeWeight(1);
    const fboxH = 52;
    rect(explX + pad, ty, explW - pad * 2, fboxH, 6);

    fill(colAccent[0], colAccent[1], colAccent[2]); noStroke(); textSize(15); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(def.formula, explX + explW / 2, ty + 18);
    textStyle(NORMAL);

    fill(colMuted[0], colMuted[1], colMuted[2]); textSize(10); textAlign(CENTER, TOP);
    text(def.formulaNote, explX + explW / 2, ty + 34);

    ty += fboxH + 14;

    // Context summary (what's currently shown)
    fill(colMuted[0], colMuted[1], colMuted[2]); textSize(11); textAlign(LEFT, TOP);
    const ctx = buildContextSummary(c);
    const ctxLines = wrapText(ctx, explW - pad * 2);
    for (const line of ctxLines) {
        text(line, explX + pad, ty);
        ty += 16;
    }

    // Active element legend dots
    ty += 8;
    const activeItems = [];
    if (showNodes)    activeItems.push({ label: 'Nodes',    col: colNode });
    if (showBranches) activeItems.push({ label: 'Branches', col: colBranch });
    if (showLoops)    activeItems.push({ label: 'Loops',    col: colLoop });
    if (showMeshes)   activeItems.push({ label: 'Meshes',   col: [colMesh1[0], colMesh1[1], colMesh1[2]] });

    for (const item of activeItems) {
        if (ty + 16 > explY + explH - pad) break;
        noStroke(); fill(item.col[0], item.col[1], item.col[2]);
        ellipse(explX + pad + 5, ty + 6, 10, 10);
        fill(colText[0], colText[1], colText[2]); textSize(11); textAlign(LEFT, CENTER);
        text(item.label, explX + pad + 16, ty + 6);
        ty += 18;
    }

    if (activeItems.length === 0) {
        fill(colMuted[0], colMuted[1], colMuted[2]); textSize(11); textAlign(LEFT, TOP);
        text('No elements shown — toggle buttons above.', explX + pad, ty);
    }
}

function buildContextSummary(c) {
    switch (lastFocus) {
        case 'nodes':
            return 'Showing ' + c.n + ' node' + (c.n > 1 ? 's' : '') + ' in ' + circuitNames[selectedCircuit] + '. Nodes are the junctions where current paths meet.';
        case 'branches':
            return 'Showing ' + c.b + ' branch' + (c.b > 1 ? 'es' : '') + ' in ' + circuitNames[selectedCircuit] + '. Each branch is one element carrying one unknown current.';
        case 'loops':
            return 'Showing ' + c.m + ' mesh loop' + (c.m > 1 ? 's' : '') + ' in ' + circuitNames[selectedCircuit] + '. KVL applies to every closed path.';
        case 'meshes':
            return 'Showing ' + c.m + ' mesh' + (c.m > 1 ? 'es' : '') + ' (shaded regions) in ' + circuitNames[selectedCircuit] + '. Each mesh window gives one independent KVL equation.';
        default:
            return 'Select a circuit from the dropdown. Toggle elements to explore how nodes, branches, and meshes relate to each other.';
    }
}

function wrapText(str, maxW) {
    const words = str.split(' ');
    const lines = [];
    let current = '';
    for (const word of words) {
        const test = current ? current + ' ' + word : word;
        if (textWidth(test) > maxW && current) {
            lines.push(current);
            current = word;
        } else {
            current = test;
        }
    }
    if (current) lines.push(current);
    return lines;
}

// ── Topology Card (bottom) ────────────────────────────────────────────────────
function drawTopologyCard() {
    const c = circuits[selectedCircuit];
    const x = margin, y = cardY, w = canvasWidth - 2 * margin, h = cardH;

    // Card background
    fill(colCardBg[0], colCardBg[1], colCardBg[2]); stroke(colCardBorder[0], colCardBorder[1], colCardBorder[2]); strokeWeight(1.5);
    rect(x, y, w, h, 10);

    // Section label
    noStroke(); fill(colAccent[0], colAccent[1], colAccent[2]); textSize(12); textStyle(BOLD); textAlign(LEFT, TOP);
    text('Topology Counts', x + 16, y + 10);
    textStyle(NORMAL);

    // Count badges
    const badges = [
        { label: 'Nodes (n)', value: c.n, col: colNode },
        { label: 'Branches (b)', value: c.b, col: colBranch },
        { label: 'Meshes (m)', value: c.m, col: [colLoop[0], colLoop[1], colLoop[2]] }
    ];

    const badgeW = 100, badgeH = 50, badgeGap = 14;
    const totalBW = badges.length * badgeW + (badges.length - 1) * badgeGap;
    let bx = x + 16;
    const by = y + 30;

    for (const badge of badges) {
        // Badge box
        fill(badge.col[0], badge.col[1], badge.col[2], 22);
        stroke(badge.col[0], badge.col[1], badge.col[2], 80);
        strokeWeight(1);
        rect(bx, by, badgeW, badgeH, 8);

        // Value (large)
        fill(badge.col[0], badge.col[1], badge.col[2]);
        noStroke(); textSize(22); textStyle(BOLD); textAlign(CENTER, CENTER);
        text(badge.value, bx + badgeW / 2, by + 18);
        textStyle(NORMAL);

        // Label (small)
        fill(colMuted[0], colMuted[1], colMuted[2]); textSize(10); textAlign(CENTER, TOP);
        text(badge.label, bx + badgeW / 2, by + 34);

        bx += badgeW + badgeGap;
    }

    // Formula line
    const bCalc  = c.n - 1 + c.m;
    const verified = (bCalc === c.b);
    const fmtStr = 'b = n \u2212 1 + m    \u27F9    ' + c.b + ' = ' + c.n + ' \u2212 1 + ' + c.m + ' = ' + bCalc;

    const fLineX = bx + 16;
    const fLineY = by + 8;

    // Formula label
    fill(colMuted[0], colMuted[1], colMuted[2]); textSize(11); textAlign(LEFT, TOP); noStroke();
    text('Key Formula:', fLineX, fLineY);

    fill(colText[0], colText[1], colText[2]); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text(fmtStr, fLineX, fLineY + 15);
    textStyle(NORMAL);

    // Verified badge
    const badgeTxt = verified ? '\u2713 Verified' : '\u2717 Mismatch';
    const badgeC   = verified ? colGreenBg : [254, 226, 226];
    const textC    = verified ? colGreenText : [185, 28, 28];

    const vbW = 80, vbH = 24;
    fill(badgeC[0], badgeC[1], badgeC[2]); stroke(textC[0], textC[1], textC[2], 80); strokeWeight(1);
    rect(fLineX, fLineY + 38, vbW, vbH, 12);
    fill(textC[0], textC[1], textC[2]); noStroke(); textSize(12); textStyle(BOLD); textAlign(CENTER, CENTER);
    text(badgeTxt, fLineX + vbW / 2, fLineY + 38 + vbH / 2);
    textStyle(NORMAL);
}

// ── Dropdown ──────────────────────────────────────────────────────────────────
function drawDropdownMenu() {
    const x = dropdownX, y = dropdownY + dropdownH + 2;
    const w = dropdownW, itemH = 32;

    // Shadow
    noStroke(); fill(0, 0, 0, 18);
    rect(x + 3, y + 3, w, itemH * circuitNames.length, 6);

    fill(colPanel[0], colPanel[1], colPanel[2]); stroke(colBorder[0], colBorder[1], colBorder[2]); strokeWeight(1);
    rect(x, y, w, itemH * circuitNames.length, 6);

    for (let i = 0; i < circuitNames.length; i++) {
        const iy = y + i * itemH;
        const hov = mouseInRect(x, iy, w, itemH);
        if (hov) {
            fill(colHover[0], colHover[1], colHover[2]); noStroke();
            rect(x + 1, iy + 1, w - 2, itemH - 2,
                i === 0 ? 5 : 0, i === 0 ? 5 : 0,
                i === circuitNames.length - 1 ? 5 : 0,
                i === circuitNames.length - 1 ? 5 : 0);
        }
        const fc = (i === selectedCircuit) ? colAccent : colText;
        fill(fc[0], fc[1], fc[2]);
        noStroke(); textSize(13); textAlign(LEFT, CENTER);
        text(circuitNames[i], x + 12, iy + itemH / 2);
    }
}

// ── Interaction ───────────────────────────────────────────────────────────────
function mousePressed() {
    if (dropdownOpen) {
        const x = dropdownX, y = dropdownY + dropdownH + 2, itemH = 32;
        for (let i = 0; i < circuitNames.length; i++) {
            if (mouseInRect(x, y + i * itemH, dropdownW, itemH)) {
                selectedCircuit = i;
                buildCircuits();
                dropdownOpen = false;
                return;
            }
        }
        dropdownOpen = false;
        return;
    }

    if (mouseInRect(dropdownX, dropdownY, dropdownW, dropdownH)) {
        dropdownOpen = !dropdownOpen;
        return;
    }

    for (const btn of toggleButtons) {
        if (mouseInRect(btn.x, btn.y, btn.w, btn.h)) {
            btn.set();
            return;
        }
    }
}

function mouseInRect(rx, ry, rw, rh) {
    return mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh;
}

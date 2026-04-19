// Supernode Analysis MicroSim — v4 (content-up canvas sizing)

let canvasWidth;
let canvasHeight = 500;   // placeholder; recomputed in buildLayout()
const margin    = 14;
const controlsY = 305;   // y where the two bottom panels begin

let vs = 5;
let r1 = 1000, r2 = 2000, r3 = 1000;

let sliders      = [];
let activeSlider = -1;

let showSupernode = true;
let supernodeCbX, supernodeCbY;

let solveBtn = { x: 0, y: 0, w: 100, h: 32 };
let solved   = false;
let v1 = 0,  v2 = 0;

let leftPanelX, leftPanelW, rightPanelX, rightPanelW;

// Left-panel column widths
const LABEL_W      = 30;
const INPUT_W      = 62;
const UNIT_W       = 28;
const TRACK_OFFSET = LABEL_W + INPUT_W + UNIT_W + 8;

// ── Colors ────────────────────────────────────────────────────────────────────
const colBg          = [245, 247, 250];
const colPanel       = [255, 255, 255];
const colPanelHead   = [241, 245, 249];
const colBorder      = [203, 213, 225];
const colText        = [30,  41,  59];
const colTextLight   = [100, 116, 139];
const colNode        = [59,  130, 246];
const colWire        = [51,  65,  85];
const colSource      = [210, 45,  45];
const colResistor    = [80,  95,  115];
const colSupernode   = [147, 51,  234];
const colAccent      = [59,  130, 246];
const colGreen       = [22,  163, 74];
const colGreenBg     = [240, 253, 244];
const colYellow      = [161, 98,  7];
const colYellowBg    = [255, 251, 235];
const colBlueBg      = [239, 246, 255];
const colHover       = [241, 245, 249];
const colSliderTrack = [203, 213, 225];
const colSliderThumb = [59,  130, 246];
const colBtnBg       = [59,  130, 246];
const colBtnHover    = [37,  99,  235];
const colGround      = [90,  105, 120];

let nodePos = {};

// ── Setup ─────────────────────────────────────────────────────────────────────

function setup() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 800);
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    initSliders();
    buildLayout();   // computes true canvasHeight and calls resizeCanvas()

    // Respond to height-request from parent page (e.g., on focus after fullscreen exit)
    window.addEventListener('message', function(e) {
        if (e.data && e.data.type === 'microsim-height-request') {
            postHeightToParent();
        }
    });
}

function windowResized() {
    canvasWidth = min(floor(document.querySelector('main').getBoundingClientRect().width), 800);
    buildLayout();   // recomputes height and resizes internally
}

// ── Slider + input creation (once) ───────────────────────────────────────────

function initSliders() {
    const configs = [
        { label:'Vs', unit:'V',  min:1,   max:20,    val:vs,
          fmt:(v)=>v.toFixed(1),         toRaw:(s)=>parseFloat(s),
          setter:(v)=>{ vs=v; } },
        { label:'R1', unit:'kΩ', min:100, max:10000, val:r1,
          fmt:(v)=>(v/1000).toFixed(2),  toRaw:(s)=>parseFloat(s)*1000,
          setter:(v)=>{ r1=v; } },
        { label:'R2', unit:'kΩ', min:100, max:10000, val:r2,
          fmt:(v)=>(v/1000).toFixed(2),  toRaw:(s)=>parseFloat(s)*1000,
          setter:(v)=>{ r2=v; } },
        { label:'R3', unit:'kΩ', min:100, max:10000, val:r3,
          fmt:(v)=>(v/1000).toFixed(2),  toRaw:(s)=>parseFloat(s)*1000,
          setter:(v)=>{ r3=v; } },
    ];

    sliders = configs.map(c => {
        const inp = createInput(c.fmt(c.val));
        styleInput(inp);

        const s = {
            label:c.label, unit:c.unit, min:c.min, max:c.max,
            val:c.val, fmt:c.fmt, setter:c.setter,
            inp, trackX:0, trackW:0, y:0,
        };

        inp.input(() => {
            const raw = c.toRaw(inp.value());
            if (isNaN(raw) || raw <= 0) return;
            s.val = constrain(raw, c.min, c.max);
            c.setter(s.val);
            solved = false;
        });
        inp.elt.addEventListener('blur', () => inp.value(c.fmt(s.val)));

        return s;
    });
}

function styleInput(inp) {
    inp.style('font-size',    '12px');
    inp.style('font-family',  'Arial,sans-serif');
    inp.style('padding',      '3px 6px');
    inp.style('border',       '1.5px solid #94a3b8');
    inp.style('border-radius','4px');
    inp.style('text-align',   'right');
    inp.style('color',        '#1e293b');
    inp.style('background',   '#f8fafc');
    inp.style('box-sizing',   'border-box');
    inp.style('outline',      'none');
    inp.style('position',     'absolute');
    inp.size(INPUT_W);
}

// Tell the parent page the exact canvas height so it can resize the iframe
function postHeightToParent() {
    if (window.parent !== window) {
        window.parent.postMessage({ type: 'microsim-height', height: canvasHeight }, '*');
    }
}

// ── Layout (recomputes canvas height bottom-up) ───────────────────────────────

function buildLayout() {
    const panelGap = 10;
    leftPanelX  = margin;
    leftPanelW  = floor(canvasWidth / 2) - margin - floor(panelGap / 2);
    rightPanelX = floor(canvasWidth / 2) + floor(panelGap / 2);
    rightPanelW = canvasWidth - rightPanelX - margin;

    // Circuit — circTop=155 leaves room for the two-line supernode label above the dashed ellipse
    const cx      = canvasWidth / 2;
    const circTop = 155;
    const circBot = 268;
    const n1x     = cx - 75;
    const n2x     = cx + 75;
    const srcX    = max(margin + 20, cx - 210);

    nodePos = {
        src_top:{ x:srcX, y:circTop }, src_bot:{ x:srcX, y:circBot },
        n1:     { x:n1x,  y:circTop }, n2:     { x:n2x,  y:circTop },
        n1_bot: { x:n1x,  y:circBot }, n2_bot: { x:n2x,  y:circBot },
    };

    // ── Slider rows (top-down within left panel) ──────────────────────────────
    const sliderTrackX = leftPanelX + TRACK_OFFSET;
    const sliderTrackW = leftPanelW - TRACK_OFFSET - 10;
    const sliderStartY = controlsY + 50;  // 22px below panel header (28px)
    const sliderGap    = 40;
    const inputH       = 24;

    sliders.forEach((s, i) => {
        s.y      = sliderStartY + i * sliderGap;
        s.trackX = sliderTrackX;
        s.trackW = sliderTrackW;
    });

    // ── Checkbox + Solve button (content-up) ─────────────────────────────────
    const lastInputBottom = sliderStartY + 3 * sliderGap + inputH / 2;  // bottom of last input box

    supernodeCbX = leftPanelX + 10;
    supernodeCbY = lastInputBottom + 22;   // 22px gap below last slider

    const cbBottom = supernodeCbY + 16;    // checkbox is 16px tall
    solveBtn.w = leftPanelW - 24;          // nearly full panel width
    solveBtn.h = 32;
    solveBtn.x = leftPanelX + 12;
    solveBtn.y = cbBottom + 18;            // 18px below checkbox

    // ── Canvas height: exactly enough for all content ─────────────────────────
    const minH = solveBtn.y + solveBtn.h + 22;  // 22px bottom padding
    if (minH !== canvasHeight) {
        canvasHeight = minH;
        resizeCanvas(canvasWidth, canvasHeight);
    }
    postHeightToParent();

    // ── Position DOM inputs now that canvas size is final ─────────────────────
    const cr   = document.querySelector('canvas').getBoundingClientRect();
    const offX = cr.left + window.scrollX;
    const offY = cr.top  + window.scrollY;

    sliders.forEach(s => {
        s.inp.position(offX + leftPanelX + LABEL_W + 4, offY + s.y - inputH / 2);
        s.inp.size(INPUT_W);
    });
}

// ── Draw ──────────────────────────────────────────────────────────────────────

function draw() {
    background(colBg);
    drawTitleBar();
    drawCircuit();
    if (showSupernode) drawSupernodeBoundary();
    drawNodeLabels();
    if (solved) drawSolvedValues();
    drawSectionDivider();
    drawLeftPanel();
    drawRightPanel();
}

// Header + explanation pill  (y: 0–88)
function drawTitleBar() {
    noStroke();
    fill(colText);
    textSize(17);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text('Supernode Analysis', margin, 9);
    textStyle(NORMAL);

    fill(colTextLight);
    textSize(11);
    text('Nodal analysis when a voltage source connects two non-reference nodes', margin, 31);

    // Pill (y=50–80) — circuit labels start at y≥94, so no overlap
    const py=50, pw=canvasWidth-2*margin, ph=30;
    fill(colBlueBg);
    stroke(colAccent[0], colAccent[1], colAccent[2], 90);
    strokeWeight(1);
    rect(margin, py, pw, ph, 5);
    noStroke();
    fill(35, 90, 185);
    textSize(11);
    textAlign(LEFT, CENTER);
    textStyle(ITALIC);
    text(
        'A supernode encloses Node\u2081 and Node\u2082 joined by Vs. ' +
        'Apply KCL to the combined boundary, then add constraint: V\u2081 \u2013 V\u2082 = Vs.',
        margin+10, py+ph/2
    );
    textStyle(NORMAL);
}

function drawSectionDivider() {
    stroke(colBorder);
    strokeWeight(1);
    line(margin, controlsY-6, canvasWidth-margin, controlsY-6);
}

// ── Left Panel ────────────────────────────────────────────────────────────────

function drawLeftPanel() {
    const panelH = canvasHeight - controlsY - margin;

    fill(colPanel);
    stroke(colBorder);
    strokeWeight(1);
    rect(leftPanelX, controlsY, leftPanelW, panelH, 6);

    fill(colPanelHead);
    noStroke();
    rect(leftPanelX, controlsY, leftPanelW, 28, 6, 6, 0, 0);
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Controls', leftPanelX+10, controlsY+14);
    textStyle(NORMAL);

    for (const s of sliders) drawOneSlider(s);
    drawSupernodeCheckbox();
    drawSolveButton();
}

function drawOneSlider(s) {
    const thumbR = 8;
    const trackY = s.y + 10;
    const frac   = (s.val - s.min) / (s.max - s.min);
    const thumbX = s.trackX + frac * s.trackW;

    noStroke();
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text(s.label, leftPanelX+8, s.y);
    textStyle(NORMAL);

    fill(colTextLight);
    textSize(10);
    textAlign(LEFT, CENTER);
    text(s.unit, leftPanelX + LABEL_W + INPUT_W + 6, s.y);

    stroke(colSliderTrack);
    strokeWeight(3);
    line(s.trackX, trackY, s.trackX+s.trackW, trackY);

    stroke(colSliderThumb);
    strokeWeight(3);
    line(s.trackX, trackY, thumbX, trackY);

    const hovering = dist(mouseX, mouseY, thumbX, trackY) < thumbR+5;
    noStroke();
    fill(hovering ? colBtnHover : colSliderThumb);
    ellipse(thumbX, trackY, thumbR*2, thumbR*2);
    fill(255);
    ellipse(thumbX, trackY, thumbR-1, thumbR-1);
}

function drawSupernodeCheckbox() {
    const size = 16;
    const hovering = mouseInRect(supernodeCbX, supernodeCbY, size+170, size);
    stroke(colBorder);
    strokeWeight(1.5);
    fill(showSupernode ? colSupernode : (hovering ? colHover : colPanel));
    rect(supernodeCbX, supernodeCbY, size, size, 3);
    if (showSupernode) {
        stroke(255); strokeWeight(2); noFill();
        line(supernodeCbX+3, supernodeCbY+8,  supernodeCbX+7,  supernodeCbY+12);
        line(supernodeCbX+7, supernodeCbY+12, supernodeCbX+13, supernodeCbY+4);
    }
    noStroke();
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Show Supernode Boundary', supernodeCbX+size+7, supernodeCbY+size/2);
}

function drawSolveButton() {
    const b = solveBtn;
    const hovering = mouseInRect(b.x, b.y, b.w, b.h);
    noStroke();
    fill(hovering ? colBtnHover : colBtnBg);
    rect(b.x, b.y, b.w, b.h, 7);
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Solve \u25B6', b.x+b.w/2, b.y+b.h/2);
    textStyle(NORMAL);
}

// ── Right Panel ───────────────────────────────────────────────────────────────

function drawRightPanel() {
    const panelH = canvasHeight - controlsY - margin;

    fill(colPanel);
    stroke(colBorder);
    strokeWeight(1);
    rect(rightPanelX, controlsY, rightPanelW, panelH, 6);

    fill(colPanelHead);
    noStroke();
    rect(rightPanelX, controlsY, rightPanelW, 28, 6, 6, 0, 0);
    fill(colText);
    textSize(12);
    textAlign(LEFT, CENTER);
    textStyle(BOLD);
    text('Analysis', rightPanelX+10, controlsY+14);
    textStyle(NORMAL);

    drawEquationCards();
}

function drawEquationCards() {
    const cx = rightPanelX+10;
    const cw = rightPanelW-20;
    let y    = controlsY+38;
    const cardH = 52, gap = 8;

    drawEqCard(cx, y, cw, cardH,
        'Constraint Equation',
        'V\u2081 \u2013 V\u2082 = Vs = '+vs.toFixed(1)+' V',
        'The voltage source fixes the difference between V\u2081 and V\u2082.',
        colYellowBg, colYellow);

    y += cardH + gap;

    drawEqCard(cx, y, cw, cardH,
        'KCL at Supernode Boundary',
        '(10\u2013V\u2081)/R1 = V\u2081/R2 + V\u2082/R3',
        'Sum currents leaving the combined supernode envelope.',
        colBlueBg, colAccent);

    y += cardH + gap;

    if (solved) {
        drawResultCard(cx, y, cw, cardH+16);
    } else {
        fill(248, 249, 251); stroke(colBorder); strokeWeight(1);
        rect(cx, y, cw, cardH, 5);
        noStroke(); fill(colTextLight); textSize(11);
        textAlign(CENTER, CENTER); textStyle(ITALIC);
        text('Press \u201CSolve \u25B6\u201D to calculate node voltages', cx+cw/2, y+cardH/2);
        textStyle(NORMAL);
    }
}

function drawEqCard(x, y, w, h, title, eq, note, bgColor, accentColor) {
    fill(bgColor);
    stroke(accentColor[0], accentColor[1], accentColor[2], 110);
    strokeWeight(1);
    rect(x, y, w, h, 5);

    noStroke(); fill(accentColor);
    rect(x, y, 4, h, 5, 0, 0, 5);

    textSize(10); textAlign(LEFT, TOP); textStyle(BOLD);
    text(title, x+12, y+7); textStyle(NORMAL);

    fill(colText); textSize(12.5); textStyle(BOLD);
    text(eq, x+12, y+21); textStyle(NORMAL);

    fill(colTextLight); textSize(9.5);
    text(note, x+12, y+38);
}

function drawResultCard(x, y, w, h) {
    fill(colGreenBg);
    stroke(colGreen[0], colGreen[1], colGreen[2], 140);
    strokeWeight(1.5);
    rect(x, y, w, h, 5);

    noStroke(); fill(colGreen);
    rect(x, y, 4, h, 5, 0, 0, 5);

    textSize(10); textAlign(LEFT, TOP); textStyle(BOLD);
    text('Solved Node Voltages', x+12, y+7); textStyle(NORMAL);

    fill(colText); textSize(14); textStyle(BOLD); textAlign(LEFT, TOP);
    text('V\u2081 = '+v1.toFixed(3)+' V', x+12,    y+22);
    text('V\u2082 = '+v2.toFixed(3)+' V', x+w/2,   y+22);
    textStyle(NORMAL);

    fill(colTextLight); textSize(9.5);
    text('Check: V\u2081\u2013V\u2082 = '+(v1-v2).toFixed(3)+' V  =  Vs ('+vs.toFixed(1)+' V) \u2713',
         x+12, y+h-16);
}

// ── Circuit Drawing ───────────────────────────────────────────────────────────

function drawCircuit() {
    const p = nodePos;
    stroke(colWire); strokeWeight(2.5);
    line(p.src_bot.x, p.src_bot.y, p.n2_bot.x, p.n2_bot.y);
    line(p.src_top.x, p.src_top.y, p.src_bot.x, p.src_bot.y);
    line(p.src_top.x, p.src_top.y, p.n1.x,      p.n1.y);

    drawResistor(p.src_top.x, p.src_top.y, p.n1.x, p.n1.y, 'R1');
    drawVoltageSource(p.n1.x, p.n1.y, p.n2.x, p.n2.y, 'Vs');

    stroke(colWire); strokeWeight(2.5);
    line(p.n1.x, p.n1.y, p.n1_bot.x, p.n1_bot.y);
    drawResistor(p.n1.x, p.n1.y, p.n1_bot.x, p.n1_bot.y, 'R2');

    stroke(colWire); strokeWeight(2.5);
    line(p.n2.x, p.n2.y, p.n2_bot.x, p.n2_bot.y);
    drawResistor(p.n2.x, p.n2.y, p.n2_bot.x, p.n2_bot.y, 'R3');

    drawMainSource(p.src_top.x, p.src_top.y, p.src_bot.x, p.src_bot.y);
    drawGroundSymbol((p.src_bot.x + p.n2_bot.x) / 2, p.src_bot.y);
}

function drawResistor(x1, y1, x2, y2, label) {
    const dx=x2-x1, dy=y2-y1;
    const len=sqrt(dx*dx+dy*dy);
    if (len===0) return;
    const ux=dx/len, uy=dy/len, px=-uy, py=ux;
    const rLen=38, sf=0.5-rLen/(2*len), ef=0.5+rLen/(2*len);
    const sx=x1+dx*sf, sy=y1+dy*sf, ex=x1+dx*ef, ey=y1+dy*ef;

    stroke(colWire); strokeWeight(2.5);
    line(x1, y1, sx, sy); line(ex, ey, x2, y2);

    stroke(colResistor); strokeWeight(2); noFill();
    beginShape(); vertex(sx, sy);
    for (let i=1; i<6; i++) {
        const t=i/6, side=(i%2===0)?1:-1;
        vertex(sx+(ex-sx)*t+px*7*side, sy+(ey-sy)*t+py*7*side);
    }
    vertex(ex, ey); endShape();

    noStroke(); fill(colResistor);
    textSize(12); textAlign(CENTER, CENTER); textStyle(BOLD);
    text(label, (sx+ex)/2+px*18, (sy+ey)/2+py*18);
    textStyle(NORMAL);
}

function drawVoltageSource(x1, y1, x2, y2, label) {
    const cx2=(x1+x2)/2, cy2=(y1+y2)/2, r=18;
    const len=dist(x1,y1,x2,y2), ux=(x2-x1)/len, uy=(y2-y1)/len;

    stroke(colWire); strokeWeight(2.5);
    line(x1, y1, cx2-ux*r, cy2-uy*r);
    line(cx2+ux*r, cy2+uy*r, x2, y2);

    stroke(colSource); strokeWeight(2); noFill();
    ellipse(cx2, cy2, r*2, r*2);

    noStroke(); fill(colSource);
    textSize(14); textAlign(CENTER, CENTER);
    text('+', cx2-7, cy2);
    textSize(16); text('\u2013', cx2+8, cy2);

    // Identifier label below the circle (value is shown in the supernode boundary label above)
    noStroke(); fill(colSource);
    textSize(10); textAlign(CENTER, TOP); textStyle(BOLD);
    text(label, cx2, cy2+r+5);
    textStyle(NORMAL);
}

function drawMainSource(x1, y1, x2, y2) {
    const cx2=(x1+x2)/2, cy2=(y1+y2)/2, r=18;
    stroke(colSource); strokeWeight(2); noFill();
    ellipse(cx2, cy2, r*2, r*2);
    noStroke(); fill(colSource);
    textSize(14); textAlign(CENTER, CENTER);
    text('+', cx2, cy2-6);
    textSize(16); text('\u2013', cx2, cy2+7);
    textSize(12); textStyle(BOLD);
    text('10V', cx2-r-22, cy2);
    textStyle(NORMAL);
}

function drawGroundSymbol(x, y) {
    stroke(colGround); strokeWeight(2);
    const gap=5;
    line(x-18, y+4,        x+18, y+4);
    line(x-11, y+4+gap,    x+11, y+4+gap);
    line(x-5,  y+4+gap*2,  x+5,  y+4+gap*2);
    noStroke(); fill(colGround);
    textSize(10); textAlign(CENTER, TOP);
    text('GND (Ref)', x, y+20);
}

function drawSupernodeBoundary() {
    const p=nodePos, cx2=(p.n1.x+p.n2.x)/2, cy2=p.n1.y;
    const ew=(p.n2.x-p.n1.x)+76, eh=55;

    noStroke(); fill(147, 51, 234, 22);
    ellipse(cx2, cy2, ew, eh);

    stroke(colSupernode); strokeWeight(2.2);
    drawingContext.setLineDash([9, 5]); noFill();
    ellipse(cx2, cy2, ew, eh);
    drawingContext.setLineDash([]);

    // Two-line label above the dashed ellipse: "Supernode" (bold) over "Vs = X.X V" (lighter)
    const topEdge = cy2 - eh / 2;
    noStroke(); textAlign(CENTER, BOTTOM);

    // Lower line: Vs value (smaller, normal weight)
    fill(colSupernode); textSize(10); textStyle(NORMAL);
    text('Vs\u2009=\u2009' + vs.toFixed(1) + '\u202FV', cx2, topEdge - 5);

    // Upper line: "Supernode" heading (bold, slightly larger)
    textSize(12); textStyle(BOLD);
    text('Supernode', cx2, topEdge - 5 - 15);
    textStyle(NORMAL);
}

function drawNodeLabels() {
    const p=nodePos, r=13;
    [{pt:p.n1,n:'1'},{pt:p.n2,n:'2'}].forEach(({pt,n})=>{
        stroke(colNode); strokeWeight(2); fill(colNode);
        ellipse(pt.x, pt.y, r*2, r*2);
        fill(255); noStroke();
        textSize(11); textAlign(CENTER, CENTER); textStyle(BOLD);
        text(n, pt.x, pt.y); textStyle(NORMAL);
    });
}

function drawSolvedValues() {
    const p=nodePos;
    function tag(nx, ny, label, val) {
        const str=label+' = '+val.toFixed(2)+' V';
        noStroke(); textSize(12);
        const tw=textWidth(str)+14, tx=nx-tw/2, ty=ny+16;
        fill(colGreenBg);
        stroke(colGreen[0], colGreen[1], colGreen[2], 180); strokeWeight(1.5);
        rect(tx, ty, tw, 22, 4);
        noStroke(); fill(colGreen);
        textAlign(CENTER, CENTER); textStyle(BOLD);
        text(str, nx, ty+11); textStyle(NORMAL);
    }
    tag(p.n1.x, p.n1.y, 'V\u2081', v1);
    tag(p.n2.x, p.n2.y, 'V\u2082', v2);
}

// ── Solve ─────────────────────────────────────────────────────────────────────

function solveCircuit() {
    // Constraint: V1-V2=Vs → V2=V1-Vs
    // KCL: (10-V1)/R1 = V1/R2 + V2/R3
    // → 10/R1 + Vs/R3 = V1*(1/R1+1/R2+1/R3)
    v1 = (10/r1 + vs/r3) / (1/r1 + 1/r2 + 1/r3);
    v2 = v1 - vs;
    solved = true;
}

// ── Interaction ───────────────────────────────────────────────────────────────

function mousePressed() {
    for (let i=0; i<sliders.length; i++) {
        const s=sliders[i];
        const thumbX=s.trackX+((s.val-s.min)/(s.max-s.min))*s.trackW;
        if (dist(mouseX, mouseY, thumbX, s.y+10) < 14) { activeSlider=i; return; }
    }
    if (mouseInRect(supernodeCbX, supernodeCbY, 180, 16)) {
        showSupernode=!showSupernode; return;
    }
    const b=solveBtn;
    if (mouseInRect(b.x, b.y, b.w, b.h)) { solveCircuit(); return; }
}

function mouseDragged() {
    if (activeSlider<0) return;
    const s=sliders[activeSlider];
    const frac=constrain((mouseX-s.trackX)/s.trackW, 0, 1);
    let v = s.min + frac*(s.max-s.min);
    v = (s.label==='Vs') ? round(v*2)/2 : round(v/100)*100;
    s.val=constrain(v, s.min, s.max);
    s.setter(s.val);
    s.inp.value(s.fmt(s.val));
    solved=false;
}

function mouseReleased() { activeSlider=-1; }

function mouseInRect(rx, ry, rw, rh) {
    return mouseX>=rx && mouseX<=rx+rw && mouseY>=ry && mouseY<=ry+rh;
}

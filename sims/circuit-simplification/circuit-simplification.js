'use strict';

// ── Palette ───────────────────────────────────────────────────────────────────
const COL_BG      = [245, 248, 252];
const COL_CARD    = [255, 255, 255];
const COL_WIRE    = [50,  55,  70];
const COL_NODE    = [40, 100, 200];
const COL_DELTA   = [210,  65,  45];
const COL_WYE     = [25,  150,  75];
const COL_NEUTRAL = [70,   70,  80];
const COL_SERIES  = [195, 135,  25];
const COL_RESULT  = [30,  100, 200];
const COL_VS      = [180,  50,  50];
const COL_BTN     = [50,  110, 220];
const COL_BTN_DIS = [170, 175, 185];
const COL_BTN_RED = [195,  60,  60];

// ── State ─────────────────────────────────────────────────────────────────────
let R  = [10, 30, 20, 40, 50];
let Vs = 12;
const STEPS = 6;
let step = 0;
let Ra, Rb, Rc, Rs1, Rs2, Rpar, Req;

// ── Step content ──────────────────────────────────────────────────────────────
const STEP_TITLES = [
    'Original Bridge Circuit',
    'Identify \u0394 Network',
    'Compute Y Equivalents',
    'Replace \u0394 with Y',
    'Combine Series Pairs',
    'Parallel \u2192 Final Req'
];

const EXPLANATIONS = [
    'This bridge cannot be simplified using series or parallel rules alone. A Delta-to-Wye (\u0394\u2192Y) transformation is required to unlock the reduction.',
    'R1(A\u2013B), R2(A\u2013C), and R5(B\u2013C) form a \u0394 (delta) triangle at nodes A, B, C. Converting this loop into an equivalent Y gives us series/parallel paths.',
    'Each Y resistor = product of its two adjacent \u0394 resistors \u00F7 the sum of all three. Compute Ra\u2019, Rb\u2019, Rc\u2019 and introduce center node N.',
    'The delta is removed. Node N now connects to A (Ra\u2019), B (Rb\u2019), and C (Rc\u2019). R3 and R4 remain, linking B and C to node D.',
    'Rb\u2019 and R3 share path B\u2013D \u2192 series pair Rs1.  Rc\u2019 and R4 share path C\u2013D \u2192 series pair Rs2.  Combine each.',
    'Rs1 \u2016 Rs2 run in parallel from N to D. Ra\u2019 is in series from A to N. Final: Req = Ra\u2019 + (Rs1 \u2016 Rs2).'
];

function stepColor() {
    if (step <= 2) return COL_DELTA;
    if (step === 3) return COL_WYE;
    if (step === 4) return COL_SERIES;
    return COL_RESULT;
}

// ── Fixed vertical layout (all y values derived from these) ──────────────────
//
//   y=8     Page title / subtitle
//   y=56    ┌─────────── CARD (one unified white container) ───────────────┐
//   y=56    │  Coloured step-type strip (h=34)                            │
//   y=90    │  Diagram  │  Operations Log            (h=288)              │
//   y=378   │  ─────────────────────────────────── separator              │
//   y=382   │  Explanation pill                      (h=70)               │
//   y=452   │  ─────────────────────────────────── separator              │
//   y=456   │  Input grid                            (h=68)               │
//   y=524   │  ─────────────────────────────────── separator              │
//   y=528   │  Nav buttons                           (h=36)               │
//   y=564   │  ─────────────────────────────────── separator              │
//   y=568   │  Timeline                              (h=68)               │
//   y=644   └─────────────────────────────────────────────────────────────┘
//   canvasH = 660
//
const CARD_X   = 12;
const CARD_Y   = 56;
const STRIP_H  = 34;
const ROW1_Y   = CARD_Y  + STRIP_H;   //  90
const ROW1_H   = 288;
const SEP1_Y   = ROW1_Y  + ROW1_H;    // 378
const EXPL_Y   = SEP1_Y  + 4;         // 382
const EXPL_H   = 70;
const SEP2_Y   = EXPL_Y  + EXPL_H;    // 452
const INP_Y    = SEP2_Y  + 4;         // 456
const INP_H    = 68;
const SEP3_Y   = INP_Y   + INP_H;     // 524
const BTN_Y    = SEP3_Y  + 4;         // 528
const BTN_H    = 36;
const SEP4_Y   = BTN_Y   + BTN_H;     // 564
const TL_Y     = SEP4_Y  + 4;         // 568
const TL_H     = 68;
const CARD_BOT = TL_Y    + TL_H + 8;  // 644
const CARD_H   = CARD_BOT - CARD_Y;   // 588
const canvasH  = CARD_BOT + 16;       // 660

// ── Layout variables (computed in buildLayout) ────────────────────────────────
let cw;
let dX, dY, dW, dH;    // diagram region
let lX, lW;            // log region
let btnPrev, btnNext, btnReset;
let tlDots = [];
let inpElems = [];

// ── Setup ─────────────────────────────────────────────────────────────────────
function setup() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 960);
    cw = max(cw, 560);
    let cnv = createCanvas(cw, canvasH);
    cnv.parent(document.querySelector('main'));
    textFont('Arial');
    buildLayout();
    makeInputElems();
    compute();
    noLoop();
    setTimeout(reportHeight, 150);
}

function windowResized() {
    cw = min(floor(document.querySelector('main').getBoundingClientRect().width), 960);
    cw = max(cw, 560);
    buildLayout();
    repositionInputs();
    resizeCanvas(cw, canvasH);
    redraw();
}

function buildLayout() {
    let cardW = cw - CARD_X * 2;
    let pad   = 14;

    dW = floor((cardW - pad * 3) * 0.56);
    dH = ROW1_H;
    dX = CARD_X + pad;
    dY = ROW1_Y;
    lX = dX + dW + pad;
    lW = cardW - pad * 3 - dW;

    // 3 equal nav buttons, centred
    let bw = 100, gap = 16;
    let bx0 = floor((cw - (bw * 3 + gap * 2)) / 2);
    btnPrev  = { x: bx0,               y: BTN_Y, w: bw, h: BTN_H };
    btnNext  = { x: bx0 + bw + gap,    y: BTN_Y, w: bw, h: BTN_H };
    btnReset = { x: bx0+(bw+gap)*2,    y: BTN_Y, w: bw, h: BTN_H };

    // Timeline dots
    tlDots = [];
    let tlL = CARD_X + 18, tlR = cw - CARD_X - 18;
    for (let i = 0; i < STEPS; i++) {
        tlDots.push({ x: tlL + (tlR - tlL) * i / (STEPS - 1) });
    }
}

function reportHeight() {
    try { window.parent.postMessage({ type: 'microsim-height', height: canvasH }, '*'); } catch(e) {}
}

// ── HTML inputs ───────────────────────────────────────────────────────────────
function makeInputElems() {
    let defaults = [...R, Vs];
    for (let i = 0; i < 6; i++) {
        let inp = createInput(str(defaults[i]));
        inp.parent(document.querySelector('main'));
        inp.style('width',         '58px');
        inp.style('font-size',     '13px');
        inp.style('padding',       '3px 5px');
        inp.style('border',        '1px solid #c0c4cc');
        inp.style('border-radius', '4px');
        inp.style('text-align',    'right');
        inp.style('position',      'absolute');
        inp.style('box-sizing',    'border-box');
        const idx = i;
        function handler() {
            let v = parseFloat(this.value);
            if (!isNaN(v) && v > 0) {
                if (idx < 5) R[idx] = v; else Vs = v;
                compute();
                redraw();
            }
        }
        inp.elt.addEventListener('change', handler);
        inp.elt.addEventListener('input',  handler);
        inpElems.push(inp);
    }
    repositionInputs();
}

function repositionInputs() {
    let canvas = document.querySelector('canvas');
    if (!canvas) return;
    let rect = canvas.getBoundingClientRect();
    let colW  = (cw - 40) / 3;
    // Each cell: [label 30px right-aligned][4px gap][input 58px]
    let inpOX = 20 + 30 + 4;           // 54px from col left edge
    // Row centres: INP_Y+20 (row0),  INP_Y+52 (row1)
    let rowCY = [INP_Y + 20, INP_Y + 52];
    for (let i = 0; i < 6; i++) {
        let col = i % 3, row = floor(i / 3);
        inpElems[i].style('left', (rect.left + 20 + col * colW + inpOX) + 'px');
        inpElems[i].style('top',  (rect.top  + rowCY[row] - 14) + 'px');
    }
}

// ── Compute ───────────────────────────────────────────────────────────────────
function compute() {
    let r1=R[0], r2=R[1], r3=R[2], r4=R[3], r5=R[4];
    let sum = r1 + r2 + r5;
    Ra = (r1*r2)/sum;  Rb = (r1*r5)/sum;  Rc = (r2*r5)/sum;
    Rs1 = Rb+r3;  Rs2 = Rc+r4;
    Rpar = (Rs1*Rs2)/(Rs1+Rs2);
    Req  = Ra+Rpar;
}

// ── Main draw ─────────────────────────────────────────────────────────────────
function draw() {
    background(COL_BG);
    drawPageTitle();
    drawCard();           // white card background first
    drawStepStrip();      // coloured header strip inside card
    drawCircuitStep();    // circuit inside left column
    drawLogSection();     // log inside right column
    drawColSep();         // thin vertical line between cols
    drawHSep(SEP1_Y);
    drawExplanation();
    drawHSep(SEP2_Y);
    drawInputSection();
    drawHSep(SEP3_Y);
    drawNavButtons();
    drawHSep(SEP4_Y);
    drawTimeline();
}

// ── Page title (above card) ───────────────────────────────────────────────────
function drawPageTitle() {
    noStroke(); textAlign(CENTER, TOP);
    textSize(19); textStyle(BOLD); fill(28);
    text('Bridge Circuit Simplification', cw / 2, 8);
    textStyle(NORMAL);
    textSize(12); fill(110);
    text('Step-by-step \u0394\u2013Y transformation  \u00B7  6 guided steps', cw / 2, 33);
}

// ── Unified white card ────────────────────────────────────────────────────────
function drawCard() {
    let cw2 = cw - CARD_X * 2;
    // Drop shadow
    fill(0, 0, 0, 12); noStroke();
    rect(CARD_X + 2, CARD_Y + 2, cw2, CARD_H, 12);
    // Card
    fill(COL_CARD); stroke(215); strokeWeight(1);
    rect(CARD_X, CARD_Y, cw2, CARD_H, 12);
}

// ── Coloured step-type header strip ──────────────────────────────────────────
function drawStepStrip() {
    let sc   = stepColor();
    let cw2  = cw - CARD_X * 2;

    // Fill with rounded top corners only
    fill(sc); noStroke();
    rect(CARD_X, CARD_Y, cw2, STRIP_H, 12, 12, 0, 0);

    // Semi-transparent badge "Step X / 5"
    fill(255, 255, 255, 55); noStroke();
    rect(CARD_X + 10, CARD_Y + 7, 72, 20, 4);
    fill(255); textSize(11); textStyle(BOLD); textAlign(LEFT, CENTER);
    text('Step ' + step + ' / ' + (STEPS - 1), CARD_X + 17, CARD_Y + 17);

    // Step title
    textSize(13); textAlign(LEFT, CENTER);
    text(STEP_TITLES[step], CARD_X + 92, CARD_Y + 17);
    textStyle(NORMAL);
}

// ── Separators ────────────────────────────────────────────────────────────────
function drawHSep(y) {
    stroke(228); strokeWeight(1);
    line(CARD_X + 1, y, cw - CARD_X - 1, y);
}

function drawColSep() {
    stroke(228); strokeWeight(1);
    line(dX + dW + 7, ROW1_Y + 10, dX + dW + 7, ROW1_Y + ROW1_H - 10);
}

// ── Circuit diagram (left column) ─────────────────────────────────────────────
function drawCircuitStep() {
    let cx  = dX + dW / 2;
    let cy  = dY + dH / 2;
    let sp  = min(dW * 0.26, 100);
    let vsp = min(dH  * 0.32, 92);

    if      (step <= 2) drawOriginal(cx, cy, sp, vsp);
    else if (step === 3) drawWye    (cx, cy, sp, vsp);
    else if (step === 4) drawSeries (cx, cy, sp, vsp);
    else                 drawFinal  (cx, cy, sp, vsp);
}

// Step 0–2: diamond bridge
const ABOVE=0, BELOW=1, LEFT=2, RIGHT=3;

function drawOriginal(cx, cy, sp, vsp) {
    let A={x:cx,     y:cy-vsp};
    let B={x:cx-sp,  y:cy};
    let C={x:cx+sp,  y:cy};
    let D={x:cx,     y:cy+vsp};
    let dCol = step>=1 ? COL_DELTA : COL_NEUTRAL;
    let vsX  = cx - sp - 44;

    drawVsCircle(vsX, cy-vsp, vsX, cy+vsp);
    stroke(COL_WIRE); strokeWeight(2);
    line(vsX, cy-vsp, A.x, A.y);
    line(vsX, cy+vsp, D.x, D.y);

    drawResEdge(A.x,A.y, B.x,B.y, 'R1='+R[0]+'\u03A9', dCol,       14);
    drawResEdge(A.x,A.y, C.x,C.y, 'R2='+R[1]+'\u03A9', dCol,      -14);
    drawResEdge(B.x,B.y, D.x,D.y, 'R3='+R[2]+'\u03A9', COL_NEUTRAL, 14);
    drawResEdge(C.x,C.y, D.x,D.y, 'R4='+R[3]+'\u03A9', COL_NEUTRAL,-14);
    drawResEdge(B.x,B.y, C.x,C.y, 'R5='+R[4]+'\u03A9', dCol,      -14);

    if (step >= 1) {
        noFill();
        stroke(COL_DELTA[0],COL_DELTA[1],COL_DELTA[2], 48);
        strokeWeight(18); strokeCap(ROUND);
        triangle(A.x,A.y, B.x,B.y, C.x,C.y);
        strokeCap(SQUARE); strokeWeight(2);
    }
    drawBigNode(A.x,A.y,'A',ABOVE);
    drawBigNode(B.x,B.y,'B',LEFT);
    drawBigNode(C.x,C.y,'C',RIGHT);
    drawBigNode(D.x,D.y,'D',BELOW);

    if (step===2) {
        noStroke(); fill(COL_WYE); textSize(10); textStyle(BOLD); textAlign(CENTER,TOP);
        text("Ra'="+nf(Ra,0,2)+'\u03A9   Rb\'='+nf(Rb,0,2)+'\u03A9   Rc\'='+nf(Rc,0,2)+'\u03A9',
             cx, cy+vsp+14);
        textStyle(NORMAL);
    }
}

// Step 3: wye-replaced
function drawWye(cx, cy, sp, vsp) {
    let A={x:cx,      y:cy-vsp};
    let B={x:cx-sp,   y:cy+vsp*0.4};
    let C={x:cx+sp,   y:cy+vsp*0.4};
    let D={x:cx,      y:cy+vsp};
    let N={x:cx,      y:cy-vsp*0.12};
    let vsX = cx-sp-44;

    drawVsCircle(vsX,cy-vsp,vsX,cy+vsp);
    stroke(COL_WIRE); strokeWeight(2);
    line(vsX,cy-vsp,A.x,A.y); line(vsX,cy+vsp,D.x,D.y);

    drawResEdge(N.x,N.y,A.x,A.y,"Ra'="+nf(Ra,0,1)+'\u03A9',COL_WYE,   12);
    drawResEdge(N.x,N.y,B.x,B.y,"Rb'="+nf(Rb,0,1)+'\u03A9',COL_WYE,  -12);
    drawResEdge(N.x,N.y,C.x,C.y,"Rc'="+nf(Rc,0,1)+'\u03A9',COL_WYE,   12);
    drawResEdge(B.x,B.y,D.x,D.y,'R3='+R[2]+'\u03A9',COL_NEUTRAL, 14);
    drawResEdge(C.x,C.y,D.x,D.y,'R4='+R[3]+'\u03A9',COL_NEUTRAL,-14);

    drawBigNode(A.x,A.y,'A',ABOVE);
    drawBigNode(B.x,B.y,'B',LEFT);
    drawBigNode(C.x,C.y,'C',RIGHT);
    drawBigNode(D.x,D.y,'D',BELOW);
    drawWyeNode(N.x,N.y,'N');
}

// Step 4: series H-bridge
function drawSeries(cx, cy, sp, vsp) {
    let srcX  = cx-sp, srcY1 = cy-vsp*0.46, srcY2 = cy+vsp*0.46;
    let Nx = cx-sp*0.22, Ny = cy;
    let topY = cy-vsp*0.40, botY = cy+vsp*0.40;
    let Rx = cx+sp*0.72;

    drawVsCircle(srcX,srcY1,srcX,srcY2);
    stroke(COL_WIRE); strokeWeight(2);
    line(srcX,srcY1,srcX,Ny);

    drawResEdge(srcX,Ny,Nx,Ny,"Ra'="+nf(Ra,0,1)+'\u03A9',COL_WYE,-14);

    stroke(COL_WIRE); strokeWeight(2);
    line(Nx,Ny,Nx,topY); line(Nx,Ny,Nx,botY);

    drawResEdge(Nx,topY,Rx,topY,'Rs1='+nf(Rs1,0,1)+'\u03A9',COL_SERIES,-14);
    drawResEdge(Nx,botY,Rx,botY,'Rs2='+nf(Rs2,0,1)+'\u03A9',COL_SERIES, 14);

    stroke(COL_WIRE); strokeWeight(2);
    line(Rx,topY,Rx,Ny); line(Rx,botY,Rx,Ny);
    line(Rx,Ny,Rx,srcY2); line(Rx,srcY2,srcX,srcY2);

    drawBigNode(srcX,Ny,'A',LEFT);
    drawWyeNode(Nx,Ny,'N');
    drawBigNode(Rx,Ny,'D',RIGHT);

    noStroke(); fill(COL_SERIES); textSize(10); textStyle(BOLD); textAlign(LEFT,TOP);
    text('Rs1=Rb\u2019+R3='+nf(Rs1,0,2)+'\u03A9', Nx+4, topY-20);
    text('Rs2=Rc\u2019+R4='+nf(Rs2,0,2)+'\u03A9', Nx+4, botY+6);
    textStyle(NORMAL);
}

// Step 5: final Req
function drawFinal(cx, cy, sp, vsp) {
    let srcX=cx-sp*0.52, srcY1=cy-vsp*0.36, srcY2=cy+vsp*0.36, rX2=cx+sp*0.52;
    drawVsCircle(srcX-28,srcY1,srcX-28,srcY2);
    stroke(COL_WIRE); strokeWeight(2);
    line(srcX-28,srcY1,srcX,srcY1); line(srcX,srcY1,srcX,cy);
    drawResEdge(srcX,cy,rX2,cy,'Req='+nf(Req,0,2)+'\u03A9',COL_RESULT,-18);
    stroke(COL_WIRE); strokeWeight(2);
    line(rX2,cy,rX2,srcY2); line(rX2,srcY2,srcX-28,srcY2);

    noStroke();
    fill(COL_RESULT); textSize(16); textStyle(BOLD); textAlign(CENTER,CENTER);
    text('Req = '+nf(Req,0,2)+' \u03A9', cx, cy+vsp*0.55);
    fill(COL_VS); textSize(13);
    text('I = '+nf(Vs/Req,0,4)+' A', cx, cy+vsp*0.78);
    textStyle(NORMAL);
}

// ── Primitive drawers ─────────────────────────────────────────────────────────
function drawResEdge(x1,y1,x2,y2,lbl,col,lblOff) {
    let dx=x2-x1, dy=y2-y1, len=sqrt(dx*dx+dy*dy);
    if (len<1) return;
    let ux=dx/len, uy=dy/len, px=-uy, py=ux;
    const sf=0.28, ef=0.72;
    stroke(COL_WIRE); strokeWeight(2);
    line(x1,y1, x1+dx*sf,y1+dy*sf);
    line(x1+dx*ef,y1+dy*ef, x2,y2);
    stroke(col); strokeWeight(2.5); noFill();
    let n=5,amp=5;
    let sx=x1+dx*sf, sy=y1+dy*sf;
    let sdx=dx*(ef-sf)/n, sdy=dy*(ef-sf)/n;
    beginShape();
    vertex(sx,sy);
    for(let j=0;j<n;j++){
        let s=(j%2===0)?1:-1;
        vertex(sx+sdx*(j+0.5)+px*amp*s, sy+sdy*(j+0.5)+py*amp*s);
    }
    vertex(x1+dx*ef,y1+dy*ef);
    endShape();
    if(lbl){
        let mx=(x1+x2)/2+px*lblOff, my=(y1+y2)/2+py*lblOff;
        noStroke(); fill(col);
        textSize(10); textStyle(BOLD); textAlign(CENTER,CENTER);
        text(lbl,mx,my); textStyle(NORMAL);
    }
}

function drawVsCircle(x1,y1,x2,y2) {
    let vcx=(x1+x2)/2, vcy=(y1+y2)/2, r=14;
    stroke(COL_WIRE); strokeWeight(2);
    line(x1,y1,vcx,vcy-r); line(vcx,vcy+r,x2,y2);
    noFill(); stroke(COL_VS); strokeWeight(2);
    circle(vcx,vcy,r*2);
    noStroke(); fill(COL_VS);
    textSize(11); textStyle(BOLD); textAlign(CENTER,CENTER);
    text('+',vcx,vcy-r*0.42); text('\u2212',vcx,vcy+r*0.42);
    textStyle(NORMAL);
    textSize(9); textAlign(LEFT,CENTER);
    text(Vs+'V',vcx+r+4,vcy);
}

function drawBigNode(x,y,lbl,pos) {
    fill(COL_NODE); noStroke(); circle(x,y,13);
    if(lbl){
        fill(28); textSize(12); textStyle(BOLD);
        if(pos===ABOVE){textAlign(CENTER,BOTTOM);text(lbl,x,y-10);}
        else if(pos===BELOW){textAlign(CENTER,TOP);text(lbl,x,y+10);}
        else if(pos===LEFT){textAlign(RIGHT,CENTER);text(lbl,x-11,y);}
        else{textAlign(LEFT,CENTER);text(lbl,x+11,y);}
        textStyle(NORMAL);
    }
}

function drawWyeNode(x,y,lbl) {
    fill(COL_WYE); noStroke(); circle(x,y,12);
    fill(28); textSize(12); textStyle(BOLD);
    textAlign(RIGHT,CENTER); text(lbl,x-10,y);
    textStyle(NORMAL);
}

// ── Operations log (right column) ────────────────────────────────────────────
function drawLogSection() {
    let r1=R[0],r2=R[1],r3=R[2],r4=R[3],r5=R[4],sum=r1+r2+r5;
    const LOG = [
        { title:'Initial Values',
          lines:['R1='+r1+'\u03A9,  R2='+r2+'\u03A9,  R3='+r3+'\u03A9',
                 'R4='+r4+'\u03A9,  R5='+r5+'\u03A9,  Vs='+Vs+'V',
                 '\u2192 Cannot reduce by series/parallel alone.']},
        { title:'Delta Identified',
          lines:['\u0394: R1(A\u2013B), R2(A\u2013C), R5(B\u2013C)',
                 '\u03A3 = '+r1+'+'+r2+'+'+r5+' = '+sum+'\u03A9']},
        { title:'\u0394\u2192Y Formulas',
          lines:["Ra\u2019 = R1\u00B7R2 / \u03A3 = "+nf(Ra,0,2)+'\u03A9',
                 "Rb\u2019 = R1\u00B7R5 / \u03A3 = "+nf(Rb,0,2)+'\u03A9',
                 "Rc\u2019 = R2\u00B7R5 / \u03A3 = "+nf(Rc,0,2)+'\u03A9']},
        { title:'Y Replaces Delta',
          lines:['Center node N introduced.',
                 "N\u2013A: Ra\u2019 = "+nf(Ra,0,2)+'\u03A9',
                 "N\u2013B: Rb\u2019 = "+nf(Rb,0,2)+'\u03A9  (\u2192R3\u2192D)',
                 "N\u2013C: Rc\u2019 = "+nf(Rc,0,2)+'\u03A9  (\u2192R4\u2192D)']},
        { title:'Series Reduction',
          lines:['Rs1 = Rb\u2019+R3 = '+nf(Rs1,0,2)+'\u03A9',
                 'Rs2 = Rc\u2019+R4 = '+nf(Rs2,0,2)+'\u03A9']},
        { title:'Final Result',
          lines:['Rp = Rs1\u2016Rs2 = '+nf(Rpar,0,2)+'\u03A9',
                 "Req = Ra\u2019+Rp = "+nf(Ra,0,2)+'+'+nf(Rpar,0,2)+'='+nf(Req,0,2)+'\u03A9',
                 'I = Vs/Req = '+nf(Vs/Req,0,4)+' A']}
    ];

    // Header
    noStroke(); fill(46); textSize(12); textStyle(BOLD); textAlign(LEFT,TOP);
    text('Operations Log', lX, ROW1_Y+10);
    textStyle(NORMAL);
    stroke(228); strokeWeight(1);
    line(lX, ROW1_Y+26, lX+lW-8, ROW1_Y+26);

    let ly = ROW1_Y + 32;
    for (let i=0; i<=step; i++) {
        if (ly > ROW1_Y+ROW1_H-8) break;
        let e=LOG[i], active=(i===step);

        if (active) {
            noStroke(); fill(232,241,255);
            rect(lX-4, ly-2, lW-4, e.lines.length*13+22, 4);
        }

        // Badge
        fill(active?COL_BTN:[155,160,172]); noStroke();
        rect(lX, ly+2, 16,12, 3);
        fill(255); textSize(8); textAlign(CENTER,CENTER);
        text(i, lX+8, ly+8);

        // Title
        fill(active?COL_BTN:[76,80,94]);
        textSize(11); textStyle(BOLD); textAlign(LEFT,TOP);
        text(e.title, lX+22, ly);
        textStyle(NORMAL);
        ly += 15;

        for (let j=0; j<e.lines.length; j++) {
            fill(active?[26,48,112]:[100,104,116]);
            textSize(10); textAlign(LEFT,TOP);
            text(e.lines[j], lX+4, ly, lW-12);
            ly += 13;
        }
        ly += 7;
    }
}

// ── Explanation pill ──────────────────────────────────────────────────────────
function drawExplanation() {
    let sc = stepColor();
    let x  = CARD_X+14, w = cw-CARD_X*2-28;

    noStroke(); fill(sc[0],sc[1],sc[2],20);
    rect(x, EXPL_Y+6, w, EXPL_H-10, 6);
    stroke(sc[0],sc[1],sc[2],100); strokeWeight(1.5); noFill();
    rect(x, EXPL_Y+6, w, EXPL_H-10, 6);
    fill(sc); noStroke();
    rect(x, EXPL_Y+6, 5, EXPL_H-10, 6,0,0,6);

    fill(36); noStroke(); textSize(12); textAlign(LEFT,TOP);
    text(EXPLANATIONS[step], x+14, EXPL_Y+12, w-22, EXPL_H-18);
}

// ── Input grid ────────────────────────────────────────────────────────────────
function drawInputSection() {
    // Section label
    noStroke(); fill(82); textSize(11); textAlign(LEFT,TOP);
    text('Edit resistor values:', CARD_X+14, INP_Y+6);

    let labels=['R1','R2','R3','R4','R5','Vs'];
    let units=['\u03A9','\u03A9','\u03A9','\u03A9','\u03A9','V'];
    let colW=(cw-40)/3;
    let rowCY=[INP_Y+20, INP_Y+52];

    for(let i=0;i<6;i++){
        let col=i%3, row=floor(i/3);
        let lx=20+col*colW, ly=rowCY[row];
        // Label right-aligned to x+30
        fill(50); textSize(13); textStyle(BOLD); textAlign(RIGHT,CENTER);
        text(labels[i]+':', lx+30, ly);
        textStyle(NORMAL);
        // Unit right of 58px input box
        fill(84); textSize(12); textAlign(LEFT,CENTER);
        text(units[i], lx+30+4+58+4, ly);
    }
}

// ── Nav buttons ───────────────────────────────────────────────────────────────
function drawNavButtons() {
    drawBtn(btnPrev, '\u25C0  Prev', step>0        ?COL_BTN    :COL_BTN_DIS);
    drawBtn(btnNext, 'Next  \u25BA', step<STEPS-1  ?COL_BTN    :COL_BTN_DIS);
    drawBtn(btnReset,'Reset',                        COL_BTN_RED);
}
function drawBtn(b,lbl,col){
    noStroke(); fill(col);
    rect(b.x,b.y,b.w,b.h,6);
    fill(255); textSize(13); textStyle(BOLD); textAlign(CENTER,CENTER);
    text(lbl,b.x+b.w/2,b.y+b.h/2);
    textStyle(NORMAL);
}

// ── Timeline ──────────────────────────────────────────────────────────────────
function drawTimeline() {
    const DOT_Y = TL_Y + 22;
    const DOT_R = 13;
    const LBL_Y = DOT_Y + DOT_R + 6;
    let tlL=tlDots[0].x, tlR=tlDots[STEPS-1].x;

    stroke(210); strokeWeight(3);
    line(tlL,DOT_Y,tlR,DOT_Y);
    stroke(COL_BTN); strokeWeight(3);
    line(tlL,DOT_Y, tlL+(tlR-tlL)*step/(STEPS-1), DOT_Y);

    let abbr=['Orig.','\u0394 ID','Y Calc','Y Sub','Series','Final'];
    for(let i=0;i<STEPS;i++){
        let d=tlDots[i], done=(i<=step), curr=(i===step);
        if(curr){
            fill(COL_BTN[0],COL_BTN[1],COL_BTN[2],35); noStroke();
            circle(d.x,DOT_Y,(DOT_R+5)*2);
        }
        fill(done?COL_BTN:[210,215,225]); noStroke();
        circle(d.x,DOT_Y,DOT_R*2);
        fill(done?255:[126,131,145]);
        textSize(10); textStyle(BOLD); textAlign(CENTER,CENTER);
        text(i,d.x,DOT_Y); textStyle(NORMAL);
        fill(done?[38,66,148]:[134,139,154]);
        textSize(9); textAlign(CENTER,TOP);
        text(abbr[i],d.x,LBL_Y);
    }
    fill(55); noStroke(); textSize(11); textStyle(BOLD); textAlign(CENTER,TOP);
    text('Step '+step+':  '+STEP_TITLES[step], cw/2, LBL_Y+14);
    textStyle(NORMAL);
}

// ── Input handling ────────────────────────────────────────────────────────────
function mousePressed() {
    if(step>0        && inBtn(btnPrev)) {step--;  redraw(); return;}
    if(step<STEPS-1  && inBtn(btnNext)) {step++;  redraw(); return;}
    if(inBtn(btnReset))                 {step=0;  redraw(); return;}
    for(let i=0;i<tlDots.length;i++){
        if(dist(mouseX,mouseY,tlDots[i].x,TL_Y+22)<16){step=i;redraw();return;}
    }
}
function mouseMoved(){redraw();}
function inBtn(b){
    return mouseX>=b.x&&mouseX<=b.x+b.w&&mouseY>=b.y&&mouseY<=b.y+b.h;
}

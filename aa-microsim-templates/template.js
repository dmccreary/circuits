// standard sizes for Smartboard with controls at the bottom
let canvasWidth = 600;
let canvasHeight = 600;

let plotWidth = canvasWidth;
let plotHeight = 500;
let plotMargin = 50;

let controlWidth = canvasWidth;
let controlHeight = 100;


let sliderLeftMargin = 120;

function setup {
    const canvas = createCanvas(canvasWidth, canvasHeight);
    
    // Connect to the main in the HTML DOM
    var mainElement = document.querySelector('main');
    canvas.parent(mainElement);
    // larger text so you can read it from the back of the classroom
    textSize(16);

    // create a new slider at th bottom of the canvas
    mySlider = createSlider(0, 100, 50, 1);
    mySlider.position(sliderLeftMargin, drawHeight + 12);
    mySlider.size(canvasWidth - 50);
 
}

function draw() {
    // make the background drawing region light gray
    fill('aliceblue');
    rect(0, 0, canvasWidth, canvasWidth);
    // make the background of the controls white
    fill('white')
    rect(0, plotHeight, canvasWidth, canvasHeight-controlHeight);

    // get the updated slider value
    val = mySlider.value();

    // draw the sim here
    circle(canvasWidth/2, drawHeight/2, val)

    // draw label and value
    text("MySlider: " +  val, 10, drawHeight + 25)
}
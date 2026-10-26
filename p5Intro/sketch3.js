let gridSizeSlider;
let colsSlider;
let gapSlider;
let shearSlider;
let gridSize = 50;
let textInput;
let textColorPicker;
let textSizeSlider;
let textWeightSlider;
let exportButton
let cols;
let rows;
function setup() {
  createCanvas(600, 600);
  rectMode(CENTER);
  createElement('label', 'zoom')
  gridSizeSlider = createSlider(10, 100, 10)
  createElement('label', 'columns')
  colsSlider = createSlider (5, 31, 31)
  createElement('label', 'gap')
  gapSlider = createSlider (5,100, 15)
  createElement('label', 'shear')
  shearSlider = createSlider (-30,30,0)
   createElement('label', 'type something here:')
  textInput = createInput('MY AWESOME POSTER')
  createElement('label', 'text color')
  textColorPicker = createColorPicker('white')
  createElement('label', 'text size')
  textSizeSlider = createSlider (12,75, 40)
  createElement('label', 'text weight')
  textWeightSlider = createSlider (200,900, 500)
  exportButton = createButton('save poster')
  exportButton.mousePressed(() => {saveCanvas('poster', 'png')})
 
}
function draw() {
  background(0);
  let gridSize= gridSizeSlider.value()
    let cols = int(colsSlider.value());
    for (let j = 0; j < height; j += gridSize) {
        for (let i = 0; i < cols; i++) {
            let x = i * gridSize;
            let y = j;
            let d = dist(x, y, mouseX, mouseY)
            let r = map(mouseX, 0, width, 20, 250)
            let g = map(mouseY, 0, height, 20, 250)
            let b = map(d, 0, width, 20, 250)
            noStroke();
            fill(r, g, b);
            
            push()
            translate(x, y)
            shearX(shearSlider.value()*0.05)
            rect(x, y, gapSlider.value(), gapSlider.value());
            pop ()
        }
    }
textSize(textSizeSlider.value())
textWeight(textWeightSlider.value())
fill(textColorPicker.value())
text(textInput.value(), 10,300)


      

}
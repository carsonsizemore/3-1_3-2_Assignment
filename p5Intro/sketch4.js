// --- ORIGINAL GRAPH DATA ---
let myData = [
  { class: "data vis", difficulty: 3.5, rating: 9 },
  { class: "type and image", difficulty: 1, rating: 1 },
  { class: "art history", difficulty: 7, rating: 7 },
  { class: "des prof practices", difficulty: 7, rating: 10 },
  { class: "spanish", difficulty: 8.5, rating: 10 }
];

let classColors = {
  'data vis': '#ffd500',
  'type and image': '#6ae890',
  'art history': '#8ab9d9',
  'des prof practices': '#cd8ad9',
  'spanish': '#e05e5e',
};

// Default custom data for Graph 2 (uses the same color palette)
let customData = [
  { class: "put", difficulty: 4, rating: 8 },
  { class: "your", difficulty: 3, rating: 5 },
  { class: "classes", difficulty: 6, rating: 6 },
  { class: "here", difficulty: 5, rating: 9 },
  { class: "& see yours!", difficulty: 7, rating: 7 }
];

let nameInputs = [];
let diffSliders = [];
let ratingSliders = [];

function setup() {
  // Canvas width is 1000px so both 500px graphs fit side-by-side
  let canvas = createCanvas(1000, 500);
  canvas.position(10, 10);

  // Default color list to map colors to user classes
  let colorList = Object.values(classColors);

  // Set startY below the canvas (Canvas ends at y = 510)
  let startY = 545;

  // Column Headers / Labels for the Sliders
  let labelDiff = createSpan("difficulty of class");
  labelDiff.position(665, startY - 25);
  labelDiff.style('font-family', 'sans-serif');
  labelDiff.style('font-size', '11px');
  labelDiff.style('font-weight', 'bold');

  let labelRating = createSpan("how much you like the class");
  labelRating.position(795, startY - 25);
  labelRating.style('font-family', 'sans-serif');
  labelRating.style('font-size', '11px');
  labelRating.style('font-weight', 'bold');

  // Create text inputs and sliders for the second graph on the right
  for (let i = 0; i < customData.length; i++) {
    // 1. Text input for custom class name
    let inp = createInput(customData[i].class);
    inp.position(520, startY + (i * 35));
    inp.size(130);
    nameInputs.push(inp);

    // 2. Slider for difficulty (range: 0.5 - 15, step: 0.5)
    let diffS = createSlider(0.5, 15, customData[i].difficulty, 0.5);
    diffS.position(665, startY + (i * 35));
    diffS.size(110);
    diffSliders.push(diffS);

    // 3. Slider for rating (range: 1 - 11, step: 1)
    let rateS = createSlider(1, 11, customData[i].rating, 1);
    rateS.position(795, startY + (i * 35));
    rateS.size(110);
    ratingSliders.push(rateS);
  }
}

function draw() {
  background(220);

  // Update user-customized data live from inputs and sliders
  for (let i = 0; i < customData.length; i++) {
    customData[i].class = nameInputs[i].value();
    customData[i].difficulty = diffSliders[i].value();
    customData[i].rating = ratingSliders[i].value();
  }

  // ==========================================
  // GRAPH 1: EXACT ORIGINAL GRAPH (Left Side)
  // ==========================================
  
  let totalDifficulty1 = 0;
  for (let i = 0; i < myData.length; i++) {
    totalDifficulty1 += myData[i].difficulty;
  }

  let currentX1 = 0;
  rectMode(CORNER);
  for (let i = 0; i < myData.length; i++) {
    let item = myData[i];
    let w = (item.difficulty / totalDifficulty1) * 500;
    
    // Background bar
    fill(classColors[item.class] || 200);
    rect(currentX1, 0, w, 500);

    // Rating bar
    let maxRating = 11;
    let ratingHeight = (item.rating / maxRating) * height;
    let blackWidth = 10;
    let blackX = currentX1 + (w / 2) - (blackWidth / 2);
    
    fill(255);
    rect(blackX, height - ratingHeight, blackWidth, ratingHeight);
    
    currentX1 += w;
  }

  // Original Legend on bottom-right of Graph 1
  let classes = Object.keys(classColors);
  for (let i = 0; i < classes.length; i++) {
    push();
    textAlign(LEFT, CENTER);
    translate(350, 350);
    rectMode(CENTER);
    fill(classColors[classes[i]]);
    square(20, (i + 1) * 20, 16);
    fill(40);
    textSize(12);
    noStroke();
    text(classes[i], 40, (i + 1) * 20);
    pop();
  }

  // Vertical boundary line between Graph 1 and Graph 2
  stroke(255);
  strokeWeight(30);
  line(500, 0, 500, 500);

  // ==========================================
  // GRAPH 2: INTERACTIVE CUSTOM GRAPH (Right Side)
  // ==========================================
  stroke(0);
  strokeWeight(1);
  let totalDifficulty2 = 0;
  for (let i = 0; i < customData.length; i++) {
    totalDifficulty2 += customData[i].difficulty;
  }

  let currentX2 = 500; // Starts at x = 500 for the right side
  let colorValues = Object.values(classColors);

  for (let i = 0; i < customData.length; i++) {
    let item = customData[i];
    let w = totalDifficulty2 > 0 ? (item.difficulty / totalDifficulty2) * 500 : 0;
    
    // Uses matching class color if recognized, or assigns one from the same palette
    let col = classColors[item.class] || colorValues[i % colorValues.length];
    
    // 1. Class background bar
    fill(col);
    rect(currentX2, 0, w, 500);

    // 2. White rating bar
    let maxRating = 11;
    let ratingHeight = (item.rating / maxRating) * height;
    let blackWidth = 10;
    let blackX = currentX2 + (w / 2) - (blackWidth / 2);
    fill(255);
    rect(blackX, height - ratingHeight, blackWidth, ratingHeight);

    // 3. Text label inside the column (Rotated vertically so long text fits neatly)
    if (w > 15) { // Only draw label if column width is wide enough
      push();
      noStroke();
      translate(currentX2 + w / 2, 80);
      rotate(HALF_PI); // Rotate 90 degrees vertical
      textAlign(LEFT, CENTER);
      fill(40);
      textSize(12);
      textStyle(BOLD);
      text(item.class, 0, 0);
      pop();
    }

    currentX2 += w;
  }
}
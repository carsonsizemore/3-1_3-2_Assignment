let cnv; // Make cnv global so other functions can see it
let bgColor;
let isRotating = true;
let rotationAngle = 0;

function setup() {
  cnv = createCanvas(600, 600); // Assign it to our global variable
  bgColor = color(189, 237, 224);
  document.getElementById('sketch-holder').appendChild(cnv.elt);
}

function mousePressed() {
  isRotating = !isRotating;
  bgColor = color(random(255), random(255), random(255));
  strokeWeight = random (.5, 10)
  addNewCanvas();
}

function addNewCanvas() {
  // Create a new HTML canvas element
  let extraCanvas = document.createElement('canvas');
  extraCanvas.width = 100;
  extraCanvas.height = 100;
  // Add the new canvas to the HTML body
  document.body.appendChild(extraCanvas);
  
  // Draw and SCALE the image to fit the 100x100 dimensions
  let ctx = extraCanvas.getContext('2d');
  ctx.drawImage(cnv.elt, 0, 0, 100, 100); 
}

function draw() {
  background(bgColor);
  
  if (isRotating) {
    rotationAngle += 0.01;
  }
  
  push();
  translate(300, 300);
  rotate(rotationAngle);
  translate(-300, -300);
  
  stroke('white')
  fill("white");
  circle(300, 300, 50);
  
  stroke(100, 30, 150);
  strokeWeight(5);
  noFill();
  circle(300, 300, 100);
  
  fill(182, 184, 214);
  rect(400, 400, 300, 300);
  rect(-100, 400, 300, 300);
  rect(400, -100, 300, 300);
  rect(-100, -100, 300, 300);
  
  fill("white");
  circle(50, 50, 200);
  circle(550, 50, 200);
  circle(50, 550, 200);
  circle(550, 550, 200);
  
  noFill();
  stroke(100, 30, 150);
  strokeWeight(2);
  ellipse(-100, 300, 600, 100);
  ellipse(700, 300, 600, 100);
  ellipse(300, -100, 100, 600);
  ellipse(300, 700, 100, 600);
  ellipse(-150, 300, 600, 100);
  ellipse(750, 300, 600, 100);
  ellipse(300, -150, 100, 600);
  ellipse(300, 750, 100, 600);
  
  pop();
}
let word = "hello neighbor"
let letters = []

function setup() {
  createCanvas(600, 600)
  textFont('Courier New')
  textSize(24)
  textStyle(BOLD)
  textAlign(CENTER, CENTER)
  makeLetters()
}

// one object per letter, laid out in a line in the middle
function makeLetters() {
  letters = []
  let colSpacing = 20  // Horizontal spacing between words/letters
  let rowSpacing = 20  // Vertical spacing between rows
  
  // Loop through rows and columns to fill the canvas
  for (let y = 50; y < height; y += rowSpacing) {
    for (let x = 50; x < width; x += colSpacing) {
      // Pick a character from the word (looping through it if the grid is bigger than the word length)
      let charIndex = letters.length % word.length;
      let c = word[charIndex];
    let wordInstanceIndex = Math.floor(letters.length / word.length);
      
      // Use an if clause to check if this repetition should be orange (odd indexes)
      let isOrange = false;
      if (wordInstanceIndex % 2 === 1) {
        isOrange = true;
      }
      
      letters.push({
        char: c,
        homeX: x,
        homeY: y,
        dx: 0,             
        dy: 0,
        angle: 0,
        orange: isOrange,          // Store the orange flag on the letter object
        seed: noise(x, y) * 1000  // unique random seed based on position
      })
    }
  }
}

function draw() {
  background('#002fff')
  
  // 2. Draw a green circle under the mouse to change that part of the background
  noStroke()
  let radius = 200;
  
  // Create a radial gradient centered at (mouseX, mouseY)
  // createRadialGradient(x0, y0, r0, x1, y1, r1)
  let radialGradient = drawingContext.createRadialGradient(
    mouseX, mouseY, 0,       // Inner circle: center and 0 radius
    mouseX, mouseY, radius   // Outer circle: center and full radius
  );
  
  // Add color stops (from center to edge)
  radialGradient.addColorStop(0, '#e1ff00');     // Bright green center

  radialGradient.addColorStop(1, '#002fff');      // Fade out completely at edge

  // Apply the gradient fill to the canvas drawing context
  drawingContext.fillStyle = radialGradient;
  ellipse(mouseX, mouseY, 500, 500)

  let t = frameCount * 0.02

  for (let i = 0; i < letters.length; i++) {
    let l = letters[i]
    let d = dist(mouseX, mouseY, l.homeX, l.homeY)

    // Calculate a gentle continuous wave offset for idle state
    let idleX = map(noise(l.seed, t), 0, 1, -6, 6)
    let idleY = map(noise(l.seed + 300, t), 0, 1, -6, 6)

    if (d < 250) {
      // Near the mouse: active noise drift + push away
      l.dx += map(noise(l.seed, t), 0, 1, -4, 4)
      l.dy += map(noise(l.seed + 500, t), 0, 1, -4, 4)
      l.angle += map(noise(l.seed + 900, t), 0, 1, -0.1, 0.1)
      let away = atan2(l.homeY - mouseY, l.homeX - mouseX)
      l.dx += cos(away) * 1.0
      l.dy += sin(away) * 1.0
      
      l.dx = constrain(l.dx, -100, 100)
      l.dy = constrain(l.dy, -100, 100)
    } else {
      // Far away: smoothly float/wave by easing towards the idle noise position
      l.dx = lerp(l.dx, idleX, 0.5)
      l.dy = lerp(l.dy, idleY, 0.5)
      l.angle *= 0.94
    }

    // the farther from home, the more it fades toward coral
    let far = constrain(dist(0, 0, l.dx, l.dy) / 200, 0, 1)

    let baseColor;
    if (l.orange) {
      baseColor = color('#ff9f4b'); // Vibrant orange for every other phrase
    } else {
      baseColor = color('#ffffff'); // White for standard phrases
    }
    
    fill(lerpColor(baseColor, color('#002fff'), far))
    noStroke()

    push()
    translate(l.homeX + l.dx -20, l.homeY + l.dy-20)
    rotate(l.angle)
    text(l.char, 0, 0)
    pop()
  }
}

// type to change the word
function keyPressed() {
  if (key === 'Backspace') {
    word = word.slice(0, -1)
  } else if (key.length === 1) {
    word = word + key
  }
  makeLetters()
}

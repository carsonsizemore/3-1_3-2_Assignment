let gridSize = 25;
let cols;
let rows;
function setup() {
  createCanvas(600, 600);
  cols = int(width/gridSize);
  rows = int(height/gridSize);
  rectMode(CENTER);
}
function draw() {
  background(0);
    for (let j = 0; j < height; j += gridSize) {
        for (let i = 0; i < cols; i++) {
            let x = i * gridSize;
            let y = j;
            let d = dist(x, y, mouseX, mouseY)
            let r = map(mouseX, 0, width, 20, 250)
            let g = map(mouseY, 0, height, 20, 250)
            let b = map(d, 0, width, 20, 250)
            noStroke();
            if (random()>0.5){
            fill(r, g, b);
            } else {
                fill (b, r, g);
            }
            push()
            translate(x, y)
            let upValue = map(sin(frameCount*0.1+i+j), -1, 1, -10, 10)
            translate(-300,-100)
            shearX((frameCount*0.005))
            rect(x, y, gridSize*0.9, gridSize*0.9);
            pop ()
        }
    }


//   for (let i = 0; i < width; i += 50) {
//     circle(25 + i, 25, 50);
//   }
    // for (let j = 0; j < height; j += gridSize) {
    //     for (let i = 0; i < cols; i++) {
    //         let x = 25 + i * gridSize;
    //         let y = 25 + j;
    //         circle(x, y, gridSize);
    //     }
    // }
    
//     for (let j = 0; j < height; j += gridSize) {
//         for (let i = 0; i < cols; i++) {
//             let x = i * gridSize;
//             let y = j;
//             noFill();
//             stroke(random(255));
//             strokeWeight(2);
//             line(x, y, x + gridSize, y + gridSize);
//             line(y, x, y + gridSize, x + gridSize);
//         }
// }
    //      for (let j = 0; j < height; j += gridSize) {
    //     for (let i = 0; i < cols; i++) {
    //         let x = i * gridSize;
    //         let y = j;
    //         if (i % 2 == 0) {
    //             fill(255, 0, 0);
    //         } else if (i % 2 == 1 && j % 2 == 1) {
    //             fill(0, 0, 255);
    //         } else {
    //             fill(255);
    //         }
    //         noStroke();
    //         rect(x, y, gridSize, gridSize);
    //     }
    // }

//   for (let i = 0; i < cols; i++) {
//     for (let j = 0; j < rows; j++) {
//       let x = i * gridSize + gridSize/2
//       let y = j * gridSize + gridSize/2
//       // circle(x, y, gridSize)
//       fill(random(255), random(255), random(255))
//       noStroke()
//       if (random() > 0.5) {
//         // line(x-gridSize/2, y-gridSize/2, x+gridSize/2, y+gridSize/2)
//         rect(x-gridSize/2, y-gridSize/2, gridSize * random(0.1, 0.9), gridSize * random(0.1, 0.9))
//       } else {
//         // line(x-gridSize/2, y+gridSize/2, x+gridSize/2, y-gridSize/2)
//         circle(x, y, gridSize * random(0.1, 0.9))
//       }
//     }
// }
//    for (let j = 0; j < height; j += gridSize) {
//         for (let i = 0; i < cols; i++) {
//             let x = i * gridSize;
//             let y = j;
//             push ()
//             translate (300,300)
//             rotate (frameCount * 0.05)
//             rect (x,y)
//             pop ()
//         }
// }   
//     noStroke()
//     let value = map(sin(frameCount*0.1), -1, 1, 50, 100)
//     push ()
//     circle (200, 200, value)
//     circle (400, 200, value)
//     pop ()

//     let mouthWave = map (sin(frameCount*0.2), -1,1,50,100)
//     push ()
//     stroke (225)
//     arc (50, 550, mouthWave, mouthWave, mouthWave, mouthWave)
//     pop ()
// }
      

}
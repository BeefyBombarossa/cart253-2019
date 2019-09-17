// I added a triangle and ricardo in

// The current position and size of the circle
let circleX;
let circleY;
let circleSize = 50;

// The current position and size of the square
let squareX;
let squareY;
let squareSize = 50;

// The starting position and size of the Triangle thing
let triangleX1 = 30;
let triangleY1 = 315;
let triangleX2 = 58;
let triangleY2 = 260;
let triangleX3 = 86;
let triangleY3 = 315;

 // Making a figure follow the mouse
 let imgX;
 let imgY;

// preload()
//
// Nothing here

function preload() {
img = loadImage('Dancingcardo.gif');
}


// setup()
//
// Set up the canvas, position the images, set the image mode.

function setup() {
  // Create our canvas
  createCanvas(640,640);

  // Start the circle off screen to the bottom left
  // We divide the size by two because we're drawing from the center
  circleX = -circleSize/2;
  circleY = height + circleSize/2;

  // Start the square off screen to the bottom right
  // We divide the size by two because we're drawing from the center
  squareX = 320;
  squareY = 0;

  // We'll draw rectangles from the center
  rectMode(CENTER);
  // We won't have a stroke in this
  noStroke();

  imageMode(CENTER);
}

function draw() {
  // We don't fill the background so we get a drawing effect
background (255);
  // Move circle up and to the right
  circleX += 1;
  circleY -= 1;
  // Make the circle transparent red
  fill(255,0,0);
  // Display the circle
  ellipse(circleX,circleY,circleSize,circleSize);
  //making a square go down from the center

  squareY = squareY + 1;

  fill(0,0,255);
  // Display the square
  rect(squareX,squareY,squareSize,squareSize);

  // This moves the triangle to the left
  triangleX1 = triangleX1 + 1;
  triangleX2 = triangleX2 + 1;
  triangleX3 = triangleX3 + 1;
  //good ol colors for the triangle
  fill(127);
  triangle(triangleX1,triangleY1,triangleX2,triangleY2,triangleX3,triangleY3);

 //Making ricardo follow the mouse
  imgY = mouseY;
  imgX = mouseX;

  image(img, imgX, imgY, 180, 180);

}

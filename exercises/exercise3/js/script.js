"use strict";

/******************************************************************************
Where's Sausage Dog? (The cooler version)
by Gabriel Garces

An algorithmic version of a Where's Wally/Waldo searching game where you
need to click on the sausage dog you're searching for in amongst all
the visual noise of other animals.

Animal images from:
https://creativenerds.co.uk/freebies/80-free-wildlife-icons-the-best-ever-animal-icon-set/
******************************************************************************/

// The position and size of the victory sausages

// Position and image of the sausage dog we're searching for
let targetX;
let targetY;
let targetImage;

// The ten decoy images
let decoyImage1;
let decoyImage2;
let decoyImage3;
let decoyImage4;
let decoyImage5;
let decoyImage6;
let decoyImage7;
let decoyImage8;
let decoyImage9;
let decoyImage10;

// The number of decoys to show on the screen, randomly
// chosen from the decoy images
let numDecoys = 200;

// Keep track of whether they've won
let gameOver = false;

// The position for the sausage in the corner
let decorX = 1450
let decorY = 70

// preload()
//
// Loads the target and decoy images before the program starts
function preload() {
  targetImage = loadImage("assets/images/animals-target.png");

  decoyImage1 = loadImage("assets/images/animals-01.png");
  decoyImage2 = loadImage("assets/images/animals-02.png");
  decoyImage3 = loadImage("assets/images/animals-03.png");
  decoyImage4 = loadImage("assets/images/animals-04.png");
  decoyImage5 = loadImage("assets/images/animals-05.png");
  decoyImage6 = loadImage("assets/images/animals-06.png");
  decoyImage7 = loadImage("assets/images/animals-07.png");
  decoyImage8 = loadImage("assets/images/animals-08.png");
  decoyImage9 = loadImage("assets/images/animals-09.png");
  decoyImage10 = loadImage("assets/images/animals-10.png");

}

// setup()
//
// Creates the canvas, sets basic modes, draws correct number
// of decoys in random positions, then the target
function setup() {
  createCanvas(windowWidth,windowHeight);
  background("#228B22");
  imageMode(CENTER);

  // Use a for loop to draw as many decoys as we need
  for (let i = 0; i < numDecoys; i++) {
    // Choose a random location on the canvas for this decoy
    let x = random(0,width);
    let y = random(0,height);
    // Generate a random number we can use for probability
    let r = random();
    // Use the random number to display one of the ten decoy
    // images, each with a 10% chance of being shown
    // We'll talk more about this nice quality of random soon enough.
    // But basically each "if" and "else if" has a 10% chance of being true
    if (r < 0.1) {
      image(decoyImage1,x,y);
    }
    else if (r < 0.2) {
      image(decoyImage2,x,y);
    }
    else if (r < 0.3) {
      image(decoyImage3,x,y);
    }
    else if (r < 0.4) {
      image(decoyImage4,x,y);
    }
    else if (r < 0.5) {
      image(decoyImage5,x,y);
    }
    else if (r < 0.6) {
      image(decoyImage6,x,y);
    }
    else if (r < 0.7) {
      image(decoyImage7,x,y);
    }
    else if (r < 0.8) {
      image(decoyImage8,x,y);
    }
    else if (r < 0.9) {
      image(decoyImage9,x,y);
    }
    else if (r < 1.0) {
      image(decoyImage10,x,y);
    }
  }

  // Once we've displayed all decoys, we choose a random location for the target
  targetX = random(0,width);
  targetY = random(0,height);

  // And draw it (because it's the last thing drawn, it will always be on top)
  image(targetImage,targetX,targetY);

  //Now we set up the sausages

}


// Displays the game over screen if the player has won,
// otherwise nothing (all the gameplay stuff is in mousePressed())
function draw() {
  if (gameOver) {
    // the screen turns white
    background(255)
    // Prepare our typography
    textFont("Helvetica");
    textSize(128);
    textAlign(CENTER,CENTER);
    noStroke();
    fill(random(80,230));

    // Tell them they won!
    text("YOU'RE A WEINER!",width/2,height/2);

    // Draw a circle around the sausage dog to show where it is (even though
    // they already know because they found it!)
    noFill();
    stroke(255,0,0);
    strokeWeight(10);
    ellipse(targetX,targetY,targetImage.width,targetImage.height);

    //Sausage dog moves in celebration
    image(targetImage,decorX,decorY);
    decorX = decorX - 0.5
    decorY++

  }
  // Create the rectangle on the top right corner and place the dog inside of it
  fill(255);
  stroke(200,80,60);
  strokeWeight(5);
  rect(1367,1,150,150);
  image(targetImage,decorX,decorY);

  // Text indicating the player what to do in the game
  textFont("Arial");
  textAlign(CENTER,CENTER);
  textSize(30);
  noStroke();
  fill(0,0,0);

  text("Find moi",1445,130);
}

// mousePressed()
//
// Checks if the player clicked on the target and if so tells them they won
function mousePressed() {
  // The mouse was clicked!
  // Check if the cursor is in the x range of the target
  // (We're subtracting the image's width/2 because we're using imageMode(CENTER) -
  // the key is we want to determine the left and right edges of the image.)
  if (mouseX > targetX - targetImage.width/2 && mouseX < targetX + targetImage.width/2) {
    // Check if the cursor is also in the y range of the target
    // i.e. check if it's within the top and bottom of the image
    if (mouseY > targetY - targetImage.height/2 && mouseY < targetY + targetImage.height/2) {
      gameOver = true;
    }
  }
}

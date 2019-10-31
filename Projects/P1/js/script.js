"use strict";

/******************************************************

Game - For the soviets
Gabriel Garces

You're a lone soviet warrior who must fight in order to take out the fascists. Do it for the Motherland and bring glory back to mother Russia 

Includes: Physics-based movement, keyboard controls, health/stamina,
random movement, screen wrap.

******************************************************/

// Track whether the game is over
let gameOver = false;

// Player position, size, velocity
let playerX;
let playerY;
let playerRadius = 30;
let playerVX = 0;
let playerVY = 0;
let playerMaxSpeed = 2;
// Player health
let playerHealth;
let playerMaxHealth = 255;
// Player fill color
let playerFill = 50;

// Prey position, size, velocity
let preyX;
let preyY;
let py = 0.0;
let px = 0.0;
let preyRadius = 30;
let preyVX;
let preyVY;
let preyMaxSpeed = 4;
// Prey health
let preyHealth;
let preyMaxHealth = 100;
// Prey fill color
let preyFill = 200;

// Amount of health obtained per frame of "eating" (overlapping) the prey
let eatHealth = 10;
// Number of prey eaten during the game (the "score")
let preyEaten = 0;

//Images and Sounds
let soviet;
let nazi;
let ussr;
let dead;
let bat;
let relaxation

//Click to play screen
let title;
let started = false;

//Kill Sounds
let kill1;
let kill2;
let kill3;
let kill4;
let kill5;
let kill6;
let kill7;
// setup()
//
function preload() {
  ussr = loadSound('assets/sounds/USSR.mp3');
  kill1 = loadSound('assets/sounds/Kill 1.mp3');
  kill2 = loadSound('assets/sounds/Kill 2.mp3');
  kill3 = loadSound('assets/sounds/Kill 3.mp3');
  kill4 = loadSound('assets/sounds/Kill 4.mp3');
  kill5 = loadSound('assets/sounds/Kill 5.mp3');
  kill6 = loadSound('assets/sounds/Kill 6.mp3');
  kill7 = loadSound('assets/sounds/Kill 7.mp3');
  relaxation = loadSound('assets/sounds/German.Trench.Assault.mp3');
}
// Sets up the basic elements of the game
function setup() {
  createCanvas(600, 600);

  noStroke();

  setupImage();

  setupSound();
  // We're using simple functions to separate code out
  setupPrey();
  setupPlayer();
}

function setupImage() {
  soviet = loadImage('assets/images/Sovs.png');
  nazi = loadImage('assets/images/Naz.png');
  title = loadImage('assets/images/Title.jpg');
  dead = loadImage('assets/images/End.png');
  bat = loadImage('assets/images/bat.jpg');
  imageMode(CENTER);
}

function setupSound() {
  ussr.setVolume(0.5);
  kill1.setVolume(0.4)
  kill2.setVolume(0.4)
  kill3.setVolume(0.4)
  kill4.setVolume(0.4)
  kill5.setVolume(0.4)
  kill6.setVolume(0.4)
  kill7.setVolume(0.4)
  relaxation.setVolume(0.3);
  relaxation.play();
}
// setupPrey()
//
// Initialises prey's position, velocity, and health
function setupPrey() {
  px = random(0,1000);
  py = random(0,1000);
  preyX = width / 5;
  preyY = height / 2;
  preyVX = -preyMaxSpeed;
  preyVY = preyMaxSpeed;
  preyHealth = preyMaxHealth;
}

// setupPlayer()
//
// Initialises player position and health
function setupPlayer() {
  playerX = 4 * width / 5;
  playerY = height / 2;
  playerHealth = playerMaxHealth;
}

// draw()
//
// While the game is active, checks input
// updates positions of prey and player,
// checks health (dying), checks eating (overlaps)
// displays the two agents.
// When the game is over, shows the game over screen.
function draw() {
    if (!started) {
    image(title, width/2, height/2);
    }
    else {
    image(bat, width/2, height/2);

  if (!gameOver) {
    handleInput();

    movePlayer();
    movePrey();

    updateHealth();
    checkEating();

    drawPrey();
    drawPlayer();
  }
  else {
    showGameOver();
  }
 }
}
function mousePressed() {
  started = true;
}
// handleInput()
//
// Checks arrow keys and adjusts player velocity accordingly
function handleInput() {
  // Check for horizontal movement
  if (keyIsDown(LEFT_ARROW)) {
    playerVX = -playerMaxSpeed;
  }
  else if (keyIsDown(RIGHT_ARROW)) {
    playerVX = playerMaxSpeed;
  }
  else {
    playerVX = 0;
  }

  // Check for vertical movement
  if (keyIsDown(UP_ARROW)) {
    playerVY = -playerMaxSpeed;
  }
  else if (keyIsDown(DOWN_ARROW)) {
    playerVY = playerMaxSpeed;
  }
  else {
    playerVY = 0;
  }
//Sprint button
    if (keyIsDown(SHIFT) && keyIsDown(UP_ARROW)) {
      playerVY = -10;
    } else if (keyIsDown(SHIFT) && keyIsDown(DOWN_ARROW)) {
      playerVY = 10;
    }
  if (keyIsDown(SHIFT) && keyIsDown(LEFT_ARROW)) {
    playerVX = -10;
  } else if (keyIsDown(SHIFT) && keyIsDown(RIGHT_ARROW)) {
    playerVX = 10;
  }
}

// movePlayer()
//
// Updates player position based on velocity,
// wraps around the edges.
function movePlayer() {
  // Update position
  playerX = playerX + playerVX;
  playerY = playerY + playerVY;

  // Wrap when player goes off the canvas
  if (playerX < 0) {
    // Off the left side, so add the width to reset to the right
    playerX = playerX + width;
  }
  else if (playerX > width) {
    // Off the right side, so subtract the width to reset to the left
    playerX = playerX - width;
  }

  if (playerY < 0) {
    // Off the top, so add the height to reset to the bottom
    playerY = playerY + height;
  }
  else if (playerY > height) {
    // Off the bottom, so subtract the height to reset to the top
    playerY = playerY - height;
  }
}

// updateHealth()
//
// Reduce the player's health (happens every frame)
// Check if the player is dead
function updateHealth() {
  // Reduce player health
  playerHealth = playerHealth - 0.5;
 //Reduce player health when running
 if (keyIsDown(SHIFT)) {
    playerHealth = playerHealth - 2;
  }
  // Constrain the result to a sensible range
  playerHealth = constrain(playerHealth, 0, playerMaxHealth);
  // Check if the player is dead (0 health)
  if (playerHealth === 0) {
    // If so, the game is over
    gameOver = true;
  }
}

// checkEating()
//
// Check if the player overlaps the prey and updates health of both
function checkEating() {
  // Get distance of player to prey
  let d = dist(playerX, playerY, preyX, preyY);
  // Check if it's an overlap
  if (d < playerRadius + preyRadius) {
    // Increase the player health
    playerHealth = playerHealth + eatHealth;
    // Constrain to the possible range
    playerHealth = constrain(playerHealth, 0, playerMaxHealth);
    // Reduce the prey health
    preyHealth = preyHealth - eatHealth;
    // Constrain to the possible range
    preyHealth = constrain(preyHealth, 0, preyMaxHealth);

    // Check if the prey died (health 0)
    if (preyHealth === 0) {
      // Move the "new" prey to a random position
      px = random(0, width);
      py = random(0, height);
      // Give it full health
      preyHealth = preyMaxHealth;
      // Track how many prey were eaten
      preyEaten = preyEaten + 1;
    let keel = [kill1, kill2, kill3, kill4, kill5, kill6, kill7];
    let kill = random(keel);
      random(keel).play();
    }
  }
}
// movePrey()
//
// Moves the prey based on random velocity changes
function movePrey() {
  preyX = width * noise(px);
  preyY = height * noise(py);

  px += 0.01;
  py += 0.01;
  // Change the prey's velocity at random intervals
  // random() will be < 0.05 5% of the time, so the prey
  // will change direction on 5% of frames

  // Update prey position based on velocity
  preyX = preyX + preyVX;
  preyY = preyY + preyVY;

  // Screen wrapping
  if (preyX < 0) {
    preyX = preyX + width;
  }
  else if (preyX > width) {
    preyX = preyX - width;
  }

  if (preyY < 0) {
    preyY = preyY + height;
  }
  else if (preyY > height) {
    preyY = preyY - height;
  }
}

// drawPrey()
//
// Draw the prey as an ellipse with alpha based on health
function drawPrey() {
  tint(255, preyHealth);
  image(nazi, preyX, preyY, preyRadius * 2, preyRadius * 2);
}

// drawPlayer()
//
// Draw the player as an ellipse with alpha value based on health
function drawPlayer() {
  tint(255, playerHealth);
  image(soviet, playerX, playerY, playerRadius * 2, playerRadius * 2);
}

// showGameOver()
//
// Display text about the game being over!
function showGameOver() {
  relaxation.stop();
  background(137,0,0);
  textFont("Impact");
  textSize(40);
  textAlign(CENTER, CENTER);
  fill(255);
  // Set up the text to display
  let gameOverText = "YOU DIED IN THE NAME \nOF THE MOTHERLAND\n"; // \n means "new line"
  gameOverText = gameOverText + "AND SENT " + preyEaten + " FASCISTS\n";
  gameOverText = gameOverText + "TO THE GULAGS."
  // Display it in the centre of the screen
  text(gameOverText, width / 2, height / 2);
  if (!ussr.isPlaying()) ussr.play();

}

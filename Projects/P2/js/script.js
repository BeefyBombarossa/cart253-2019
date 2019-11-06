// Predator-Prey Simulation
// by Pippin Barr
//
// Creates a predator and three prey (of different sizes and speeds)
// The predator chases the prey using the arrow keys and consumes them.
// The predator loses health over time, so must keep eating to survive.

// Our predator
let sniper;

// The three prey
let scout;
let heavy;
let pyro;

// setup()
//Variable for start screen
let started = false;

let gameIsOver = false;

//Arrays for number of prey that are going to be present
let numPrey = 5; // How many Prey to simulate
let prey = []; // An empty array to store them in (we'll create them in setup())

//Starting screen text
let sc
let sn
let he
let py

//
// Sets up a canvas
// Creates objects for the predator and three prey
function setup() {
  createCanvas(windowWidth, windowHeight);
  sc = loadImage('assets/images/Scout.png');
  sn = loadImage('assets/images/Sniper.png');
  he = loadImage('assets/images/Heavy.png');
  py = loadImage('assets/images/Pyro.png');

  sniper = new Predator(width / 2, height / 2, 5, color(255,0,0), 50);
  heavy = new Heavy(100, 100, 5, color(127), 80);
  pyro = new Pyro(100, 100, 8, color(255, 255, 0), 30);

  for (let i = 0; i < numPrey; i++) {
    // Generate (mostly) random values for the arguments of the Prey constructor
    let preyX = random(0, width);
    let preyY = random(0, height);
    let preySpeed = random(11,15);
    let preyColor = color(255);
    let preyRadius = 30;
    // Create a new Prey objects with the random values
    let newPrey = new Prey(preyX, preyY, preySpeed, preyColor, preyRadius);
    // Add the new Prey object to the END of our array using push()
    prey.push(newPrey);
  }
}

function mousePressed() {
  started = true;
}

function gameOverScreen() {
  background(255, 50, 50);

  push();
  textSize(60);
  textAlign(CENTER);
  text("GAME OVER", width / 2, height * 0.4);
  textSize(40);
  text("Reload the page to try again")
}

// draw()
//
// Handles input, movement, eating, and displaying for the system's objects
function draw() {
  if (!started) {
    background(127)
    textSize(40);
    textAlign(CENTER, CENTER);
    textFont("Impact");
    text("Click your mouse to begin", width / 2, height / 2);
    textAlign(CENTER,CENTER);
    textSize(30);
    text("Use WASD to move, you have to kill as many scouts as you can",width / 2, height/5);
    textAlign(CENTER,CENTER);
    text("Watch out for the Heavy, he will always follow you but he is slow", width / 2, height / 4);
    text("The Pyro on the other hand will roam around and not care about you... unless you get too close", width / 2, height / 3);
    }
    else {
  // Clear the background to black
  background(34,139,34);

for (let i = 0; i < prey.length; i++) {
  // And for each one, move it and display it
  prey[i].move();
  prey[i].display();
  sniper.handleEating(prey[i]);
}

  sniper.handleDamage(heavy);
  sniper.handleDamage(pyro);
  // Handle input for the sniper
  sniper.handleInput();

  // Move all the "animals"
  sniper.move();
  heavy.chase();
  pyro.move();
  pyro.handleChasing(sniper)


  // Handle the tiger eating any of the prey

  // Display all the "animals"
  sniper.display();
  heavy.display();
  pyro.display();
  }

  if (sniper.health < 2) {
      gameIsOver = true;
    }

  if (gameIsOver) {
      gameOverScreen();
    }
}

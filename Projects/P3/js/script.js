"use strict"

let playerScore = 0;
let paddle;
let ball;
let bricks;
let gameState;
let brick;
let lone;
let ded;
let yes;
let dok;
let oof;

function preload() {
lone = loadSound('assets/sounds/Lone.mp3');
ded = loadSound('assets/sounds/ded.mp3');
yes = loadSound('assets/sounds/Yes.mp3');
dok = loadSound('assets/sounds/dok.mp3');
oof = loadSound('assets/sounds/oof.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  let colors = createColors();
  gameState = 'playing';
  paddle = new Paddle();
  ball = new Ball(paddle);

  bricks = createBricks(colors);
  if (!lone.isPlaying()) lone.play();
}

function createColors() {
  const colors = [];
  colors.push(color(265, 165, 0));
  colors.push(color(135, 206, 250));
  colors.push(color(147, 112, 219));
  for (let i = 0; i < 10; i++) {
    colors.push(color(random(0, 255), random(0, 255), random(0, 255)));
  }
  return colors;
}

function createBricks(colors) {
  const bricks = [];
  const rows = 12;
  const bricksPerRow = 15;
  const brickWidth = width / bricksPerRow;
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      brick = new Brick(createVector(brickWidth * i, 25 * row), brickWidth, 25, colors[floor(random(0, colors.length))])
      bricks.push(brick);
    }
  }
  return bricks;
}

function draw() {
  if(gameState === 'playing') {
    background(0);

    ball.bounceEdge();
    ball.bouncePaddle();

    ball.update();

//Here are the controls... theyre EXTREMELY COMPLICATED so be careful here

    if (keyIsDown(65)) {
      paddle.move('left');
    } else if (keyIsDown(68)) {
      paddle.move('right');
    }else if (keyIsDown(68)) {
      paddle.move('right');
      else if (keyIsDown(68)) {
        paddle.move('right');
//Making the bricks disappear... like MAGIC
    for (let i = bricks.length - 1; i >= 0; i--) {
      const brick = bricks[i];
      if (brick.isColliding(ball)) {
        ball.reverse('y');
        bricks.splice(i, 1);
        playerScore += brick.points;
        dok.play();
      } else {
        brick.display();
      }
    }
//Display stuff
    paddle.display();
    ball.display();
//Your score thing
    textSize(32);
    fill(255);
    text(`Score:${playerScore}`, width - 150, 50);

//Dictates when you lose
    if (ball.belowBottom()) {
      gameState = 'Lose';
      ded.play();
      lone.stop();
    }

//Dictates what to do to win
    if (bricks.length === 0) {
      gameState = 'Win';
      yes.play();
      lone.stop();
    }
  } else {
    textSize(100);
    gameState === 'Lose' ? fill(255, 0, 255) : fill(255);
    text(`You ${gameState}!!!`, width / 2 - 220, height / 2);
  }
}

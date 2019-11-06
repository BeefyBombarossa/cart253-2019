// Prey
//
// A class that represents a simple prey that moves
// on screen based on a noise() function. It can move around
// the screen and be consumed by Predator objects.

class Heavy {

  // constructor
  //
  // Sets the initial values for the Predator's properties
  // Either sets default values or uses the arguments provided
  constructor(x, y, speed, fillColor, radius) {
    // Position
    this.x = x;
    this.y = y;
    // Velocity and speed
    this.vx = 0;
    this.vy = 0;
    this.speed = speed;
    // Time properties for noise() function
    this.tx = random(0, 1000); // To make x and y noise different
    this.ty = random(0, 1000); // we use random starting values
    // Health properties
    this.maxHealth = radius;
    this.health = this.maxHealth; // Must be AFTER defining this.maxHealth
    // Display properties
    this.fillColor = fillColor;
    this.radius = this.health;
  }

  chase(player) {
    // Set the ratio at which the enemy's movement will slow as it gets close to the player based on the current speed
    this.speed = constrain(this.speed, 1, 20);
    this.movementEasing = map(this.speed, 0, 20, 0, 0.015);
    // Calculate distance between heavy position and the sniper
    this.distToPlayerX = sniper.x - this.x;
    this.distToPlayerY = sniper.y - this.y;
    // Update position
    this.x += this.distToPlayerX * this.movementEasing;
    this.y += this.distToPlayerY * this.movementEasing;
  }

  // handleWrapping
  //
  // Checks if the heavy has gone off the canvas and
  // wraps it to the other side if so
  handleWrapping() {
    // Off the left or right
    if (this.x < 0) {
      this.x += width;
    }
    else if (this.x > width) {
      this.x -= width;
    }
    // Off the top or bottom
    if (this.y < 0) {
      this.y += height;
    }
    else if (this.y > height) {
      this.y -= height;
    }
  }

  // display
  //
  display() {
    push();
    noStroke();
    this.radius = this.health;
    imageMode(CENTER)
    image(he, this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }

  // reset
  //
  // Set the position to a random location and reset health
  // and radius back to default
  reset() {
    // Random position
    this.x = random(0, width);
    this.y = random(0, height);
    // Default health
    this.health = this.maxHealth;
    // Default radius
    this.radius = this.health;
  }
}

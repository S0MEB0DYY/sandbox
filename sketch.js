// Variables for position and speed of ball
let position;
let velocity;

function setup() {
  createCanvas(windowWidth, windowHeight);

  position = createVector(100, 100);
  velocity = createVector(2.5, 2);
}

function draw() {
  background(255);

  // Move the ball according to its speed.
  position.add(velocity);
  // Check for bouncing.
  if (position.x > width || position.x < 0) {
    velocity.x = -velocity.x;
  }
  if (position.y > height || position.y < 0) {
    velocity.y = -velocity.y;
  }
  // Draw the ball at the position (x, y).
  stroke(0);
  fill(127);
  circle(position.x, position.y, 48);
}

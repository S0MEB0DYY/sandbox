let position;
let velocity;

function setup() {
  createCanvas(640, 240);

  position = Vector(100, 100);
  velocity = Vector(1, 3.3);
}

function draw() {
  background(255);
}

position.x += velocity.x
position.y += velocity.y

if (position.x > width || position.x < 0) {
  velocity.x = -velocity.x;
}
if (position.y > height || position.y < 0 
  velocity.y = -velocity.y;
}

stroke(0);
fill(127);
circle(position.x, position.y, 48);

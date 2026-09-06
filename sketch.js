let collisionDamping = 0.7;
let particleProperties;

function setup() {
  createCanvas(windowWidth, windowHeight);

  boundsSize = createVector(width, height);
  Start();
  CreateParticles();
}

function draw() {
  background(0);
  translate(width / 2, height / 2);
  Update();
}
  // Functions
  // update function
function Update() {
  for (let i = 0; i < numParticles; i++) {
   //velocities[i].add(p5.Vector.mult(createVector(0, -1), gravity));
   positions[i].add(velocities[i]);
   ResolveCollisions(positions[i], velocities[i]);
   noStroke();
   fill(0, 0, 255);
   circle(positions[i].x,-positions[i].y, particleSize);
   }
 }
// resolve collisions function
function ResolveCollisions(position, velocity) {
  let halfBoundsSize = p5.Vector.sub(p5.Vector.div(boundsSize,  2), p5.Vector.mult(createVector(1, 1), particleSize));

  if (Math.abs(position.x) > halfBoundsSize.x) {
    position.x = halfBoundsSize.x * Math.sign(position.x);
    velocity.x *= -1 * collisionDamping;
  }
  if (Math.abs(position.y) > halfBoundsSize.y) {
    position.y = halfBoundsSize.y * Math.sign(position.y);
    velocity.y *= -1 * collisionDamping;
  }
}
// start function
function Start() {
  positions = new Array(numParticles);
  velocities = new Array(numParticles);

  let particlesPerRow = Math.floor(Math.sqrt(numParticles));
  let particlesPerCol = (numParticles- 1) / particlesPerRow + 1;
  let spacing = particleSize * 2 + particleSpacing;

  for (let i = 0; i < numParticles; i++) {
    let x = (i % particlesPerRow - particlesPerRow / 2 + 0.5) * spacing;
    let y = (Math.floor(i / particlesPerRow) - particlesPerCol / 2 + 0.5) * spacing;
    positions[i] = createVector(x, y);
    velocities[i] = createVector(0, 0);
  }
}
// smoothing kernel function
function SmoothingKernel(r, h) {
  let volume = Math.pi * Math.pow(h, 8) / 4;
  let value = Math.max(0, h * h - r * r);
  return value * value * value / volume;
}
// calculate density function 
function CalculateDensity(r) {
  let density = 0;
  const mass = 1;

  for (let i = 0; i < numParticles; i++) {
    let dst = p5.Vector.sub(positions[i], r).mag();
    let influence = SmoothingKernel(dst, smoothingRadius);
    density += mass * influence;
  }
  return density;
}
// example function
function ExampleFunction(pos) {
  return Math.cos(pos.y - 3 + Math.sin(pos.x));
}
// create particles function
function CreateParticles() {
  positions = new Array(numParticles);
  particleProperties = new Array(numParticles);

  for (let i = 0; i < numParticles; i++) {
    let x = (Math.random() - 0.5) * boundsSize.x;
    let y = (Math.random() - 0.5) * boundsSize.y;
    positions[i] = createVector(x, y);
    particleProperties[i] = ExampleFunction(positions[i]);
  }
}

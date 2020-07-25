let ship;

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
}

function draw() {
  background(0);
  ship.render();
  ship.turn(0);
}

function keyReleased() {
  ship.setRotation(0);
}

function keyPressed(){
  if(keyCode == RIGHT_ARROW) {
    ship.setRotation(0.1);
  } 
  else if(keyCode == LEFT_ARROW){
    ship.setRotation(-0.1);
  }
}

function Ship(){
  this.pos = createVector(width/2, height/2);
  this.r = 25;
  this.heading = 0;
  this.rotation = 0;
  this.render = () =>{
    translate(this.pos.x, this.pos.y);
    rotate(this.heading);
    noFill();
    stroke(255);
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
  }

  this.setRotation = (a) =>{
    this.rotation = a;
  }

  this.turn = () => {
    this.heading += this.rotation;
  }

}
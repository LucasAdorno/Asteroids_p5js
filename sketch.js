let ship;
let asteroids = [];
let lasers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  ship = new Ship();
  for (let i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  for (let i = 0; i < asteroids.length; i++) {
    if (ship.hits(asteroids[i])) {
      console.log('etaporra');
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();

  }
  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1)
    }
    else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          break;
        }
      }
    }
  }

  ship.render();
  ship.turn(0);
  ship.update();
  ship.edges();

}

function keyReleased() {
  ship.setRotation(0);
  ship.boosting(false);

}

function keyPressed() {

  if (key === ' ') {
    lasers.push(new Laser(ship.pos, ship.heading));
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setRotation(0.1);
  }
  else if (keyCode === LEFT_ARROW) {
    ship.setRotation(-0.1);
  }
  else if (keyCode === UP_ARROW) {
    ship.boosting(true);
  }
}


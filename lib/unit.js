class Unit {
  constructor(options) {
    this.x = options.x;
    this.type = options.type;
  }

  draw(ctx) {
    ctx.drawImage(`./assers/images/${this.type}`, this.x, 280);
  }
  // fixed y-position!

  // need preloader

  // rock.addEventListener("load", function() {
  //     ctx.drawImage(rock, 300, 280);
  // }, false);

  remove() {
    this.game.remove(this);
  }

  isCollidedWith(otherObject){
    // fixed icon width; therefore range is this.x + (150/2)
  }

}

Unit.TYPES = {
    "rock": "./assets/images/rock.png",
    "paper": "./assets/images/paper.png",
    "scissors": "./assets/images/scissors.png"
};
// necessary ^^ ????

module.exports = Unit;

// Store RPS image sources here
// Collisions

class Unit {
  constructor() {
    this.x = 600;
    this.y = 200;
    this.type = '';
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

Unit.TYPES = [
    "rock",
    "paper",
    "scissors"
];
// necessary ^^ ????

module.exports = Unit;

// Store RPS image sources here
// Collisions

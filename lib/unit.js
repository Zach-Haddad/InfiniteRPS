class Unit {
  constructor() {
    this.x = 600;
    this.y = 200;
    this.type = this.type = Unit.TYPES[Math.floor(Math.random() * 3)];
    this.img = new Image();
    this.img.src = `./assets/images/${this.type}.png`;
    this.active = false;
  }

  draw(ctx) {
    if (this.active){
      ctx.drawImage(this.img, this.x, 280);
    }
  }

  isCollidedWith(otherObject){
    // fixed icon width; therefore range is this.x + (150/2)
  }

  move(){
    this.x -= 3;
  }
  // manipulate speed here ^^^

}

Unit.TYPES = [
    "rock",
    "paper",
    "scissors"
];

module.exports = Unit;

class Unit {
  constructor() {
    this.x = 600;
    this.y = 200;
    this.type = this.type = Unit.TYPES[Math.floor(Math.random() * 3)];
    this.img = new Image();
    this.img.src = `./assets/images/${this.type}.png`;
  }

  draw(ctx) {
      ctx.drawImage(this.img, this.x, 280);
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

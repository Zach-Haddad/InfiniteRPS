// Copyright (C) Zach Haddad 2017.
// Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).

class Unit {
  constructor() {
    this.x = 800;
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
}

Unit.TYPES = [
    "rock",
    "paper",
    "scissors"
];

module.exports = Unit;

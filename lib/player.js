const Unit = require("./unit");

class Player extends Unit {
  constructor() {
    super();
    this.x = 50;
    this.health = 3;
  }

  setType(type) {
    this.type = type;
    this.img = new Image();
    this.img.src = `./assets/images/${type}.png`;
  }

}

module.exports = Player;

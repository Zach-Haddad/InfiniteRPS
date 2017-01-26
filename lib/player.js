const Unit = require("./unit");

class Player extends Unit {
  constructor() {
    super();
    this.type = "rock";
    this.img = new Image();
    this.x = 100;
    this.img_src = `./assets/images/${this.type}.png`;
    this.health = 3;
  }

  setType(type) {
    this.type = type;
    this.img = new Image();
    this.img.src = `./assets/images/${type}.png`;
  }

  collidedWith(otherObject){
    // always remove enemy from level
    // if correct, nothing
    // if opposite, lose 1 hp
    // if draw, lose 0.5 hp
  }


}

module.exports = Player;

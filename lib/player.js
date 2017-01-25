const Unit = require("./unit");

class Player extends Unit {
  constructor(options) {
  }

  setType(type) {
    this.type = type;
    this.img_src = `./assets/images/${type}.png`;
  }

  collidedWith(otherObject){
    // always remove enemy from level
    // if correct, nothing
    // if opposite, lose 1 hp
    // if draw, lose 0.5 hp
  }


}

module.exports = Player;

const Unit = require("./unit");

class Player extends Unit {
  constructor() {
    super();
    this.type = "rock";
    this.img_src = `./assets/images/${this.type}.png`;
    this.health = 3;
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

  // keybinding
  // leftarrow/z 37/90 (ROCK)
  // downarrow/x 40/88 (PAPER)
  // rightarrow/c 39/67 (SCISSORS)


}

module.exports = Player;

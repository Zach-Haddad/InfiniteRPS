// Copyright (C) Zach Haddad 2017.
// Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).

const Unit = require("./unit");

class Player extends Unit {
  constructor() {
    super();
    this.x = 50;
    this.health = 3;
    this.img.src = `./assets/images/${this.type}-player.png`;
  }

  setType(type) {
    this.type = type;
    this.img = new Image();
    this.img.src = `./assets/images/${type}-player.png`;
  }
}

module.exports = Player;

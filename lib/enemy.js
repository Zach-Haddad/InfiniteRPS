const Unit = require("./unit");

class Enemy extends Unit {
  constructor() {
    this.type = Unit.TYPES[Math.floor(Math.random() * 3)];
  }

}

module.exports = Enemy;

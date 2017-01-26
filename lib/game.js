const Unit = require("./unit");
const Player = require("./player");
const Enemy = require("./enemy");

class Game {
  constructor() {
    this.level = 1;
    this.score = 0;
    this.enemies = [];
    this.player = new Player();
    this.levelCompleted = false;
  }

  populateEnemies(level) {
    // add number of enemies proportional to current level (maybe 1.1x + 4)
    // enemy constructor will have randomized type
  }

  moveObjects(delta){

  }

  draw(ctx){

  }

  remove(object){

  }

  checkCollisions(){

  }

  step(delta){
    this.moveObjects(delta);
    this.checkCollisions();
  }

  // game logic; levelCompleted = false
  // levelCompleted when enemies array length is 0
  // generate New Level(params)
}

Game.DIM_X = 800;
Game.DIM_Y = 500;

module.exports = Game;

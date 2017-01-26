const Unit = require("./unit");
const Player = require("./player");
const Enemy = require("./enemy");

class Game {
  constructor() {
    this.level = 1;
    this.score = 0;
    this.enemies = new Enemy();
    this.activeEnemies = [];
    this.player = new Player();
    this.levelCompleted = false;
  }

  populateEnemies(level) {
    // add number of enemies proportional to current level (maybe 1.1x + 4)
    // enemy constructor will have randomized type
  }

  spawnEnemies(){
    // iterate through array at changeable interval
    // set the enemy to active; begin moving it OR push it into an activeEnemies array
  }

  moveObjects(delta){
    // only if active!
    this.enemies.move(delta);
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.player.draw(ctx);
    this.enemies.draw(ctx);
  }

  remove(enemy){
    this.enemies.shift();
  }

  checkCollisions(){
    // only need to check if player collides with first enemy in array
  }

  step(delta){
    this.moveObjects();
    this.checkCollisions();
  }

  // game logic; levelCompleted = false
  // levelCompleted when enemies array length is 0
  // generate New Level(params)
}

Game.DIM_X = 800;
Game.DIM_Y = 500;

module.exports = Game;

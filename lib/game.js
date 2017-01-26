const Unit = require("./unit");
const Player = require("./player");
const Enemy = require("./enemy");

class Game {
  constructor() {
    this.level = 1;
    this.score = 0;
    this.enemies = [];
    this.activeEnemies = [];
    this.player = new Player();
    this.levelCompleted = false;
  }

  populateEnemies(level) {
    let numEnemies = Math.floor(3 + level*1.1);
    this.enemies = new Array();
    for (var i = 0; i < numEnemies; i++) {
      let newEnem = new Enemy();
      this.enemies.push(newEnem);
    }
  }

  spawnEnemies(){
    // iterate through array at changeable interval
    // set the enemy to active; begin moving it OR push it into an activeEnemies array
    // reset the level once active enemies are empty again
    // setTimeout(function(){}, 1000);
  }

  // consider playing with setTimeout interval; add variability as level increases;

  moveObjects(delta){
    // only if active!
    // this.enemies.move(delta);
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.player.draw(ctx);
    // this.enemies.draw(ctx);
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

  pause(){

  }

  gameOver(){
    if (this.player.health === 0){
      return;
      // render gameover screen; document.getElementById('game-over');
    }
  }

  levelReset(){
    if (this.levelCompleted){
      this.level ++;
      this.populateEnemies(this.level);
    }
  }

  // game logic; levelCompleted = false
  // levelCompleted when enemies array length is 0
  // generate New Level(params)
}

Game.DIM_X = 800;
Game.DIM_Y = 500;

module.exports = Game;

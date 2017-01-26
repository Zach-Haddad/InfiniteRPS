const Unit = require("./unit");
const Player = require("./player");
const Enemy = require("./enemy");

class Game {
  constructor() {
    this.level = 1;
    this.score = 0;
    this.enemies = [new Enemy(), new Enemy(), new Enemy()];
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

  activateEnemy(){
    if (this.enemies.length){
      let nextEnemy = this.enemies.shift();
      this.activeEnemies.push(nextEnemy);
    }
  }

  spawnEnemies(){
    debugger
    setInterval(() => {
      if (this.enemies[0]){
        this.activateEnemy();
      }
    }, 3000);
    // iterate through array at changeable interval
    // set the enemy to active; begin moving it OR push it into an activeEnemies array
    // reset the level once active enemies are empty again
    // setTimeout(function(){}, 1000);
  }

  // consider playing with setTimeout interval; add variability as level increases;

  moveObjects(delta){
    this.activeEnemies.forEach((enemy) => {
      enemy.move(delta);
    });
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.player.draw(ctx);

    this.activeEnemies.forEach((enemy) => {
      enemy.draw(ctx);
    });
  }

  removeEnemy(){
    this.activeEnemies.shift();
  }

  checkCollisions(){
    if (this.activeEnemies.length){
      if (this.player.x > (this.activeEnemies[0].x - 45)){
        this.removeEnemy();
      }
    }
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

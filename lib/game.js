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
    setInterval(() => {
      if (this.enemies[0]){
        this.activateEnemy();
      }
    }, 1000);
  }
  // consider playing with interval; add variability as level increases;

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
      let nextEnemy = this.activeEnemies[0];
      if (this.player.x > (nextEnemy.x - 75)){
        this.handleScore(nextEnemy);
        this.handleHealth(nextEnemy);
        this.removeEnemy();
      }
    }
  }

  handleScore(enemy){
    if (this.rpsLogic(this.player.type, enemy.type) === "win"){
      this.score += 50;
    }
    console.log(this.score);
  }

  handleHealth(enemy){
    switch (this.rpsLogic(this.player.type, enemy.type)) {
      case "draw":
        this.player.health -= 0.5;
        break;
      case "loss":
        this.player.health -= 1;
        break;
      default:
        return;
    }
    console.log(this.player.health);
  }

  rpsLogic(playerType, enemyType){
    const types = Unit.TYPES;
    const playerIdx = types.indexOf(playerType);
    const enemyIdx = types.indexOf(enemyType);

    if (playerIdx === enemyIdx) {
      return "draw";
    }

    if (playerIdx === 2 && enemyIdx === 0){
      return "loss";
    }

    if (enemyIdx === 2 && playerIdx === 0){
      return "win";
    }

    if (playerIdx > enemyIdx){
      return "win";
    } else {
      return "loss";
    }
  }
  // handle score
  // handle health

  step(delta){
    this.moveObjects();
    this.checkCollisions();
  }

  pause(){

  }

  gameOver(){
    if (this.player.health <= 0){
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

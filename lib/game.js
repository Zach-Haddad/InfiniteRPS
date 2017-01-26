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
    let numEnemies = 3;
    this.enemies = new Array();
    for (var i = 0; i < numEnemies; i++) {
      let newEnem = new Enemy();
      this.enemies.push(newEnem);
    }
    this.spawnEnemies();
  }

  activateEnemy(){
      let nextEnemy = this.enemies.shift();
      this.activeEnemies.push(nextEnemy);
  }

  spawnEnemies(){
    let numEnemies = this.enemies.length;
    const i = setInterval(() => {
      this.activateEnemy();

      numEnemies -= 1;
      if(numEnemies === 0) {
        clearInterval(i);
    }

    }, 1000);
  }

  // setInterval(() => {
    // if (this.enemies[0]){
    //   this.activateEnemy();
    // }
  // }, 2000);
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

    if(!this.activeEnemies.length && !this.enemies.length){
      this.levelCompleted = true;
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
    console.log(this.enemies);
    console.log(this.activeEnemies);
    console.log(this.level);
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

  step(delta){
    this.moveObjects();
    this.checkCollisions();
    this.levelReset();
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
      this.levelCompleted = false;
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

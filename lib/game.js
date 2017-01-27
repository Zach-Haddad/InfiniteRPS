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
    this.collisions = 0;
  }

  populateEnemies(level) {
    let numEnemies = Math.floor(3 + level*1.1);
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

  enemySpawnInterval(level) {
    const max = 1500;
    const min = (950 - ((level + 100)/level));
    return Math.random() * (max - min) + min;
  }
  // may want to fine tune this in the future
  // now just sets interval in general for a level, need to be able to
  // set individual intervals within level eventually

  spawnEnemies(){
    let numEnemies = this.enemies.length;
    const i = setInterval(() => {
      this.activateEnemy();

      numEnemies -= 1;
      if(numEnemies === 0) {
        clearInterval(i);
      }

    }, this.enemySpawnInterval(this.level));
  }

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

    this.drawHealth(ctx);
    this.drawStats(ctx);
  }


// think of a better way!
  drawHealth(ctx){
    const heart = new Image();
    heart.src = './assets/images/heart.png';
    const halfheart = new Image();
    halfheart.src = './assets/images/half_heart.png';
    const noheart = new Image();
    noheart.src = './assets/images/empty_heart.png';

    let numHearts = Math.floor(this.player.health/1);
    let numHalves = (this.player.health % 1) / 0.5;
    let numEmpties = 3 - numHearts - numHalves;

    let first, second, third;

    if (numHearts === 3){
      first = heart;
      second = heart;
      third = heart;
    } else if (numHearts === 2) {
      first = heart;
      second = heart;
        if (numHalves === 1) {
          third = halfheart;
        } else {
          third = noheart;
        }
    } else if (numHearts === 1) {
      first = heart;
        if (numHalves === 1) {
          second = halfheart;
          third = noheart;
        } else {
          second = noheart;
          third = noheart;
        }
      } else {
          if (numHalves === 1) {
            first = halfheart;
            second = noheart;
            third = noheart;
          } else {
            first = noheart;
            second = noheart;
            third = noheart;
          }
      }

    ctx.drawImage(first, 30, 50);
    ctx.drawImage(second, 65, 50);
    ctx.drawImage(third, 100, 50);
  }

  drawStats(ctx){
    ctx.font = `30px Walter Turncoat`;
    ctx.fillText(`Score: ${this.score}`, 325, 50);
    ctx.fillText(`Level: ${this.level}`, 645, 50);
    ctx.font = `20px Walter Turncoat`;
    ctx.fillText(`${Math.floor(3 + this.level*1.1) - this.collisions} enemies remaining`, 585, 75);
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
        this.collisions += 1;
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
      // render Level screen;
      this.level ++;
      this.populateEnemies(this.level);
      this.collisions = 0;
    }
  }
}

Game.DIM_X = 800;
Game.DIM_Y = 500;

module.exports = Game;

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
    this.combo = 0;
    this.paused = false;
    this.gameOver = false;

    this.background = new Image ();
    this.background.src = './assets/images/scrollingBackground.png';
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
      if (!this.paused) {
        this.activateEnemy();

        numEnemies -= 1;
        if(numEnemies === 0) {
          clearInterval(i);
        }
      }

    }, this.enemySpawnInterval(this.level));
  }

  moveObjects(delta){
    this.activeEnemies.forEach((enemy) => {
      enemy.move(delta);
    });
    this.backgroundx -= 1;
    if (this.backgroundx === 0){
      this.backgroundx = Game.DIM_X;
    }
  }

  draw(ctx){
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    this.drawBackground(ctx);
    this.player.draw(ctx);

    this.activeEnemies.forEach((enemy) => {
      enemy.draw(ctx);
    });

    this.drawHealth(ctx);
    this.drawStats(ctx);
    if (this.combo > 1){
      this.drawCombo(ctx);}

    if (this.gameOver) {
      ctx.font = `30px Walter Turncoat`;
      ctx.fillText(`Game Over`, 325, 170);
      ctx.fillText(`Press R to Restart`, 270, 210);
    }

  }

  drawBackground(ctx){
    ctx.drawImage(this.background, 0, 0);
    // implement scrolling background here;
  }

  drawCombo(ctx){
    ctx.font = `25px Walter Turncoat`;
    ctx.fillText(`Combo: ${this.combo}`, 50, 250);
    let adjective = "";
    let color;
    if (this.combo >= 15) {
      color = "blue";
      adjective = "Amazing!";
    } else if (this.combo >= 10) {
      color = "yellow";
      adjective = "Awesome!";
    } else if (this.combo >= 5) {
      color = "red";
      adjective = "Great!";
    }
    ctx.fillStyle = color;
    ctx.fillText(`${adjective}`, 55, 200);
    ctx.fillStyle = "black";
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

    ctx.drawImage(first, 30, 50, 45, 45);
    ctx.drawImage(second, 75, 50, 45, 45);
    ctx.drawImage(third, 120, 50, 45, 45);
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
    let modifier = 1;
    if (this.combo > 0) modifier = this.combo;
    if (this.rpsLogic(this.player.type, enemy.type) === "win"){
      this.score += (50 * modifier);
    }
  }

  handleHealth(enemy){
    switch (this.rpsLogic(this.player.type, enemy.type)) {
      case "draw":
        this.player.health -= 0.5;
        this.combo = 0;
        break;
      case "loss":
        this.player.health -= 1;
        this.combo = 0;
        break;
      case "win":
        this.combo ++;
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
    this.checkGameOver();
  }

  checkGameOver(){
    if (this.player.health <= 0){
      this.gameOver = true;
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

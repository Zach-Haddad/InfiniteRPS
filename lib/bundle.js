/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const GameView = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function(){
	  const canvasEl = document.getElementById("mainCanvas");
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  const ctx = canvasEl.getContext("2d");
	  const game = new Game();
	
	  new GameView(game, ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Unit = __webpack_require__(2);
	const Player = __webpack_require__(3);
	const Enemy = __webpack_require__(4);
	
	class Game {
	  constructor() {
	    this.level = 1;
	    this.score = 0;
	    this.enemies = [];
	    this.activeEnemies = [];
	    this.player = new Player();
	    this.levelCompleted = false;
	    this.collisions = 0;
	
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
	  }
	
	  drawBackground(ctx){
	    ctx.drawImage(this.background, 0, 0);
	    // implement scrolling background here;
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
	
	    ctx.drawImage(first, 30, 50, 35, 35);
	    ctx.drawImage(second, 65, 50, 35, 35);
	    ctx.drawImage(third, 100, 50, 35, 35);
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Unit {
	  constructor() {
	    this.x = 600;
	    this.y = 200;
	    this.type = this.type = Unit.TYPES[Math.floor(Math.random() * 3)];
	    this.img = new Image();
	    this.img.src = `./assets/images/${this.type}.png`;
	  }
	
	  draw(ctx) {
	      ctx.drawImage(this.img, this.x, 280);
	  }
	
	  move(){
	    this.x -= 3;
	  }
	  // manipulate speed here ^^^
	
	}
	
	Unit.TYPES = [
	    "rock",
	    "paper",
	    "scissors"
	];
	
	module.exports = Unit;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Unit = __webpack_require__(2);
	
	class Player extends Unit {
	  constructor() {
	    super();
	    this.x = 100;
	    this.health = 3;
	  }
	
	  setType(type) {
	    this.type = type;
	    this.img = new Image();
	    this.img.src = `./assets/images/${type}.png`;
	  }
	
	}
	
	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Unit = __webpack_require__(2);
	
	class Enemy extends Unit {
	  constructor() {
	    super();
	  }
	
	  // handle anti-enemy logic here in the future
	  // shape shifting enemies
	
	}
	
	module.exports = Enemy;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class GameView {
	  constructor(game, ctx) {
	    this.ctx = ctx;
	    this.game = game;
	    this.player = this.game.player;
	  }
	
	  bindKeys() {
	    const player = this.player;
	    const ctx = this.ctx;
	
	    addEventListener("keydown", function(e) {
	      switch (e.keyCode) {
	        case 90:
	        case 37:
	          player.setType('rock');
	          break;
	        case 88:
	        case 40:
	          player.setType('paper');
	          break;
	        case 67:
	        case 39:
	          player.setType('scissors');
	          break;
	        default:
	          break;
	      }
	    }, false);
	  }
	
	  // consider modifying switch statement above to only allow moves if game NOT over
	  // save draw for game.draw!
	
	  animate(time){
	    const timeDelta = time - this.lastTime;
	    this.game.step(timeDelta);
	    this.game.draw(this.ctx);
	    this.lastTime = time;
	
	    requestAnimationFrame(this.animate.bind(this));
	  }
	
	
	  start(){
	    this.bindKeys();
	    this.lastTime = 0;
	    this.game.populateEnemies(this.game.level);
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
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
	
	  const rock = new Image();
	  rock.src = "assets/images/rock.png";
	
	  rock.addEventListener("load", function() {
	  }, false);
	
	  // need preloader
	
	
	  // const view = new GameView(game, ctx);
	  // window.view = view;
	  // window.view.bindKeys();
	
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
	    this.active = false;
	  }
	
	  draw(ctx) {
	    if (this.active){
	      ctx.drawImage(this.img, this.x, 280);
	    }
	  }
	
	  isCollidedWith(otherObject){
	    // fixed icon width; therefore range is this.x + (150/2)
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
	    this.active = true;
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
	          // rock
	          player.setType('rock');
	          break;
	        case 88:
	        case 40:
	          // PAPER
	          player.setType('paper');
	          break;
	        case 67:
	        case 39:
	          // SCISSORS
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
	    requestAnimationFrame(this.animate.bind(this));
	  }
	}
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
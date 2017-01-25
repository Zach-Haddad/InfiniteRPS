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
	  // new GameView(game, ctx).start();
	  const rock = new Image();
	  rock.src = "assets/images/rock.png";
	
	  rock.addEventListener("load", function() {
	      ctx.drawImage(rock, 750, 280);
	  }, false);
	  // need preloader
	  const view = new GameView(game, ctx);
	  window.view = view;
	  window.view.bindKeys();
	
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
	    this.player = new Player();
	    this.levelCompleted = false;
	  }
	
	  populateEnemies(level) {
	    // add number of enemies proportional to current level (maybe 1.1x + 4)
	    // enemy constructor will have randomized type
	  }
	
	  moveObjects(delta){
	
	  }
	
	  drawObjects(){
	
	  }
	
	  removeObject(){
	
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Unit {
	  constructor() {
	    this.x = 600;
	    this.y = 200;
	    this.type = '';
	  }
	
	  draw(ctx) {
	    ctx.drawImage(`./assers/images/${this.type}`, this.x, 280);
	  }
	  // fixed y-position!
	
	  // need preloader
	
	  // rock.addEventListener("load", function() {
	  //     ctx.drawImage(rock, 300, 280);
	  // }, false);
	
	  remove() {
	    this.game.remove(this);
	  }
	
	  isCollidedWith(otherObject){
	    // fixed icon width; therefore range is this.x + (150/2)
	  }
	
	}
	
	Unit.TYPES = [
	    "rock",
	    "paper",
	    "scissors"
	];
	// necessary ^^ ????
	
	module.exports = Unit;
	
	// Store RPS image sources here
	// Collisions


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Unit = __webpack_require__(2);
	
	class Player extends Unit {
	  constructor() {
	    super();
	    this.type = "rock";
	    this.img_src = `./assets/images/${this.type}.png`;
	    this.health = 3;
	  }
	
	  setType(type) {
	    this.type = type;
	    this.img_src = `./assets/images/${type}.png`;
	  }
	
	  collidedWith(otherObject){
	    // always remove enemy from level
	    // if correct, nothing
	    // if opposite, lose 1 hp
	    // if draw, lose 0.5 hp
	  }
	
	  // keybinding
	  // leftarrow/z 37/90 (ROCK)
	  // downarrow/x 40/88 (PAPER)
	  // rightarrow/c 39/67 (SCISSORS)
	
	
	}
	
	module.exports = Player;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Unit = __webpack_require__(2);
	
	class Enemy extends Unit {
	  constructor() {
	    this.type = Unit.TYPES[Math.floor(Math.random() * 3)];
	  }
	
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
	    let keyPressed = this.keyPressed;
	
	    addEventListener("keydown", function(e) {
	      switch (e.keyCode) {
	        case 90:
	        case 37:
	        // rock
	          console.log('rock');
	          break;
	        case 88:
	        case 40:
	        // PAPER
	        console.log('paper');
	        break;
	        case 67:
	        case 39:
	        // SCISSORS
	        console.log('scissors');
	        break;
	        default:
	        console.log('something else');
	      }
	    }, false);
	  }
	
	  // consider modifying switch statement above to only allow moves if game NOT over
	
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
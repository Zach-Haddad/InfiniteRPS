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

	"use strict";
	
	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(5);
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvasEl = document.getElementById("mainCanvas");
	  canvasEl.width = Game.DIM_X;
	  canvasEl.height = Game.DIM_Y;
	
	  var ctx = canvasEl.getContext("2d");
	  var game = void 0,
	      gameView = void 0;
	
	  var newGame = function newGame() {
	    game = new Game();
	    gameView = new GameView(game, ctx);
	    gameView.start();
	  };
	
	  // clean up these listeners! refactor pause and restart varieties into sep methods
	
	  document.getElementById('start').addEventListener('click', function () {
	    document.getElementById('start-screen').className = "hidden";
	    document.getElementById('companion').className = "companion-overlay";
	    newGame();
	  });
	
	  document.getElementById('how-to').addEventListener('click', function () {
	    document.getElementById('start-screen').className = "hidden";
	    document.getElementById('instruction-screen').className = "overlay";
	  });
	
	  document.getElementById('how-to-start').addEventListener('click', function () {
	    document.getElementById('instruction-screen').className = "hidden";
	    newGame();
	  });
	
	  document.getElementById('how-to-back').addEventListener('click', function () {
	    document.getElementById('instruction-screen').className = "hidden";
	    document.getElementById('start-screen').className = "overlay";
	  });
	
	  // H to home
	  document.addEventListener("keydown", function (e) {
	    if (e.keyCode === 72) {
	      game.gameOver = true;
	      document.getElementById('start-screen').className = "overlay";
	      document.getElementById('pause-screen').className = "hidden";
	      document.getElementById('companion').className = "hidden";
	    }
	  });
	
	  // R to restart
	  document.addEventListener("keydown", function (e) {
	    if (e.keyCode === 82) {
	      game.gameOver = true;
	      newGame();
	    }
	  });
	
	  // P to pause
	  document.addEventListener("keydown", function (e) {
	    if (e.keyCode === 80 && game && game.gameOver === false) {
	      switch (game.paused) {
	        case true:
	          game.paused = false;
	          document.getElementById('pause-screen').className = "hidden";
	          gameView.animate(0);
	          break;
	        case false:
	          game.paused = true;
	          document.getElementById('pause-screen').className = "pause-overlay";
	          break;
	        default:
	          return;
	      }
	    }
	  });
	
	  document.getElementById('companion-pause').addEventListener('click', function () {
	    switch (game.paused) {
	      case true:
	        game.paused = false;
	        document.getElementById('pause-screen').className = "hidden";
	        gameView.animate(0);
	        break;
	      case false:
	        game.paused = true;
	        document.getElementById('pause-screen').className = "pause-overlay";
	        break;
	      default:
	        return;
	    }
	  });
	
	  document.getElementById('companion-restart').addEventListener('click', function () {
	    game.gameOver = true;
	    newGame();
	  });
	
	  document.getElementById('companion-home').addEventListener('click', function () {
	    game.gameOver = true;
	    document.getElementById('start-screen').className = "overlay";
	    document.getElementById('pause-screen').className = "hidden";
	    document.getElementById('companion').className = "hidden";
	  });
	
	  document.getElementById('pause-continue').addEventListener('click', function () {
	    game.paused = false;
	    document.getElementById('pause-screen').className = "hidden";
	    document.getElementById('companion').className = "companion-overlay";
	    gameView.animate(0);
	  });
	
	  document.getElementById('pause-restart').addEventListener('click', function () {
	    game.gameOver = true;
	    document.getElementById('pause-screen').className = "hidden";
	    newGame();
	  });
	
	  document.getElementById('pause-home').addEventListener('click', function () {
	    game.gameOver = true;
	    document.getElementById('pause-screen').className = "hidden";
	    document.getElementById('companion').className = "hidden";
	    document.getElementById('start-screen').className = "overlay";
	  });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Unit = __webpack_require__(2);
	var Player = __webpack_require__(3);
	var Enemy = __webpack_require__(4);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
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
	
	    this.background = new Image();
	    this.background.src = './assets/images/scrollingBackground.png';
	  }
	
	  _createClass(Game, [{
	    key: "populateEnemies",
	    value: function populateEnemies(level) {
	      var numEnemies = Math.floor(3 + level * 1.1);
	      this.enemies = new Array();
	      for (var i = 0; i < numEnemies; i++) {
	        var newEnem = new Enemy();
	        this.enemies.push(newEnem);
	      }
	      this.spawnEnemies();
	    }
	  }, {
	    key: "activateEnemy",
	    value: function activateEnemy() {
	      var nextEnemy = this.enemies.shift();
	      this.activeEnemies.push(nextEnemy);
	    }
	  }, {
	    key: "enemySpawnInterval",
	    value: function enemySpawnInterval(level) {
	      var max = 1500;
	      var min = 950 - (level + 100) / level;
	      return Math.random() * (max - min) + min;
	    }
	    // may want to fine tune this in the future
	    // now just sets interval in general for a level, need to be able to
	    // set individual intervals within level eventually
	
	  }, {
	    key: "spawnEnemies",
	    value: function spawnEnemies() {
	      var _this = this;
	
	      var numEnemies = this.enemies.length;
	      var i = setInterval(function () {
	        if (!_this.paused) {
	          _this.activateEnemy();
	
	          numEnemies -= 1;
	          if (numEnemies === 0) {
	            clearInterval(i);
	          }
	        }
	      }, this.enemySpawnInterval(this.level));
	    }
	  }, {
	    key: "moveObjects",
	    value: function moveObjects(delta) {
	      this.activeEnemies.forEach(function (enemy) {
	        enemy.move(delta);
	      });
	      this.backgroundx -= 1;
	      if (this.backgroundx === 0) {
	        this.backgroundx = Game.DIM_X;
	      }
	    }
	  }, {
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	      this.drawBackground(ctx);
	      this.player.draw(ctx);
	
	      this.activeEnemies.forEach(function (enemy) {
	        enemy.draw(ctx);
	      });
	
	      this.drawHealth(ctx);
	      this.drawStats(ctx);
	      if (this.combo > 1) {
	        this.drawCombo(ctx);
	      }
	
	      if (this.gameOver) {
	        ctx.font = "30px Walter Turncoat";
	        ctx.fillText("Game Over", 325, 170);
	        ctx.fillText("Press R to Restart", 270, 210);
	      }
	    }
	  }, {
	    key: "drawBackground",
	    value: function drawBackground(ctx) {
	      ctx.drawImage(this.background, 0, 0);
	      // implement scrolling background here;
	    }
	  }, {
	    key: "drawCombo",
	    value: function drawCombo(ctx) {
	      ctx.font = "25px Walter Turncoat";
	      ctx.fillText("Combo: " + this.combo, 50, 250);
	      var adjective = "";
	      var color = void 0;
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
	      ctx.fillText("" + adjective, 55, 200);
	      ctx.fillStyle = "black";
	    }
	
	    // think of a better way!
	
	  }, {
	    key: "drawHealth",
	    value: function drawHealth(ctx) {
	      var heart = new Image();
	      heart.src = './assets/images/heart.png';
	      var halfheart = new Image();
	      halfheart.src = './assets/images/half_heart.png';
	      var noheart = new Image();
	      noheart.src = './assets/images/empty_heart.png';
	
	      var numHearts = Math.floor(this.player.health / 1);
	      var numHalves = this.player.health % 1 / 0.5;
	      var numEmpties = 3 - numHearts - numHalves;
	
	      var first = void 0,
	          second = void 0,
	          third = void 0;
	
	      if (numHearts === 3) {
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
	  }, {
	    key: "drawStats",
	    value: function drawStats(ctx) {
	      ctx.font = "30px Walter Turncoat";
	      ctx.fillText("Score: " + this.score, 325, 50);
	      ctx.fillText("Level: " + this.level, 645, 50);
	      ctx.font = "20px Walter Turncoat";
	      ctx.fillText(Math.floor(3 + this.level * 1.1) - this.collisions + " enemies remaining", 585, 75);
	    }
	  }, {
	    key: "removeEnemy",
	    value: function removeEnemy() {
	      this.activeEnemies.shift();
	    }
	  }, {
	    key: "checkCollisions",
	    value: function checkCollisions() {
	      if (this.activeEnemies.length) {
	        var nextEnemy = this.activeEnemies[0];
	        if (this.player.x > nextEnemy.x - 75) {
	          this.handleScore(nextEnemy);
	          this.handleHealth(nextEnemy);
	          this.removeEnemy();
	          this.collisions += 1;
	        }
	      }
	
	      if (!this.activeEnemies.length && !this.enemies.length) {
	        this.levelCompleted = true;
	      }
	    }
	  }, {
	    key: "handleScore",
	    value: function handleScore(enemy) {
	      var modifier = 1;
	      if (this.combo > 0) modifier = this.combo;
	      if (this.rpsLogic(this.player.type, enemy.type) === "win") {
	        this.score += 50 * modifier;
	      }
	    }
	  }, {
	    key: "handleHealth",
	    value: function handleHealth(enemy) {
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
	          this.combo++;
	          break;
	        default:
	          return;
	      }
	    }
	  }, {
	    key: "rpsLogic",
	    value: function rpsLogic(playerType, enemyType) {
	      var types = Unit.TYPES;
	      var playerIdx = types.indexOf(playerType);
	      var enemyIdx = types.indexOf(enemyType);
	
	      if (playerIdx === enemyIdx) {
	        return "draw";
	      }
	
	      if (playerIdx === 2 && enemyIdx === 0) {
	        return "loss";
	      }
	
	      if (enemyIdx === 2 && playerIdx === 0) {
	        return "win";
	      }
	
	      if (playerIdx > enemyIdx) {
	        return "win";
	      } else {
	        return "loss";
	      }
	    }
	  }, {
	    key: "step",
	    value: function step(delta) {
	      this.moveObjects();
	      this.checkCollisions();
	      this.levelReset();
	      this.checkGameOver();
	    }
	  }, {
	    key: "checkGameOver",
	    value: function checkGameOver() {
	      if (this.player.health <= 0) {
	        this.gameOver = true;
	      }
	    }
	  }, {
	    key: "levelReset",
	    value: function levelReset() {
	      if (this.levelCompleted) {
	        this.levelCompleted = false;
	        // render Level screen;
	        this.level++;
	        this.populateEnemies(this.level);
	        this.collisions = 0;
	      }
	    }
	  }]);
	
	  return Game;
	}();
	
	Game.DIM_X = 800;
	Game.DIM_Y = 500;
	
	module.exports = Game;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Unit = function () {
	  function Unit() {
	    _classCallCheck(this, Unit);
	
	    this.x = 800;
	    this.y = 200;
	    this.type = this.type = Unit.TYPES[Math.floor(Math.random() * 3)];
	    this.img = new Image();
	    this.img.src = "./assets/images/" + this.type + ".png";
	  }
	
	  _createClass(Unit, [{
	    key: "draw",
	    value: function draw(ctx) {
	      ctx.drawImage(this.img, this.x, 280);
	    }
	  }, {
	    key: "move",
	    value: function move() {
	      this.x -= 3;
	    }
	  }]);
	
	  return Unit;
	}();
	
	Unit.TYPES = ["rock", "paper", "scissors"];
	
	module.exports = Unit;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Unit = __webpack_require__(2);
	
	var Player = function (_Unit) {
	  _inherits(Player, _Unit);
	
	  function Player() {
	    _classCallCheck(this, Player);
	
	    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));
	
	    _this.x = 50;
	    _this.health = 3;
	    _this.img.src = "./assets/images/" + _this.type + "-player.png";
	    return _this;
	  }
	
	  _createClass(Player, [{
	    key: "setType",
	    value: function setType(type) {
	      this.type = type;
	      this.img = new Image();
	      this.img.src = "./assets/images/" + type + "-player.png";
	    }
	  }]);
	
	  return Player;
	}(Unit);
	
	module.exports = Player;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Unit = __webpack_require__(2);
	
	var Enemy = function (_Unit) {
	  _inherits(Enemy, _Unit);
	
	  function Enemy() {
	    _classCallCheck(this, Enemy);
	
	    return _possibleConstructorReturn(this, (Enemy.__proto__ || Object.getPrototypeOf(Enemy)).call(this));
	  }
	
	  // handle anti-enemy logic here in the future
	  // shape shifting enemies
	
	  return Enemy;
	}(Unit);
	
	module.exports = Enemy;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GameView = function () {
	  function GameView(game, ctx) {
	    _classCallCheck(this, GameView);
	
	    this.ctx = ctx;
	    this.game = game;
	    this.player = this.game.player;
	  }
	
	  _createClass(GameView, [{
	    key: 'bindKeys',
	    value: function bindKeys() {
	      var player = this.player;
	      var ctx = this.ctx;
	
	      addEventListener("keydown", function (e) {
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
	          // case 80:
	          //   p - pause the game
	          default:
	            break;
	        }
	      }, false);
	    }
	
	    // consider modifying switch statement above to only allow moves if game NOT over
	    // save draw for game.draw!
	
	  }, {
	    key: 'animate',
	    value: function animate(time) {
	      if (!this.game.gameOver && !this.game.paused) {
	        var timeDelta = time - this.lastTime;
	        this.game.step(timeDelta);
	        this.game.draw(this.ctx);
	        this.lastTime = time;
	
	        requestAnimationFrame(this.animate.bind(this));
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      this.bindKeys();
	      this.lastTime = 0;
	      this.game.populateEnemies(this.game.level);
	      requestAnimationFrame(this.animate.bind(this));
	    }
	  }]);
	
	  return GameView;
	}();
	
	module.exports = GameView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map
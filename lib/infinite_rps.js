const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("mainCanvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  // new GameView(game, ctx).start();
  const rock = new Image();

  rock.addEventListener("load", function() {
      ctx.drawImage(rock, 600, 200);
  }, false);
  // need preloader

  rock.src = "assets/images/rock.png";
});

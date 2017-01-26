const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("mainCanvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();

  new GameView(game, ctx).start();

  // const rock = new Image();
  //
  // rock.src = "assets/images/rock.png";

  // rock.addEventListener("load", function() {
  //     ctx.drawImage(rock, 750, 280, 0, 0);
  // }, false);

  // need preloader


  // const view = new GameView(game, ctx);
  // window.view = view;
  // window.view.bindKeys();

});

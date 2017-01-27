const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("mainCanvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  const game = new Game();
  const gameView = new GameView(game, ctx);

  document.getElementById('start').addEventListener('click', () => {
    game.isPaused = false;
    document.getElementById('start-screen').className = "hidden";
    new GameView(game, ctx).start();
  });

  document.getElementById('how-to').addEventListener('click', () => {
    document.getElementById('start-screen').className = "hidden";
    document.getElementById('instruction-screen').className = "overlay";
  });

  document.getElementById('how-to-start').addEventListener('click', () => {
    game.isPaused = false;
    document.getElementById('instruction-screen').className = "hidden";
    new GameView(game, ctx).start();
  });

});

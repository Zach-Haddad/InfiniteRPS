const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("mainCanvas");
  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  let game, gameView;

  const newGame = () => {
    game = new Game();
    gameView = new GameView(game, ctx).start();
  };

  document.getElementById('start').addEventListener('click', () => {
    document.getElementById('start-screen').className = "hidden";
    newGame();
  });

  document.getElementById('how-to').addEventListener('click', () => {
    document.getElementById('start-screen').className = "hidden";
    document.getElementById('instruction-screen').className = "overlay";
  });

  document.getElementById('how-to-start').addEventListener('click', () => {
    document.getElementById('instruction-screen').className = "hidden";
    newGame();
  });

  document.addEventListener("keydown", function(e){
    if (e.keyCode === 82) {
      game.gameOver = true;
      document.getElementById('start-screen').className = "overlay";
    }
  });

});

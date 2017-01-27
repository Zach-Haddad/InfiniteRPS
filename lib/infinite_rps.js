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
    gameView = new GameView(game, ctx);
    gameView.start();
  };

// clean up these listeners! refactor pause and restart varieties into sep methods

  document.getElementById('start').addEventListener('click', () => {
    document.getElementById('start-screen').className = "hidden";
    document.getElementById('companion').className = "companion-overlay";
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
      document.getElementById('companion').className = "hidden";
    }
  });

  document.addEventListener("keydown", function(e){
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


  document.getElementById('companion-pause').addEventListener('click', () => {
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

  document.getElementById('companion-restart').addEventListener('click', () => {
    game.gameOver = true;
    document.getElementById('start-screen').className = "overlay";
    document.getElementById('companion').className = "hidden";
  });


  document.getElementById('pause-continue').addEventListener('click', () => {
    game.paused = false;
    document.getElementById('pause-screen').className = "hidden";
    document.getElementById('companion').className = "companion-overlay";
    gameView.animate(0);
  });

  document.getElementById('pause-restart').addEventListener('click', () => {
    game.gameOver = true;
    document.getElementById('pause-screen').className = "hidden";
    document.getElementById('companion').className = "hidden";
    document.getElementById('start-screen').className = "overlay";
  });

});

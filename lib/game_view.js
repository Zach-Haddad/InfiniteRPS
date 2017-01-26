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
          player.draw(ctx);
          break;
        case 88:
        case 40:
          // PAPER
          player.setType('paper');
          player.draw(ctx);
          break;
        case 67:
        case 39:
          // SCISSORS
          player.setType('scissors');
          player.draw(ctx);
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

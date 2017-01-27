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
      console.log(e.keyCode);
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
        // case 82:
        //   r - restart the game
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

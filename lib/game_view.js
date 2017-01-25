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

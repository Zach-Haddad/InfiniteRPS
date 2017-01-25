class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.player = this.game.player;
    this.keysDown = {};
  }

  bindKeys() {
    const player = this.player;
    const keysDown = this.keysDown;

    addEventListener("keydown", function(e) {
      keysDown[e.keyCode] = true;
    }, false);

    addEventListener("keyup", function(e) {
      delete keysDown[e.keycode];
    }, false);
  }

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

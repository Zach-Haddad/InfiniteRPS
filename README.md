# Infinite RPS

[Live](https://zach-haddad.github.io/InfiniteRPS/ "Live")

![demo](/assets/demo.gif)

### Background
Paper beats rock, rock beats scissors, scissors beats paper.  A simple sidescrolling RPS game that pits you, a shape shifter, against an infinite amount of rocks, pieces of paper, and pairs of scissors.  Shift into the correct form to defeat your foes!  Levels become progressively more difficult as the number of enemies and the speed at which they approach increases.

### Instructions
Press start to play.  Players may morph into a rock, paper, or scissors with either Z, X, and C or the left, down, and right arrow keys, respectively.  Players may restart the game by pressing R and pause with P.

### Technologies
- Vanilla Javascript for main game logic

- HTML5/canvas for DOM rendering/manipulation

- Webpack to bundle and serve up various scripts

### Implementation

One of the more interesting challenges in creating this game was handling how to spawn waves of enemies that resembled distinct levels as opposed to an endless stream of random opponents.  In order to do this, I utilized two queues that were held by our game instance; enemies and active enemies.  An amount of enemies appropriate to the current level were spawned into the enemies queue.  I then set an interval (which grew potentially smaller as the levels progressed) at which rate enemies were dequeued and queued into the active enemies queue.

```js
  populateEnemies(level) {
    let numEnemies = Math.floor(3 + level*1.1);
    this.enemies = new Array();
    for (var i = 0; i < numEnemies; i++) {
      let newEnem = new Enemy();
      this.enemies.push(newEnem);
    }
    this.spawnEnemies();
  }

  activateEnemy(){
      let nextEnemy = this.enemies.shift();
      this.activeEnemies.push(nextEnemy);
  }
  ```

From the active enemies queue, the enemies that should appear on the screen could be appropriately rendered onto the canvas.  I experienced some issues with enemies overlapping each other, though this was solved after clearing each wave's interval at the conclusion of that wave.

```js
  spawnEnemies(){
    let numEnemies = this.enemies.length;
    const i = setInterval(() => {
      if (!this.paused) {
        this.activateEnemy();

        numEnemies -= 1;
        if(numEnemies === 0) {
          clearInterval(i);
        }
      }

    }, this.enemySpawnInterval(this.level));
  }
 ```


### Future Features
- [ ] Hard mode; two simultaneous games! (one above, one below)
- [ ] Anti-enemies with reverse RPS logic
- [ ] Upgrades and items
- [ ] Better difficulty modulation with incrementing Levels --> increased likelihood of opposite enemy spawning next
- [ ] Sound effects, presentational enhancement, etc


### Credits
Rock, Paper, Scissors Icons: Studio Fibonacci (https://thenounproject.com/StudioFibonacci/)

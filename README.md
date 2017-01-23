# Infinite RPS

### Background
Paper beats rock, rock beats scissors, scissors beats paper.  A simple sidescrolling RPS game that pits you, a shape shifter, against an infinite amount of rocks, pieces of paper, and pairs of scissors.  Shift into the correct form to defeat your foes!  Levels become progressively difficult as the number of enemies and the speed at which they approach increases.

### Functionality & MVP
- [ ] Start, pause, and reset the game
- [ ] Collision detection
- [ ] Randomly generated enemies
- [ ] Score Display

### Wireframes

![wireframes](wireframe.png)

### Architecture and Technologies
- Vanilla JavaScript and `jquery` for overall structure and game logic,
- `Easel.js` with `HTML5 Canvas` for DOM manipulation and rendering,
- Webpack to bundle and serve up the various scripts.

File structure will comprise:
-Unit.js (from which enemy and player inherit)
-Player.js
-Enemy.js
-Game.js
-Level.js

### Implementation Timeline

**Day 1** Set Up node modules, get webpack up and running, familiarize self with necessary canvas/easel essentials.  Set up file skeleton.  Finish as much of game logic as possible.

**Day 2** Finish game logic. 

**Day 3** User Interface - start screen with brief instructions, gameover/retry screen.  Background artwork/sprites.  CSS and page styling.

**Day 4** Finish MVPs if necessary.  Bonus features

### Bonus Features
- Purchase items between rounds; bombs clear out all visible enemies, potion replenishes health, etc
- Small chance of opposite mode:  Rules are reversed for a short time! (Made obvious by background color change, modal pop-up -- alternatively have visually distinct 'anti'-enemies that you need to lose to)
- Combo Meter: 5-kill streak adds x2 score multiplier, 10-kill streak grants single-hit shield, etc
- Sound (with easy to find mute; start without sound option)

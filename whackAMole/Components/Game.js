// TO DO: could have a settings file for global variables. 
let score = 0;
let enemyCount = 0; 
let startingTimer = 20;

class Game {
  constructor() {
    this._setUpApplication();
  }

  /**
   * Set up application and load assets.
   * 
   */
  async _setUpApplication() {
    const app = new PIXI.Application( {} );
    await app.init( { background: '#996633', resizeTo: window } );
    document.body.appendChild( app.canvas );

    const texture = await PIXI.Assets.load( "/Assets/Graphics/mole.png" );
    PIXI.sound.add( "squelch", "/Assets/Sounds/squelch.wav" );
    
    this._spawnEnemies( texture, app );

    this._text = new PIXI.Text( startingTimer,{fontFamily : 'Arial', fontSize: 64, fill : 0x000, align : 'center'} );
    app.stage.addChild( this._text ); 
    this._text.x = 500;

    // Time the game - could switch for PIXI Timer plugin
    this._timerInterval = setInterval( () => {
      startingTimer -= 1;
      this._text.text = startingTimer;

      if ( startingTimer === 0 ) {
        this._end();
      }
    }, 1000 );
  }

  /**
   * Random number to determine whether to spawn enemies. 
   * TO DO: a better solution would be to use a weighted algorithm. 
   */
  _spawnEnemies( texture, app ) {
    const spawningInterval = setInterval( () => {
      const number = Math.random();
      if ( number > 0.5 && enemyCount < 10 ) {
        let enemy = new Enemy( texture, app );
        ++enemyCount; 
      }
    }, 1000 );
  }

  /**
   * Handle click event when missing an enemy.
   */
  _missedClick() {
    // TO DO: if the player clicks but does not hit an enemy, could use PIXI Particles 
    // and create a burst mud effect
  }

  _end() {
    clearInterval( this._timerInterval );
    startingTimer = 20;    
    
    /**
     * TO DO:
     * - remove all enemies 
     * - add a tint to the background 
     * - show the final score 
     * - show restart message 
     * - on click restart game flow
     */
    
  }
}

const newGame = new Game();
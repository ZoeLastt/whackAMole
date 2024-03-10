/**
 * Class for spawning enemies. 
 * 
 */
class Enemy {
    /**
     * Create the sprite and handle interaction. 
     * 
     * @param {string} sprite - Name of the sprite to use. 
     * @param {any} app - The PIXI canvas to add the sprite to.
     */
    constructor( sprite, app ) { 
        this._spawnEnemies( sprite, app );
    }

    /**
     * Add the sprites to the scene and handle interaction. 
     * 
     * @param {number} enemyCount - The number of enemies to spawn.
     * @param {any} app - The PIXI canvas to add the sprite to.
     */
    _spawnEnemies( sprite, app ){
        let enemy = PIXI.Sprite.from( sprite );
        app.stage.addChild( enemy );
        enemy.position = this._generateSpawnPoint();

        // Set anchor so that when we scale down, the sprite stays centre.
        enemy.anchor.set( 0.5, 0.5 );

        enemy.eventMode = 'static';
        enemy.cursor = "pointer";
        enemy.on( 'pointerdown', () => {
            this._spriteClicked( enemy  );
        } );

        // TO DO: set an interval and after set time of not being clicked, despawn the enemy.
    }
    
    /**
     * Generate a random point. 
     * 
     * @returns {Point} The location to set the enemy. 
     */
    _generateSpawnPoint() {
        // TO DO: any 'random' value like the 400 etc could be put into a settings file. 
        const x = Math.floor( Math.random() * ( ( screen.width - 400 )  - 100 ) + 100 );
        const y = Math.floor( Math.random() * ( ( screen.height - 400 ) - 50 ) + 50 );
        return { x, y };        
    }

    /**
     * Handle sprite interaction. 
     * 
     * @param {PIXI.Sprite} enemy - The sprite the player has clicked on.
     */
    async _spriteClicked( enemy ) {
        score += 1;
        --enemyCount;
        enemy.tint = 0xa83232;
        enemy.scale = 0.7;
        PIXI.sound.play( "squelch" );

        // TO DO: could use PIXI Tween to create scaling animations.

        await new Promise( resolve => setTimeout( resolve, 500 ) );
        enemy.scale = 1; 

        await new Promise( resolve => setTimeout( resolve, 500 ) );
        enemy.destroy();
    }
  }
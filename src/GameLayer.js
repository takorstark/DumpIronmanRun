var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.createBg();

        this.player = new DumpBearman();
        this.player.setPosition( new cc.Point( screenWidth / 4, screenHeight / 3 ) );
        this.addChild( this.player, 1 )
        this.player.scheduleUpdate();

        this.ground = new GameGround();
        // this.ground.setPosition( new cc.Point( screenWidth / 2,  screenHeight / 12 ) );
        this.addChild( this.ground );
        this.ground.scheduleUpdate();


        this.setKeyboardEnabled( true );

        this.state = GameLayer.STATES.FRONT;

        this.scheduleUpdate();

        return true;
    },

    onKeyDown: function( e ){
        this.player.start();
        if( this.state == GameLayer.STATES.FRONT ) {
            this.startGame();
            this.state = GameLayer.STATES.STARTED;
        } else if( this.state == GameLayer.STATES.STARTED ) {
            if( e == cc.KEY.space && !this.pressed ){
                this.pressed = true;
                 this.player.jump();
                 this.j++;
            }
            else if( e == cc.KEY.  )
               
        } 
    },

    onKeyUp : function ( e ) {
        if( this.state == GameLayer.STATES.STARTED ) {
            if( e == cc.KEY.space&& this.pressed){
                this.pressed = false;
            }    
               
        } 
    },

    createBullet: function() {
        this.shoot = [ new shootBullet(), new shootBullet(), new shootBullet() ];
        for(var i = 0; i < 2; i++ ){
            this.shoot[i].randomPositionY();
            
            this.addChild( this.shoot[i], 1 );
            this.shoot[i].setPositionX( -1 * i * Math.floor( ( screenWidth / 3 ) ) );
            this.shoot[i].scheduleUpdate();
        }
    },

    createRock: function() {
        this.rock = new Rock();
        this.rock.setPosition( new cc.Point( 900, 275 ) );
        this.addChild( this.rock );
        this.rock.scheduleUpdate();
    },

    createBg: function() {
        this.bg = cc.Sprite.create( ' images/bg2.png ' );
        this.bg.setPosition( new cc.Point( 400, 350 ) );
        this.addChild( this.bg );
    },

    startGame: function() {
        // this.createRock();
        this.createBullet();
        this.player.start();
        this.player.jump();
    },


});

GameLayer.STATES = {
    FRONT: 1,
    STARTED: 2
}

var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});




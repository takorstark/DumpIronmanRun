var GameLayer = cc.LayerColor.extend({
    init: function() {

        this._super( new cc.Color4B( 127, 127, 127, 255 ) );
        this.setPosition( new cc.Point( 0, 0 ) );

        this.createBg();

        this.player = new DumpBearman();
        this.player.setPosition( new cc.Point( screenWidth / 5, screenHeight / 3 ) );
        this.addChild( this.player, 1 )
        this.player.scheduleUpdate();

        this.ground = new GameGround();
        this.addChild( this.ground );
        this.ground.scheduleUpdate();

        this.score = 0;

        this.scorelabel = cc.LabelTTF.create( this.score, 'Arial', 50 );
        this.scorelabel.setPosition( new cc.Point( 750, 550 ) );
        this.addChild( this.scorelabel );

        this.setKeyboardEnabled( true );

        this.state = GameLayer.STATES.FRONT;

        this.bulletList = [];
        this.effectList = [];

        this.heart = [];

        this.randomTime( Math.round( Math.random() * 7 ) + 2 );

        this.createHeart();

        this.scheduleUpdate();

        // this.schedule(function(){ console.log(this.bulletList.length) }, 1);

        this.schedule(function(){ console.log(this.effectList.length) }, 1);

        return true;
    },

    update: function( dt ) {
        this.checkSlashBulletCollide();
        this.checkPlayerBulletCollide();
        this.updateScoreLabel();
    },

    updateScoreLabel: function(){
        this.scorelabel.setString( this.score );
    },

    onKeyDown: function( e ){
        this.player.start();

        if( this.state == GameLayer.STATES.FRONT ) {
            this.startGame();
            if( e == 32 )
                this.state = GameLayer.STATES.STARTED;
        } else if( this.state == GameLayer.STATES.STARTED ) {
            if( e == 32 && !this.pressed_space ){
                this.pressed_space = true;
                this.player.jump();
                this.j++;
            }
            else if( e == 83 && !this.pressed_s ){
                this.pressed_s = true;
                this.player.slashing();
                this.createSlashEffect();
            }
               
        } 


    },

    onKeyUp: function ( e ) {
        if( this.state == GameLayer.STATES.STARTED ) {
            if( e == 32 && this.pressed_space ){
                this.pressed_space = false;
            }
            else if( e == 83 && this.pressed_s ){
                this.pressed_s = false;
            }    
               
        } 
    },

    checkSlashBulletCollide: function() {
        for( var i = 0; i < this.bulletList.length; i++ ){
            for( var j = 0; j < this.effectList.length; j++ ){
                var bullet = this.bulletList[i];
                var effect = this.effectList[j];
                var bear = this.player;

                if( this.checkBulletDestroy( effect.getPositionX(), effect.getPositionY(), 
                    bullet.getPositionX(), bullet.getPositionY() ) ){

                    console.log( 'hello' );
                
                    this.deleteEffect( effect );
                    this.deleteBullet( bullet );
                    this.score++;

                    break;
                }

            }
        }  
    },

    checkPlayerBulletCollide: function() {
        for( var i = 0; i < this.bulletList.length; i++ ){
            var bullet = this.bulletList[i];
            var bear = this.player;

            if( this.checkAttacked( bear.getPositionX(), bear.getPositionY(), 
                    bullet.getPositionX(), bullet.getPositionY() ) ){
                    this.removeChild(bullet);
                    this.bulletList.splice(i,1);
                    i--;
                    console.log( 'CRASH!' );

                    break;

            }

        }
    },

    checkBulletDestroy: function( effectX, effectY, bulletX, bulletY ) {
        return Math.abs( effectX - bulletX ) <= 50 && Math.abs( effectY - bulletY ) < 30;
    },

    checkAttacked: function( bearX, bearY, bulletX, bulletY ) {
        return (Math.abs( bearX - bulletX ) <= 50) && (Math.abs( bearY - bulletY ) < 50);
    },

    createHeart: function() {
        for( var i = 0; i < 5; i++ ){
            var temp_heart = new Heart();

            this.heart.push( temp_heart );
            temp_heart.setPosition( new cc.Point( 50 + (i * 60), 560 ) );
            this.addChild( temp_heart );
        }
    },

    createSlashEffect: function() {
        var posX = this.player.getPositionX();
        var posY = this.player.getPositionY();

        this.effect = new SlashEffect( this );
        this.effect.setPosition( new cc.Point( posX + 60, posY - 40) );

        this.effectList.push( this.effect );
        this.addChild( this.effect );
    },

    createBullet: function() {
        this.bullet = [ new shootBullet(), new shootBullet(), new shootBullet() ];
        for(var i = 0; i < 2; i++ ){
            this.bullet[i].randomPositionY();
            
            this.bulletList.push( this.bullet[i] );
            this.addChild( this.bullet[i], 1 );
            this.bullet[i].setPositionX( -1 * i * Math.floor( ( screenWidth / 3 ) ) );
            this.bullet[i].scheduleUpdate();
        }
    },

    createBg: function() {
        this.bg = cc.Sprite.create( ' images/bg2.png ' );
        this.bg.setPosition( new cc.Point( 400, 350 ) );
        this.addChild( this.bg );
    },

    deleteEffect: function( effect ) {
        var i = this.effectList.indexOf( effect );
        if( i >= 0 ) this.effectList.splice( i, 1 );
        this.removeChild( effect ); 
    },

    deleteBullet: function( bullet ) {
        var i = this.bulletList.indexOf( bullet );
        if( i >= 0 ) this.bulletList.splice( i, 1 );
        this.removeChild( bullet );
    },

    randomTime: function( t ) {
        this.scheduleOnce( function( ){ 
            this.createBullet();
            this.randomTime( Math.round( Math.random() * 7 ) + 2 );
        } , t);
    },

    startGame: function() {
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




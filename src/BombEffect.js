var BombEffect = cc.Sprite.extend({
	ctor: function() {
		this._super();

		this.bomb = cc.Sprite.create( 'images/bomb1.png' );
        this.bomb.setPosition( new cc.Point( 0, 0 ) );
        this.addChild( this.bomb );
        this.scheduleUpdate();

        this.bomb.movingAction = this.createBombAnimation();
        this.bomb.runAction( this.bomb.movingAction );
        // this.scheduleOnce( function() {
        //     this.removeChild( this.bomb );
        //     console.log("remove");
        // }, 1);
	},

	createBombAnimation: function() {
        var animation = new cc.Animation.create();
            animation.addSpriteFrameWithFile( 'images/bomb1.png' );
            animation.addSpriteFrameWithFile( 'images/bomb2.png' );
            animation.addSpriteFrameWithFile( 'images/bomb3.png' );
            animation.addSpriteFrameWithFile( 'images/bomb4.png' );
            animation.addSpriteFrameWithFile( 'images/bomb5.png' );
            animation.addSpriteFrameWithFile( 'images/bomb6.png' );
            animation.addSpriteFrameWithFile( 'images/bomb7.png' );
            animation.addSpriteFrameWithFile( 'images/bomb8.png' );
            animation.addSpriteFrameWithFile( 'images/bomb9.png' );
            animation.addSpriteFrameWithFile( 'images/bomb10.png' );
            animation.addSpriteFrameWithFile( 'images/bomb11.png' );
            animation.addSpriteFrameWithFile( 'images/bomb12.png' );
            animation.addSpriteFrameWithFile( 'images/bomb13.png' );
            animation.setDelayPerUnit( 0.1 );
            return cc.Animate.create( animation );
    },

})
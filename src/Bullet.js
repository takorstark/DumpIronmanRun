var shootBullet = cc.Sprite.extend({
	ctor: function() {
		this._super();

		this.bullet = cc.Sprite.create( ' images/bullet1.png ' );
        this.addChild( this.bullet, 1 )
        this.bullet.scheduleUpdate();

		this.bullet.movingAction = this.createAnimation();
		this.bullet.runAction( this.bullet.movingAction );

		this.bulletWay = [ 180, 330, 480 ]
		// this.speed = 0;
	},

	update: function() {
		this.moveBullet();
	},

	createAnimation: function() {
		var animation = new cc.Animation.create();
			animation.addSpriteFrameWithFile( 'images/bullet1.png' );
			animation.addSpriteFrameWithFile( 'images/bullet2.png' );
			animation.addSpriteFrameWithFile( 'images/bullet3.png' );
			animation.addSpriteFrameWithFile( 'images/bullet4.png' );
			animation.setDelayPerUnit( 0.3 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	moveBullet: function() {
		var pos = this.getPositionX();

		this.setPositionX( this.getPositionX() - 5 );

		if( pos < 0 ){
			this.randomPositionY();
		}
	},

	randomPositionY: function(){
		var index = Math.floor( Math.random() * 3 );
		this.setPosition( cc.p( screenWidth + 10, this.bulletWay[index] ) );
	}


})
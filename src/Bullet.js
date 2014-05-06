var shootBullet = cc.Sprite.extend({
	ctor: function() {
		this._super();

		this.bullet = cc.Sprite.create( ' images/bullet1.png ' );
        this.addChild( this.bullet, 1 )
        this.bullet.scheduleUpdate();

		this.bullet.movingAction = this.createAnimation();
		this.bullet.runAction( this.bullet.movingAction );

		this.bulletWay = [ 160, 310, 460 ]
		this.speed = [ 9, 11, 13, 15, 17, 19 ]
		this.bulletSpeed = 3;
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
			animation.setDelayPerUnit( 0.1 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	moveBullet: function() {
		this.setPositionX( this.getPositionX() - this.bulletSpeed );

		if( this.getBoundingBoxToWorld().x < 0 ){
			this.randomPositionY();
			this.bulletSpeed = this.randomSpeed();
		}
	},

	randomPositionY: function() {
		var index = Math.floor( Math.random() * 3 );
		this.setPosition( cc.p( screenWidth + 10, this.bulletWay[index] ) );
	},

	randomSpeed: function() {
		var index = Math.floor( Math.random() * 6 );
		return this.speed[ index ];
	},


})
var DumpIronman = cc.Sprite.extend({
	ctor: function() {
		this._super();

		this.ironman = cc.Sprite.create( ' images/sprite1.png ' );
		this.ironman.setPosition( new cc.Point( 0, -45 ) );
        this.addChild( this.ironman, 1 )
        this.ironman.scheduleUpdate();

		this.ironman.movingAction = this.createAnimation();
		this.ironman.runAction( this.ironman.movingAction );

		this.vy = DumpIronman.STARTING_VELOCITY;

		this.started = false;

		this.j = 0;
	},
	

	createAnimation: function() {
		var animation = new cc.Animation.create();
			animation.addSpriteFrameWithFile( 'images/sprite1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite2.png' );
			animation.addSpriteFrameWithFile( 'images/sprite3.png' );
			animation.addSpriteFrameWithFile( 'images/sprite4.png' );
			animation.addSpriteFrameWithFile( 'images/sprite5.png' );
			animation.addSpriteFrameWithFile( 'images/sprite6.png' );
			animation.addSpriteFrameWithFile( 'images/sprite7.png' );
			animation.addSpriteFrameWithFile( 'images/sprite8.png' );
			animation.setDelayPerUnit( 0.1 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	update: function( dt ){
		var pos = this.getPosition();

		if( this.started ){
			this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
        	this.vy += DumpIronman.G;
		}
		if( pos.y <= screenHeight / 3 ) {
			this.vy = DumpIronman.STOP;
			if( this.vy < screenHeight / 3 ){
				this.setPosition( new cc.Point( pos.x, screenHeight / 3 ) );
			}
		}
		if( pos.y == screenHeight / 3 ){
			this.j = 0;
		}
    },

	jump: function() {
		if( this.j < 2 ){
			this.vy = DumpIronman.JUMPING_VELOCITY;
			this.j++;
		}
			
	},

	start: function() {
		this.started = true;
	},

	stop: function() {
		this.started = false;
	}

})

DumpIronman.G = -1;
DumpIronman.STARTING_VELOCITY = 15;
DumpIronman.JUMPING_VELOCITY = 19;
DumpIronman.STOP = 0;
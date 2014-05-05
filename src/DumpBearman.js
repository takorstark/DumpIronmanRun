var DumpBearman = cc.Sprite.extend({
	ctor: function() {
		this._super();

		this.bear = cc.Sprite.create( ' images/sprite1.png ' );
		this.bear.setPosition( new cc.Point( 0, -45 ) );
        this.addChild( this.bear, 1 )
        this.bear.scheduleUpdate();

		this.bear.movingAction = this.runAnimation();
		this.bear.runAction( this.bear.movingAction );

		this.vy = DumpBearman.STARTING_VELOCITY;

		this.started = false;

		this.run = false;

		// this.slash = true;

		this.j = 0;
	},

	update: function( dt ){
		var pos = this.getPosition();

		if( this.started ){
			this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
        	this.vy += DumpBearman.G;
		}
		if( pos.y <= screenHeight / 3 ) {
			this.vy = DumpBearman.STOP;
			if( this.vy < screenHeight / 3 ){
				this.setPosition( new cc.Point( pos.x, screenHeight / 3 ) );
			}
		}
		if( pos.y == screenHeight / 3 ){
			this.j = 0;
			if( this.run ){
				this.running();
			}
		}
    },

	runAnimation: function() {
		var animation = new cc.Animation.create();
			animation.addSpriteFrameWithFile( 'images/sprite1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite2.png' );
			animation.addSpriteFrameWithFile( 'images/sprite3.png' );
			animation.addSpriteFrameWithFile( 'images/sprite4.png' );
			animation.addSpriteFrameWithFile( 'images/sprite5-1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite6-1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite7-1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite8-1.png' );
			animation.setDelayPerUnit( 0.1 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	jumpAnimation: function() {
		var animation = new cc.Animation.create();
			animation.addSpriteFrameWithFile( 'images/sprite5-1.png' );
			animation.setDelayPerUnit( 0.1 );
			return cc.RepeatForever.create( cc.Animate.create( animation ) );
	},

	slashAnimation: function() {
		var animation = new cc.Animation.create();
			// animation.addSpriteFrameWithFile( 'images/sprite-slash1.png' );
			// animation.addSpriteFrameWithFile( 'images/sprite-slash2.png' );
			// animation.addSpriteFrameWithFile( 'images/sprite-slash3.png' );
			animation.addSpriteFrameWithFile( 'images/sprite5-1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite6-1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite7-1.png' );
			animation.addSpriteFrameWithFile( 'images/sprite8-1.png' );
			animation.setDelayPerUnit( 0.08 );
			return cc.Animate.create( animation );
	},

    running: function() {
    	this.bear.stopAction( this.bear.movingAction );
		this.bear.movingAction = this.runAnimation();
		this.bear.runAction( this.bear.movingAction );

		this.run = false;
    },

	jump: function() {
		if( this.j < 2 ){
			this.vy = DumpBearman.JUMPING_VELOCITY;
			this.j++;
		}
		
		this.bear.stopAction( this.bear.movingAction );
		this.bear.movingAction = this.jumpAnimation();
		this.bear.runAction( this.bear.movingAction );

		this.run = true;
		
	},

	slashing: function() {
    	this.bear.stopAction( this.bear.movingAction );
		this.bear.movingAction = this.slashAnimation();
		this.bear.runAction( this.bear.movingAction );

	},

	start: function() {
		this.started = true;
	},

	stop: function() {
		this.started = false;
	}

})

DumpBearman.G = -1;
DumpBearman.STARTING_VELOCITY = 15;
DumpBearman.JUMPING_VELOCITY = 19;
DumpBearman.STOP = 0;
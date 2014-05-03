var DumpIronman = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/DumpIronman.png' );

		this.vy = DumpIronman.STARTING_VELOCITY;

		this.started = false;

		this.j = 0;
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
DumpIronman.JUMPING_VELOCITY = 20;
DumpIronman.STOP = 0;
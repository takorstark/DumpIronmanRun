var DumpIronman = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/DumpIronman.png' );

		this.vy = DumpIronman.STARTING_VELOCITY;

		this.started = false;
	},

	update: function( dt ){
		var pos = this.getPosition();

		if( this.started ){
			this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
        	this.vy += DumpIronman.G;
		}
		if ( pos.y <= screenHeight / 3 ) {

			this.vy = DumpIronman.STOP;
		}
    },

	jump: function() {
		this.vy = DumpIronman.JUMPING_VELOCITY;
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
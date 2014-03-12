var DumpIronman = cc.Sprite.extend({
	ctor: function() {
		this._super();
		this.initWithFile( 'images/DumpIronman.png' );

		this.vy = DumpIronman.STARTING_VELOCITY;

		this.started = false;
	},

	update: function( dt ){
		if( this.started ){
			var pos = this.getPosition();
        	this.setPosition( new cc.Point( pos.x, pos.y + this.vy ) );
        	this.vy += DumpIronman.G;
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
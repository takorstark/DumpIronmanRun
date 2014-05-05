var SlashEffect = cc.Sprite.extend({
	ctor: function() {
		this._super();

		this.effect = cc.Sprite.create( 'images/slash_ef.png' );
		this.addChild( this.effect );
		this.scheduleUpdate();

	},

	update: function() {
		var pos = this.getPositionX();

		this.setPositionX( pos + 10 );

		if( pos > screenWidth ){
			this.removeChild( this.effect );
		}
	},

})
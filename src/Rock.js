var Rock = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.obstacle1 = cc.Sprite.create( ' images/rock.png ' );
		this.obstacle1.setAnchorPoint( new cc.Point( 0.5, 1 ) );
		this.obstacle1.setPosition( new cc.Point( 0, -100 ) );
		this.addChild( this.obstacle1 ); 

	},

	update: function( dt ) {
		var pos = this.getPositionX();

		this.setPositionX( this.getPositionX() - 5 );

		if( pos < 0 ){
			this.setPositionX( screenWidth + 100 );
		}
	},

	// hit: function( player ){
	// 	var playerPos = player.getPosition();
	// 	var myPos = this.getPosition90;

	// }

})
	

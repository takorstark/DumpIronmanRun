var GameGround = cc.Sprite.extend({
	ctor: function(){
		this._super();

        this.ground1 = cc.Sprite.create( ' images/game_ground.png ' );
        this.ground1.setAnchorPoint( new cc.Point( 0, 1 ) );
        this.ground1.setPosition( new cc.Point( -400, 80 ) );
        this.addChild( this.ground1 );

        this.ground2 = cc.Sprite.create( ' images/game_ground.png ' );
        this.ground2.setAnchorPoint( new cc.Point( 0, 1 ) );
        this.ground2.setPosition( new cc.Point( 400, 80 ) );
        this.addChild( this.ground2 );

        this.ground3 = cc.Sprite.create( ' images/game_ground.png ' );
        this.ground3.setAnchorPoint( new cc.Point( 0, 1 ) );
        this.ground3.setPosition( new cc.Point( 1200, 80 ) );
        this.addChild( this.ground3 );


	},

	update: function( dt ) {
		this.pos1 = this.ground1.getPositionX();
		this.pos2 = this.ground2.getPositionX();
		this.pos3 = this.ground3.getPositionX();

		this.ground1.setPositionX( this.pos1 - 5 );
		this.ground2.setPositionX( this.pos2 - 5 );
		this.ground3.setPositionX( this.pos3 - 5 );

		if( this.pos1 < -1600 ){
			this.ground1.setPositionX( 790 );
		}
		if( this.pos2 < -1600 ){
			this.ground2.setPositionX( 790 );
		}
		if( this.pos3 < -1600 ){
			this.ground3.setPositionX( 790 );
		}
		
	},


})
	

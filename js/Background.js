function Background(map){
	base(this,LSprite,[]);
	
	this.startX=0;
	this.length=map[0].length*scale;
	this.bitmap=[];
	var i,j;
	for(i=0;i<map.length;i++){
		this.bitmap[i]=[];
		for(j=0;j<map[i].length;j++){
			this.bitmap[i][j] = new LBitmap(bitmapdataList[map[i][j]]);
			this.bitmap[i][j].x = scale*j;
			this.bitmap[i][j].y = scale*i;
			this.bitmap[i][j].scaleX=scale/this.bitmap[i][j].getWidth();
			this.bitmap[i][j].scaleY=scale/this.bitmap[i][j].getHeight();
			this.addChild(this.bitmap[i][j]);
		}
	}
}


Background.prototype.onframe = function (){
	if(hero.footX-this.startX>=LGlobal.width/2&&this.startX+LGlobal.width<this.length){
		var dx=hero.footX-this.startX-LGlobal.width/2;
		
		var i,j;
		for(i=0;i<this.bitmap.length;i++)
		for(j=0;j<this.bitmap[i].length;j++){
			this.bitmap[i][j].x-=dx;
			
		}
		
		this.startX+=dx;
	}
};
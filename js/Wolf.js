function Wolf(id,dx,direct,isLurk){//appearX){
	base(this,LSprite,[]);
	
	this.stationId=id;
	
	this.footX=station[id].x1+dx;
	this.footY=station[this.stationId].y;
	
	this.setXY();
	
	this.state=1;
	
	this.direct=direct;
	
	//this.appearX=appearX;
	
	this.appear=0;
	this.isLurk=isLurk;		//ÊÇ·ñÂñ·ü
	if(this.isLurk==1) this.visible=false;
	/*if(bgLayer.startX<this.appearX){
		this.visible=false;
		this.appear=0;
	}*/
	
	
	var list = LGlobal.divideCoordinate(224,128,4,7);
	
	this.anime = new LAnimation(this,
		new LBitmapData(imglist["wolf"],0,0,32,32),[
		[list[0][0]],
		[list[1][0]],
		[list[0][1],list[0][2],list[0][3],list[0][4],list[0][5],list[0][6]],
		[list[1][1],list[1][2],list[1][3],list[1][4],list[1][5],list[1][6]],
		list[2],
		list[3]
		]);
		
		
	this.anime.scaleX=scale/32;
	this.anime.scaleY=scale/32;
	
	
	this.anime.setAction(this.state*2+this.direct,0);
	this.anime.onframe();
	
	this.refreshTime=80;
	this.refreshTimer=new Timer(this.refreshTime);
	
	
	var dv;
	if(direct==0) dv=1; else dv=-1;
	this.speedX=scale*0.15*dv;
	
	this.live=1;
	this.exist=1;
	
	this.bodyRect=[scale*0.2,scale*0.25,scale*0.7,scale*0.5];
	//this.graphics.drawRect(1,"#ffffff",this.bodyRect);
}

Wolf.prototype.setXY = function (){
	this.x=this.footX-bgLayer.startX-scale*0.5;
	this.y=this.footY-scale*0.85;
};


Wolf.prototype.onframe = function (){
	if(this.appear==1){
	if(this.exist==1){
		if(this.playAnime()==1) return 1;
	
	}
	
	this.run();
	}
	
	if(this.appear==0&&this.checkAppear()==1){//bgLayer.startX>=this.appearX){
		this.appear=1;
		this.visible=true;
	}
	return 0;
};


Wolf.prototype.checkAppear = function (){
	if(this.isLurk==0&&this.footX>bgLayer.startX-scale&&this.footX<bgLayer.startX+LGlobal.width+scale
		||this.isLurk==1&&this.footX<bgLayer.startX-scale)
		return 1;
	else
		return 0;
};


Wolf.prototype.playAnime = function (){
	if(this.refreshTimer.runLoop()==1){
		
		this.anime.onframe();
		
		if((this.anime.getAction()[0]>=4)
			&&this.anime.getAction()[1]==0)
			return 1;
		
	}
	
	return 0;
};


Wolf.prototype.run = function (){
	if(this.live==1){
	
		this.footX+=this.speedX;
	
	
	
		if(!(this.footX>=station[this.stationId].x1
			&&this.footX<=station[this.stationId].x2)){
			this.direct=1-this.direct;
			this.speedX*=-1;
			this.anime.setAction(this.state*2+this.direct);
		}
		
	}
	
	this.setXY();
};


Wolf.prototype.destroy = function (){
	this.live=0;
	this.state=2;
	this.anime.setAction(this.state*2+this.direct,0);
	
	//if(this.refreshTime!=80)
	//this.refreshTimer=new Timer(80);
};
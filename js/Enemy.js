function Enemy(type,id,dx,direct,isLurk){
	base(this,LSprite,[]);
	this.type=type;
	this.stationId=id;
	
	this.footX=station[id].x1+dx;
	this.footY=station[this.stationId].y;
	
	this.setXY();
	
	
	
	
	
	var list = LGlobal.divideCoordinate(512,512,8,8);
	
	this.anime = new LAnimation(this,
		new LBitmapData(imglist["enemy"],0,0,64,64),[
		list[0],
		list[1],
		list[2],
		list[3],
		[list[4][0],list[4][1],list[4][2],list[4][3],list[4][4],list[4][5],list[4][6]],
		[list[5][0],list[5][1],list[5][2],list[5][3],list[5][4],list[5][5],list[5][6]],
		[list[6][0],list[6][1],list[6][2]],
		[list[7][0],list[7][1],list[7][2]],
		[list[6][4],list[6][5],list[6][6]],
		[list[7][4],list[7][5],list[7][6]],
		]);
		//LGlobal.divideCoordinate(512,256,4,8));
		
	this.anime.scaleX=scale/32;
	this.anime.scaleY=scale/32;
	
	
	this.direct=direct;
	
	
	this.isShooting=0;
	this.bullet=[];
	this.bulletSum=0;
	
	this.emissionTimer=new Timer(0);
	this.emissionRefreshTime=900;
	
	
	this.refreshTime=80;
	
	var dv;
	if(direct==0) dv=1; else dv=-1;
	
	if(this.type==0)
	this.speedX=4*dv;
	else if(this.type==1)
	this.speedX=7*dv;
	else if(this.type>=2){
	this.speedX=0;
	this.isShooting=1;
	this.refreshTime=300;
	}
	
	this.anime.setAction(this.type*2+this.direct+2);
	this.anime.onframe();
	
	this.refreshTimer=new Timer(this.refreshTime);
	
	this.live=1;
	this.exist=1;
	
	this.bodyRect=[scale*0.8,scale*0.5,scale*0.4,scale*1];
	//this.graphics.drawRect(1,"#ffffff",this.bodyRect);
	
	this.appear=0;
	this.isLurk=isLurk;		//是否埋伏
	if(this.isLurk==1) this.visible=false;
	
}

Enemy.prototype.onframe = function (){
	if(this.appear==1){
	if(this.exist==1){
		if(this.playAnime()==1) return 1;
	
	}
	
	this.run();
	
	this.emiss();
	
	this.bulletRun();
	}
	
	if(this.appear==0&&this.checkAppear()==1){
		this.appear=1;
		this.visible=true;
	}
	return 0;
};

Enemy.prototype.playAnime = function (){
	if(this.refreshTimer.runLoop()==1){
		
		this.anime.onframe();
		
		if((this.anime.getAction()[0]<=1)
			&&this.anime.getAction()[1]==0)
			return 1;
		
	}
	
	return 0;
};

Enemy.prototype.run = function (){
	if(this.live==1){
	
		this.footX+=this.speedX;
	
	
	
		if(!(this.footX>=station[this.stationId].x1
			&&this.footX<=station[this.stationId].x2)){
			this.direct=1-this.direct;
			this.speedX*=-1;
			this.anime.setAction(this.type*2+this.direct+2);
		}
		
	}
	
	this.setXY();
};

Enemy.prototype.setXY = function (){
	this.x=this.footX-bgLayer.startX-scale*1;
	this.y=this.footY-scale*1.5;
};


Enemy.prototype.checkAppear = function (){
	if(this.isLurk==0&&this.footX>bgLayer.startX-scale&&this.footX<bgLayer.startX+LGlobal.width+scale
		||this.isLurk==1&&this.footX<bgLayer.startX-scale)
		return 1;
	else
		return 0;
};


Enemy.prototype.emiss = function (){
	if(this.isShooting==1)
	if(this.emissionTimer.isReady()==1){
		this.emissionTimer.setTime(this.emissionRefreshTime);
		//if(this.direct==0)
		var angle=this.direct*180;//this.angle;
		
		var r=scale*0.5;
		var dy;
		if(this.type==2) dy=scale*0.62;
		else if(this.type==3) dy=scale*0.82;
		this.bullet[this.bulletSum]=new Bullet(this.footX-bgLayer.startX+r*Math.cos(Math.PI*angle/180),
			this.footY-dy+r*Math.sin(Math.PI*angle/180),
			angle,
			1,
			scale*0.2);
		backLayer.addChild(this.bullet[this.bulletSum]);
		this.bulletSum++;
	}
};


Enemy.prototype.bulletRun = function (){
	this.emissionTimer.run();
	var find=0;
	var j;
	for(i=0;i<this.bulletSum;i++)
		if(this.bullet[i]){
			find=1;	//还有子弹
			if(this.bullet[i].run()==1){
				backLayer.removeChild(this.bullet[i]);
				this.bullet[i]=null;
				break;
			}
			
			//for(j=0;j<enemySum;j++)
			if(hero.live==1)
			if(checkCollision([this.bullet[i].x-this.bullet[i].size/2,this.bullet[i].y-this.bullet[i].size/2,this.bullet[i].size,this.bullet[i].size]
					,[hero.bodyRect[0]+hero.x,hero.bodyRect[1]+hero.y,hero.bodyRect[2],hero.bodyRect[3]])==1){
					backLayer.removeChild(this.bullet[i]);
					this.bullet[i]=null;
					hero.destroy();
					break;
				}
		}
		
	if(find==0)
		this.bulletSum=0;
};

Enemy.prototype.destroy = function (){
	this.live=0;
	this.isShooting=0;
	this.anime.setAction(this.direct,0);
	
	if(this.refreshTime!=80)
	this.refreshTimer=new Timer(80);
};
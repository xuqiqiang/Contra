function Boss1(x,y){
	base(this,LSprite,[]);
	
	this.cenX=x;
	this.cenY=y;
	this.setXY();
	
	var list = LGlobal.divideCoordinate(1792,256,1,7);
	this.anime = new LAnimation(this,
		new LBitmapData(imglist["boss1"],0,0,256,256),[
		[list[0][0],list[0][1],list[0][2],list[0][3],list[0][4],list[0][5],list[0][4],list[0][3],list[0][2],list[0][1]],
		[list[0][6]]
		]);
		
		
	this.anime.scaleX=scale/32;
	this.anime.scaleY=scale/32;
		
	this.anime.setAction(0,0);
	
	this.speed=scale*0.05;
	this.speedX=0;
	this.speedY=0;
	this.desX=0;
	this.desY=0;
	
	this.isMoving=0;
	
	
	this.blood=30;
	this.live=1;
	this.exist=1;
	
	
	this.destroyTimer=new Timer(2000);	//无敌时间
	this.destroyFlashTimer=new Timer(50);
	/////////////////////////////////////////////////////////////////////
	
	
	//this.isShooting=1;
	this.bullet=[];
	this.bulletSum=0;
	
	this.emissionTimer=new Timer(0);
	this.emissionRefreshTime=1000;
	
	
	
	this.bodyRect=[scale*1.5,scale*3.5,scale*5,scale*1];
	//this.graphics.drawRect(1,"#ffffff",this.bodyRect);
	
	this.appear=0;
	this.visible=false;
}

Boss1.prototype.onframe = function (){

	if(this.appear==1){
		if(this.exist==1)
			this.playAnime();
	
		
			this.move();
	
			this.emiss();
		
	
		this.bulletRun();
	}
	else this.lurk();
};

Boss1.prototype.playAnime = function (){

	if(this.live==1)
		this.anime.onframe();
	else{
	
		if(this.destroyFlashTimer.runLoop()==1){
			this.visible=!this.visible;
		}
		
		if(this.destroyTimer.run()==1){
			this.exist=0;
			this.visible=false;
		}
	}
};

Boss1.prototype.move = function (){

	if(this.live==1){
		if(this.isMoving==0){
			this.setDes();
		}
		else{
			this.cenX+=this.speedX;
			this.cenY+=this.speedY;
			if(this.cenX>=this.desX-this.speed/2&&
				this.cenX<=this.desX+this.speed/2&&
				this.cenY>=this.desY-this.speed/2&&
				this.cenY<=this.desY+this.speed/2)
				this.isMoving=0;
		}
	}
	this.setXY();
};

Boss1.prototype.setXY = function (){
	this.x=this.cenX-scale*4.2-bgLayer.startX;
	this.y=this.cenY-scale*4.0;
};

Boss1.prototype.setDes = function (){
	this.desX=Math.random()*(LGlobal.width-scale*7)+scale*3.5+bgLayer.startX;
	this.desY=Math.random()*(LGlobal.height/2-scale*1.5)+scale*1.5;
	var dx=this.desX-this.cenX;
	var dy=this.desY-this.cenY;
	var dl=Math.sqrt(dx*dx+dy*dy);
	this.speedX=dx/dl*this.speed;
	this.speedY=dy/dl*this.speed;
	this.isMoving=1;
};


Boss1.prototype.aim = function (){
	var dx=hero.footX-this.cenX;
	var dy=hero.footY-scale*0.5-this.cenY;
	var angle=0;
	if(dx==0){
		if(dy>0) angle=90;
		else if(dy<0) angle=-90;
	}
	else{
		angle=Math.atan(dy/dx)/Math.PI*180;
		if(dx<0&&dy>0) angle+=180;
		else if(dx<0&&dy<0) angle-=180;
	}
	return angle;
};


Boss1.prototype.emiss = function (){
	//if(this.isShooting==1)
	if(this.live==1)
	if(this.emissionTimer.isReady()==1){
		this.emissionTimer.setTime(this.emissionRefreshTime);
		//if(this.direct==0)
		/*var angle=this.direct*180;//this.angle;
		
		var r=scale*0.5;
		var dy;
		if(this.type==2) dy=scale*0.62;
		else if(this.type==3) dy=scale*0.82;*/
		
		
		this.bullet[this.bulletSum]=new Bullet(this.cenX-bgLayer.startX,//this.footX-bgLayer.startX+r*Math.cos(Math.PI*angle/180),
			this.cenY,//this.footY-dy+r*Math.sin(Math.PI*angle/180),
			this.aim(),
			1,
			scale*0.15);
		backLayer.addChild(this.bullet[this.bulletSum]);
		this.bulletSum++;
	}
};



Boss1.prototype.bulletRun = function (){
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

Boss1.prototype.attacked = function (){
	this.blood--;
	if(this.blood<=0)
	this.destroy();
};

Boss1.prototype.lurk = function (){
	if(this.appear==0){
		if(bgLayer.startX>=map[0].length*scale-LGlobal.width-12)
		this.appear=1;
		this.visible=true;
	}
};

Boss1.prototype.destroy = function (){
	this.live=0;
	this.anime.setAction(1,0);
	this.anime.onframe();
};

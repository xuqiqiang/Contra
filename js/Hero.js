function Hero(x,y){
	base(this,LSprite,[]);
	
	this.footX=x;
	this.footY=y;
	this.setXY();
	this.width=scale;
	this.height=scale;
	//this.isJump=1;
	
	this.state=2; //跳跃
	
	this.direct=0; //右
	this.angle=0;//角度
	this.speedX=0;
	this.maxSpeedX=4;
	this.speedY=0;
	this.maxSpeedY=14;
	this.JumpSpeed=-14;
	this.stationId=-1;
	
	this.refreshTimer=new Timer(80);
	
	this.emissionTimer=new Timer(0);
	this.emissionRefreshTime=300;
	
	
	this.isShooting=0;
	this.bullet=[];
	this.bulletSum=0;
	
	this.upBody = new LSprite();
	
	var list1 = LGlobal.divideCoordinate(512,832,13,8);
	
	this.upBody.anime = new LAnimation(this.upBody,
		new LBitmapData(imglist["hero_body"],0,0,64,64),[
		[list1[0][0]],		//停0
		[list1[1][0]],
		
		list1[7],			//左上2
		[list1[8][4]],		//上右
		list1[6],			//右上
		list1[2],			//右
		list1[4],			//右下
		[list1[8][0]],		//下右
		list1[5],			//左下
		list1[3],			//左9
		
		[list1[9][0]],		//下左
		[list1[9][4]],		//上左
		
		
		////////////////////////////////////////////////////////射击
		[list1[12][4],list1[12][5],list1[12][6]],			//左上12
		[list1[8][5],list1[8][6],list1[8][7]],		//上右
		[list1[12][0],list1[12][1],list1[12][2]],			//右上
		[list1[10][0],list1[10][1],list1[10][2]],			//右
		[list1[11][0],list1[11][1],list1[11][2]],			//右下
		[list1[8][1],list1[8][2],list1[8][3]],		//下右
		[list1[11][4],list1[11][5],list1[11][6]],			//左下
		[list1[10][4],list1[10][5],list1[10][6]],			//左19
		
		[list1[9][1],list1[9][2],list1[9][3]],		//下左
		[list1[9][5],list1[9][6],list1[9][7]],		//上左
		
		
		[list1[0][1],list1[0][2],list1[0][3],list1[0][4],list1[0][5],list1[0][6],list1[0][7]],
		[list1[1][1],list1[1][2],list1[1][3],list1[1][4],list1[1][5],list1[1][6],list1[1][7]],
		]);
	
		
	this.upBody.anime.scaleX=scale/32;
	this.upBody.anime.scaleY=scale/32;
	this.upBody.anime.x=-scale*0.7;//-27;
	this.upBody.anime.y=-scale*0.63;//-17;
	this.addChild(this.upBody);
	
	this.leg = new LSprite();
	var list2 = LGlobal.divideCoordinate(256,192,6,8);
	this.leg.anime = new LAnimation(this.leg,
		new LBitmapData(imglist["hero_leg"],0,0,32,32),[
		[list2[0][0]],
		[list2[1][0]],
		list2[2],
		list2[3],
		list2[4],
		list2[5],
		[list2[0][1],list2[0][2],list2[0][3],list2[0][4],list2[0][5],list2[0][6],list2[0][7]],
		[list2[1][1],list2[1][2],list2[1][3],list2[1][4],list2[1][5],list2[1][6],list2[1][7]],
		]);
		
	this.leg.anime.scaleX=scale/32;
	this.leg.anime.scaleY=scale/32;
	this.leg.anime.x=-scale*0.2;//-6;
	this.leg.anime.y=-scale*0.09;//5;
	this.addChild(this.leg);
	
	//this.upBody.anime.setAction(5);//this.direct+2);
	this.setBodyAction(this.angle,this.isShooting);
	this.leg.anime.setAction(this.direct+4);
	
	this.legTag=1;
	
	this.live=1;
	this.exist=1;
	
	this.bodyRect=[scale*0.1,-scale*0.2,scale*0.4,scale*1];
	//this.graphics.drawRect(1,"#ffffff",this.bodyRect);
	
	this.protect=1;
	this.protectTimer=new Timer(2000);	//无敌时间
	this.protectFlashTimer=new Timer(50);
	
	this.destoryTimer=new Timer(1000);
	this.destoryTimerFinish=0;
}

Hero.prototype.onframe = function (){
	
	if(this.exist==1)
	this.playAnime();
	
	this.emiss();
	
	this.bulletRun();
	
	this.move();
	
	this.checkCol();
	
};

Hero.prototype.move = function (){
	
	if(this.protect==1){
		if(this.protectTimer.run()==1){
			this.protect=0;
			this.visible=true;
		}
	}
	
	if(this.exist==0)
	if(this.destoryTimer.run()==1){
		this.destoryTimerFinish=1;
	}
	
	var i;
	
	if(this.state==2){
		this.footY+=this.speedY;
		//this.setXY();
		if(this.speedY<this.maxSpeedY)
			this.speedY+=g;
		else
			this.speedY=this.maxSpeedY;
			
		if(this.speedY>=0){
		
		for(i=0;i<stationSum;i++){
			if(this.footX>=station[i].x1&&this.footX<=station[i].x2
				&&this.footY>=station[i].y-this.maxSpeedY/2
				&&this.footY<=station[i].y+this.maxSpeedY/2){
					this.stationId=i;
					this.speedY=0;
					this.footY=station[i].y;
					this.setXY();
					
					
					
					if(this.live==1){
						this.legTag=1;//
					if(this.speedX==0){
						//this.stop();
						this.state=0;
						this.leg.anime.setAction(this.direct,0);
						this.leg.anime.onframe();
					}
					else{
						this.state=1;
						//this.upBody.anime.setAction(this.direct+2);
						this.setBodyAction(this.angle,this.isShooting);
						this.leg.anime.setAction(this.direct+2);
					}
					}
				}
		}
		
		
		if(this.live==1){
			if(this.footY>LGlobal.height+scale*2){
				this.protect=0;
				this.destroy();
			}
		}
		}
	}
	else{
		if(!(this.footX>=station[this.stationId].x1
			&&this.footX<=station[this.stationId].x2)){
			this.state=2;
			this.stationId=-1;
			if(this.live==1)
			this.leg.anime.setAction(this.direct+4,0);
		}
		
	}
	
	if(this.live==0&&this.exist==1){
			var d;
			if(this.direct==0) d=-1;
			else d=1;
			this.footX+=scale*0.04*d;
	}
	
	
	this.footX+=this.speedX;
	if(this.footX<bgLayer.startX+scale*0.5) this.footX=bgLayer.startX+scale*0.5;
	if(this.footX>map[0].length*scale-scale*0.5) this.footX=map[0].length*scale-scale*0.5;
	this.setXY();
};

Hero.prototype.playAnime = function (){
	//if(this.state!=0||this.live==0){
		
		if(this.protect==1){
			if(this.protectFlashTimer.runLoop()==1){
				this.visible=!this.visible;
			}
		}
		
	if(this.refreshTimer.runLoop()==1){
		this.upBody.anime.onframe();
		//if(!(this.state==2&&this.leg.anime.getAction()[1]==7))
		if(this.legTag==1)
		this.leg.anime.onframe();
		
		if(this.leg.anime.getAction()[1]==0){
			if(this.state==2)
				this.legTag=0;
			
			if(this.live==0){//this.leg.anime.getAction()[0]==this.direct+6){//){
				this.exist=0;
				this.speedX=0;
			}
				
		}
		
		if(this.live==0){
			var d;
			if(this.direct==0) d=-1;
			else d=1;
			this.upBody.x+=scale*0.04*d;
			this.upBody.y+=scale*0.05;
			this.leg.x+=scale*0.04*d;
			this.leg.y+=scale*0.05;
		}
	}
	//}
};

Hero.prototype.bulletRun = function (){
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
			
			for(j=0;j<enemySum;j++)
			if(enemy[j].live==1&&enemy[j].appear==1)
			if(checkCollision([this.bullet[i].x-this.bullet[i].size/2,this.bullet[i].y-this.bullet[i].size/2,this.bullet[i].size,this.bullet[i].size]
					,[enemy[j].bodyRect[0]+enemy[j].x,enemy[j].bodyRect[1]+enemy[j].y,enemy[j].bodyRect[2],enemy[j].bodyRect[3]])==1){
			
					backLayer.removeChild(this.bullet[i]);
					this.bullet[i]=null;
					enemy[j].destroy();
					break;
				}
				
				
			if(this.bullet[i]){
			for(j=0;j<wolfSum;j++)
			if(wolf[j].live==1&&wolf[j].appear==1){
				if(checkCollision([this.bullet[i].x-this.bullet[i].size/2,this.bullet[i].y-this.bullet[i].size/2,this.bullet[i].size,this.bullet[i].size]
					,[wolf[j].bodyRect[0]+wolf[j].x,wolf[j].bodyRect[1]+wolf[j].y,wolf[j].bodyRect[2],wolf[j].bodyRect[3]])==1){
						backLayer.removeChild(this.bullet[i]);
						this.bullet[i]=null;
						wolf[j].destroy();
						break;
				}
			}
			}
			
			if(this.bullet[i])
			if(boss1.live==1&&boss1.appear==1){
				if(checkCollision([this.bullet[i].x-this.bullet[i].size/2,this.bullet[i].y-this.bullet[i].size/2,this.bullet[i].size,this.bullet[i].size]
					,[boss1.bodyRect[0]+boss1.x,boss1.bodyRect[1]+boss1.y,boss1.bodyRect[2],boss1.bodyRect[3]])==1){
						backLayer.removeChild(this.bullet[i]);
						this.bullet[i]=null;
						boss1.attacked();
				}
			}
		}
		
	if(find==0)
		this.bulletSum=0;
};

Hero.prototype.checkCol = function (){
	if(this.live==1){
		for(i=0;i<enemySum;i++)
			if(enemy[i].live==1)
				if(checkCollision([this.bodyRect[0]+this.x,this.bodyRect[1]+this.y,this.bodyRect[2],this.bodyRect[3]]
					,[enemy[i].bodyRect[0]+enemy[i].x,enemy[i].bodyRect[1]+enemy[i].y,enemy[i].bodyRect[2],enemy[i].bodyRect[3]])==1){
					this.destroy();
				}
				
		for(i=0;i<wolfSum;i++)
		if(wolf[i].live==1)
		if(checkCollision([this.bodyRect[0]+this.x,this.bodyRect[1]+this.y,this.bodyRect[2],this.bodyRect[3]]
			,[wolf[i].bodyRect[0]+wolf[i].x,wolf[i].bodyRect[1]+wolf[i].y,wolf[i].bodyRect[2],wolf[i].bodyRect[3]])==1){
			this.destroy();
		}		
				
	}
};

Hero.prototype.setXY = function (){
	this.x=this.footX-15-bgLayer.startX;
	this.y=this.footY-47;
};

Hero.prototype.refresh = function (){
	this.upBody.anime.onframe();
	this.leg.anime.onframe();
};

Hero.prototype.jump = function (){
	
	this.state=2;
	this.speedY=this.JumpSpeed;
	//this.upBody.anime.setAction(this.direct+2);
	this.setBodyAction(this.angle,this.isShooting);
	this.leg.anime.setAction(this.direct+4,0);
	
};

Hero.prototype.setBodyAction = function (angle,isShooting){
	if(isShooting==0){
		if(this.state!=1&&(angle==0||angle==180))
			this.upBody.anime.setAction(this.direct,0);
		else{
			if(angle==90){
				if(this.direct==0) this.upBody.anime.setAction(7,0);
				else this.upBody.anime.setAction(10,0);
			}
			else if(angle==-90){
				if(this.direct==0) this.upBody.anime.setAction(3,0);
				else this.upBody.anime.setAction(11,0);
			}
			else{
				this.upBody.anime.setAction(angle/45+5,0);
			}
		}
		
	
	}
	else{
		if(angle==90){
				if(this.direct==0) this.upBody.anime.setAction(17,0);
				else this.upBody.anime.setAction(20,0);
		}
		else if(angle==-90){
				if(this.direct==0) this.upBody.anime.setAction(13,0);
				else this.upBody.anime.setAction(21,0);
		}
		else{
				this.upBody.anime.setAction(angle/45+15,0);
		}
		//this.upBody.anime.setAction(angle/45+15,0);
	}
};

Hero.prototype.setDirect = function (){
	if(this.checkKey()==0)
		return;
	
	
	if(key.k==1){
		this.isShooting=1;
	}
	else{
		this.isShooting=0;
	}
	
	
	if(key.a==1&&key.d==1||key.w==1&&key.s==1) return;
	//test.text = test.text+1;
	
	
	if(key.a==1||key.d==1){
	
		if(key.a==1){//a
		this.direct=1;
		this.speedX=-this.maxSpeedX;
		}
		else{//d
		this.direct=0;
		this.speedX=this.maxSpeedX;
		}
	
		if(this.state<=1){
			this.state=1;
			this.leg.anime.setAction(this.direct+2);
		}
		else{		//跳跃
			if(!(this.leg.anime.getAction()[1]==0))
				this.leg.anime.setAction(this.direct+4);
			else{
				this.leg.anime.setAction(this.direct+4,7);
				//this.leg.anime.onframe();
			}
		}
	}
	else{
		this.speedX=0;
		
		if(this.state<=1){
			//this.stop();
			this.state=0;
			this.leg.anime.setAction(this.direct,0);
			this.leg.anime.onframe();
		}
		else{
			this.upBody.anime.setAction(this.direct,0);
			this.upBody.anime.onframe();
		}
	}
	
	
	if(key.a+key.d+key.w+key.s>0){	//上半身
		this.setAngle();
	}
	else{
		if(this.direct==0) this.angle=0;
		else this.angle=180;
	}
	
	
	
	
	this.setBodyAction(this.angle,this.isShooting);
	
	this.upBody.anime.onframe();
	this.leg.anime.onframe();
	
};



Hero.prototype.setAngle = function (){
	this.angle=0;
	if(key.w+key.s==0){
		if(key.d==1) this.angle=0;
		else if(key.a==1) this.angle=180;
	}
	else{
		if(key.a+key.d==0){
			if(key.s==1) this.angle=90;
			else if(key.w==1) this.angle=-90;
		}
		else{
			if(key.w==1&&key.d==1) this.angle=-45;
			else if(key.w==1&&key.a==1) this.angle=-135;
			else if(key.s==1&&key.d==1) this.angle=45;
			else if(key.s==1&&key.a==1) this.angle=135;
		}
	}
};

Hero.prototype.setAnime = function (){
	if(this.angle==90&&this.direct==1)
		this.upBody.anime.setAction(10,0);
	else if(this.angle==-90&&this.direct==1)
		this.upBody.anime.setAction(11,0);
	else{
		this.upBody.anime.setAction(this.angle/45+5,0);
	}
};


Hero.prototype.stop = function (){
	//if(this.state==1){
	this.state=0;
	this.upBody.anime.setAction(this.direct,0);
	this.leg.anime.setAction(this.direct,0);
	this.upBody.anime.onframe();
	this.leg.anime.onframe();
	//}
};


Hero.prototype.emiss = function (){
	if(this.isShooting==1)
	if(this.emissionTimer.isReady()==1){
		this.emissionTimer.setTime(this.emissionRefreshTime);
		var angle=this.angle;
		
		var r=scale*0.5;
		this.bullet[this.bulletSum]=new Bullet(this.footX-bgLayer.startX+r*Math.cos(Math.PI*angle/180),
			this.footY-scale*0.77+r*Math.sin(Math.PI*angle/180),
			angle,
			0,
			scale*0.3);
		backLayer.addChild(this.bullet[this.bulletSum]);
		this.bulletSum++;
	}
};

Hero.prototype.destroy = function (){
	if(this.protect==0){
	this.live=0;
	this.isShooting=0;
	
	if(this.speedY<=0) this.speedY=0;	//如果在跳
	//this.state=3;
	this.legTag=1;//跳跃时腿的动作停止
	this.upBody.anime.setAction(this.direct+22,0);
	this.leg.anime.setAction(this.direct+6,0);
	}
};

Hero.prototype.checkKey = function (){
	if(keyRecorder.w==key.w&&
		keyRecorder.s==key.s&&
		keyRecorder.a==key.a&&
		keyRecorder.d==key.d&&
		keyRecorder.k==key.k)
		return 0;
	
		keyRecorder.w=key.w;
		keyRecorder.s=key.s;
		keyRecorder.a=key.a;
		keyRecorder.d=key.d;
		keyRecorder.k=key.k;
		return 1;
	
};

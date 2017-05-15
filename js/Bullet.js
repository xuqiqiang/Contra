function Bullet(x,y,direct,type,speed){
	base(this,LSprite,[]);
	
	this.x=x;
	this.y=y;
	
	this.size=scale*0.25;
	this.direct=direct;
	this.speed=speed;//15;
	
	this.speedX=this.speed*Math.cos(Math.PI*direct/180);
	this.speedY=this.speed*Math.sin(Math.PI*direct/180);
	
	
	this.type=type;
	this.bitmap=new LBitmap(bitmapdataList[2+type]);
	this.bitmap.scaleX=this.size/this.bitmap.getWidth();
	this.bitmap.scaleY=this.size/this.bitmap.getHeight();
	
	this.bitmap.x=-this.size/2;
	this.bitmap.y=-this.size/2;
	
	this.addChild(this.bitmap);
}

Bullet.prototype.run = function (){
	if(this.x>=-this.size&&this.x<=LGlobal.width+this.size
		&&this.y>=-this.size&&this.y<=LGlobal.height+this.size){
			this.x+=this.speedX;
			this.y+=this.speedY;
			return 0;
		}
		
	return 1;
};
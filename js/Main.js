//声明变量
//进度条显示层，背景层，方块绘制层，方块预览层
var backLayer,loadingLayer,bgLayer;
var hero,heroSum;
var enemy,enemySum;
var wolf,wolfSum;
var boss1;
var station,stationSum;
var imglist = {};
var imgData = new Array(
	{name:"bg0",path:"./images/bg0.bmp"},
	{name:"bg1",path:"./images/bg1.bmp"},
	{name:"hero_body",path:"./images/hero_body.png"},
	{name:"hero_leg",path:"./images/hero_leg.png"},
	{name:"bullet1",path:"./images/bullet1.png"},
	{name:"bullet2",path:"./images/bullet2.png"},
	{name:"enemy",path:"./images/enemy.png"},
	{name:"wolf",path:"./images/wolf.png"},
	{name:"boss1",path:"./images/boss1.png"}
	);
var	bitmapdataList;
var map;

var scale;

var g=0.6;

var key,keyRecorder;

var pause;

var test;
function main(){
	
	map=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]];
	
	//背景层初始化	backLayer = new LSprite();
	//在背景层上绘制黑色背景	backLayer.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");	//背景显示
	addChild(backLayer);
	//gameInit();
	loadingLayer = new LoadingSample1();
	//进度条读取层显示
	backLayer.addChild(loadingLayer);
	//利用LLoadManage类，读取所有图片，并显示进度条进程	
	LLoadManage.load(
		imgData,
		function(progress){
			loadingLayer.setProgress(progress);
		},
		gameInit
	);
}
//读取完所有图片，进行游戏标题画面的初始化工作
function gameInit(result){
	//取得图片读取结果
	imglist = result;
	
	bitmapdataList = [
		new LBitmapData(imglist["bg0"]),
		new LBitmapData(imglist["bg1"]),
		new LBitmapData(imglist["bullet1"]),
		new LBitmapData(imglist["bullet2"])
	];
	//移除进度条层
	backLayer.removeChild(loadingLayer);
	loadingLayer = null;
	//显示游戏标题
	var title = new LTextField();
	title.x = 50;
	title.y = 100;
	title.size = 30;	title.color = "#ffffff";
	title.text = "游戏";
	backLayer.addChild(title);	//显示说明文	//backLayer.graphics.drawRect(1,"#ffffff",[50,240,220,40]);	var txtClick = new LTextField();	txtClick.size = 19;	txtClick.color = "#ffffff";	txtClick.text = "上下左右:WSAD 跳跃:L 发射子弹:K 点击页面开始游戏";	txtClick.x = (LGlobal.width - txtClick.getWidth())/2;	txtClick.y = 245;	backLayer.addChild(txtClick);

	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameToStart);}

//游戏画面初始化
function gameToStart(){
	//背景层清空
	backLayer.die();
	backLayer.removeAllChild();
	
	backLayer.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#FF0000");
	
	
	
	
	
	
	scale=50;
	//bgLayer=[];
	
	bgLayer=new Background(map);
	backLayer.addChild(bgLayer);
	
	station=[];
	stationSum=0;
	var startId=-1;
	var i,j;
	for(i=0;i<map.length;i++){
		for(j=0;j<map[0].length;j++){
			
			
			if(startId==-1&&map[i][j]==1){
				startId=j;
			}
			else if(startId!=-1&&map[i][j]==0){
				station[stationSum++]=new Station(scale*startId,scale*j,scale*i+scale*0.625);
				startId=-1;
			}
			else if(startId!=-1&&j==map[0].length-1){
				station[stationSum++]=new Station(scale*startId,scale*(j+1),scale*i+scale*0.625);
				startId=-1;
			}
		}
	}
	
	
	
	hero = new Hero(100,100);
	
	backLayer.addChild(hero);
	
	heroSum=3;
	
	
	enemy=[new Enemy(2,0,200,1,0),
		new Enemy(3,0,100,1,0),
		new Enemy(1,3,100,0,0),
		new Enemy(0,3,150,0,0),
		new Enemy(1,3,200,0,0),
		new Enemy(2,3,500,1,0),
		new Enemy(1,2,30,0,1),
		new Enemy(1,2,80,1,1),
		new Enemy(1,2,130,1,1),
		new Enemy(1,2,190,1,1),
		new Enemy(1,2,900,1,0),
		new Enemy(3,2,200,1,0),
		new Enemy(1,2,500,1,0),
		new Enemy(1,2,200,1,1),
		new Enemy(1,2,250,1,1),
		new Enemy(1,2,300,1,1),
		new Enemy(2,2,700,1,0),
		new Enemy(1,2,1100,1,0),
		new Enemy(1,2,1150,1,0),
		new Enemy(1,2,1200,1,0),];
	
	enemySum=enemy.length;
	for(i=0;i<enemySum;i++)
	backLayer.addChild(enemy[i]);
	//enemySum=1;
	/*
	station=[];
	for(i=0;i<map.length;i++){
		for(j=0;j<map[0].length;j++){
	}*/
	
	wolf=[//new Wolf(0,200,0,0),
		new Wolf(3,400,1,0),
		new Wolf(2,700,1,0),
		new Wolf(2,300,1,1),
		new Wolf(2,1200,1,0),
	];
	wolfSum=wolf.length;
	for(i=0;i<wolfSum;i++)
	backLayer.addChild(wolf[i]);
	//backLayer.addChild(wolf);
	
	
	test = new LTextField();
	test.x = 50;
	test.y = 50;
	test.size = 20;
	test.color = "#ffffff";
	test.text = 0;//bgLayer.startX;
	backLayer.addChild(test);
	
	boss1=new Boss1(map[0].length*scale-LGlobal.width+scale*2.5,scale*0.5);
	backLayer.addChild(boss1);
	/*
	var tl = new LSprite();
	tl.graphics.drawRect(1,"#ffffff",[0,0,scale,scale]);
	//tl.graphics.drawRect(1,"#ffffff",[0,0,enemy[0].x,enemy[0].footY]);
	//tl.graphics.drawRect(1,"#ff0000",[0,0,enemy[0].x,station[0].y]);
	tl.x=0;
	tl.y=0;
	backLayer.addChild(tl);*/
	/////////////////////////////////////////////
	backLayer.addEventListener(LEvent.ENTER_FRAME, onframe);
	
	LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_DOWN,onkeydown);
	LEvent.addEventListener(LGlobal.window,LKeyboardEvent.KEY_UP,onkeyup);
	key=new KeyManager();
	keyRecorder=new KeyManager();
	
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameOver);
	
	pause=0;
	
	////////////////////////////////////////
	//bullet=new Bullet(scale/2,scale/2,0);
	//	backLayer.addChild(bullet);
	/*var aaa = new LSprite();
	aaa.graphics.drawArc(2,"#ff0000",[200,100,3,0,2*Math.PI],true,"#888000");
	//aaa.graphics.drawArc(2,"#ff0000",[boss1.cenX-bgLayer.startX,boss1.cenY,5,0,2*Math.PI],true,"#888000");
	backLayer.addChild(aaa);*/

}

function onframe(){
	
	if(pause==0){
		
	
		test.text="hero:"+heroSum;
		if(hero){
			hero.onframe();
			
			if(hero.exist==1)
			keyEvent();
			
			if(hero.destoryTimerFinish==1){
				if(heroSum>0){
					backLayer.removeChild(hero);
					hero=null;
					hero = new Hero(100+bgLayer.startX,100);
					backLayer.addChild(hero);
					heroSum--;
				
					keyRecorder=new KeyManager();
				}
				else{
					txt = new LTextField();
					
					txt.size = 40;
					txt.color = "#ffffff";
					txt.text = "gameover";//bgLayer.startX;
					txt.x = (LGlobal.width - txt.getWidth())/2;
					txt.y = 250;
					backLayer.addChild(txt);
				}
			}
			/*if(hero.destoryTimerFinish==1&&heroSum>0){
				backLayer.removeChild(hero);
				hero=null;
				hero = new Hero(100+bgLayer.startX,100);
				backLayer.addChild(hero);
				heroSum--;
				
				keyRecorder=new KeyManager();
			}*/
		}
		
		
	
		var i;
		for(i=0;i<enemySum;i++)
		if(enemy[i])
			if(enemy[i].onframe()==1)
				enemy[i].exist=0;
	
	
		for(i=0;i<wolfSum;i++)
		if(wolf[i])
		if(wolf[i].onframe()==1)
			wolf[i].exist=0;
	
		bgLayer.onframe();
		//test.text = hero.live;
		boss1.onframe();
	}
}

function keyEvent(){

	/*if(key.a==1&&key.d==1){
		key.a=0;
		key.d=0;
	}*/
	
	if(hero.live==1){
		
		hero.setDirect();
	}
	
	if(key.l==1){//l
		if(hero.live==1)
		if(hero.state!=2){
			hero.jump();
		}
	}
}

/*
function equal(event){
}*/

function checkCollision(rect1,rect2){
	if(Math.abs((rect1[0]+rect1[2]/2)-(rect2[0]+rect2[2]/2))<=rect1[2]/2+rect2[2]/2
		&&Math.abs((rect1[1]+rect1[3]/2)-(rect2[1]+rect2[3]/2))<=rect1[3]/2+rect2[3]/2){
			return 1;
		}
		
	return 0;
}

//键盘按下事件
function onkeydown(event){
	
	//if(hero.live==1){
	switch(event.keyCode){
		case 65: key.a=1;break;
		case 68: key.d=1;break;
		case 87: key.w=1;break;
		case 83: key.s=1;break;
		case 75: key.k=1;break;
		case 76: key.l=1;break;
	}
	//}
};
//键盘弹起事件
function onkeyup(event){
	//if(hero.live==1){
		
	if(event.keyCode == 65){//a
		key.a=0;
	}else if(event.keyCode == 68){//d
		key.d=0;
	}
	if(event.keyCode == 87){//w
		key.w=0;
		//hero.retUpDown();
	}else if(event.keyCode == 83){//s
		key.s=0;
		//hero.retUpDown();
	}
	
	
	if(event.keyCode == 75){
		key.k=0;
	}
	
	if(event.keyCode == 76){
		key.l=0;
	}
	
	//}
}


//游戏结束
function gameOver(){
	pause=1-pause;
	/*backLayer.die();
	backLayer.removeAllChild();
	backLayer.graphics.drawRect(1,"#000000",[0,0,LGlobal.width,LGlobal.height],true,"#000000");
	var txt = new LTextField();
	txt.color = "#ff0000";
	txt.size = 40;
	txt.text = "游戏结束";
	txt.x = (LGlobal.width - txt.getWidth())*0.5;
	txt.y = 200;
	backLayer.addChild(txt);
	
	backLayer.addEventListener(LMouseEvent.MOUSE_UP,gameToStart);*/
}
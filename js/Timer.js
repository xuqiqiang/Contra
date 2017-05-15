function Timer(time){
	this.time=time;
	this.maxtime=time;
}

Timer.prototype.setTime = function (time){
	this.time=time;
};

Timer.prototype.run = function (){
	if(this.time<=0)
		return 1;
	else
		this.time-=30;
	return 0;
};

Timer.prototype.isReady = function (){
	if(this.time<=0)
		return 1;
	else
		return 0;
};

Timer.prototype.runLoop = function (){
	if(this.time<=0){
		this.time=this.maxtime;
		return 1;
	}else
		this.time-=30;
	return 0;
};
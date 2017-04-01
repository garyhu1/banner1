var datas = [
		{imgSrc:"img/timg1.jpg",targetSrc:"https://sale.jd.com/act/N58wisuTGyW.html?cpdad=1DLSUE"},
		{imgSrc:"img/timg2.jpg",targetSrc:"https://sale.jd.com/act/mj8frBQAuDeCPo.html?cpdad=1DLSUE"},
		{imgSrc:"img/timg3.jpg",targetSrc:"https://sale.jd.com/act/PbDeHkZQcKjIRCtW.html?cpdad=1DLSUE"},
		{imgSrc:"img/timg4.jpg",targetSrc:"https://jr.jd.com/buy/index?from=jdsj_04_101182&cpdad=1DLSUE"},
		{imgSrc:"img/timg1.jpg",targetSrc:"https://sale.jd.com/act/N58wisuTGyW.html?cpdad=1DLSUE"}
	];
	var pic = document.getElementById("pic");
	var list = document.getElementById("list");
function rubBanner() {
	function getBanner() {
		for (var i = 0; i < datas.length - 1; i++){
			var div = document.createElement('div');
			var li = document.createElement('li');
			if(i == 0){
				li.className = "active"
			}
			else{
				li.className = "";
			}
			div.innerHTML = '<a href="#">' + 
								'<img src="' + datas[i].imgSrc + '" />' + 
						    '</a>';
			li.innerHTML = i + 1;
			pic.appendChild(div);
			list.appendChild(li);
		};
	};
	getBanner();
	var box = document.getElementById("box");
	var imgs = document.querySelectorAll("#pic div img");
	var As  =document.querySelectorAll("#list li");
	pic.style.width = (imgs[0].offsetWidth)*datas.length + "px";
	var index = 0;
	setPic(index);
	//定义一个函数，依次播放图片;
	function autoPlay(){
		index++;
		if(index==As.length){
			index = 0;
			move(pic,"left",0);
		}
		setA(index);
		setPic(index);
	}
	var timer = setInterval(autoPlay,2000)	
	//封装一个函数改变下面a的状态
	function setA(ind) {
		for(var i = 0; i<As.length; i++){
			As[i].className = "";
		}
		As[ind].className = "active";
	}
	//换完图片，执行的函数
	function doSomething(ind) {
//		console.log((ind + 1) + ':' + datas[ind].targetSrc);
	}
	//封装一个函数做图片切换;
	function setPic(ind){
		move(pic,"left",-500*index,doSomething(ind));
	}		
	for(var i = 0; i<As.length; i++){
		As[i].index = i;
		As[i].onclick = function(){
			clearInterval(timer);
			index = this.index;
			setA(index);
			setPic(index);
			timer = setInterval(autoPlay,2000);
		}
	}
	box.onmouseenter = function () {
		clearInterval(timer);
	};
	box.onmouseleave = function () {
		clearInterval(timer);
		timer = setInterval(autoPlay,2000);
	};
	//封装一个函数，又来获取任意属性的任意值;
	function getStyle(Obj,property){
		if(window.getComputedStyle){
			return getComputedStyle(Obj,null)[property];
		}
		else{
			return Obj.currentStyle[property];
		}
	}	
	//封装一个函数，让任意属性做缓冲链式运动
	function move(dom,property,target,fn){
		clearInterval(dom.timer);
		dom.timer = setInterval(function(){
			if(property == "opacity"){
				var current = parseInt((getStyle(dom,property))*100);
			}
			else{
				var current = parseInt(getStyle(dom,property));
			}
			var speed = (target - current)/10
			if(speed > 0){
				speed = Math.ceil(speed);
			}
			else{
				speed = Math.floor(speed);
			}
			if(target == current){
				clearInterval(dom.timer);
				fn&&fn();
				return;
			}
			if(property == "opacity"){
				dom.style[property] = (current + speed)/100;
				dom.style.filter = "alpha(opacity=" + (current + speed) + ")";
			}
			else{
				dom.style[property] = current + speed + "px";
			}
		},20)
	}							
};
rubBanner();

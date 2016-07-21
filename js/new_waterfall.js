// box 列表 parent 列表父容器
function Waterfall(box,parent){
	this.box = box;
	this.parent = parent;
	this.init();
}

Waterfall.prototype = {
	// 根据 ID 获取对象
	$:function(id){
		return  typeof(id) === 'string' ? document.getElementById(id) : id;
	},
	// 根据 class获取元素列表 第二个参数可为空。
	getByClass:function(clsName,parent){
		var that = this;
		//存放全部元素的数组
		var eles = [];
		// 存放类名为 clsName的数组
		var arrEle = [];
		// 判断是否有父容器
		if(parent){
			var oParent  = that.$(this.parent);
			eles = oParent.getElementsByTagName('*');
		}else{
			eles = document.getElementsByTagName('*');
		};
		// 遍历获得的所有元素 取出来clsName的元素
		for (var i = 0; i < eles.length; i++) {
			if(eles[i].className == clsName){
				arrEle.push(eles[i]);
			}
		};
		return arrEle;
	},
	// 获取数组中最小的那个值的索引
	getMinIndex:function(arr,val){
		for (var i = 0; i < arr.length; i++) {
			if(arr[i] == val) return i;
		};
	},
	// 设置第一次加载时的页面样式
	setPage:function(){
		var that = this;
		var oParent = that.$(this.parent);
		var oBoxs = that.getByClass(this.box,this.parent);

		var pageWidth = document.documentElement.clientWidth || document.body.clientWidth;
		var oBoxW = oBoxs[0].offsetWidth;
		
		var cols = Math.floor(pageWidth/oBoxW);
		oParent.style.width = cols * oBoxW + 'px';
		// 存放第一行每列的高
		var arrH = [];
		for (var i = 0; i < oBoxs.length; i++) {
			if (i < cols) {
				arrH.push(oBoxs[i].offsetHeight)
			}else{
				var minH = Math.min.apply(null,arrH);
				var index = that.getMinIndex(arrH,minH);
				oBoxs[i].style.position = 'absolute';
				oBoxs[i].style.top = minH+'px';
				oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
				arrH[index]+=oBoxs[i].offsetHeight;
			}
		};
	},
	// 把 json 里面的数据读取出来塞到创建的元素中
	createEles:function(json){
		var that = this;
		var mainBox = that.$(this.parent);
		for (var i = 0; i < datInt.data.length; i++) {
			var oBox = document.createElement('div');
			oBox.className = 'box';
			mainBox.appendChild(oBox);
			var oPic = document.createElement('div');
			oPic.className = 'pic';
			oBox.appendChild(oPic);
			var oImg = document.createElement('img');
			oImg.src = 'images/'+datInt.data[i].src;
			oPic.appendChild(oImg);
		};
	},
	// 检测是否要加载数据
	// 最后一个 box的高度+自身出来一半的时候就要加载剩下的图片
	checkScrollSlide:function(){
		var that = this;
		var oParent = that.$(this.parent);
		var oBoxs = that.getByClass(this.box,this.parent);
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var pageHight = document.documentElement.clientHeight || document.body.clientHeight;
		// 最后一个 box的高度+自身的一半。
		var lastOboxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight/2)
		if(lastOboxH < scrollTop + pageHight){
			var that = this;
			that.createEles(datInt);
			that.setPage();
			// console.log(scrollTop);
		}
	},
	// 初始化
	init:function(){
		var that = this;
		that.setPage();
		window.onscroll = function(){
			that.checkScrollSlide();
		}
	}
}
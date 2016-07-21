window.onload = function(){
	waterfall('main','box');	
	
	var datInt = {'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};

	window.onscroll = function(){
		if(checkScrollSlide){
			// 将数据渲染到当面耍耍的尾部
			var oParent = document.getElementById('main');
			for (var i = 0; i < datInt.data.length; i++) {
				var obox = document.createElement('div');
				obox.className = 'box';
				oParent.appendChild(obox);
				var opic = document.createElement('div');
				opic.className = 'pic';
				obox.appendChild(opic);
				var oImg = document.createElement('img');
				oImg.src = 'images/'+ datInt.data[i].src;
				opic.appendChild(oImg);
			};
			waterfall('main','box');
		}
	}

};

function waterfall(parent,box){
	var oParent = document.getElementById(parent);
	var oBoxs = getByClass(oParent,box)		
	// 计算页面的列 
	var oBoxW = oBoxs[0].offsetWidth;
	var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
	// 设置 main 的宽度
	oParent.style.cssText = 'width:'+oBoxW * cols+ 'px;'+'margin:0 auto';
	// 存放每一列高度的数组
	var hArr = [];
	for (var i = 0; i < oBoxs.length; i++) {
		if(i < cols ){
			hArr.push(oBoxs[i].offsetHeight);
		}else{
			var minH = Math.min.apply(null,hArr);
			var index = getMinIndex(hArr,minH);
			oBoxs[i].style.position = 'absolute';
			oBoxs[i].style.top = minH+'px';
			oBoxs[i].style.left = oBoxW * index+'px';
			hArr[index]+=oBoxs[i].offsetHeight;
		}
	};

};
// 根据 class 获取 元素
function getByClass(parent,clsName){
	// 临时存储获取 class 为 className 的元素
	var boxArr = [];
	oElements = parent.getElementsByTagName('*');
	for (var i = 0; i < oElements.length ; i++) {
		if(oElements[i].className == clsName){
			boxArr.push(oElements[i]);
		}
	};
	return boxArr;
};
function getMinIndex(arr,val){
	for(var i in arr){
		if(arr[i] == val){
			return i;
		}
	}
};
// 判断是否到达加载数据的条件
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getByClass(oParent,'box');
	var lastBoxH = oBoxs[oBoxs.length-1].offsetTop+Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	return (lastBoxH < scrollTop+height)? true:false;
}

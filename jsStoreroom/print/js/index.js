$(function () {

	$( '#main' ).height( $( window ).height() - $( '#top' ).height() - 45);
	var FW = $( window ).width();
	var FH = $( '#main' ).height();
	var paper = $( '.paper' );
	for (var i = 0; i < paper.length; i++) {
		var obj = paper.eq(i);
		obj.css( {
			left : 100+i*50 + 'px',
			top : 100 + 'px'
		} );
		drag(obj, $( 'dt', obj ));
	}
	$("#main").css("HEIGHT: 490px");
	onKeyMove();
	
});
//快捷键操作
function onKeyMove(){
	document.onkeydown=function(event){
	    var e = event || window.event || arguments.callee.caller.arguments[0];
	    if(e && e.keyCode==38){ // 上
	    	allMove('up');
	    }
	    if(e && e.keyCode==40){ // 下
	    	allMove('down');
	    }            
	    if(e && e.keyCode==37){ // 左
	    	 allMove('left');
	    }
	    if(e && e.keyCode==39){ // 左
	    	 allMove('right');
	    }
	}; 
	
}

//整体移动
function allMove(flag){
	if(flag=="left"||flag=="right"){
		var tmpStr = flag=="left"?'-':'+';
		var paper = $( '.paper' );
		for (var i = 0; i < paper.length; i++) {
			var obj = paper.eq(i);
			var tmpLeft = obj.offset().left;
			obj.css( {
				left : eval("tmpLeft"+tmpStr+"10") + 'px',
			} );
		}
	}
	if(flag=="up"){
		var paper = $( '.paper' );
		for (var i = 0; i < paper.length; i++) {
			var obj = paper.eq(i);
			var tmpLeft = obj.offset().top;
			obj.css( {
				top : (tmpLeft-20) + 'px',
			} );
		}
	}
	if(flag=="down"){
		var paper = $( '.paper' );
		for (var i = 0; i < paper.length; i++) {
			var obj = paper.eq(i);
			var tmpLeft = obj.offset().top;
			obj.css( {
				top : (tmpLeft+1) + 'px',
			} );
		}
	}
}

//重新绑定事件
function bindEvent(){
	var paper = $( '.paper' );
	for (var i = 0; i < paper.length; i++) {
		var obj = paper.eq(i);
		drag(obj, $( 'dt', obj ));
	}
	
}
//显示数据
function alertMessage(){
	var paper = $( '.paper' );
	for (var i = 0; i < paper.length; i++) {
		var obj = paper.eq(i);
		 alert(obj[0].innerText+":"+obj[0].style.left+":"+obj[0].style.top);
	}
}
//打印指定div内容
function printMessage() {
    var newstr = $("#main").html();   
    var oldstr = $("body").html();
    $("body").html(newstr);
    window.print();
    $("body").html(oldstr);
    bindEvent();
    return false;
}

//打印页面预览
function printsetup() {
    var newstr = $("#main").html();   
    var oldstr = $("body").html();
    $("body").html(newstr);
	var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
    document.body.insertAdjacentHTML('beforeEnd', WebBrowser); 
    printpreview();
    $("body").html(oldstr);
    bindEvent();
}

function printpreview(){ 
	var HKEY_Root,HKEY_Path,HKEY_Key;   
	HKEY_Root="HKEY_CURRENT_USER";   
	HKEY_Path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";   
		
	　            try {   
		    		var Wsh=new ActiveXObject("WScript.Shell");   
					  HKEY_Key="header";   
					//设置页眉（为空）  
					  Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");   
					  HKEY_Key="footer";   
					//设置页脚（为空）  
					  Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"");   
					  HKEY_Key="margin_bottom";   
					//设置下页边距（0）  
					  Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0");   
					  HKEY_Key="margin_left";   
					//设置左页边距（0）  
					  Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0");   
					  HKEY_Key="margin_right";   
					//设置右页边距（0）  
					  Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0");   
					  HKEY_Key="margin_top";   
					//设置上页边距（8）  
					  Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"0"); 
					  WebBrowser1.ExecWB(7,1);
				 }   
				 catch(e){  
				    alert("不允许ActiveX控件");  
				 } 
} 

/**
* 元素拖拽
* @param  obj		拖拽的对象
* @param  element 	触发拖拽的对象
*/
function drag (obj, element) {
	var DX, DY, moving;

	element.mousedown(function (event) {
		obj.css( {
			zIndex : 1,
			opacity : 0.5,
 			filter : 'Alpha(Opacity = 50)'
		} );

		DX = event.pageX - parseInt(obj.css('left'));	//鼠标距离事件源宽度
		DY = event.pageY - parseInt(obj.css('top'));	//鼠标距离事件源高度

		moving = true;	//记录拖拽状态
	});

	$(document).mousemove(function (event) {
		if (!moving) return;

		var OX = event.pageX, OY = event.pageY;	//移动时鼠标当前 X、Y 位置
		var	OW = obj.outerWidth(), OH = obj.outerHeight();	//拖拽对象宽、高
		var DW = $(window).width(), DH = $(window).height();  //页面宽、高

		var left, top;	//计算定位宽、高

		left = OX - DX < 0 ? 0 : OX - DX > DW - OW ? DW - OW : OX - DX;
		top = OY - DY < 0 ? 0 : OY - DY > DH - OH ? DH - OH : OY - DY;

		obj.css({
			'left' : left + 'px',
			'top' : top + 'px'
		});

	}).mouseup(function () {
		moving = false;	//鼠标抬起消取拖拽状态

		obj.css( {
			opacity : 1,
 			filter : 'Alpha(Opacity = 100)'
		} );

	});
}

/**
 * 统计字数
 * @param  字符串
 * @return 数组[当前字数, 最大字数]
 */
function check (str) {
	var num = [0, 50];
	for (var i=0; i<str.length; i++) {
		//字符串不是中文时
		if (str.charCodeAt(i) >= 0 && str.charCodeAt(i) <= 255){
			num[0] = num[0] + 0.5;//当前字数增加0.5个
			num[1] = num[1] + 0.5;//最大输入字数增加0.5个
		} else {//字符串是中文时
			num[0]++;//当前字数增加1个
		}
	}
	return num;
}
 window.onload = function(){
  var menu = document.getElementById('rightMenu');
  document.documentElement.oncontextmenu = function(e){ // 自定义body元素的鼠标事件处理函数
    var e = e || window.event;
    e.preventDefault(); //阻止系统右键菜单 IE8-不支持
    // 显示自定义的菜单调整位置
    let scrollTop =
        document.documentElement.scrollTop || document.documentElement.scrollTop;// 获取垂直滚动条位置
    let scrollLeft =
        documen.documentElement.scrollLeft || document.documentElement.scrollLeft;// 获取水平滚动条位置
    menu.style.display = 'block';
    menu.style.left = e.clientX + scrollLeft + 'px';
    menu.style.top = e.clientY + scrollTop + 'px';
  }
  // 鼠标点击其他位置时隐藏菜单
  document.onclick = function(){
	  menu.style.display = 'none';
  }
}
	

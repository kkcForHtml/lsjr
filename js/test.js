define(function (require,exports,module) {
	require('jquery-1.11.3');
	var p = {
		_init:function () {
			p.easyslide();
			p.testShow();
		},
		easyslide:function () {       //侧边栏菜单
			$('.nav-top-item').click(function () {
				if ($(this).attr('data-flag')*1) {
					$('#main-nav').find('ul').animate({'height':'0'},500,function () {
						$(this).hide();
					});
					$(this).attr('data-flag',0);
				}else{
					$('#main-nav ul').show();
					$('#main-nav').find('ul').animate({'height':$('#main-nav ul li').length*39},500);
					$(this).attr('data-flag',1);
				}
			});			
		},
	}	
	module.exports = p
})

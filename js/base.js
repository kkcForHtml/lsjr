			//jquery拓展方法
			$.fn.extend({
			    arrayVal: function(){
			        var self = $(this);
			        var result = [];
			
			        if(self.length > 0){
			            self.each(function(i, o){
			                result.push($(o).val());
			
			            });
			
			        }
			        return result;			
			    },
			    arrayHtml: function(){
			        var self = $(this);
			        var result = [];
			
			        if(self.length > 0){
			            self.each(function(i, o){
			                result.push($(o).html());
			
			            });			
			        }
			        return result;
			
			    },
		        arrayChecked:function () {
		        	var self = $(this);
		        	var result = [];
		        	var str = '';
		        	if (self.length>0) {
		        		self.each(function (i,o) {
		        			if ($(o).prop('checked')) {
		        				result.push($(o).next().html());
		        				str+=$(o).next().html()+'|';
		        			}else{
		        				result.push('');
		        				str+=''+'|';
		        			}
		        		})
		        	}
		        	str = str.slice(0,str.length-1);
		        	return str;
		        }			    
			});			
			//日期模块
//			if (jeDate) {
//				jeDate({
//				    dateCell:"#regDate",
//				    format:"YYYY-MM-DD",
//				    isTime:false, 
//				})				
//			}			
			$(function () {
				//侧边菜单
				$('.nav-top-item').click(function () {
					$('#main-nav').find('ul').stop().slideToggle()
				});
				//判断用户是否登陆
				(function () {
					var  href = window.location.href
					if (href!=='http://www.mytask.com/index.html'&&href!=='http://www.mytask.com/html/Register.html') {
						var userFlag = sessionStorage.getItem('userName_lsjr');
						if (userFlag!=null) {
							var obj = JSON.parse(userFlag);
							$('.wel_info a').html('用户：'+obj.userName);
						}else{
							window.location.href = 'http://www.mytask.com/index.html';
						}					
						
					}
				})()
				//退出登录
//				var flag = true;
//				document.onkeydown = function () {
//					flag = false;
//				}
				$('.quit').click(function () {
					//if (flag) {
						//window.confirm('修改的内容还没保存确定要退出吗？');
						sessionStorage.removeItem('userName_lsjr');
						window.location.href = 'http://www.mytask.com/index.html';
					//}
				})
//				$('#main-nav ul li').click(function () {
//					$(this).addClass('current').siblings().removeClass('current')
//					var href = $(this).find('a').attr('data-href');
//					$('.main_content').load(href+'.html',function () {
//					})
//				})

		})
		//报错数据闪烁
		function errorTips (ele) {
			var x = 0,time;
			clearInterval(time);
			time = setInterval(function () {
				x++;
				x%2?ele.addClass('focusRed'):ele.removeClass('focusRed');
				x>5&&clearInterval(time);
			},250)
		}
		//数组去重
		function unique(arr) {
		  var ret = []
		  var hash = {}
		 
		  for (var i = 0; i < arr.length; i++) {
		    var item = arr[i]
		    var key = typeof(item) + item
		    if (hash[key] !== 1) {
		      ret.push(item)
		      hash[key] = 1
		    }
		  }
		 
		  return ret
		}		
		
		//显示加载
		function loading (flag) {
			flag?$('#loading').show():$('#loading').hide();
		}	
		
//获取url后面的参数，url为穿过来的链接，id为参数名
   function GetParam(url, id) {
            url = url+ "";
            regstr = "/(\\?|\\&)" + id + "=([^\\&]+)/";
            reg = eval(regstr);//eval可以将 regstr字符串转换为 正则表达式
            result = url.match(reg);//匹配的结果是：result[0]=?sid=22 result[1]=sid result[2]=22。所以下面我们返回result[2]

            if (result && result[2]) {
                return result[2];
            }
        }
   //关闭弹出窗口
   function closepop (ele) {
   		$(ele).parents('.bgbox').fadeOut();
   }
   //显示警告窗口
   function showWarning (txt) {
   		$('#warning').fadeIn().find('.font').html(txt);
   }
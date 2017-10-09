
'use strict';
jQuery(document).ready(function($) {
	var timer = null;
	var nums = 10;
	$('.get_btn').click(function(){
		$('.get_btn').attr('disabled',true);
	    $('.get_btn').text(nums+'s后重新获取');
		$('.get_btn').css({
			'backgroundColor':'#eaeaea',
			'color':'#797979'
		});
		timer = setInterval(doLoop,1000);

	})
	function doLoop(){
		nums--;
		if(nums>0){
			$('.get_btn').text(nums+'s后重新获取');
		}else{
			
			clearInterval(timer);
			
			$('.get_btn').attr('disabled',false);
			
			$('.get_btn').text('获取验证码');
			nums = 10;
			$('.get_btn').css({
			'backgroundColor':'#0d7af5',
			'color':'#fff'
		});
		}
	}


	var ok1 = false;
	var ok2 = false;

	$('form :input').blur(function(){
		if($(this).is('#zc_username')){
			var emial_y = /.+@.+\.[a-zA-Z]{2,4}$/.test($.trim(this.value));
			var tel_y = /^1[3|7|5|8]\d{9}$/.test($.trim(this.value));
			if($.trim(this.value) == '' || ($.trim(this.value) != "" && !(emial_y || tel_y) )
			 ) {
				$('.form_msg').show();
			}
			else{
	 			$('.form_msg').hide();
				ok1 = true;
			}
	
		}
		if($(this).is('#yzmVal')){
			if($.trim(this.value) == '' || ($.trim(this.value) != "" && !/\d{6}/.test($.trim(this.value)))){
				$('.yzm_get_msg').show();
			}else{
				$('.yzm_get_msg').hide();
				ok2 = true;
			}
		}
	}).keyup(function(){
		$(this).triggerHandler('blur');
		if(ok1 && ok2 ){
		$('.zc_btn').css('backgroundColor',' #0d7af5');
	}

	}).focus(function(){
		$(this).triggerHandler('blur');
	})
	
	$('.zc_btn').click(function(){
	
		if(ok1 && ok2){
			$('form').submit();
			alert('提交代码!');
			
		}else{
			
			return false;
		}
	})


});


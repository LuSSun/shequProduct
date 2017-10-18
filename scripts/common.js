(function($){
	'use strict';
	
	/*搜索框*/
	var searchBtn = $('.search_right .search');
	var formHide = $('.form-hide');
	var navTop = $('#com_navTop');
	var closeBtn = $('.form-hide .fa-close')
	searchBtn.click(function(){
		$(this).hide();
		navTop.hide()
		formHide.show().stop(true,false).animate({
			left:0
		}, 300)
		.find('.form_txt').focus();


	})
	closeBtn.click(function(){
		
		formHide.hide().stop(true,false).animate({
			left:100,
		}, 300)
		searchBtn.show();
		navTop.show();
	})
		
	/*回到顶部*/
		
	$("#sq_back").click(function(){
		$('body').animate({'scrollTop':0},500);
	});
	$(window).scroll(function(){
		var top = $(window).scrollTop();
		if(top>1000){
			$("#sq_back").stop(true,false).animate({'opacity':1}, 100);
		}
		else{
			$("#sq_back").stop(true,false).animate({'opacity':0}, 100);

		}
	});
	
})(jQuery)

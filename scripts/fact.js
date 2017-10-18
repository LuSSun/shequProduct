(function($){
	'use strict';
	jQuery(document).ready(function($) {
		
		/*banner*/
		 var swiper = new Swiper('.swiper-container',{
			autoplay:3000,
			speed:1000,
			autoplayDisableOnInteraction : false,
			loop:true,
			centeredSlides : true,
			slidesPerView:2,
	        pagination : '.swiper-pagination',
			paginationClickable:true,
			prevButton:'.swiper-button-prev',
	        nextButton:'.swiper-button-next',
			onInit:function(swiper){
				swiper.slides[2].className="swiper-slide swiper-slide-active";//第一次打开不要动画
				},
	        breakpoints: { 
	                668: {
	                    slidesPerView: 1,
	                 }
	            }
			});

		 /*返回顶部*/
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
		
		
		/*显示收藏，举报话题*/
		$('.stat_menu_btn').on('click',function(e){
			$(this).next('.stat_typic').show();
			$(document).one('click',function(){
				$('.stat_typic').hide();
			})
			e.stopPropagation();
		})
		$('.stat_typic').on('click','li',function(){
			$(this).parent().hide();
			return false;
			
		})

	 document.addEventListener('DOMContentLoaded', function () {
	      document.querySelector('.loader').className += 'loaded';
	    });

		/*瀑布流*/
		$(window).on('load',function(){
			var timer = null;
			
			timer = setTimeout(function(){
				$('.loader').hide();
				$('#mobile').show();
				waterFull();
			},300)
		})
		
		function waterFull(){
			var allBox = $('.com_content_box .list-group');
			var boxWidth = allBox.eq(0).outerWidth();
			console.log(boxWidth);
			var heigthArr = [];
			$.each(allBox,function(index,value){
				var boxHeight = allBox.eq(index).outerHeight();
				if(index<2){
					heigthArr[index] = boxHeight;
					$(value).css({
						'left':boxWidth*index,
						'top':0,
					});
				}else{
					var minBoxHeight = Math.min.apply(null,heigthArr);
					var minBoxIndex = $.inArray(minBoxHeight, heigthArr);
					$(value).css({
						'position':'absolute',
						'top':minBoxHeight,
						'left':minBoxIndex*boxWidth,
					})
					heigthArr[minBoxIndex]+=$(value).outerHeight();
				}
				$('.com_content_box').height(heigthArr[minBoxIndex])
			})
		}
	});
})(jQuery)



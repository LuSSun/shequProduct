(function($){
	'use strict';
	jQuery(document).ready(function($) {
		/*滚动条样式改变*/
		$(window).load(function(){
			$(".hot_slider").mCustomScrollbar({
				scrollButtons:{
					enable:true
				},
				theme:"dark-thick"
			});
		});

		/*大图轮播*/
		function slider_big(){
			
			var $aLi = $('.slider_btn li');
			var $slider_ul = $('.slider_inner .slider');
			var $slider_li = $('.slider_inner .slider').find('li');
			var timer = null;
			var index = 0;
			$aLi.mouseenter(function(){
				index = $(this).index();
				slider_img(index);
			})
			$slider_ul.hover(function(){
				if(timer){
					clearInterval(timer);
				}
				
			},function(){
				timer = setInterval(function(){
					slider_img(index);
					index++;
					if(index == $slider_li.length) {index = 0};
				},2000);
			})
			function slider_img(){
				var rollWith = $slider_li.outerWidth();
				$aLi.removeClass('active')
					.eq(index).addClass('active')
					.css({'opacity':1});
				$slider_ul.stop(true,false).animate({
					left: -rollWith*index
				},600);
			}
		}
		slider_big();

		/*体验模块轮播图*/
		function slider1(){
			var box= $('.box1_main');
			var slider1_ul = $('#sq_slider');
			var btnPrev = $('.cl_page .prev');
			var btnNext = $('.cl_page .next');
			var boxWidth = box.width();
			var index = 0;
			btnPrev.hide();
			btnPrev.click(function(){
				index--;
				showtiyanList(index);
				console.log(boxWidth*index);
				btnNext.show();
				if(index == 0){
					btnPrev.hide();
					return false;
				}
			});

			btnNext.click(function(){
				index++;
				showtiyanList(index)
				console.log(boxWidth*index);
				if(index ==2){
					btnNext.hide();
					return false;
				 }
				btnPrev.show();
				
			})
			function showtiyanList(index){
				slider1_ul.stop(true, false).animate({left:-boxWidth*index}, 400);
			}
		}
		slider1();
		/*查看更多*/
		function showMore(){
			var slider1_ul = $('#sq_slider');
			var $showBox = $('.show_more_box');
			var btnPrev = $('.cl_page .prev');
			var btnNext = $('.cl_page .next');
			var h = slider1_ul.height();
			var btn_page = $('.cl_page');
			$('#sq_content_close').hide();
			$('#change_show').click(function(){
				if($showBox.is(':hidden')){
					slider1_ul.hide();
					btn_page.hide();
					$showBox.slideDown(600,function(){
						$('#sq_content_close').show();
					});
					
				}else{
					slider1_ul.show(); 
					btn_page.show();
					$showBox.slideUp(600,function(){
						$('#sq_content_close').hide();
					});
					
				}
			})
		}
		showMore();

		/*最新社区体验区块 获取数据*/
		function getTiYanDate(){
				var counter = 0;
				var pageStart = 0;
				var pageSize = 8;
				getDate(pageStart,pageSize);

				$(document).on('click','#sq_content_close',function(){
					counter ++;
					pageStart = counter*pageSize;
					getDate(pageStart,pageSize);

				});
				function getDate(offset,size){
					$.ajax({
						type:'get',
						url:'data/data1.json',
						dataType:'json',
						success:function(response){
							var data =response.data;
							var sum = data.length;
							if((sum-offset)<size){
								size = sum-offset;
							}
							var str = '';
							for(var i=offset;i<(offset+size);i++){
								str +=`<li>
							          	<a href="#">
							          		<img src="${data[i].url}" alt="">
							          		<div class="txt">
							          			<h3>
							          				${data[i].title}
							          			</h3>
							          			<p>${data[i].txt}</p>
							          		</div>
							          	</a>
							          </li>`;
							}
							$('#show_more').append(str);			
							
							
							if((offset+size)>=sum ){
								$('#sq_content_close').hide();
							}
							else{
								// $('#sq_content_close').show();
							}
						},error:function(e){
							console.log(e)
						}
					})
				}
			}
		getTiYanDate();


		/*最新文章区块 获取数据*/
		function getArticleDate(){
			var counter = 0;
			var pageStart = 0;
			var pageSize = 5;
			var isEnd = false; /*结束标志*/
			var isAjax = false; 
			/*首次加载*/
			getDate(pageStart,pageSize);
			$(window).scroll(function(){
				if(isEnd == true || isAjax == true){
					return;
				}
				if($(document).height()-$(this).scrollTop()-$(this).height() < 100 ){
					counter ++;
					pageStart = counter*pageSize;
					getDate(pageStart,pageSize);
				}
				
			})

			function getDate(offset,size){
				isAjax = true;

				$.ajax({
					type:'get',
					url:'data/articleData.json',
					dataType:'json',
					success:function(response){
						isAjax =false;
						var data =response.article;
						var sum = data.length;

						if((sum-offset)<size){
							size = sum-offset;

						}
						var str = '';
						for(var i=offset;i<(offset+size);i++){
							str +=`<dl>
										<div class="artitle_author_date">
											<div class="perple">
												<a href="#"><img src="${data[i].headImg}" alt=""></a>
											</div>
											<div class="a">
												<h5 class="a_author">${data[i].name}</h5>
												<div class="a_h">
													<a href="#">周边</a>
												</div>
											</div>
											<div class="a_date">
												${data[i].time}
											</div>

										</div>
										<dd class="artitle_img">
											<a href="#">
												<img src="${data[i].MainImg}" alt="">
											</a>
										</dd>
										<dt>
											<a href="#" class="a_title">${data[i].title}</a>
										</dt>
										<dd class="artitle_summary">${data[i].subheading}</dd>
										<dd class="artitle_mmtre">
											<span class="a_good">${data[i].praise}</span>
											<span class="a_comment">${data[i].comment}</span>
										</dd>
									</dl>`;
						}
						$('.sq_box2_main').append(str);			
						// console.log(offset , size, sum);
						
						if((offset+size)>=sum ){
							
							$('.sq_box2_main').append('<p id="articleLoad">已经加载完毕!</p>')
							isEnd = true;
						}
						
					},error:function(e){
						console.log(e)
					}
				})
			}
		}
		getArticleDate();
		/*侧边栏轮播图*/
		function slider_small(){
			var scrollLi = $('#slider_small ul').find('li');
			var scrollUl = $('#slider_small ul');
			var imgWidth = scrollLi.width();
			var timer = null;
			var index = 0;
			$('.sd_a_page div').click(function(){
				index = $(this).index();
				slider2(index);
			})
			scrollUl.hover(function(){
				if(timer){
					clearInterval(timer);
				}
			},function(){
				timer =setInterval(function(){
					slider2(index);
					index++;
					if(index == scrollLi.length){index=0};
					
				},2000)
				
			})
			function slider2(index){
				$('.sd_a_page .p_list').removeClass('active')
					.eq(index).addClass('active')
					;
				scrollUl.stop(true,false).animate({left:-imgWidth*index}, 500);
			}
		}
		slider_small();
		/*社区精选吸顶*/
		function bb(){
			var $server = $('#server_option');
			var serverTop = $server.offset().top;
			var serverLeft = $server.offset().left;
			var sidebarLeft = $('.sidebar').offset().left;
			
			$(window).scroll(function(){
				
				var top = $(window).scrollTop();
				if(top > serverTop ){
					$server.css({
					 	position:'fixed',
					 	left:sidebarLeft,
					 	top:60,
					 });

					$('#footer').stop(true,false).animate({
	                    opacity:1,
	                    bottom:20,
					}, 1000)
				}else{
					$server.css({
					 	position:'relative',
					 	left:0,
					 	top:0
					 })

					$('#footer').stop(true,false).animate({
						position:'relative',
	                    opacity:0,
	                    bottom:0,
					}, 500)
				}
			})

		}	
		bb();

	});
})(jQuery)



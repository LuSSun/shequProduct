
'use strict';
jQuery(document).ready(function($) {
	/*社区板块*/

	/*搜索框*/
	function searchTop(){
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
	}
	searchTop();
		
	$("#recent-works").carouFredSel({
		prev:"#btn_prev",
		next:"#btn_next",
		auto:2000,
	
	});
	
	/*type tabs*/
	function typeTabs(){
		var $tabs = $('.type_sliderLlists');
		var $li = $tabs.find('.t_list');
		// var $li = $('.type_sliderLlists li');
		var content = $('.com_content_box');
		var conMore = $('#com_content .click_more');

		$li.click(function(){
			var index = $(this).index();
		 	content.eq(index).show().siblings('.com_content_box').hide();
		 	var type = $(this).data('type');
		 	getInfo(type,index);
		});
			$li.eq(0).trigger('click');
		function getInfo(type,index){
			$.ajax({
				type:'get',
				url:'data/data2.json',
				dataType:'json',
				success:function(response){
					var data =response.data;
					for(var i=0;i<data.length;i++){
						var result = data[i];
						var result = result[type];
						showData(result);
						

					}

				},error:function(e){
					console.log(e)
				}
			})

		}
		function showData(result){

			 var str ='';
			 	for(var i=0;i<result.length;i++){
			 		str +=`
				 			<ul class="list-group">
									<li class="list-group-item list-img">
										<a href="#" >
											<img src="${result[i].imgSrc}" alt="" class="img">
										</a>
									</li>
									<li class="list-group-item">
										<h3><a href="#">${result[i].title}</a></h3>
										<p>${result[i].txt}</p>
									</li>
									<li class="list-group-item list_bor">
										<div class="media_box clearfix">
											<div class="author_img_box">
												<a href="javascript:;" class="ss"><img src="${result[i].headSrc}"  alt="">
												<span class="name">${result[i].name}</span>
												</a>
												<div class="author_info_tk">
													<ul>
														<li>
															<a href="#" class="a_img"><img src="${result[i].headSrc}" alt=""></a>
															<h5 class="name">${result[i].name}</h5>
														</li>
														<li>
															<p class="email">111188238@qq.com</p>
														</li>
														<li>
															<div class="btn_left">关注</div>	
															<div class="btn_right">私信</div>	
														</li>
														<li>
															<div class="f">
																<b>1452</b>
																<span>粉丝</span>
															</div>
															<div class="gz">
																<b>254</b>
																<span>关注</span>
															</div>
														</li>
														<li>
															<div class="t_border">
																<div class="box_topic">
																	<b>19</b>
																	<span>话题</span>
																</div>
																<div class="box_node">
																	<b>20</b>
																	<span>帖子</span>
																</div>
															</div>
															
														</li>
													</ul>
												</div>
											</div>
											<time>${result[i].date}</time>
											<h5 class="type_h5"><a href="#" class="">${result[i].type}</a></h5>
										</div>
										
									</li>
									<li class="list-group-item ">
										<div class="list-start clearfix">
											<a href="#" class="heart">
												<i class="fa fa-heart" aria-hidden="true"></i>
													${result[i].praise}
											</a>
											<a href="#" class="commenting">
												<i class="fa fa-commenting" aria-hidden="true"></i>
												${result[i].comment}
											</a>
										</div>
										
									</li>

								</ul>
								
				 			`;
			 	}
			 	content.html(str);

		}
	}
	typeTabs();

	function hoverShow(){
		
		$('body').on('mouseenter','.author_img_box',function(){
			
			$(this).children('.author_info_tk').stop(true,false).fadeIn(400);
			
		}).on('mouseleave','.author_img_box',function(){
			$(this).children('.author_info_tk').stop(true,false).fadeOut(400);
		});
		
	}
	hoverShow();

	/*回到顶部*/
	function backTop(){
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
	}
	backTop();




});
	


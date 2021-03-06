


//preloading for page
$(window).on('load', function() { // makes sure the whole site is loaded 
	var status = $('#status');
	var preloader = $('#preloader');
	var body = $('body');

	//Bmob.initialize("Application ID", "REST API Key");
    Bmob.initialize("36af5f94e9d89174b8fed8de91741696", "085807aa3c443b7e5cb5332158aa7172");
	var user_movies = Bmob.Object.extend("users_movies");
	var query = new Bmob.Query(user_movies);
	query.containedIn("userId", ["106"]);
	query.find().then(res => {
		loves = res[0].get('love');
		utoi_movies = res[0].get('utoi_movies');
		itoi_movies = res[0].get('itoi_movies');
		explore_movies = res[0].get('explore');
		var MoviesDB = Bmob.Object.extend("movies");
		var query_2 = new Bmob.Query(MoviesDB);
		movies = loves.concat(utoi_movies,itoi_movies,explore_movies);
		query_2.containedIn("movieId", movies);
		query_2.find().then(res => {
			lov = new Array();
			utoi = new Array();
			itoi = new Array();
			exp = new Array();

			for (var i = 0; i < res.length; i++){
				if (loves.includes(res[i].get("movieId")))
				{
					lov.push(res[i]);
				}
				else if (utoi_movies.includes(res[i].get("movieId")))
				{
					utoi.push(res[i]);
				}
				else if (itoi_movies.includes(res[i].get("movieId")))
				{
					itoi.push(res[i]);
				}
				else
				{
					exp.push(res[i]);
				}
			}

			var data = "";
			for (var i = 0; i < lov.length; i++) {
				data = data + "<div class='movie-item' ><div  class='mv-img' ><a href='#'><img src='" + lov[i].get("poster");
				data = data + "' alt='' width='228' height='352'></a></div><div class='title-in'><div class='cate'>";
				data = data + "<span class='blue'>Sci-fi</span>";
				data = data + "</div><h6>" + lov[i].get("name");
				data = data + "</h6><p><i class='ion-android-star'></i><span>";
				data = data + lov[i].get("ratingValue") + "</span> /10</p></div></div>"
			}
			document.getElementById("multiItemSliderDiv").innerHTML = data;

			var u_i = "";
			for (var i= 0; i < utoi.length; i++){
				u_i = u_i + "<div class='slide-it'><div class='movie-item'><div class='mv-img'><img src='";
				u_i = u_i + utoi[i].get("poster");
				u_i = u_i + "' alt='' width='185' height='284'></div> <div class='hvr-inner'><a  href='moviesingle.html'> Read more <i class='ion-android-arrow-dropright'></i> </a></div><div class='title-in'><h6><a href='#'>";
				u_i = u_i + utoi[i].get("name");
				u_i = u_i + "</a></h6><p><i class='ion-android-star'></i><span>";
				u_i = u_i + utoi[i].get("ratingValue");
				u_i = u_i + "</span> /10</p></div></div></div>";
			}
		
			document.getElementById("utoiDiv").innerHTML = u_i;

			var i_i = "";
			for (var i= 0; i < itoi.length; i++){
				i_i = i_i + "<div class='slide-it'><div class='movie-item'><div class='mv-img'><img src='";
				i_i = i_i + itoi[i].get("poster");
				i_i = i_i + "' alt='' width='185' height='284'></div> <div class='hvr-inner'><a  href='moviesingle.html'> Read more <i class='ion-android-arrow-dropright'></i> </a></div><div class='title-in'><h6><a href='#'>";
				i_i = i_i + itoi[i].get("name");
				i_i = i_i + "</a></h6><p><i class='ion-android-star'></i><span>";
				i_i = i_i + itoi[i].get("ratingValue");
				i_i = i_i + "</span> /10</p></div></div></div>";
			}
			document.getElementById("itoiDiv").innerHTML = i_i;		
			
			var e_e = "";
			for (var i= 0; i < exp.length; i++){
				e_e = e_e + "<div class='slide-it'><div class='movie-item'><div class='mv-img'><img src='";
				e_e = e_e + exp[i].get("poster");
				e_e = e_e + "' alt='' width='185' height='284'></div> <div class='hvr-inner'><a  href='moviesingle.html'> Read more <i class='ion-android-arrow-dropright'></i> </a></div><div class='title-in'><h6><a href='#'>";
				e_e = e_e + exp[i].get("name");
				e_e = e_e + "</a></h6><p><i class='ion-android-star'></i><span>";
				e_e = e_e + exp[i].get("ratingValue");
				e_e = e_e + "</span> /10</p></div></div></div>";
			}
			//alert('1');
			document.getElementById("exploreDiv").innerHTML = e_e;	
			status.fadeOut(); // will first fade out the loading animation 
			preloader.delay(0).fadeOut('fast'); // will fade out the white DIV that covers the website. 
			body.delay(0).css({'overflow':'visible'});
			var vidDefer = document.getElementsByTagName('iframe');
			for (var i=0; i<vidDefer.length; i++) {
				if(vidDefer[i].getAttribute('data-src')) {
					vidDefer[i].setAttribute('src',vidDefer[i].getAttribute('data-src'));
				} 
			}
			$(function(){
				'use strict';
				// js for dropdown menu
			
				var windowWidth = $(window).width();
				if(windowWidth > 1024){
					var dropdown = $( '.dropdown');
					dropdown.hover(
						function(){
							$(this).children('.dropdown-menu').fadeIn(300);
						},
						function(){
							$(this).children('.dropdown-menu').fadeOut(300);
						}
					);	   
				}else{
					var dropdownClick = $('.navbar a.dropdown-toggle');
					dropdownClick.on('click', function(e) {
						var $el = $(this);
						var $parent = $(this).offsetParent(".dropdown-menu");
						var $open = $('.nav li.open');
						$(this).parent("li").toggleClass('open');
			
						if(!$parent.parent().hasClass('nav')) {
							$el.next().css({"top": $el[0].offsetTop, "left": $parent.outerWidth() - 4});
						}
						$open.not($(this).parents("li")).removeClass("open");
						return false;
					});
				}
				//js for nav icon 
				var clickMenubtn = $('#nav-icon1');
				clickMenubtn.on('click', function(){
					$(this).toggleClass('open');
				});
				//js for tabs
				var tabsClick = $('.tabs .tab-links a, .tab-links-2 a, .tab-links-3 a');
				var multiItem = $('.slick-multiItem');
				var multiItem2 = $('.slick-multiItem2');
				tabsClick.on('click', function(e)  {
					var currentAttrValue = $(this).attr('href');
					var tabsCurrent = $('.tabs ' + currentAttrValue);
					// Show/Hide Tabs
					tabsCurrent.show().siblings().hide();
					// Change/remove current tab to active
					$(this).parent('li').addClass('active').siblings().removeClass('active');
					e.preventDefault();
					//reset position for tabs
					multiItem.slick('setPosition');
					multiItem2.slick('setPosition');
				});
				// js for time count down
				function getTimeRemaining(endtime) {
				  var t = Date.parse(endtime) - Date.parse(new Date());
				  var seconds = Math.floor((t / 1000) % 60);
				  var minutes = Math.floor((t / 1000 / 60) % 60);
				  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
				  var days = Math.floor(t / (1000 * 60 * 60 * 24));
				  return {
					'total': t,
					'days': days,
					'hours': hours,
					'minutes': minutes,
					'seconds': seconds
				  };
				}
				function initializeClock(id, endtime) {
				  var clock = document.getElementById(id);
				  if( clock != null){
					var daysSpan = clock.querySelector('.days');
					var hoursSpan = clock.querySelector('.hours');
					var minutesSpan = clock.querySelector('.minutes');
					var secondsSpan = clock.querySelector('.seconds');
					var updateClock = function() {
					var t = getTimeRemaining(endtime);
			
					daysSpan.innerHTML = t.days;
					hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
					minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
					secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
			
					if (t.total <= 0) {
					  clearInterval(timeinterval);
					}
				  }
				  updateClock();
				  var timeinterval = setInterval(updateClock, 1000);
				  }
				}
				var deadline = new Date(Date.parse(new Date()) + 25 * 24 * 60 * 60 * 1000);
				initializeClock('clockdiv', deadline);
			
				//js for twitter
				var tweets = jQuery(".tweet");
				jQuery(tweets).each( function( t, tweet ) { 
				var id = jQuery(this).attr('id');
				twttr.widgets.createTweet(
				  id, tweet, 
				  {
					conversation : 'none',    // or all
					cards        : 'hidden',  // or visible 
					linkColor    : 'default', // default is blue
					theme        : 'light'    // or dark
				  });
				}); 
			
				//slider for movie and tv show home 2
				multiItem2.slick({
					infinite: true,
					slidesToShow: 6,
					slidesToScroll: 6,
					arrows: false,
					// autoplay: true ,
					// autoplaySpeed: 2000,
					dots: true,
					responsive: [
					{
					  breakpoint: 1200,
					  settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
				});
				//slider movie and tv show home 1, 3
				multiItem.slick({
					infinite: true,
					slidesToShow: 4,
					slidesToScroll: 4,
					arrows: false,
					draggable:true,
					// autoplay: true,
					// autoplaySpeed: 2000,
					dots: true,
					responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
				});
				//main slider home 1
				var multiItemSlider = $('.slick-multiItemSlider');
				multiItemSlider.slick({
					infinite: true,
					slidesToShow: 4,
					slidesToScroll: 4,
					arrows: false,
					draggable:true,
					autoplay: true,
					autoplaySpeed: 2000,
					dots: true,
					responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 2,
						slidesToScroll: 2
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					}
				  ]
				});
				//slider for home v3 and home v2, twitter slider home 1, 2
				var singleItem = $('.slider-single-item');
				singleItem.slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: true,
					// autoplay: true,
					// autoplaySpeed: 2000,
					dots: true,
					draggable:true,
					responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: true,
						arrows: true
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					  }
					}
				  ]
				});
				//slider for tweeter
				var slickTw = $('.slick-tw');
				slickTw.slick({
					infinite: true,
					slidesToShow: 1,
					slidesToScroll: 1,
					// autoplay: true,
					// autoplaySpeed: 2000,
					dots: true,
					draggable:true,
					arrows: false,
					responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						infinite: true,
						dots: true,
						arrows: false
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
			
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: false,
					  }
					}
				  ]
				});
				//for home v3
				var slidefor = $('.slider-for');
				var slidenav = $('.slider-nav');
				slidefor.slick({
				  slidesToShow: 1,
				  slidesToScroll: 1,
				  arrows: false,
				  fade: true,
				  asNavFor: '.slider-nav',
				});
				slidenav.slick({
				  slidesToShow: 5,
				  slidesToScroll: 1,
				  asNavFor: '.slider-for',
				  dots: true,
				  // centerMode: true,
				  focusOnSelect: true,
			
				  responsive: [
					{
					  breakpoint: 1024,
					  settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						arrows: true
					  }
					},
					{
					  breakpoint: 768,
					  settings: {
						slidesToShow: 3,
						slidesToScroll: 3
					  }
					},
					{
					  breakpoint: 480,
					  settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
						arrows: true
					  }
					}
				  ]
				});
				//for trailer v1 and 2
				var slidefor2 = $('.slider-for-2');
				var slidenav2 = $('.slider-nav-2');
				slidefor2.slick({
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					fade: true,
					asNavFor: '.slider-nav-2',
				});
				slidenav2.slick({
					slidesToShow: 3,
					slidesToScroll: 1,
					asNavFor: '.slider-for-2',
					dots: false,
					arrows: true,
					// centerMode: true,
					focusOnSelect: true,
					vertical: true,
					// autoplay: true,
					// autoplaySpeed: 2000
				});
				//== js for video lightbox
				var fancyboxmedia = $('.fancybox-media');
				fancyboxmedia.fancybox({
					openEffect  : 'float',
					closeEffect : 'none',
					helpers : {
						media : {},
						overlay: {
							locked: false
						}
					}
				});	
				//==js for show prev/next button in video lightbox
				fancyboxmedia
					.attr('rel', 'playlist')
					.fancybox({
					openEffect: 'none',
					closeEffect: 'none',
					prevEffect: 'none',
					nextEffect: 'none',
					helpers: {
						media: {}
					},
					youtube: {
						autoplay: 1,
						hd: 1,
						wmode: 'opaque', // shows X to close
						vq: 'hd720' // default 720p hd quality
					}
				});
				//== js for image lightbox
				var imglightbox = $(".img-lightbox");
				imglightbox.fancybox({
					helpers: {
						title : {
							type : 'float'
						},
						overlay: {
							locked: false
						}
					}
				});
				//== js for visibile next/prev fancybox
				imglightbox.fancybox({
					// loop: false, // gallery may not be cyclic 
					afterShow: function () {
						// initialize some variables
						var gallerySize = this.group.length,
							next, prev;
						if (this.index == gallerySize - 1) {
							// this is the last element of the gallery so next is the first
							next = imglightbox.eq(0).attr("title"),
							prev = imglightbox.eq(this.index - 1).attr("title");
						} else if (this.index == 0) {
							// this is the first image of the gallery so prev is the last
							next = imglightbox.eq(this.index + 1).attr("title"),
							prev = imglightbox.eq(gallerySize - 1).attr("title");
						} else {
							// otherwise just add or substract to index
							next = imglightbox.eq(this.index + 1).attr("title"),
							prev = imglightbox.eq(this.index - 1).attr("title");
						}
						// set title attributes to img-lightbox next/prev selectors
						var lightboxnext = $(".img-lightbox-next");
						var lightboxprev = $(".img-lightbox-prev");
						lightboxnext.attr("title", next);
						lightboxprev.attr("title", prev);
					}
				});
				//==js for login and sign up
				var loginLink = $(".loginLink");
				var signupLink = $(".signupLink");
				var loginct = $( "#login-content" );
				var signupct= $("#signup-content");
				var loginWrap = $(".login-wrapper");
				var overlay = $(".overlay");
				loginWrap.each( function(){
					$(this).wrap('<div class="overlay"></div>')
				});
				//pop up for login form
				loginLink.on('click', function(event){
					event.preventDefault();
					loginct.parents(overlay).addClass("openform");
					$(document).on('click', function(e){
					var target = $(e.target);
					if ($(target).hasClass("overlay")){
							$(target).find(loginct).each( function(){
								$(this).removeClass("openform");
							});
							setTimeout( function(){
								$(target).removeClass("openform");
							}, 350);
						}	
					});
				});
				//pop up for signup form
				signupLink.on('click', function(event){
					event.preventDefault();
					signupct.parents(overlay).addClass("openform");
					$(document).on('click', function(e){
					var target = $(e.target);
					if ($(target).hasClass("overlay")){
							$(target).find(signupct).each( function(){
								$(this).removeClass("openform");
							});
							setTimeout( function(){
								$(target).removeClass("openform");
							}, 350);
						}	
					});
				});
				// close popup for mobile
				var closebt = $(".close");
				   closebt.on('click', function(e){
					e.preventDefault();
					var overlay = $(".overlay");
					overlay.removeClass("openform");
				});	
				//js for multi selected
				var multiselect = $(".ui.fluid.dropdown");
				multiselect.dropdown({
					allowLabels:true
				})
				multiselect.dropdown({'set selected': 'Role1,Role2'});
				//== scroll function for single page
				$(window).scroll(function(event) {
					/* Act on the event */
					var scrollPos = $(window).scrollTop(),
					header = $('header');
					//sticky for menu
					if(scrollPos > 300){
						header.addClass('sticky');
					}else{
						header.removeClass('sticky');
					}
				});		
				//back to top js
				var backtotop = $('#back-to-top');
				backtotop.on('click', function (e) {
					e.preventDefault();
					$('html,body').animate({
						scrollTop: 0
					}, 700);
				});
			
			   // scroll down landing page
				var scrolldownlanding = $('#discover-now');
				scrolldownlanding.on('click', function (e) {
					e.preventDefault();
					$('html,body').animate({
						scrollTop: $(document).height()-$(window).height()
					}, 700);
				});
			
				//sticky sidebar
				if(windowWidth > 1200){
					var stickySidebar = $('.sticky-sb');
					var mainCt = $('.main-content');
					if (stickySidebar.length > 0) {	
						var stickyHeight = stickySidebar.height(),
						sidebarTop = stickySidebar.offset().top;
					}
					// on scroll move the sidebar
					$(window).scroll(function () {
					  if (stickySidebar.length > 0) {	
						var scrollTop = $(window).scrollTop();
								
						if (sidebarTop < scrollTop) {
						  stickySidebar.css('top', scrollTop - sidebarTop+ 80);
			
						  // stop the sticky sidebar at the footer to avoid overlapping
						  var sidebarBottom = stickySidebar.offset().top + stickyHeight,
							stickyStop = mainCt.offset().top + mainCt.height();
						  if (stickyStop < sidebarBottom) {
							var stopPosition = mainCt.height() - stickyHeight + 130;
							stickySidebar.css('top', stopPosition);
						  }
						}
						else {
						  stickySidebar.css('top', '0');
						} 
					  }
					});
					$(window).resize(function () {
					  if (stickySidebar.length > 0) {	
						stickyHeight = stickySidebar.height();
					  }
					});
				}
				// $(window).on('load',function() {
			
				// });
			
			});

	  });	  	

	});     
	//setTimeout(test(), 1000);

	
})


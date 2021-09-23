	//Extend Remove Class

		var oRemoveClass = $.fn.removeClass;
		$.fn.removeClass = function () {
		    for (var i in arguments) {
		        var arg = arguments[i];
		        if ( !! (arg && arg.constructor && arg.call && arg.apply)) {
		            arg();
		            delete arg;
		        }
		    }
		    return oRemoveClass.apply(this, arguments);
		}


//Page Specific Functions

LOADJS = { 
  fire : function(func,funcname, args){
    var namespace = callPageJS;

    funcname = (funcname === undefined) ? 'init' : funcname;
    if (func !== '' && namespace[func] && typeof namespace[func][funcname] == 'function'){
      namespace[func][funcname](args);
    }
  }

};

$(document).ready(function(){

	var pageId = $('.page').get(0).id;

	LOADJS.fire(pageId);

	LOADJS.fire('common');

});

/////////////////////Namespaces/////////////////////

callPageJS = {
	common : {
		init : function(eh){

		//Menu Behavior

		var multiBurger = $("#hamburger"),
			field = window.innerWidth,
			newField,
			fieldY = window.innerHeight,
			newFieldY,
			menuWrapper = $('#side_menu_wrapper'),
			navParent = $('nav'),
			navHeight = navParent.height(),
			mainWrapper = $('.main_content'),
			loadedInner = $('.loaded_inner'),
			state,
			switchOver = gsap.timeline(),
			loadReady = false,
			pageId,
			loadTimeout,
			pageContainer = document.querySelector('.main_content'),
			body = $('body'),
			swiper_arr = '.swiper',
			lockBody = function(state){

			if( state == 'lock' ){

				$('body').addClass('locked');
	
			} else if (state == 'unlock') {

				$('body').removeClass('locked');

			};

		};

		multiBurger.on("click", function(e){

			state = 'lock';

			if ( !navParent.hasClass('scroll') && !navParent.hasClass('home') ){

				mainWrapper.css('paddingTop', '55px');

			}

			menuWrapper.css('height', fieldY);

			navParent.addClass('active');

			$('.bar').addClass('active');

			menuWrapper.fadeIn(300).addClass("active");

			lockBody(state);

			e.stopPropagation();

			closeMenu();

		});

		function closeMenu(){

			state = 'unlock';

			if ( multiBurger.hasClass('active') ){

				navParent.removeClass('active');

				multiBurger.removeClass('active');

				$('.bar').removeClass('active');

				menuWrapper.fadeOut(500, function(){
					menuWrapper.removeClass("active")
				});

				lockBody(state);

				if ( !navParent.hasClass('scroll') && !navParent.hasClass('home') ){

					mainWrapper.css('paddingTop', 'unset');

				}

			} else if (field < 1150) {
				multiBurger.addClass('active');
			}

		}

		var newPageOffset = 0,
				pageOffset,
				isScrolling;

		window.addEventListener('scroll', function(e){

			pageOffset = window.pageYOffset;

			if( !$('body').hasClass('locked') && !($('#filter_section').hasClass('active')) && field < 1150 ){

				if (document.body.scrollTop > 50 | document.documentElement.scrollTop > 50) {

					showNav();

				} else if (document.body.scrollTop < 50 | document.documentElement.scrollTop < 50 ) {

					hideNav();

				}
	
			}

		}, false);


		function showNav(){

			if ( !mainWrapper.hasClass('fullHeight') ){
				mainWrapper.css('paddingTop', '55px');
			}

			navParent.addClass('scroll');

		}


		function hideNav(){

			if ( !mainWrapper.hasClass('fullHeight') ){
				mainWrapper.css('paddingTop', 'unset');
			}

			navParent.removeClass('scroll');

		}

		// Single Page Behavior

		var num = 0;

		$('body').on('click', '.internal', router);

		function router(e){

			e.preventDefault();
			e.stopPropagation();

			var mainUrl = $(this).attr('href'),
					page = checkUrl(mainUrl);

			if(mainUrl == window.location.pathname){
				closeMenu();
				return;
			}

			loadPage(mainUrl, page);

			loadReady = true;

			if (window.history.pushState){
				window.history.pushState(null, null, mainUrl);
			}

		};

		window.addEventListener("popstate", function popstateListener(e) {

			var mainUrl = e.currentTarget.location.pathname,
					page = checkUrl(mainUrl);

			loadReady = false;

	    loadPage(mainUrl, page);

		});

		function checkUrl(link){

			if(link == '/' || link == '/about/'){
				return true;
			} else{
				return false
			}

		}

		function verifyLink(linkElem){

			if (linkElem.origin != window.location.origin){
				return true;
			}

		}

		setLinkState();

		function setLinkState(){

			$('a').each(function(){

				if ( verifyLink(this) ){

					$(this).addClass('external');

				} else if ( $(this).get(0).id !== 'arrow_left' && $(this).get(0).id !== 'arrow_right') {

					$(this).addClass('internal');

				}
				
			});

		}

		function loadPage(mainUrl, page){

			if (loadReady == true){
				return;
			}

			$('body').addClass('loadingImg');

			if ( multiBurger.hasClass('active') ){
				closeMenu();
			}

			$(window).animate({scrollTop: 0});

			loadedInner.fadeOut(300, function(){

				loadedInner.remove();

			});

			if( mainWrapper.hasClass('fullHeight') ){

				gsap.set(body, {duration: .1, backgroundColor: '#151515'});

			}

			switchOver.to(pageContainer, {duration: .75, ease: "steps.out", autoAlpha: '0', onComplete: pageJax, onCompleteParams: [mainUrl, page]});

		};

		function pageJax(mainUrl, page){

				mainWrapper.load(mainUrl + " .loaded_inner", function (response, status, xhr) {

			        if (status == "error") {

			        	window.location.href = mainUrl;

			        } else {

			        	if( !page && mainWrapper.hasClass('fullHeight') ){

									mainWrapper.removeClass('fullHeight');

									navParent.removeClass('home');

									$('#wwf_logo').removeClass('fill_change');

									$('#menu_wrapper').removeClass('fill_change');

									switchOver.to(body, {duration: .75, backgroundColor: '#ffffff'});

								} else if (page) {

									mainWrapper.addClass('fullHeight');

									navParent.addClass('home');

									$('#wwf_logo').addClass('fill_change');

									$('#menu_wrapper').addClass('fill_change');

									

								}

								//Remove delegated event handlers

								$('body').off('click');

								$(document).off('keydown');

								switchOver.to(pageContainer, {duration: .75, delay:.25, ease: "steps.out", autoAlpha: '1',});

			        	passNewPage(mainUrl, page);

							}
				 });

		}

		function passNewPage(mainUrl, page){

				loadReady = false;

				$('body').removeClass('loadingImg');

				$('body').on('click', '.internal', router);

				$('body').on('click', 'button', function(e){
						e.stopPropagation;
						$(this).addClass('btnActive');

					$('button').not($(this)).removeClass('btnActive');

					});

				$('body').find('.swiper').each(function(){

				if ($(this)){

					swiper_arr = $(this)[0];
					
					initializeSwiper(swiper_arr);

				}

				}

				)

				pageId = $('.page').get(0).id;

				LOADJS.fire(pageId);

				setLinkState();

				loadedInner = $('.main_content').find('.loaded_inner');

				var videoTest = document.getElementsByTagName('video');

				if (videoTest){

					for (var i = 0; i < videoTest.length; i++){

						videoTest[i].play();

					}

				}
				
			}

		// Carousel Swiper

		initializeSwiper(swiper_arr);

		function initializeSwiper(swiper_arr){

			if(!swiper_arr){
				return;
			}

			var swiper = new Swiper(swiper_arr, {

				direction: 'horizontal',
				loop: false,
				navigation: {
				nextEl: '.arrow_right',
				prevEl: '.arrow_left'
				},
				cssMode: false,
				slidesPerView: 'auto'

			});

			$('.arrow_left').hide();

			swiper.on('slideChange', function(){

				if (swiper.activeIndex > 0) {

						$('.arrow_left').show();
						$('.arrow_right').show();

				} else if (swiper.activeIndex = 0) {

						$('.arrow_left').hide();
						$('.arrow_right').show();

				} 

			});

			swiper.on('reachEnd', function(){

				console.log($('.arrow_right'))

				$('.arrow_left').show();
				$('.arrow_right').css('display', 'none');

			});

}


		//Accents

		var homeNav = document.querySelector('nav.home');

		$('body').on('click', 'button', function(e){
			e.stopPropagation;
			$(this).addClass('btnActive');

		$('button').not($(this)).removeClass('btnActive');

		});

		$('.menu_links li:last-child').addClass('last');

		//Get Element Height

		// var innerHeight,
		// 		calculatedHeight,
		// 		windowHeight = window.innerHeight,
		// 		field = window.innerWidth;

		// 	function getElemHeight(elem){

		// 		elem.removeAttribute('style');

		// 		var storedStyle = getComputedStyle(elem),
		// 				storedHeight = parseInt(storedStyle.height),
		// 				marPad = parseInt(storedStyle.paddingTop) + parseInt(storedStyle.paddingBottom) + parseInt(storedStyle.marginTop) + parseInt(storedStyle.marginBottom);
				
		// 		innerHeight = storedHeight - marPad;

		// 		return innerHeight;

		// 	}

		// 	//Onload, set VH elements to viewport height

		// 	windowHeight = window.innerHeight;

		// 	storeVHeight(windowHeight);

		// 	function storeVHeight(windowHeight){

		// 		var viewportCached = document.getElementsByClassName('viewportFixed');
		
		// 		for (var i = 0; i < viewportCached.length; i++){

		// 			innerHeight = getElemHeight( viewportCached[i] );

		// 			calculatedHeight = windowHeight - innerHeight;

		// 			calculatedWindowHeight = windowHeight - calculatedHeight;

		// 			viewportCached[i].removeAttribute('style');
		
		// 			viewportCached[i].style.height = calculatedWindowHeight + 'px';
		
		// 		}
		// 	}

		// //Detect if device supports orientation change

		// var supportsOrientationChange = "onorientationchange" in window,
  //   		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

  //   window.addEventListener(orientationEvent, function(){

  //   		windowHeight = window.innerHeight;
			
		// 		storeVHeight(windowHeight);

  //   }, false);

    //On vertical resize (if window width has changed, too), adjust element height

		$(window).resize( function(){

			// newField = window.innerWidth;
			// newFieldY = window.innerHeight;

			// if( newField != field && newFieldY != fieldY ){

			// 	windowHeight = window.innerHeight;
			
			// 	storeVHeight(windowHeight);

			// }

			field = window.innerWidth;

			if ( multiBurger.hasClass('active') && newField != field && newFieldY != fieldY ){

					closeMenu();

				}

		});

		//Lightbox

		// $('body').on('click', '.abs_target', openLightbox);

		// var lightboxWrapper = $('.abs_wrapper'),
		// 		lightboxInner = document.querySelector('.lightbox_container'),
		// 		lightboxXit = $('.lightbox_xit');

		// function openLightbox(l){

		// 	l.preventDefault();

		// 	if( !$(this).hasClass('loadingImg') ){

		// 		var imageElem = $(this)[0].outerHTML;

		// 		lightboxInner.innerHTML = imageElem;

		// 		hideNav();

		// 		$('body').addClass('locked');

		// 		lightboxWrapper.fadeIn(300).addClass('active');

		// 	} else {
		// 		return;
		// 	}

		// };

		// lightboxXit.on('click', closeLightbox );

		// function closeLightbox(){

		// 	showNav();

		// 	console.log('click')

		// 	$('body').removeClass('locked');

		// 	lightboxWrapper.fadeOut(300).removeClass('active');

		// 	lightboxInner.innerHTML = '';

		// }

		}

	},

index : {
	init : function(eh){

		var o = $('.overlay'),
			abs = $('.abs_filter'),
			bodyWrapper = $('.inner_content'),
			indexContainer = $('#index_container'),
			filterContainer = $('#filter_section'),
			xit = $('.filter_xit'),
			container = $('.tag'),
			material_container = $('.material_tag'),
			process_container = $('.process_tag'),
			year_container = $('.year_tag'),
			m = $('.page_header.projects'),
			all = $('.all'),
			tagBtn = $('.filter_option'),
			filterTag = $('.tag'),
			activeTag = $('.active_tag'),
			activeTagLabel = $('.active_tag>label'),
			filterProjects = document.getElementsByClassName('project'),
			filterLength = filterProjects.length,
			navParent = $('nav'),
			lockBody = function(state){

				if( state == 'lock' ){

					$('body').addClass('locked');
		
				} else if (state == 'unlock') {

					$('body').removeClass('locked');

				};

			};

		tagBtn.on('click', function(){

			function openFilterMenu(){

				var fromTop = filterContainer.offset().top - 70;

				if( !o.hasClass('active') ){

					// m.addClass('grey_under');

					gsap.to(indexContainer, {duration: .4, autoAlpha: '0'});

					navParent.css('visibility', 'hidden');

					$(window).animate({scrollTop: fromTop}, function(){

						filterContainer.addClass('active');

						state = 'lock';

						lockBody(state);

						abs.fadeIn(300).addClass('active');

						o.fadeIn(300).addClass('active');

					});

				}

			}

			if ( $(this).hasClass('material') ){

				container.not(material_container).css('display', 'none');

				material_container.css('display', 'block');

				openFilterMenu()

			} else if( $(this).hasClass('process') ){

				container.not(process_container).css('display', 'none');

				process_container.css('display', 'block');

				openFilterMenu()

			} else if ( $(this).hasClass('year') ) {

				container.not(year_container).css('display', 'none');

				year_container.css('display', 'block');

				openFilterMenu()

			} else if ( $(this).hasClass('all') ) {

				removeTag($('.project'));

				all.removeClass('active');

				$('.project').addClass('filtered');

				closeFilterWindow();

			}

		});

	function closeFilterWindow(){

				container.fadeOut(300);

				o.fadeOut(300).removeClass('active', resetFilterMenu);

				function resetFilterMenu(){

					abs.css('display', 'none').removeClass('active');

					filterContainer.removeClass('active', function(){

					gsap.to(indexContainer, {duration: .5, autoAlpha: '1'});

					// m.removeClass('grey_under');

					navParent.css('visibility', 'visible');


				}).attr('style', '');
				}

				state = 'unlock';
				lockBody(state);

		}

	function showActiveTag(tag, attribute){

		tag.find('.active_tag').addClass('active').children('.active_tag_inner').find('label').text(attribute);

		all.children('svg').find('text').text(attribute);

	}

	function removeTag(tag){

		tag.each(function(){

			$(this).find('.active_tag').removeClass('active').children('.active_tag_inner').find('label').text();

		});
		
	}

		xit.on('click', function(){

			if( o.hasClass('active') ){

				$('.project').addClass('filtered');

				all.removeClass('active');

				closeFilterWindow();

			}

		});

		filterTag.on('click', function (e){

			all.addClass('active');

			var filterAttr = $(this).attr('data-filter'),
					filterText = $(this).text();

			for (var i = 0; i < filterProjects.length; i ++ ){

				var projectAttr = filterProjects[i].getAttribute('data-filter');

				showActiveTag($(filterProjects[i]), filterText);

				if( projectAttr.includes(filterAttr) ){

					filterProjects[i].classList.add('filtered');

				} else {

					filterProjects[i].classList.remove('filtered');

				}

			}

			closeFilterWindow();

		});

		if(window.location.hash){

		  var getHash = window.location.hash,
		 			removeHash = getHash.replace('#', ''),
		 			hashSelect;

		 			filterTag.each(function(){

		 				if ( $(this).hasClass(removeHash) ){

		 					$(this).trigger('click');

		 				}

		 			history.replaceState(null, null, ' ');

		 	});

		}

	}

},

gallery : {
init : function(eh){

 //On load, get prev, current, next

	var info = document.querySelector('.right_justified_partial'),
			currentThumbs = info.querySelectorAll('.thumbnail'),
			activateThumb = function(currentThumbs, slideCount){

				for(var thumbs = 0; thumbs < currentThumbs.length; thumbs++){

				currentThumbs[thumbs].classList.remove('btnActive');

				}

				var thumbContainer = currentThumbs[slideCount].parentElement,
						thumbPosition = currentThumbs[slideCount].offsetLeft,
						thumbContainerWidth = thumbContainer.offsetWidth,
						thumbWidth = currentThumbs[0].offsetWidth,
						thumbsWidth = thumbWidth*currentThumbs.length + currentThumbs.length*20;
						scrollPosition = (thumbPosition/thumbsWidth * thumbsWidth - 10);

				thumbContainer.scroll(scrollPosition, 0);

				currentThumbs[slideCount].classList.add('btnActive');

			},
			field = window.innerWidth,
			fieldY = window.innerHeight;

	var pageContainer = document.querySelector('.main_content'),
			parent = document.querySelector('#slide_container'),
			current = document.querySelector('#main_slide'),
			currentUrl = current.getAttribute('data-url'),
			currentInner = current.innerHTML,
			arrows = document.querySelectorAll('.arrow'),
			arrowSet = Array.prototype.slice.call(arrows),
			arrowPrev = document.querySelector('#arrow_left'),
			arrowNext = document.querySelector('#arrow_right'),
			slideAreaContainer = document.querySelector('.project_slide'),
			slideID = slideAreaContainer.getAttribute("data-project"),
			totalPages = slideAreaContainer.getAttribute('data-total'),
			p,
			n,
			d,
			trigger,
			anim,
			currentPage = window.location.pathname,
			loadUrl,
			loadState = false,
			isVideo = false,
			navReset = true,
			frag = document.createDocumentFragment(),
			a = document.createElement('div'),
			b = document.createElement('div'),
			c = document.createElement('div'),
			projectSlide,
			lazySlide,
			projectSlideArr = [],
			range = [],
			aInfo = document.createElement('div'),
			bInfo = document.createElement('div'),
			cInfo = document.createElement('div'),
			slideCount = 0,
			removeAnim = function(){
				parent.classList.remove('animating');
			},
			anim1,
			anim2,
			currentSlide = {
				slide: undefined,
				get prop(){ 
					return this.slide;
				},
				set prop(nextSlide){
					nextSlide.classList.add('draggable');
					this.slide = nextSlide;
				}
			},
			animAll = function (p1, l1, p2, l2, addSlide, currentThumbs, slideCount, swiper, d){

				currentSlide.prop.classList.remove('draggable');

				currentSlide.prop = p2;

				if(!swiper){
					anim1 = gsap.to(p1, {duration: d, ease: "steps.out", transform: 'translate(' + l1 +')'});
				} else {
					anim1 = gsap.fromTo(p1, {transform: 'translate(' + swiper +'px)'}, {duration: d, ease: "steps.out", transform: 'translate(' + l1 +')'});
				}
					anim2 = gsap.to(p2, {duration: d, ease: "steps.out", transform: 'translate(' + l2 +')', onComplete: addSlide.bind(null, currentThumbs, slideCount)});

			},
			switchOver = gsap.timeline(),
			swiper = false,
			createProjectSlides = function(currentThumbs){
				
				for(var thumbs = 0; thumbs < currentThumbs.length; thumbs++){

					projectSlide = document.createElement('div');

					lazySlide = document.createElement('img');

					lazySlide.classList.add('hide');

					projectSlide.classList.add('slide', 'loadingImg', 'abs_target');

					frag.append(projectSlide);

					if (thumbs > 0){

						projectSlide.style.backgroundImage = 'url(' + currentThumbs[thumbs].getAttribute('data-url') + ')';

						projectSlide.append(lazySlide);

						lazySlide.src = currentThumbs[thumbs].getAttribute('data-full');

					}

					replaceWithCache(projectSlide, lazySlide);

					projectSlide.style.transform = 'translate(' + positionC + ')';

					projectSlideArr.push(projectSlide);

					projectSlideArr[0].classList.add('hide');

				}

				b.parentNode.insertBefore(frag, b.nextElementSibling);

				slideCount = 0;

				activateThumb(currentThumbs, slideCount);

				return slideCount;

			},
			playMain =  function (container, video){

					video.play();

					container.classList.remove('loadingImg');

			},
			lazyLoad = function (info){

				var thumbs = info.querySelectorAll('.thumbnail'),
						temp = info.querySelectorAll('.temp'),
						i,
						t;

				for (i = 0; i < thumbs.length; i++){

					var t = thumbs[i],
							thumbBGattr = t.getAttribute('data-url'),
							cachedImg = document.createElement('img');

					cachedImg.classList.add('hide', 'temp');
					cachedImg.style.display = 'none';

					frag.append(cachedImg);

					if( !t.classList.contains('video') ){

							cachedImg.src = thumbBGattr;

							replaceWithCache(t, cachedImg)

						} else {

							var thumbVid = t.querySelector('video'),
									thumbVidSrc = thumbVid.querySelector('source'),
									thumbVidattr = thumbVidSrc.getAttribute('data-url');

							thumbVidSrc.setAttribute('src', thumbVidattr);

							playMain(t, thumbVid);

						}

				}

				document.querySelector('.thumbnails').appendChild(frag);

			},
			replaceSlide,
			slideUrl,
			slideJax = function (replaceSlide, slideInfo, slideUrl) {

				$.ajax({
					
					url: slideUrl,
					dataType: 'text',
					success: function (stored){

						var cleanedStoredImg = stored.replace(/<img\b[^>]*>/ig, ''),
								cleanedStoredLink = cleanedStoredImg.replace(/<link\b[^>]*>/ig, ''),
								tempStored = $(document.createElement('div')).append(cleanedStoredLink),
								storedInfo,
								storeTransition,
								tempHTML;

						tempStored.find('link').remove();

						tempHtml = tempStored.html();

						var temp = document.createElement('div');

						document.querySelector('body').appendChild(temp).style.display = 'none';

						temp.innerHTML = tempHtml;

						getArrowStates(replaceSlide, temp);

						var mainslideObj = temp.querySelector('#main_slide');

						if ( !mainslideObj.classList.contains('video') ){

							var	storedFeatured = mainslideObj.getAttribute('data-url'),
									cachedImg = document.createElement('img');

							cachedImg.classList.add('hide', 'temp');

							replaceSlide.appendChild(cachedImg).style.display = 'none';

							cachedImg.src = storedFeatured;

							replaceWithCache(replaceSlide, cachedImg);

						} else {

							var storedFeaturedVideo = mainslideObj.innerHTML;

							replaceSlide.innerHTML = storedFeaturedVideo;

							replaceSlide.classList.add('video', 'loadingImg');

							replaceSlide.querySelector('video').pause();

						}

						storedInfo = temp.querySelector('.right_justified_partial').innerHTML;
						slideInfo.innerHTML = storedInfo;
						// storedTransition = temp.querySelector('')

						info.classList.remove('loadingImg');

						temp.remove();

					},
						error: function(xhr, status, error) {
						console.error(xhr, status, error);
						window.location.href = slideUrl;
					}

				})},
				replaceWithCache = function(container, cached){

					cached.onload = function(){

						var cachedSrc = cached.src;

						cached.remove();

						container.style.backgroundImage = "url(" + cachedSrc + ")"

						container.classList.remove('loadingImg');

					}
				},
				getArrowStates = function(slide, temp){

					var	arrowLeftTemp = temp.querySelector('#arrow_left'),
							arrowRightTemp = temp.querySelector('#arrow_right'),
							arrowLeftState,
							arrowRightState,
							storedID = temp.querySelector('.project_slide').id,
							transID = storedID.replace( / +/g, '-' ).toLowerCase();

					if ( arrowLeftTemp && arrowRightTemp ){

						arrowLeftState = arrowLeftTemp.getAttribute('href');
						arrowRightState = arrowRightTemp.getAttribute('href');

						slide.setAttribute( 'data-arrow-left', arrowLeftState );
						slide.setAttribute( 'data-arrow-right', arrowRightState );
 
					} else if ( arrowLeftTemp == undefined && arrowRightTemp  ) {

						arrowRightState = arrowRightTemp.getAttribute('href');

						slide.setAttribute( 'data-arrow-left', '/gallery/page/' + totalPages + '/' );
						slide.setAttribute( 'data-arrow-right', arrowRightState );

					} else if ( arrowRightTemp == undefined && arrowLeftTemp ) {

						arrowLeftState = arrowLeftTemp.getAttribute('href');

						slide.setAttribute( 'data-arrow-left', arrowLeftState );
						slide.setAttribute( 'data-arrow-right', '/gallery/' );

					}

					slide.setAttribute('data-id', transID);

				},
			setArrowStates = function(b){
				var leftArrow = b.getAttribute('data-arrow-left'),
						rightArrow = b.getAttribute('data-arrow-right');

				arrowPrev.setAttribute('href', leftArrow);
				arrowNext.setAttribute('href', rightArrow);

			},
			leftArrowHtml = "<a id='arrow_left' href='/gallery/page/" + totalPages + "/' class='arrow menu_item icon left arrow_nav'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>",
			rightArrowHtml = "<a id='arrow_right' href='/gallery/' class='arrow menu_item icon right arrow_nav'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>";

	//Position Rules

	var positionB = b.offsetLeft,
			positionA = ((field/(positionB - field)*100)-10).toString() + '%',
			positionC = ((field/(positionB + field)*100)+10).toString() + '%',
			positionProjectSlide = ((field/(positionB + field)*100)+10).toString() + '%';

	a.style.transform = 'translate(' + positionA + ')';
	c.style.transform = 'translate(' + positionC + ')';

	function createChildren(){

		parent.appendChild(a).classList.add('slide', 'loadingImg', 'abs_target');
		a.appendChild(aInfo).classList.add('hide'), a.setAttribute('data-arrow-left',''), a.setAttribute('data-arrow-right','');

		if (current.classList.contains('video')){

				parent.appendChild(b).classList.add('slide', 'video', 'abs_target');

				//Featured Video

				b.innerHTML = currentInner;

				isVideo = true;

		} else {

			parent.appendChild(b).classList.add('slide', 'abs_target');

			//Featured Image

			b.style.backgroundImage = 'url("' + currentUrl + '")'

		}

		b.appendChild(bInfo).classList.add('hide'), b.setAttribute('data-arrow-left',''), b.setAttribute('data-arrow-right','');

		bInfo.innerHTML = info.innerHTML;

		parent.appendChild(c).classList.add('slide', 'loadingImg', 'abs_target');
		c.appendChild(cInfo).classList.add('hide'), c.setAttribute('data-arrow-left',''), c.setAttribute('data-arrow-right','');

		createProjectSlides(currentThumbs);

		currentSlide.prop = b;

	}

	//Set onload state

	loadNeighbor();

	function loadNeighbor(){

	    while (parent.firstChild) {

	        parent.removeChild(parent.firstChild);

	    }

	  	currentThumbs[slideCount].classList.add('btnActive');

	    createChildren();

	    var info = document.querySelector('.right_justified_partial');

	    lazyLoad(info);

		//Slide ID

		slideAreaContainer.setAttribute('data-project', slideID );

		animateSlides(d, loadUrl, slideCount, swiper, range);

		loadState = true;

	}

	//Check for prev or next slides

	function verifyNeighbors() {

		if ( arrowPrev && arrowNext ){

			p = arrowPrev.getAttribute('href');

			n = arrowNext.getAttribute('href');

		} else if ( arrowPrev !== undefined && arrowNext == undefined ) {

			var replaceNext =  document.createElement('a');

			document.querySelector('#directional_arrows').appendChild(replaceNext);

			replaceNext.outerHTML = rightArrowHtml;

			arrowNext = $('#arrow_right').get(0);

			p = arrowPrev.getAttribute('href');

			n = '/gallery/';

		} else if ( arrowPrev == undefined && arrowNext !== undefined ){

			var replacePrev = document.createElement('a');

			document.querySelector('#directional_arrows').appendChild(replacePrev)

			replacePrev.outerHTML = leftArrowHtml;

			arrowPrev = $('#arrow_left').get(0);

			p = '/gallery/page/' + totalPages + '/';

			n = arrowNext.getAttribute('href');

		}

	}

	//Trigger Slide Change

	$('body').on('click', checkTrigger);

	function checkTrigger(r){

		if(r.target.classList.contains('arrow') && !(info.classList.contains('loadingImg')) ){

			r.preventDefault();

			triggerChange(r.target);

		}

		return false;
	}

	function triggerChange(arrow){

		if (arrow == arrowPrev){

			range = [];

			d = 'prev';

			slideCount--

			loadUrl = $('#arrow_left').prop('href')

		} else if ( arrow == arrowNext){

			if ( (slideCount+1) == projectSlideArr.length){

						range.push(projectSlideArr[slideCount]);

						slideCount = projectSlideArr.length;

			} else {
				slideCount++
			}

			d = 'next';

			loadUrl = $('#arrow_right').prop('href')

		} else if (arrow.classList.contains('left') && arrow != arrowPrev){

			for (var i = 0;i < slideCount + 1; i++){
				range.push(projectSlideArr[i]);
			}

			range.reverse();

			d = 'prev';

			loadUrl = $('#arrow_left').prop('href');

			slideCount = -1;

		} else if (arrow.classList.contains('right') && arrow != arrowNext){

			for (var i = slideCount;i < projectSlideArr.length; i++){
				range.push(projectSlideArr[i]);
			}

			d = 'next';

			loadUrl = $('#arrow_right').prop('href')

			slideCount = projectSlideArr.length;

		}

		loadState = false;

		animateSlides(d, loadUrl, slideCount, swiper, range);

	}

	function animateSlides(d, loadUrl, slideCount, swiper, range){

		verifyNeighbors();

		if ( loadState == false && d && loadUrl && !(info.classList.contains('loadingImg')) ){

			if( d == 'prev' && slideCount > 0){

				animAll(projectSlideArr[slideCount + 1], '110%', projectSlideArr[slideCount], '0%', activateThumb, currentThumbs, slideCount, swiper, '.35');
			
			} else if (d == 'prev' && slideCount == 0) {

				animAll(projectSlideArr[slideCount + 1], '110%', b, '0%', activateThumb, currentThumbs, slideCount, swiper,'.35');

			} else if (d == 'next' && slideCount === 1 && projectSlideArr.length !== slideCount) {

				animAll(b, '-110%', projectSlideArr[slideCount], '0%', activateThumb, currentThumbs, slideCount, swiper, '.35');

			} else if (d == 'next' && slideCount < projectSlideArr.length) {

				animAll(projectSlideArr[slideCount - 1], '-110%', projectSlideArr[slideCount], '0%', activateThumb, currentThumbs, slideCount, swiper, '.35');

			} else if (d == 'prev' || d == 'next' && slideCount < 0 || slideCount >= projectSlideArr.length) {

				if (window.history.pushState){

					window.history.pushState(null, null, loadUrl);

				}

				info.classList.add('loadingImg');

				if(cInfo.children.length == 0 || aInfo.children.length == 0){

					window.location.href = loadUrl;
					
				}

				if ( d == 'prev'){
					switchOver.set(pageContainer, {WebkitMaskPosition: '100%, 0%'});
					switchOver.set(pageContainer, {WebkitMaskImage: 'linear-gradient(to left, rgba(255,255,255,1) 70%, rgba(255,255,255, 0)'});
					switchOver.to(pageContainer, {duration: .5, ease: "steps.out", WebkitMaskPosition: '-100%, 0%', onComplete: beginSwitchover});
					switchOver.set(pageContainer, {WebkitMaskImage: 'linear-gradient(to right, rgba(255,255,255,1) 70%, rgba(255,255,255, 0))'});
					switchOver.set(pageContainer, {WebkitMaskPosition: '200%, 0%',});
					switchOver.to(pageContainer, {duration: .75, ease: "steps.out", WebkitMaskPosition: '0%, 0%'});
					// switchOver.to(slideAreaContainer, {duration: 0, ease: "steps.out", transform: 'translate(-100%)'});
					// switchOver.to(slideAreaContainer, {duration: .65, ease: "steps.out", transform: 'translate(0%)'});

					function beginSwitchover(){
							range.push(b);
							for(var r = 0; r < range.length; r++){
								range[r].style.visibility = 'hidden';
							}
							animAll(b, '110%', a, '0%', replacePrev, currentThumbs, slideCount, swiper, '0');
					}

					function replacePrev () {

						for(var r = 0; r < range.length; r++){
							range[r].style.visibility = 'visible';
						}

						for (var i = 0; i < projectSlideArr.length; i++){
							projectSlideArr[i].remove();
						}

						projectSlideArr = [];

						info.innerHTML = aInfo.innerHTML;

						currentThumbs = info.querySelectorAll('.thumbnail');

						createProjectSlides(currentThumbs);

						lazyLoad(info);

						c.remove();

						c = b, cInfo = bInfo;

						b = a, bInfo = aInfo;

						a = document.createElement('div');

						a.style.transform = 'translate(-110%)';

						aInfo = document.createElement('div');

						a.appendChild(aInfo).classList.add('hide');

						aInfo.classList.add('hide');

						parent.insertBefore(a, b).classList.add('slide', 'loadingImg', 'abs_target');

						setArrowStates(b);

						parent.classList.remove('animating');

						if(b.classList.contains('video')){

							var mainVideo = b.querySelector('video');

							playMain(b, mainVideo);

						}

						getNextP(a, aInfo);
						
					}

				} else {

					switchOver.set(pageContainer,  {WebkitMaskPosition: '0%, 0%'});
					switchOver.set(pageContainer, {WebkitMaskImage: 'linear-gradient(to right, rgba(255,255,255,1) 70%, rgba(255,255,255, 0))'});
					switchOver.to(pageContainer, {duration: .5, ease: "steps.out", WebkitMaskPosition: '200%, 0%', onComplete: beginSwitchover});
					switchOver.set(pageContainer, {WebkitMaskImage: 'linear-gradient(to left, rgba(255,255,255,1) 70%, rgba(255,255,255, 0)'});
					switchOver.set(pageContainer, {WebkitMaskPosition: '-100%, 0%'});
					switchOver.to(pageContainer, {duration: .75, ease: "steps.out", WebkitMaskPosition: '100%, 0%'});
					// switchOver.to(slideAreaContainer, {duration: 0, ease: "steps.out", transform: 'translate(100%)'});
					// switchOver.to(slideAreaContainer, {duration: .45, ease: "steps.out", transform: 'translate(0%)'});

					function beginSwitchover(){

						range.push(b);
						for(var r = 0; r < range.length; r++){
							range[r].style.visibility = 'hidden';
						}

						range.push(b);
						animAll(b, '-110%', c, '0%', replaceNext, currentThumbs, slideCount, swiper, '0');

					}

					function replaceNext(){

						for(var r = 0; r < range.length; r++){
							range[r].style.visibility = 'visible';
						}

						for (var i = 0; i < projectSlideArr.length; i++){
							projectSlideArr[i].remove();
						}

						projectSlideArr = [];

						info.innerHTML = cInfo.innerHTML;

						currentThumbs = info.querySelectorAll('.thumbnail');

						slideCount = 0;

						createProjectSlides(currentThumbs);

						lazyLoad(info);

						a.remove();

						a = b, aInfo = bInfo;

						b = c, bInfo = cInfo;

						c = document.createElement('div');

						c.style.transform = 'translate(110%)';

						cInfo = document.createElement('div');

						c.appendChild(cInfo).classList.add('hide');

						cInfo.classList.add('hide');

						b.parentNode.insertBefore(c, b.nextElementSibling).classList.add('slide', 'loadingImg', 'abs_target');

						setArrowStates(b);

						if( b.classList.contains('video') ){

							var mainVideo = b.querySelector('video');

							playMain(b, mainVideo);

						}

						getNextN(c, cInfo);

					}
				}
			}

		} else {

			if (p){

				replaceSlide = a;

				slideUrl = p;

				slideJax(replaceSlide, aInfo, slideUrl);
			}

			if (n){

				replaceSlide = c;

				slideUrl = n;

				slideJax(replaceSlide, cInfo, slideUrl);

			}

		}

	}

	function getNextP(a, aInfo){

		var pageP,
				intP,
				newP,
				prevPath,
				nextLast = totalPages - 1;

	 	if ( p == null) {

	 		prevPath = '/gallery/page/' + nextLast + '/';

	 	} else if ( p.match(/\d+/) == undefined ){

			prevPath = '/gallery/page/' + totalPages + '/';

		} else {

			pageP = p.match(/\d+/);

			intP = parseInt(pageP, 10)

			newP = intP - 1;

			if (newP <= 1 ){

				prevPath = '/gallery/'

			} else {

				prevPath = '/gallery/page/' + newP + '/'

			}

		}

		slideJax(a, aInfo, prevPath);

	}

	function getNextN(c, cInfo){

		var pageN,
			intN,
			newN,
			nextPath;

			if (n == null) {

				nextPath = '/gallery/page/2/'

			} else if ( n.match(/\d+/) == null ){

				nextPath = '/gallery/page/2/'

			} else {

				pageN = n.match(/\d+/);

				intN = parseInt(pageN, 10)

				newN = intN + 1;

				if ( newN > totalPages ) {

					nextPath = '/gallery/'

				} else {

					nextPath = '/gallery/page/' + newN + '/'

				}

			}

		slideJax(c, cInfo, nextPath);

	}

	//On directional key click, move slide

	$(document).keydown(function(e) {

	    switch (e.which) {
	        case 37:
	            e.preventDefault(), trans_slide('prev');
	            break;
	        case 39:
	            e.preventDefault(), trans_slide('next');
	            break;
	    }
	});

	// On swipe left or right, move slide

	var touchTimeout,
			swipedSlide,
			swipeCount = 0,
			longTouch,
			openLightBox = function(){
				parent.classList.add('fullHeight');
			};

	parent.ontouchstart = swipeSlide;
	parent.onmousedown = swipeSlide;

	function swipeSlide(e){

		if ( info.classList.contains('loadingImg') ) {
			return;
		}

		if (e.touches && e.touches.length > 1 || swipeCount > 0){
			endSwipe();
			return;
		}

		swipeCount++

		var swipeArea = e.target;

		swipeArea.moving = true;

		if (e.clientX){

			swipeArea.oldX = e.clientX;

		} else {

			swipeArea.oldX = e.touches[0].clientX;

		}

		swipeArea.onmousemove = swipeDrag;
		swipeArea.ontouchmove = swipeDrag;
	
		function swipeDrag(d){

			if(!swipeArea.moving){
				return;
			}

			longTouch = false;

			touchTimeout = setTimeout( function(){
				longTouch = true;
			}, 550)

			if (d.clientX){

				swipeArea.distX = d.clientX - swipeArea.oldX;

			} else {

				swipeArea.distX = d.touches[0].clientX - swipeArea.oldX;

			}

			currentSlide.prop.style.transform = 'translate(' + swipeArea.distX + 'px, 0px)';
 
		}

		swipeArea.onmouseup = function(end){
			var touchEvent = 'false'
			endSwipe(end, longTouch);
			return swipeArea.moving = false;
		};

		swipeArea.ontouchend = function(end){
			var touchEvent = 'true'
			endSwipe(end, longTouch)
			return swipeArea.moving = false;
		};

		parent.addEventListener("mouseleave", event => {

			if (swipeArea.moving == false){
				return;
			}

			event.stopPropagation();
			gsap.to(currentSlide.prop, {duration: .65, ease: "power2.in", transform: 'translate(0%)'});

			swipeArea.moving = false;

		});


		function endSwipe(end, longTouch){

			swipeCount = 0;

			window.clearTimeout(touchTimeout);

			if( (swipeArea.distX > 0 && swipeArea.distX > parent.offsetWidth/4 && longTouch) || (swipeArea.distX > 0  && swipeArea.distX > parent.offsetWidth/15 && longTouch == false)){

					trans_slide('prev', swipeArea.distX);

					return longTouch = false;

			} else if ( (-swipeArea.distX > 0 && -swipeArea.distX > parent.offsetWidth/4 && longTouch) || (-swipeArea.distX > 0 && -swipeArea.distX > parent.offsetWidth/15 && longTouch == false)) {

					trans_slide('next', swipeArea.distX);

					return longTouch = false;

			}



			currentSlide.prop.click();

			gsap.fromTo(currentSlide.prop, {transform: 'translate(' + swipeArea.distX + 'px)'}, {duration: .65, ease: "power2.in", transform: 'translate(0%)'});		

		}

	}

	function trans_slide(d, swiper){

		if ( info.classList.contains('loadingImg') ) {
			return;
		}

		loadState = false;

		if ( d == 'prev'){

			range = [];

			loadUrl = $('#arrow_left').prop('href');

			slideCount--

		} else {

			if ((slideCount+1) == projectSlideArr.length){

				range.push(projectSlideArr[slideCount]);

				slideCount = projectSlideArr.length;

			} else {

				slideCount++

			}

			loadUrl = $('#arrow_right').prop('href');

		}

		animateSlides(d, loadUrl, slideCount, swiper, range);

		arrowPrev = document.querySelector('#arrow_left');
		arrowNext = document.querySelector('#arrow_right');

	}

	//Thumbnail Gallery

	$('body').on('click', '.thumbnail', function(){

		range = [];

		var index = $(this).index();

		if (index < slideCount){

			for (var i = index;i < slideCount; i++){
				range.push(projectSlideArr[i]);
			}

			range.reverse();

		} else if (index > slideCount){

			for (var i = slideCount;i < index; i++){
				range.push(projectSlideArr[i]);
			}

		}

		if (!parent.classList.contains('animating') && index != slideCount){

			if (index == 0 && slideCount != 0){

				range.unshift(projectSlideArr[slideCount]);

				animAll(range, '110%', b, '0%', activateThumb, currentThumbs, index, swiper, '.35');

			} else if (slideCount == 0){

				range.unshift(b);

				animAll(range, '-110%', projectSlideArr[index], '0%', activateThumb, currentThumbs, index, swiper, '.35');

			} else if (index > slideCount && index > 0){

				range.unshift(projectSlideArr[slideCount]);

				animAll(range, '-110%', projectSlideArr[index], '0%', activateThumb, currentThumbs, index, swiper, '.35');

			} else if ( index < slideCount){

				range.unshift(projectSlideArr[slideCount]);

				animAll(range, '110%', projectSlideArr[index], '0%', activateThumb, currentThumbs, index, swiper, '.35');

			}

			slideCount = index;

		}

	});

}
},

about : {
init : function(eh){

var archiveElem = document.querySelectorAll('.archive_wrapper'),
		archive_tag = $('.archive_tag'),
		archive_nav_toggle = $('#archive_nav_toggle'),
		archive_nav_inner = $('.archive_nav_inner'),
		archive_nav_wrapper = $('#archive_nav_wrapper'),
		archive_nav_arr = [archive_nav_inner, archive_nav_toggle, archive_nav_wrapper],
		filter_anchor = $('.archive.inner_content').offset().top,
		scrollDuration = 400,
		currentSlideCount = $('#archive_current_slide');

for( a = 0; a < archiveElem.length; a ++){

	var slideScroller = new IntersectionObserver(

	  function ([e]) {

	  	var currentSlide = e.target.getAttribute('data-slide'),
	  		prevSlide = e.target.previousElmentSibling,
	  		nextSlide = e.target.nextElmentSibling;

	  	if (prevSlide){

	  		prevSlide.classList.toggle("slide_fade", e.intersectionRatio < 1);

	  	} else if (nextSlide){

	  		nextSlide.classList.toggle("slide_fade", e.intersectionRatio < 1);

	  	}

	  	var intSlide = parseInt(currentSlide);

	  	currentSlideCount.text(intSlide);

	   },
	  { threshold: [0.3] }

	);

	slideScroller.observe(archiveElem[a]);

}

archive_tag.on('click', function(){

	var scrollKey = $(this).attr('data-scroll'),
			archiveWrapper = $('.archive_wrapper'),
			archiveIndex = $(this).index()+1,
			scrollTarget = $("#" + scrollKey),
			scrollTo = scrollTarget.offset().top;

	scrollDuration = archiveIndex*350;

		$(window).animate({scrollTop: scrollTo}, scrollDuration);

	return scrollDuration;

});

archive_nav_toggle.on('click', function(){

	$(window).animate({scrollTop: filter_anchor}, scrollDuration)

});

}
},

contact : {
init : function(eh){
			//MAP

		var map = L.map('mapBox', {
		    center: [46.06362892338259, -118.36210206931129],
		    zoom: 13,
		    zoomControl: true
		  });   

		L.tileLayer('https://api.maptiler.com/maps/toner/{z}/{x}/{y}.png?key=UqsRtrg9BcWIXlx6LquC', {
			maxZoom: 20,
		//    mapbox://styles/mapbox/satellite-streets-v11
			accessToken: 'UqsRtrg9BcWIXlx6LquC'
		}).addTo(map);

		var markerIcon = L.icon({
			iconUrl: '/images/resources/location.svg',
			iconSize: [38, 95],
			iconAnchor: [0,5]
		});

	// var mapDataContainer = document.getElementsByClassName('mapData'),


	// 	for (var i = 0; i <){

	// 	}

		var locations = [
		  ["Main Campus", 46.06362892338259, -118.36210206931129],
		  ["Crating Facility", 46.07190026554796, -118.35182193896028],
		  ["Avery Facility", 46.05659416468007, -118.35979443478293],
		  ["Mold Facility", 46.07484264936125, -118.35028436010276]
		];

		for (var i = 0; i < locations.length; i++) {
		  marker = new L.marker([locations[i][1], locations[i][2]],{icon: markerIcon})
		    .bindPopup(locations[i][0])
		    .addTo(map);
		}
}
}
}
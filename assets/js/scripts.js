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
  }, 

  loadEvents : function(){

  	$('body').off('click');

  	$(window).off('scroll');

  	var idElem = document.querySelector('.page'),
    	bodyId = idElem.id;

    LOADJS.fire('common');

    LOADJS.fire(bodyId);

  }
};

$(document).ready(LOADJS.loadEvents);

/////////////////////Namespaces/////////////////////

callPageJS = {
	common : {
		init : function(){

		//Menu Behavior

		var multiBurger = $("#hamburger"),
			field = window.innerWidth,
			fieldY = window.innerHeight,
			menuWrapper = $('#side_menu_wrapper'),
			navParent = $('nav'),
			navHeight = navParent.height(),
			mainWrapper = $('.main_content'),
			loadedInner = $('.loaded_inner'),
			state,
			switchOver = gsap.timeline(),
			pageContainer = document.querySelector('.main_content'),
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

			} else {
				multiBurger.addClass('active');
			}

		}

		var newPageOffset = 0,
				pageOffset,
				isScrolling;

		window.addEventListener('scroll', function(e){

			pageOffset = window.pageYOffset;

			if( !$('body').hasClass('locked') && !($('#filter_wrapper').hasClass('active')) && field < 800 ){

				window.clearTimeout(isScrolling);

				if (document.body.scrollTop > 50 | document.documentElement.scrollTop > 50 && newPageOffset > pageOffset) {

					mainWrapper.css('paddingTop', '55px');
					navParent.addClass('scroll');

				} else if (document.body.scrollTop < 50 | document.documentElement.scrollTop < 50 || newPageOffset < pageOffset) {

					mainWrapper.css('paddingTop', 'unset');
					navParent.removeClass('scroll');

				}

				isScrolling = setTimeout( function(){

					newPageOffset = pageOffset;

				}, 66);

			}

		}, false);

		// Single Page Behavior

		$('body').on('click', '.internal', function(e){

			e.preventDefault();
			e.stopPropagation();

			var mainUrl = $(this).attr('href'),
				page = checkUrl(mainUrl);

			loadPage(mainUrl, page);

		});

		window.addEventListener("popstate", function popstateListener(e) {

			var mainUrl = location.pathname,
				page = checkUrl(mainUrl);

	    loadPage(mainUrl, page);

		});

		function checkUrl(link){

			if(link == '/'){
				return 'home';
			} else {
				return false;
			}

		}

		function verifyLink(linkElem){
			if (linkElem.origin != window.location.origin){
				return true;
			}
		}

		$('a').each(function(){

			if ( verifyLink(this) ){

				$(this).addClass('external');

			} else {

				$(this).addClass('internal');

			}
			
		});

		function loadPage(mainUrl, page){

			console.log('clicked')

			$('body').addClass('loadingImg');

			multiBurger.off('click');

			if ( multiBurger.hasClass('active') ){
				closeMenu();
			}

			$(window).animate({scrollTop: 0});

			loadedInner.remove();

			multiBurger.trigger('click');

			switchOver.set(pageContainer,  {WebkitMaskPosition: '0%, 0%'});
			switchOver.set(pageContainer, {WebkitMaskImage: 'linear-gradient(to right, rgba(255,255,255,1) 80%, rgba(255,255,255, 0))'});
			switchOver.to(pageContainer, {duration: .5, ease: "steps.out", WebkitMaskPosition: '200%, 0%', onComplete: pageJax, onCompleteParams: [mainUrl, page]});

		}

		function pageJax(mainUrl, page){

				mainWrapper.load(mainUrl + " .loaded_inner", function (response, status, xhr) {
			        if (status == "error") {

			        	window.location.href = mainUrl;

			        } else {

			        	switchOver.set(pageContainer, {WebkitMaskImage: 'linear-gradient(to left, rgba(255,255,255,1) 80%, rgba(255,255,255, 0)'});
						switchOver.set(pageContainer, {WebkitMaskPosition: '-100%, 0%'});
						switchOver.to(pageContainer, {duration: .75, delay:.25, ease: "steps.out", WebkitMaskPosition: '100%, 0%'});

			        	passNewPage(mainUrl, page);

			        	if( page !== 'home' && mainWrapper.hasClass('fullHeight') ){

									mainWrapper.removeClass('fullHeight');

									navParent.removeClass('home');

									$('#wwf_logo').removeClass('fill_change');

									$('#menu_wrapper').removeClass('fill_change');

								} else if (page == 'home') {

									mainWrapper.addClass('fullHeight');

									navParent.addClass('home');

									$('#wwf_logo').addClass('fill_change');

									$('#menu_wrapper').addClass('fill_change');

								}

						}
					 });

			}

		function passNewPage(mainUrl, page){

				$('body').removeClass('loadingImg');

				if (window.history.pushState){
					window.history.pushState(null, null, mainUrl);
				}

				LOADJS.loadEvents();

				loadedInner = $('.main_content').find('.loaded_inner');

				var videoTest = document.getElementsByTagName('video');

				if (videoTest){

					for (var i = 0; i < videoTest.length; i++){

						videoTest[i].play();

					}

				}
				
			}

		//Accents

		var homeNav = document.querySelector('nav.home');

		$('button').on('click', function(e){
			e.stopPropagation;
			$(this).addClass('btnActive');

		$('button').not($(this)).removeClass('btnActive');

		});

		$('.menu_links li:last-child').addClass('last');

		//Get Element Height

		var innerHeight,
				calculatedHeight,
				windowHeight = window.innerHeight,
				field = window.innerWidth;

			function getElemHeight(elem){

				elem.removeAttribute('style');

				var storedStyle = getComputedStyle(elem),
						storedHeight = parseInt(storedStyle.height),
						marPad = parseInt(storedStyle.paddingTop) + parseInt(storedStyle.paddingBottom) + parseInt(storedStyle.marginTop) + parseInt(storedStyle.marginBottom);
				
				innerHeight = storedHeight - marPad;

				return innerHeight;

			}

			//Onload, set VH elements to viewport height

			storeVHeight();

			function storeVHeight(){

				var viewportCached = document.getElementsByClassName('viewportFixed');
		
				for (var i = 0; i < viewportCached.length; i++){

					getElemHeight( viewportCached[i] );

					calculatedHeight = windowHeight - innerHeight;

					calculatedWindowHeight = windowHeight - calculatedHeight;

					viewportCached[i].removeAttribute('style');
		
					viewportCached[i].style.height = calculatedWindowHeight + 'px';
		
				}
			}

		//Detect if device supports orientation change

		var supportsOrientationChange = "onorientationchange" in window,
    		orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

    window.addEventListener(orientationEvent, function(){

    		windowHeight = window.innerHeight;
			
				storeVHeight();

    }, false);

    //On vertical resize (if window width has changed, too), adjust element height

		$(window).resize( function(){

			var newField = window.innerWidth,
					newFieldY = window.innerHeight;

			if( newField != field && newFieldY != fieldY ){

				windowHeight = window.innerHeight;
			
				storeVHeight();

			}

			if ( multiBurger.hasClass('active') && newField != field && newFieldY != fieldY ){

					closeMenu();

				}

		});


		}

	},

index : {
	init : function(){

		var o = $('.overlay'),
			abs = $('.abs_wrapper'),
			bodyWrapper = $('.inner_content'),
			indexContainer = $('#index_container'),
			filterContainer = $('#filter_wrapper'),
			xit = $('.filter_xit'),
			container = $('.tag'),
			material_container = $('.material_tag'),
			process_container = $('.process_tag'),
			year_container = $('.year_tag'),
			m = $('#filter_menu'),
			all = $('.all'),
			tagBtn = $('.filter_option'),
			filterTag = $('.tag'),
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

				var fromTop = filterContainer.offset().top - 50;

				if( !o.hasClass('active') ){

					gsap.to(indexContainer, {duration: .4, autoAlpha: '0'});

					navParent.css('visibility', 'hidden');

					$(window).animate({scrollTop: fromTop}, function(){

						filterContainer.addClass('active');

						state = 'lock';

						lockBody();

						abs.fadeIn(300).addClass('active');

						o.fadeIn(300).addClass('active');

						o.css('borderTop', 'solid 1px black');

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

			} else {

				all.fadeOut(300).removeClass('active');

				$('.project').addClass('filtered');

				closeFilterWindow();

			}

		});

	function closeFilterWindow(){

				o.fadeOut(300).removeClass('active');

				navParent.css('visibility', 'visible');

				o.css('borderBottom', 'unset');

				container.fadeOut(300);

				filterContainer.removeClass('active', function(){
					abs.css('display', 'none').removeClass('active');
				}).attr('style', '');

				gsap.to(indexContainer, {duration: 1.2, autoAlpha: '1'});

				state = 'unlock';
				lockBody(state)

		}

		xit.on('click', function(){

			if( o.hasClass('active') ){

				$('.project').addClass('filtered');

				all.fadeOut(300).removeClass('active');

				closeFilterWindow();

			}

		});

		filterTag.on('click', function (e){

			all.fadeIn(300).addClass('active');

			var filterAttr = $(this).attr('data-filter');

			for (var i = 0; i < filterProjects.length; i ++ ){

				var projectAttr = filterProjects[i].getAttribute('data-filter');

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
init : function(){

 //On load, get prev, current, next

	var info = document.querySelector('.right_justified_partial'),
			currentThumbs = info.querySelectorAll('.thumbnail'),
			activateThumb = function(currentThumbs, slideCount){

				for(var thumbs = 0; thumbs < currentThumbs.length; thumbs++){

				currentThumbs[thumbs].classList.remove('btnActive');

				}

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
			slideID = slideAreaContainer.id.replace( / +/g, '-' ).toLowerCase(),
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

					projectSlide.classList.add('slide')

					frag.append(projectSlide);

					projectSlide.style.backgroundImage = 'url(' + currentThumbs[thumbs].getAttribute('data-url') + ')', projectSlide.style.transform = 'translate(' + positionC + ')';

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

						storedInfo = temp.querySelector('.right_justified_partial').innerHTML,
						slideInfo.innerHTML = storedInfo;

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

		parent.appendChild(a).classList.add('slide', 'loadingImg');
		a.appendChild(aInfo).classList.add('hide'), a.setAttribute('data-arrow-left',''), a.setAttribute('data-arrow-right','');

		if (current.classList.contains('video')){

				parent.appendChild(b).classList.add('slide', 'video');

				//Featured Video

				b.innerHTML = currentInner;

				isVideo = true;

		} else {

			parent.appendChild(b).classList.add('slide');

			//Featured Image

			b.style.backgroundImage = 'url("' + currentUrl + '")'

		}

		b.appendChild(bInfo).classList.add('hide'), b.setAttribute('data-arrow-left',''), b.setAttribute('data-arrow-right','');

		bInfo.innerHTML = info.innerHTML;

		parent.appendChild(c).classList.add('slide', 'loadingImg');
		c.appendChild(cInfo).classList.add('hide'), c.setAttribute('data-arrow-left',''), c.setAttribute('data-arrow-right','');

		createProjectSlides(currentThumbs);

		currentSlide.prop = b;

	}

	//Set onload state

	loadNeighbor();

	function loadNeighbor(){

		$('.arrow_nav').removeClass('internal');

	    while (parent.firstChild) {

	        parent.removeChild(parent.firstChild);

	    }

	  	currentThumbs[slideCount].classList.add('btnActive');

	    createChildren();

	    var info = document.querySelector('.right_justified_partial');

	    lazyLoad(info);

		//Slide ID

		slideAreaContainer.id = slideID;

		if (window.history.pushState)
		{
			window.history.pushState(null, null, '#' + slideID);
		}

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

	document.addEventListener("click", checkTrigger, false);

	function checkTrigger(r){

		if(r.target.classList.contains('arrow')){

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

			} else if (d == 'next' && slideCount === 1) {

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

						parent.insertBefore(a, b).classList.add('slide', 'loadingImg');

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

						b.parentNode.insertBefore(c, b.nextElementSibling).classList.add('slide', 'loadingImg');

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
			endSwipe(end, longTouch);
			return swipeArea.moving = false;
		};
		swipeArea.ontouchend = function(end){
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

		var index = $(this).index() - 1;

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
contact : {
init : function(){
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
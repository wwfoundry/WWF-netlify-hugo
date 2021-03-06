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

  	var idElem = document.querySelector('.hide')
    var bodyId = idElem.id;

    LOADJS.fire('common');

    LOADJS.fire(bodyId);

  }
};

$(document).ready(LOADJS.loadEvents);

/////////////////////Namespaces/////////////////////

callPageJS = {
	common : {
		init : function(){

		//Accents

		var homeNav = document.querySelector('nav.home');

		//Menu Behavior

		var multiBurger = $("#hamburger");

		multiBurger.on("click", function(e){

			$('nav').addClass('active');

			$('.bar').addClass('active');

			$('#side_menu_wrapper').fadeIn(300).addClass("active");

			$('body').addClass('locked');

			e.stopPropagation();

			if ( multiBurger.hasClass('active') ){

				$('nav').removeClass('active');

				multiBurger.removeClass('active');

				$('.bar').removeClass('active');

				$('#side_menu_wrapper').fadeOut(300).removeClass("active");

				$('body').removeClass('locked');

			} else {
				multiBurger.addClass('active');
			}

		});

		var navParent = $('nav'),
					field = window.innerWidth,
					fieldY = window.innerHeight,
					navHeight = navParent.height(),
					filledElem = document.createElement('div');

		$(window).on('scroll', function(){

			if(!navParent.hasClass('home') && field < 800){

				if (document.body.scrollTop > 100 | document.documentElement.scrollTop > 100) {
					filledElem.style.height = '55px';
					$('body').prepend(filledElem);
					navParent.addClass('scroll');
					gsap.to(navParent, .5, {backgroundColor: "#ffffff"});
				} else { 
					filledElem.remove();
					navParent.removeClass('scroll');
					gsap.to(navParent, .5, {backgroundColor: "transparent"});
				}

			}

		});

		$('button').on('click', function(e){
			e.stopPropagation;
			$(this).addClass('btnActive');

		$('button').not($(this)).removeClass('btnActive');

		});

		$('.menu_links li:last-child').addClass('last');

		//Get Element Height (vanilla)

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

				console.log('resized')

				windowHeight = window.innerHeight;
			
				storeVHeight();

			}

			if ( multiBurger.hasClass('active') && newFieldY != fieldY ){

					multiBurger.trigger("click");

				}

		});


		}

	},

index : {
	init : function(){

		var projectElem = document.getElementsByClassName('project'),
		length = projectElem.length;

		for (var i = 0; i < length; i++){

			var pageNumber = parseInt([i], 10),
				pageInt = pageNumber + 1;

			if (pageInt == 1){

				projectElem[i].setAttribute('href', '/gallery/');

			} else {

				projectElem[i].setAttribute('href', '/gallery/page/' + pageInt + '/');

			}
			
		}

		var o = $('.overlay'),
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
			filterLength = filterProjects.length;

		tagBtn.on('click', function(){

			// $(window).scrollTo(document.querySelector('#filter_menu'), 1500, {easing: 'easeInOutQuart'});
			// console.log('works')
			// function openFilterMenu(){

			// 	if( !o.hasClass('active') ){

			// 		o.fadeIn(300).addClass('active');

			// 		o.css({'borderBottom' : 'solid 1px black', 'borderTop' : 'solid 1px black'});

			// 	}

			// }

			if ( $(this).hasClass('material') ){

				container.not(material_container).css('display', 'none');

				material_container.fadeIn(300);

				openFilterMenu()

			} else if( $(this).hasClass('process') ){

				container.not(process_container).css('display', 'none');

				process_container.fadeIn(300);

				openFilterMenu()

			} else if ( $(this).hasClass('year') ) {

				container.not(year_container).css('display', 'none');

				year_container.fadeIn(300);

				openFilterMenu()

			} else {

				all.fadeOut(300).removeClass('active');

				$('.project').addClass('filtered');

			}

		});

		xit.on('click', function(){

			if( o.hasClass('active') ){

				o.fadeOut(300).removeClass('active');

				o.css({'borderBottom' : 'unset', 'borderTop' : 'unset'});

				container.fadeOut(300);

				$('.project').addClass('filtered');

				all.fadeOut(300).removeClass('active');

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
			field = window.innerWidth,
			fieldY = window.innerHeight;

	var parent = document.querySelector('#slide_container'),
		current = document.querySelector('#main_slide'),
		currentUrl = current.getAttribute('data-url'),
		currentInner = current.innerHTML,
		arrowPrev = document.querySelector('#arrow_left'),
		arrowNext = document.querySelector('#arrow_right'),
		slideAreaContainer = document.querySelector('.project_slide'),
		slideID = slideAreaContainer.id.replacas +/g, '-' ).toLowerCase(),
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
		playMain =  function (container, video){

				video.load();

				video.oncanplay = function (){

				video.play();

				container.classList.remove('loadingImg');

			}

		},
		lazyLoad = function (info){

			var thumbs = info.getElementsByClassName('thumbnail'),
				temp = info.getElementsByClassName('temp'),
				i,
				t;

			for (i = 0; i < thumbs.length; i++){

				var t = thumbs[i],
						thumbBGattr = t.getAttribute('data-url'),
						cachedImg = document.createElement('img');

				cachedImg.classList.add('hide', 'temp');

				document.querySelector('.thumbnails').appendChild(cachedImg).style.display = 'none';

				if( !t.classList.contains('video') ){

						cachedImg.src = thumbBGattr;

						replaceWithCache(t, cachedImg)

						function replaceWithCache(t, cachedImg){

							cachedImg.onload = function(){

								var cachedSrc = cachedImg.src;

								cachedImg.remove();

								t.style.backgroundImage = "url(" + cachedSrc + ")"

								t.classList.remove('loadingImg');

							}

						}

					} else {

						var thumbVid = t.querySelector('video'),
								thumbVidSrc = thumbVid.querySelector('source'),
								thumbVidattr = thumbVidSrc.getAttribute('data-url');

						thumbVidSrc.setAttribute('src', thumbVidattr);

						playMain(t, thumbVid);

					}

			}

		},
		infojax = function () {$.ajax({
			
					url: loadUrl,
					dataType: 'text',
					success: function (stored){

						var cleanedStored = $.parseHTML(stored),
							tempStored = $('<div>').append(cleanedStored),
							tempHTML;

						tempStored.find('link').remove();

						tempHtml = tempStored.html();

						var temp = document.createElement('div');

						document.querySelector('body').appendChild(temp).style.display = 'none';

						temp.innerHTML = tempHtml;

						var	arrowLeftTemp = temp.querySelector('#arrow_left'),
							arrowRightTemp = temp.querySelector('#arrow_right'),
							arrowLeftState,
							arrowRightState,
							storedInfo = temp.querySelector('.right_justified_partial').innerHTML,
							storedID = temp.querySelector('.project_slide').id,
							transID = storedID.replace( / +/g, '-' ).toLowerCase();

						if ( arrowLeftTemp && arrowRightTemp ){

							arrowLeftState = arrowLeftTemp.getAttribute('href');
							arrowRightState = arrowRightTemp.getAttribute('href');

							arrowPrev.setAttribute( 'href', arrowLeftState );
							arrowNext.setAttribute( 'href', arrowRightState );

						} else if ( arrowLeftTemp == undefined && arrowRightTemp  ) {

							arrowRightState = arrowRightTemp.getAttribute('href');

							arrowPrev.setAttribute( 'href', '/gallery/page/' + totalPages + '/' );
							arrowNext.setAttribute( 'href', arrowRightState );

						} else if ( arrowRightTemp == undefined && arrowLeftTemp ) {

							arrowLeftState = arrowLeftTemp.getAttribute('href');

							arrowNext.setAttribute( 'href', '/gallery/' );
							arrowPrev.setAttribute( 'href', arrowLeftState );

						}

						info.innerHTML = storedInfo;
						slideAreaContainer.id = transID;

						lazyLoad(info);

						temp.remove();

						if (window.history.pushState)
							{
								window.history.pushState(null, null, loadUrl + '#' + transID);
							}

					}

				})},
		pjax = function () {$.ajax({
								
				url: p,
				dataType: 'text',
				success: function (stored){

					var cleanedStored = $.parseHTML(stored),
						tempStored = $('<div>').append(cleanedStored),
						tempHTML;

					tempStored.find('link').remove();

					tempHtml = tempStored.html();

					var temp = document.createElement('div');

					document.querySelector('body').appendChild(temp).style.display = 'none';

					temp.innerHTML = tempHtml;

					var mainslideObj = temp.querySelector('#main_slide');

					if ( !mainslideObj.classList.contains('video') ){

						var	storedFeatured = mainslideObj.getAttribute('data-url');

						a.style.backgroundImage = 'url("' + storedFeatured + '")'

					} else {

						var storedFeaturedVideo = mainslideObj.innerHTML;

						a.innerHTML = storedFeaturedVideo;

						a.classList.add('video', 'loadingImg');

						a.querySelector('video').pause();

					}

					temp.remove();
				}

				})},
		njax = function () {$.ajax({
				
				url: n,
				dataType: 'text',
				success: function (stored){

					var cleanedStored = $.parseHTML(stored),
						tempStored = $('<div>').append(cleanedStored),
						tempHTML;

					tempStored.find('link').remove();

					tempHtml = tempStored.html();

					var temp = document.createElement('div');

					document.querySelector('body').appendChild(temp).style.display = 'none';

					temp.innerHTML = tempHtml;

					var mainslideObj = temp.querySelector('#main_slide');

					if ( !mainslideObj.classList.contains('video') ){

						var	storedFeatured = mainslideObj.getAttribute('data-url');

						c.style.backgroundImage = 'url("' + storedFeatured + '")'

					} else {

						var storedFeaturedVideo = mainslideObj.innerHTML;

						c.innerHTML = storedFeaturedVideo;

						c.classList.add('video', 'loadingImg');

						c.querySelector('video').pause();

					}

					temp.remove();

				}

					})},
		leftArrowHtml = "<a id='arrow_left' href='/gallery/page/" + totalPages + "/' class='menu_item icon left arrow'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>",
		rightArrowHtml = "<a id='arrow_right' href='/gallery/' class='menu_item icon right arrow'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>"

	//Liquid Slides

	var a = document.createElement('div'),
			b = document.createElement('div'),
			c = document.createElement('div');

	//Position Rules

	var positionB = b.offsetLeft,
			positionA = ((field/(positionB - field)*100)-10).toString() + '%',
			positionC = ((field/(positionB + field)*100)+10).toString() + '%';

	a.style.left = positionA;
	c.style.left = positionC;

	function createChildren(){

		parent.appendChild(a).classList.add('slide');

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

		parent.appendChild(c).classList.add('slide');

	}

	//Set onload state

	loadNeighbor();

	function loadNeighbor(){

	    while (parent.firstChild) {

	        parent.removeChild(parent.firstChild);

	    }

	    createChildren();

	    var info = document.querySelector('.right_justified_partial');

	    lazyLoad(info);

		//Slide ID

		slideAreaContainer.id = slideID;

		if (window.history.pushState)
		{
			window.history.pushState(null, null, '#' + slideID);
		}

		animateSlides();

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

			arrowNext = replaceNext;

			p = arrowPrev.getAttribute('href');

			n = '/gallery/';

		} else if ( arrowPrev == undefined && arrowNext !== undefined ){

			var replacePrev = document.createElement('a');

			document.querySelector('#directional_arrows').appendChild(replacePrev)

			replacePrev.outerHTML = leftArrowHtml;

			arrowPrev = replacePrev;

			p = '/gallery/page/' + totalPages + '/';

			n = arrowNext.getAttribute('href');

		}

	}

	//Trigger Slide Change

	$('body').on('click', '.arrow', function(e){

		e.preventDefault();
		e.stopPropagation();

		if ( !parent.classList.contains('animating') ) {

			if ( $(this).hasClass('left') ) {

				d = 'prev';

			} else {

				d = 'next';

			}

			loadState = false;

			loadUrl = $(this).prop('href');

			animateSlides(d, loadUrl);

			arrowPrev = document.querySelector('#arrow_left');
			arrowNext = document.querySelector('#arrow_right');

		}

	});

	function animateSlides(d, loadUrl){

		verifyNeighbors();

		if ( loadState == false && d && loadUrl ){

			infojax(loadUrl);

			if ( d == 'prev'){

				var animBprev = gsap.to(b, {duration: .5, left: '110%'}),
				 	animAprev  = gsap.to(a, {duration: .5, left: '0%', onComplete: replacePrev});

				if (!animAprev.isActive()){

					parent.classList.add('animating');

				}

				function replacePrev () {

					c.remove();

					c = b;

					b = a;

					a = document.createElement('div');

					a.style.left = "-110%";

					parent.insertBefore(a, b).classList.add('slide');

					parent.classList.remove('animating');

					if(b.classList.contains('video')){

						var mainVideo = b.querySelector('video');

						playMain(b, mainVideo);

					}

					getNextP();
					
				}

			} else {

				var animBnext = gsap.to(b, {duration: .5, left: '-110%'}),
					animAnext = gsap.to(c, {duration: .5, left: '0%', onComplete: replaceNext});

				if (!animAnext.isActive()){

					parent.classList.add('animating');

				}

				function replaceNext(){

					a.remove();

					a = b;

					b = c;

					c = document.createElement('div');

					c.style.left = "110%";

					b.parentNode.insertBefore(c, b.nextElementSibling).classList.add('slide');

					parent.classList.remove('animating');

					if(b.classList.contains('video')){

						var mainVideo = b.querySelector('video');

						playMain(b, mainVideo);

					}

					getNextN();

				}
			}

		} else {

			if (p){

				pjax();
			}

			if (n){

				njax();

			}

		}
	}

	function getNextP(){

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

		p = prevPath;
		
		pjax(p);

	}

	function getNextN(){

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

		n = nextPath;
		
		njax(n);

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

	var detectSwipe = new Hammer(parent);

	detectSwipe.on("swipeleft", function(e) {

		e.preventDefault;

		trans_slide('next');

	});

	detectSwipe.on("swiperight", function(e) {

		e.preventDefault;

		trans_slide('prev');

	});

	function trans_slide(d){


		if ( !parent.classList.contains('animating') ) {

				loadState = false;

				if ( d == 'prev'){

					loadUrl = $('#arrow_left').prop('href');

				} else {

					loadUrl = $('#arrow_right').prop('href');

				}

				animateSlides(d, loadUrl);

				arrowPrev = document.querySelector('#arrow_left');
				arrowNext = document.querySelector('#arrow_right');

			}

	}

	//Thumbnail Gallery

	$('body').on('click', '.thumbnail', function(){

		if (!parent.classList.contains('animating')){

			var thumbUrl = $(this).attr('data-url');

			var thumbVideo = $(this).hasClass('video');

			var thumbHtml = $(this).html();

			gsap.to(b, {duration: .25, autoAlpha: '0', onComplete: addBackground});

			function addBackground(){

				console.log(thumbVideo)

				if (thumbVideo == false){

					b.innerHTML = ""

					b.style.backgroundImage = 'url(' + thumbUrl + ')';

				} else if (thumbVideo == true) {

					b.innerHTML = thumbHtml;

					b.style.backgroundImage = ""

				}

				gsap.to(b, {duration: .25, autoAlpha: '1'});

			}
		
		}

	});
}
  }
}
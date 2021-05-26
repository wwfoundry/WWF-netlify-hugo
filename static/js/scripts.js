$(document).ready(function(){

	//Menu Behavior

		$("#hamburger").on("click", function(){

			gsap.to('#side_menu_wrapper', {duration: .5, marginRight: '100vw'});

			$('#side_menu_wrapper').addClass("active");

			$('#content').css('filter', 'blur(1px)');

			$('#contact_content').css('filter', 'blur(1px)');

		});

		$("#xit").on("click", function(){

		if ( $('#side_menu_wrapper').hasClass('active') ){

			gsap.to('#side_menu_wrapper', {duration: .5, marginRight: '0'});

			$('#content').css('filter', 'blur(0px)');

			$('#contact_content').css('filter', 'blur(0px)');

			$('#side_menu_wrapper').removeClass("active");

		}

		});

//On load, get prev, current, next

var info = document.querySelector('.project_information'),
	field = window.innerWidth;

var parent = document.querySelector('#slide_container'),
	current = document.querySelector('#main_slide'),
	currentUrl = current.getAttribute('data-url'),
	arrowPrev = document.querySelector('#arrow_left'),
	arrowNext = document.querySelector('#arrow_right'),
	slideAreaContainer = document.querySelector('.project_slide'),
	totalPages = slideAreaContainer.getAttribute('data-total'),
	p,
	n,
	d,
	trigger,
	anim,
	currentPage = window.location.pathname,
	loadUrl,
	loadState = false,
	infojax = function () {$.ajax({
		
				url: loadUrl,
				dataType: 'text',
				success: function (stored){

					var temp = document.createElement('div');

					document.querySelector('body').appendChild(temp).style.display = 'none';

					temp.innerHTML = stored;

					var	arrowLeftTemp = temp.querySelector('#arrow_left'),
						arrowRightTemp = temp.querySelector('#arrow_right'),
						arrowLeftState,
						arrowRightState,
						storedInfo = temp.querySelector('.project_information').innerHTML;

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

					temp.remove();

					if (window.history.pushState)
						{
							window.history.pushState(null, null, loadUrl);
						}

				}

			})},
	pjax = function () {$.ajax({
							
			url: p,
			dataType: 'text',
			success: function (stored){

				var temp = document.createElement('div');

				document.querySelector('body').appendChild(temp).style.display = 'none';

				temp.innerHTML = stored;

				var test = temp.querySelector('#main_slide');


				var	storedFeatured = temp.querySelector('#main_slide').getAttribute('data-url');

				a.style.backgroundImage = 'url("' + storedFeatured + '")'

				temp.remove();
			}

			})},
	njax = function () {$.ajax({
			
					url: n,
					dataType: 'text',
					success: function (stored){

						var temp = document.createElement('div');

						document.querySelector('body').appendChild(temp).style.display = 'none';

						temp.innerHTML = stored;

						var	storedFeatured = temp.querySelector('#main_slide').getAttribute('data-url');

						var test = temp.querySelector('#main_slide');

						c.style.backgroundImage = 'url("' + storedFeatured + '")'

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
	positionA = (field/(positionB - field)*100).toString() + '%',
	positionC = (field/(positionB + field)*100).toString() + '%';

a.style.left = positionA;
c.style.left = positionC;


function createChildren(){

	parent.appendChild(a).classList.add('slide');
	parent.appendChild(b).classList.add('slide');
	parent.appendChild(c).classList.add('slide');

}

//Set onload state

function loadNeighbor(){

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    createChildren();

    //Featured Image

	b.style.backgroundImage = 'url("' + currentUrl + '")'

	animateSlides();

	loadState = true;

}

//Check for nav with valid links

loadNeighbor();

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

			var animBprev = gsap.to(b, {duration: 1, left: '100%'}),
			 	animAprev  = gsap.to(a, {duration: 1, left: '0%', onComplete: replacePrev});

			if (!animAprev.isActive()){

				parent.classList.add('animating');

			}

			function replacePrev () {

				c.remove();

				c = b;

				b = a;

				a = document.createElement('div');

				a.style.left = "-100%"

				parent.insertBefore(a, b).classList.add('slide');

				parent.classList.remove('animating');

				getNextP();
				
			}

		} else {

			var animBnext = gsap.to(b, {duration: 1, left: '-100%'}),
				animAnext = gsap.to(c, {duration: 1, left: '0%', onComplete: replaceNext});

			if (!animAnext.isActive()){

				parent.classList.add('animating');

			}

			function replaceNext(){

				a.remove();

				a = b;

				b = c;

				c = document.createElement('div');

				c.style.left = "100%";

				b.parentNode.insertBefore(c, b.nextElementSibling).classList.add('slide');

				parent.classList.remove('animating');

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

	var thumbUrl = $(this).attr('data-url');

	console.log(thumbUrl)

	b.style.backgroundImage = 'url(' + thumbUrl + ')';


});


});
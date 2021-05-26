$(document).ready(function(){

	//Menu Behavior
	
		$("#hamburger").on("click", function(){

		$('#side_menu_wrapper').animate({marginRight: '100vw'}, 500);

		// $('header').css('borderBottom' , 'solid .012px white');

		$('#side_menu_wrapper').addClass("active");

		$('#content').css('filter', 'blur(1px)');

		$('#contact_content').css('filter', 'blur(1px)');

		// $('#menu').css('display', 'none');

	});

	$("#xit").on("click", function(){

		if ( $('#side_menu_wrapper').hasClass('active') ){

			$('#side_menu_wrapper').animate({marginRight: '0'}, 500);

			// $('header').css('borderBottom' , 'solid .012px #bebec1');

			$('#content').css('filter', 'blur(0px)');

			$('#contact_content').css('filter', 'blur(0px)');

			$('#side_menu_wrapper').removeClass("active");

			// $('#menu').css('display', 'flex');

		}

	});

//On load, get prev, current, next

var parent = document.querySelector('#slide_container'),
	info = document.querySelector('.project_information'),
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
	currentPage = window.location.pathname,
	loadUrl,
	loadState = false,
	pjax = function () {$.ajax({
							
			url: p,
			dataType: 'text',
			success: function (stored){

				var temp = document.createElement('div');

				document.querySelector('body').appendChild(temp).style.display = 'none';

				temp.innerHTML = stored;

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

						c.style.backgroundImage = 'url("' + storedFeatured + '")'

						temp.remove();

					}

				})},
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
	leftArrowHtml = "<a id='arrow_left' href='/gallery/page/" + totalPages + "/' class='menu_item icon left arrow'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>",
	rightArrowHtml = "<a id='arrow_right' href='/gallery/' class='menu_item icon right arrow'><svg version='1.1' class='menu_item' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 100 100' style='enable-background:new 0 0 100 100;' xml:space='preserve'><style type='text/css'>.st0{fill:none;}</style><line class='st0' x1='73.02' y1='4.01' x2='26.98' y2='50.04'/><line class='st0' x1='73.02' y1='95.99' x2='26.98' y2='49.96'/></svg></a>"

//Liquid Slides

var a = document.createElement('div'),
	b = document.createElement('div'),
	c = document.createElement('div');

//Position Rules

var positionB = b.offsetLeft,
	field = window.innerWidth,
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

		document.querySelector('#directional_arrows').appendChild(replaceNext)

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

});

function animateSlides(d, loadUrl){

	verifyNeighbors();

	if ( loadState == false && d && loadUrl ){

		infojax(loadUrl);

		if ( d == 'prev'){

			gsap.to(b, {duration: 1, left: '100%'});

			gsap.to(a, {duration: 1, left: '0%', onComplete: replacePrev});

			function replacePrev () {
				c.remove();

				c = b;

				b = a;

				a = document.createElement('div');

				a.style.left = "-100%"

				parent.insertBefore(a, b).classList.add('slide');

				console.log(p);

				pjax();
			}

		} else {

			gsap.to(b, {duration: 1, left: '-100%'});

			gsap.to(c, {duration: 1, left: '0%', onComplete: replaceNext});

			function replaceNext(){

				a.remove();

				a = b;

				b = c;

				c = document.createElement('div');

				c.style.left = "100%";

				b.parentNode.insertBefore(c, b.nextElementSibling).classList.add('slide');

				console.log(n);

				njax();

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


//On arrow click, shift all, remove prev or next and load prev or next


});
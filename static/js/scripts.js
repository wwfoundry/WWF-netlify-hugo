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
	current = document.querySelector('#main_slide'),
	currentUrl = document.querySelector('#main_slide').getAttribute('data-url'),
	arrowPrev = document.querySelector('#arrow_left'),
	arrowNext = document.querySelector('#arrow_right'),
	p,
	n,
	trigger,
	currentPage = window.location.pathname,
	loadState = false;

//Liquid Slides

var a = document.createElement('div'),
	b = document.createElement('div'),
	c = document.createElement('div');

function createChildren(){

	parent.appendChild(a).classList.add('slide');
	parent.appendChild(b).classList.add('slide');
	parent.appendChild(c).classList.add('slide');

}

loadNeighbor();

//Check for prev or next slides

	function verifyNeighbors() {

		if ( arrowPrev && arrowNext ){
	
			p = arrowPrev.getAttribute('href');

			n = arrowPrev.getAttribute('href');
	
		} else if ( arrowPrev !== 'undefined' && arrowNext == 'undefined' ) {

			p = arrowPrev.getAttribute('href');

			n = '';

		} else if ( arrowPrev == 'undefined' && arrowNext !== 'undefined' ){

			p = '';

			n = arrowPrev.getAttribute('href');

		}

	}

//Set onload state

function loadNeighbor(){

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }

    createChildren()

	b.style.backgroundImage = 'url("' + currentUrl + '")'

	animateSlides();

	loadState = true;

}


//Trigger Slide Change

$('body').on('click', '.arrow', function(e){

	e.preventDefault();
	e.stopPropagation();

	if ( $(this).attr('id') == 'arrow_left' ) {

		d = -1;

	} else {

		d = 1;
	}

	loadState = false;

});

function animateSlides( ){

	verifyNeighbors();

	if (loadState = false){

	} else {

			$.ajax({
		
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

			}); 

			$.ajax({
		
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

			}); 

		}

}


//On arrow click, shift all, remove prev or next and load prev or next


});
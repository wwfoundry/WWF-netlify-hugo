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

// Set Page State on Load

var slideParent = document.getElementById('slide_container');

var prev,
	main,
	next;

//Get current page
var totalPages = $('.project_slide').attr('data-total');
var currentPage = window.location.pathname,
	pageNumber;

console.log(currentPage);

if ( currentPage.split('page/')[1] == undefined )
	{

		pageNumber = totalPages;

	} else {

		pageNumber = currentPage.split('page/')[1].replace('/', '');

	}

load();
initial();
arrange();

function load(){

	var featured = $('#main_slide').attr('data-url');

	//Clear slide container

	$('#slide_container').html('');

	//Create slide elements

	prev = document.createElement('div');
	main = document.createElement('div');
	next = document.createElement('div');

	prev.setAttribute('id', 'prev_slide');
	main.setAttribute('id', 'main_slide');
	next.setAttribute('id', 'next_slide');

	let loadState = false;

	main.style.backgroundImage = 'url("' + featured + '")'

}

function initial() {

	var prevPage = $('#arrow_left').attr('href'),
		nextPage = $('#arrow_right').attr('href');

	$.ajax({
		url: prevPage,
		dataType: 'text',
		success: function(prevHTML){

		var prevTemp = $('<div>').appendTo(document.body).css('display', 'none');
				prevTemp[0].innerHTML = prevHTML;

		var prevURL = prevTemp.find('#main_slide').attr('data-url');

		prev.style.backgroundImage = 'url("' + prevURL + '")'

		prevTemp.remove();

		}

	});

	$.ajax({
		url: nextPage,
		dataType: 'text',
		success: function(nextHTML){

		var nextTemp = $('<div>').appendTo(document.body).css('display', 'none');
				nextTemp[0].innerHTML = nextHTML;

		var nextURL = nextTemp.find('#main_slide').attr('data-url');

		next.style.backgroundImage = 'url("' + nextURL + '")'

		nextTemp.remove();


		}

	});

}

function arrange(){

	slideParent.appendChild(prev).classList.add('slide');
	slideParent.appendChild(main).classList.add('slide');
	slideParent.appendChild(next).classList.add('slide');
}

	//Infinite Pagination

	$('body').on('click','.arrow', function(e) {
		e.preventDefault(); 
		e.stopPropagation();
		
		var slideDirection;

		if ( $(this).attr('id') == 'arrow_left' ) {

			slideDirection = -1

		} else {

			slideDirection = 1
		}

		var nextPageURL = $(this).prop('href');

		$.ajax({
			url: nextPageURL,
			dataType: 'text',
			processData: false,
			success: function(html) {
				var attribution = $('.project_information');

				var arrowStates = $('#directional_arrows');

				var tempDiv = $('<div>').appendTo(document.body).css('display', 'none');
				tempDiv[0].innerHTML = html;
	
				var newAttribution = tempDiv.find('.project_information');

				var newArrowStates = tempDiv.find('#directional_arrows');

				attribution.replaceWith(newAttribution);
				arrowStates.replaceWith(newArrowStates);

				var prevSlide = newArrowStates.find('#arrow_left').prop('href');
				var prevSlide = newArrowStates.find('#arrow_right').prop('href');

				tempDiv.remove();

				if (window.history.pushState)
				{
					window.history.pushState(null, null, nextPageURL);
				}

			},
			error: function(xhr, status, error) {
				console.error(xhr, status, error);

				window.location.href = nextPageURL;
			}
		});

		return false;

	});

});

	var pageURL = new URL(nextPageURL);

		var pageNumber;

		if ( pageURL.pathname.split('page/')[1] == undefined )
		{

			pageNumber = '1';

		} else {

			pageNumber = pageURL.pathname.split('page/')[1].replace('/', '');

		}

		var intNumber = parseInt(pageNumber, 10)

		var prevPage,
			nextPage;

		if ( slideDirection = -1 ){

			prevPage = intNumber - 1;
			nextPage = intNumber + 1;

		} else {

			prevPage = intNumber + 1;
			nextPage = intNumber - 1;

		}

		if ( slideDirection == -1 && prevPage == 0 ){
			prevPage = totalPages;
		}

		var prevPath = '/gallery/page/' + prevPage + '/'

		var nextPath;

		if ( nextPage > totalPages ){

			nextPath = '/gallery/'

		} else {

			nextPath = '/gallery/page/' + nextPage + '/'

		}

		console.log(prevPath);
		console.log(intNumber);
		console.log(nextPath);
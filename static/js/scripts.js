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

let loadState = false;

var prevTempelem = $('<div class="slide" id="prev_slide">');
	nextTempelem = $('<div class="slide" id="next_slide">');

window.onload = function(){

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

	var prevPage = $('#arrow_left').attr('href'),
		nextPage = $('#arrow_right').attr('href');

	$.ajax({
		url: prevPage,
		dataType: 'text',
		success: function(prevHTML){

		var prevSlide = $('#prev_slide.slide');

		var prevTemp = $('<div>').appendTo(document.body).css('display', 'none');
				prevTemp[0].innerHTML = prevHTML;

		var prevURL = prevTemp.find('.main_slide').attr('data-url');

		prevSlide.css('background-image', 'url(' + prevURL + ')');

		prevTemp.remove();

		}

	});

	$.ajax({
		url: nextPage,
		dataType: 'text',
		success: function(nextHTML){

		var nextSlide = $('#next_slide.slide');

		console.log(nextSlide);

		var nextTemp = $('<div>').appendTo(document.body).css('display', 'none');
				nextTemp[0].innerHTML = nextHTML;

		var nextURL = nextTemp.find('.main_slide').attr('data-url');

		nextSlide.css('background-image', 'url(' + nextURL + ')');

		nextTemp.remove();


		}

	});

	loadState = true;

}

	//Infinite Pagination

	$('.arrow').on('click', function(e) {
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

	});

});

		// var pageURL = new URL(nextPageURL);

		// var pageNumber;

		// if ( pageURL.pathname.split('page/')[1] == undefined )
		// {

		// 	pageNumber = '1';

		// } else {

		// 	pageNumber = pageURL.pathname.split('page/')[1].replace('/', '');

		// }

		// var intNumber = parseInt(pageNumber, 10)

		// var prevPage,
		// 	nextPage;

		// if ( slideDirection = -1 ){

		// 	prevPage = intNumber - 1;
		// 	nextPage = intNumber + 1;

		// } else {

		// 	prevPage = intNumber + 1;
		// 	nextPage = intNumber - 1;

		// }

		// if ( slideDirection == -1 && prevPage == 0 ){
		// 	prevPage = totalPages;
		// }

		// var prevPath = '/gallery/page/' + prevPage + '/'

		// var nextPath;

		// if ( nextPage > totalPages ){

		// 	nextPath = '/gallery/'

		// } else {

		// 	nextPath = '/gallery/page/' + nextPage + '/'

		// }

		// console.log(prevPath);
		// console.log(intNumber);
		// console.log(nextPath);
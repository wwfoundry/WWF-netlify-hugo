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
window.onload(function(){

	//Get current page

	var currentPage = window.pathname,
		pageNumber;

	if ( currentPage.split('page/')[1] == undefined )
		{

			pageNumber = '1';

		} else {

			pageNumber = currentPage.split('page/')[1].replace('/', '');

		}

});

	//Infinite Pagination

	var totalPages = $('.project_slide').attr('data-total');

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

		// $.ajax({

		// 	url: prevPath,
		// 	dataType: 'text',
		// 	success: function(prev){
			
		// 		var prevDiv = $('<div>').appendTo(document.body).css('display', 'none');
		// 		prevDiv[0].innerHTML = prev;

		// 		var prevSlide = prevDiv.find('.main_slide').attr('data-url');

		// 		$('#prev_slide').css('background-image', 'url(' + prevSlide + ')');

		// 		console.log(prevSlide);

		// 		prevDiv.remove();

		// 	},
		// 	error: function(xhr, status, error) {
		// 		console.error(xhr, status, error);
		// 	}

		// });

		// $.ajax({

		// 	url: nextPath,
		// 	dataType: 'text',
		// 	success: function(next){

		// 		var nextDiv = $('<div>').appendTo(document.body).css('display', 'none');
		// 		nextDiv[0].innerHTML = next;

		// 		var nextSlide = nextDiv.find('.main_slide').attr('data-url');

		// 		$('#next_slide').css('background-image', 'url(' + nextSlide + ')')

		// 		console.log(nextSlide);

		// 		nextDiv.remove();
				
		// 	},
		// 	error: function(xhr, status, error) {
		// 		console.error(xhr, status, error);
		// 	}


		// });
	});

});
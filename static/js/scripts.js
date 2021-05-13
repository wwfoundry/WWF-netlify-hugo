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

	//Infinite Pagination

	$('body').off('click').on('click', '#arrow_right', function(e) {
		e.preventDefault(); 

		var nextPageUrl = $(this).prop('href');
		$.ajax({
			url: nextPageUrl,
			dataType: 'text', 
			success: function(html) {
				var currentContainer = $('.project_slide');

				var tempDiv = $('<div>').appendTo(document.body).css('display', 'none');
				tempDiv[0].innerHTML = html;
	
				var newContainer = tempDiv.find('.project_slide');

				currentContainer.replaceWith(newContainer);

				tempDiv.remove();

				if (window.history.pushState)
				{
					window.history.pushState(null, null, nextPageUrl);
				}
				console.log("Successfully changed page to " + nextPageUrl);
			},
			error: function(xhr, status, error) {
				console.error(xhr, status, error);

				window.location.href = nextPageUrl;
			}
		})
	});

});
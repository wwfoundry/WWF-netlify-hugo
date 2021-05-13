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

	 //we will bind an on-click handler for the next page button, but
    //handled by the body. This will allow us to replace the button
	$('body').off('click').on('click', '#arrow_right', function(e) {
		e.preventDefault(); //block the link click from changing the page
		//fire off an AJAX request to load the next page
		var nextPageUrl = $(this).prop('href');
		$.ajax({
			url: nextPageUrl,
			dataType: 'text', //this is to avoid jQuery running any <script> tags
			success: function(html) {
				var currentContainer = $('.project_slide');
				//create a temporary hidden element to attach the created document
				//this is the simplest jQuery way to do this safely.
				var tempDiv = $('<div>').appendTo(document.body).css('display', 'none');
				tempDiv[0].innerHTML = html;
				//find the container element in the new document
				var newContainer = tempDiv.find('.project_slide');
				//replace the container on the current page with the new one
				currentContainer.replaceWith(newContainer);
				//remove the temporary element
				tempDiv.remove();
				//update the URL bar
				if (window.history.pushState)
				{
					window.history.pushState(null, null, nextPageUrl);
				}
				console.log("Successfully changed page to " + nextPageUrl);
			},
			error: function(xhr, status, error) {
				console.error(xhr, status, error);
				//default to non-JS behaviour and click-through as normal
				window.location.href = nextPageUrl;
			}
		})
	});

});
arrows = document.querySelectorAll('.arrow')

arrows.addEventListener('click', function(a){

	a.preventDefault();
	a.stopPropagation();

	if (this == arrowPrev){

		range = [];

		d = 'prev';

		slideCount--

		loadUrl = arrowPrev.getAttribute('href');

	} else if ( this == arrowNext){

		if ( (slideCount+1) == projectSlideArr.length){

					range.push(projectSlideArr[slideCount]);

					slideCount = projectSlideArr.length;

		} else {

			slideCount++

		}

		d = 'next';

		loadUrl = arrowNext.getAttribute('href');

	} else if (this.classList.contains('left') && this != arrowPrev){

		for (var i = 0;i < slideCount + 1; i++){
			range.push(projectSlideArr[i]);
		}

		range.reverse();

		d = 'prev';

		loadUrl = $('#arrow_left').prop('href');

		slideCount = -1;

	} else if (this.classList.contains('right') && this != arrowNext){

		for (var i = slideCount;i < projectSlideArr.length; i++){
			range.push(projectSlideArr[i]);
		}

		d = 'next';

		loadUrl = $('#arrow_right').prop('href');

		slideCount = projectSlideArr.length;

	}

	loadState = false;

	animateSlides(d, loadUrl, slideCount, swiper, range);

	arrowPrev = document.querySelector('#arrow_left');
	arrowNext = document.querySelector('#arrow_right');

});
var cms = document.createElement('script');

var identity = document.createElement('script');

var head = document.head;

cms.setAttribute('async', 'false');

cms.src = 'https://unpkg.com/netlify-cms@^2.0.0/dist/netlify-cms.js';

identity.src = 'https://identity.netlify.com/v1/netlify-identity-widget.js';

head.insertBefore(cms, head.firstElementChild);

head.insertBefore(identity, head.cms);

cms.onload = function () {

	var trigger = document.querySelector('#nc-root');

	var config = { childList: true, subtree: true };

	var callback = function(mutationsList, observer){

		for( var mutation of mutationsList){

			if (mutation.type === 'childList' && trigger.children.length > 2 ){

				$('#right_justified').html("<a href='/admin/config.html' class='settings_item'><img src='/images/resources/gear_icon.png' alt='Settings'><span>Site Docs & Help</span></a><a href='https://app.netlify.com/' class='settings_item'><img src='/images/resources/netlify.png' alt='Netlify'><span>Hosting Provider</span></a><a href='https://github.com/wwfoundry' class='settings_item'><img src='/images/resources/github.png' alt='Github'><span>WWF Github</span></a>");

			}
		}

	}

	var observer = new MutationObserver(callback);

	observer.observe(trigger, config);

};
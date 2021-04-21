$(document).ready(function(){
	
	var parentBlock = document.getElementsByClassName('.css-1gj57a0-SidebarContainer-card');

	var newCard = document.createElement('div');

	newCard.innerHTML = "<h2 class='css-npvq26-SidebarHeading el9l68m1'>Site Configuration Options</h2><a href='https://app.netlify.com/?_ga=2.61205551.280866909.1618593718-98093853.1618593718'>Netlify Hosting</a>"

	parentBlock.appendChild(newCard);

 });
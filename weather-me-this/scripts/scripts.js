const functionality = {};

//Toggles display of modals
functionality.toggleAbout = () => {
	document.getElementById('about_button').addEventListener('click', () => {
		about.classList.toggle("hidden");
		$('.forecast').toggleClass('blur');
	})
	document.getElementById('close_button').addEventListener('click', () => {
		about.classList.toggle("hidden");
		$('.forecast').toggleClass('blur');
	})
}
functionality.openModal = () => {
	$(".weekly_item").click(function () {
		$('.weekly_modal').addClass('hidden');
		$(this).children().removeClass('hidden');
	});
}
functionality.closeModal = () => {	
	$('.weekly_modal').on('click', (e) => {
		e.stopPropagation();
		$('.weekly_modal').addClass('hidden');
	});
}

// Animates display of Error message
// functionality.showError = () => {
// 	$('.error').hide();
// 	$('.error').slideDown( 500 );
// }


// //onClick of ABOUT THIS PROJECT, display details and adds blur to background elements.
// $('.aboutThisProject').click(function () {
// 	$('.projectDetails').removeClass('hide')
// 	$('section, footer, .contactPersonal, .aboutThisProject, .poweredBy, .headerInfo, .dotted').addClass('blur');
// });

// //close ABOUT THIS PROJECT, hide details, remove blur from background elements
// $('.fa-window-close').click(function () {
// 	$('.projectDetails').addClass('hide')
// 	$('section, footer, .contactPersonal, .aboutThisProject, .poweredBy, .headerInfo, .dotted').removeClass('blur');

// });




// contains all functionality in init function
functionality.init = () => {
	functionality.toggleAbout();
	// functionality.showError();
	functionality.openModal();
	functionality.closeModal();
}


// runs init function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
	functionality.init();
});
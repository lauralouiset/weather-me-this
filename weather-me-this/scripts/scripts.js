const functionality = {};

functionality.toggleAbout = () => {
	document.getElementById('about_button').addEventListener('click', () => {
		about.classList.toggle("hidden");
	})
}

// functionality.showError = () => {
// 	$('.error').hide();
// 	$('.error').slideDown( 500 );
// }

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
const functionality = {};

functionality.toggleAbout = () => {
	document.getElementById('about_button').addEventListener('click', () => {
		about.classList.toggle("hidden");
		console.log('click');
	})
}

// contains all functionality in init function
functionality.init = () => {
	functionality.toggleAbout();
}

// runs init function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
	functionality.init();
	console.log('file loaded');
});
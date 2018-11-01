const functionality = {};

functionality.toggleAbout = () => {
	document.getElementById('about_button').addEventListener('click', () => {
		about.classList.toggle("hidden");
		console.log('click');
	})
}

// functionality.openModal = () => {
// 	// this.classList.remove("hidden");
// 	console.log('open click');
// }

// functionality.closeModal = () => {
// 	e.stopPropagation();
// 	console.log('close click');
// 	this.classList.add("hidden");
// }



// contains all functionality in init function
functionality.init = () => {
	functionality.toggleAbout();
	// functionality.openModal();
	// functionality.closeModal();
}


// runs init function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () =>{
	functionality.init();
});
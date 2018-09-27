const fs = require("fs");

function view(templateName, values, response){
	// read from the template files
		const fileContents = fs.readFileSync(`../views/${templateName}.html`,);

		// insert values into the content
	
		// write out to the response
		response.write(fileContents);


}


module.exports.view = view;
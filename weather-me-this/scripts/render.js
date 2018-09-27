const fs = require("fs");

function mergeValues(values, content){
	// cycle over the keys
	for(let key in values){
		// replace all {{key}} with the values in 'values' object
		content = content.replace("{{}}", values[key]);
	}
	// return merged content;
	return content;

}


function view(templateName, values, response){
	// read from the template files
		let fileContents = fs.readFileSync(`../views/${templateName}.html`,);
		fileContents = mergeValues(values, fileContents);

		// insert values into the content
	
		// write out to the response
		response.write(fileContents);


}


module.exports.view = view;
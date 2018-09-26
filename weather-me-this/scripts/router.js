
const forecast = require('./forecast');


const commonHeaders = { 'Content-Type': 'text/html' }

function homeRoute(request, response){
		if(request.url === "/"){
				response.writeHead(200, commonHeaders);
				response.write("Header\n");
				response.write("Search\n");
				response.end("Footer\n");s
		}
}

function cityRoute(request, response){
	const queryURL = request.url.replace("/", "");
	if(queryURL.length > 0){
		response.writeHead(200, commonHeaders);
		response.write(`Header\n`);
		// get forecast from APIs

		const forecast = new City("The Dalles, Oregon");

		response.write(`${queryURL}\n`);
		response.end(`Footer \n`);
	}
}

module.exports.home = homeRoute;
module.exports.city = cityRoute;
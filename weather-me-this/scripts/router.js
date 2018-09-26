
const Forecast = require('./forecast');


const commonHeaders = { 'Content-Type': 'text/html' }

function homeRoute(request, response){
		if(request.url === "/"){
				response.writeHead(200, commonHeaders);
				response.write("Header\n");
				response.write("Search\n");
				response.end("Footer\n");
		}
}

function cityRoute(request, response){
	const queryURL = request.url.replace("/", "");
	if(queryURL.length > 0){
		response.writeHead(200, commonHeaders);
		response.write(`Header\n`);
		// get forecast from APIs

		const forecast = new Forecast(queryURL);

		forecast.on("end", (coordsJSON) => {
			// store the values 
			const values = {
				longitude: coordsJSON.results[0].geometry.location.lng,
				latitutde: coordsJSON.results[0].geometry.location.lat,
				name: coordsJSON.results[0].formatted_address,
				county: coordsJSON.results[0].address_components[1].long_name
			}


		});
		// on error, show error
		forecast.on("error", function(error){
			// show error
		});

		response.write(`${queryURL}\n`);
		response.end(`Footer \n`);
	}
}

module.exports.home = homeRoute;
module.exports.city = cityRoute;

const Forecast = require('./forecast');
const render = require('./render');

const commonHeaders = { 'Content-Type': 'text/html' }

function homeRoute(request, response){
		if(request.url === "/"){
				response.writeHead(200, commonHeaders);
				render.view("header", {}, response );
				render.view("search", {}, response);
				render.view("footer", {}, response);
				response.end();
		}
}

function forecastRoute(request, response){
	const queryURL = request.url.replace("/", "");
	if(queryURL.length > 0){
		response.writeHead(200, commonHeaders);
		render.view("header", {}, response);
		// get forecast from APIs

		const forecast = new Forecast(queryURL);

		forecast.on("end", (coordsJSON) => {
			// store the values 
			const values = {
				longitude: coordsJSON.results[0].geometry.location.lng,
				latitude: coordsJSON.results[0].geometry.location.lat,
				placeName: coordsJSON.results[0].formatted_address,
				county: coordsJSON.results[0].address_components[1].long_name
			}
			render.view("forecast", values, response)
			render.view("footer", {}, response)
			response.end();

		});
		// on error, show error
		forecast.on("error", function(error){
			render.view("header", {}, response);
			// show error
			render.view("error", {errorMessage : error.message}, response);
			render.view("footer", {}, response)
			response.end();
		});
	}
}

module.exports.home = homeRoute;
module.exports.forecast = forecastRoute;
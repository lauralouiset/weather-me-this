
const Forecast = require('./forecast-new');
const render = require('./render');
const querystring = require('querystring');
const fs = require('fs');

const commonHeaders = { 'Content-Type': 'text/html' }

function homeRoute(request, response){
		if(request.url === "/"){
			if(request.method.toLowerCase() === "get"){
					response.writeHead(200, commonHeaders);
					render.view("header", {}, response);
					render.view("search", {}, response);
					render.view("footer", {}, response);
					response.end();
			} else{
					request.on("data", postBody => {
						// get the post data from body, extract searchTerm
						const query = querystring.parse(postBody.toString());
						const unconvertedSearchTerm = query.searchLocation;
						const searchTerm = encodeURIComponent(unconvertedSearchTerm);
						// redirect to searchterm forecast
						response.writeHead(303, {'Location':`/${searchTerm}`});
						response.end();
					});
			}
		}
}

function forecastRoute(request, response){
	const queryURL = request.url.replace("/", "");
	if (queryURL.length > 0 && request.url.indexOf('.css') === -1){
		response.writeHead(200, commonHeaders);
		render.view("header", {}, response);

		// get forecast from APIs
		const forecast = new Forecast(queryURL);

		forecast.on("end", (weatherInfo) => {
			// store the values 
			const values = {
				placeName: weatherInfo.placeName,
				currentTemp = weatherInfo.currentTemp,
				apparentTemp = weatherInfo.apparentTemp

			}
			render.view("forecast", values, response)
			render.view("footer", {}, response)
			response.end();

		});
		forecast.on("error", function(error){
			render.view("error", {errorMessage : error.message}, response);
			render.view("footer", {}, response)
			response.end();
		});
	}
}

const serveCSS = function (request, response) {
	if (request.url.indexOf(".css") !== -1) {
		var file = fs.readFileSync(`.${request.url}`, { 'encoding': 'utf8' });
		response.writeHead(200, { 'Content-Type': 'text/css' });
		response.write(file);
		response.end();
	}
};


module.exports.home = homeRoute;
module.exports.forecast = forecastRoute;
module.exports.css = serveCSS;
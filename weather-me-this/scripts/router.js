'use strict';
const Forecast = require('./forecast');
const render = require('./render');
const querystring = require('querystring');
const fs = require('fs');
// const path = require('path');

const commonHeaders = { 'Content-Type': 'text/html' }

function homeRoute(request, response) {
	if (request.url === "/") {
		if (request.method.toLowerCase() === "get") {
			response.writeHead(200, commonHeaders);
			render.view("header", {}, response);
			render.view("search", {}, response);
			render.view("footer", {}, response);
			response.end();
		} else {
			request.on("data", postBody => {
				// get the post data from body, extract searchTerm
				const query = querystring.parse(postBody.toString());
				const unconvertedSearchTerm = query.searchLocation;
				const searchTerm = unconvertedSearchTerm.replace(/ /g, "+");
				// redirect to searchterm forecast
				response.writeHead(303, { 'Location': `/${searchTerm}` });
				response.end();
			});
		}
	}
}

function forecastRoute(request, response) {
	const queryURL = request.url.replace("/", "");
	if (queryURL.length !== 0 && request.url.indexOf('.css') === -1) {
		response.writeHead(200, commonHeaders);
		render.view("header", {}, response);

		// get forecast from APIs
		const forecast = new Forecast();

		// figure out a way to emit a trigger for this function call only after the search button is clicked
		forecast.getForecast(queryURL).then(()=>{
			console.log(`function ran from router file`);
		}).catch((e) => {
			console.log("error thrown from router file");
		});

		forecast.on("end", (weatherInfo) => {

			// store the values from weatherInfo Map
			const weatherValues = {};

			weatherInfo.forEach((key, value) => {
				weatherValues[value] = key;
			});

			render.view("forecast", weatherValues, response)
			render.view("footer", {}, response)
			response.end();
		});

		forecast.on("error", function (error) {
			render.view("error", { errorMessage: error.message }, response);
			render.view("search", {}, response);
			render.view("footer", {}, response)
			response.end();
		});
	}
}

const serveStaticFiles = function (request, response) {
	if (request.url.includes(".css")) {
		const file = fs.readFileSync(`.${request.url}`, { 'encoding': 'utf8' });
		response.writeHead(200, { 'Content-Type': 'text/css' });
		response.write(file);
		response.end();
	}

	// else if (request.url.includes("scripts.js")) {
	// 	const file = fs.readFileSync(`.${request.url}`, { 'encoding': 'utf8' });
	// 	response.writeHead(200, { 'Content-Type': 'text/javascript' });
	// 	response.write(file);
	// 	response.end();
	// } 
	// else if(request.url.includes(".jpg")){
	// 	const image = fs.createReadStream()
	// };
}

module.exports.home = homeRoute;
module.exports.forecast = forecastRoute;
module.exports.static = serveStaticFiles;
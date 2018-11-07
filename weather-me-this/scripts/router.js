'use strict';
const Forecast = require('./forecast');
const render = require('./render');
const querystring = require('querystring');
const fs = require('fs');

const commonHeaders = { 'Content-Type': 'text/html' }

const staticMIME = {
	css: 'text/css',
	jpg: 'image/jpeg',
	png: 'image/png',
	js: 'application/javascript'
};

function serveStatic(request, response){
	if (request.url.includes('css')) {
		response.writeHead(200, { 'Content-type': 'text/css' });
		const css = fs.createReadStream(`.${request.url}`, 'utf8');
		css.pipe(response);
	} else if (request.url.includes("scripts.js")) {
		response.writeHead(200, { 'Content-type': 'application/javascript' });
		const js = fs.createReadStream(`.${request.url}`, 'utf8');
		js.pipe(response);
	} else if (request.url.includes(`jpg`)) {
		response.writeHead(200, { 'Content-type': 'image/jpeg' });
		const img = fs.createReadStream(`.${request.url}`);
		img.pipe(response);
	} else if (request.url.includes(`png`)) {
		response.writeHead(200, { 'Content-type': 'image/png' });
		const img = fs.createReadStream(`.${request.url}`);
		img.pipe(response);
	}
}

// to serve HTML for home route
function homeRoute(request, response) {
	if (request.url === "/") {
		
		if (request.method.toLowerCase() === "get") {
			response.writeHead(200, commonHeaders);
			render.view("header", {}, response);
			render.view("about", {}, response);
			render.view("search", {}, response);
			render.view("footer", {}, response);
			response.end();
		} else {
			request.on("data", postBody => {
				// get the post data from body, extract searchTerm
				const query = querystring.parse(postBody.toString());
				const tempUnit = query.tempUnit;
				//encodes URI removing spaces and unusual/accented characters
				const searchLocation = encodeURI(query.searchLocation);
				// redirect to searchterm forecast
				response.writeHead(303, { 'Location': `/${searchLocation}&${tempUnit}`});
				response.end();
			});
		}
	}
}

// to serve HTML for forecast route (after search)
function forecastRoute(request, response) {
	const queryURL = request.url.replace("/", "");
	if (queryURL.length !== 0 && request.url.indexOf('.css') === -1 && request.url.indexOf('scripts.js') === -1 && request.url.indexOf('jpg') === -1 && request.url.indexOf('png') === -1) {

		const splitQuery = queryURL.split('&');
		const searchLocation = splitQuery[0];
		const tempUnit = splitQuery[1];

		response.writeHead(200, commonHeaders);
		render.view("header", {}, response);
		render.view("about", {}, response);
		// get forecast from APIs
		const forecast = new Forecast(searchLocation, tempUnit);
		
		forecast.getForecast(searchLocation).then(()=>{
		}).catch((e) => {
			console.log("Unable to complete that request.");
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

module.exports.home = homeRoute;
module.exports.forecast = forecastRoute;
module.exports.static = serveStatic;
'use strict';
const Forecast = require('./forecast');
const render = require('./render');
const querystring = require('querystring');
const fs = require('fs');
// const path = require('path');

const commonHeaders = { 'Content-Type': 'text/html' }

const mime = {
	html: 'text/html',
	txt: 'text/plain',
	css: 'text/css',
	gif: 'image/gif',
	jpg: 'image/jpeg',
	png: 'image/png',
	svg: 'image/svg+xml',
	js: 'application/javascript'
};

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
		const forecast = new Forecast(queryURL);

	//	figure out a way to emit a trigger for this function call only after the search button is clicked
		forecast.getForecast(queryURL).then(()=>{
		}).catch((e) => {
			console.log("error thrown from router file");
		});

		forecast.on("end", (weatherInfo) => {
			// store the values from weatherInfo Map
			const weatherValues = {};
			weatherInfo.forEach((key, value) => {
				weatherValues[value] = key;
			});
			render.view("about", {}, response);
			render.view("forecast", weatherValues, response)
			render.view("footer", {}, response)
			response.end();
		});

		forecast.on("error", function (error) {
			render.view("error", { errorMessage: error.message }, response);
			render.view("about", {}, response);
			render.view("search", {}, response);
			render.view("footer", {}, response)
			response.end();
		});
	}
}

const serveCSS = function (request, response) {
		if (request.url.includes('css') ) {
			const css = fs.createReadStream(`.${request.url}`, 'utf8');
			response.writeHead(200, { 'Content-type': 'text/css' });
			css.pipe(response);
		}
}

const serveJS = function(request, response){
	if (request.url.includes("app_scripts")) {
		// const file = fs.readFileSync(`.${request.url}`, { 'encoding': 'utf8' });
		// response.writeHead(200, { 'Content-Type': 'application/javascript' });
		// response.write(file);
		// response.end();
		// const js = fs.createReadStream(`.${request.url}`, 'utf8');
		// js.writeHead(200, { 'Content-type': 'application/javascript' });
		// js.pipe(response);
	}
}

// const serveImage = function(request, response){

// 	if ( request.url.includes(".jpg") || request.url.includes(".png") ) {
// 	const file = fs.readFile(`.${request.url}`, { 'encoding' : 'base64'});
// 	const image = fs.createReadStream(file);
// 	image.on('open', function () {
// 		let type

// 		if (request.url.includes(".jpg") ){
// 			type = mime.jpg;
// 		} else if ( request.url.includes(".png") ) {
// 			type = mime.png;
// 		}
// 		response.setHeader('Content-Type', type);
// 		image.pipe(response);
// 		});
// 	}
// }

module.exports.home = homeRoute;
module.exports.forecast = forecastRoute;
module.exports.css = serveCSS;
module.exports.javascript = serveJS;
// module.exports.images = serveImage;
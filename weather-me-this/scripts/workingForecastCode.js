const EventEmitter = require('events');
const https = require("https");
const http = require('http');
const api = require('./api.json');

// some code to use when refactoring
// class SearchCity extends EventEmitter{};
// const searchCity = new SearchCity('Moose Jaw, Saskatchewan');

const searchLocation = {};

function getForecast(lat, long){

	const request = https.get(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}`, (response) => {

		if (response.statusCode === 200) {
			let body = "";
			// on data event, concatenate buffer in body and convert body to string
			response.on('data', data => {
				body += data.toString();
			});
			response.on('end', () => {
				// when finished, convert string to JSON
				const forecast = JSON.parse(body);
				console.log(forecast.hourly.summary);
			})
		}
	});
}

function getCityCoordinates(searchQuery){

	const searchTerm = searchQuery.replace(/ /g, "+");

	const request = https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchTerm}&key=${api.googleMaps}`, (response) => {

			if(response.statusCode === 200){
					let body = "";
					// on data event, concatenate buffer in body and convert body to string
					response.on('data', data => {
							body += data.toString();
					});
				response.on('end', () => {
						// when finished, convert string to JSON
						const coords = JSON.parse(body);
						searchLocation.lat = coords.results[0].geometry.location.lat;
						searchLocation.long = coords.results[0].geometry.location.lng;
						searchLocation.name = coords.results[0].formatted_address;
						console.log(searchLocation.name);
						getForecast(searchLocation.lat, searchLocation.long);
				})
			}
	});
}


getCityCoordinates("The Dalles, Oregon");


module.exports.forecast = getCityCoordinates;
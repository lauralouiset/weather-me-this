const EventEmitter = require('events');
const https = require("https");
const http = require('http');
const api = require('./api.json');

// some code to use when refactoring
// class SearchCity extends EventEmitter{};
// const searchCity = new SearchCity('Moose Jaw, Saskatchewan');

// const searchTerm = unconvertedSearchTerm.replace(/ /g, "+");
const searchLocation = {};

function getForecast(lat, long){

	const request = https.get(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`, (response) => {

		if (response.statusCode !== 200){
				console.log(`Unable to find weather for that location - Dark Sky API ${response.statusCode}`);
		} else{
			let body = "";
			// on data event, concatenate buffer in body and convert body to string
			response.on('data', data => {
				body += data.toString();
			});
			response.on('end', () => {
				// when finished, convert string to JSON
				const forecast = JSON.parse(body);
				searchLocation.temperature = forecast.currently.temperature

				console.log(forecast.hourly.summary);
				console.log(`The current temperature is ${searchLocation.temperature} degrees Celsius`);
			})
		}
	});
}

function getCityCoordinates(searchQuery){
	const request = https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${api.googleMaps}`, (response) => {

			if(response.statusCode === 200){
					let body = "";
					// on data event, concatenate buffer in body and convert body to string
					response.on('data', data => {
							body += data.toString();
					});
				response.on('end', () => {
					//	when finished, convert string to JSON
						const coords = JSON.parse(body);

						if(coords.status === "OK"){
								searchLocation.lat = coords.results[0].geometry.location.lat;
								searchLocation.long = coords.results[0].geometry.location.lng;
								searchLocation.name = coords.results[0].formatted_address;
								console.log(searchLocation.name);
								getForecast(searchLocation.lat, searchLocation.long);
						} else{
							console.log(`Unable to find that location`);
						}
				})
			}
	});
}

// to use this file on the command line
const commandLineQuery = process.argv.slice(2).join("+").replace(' ', '+');

getCityCoordinates(commandLineQuery);

module.exports.forecast = getCityCoordinates;
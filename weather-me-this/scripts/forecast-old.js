var EventEmitter = require("events").EventEmitter;
const https = require("https");
const http = require("http");
const util = require("util");


const api = require('./api.json');

/**
 * An EventEmitter to get City Coordinates
 * @param username
 * @constructor
*/

function Forecast(searchCity) {

	const searchLocation = {};

	EventEmitter.call(this);

	var forecastEmitter = this;

	//Connect to the Google Maps Geocoding API
	var request = https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchCity}&key=${api.googleMaps}`, response => {
		var body = "";

		if (response.statusCode !== 200) {
			request.abort();
			//Status Code Error
			forecastEmitter.emit("error", new Error(`There was an error getting the profile for ${searchCity} ( ${http.STATUS_CODES[response.statusCode]})`));
		}
		//Read the data
		response.on('data', function (chunk) {
			body += chunk;
			forecastEmitter.emit("data", chunk);
		});

		response.on('end', function () {
			if (response.statusCode === 200) {
				try {
					//Parse the data
					const forecast = JSON.parse(body);
					forecastEmitter.emit("end", forecast);
				} catch (error) {
					forecastEmitter.emit("error", error);
				}
			}
		}).on("error", function (error) {
			forecastEmitter.emit("error", error);
		});
	});
}

util.inherits(Forecast, EventEmitter);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           

module.exports = Forecast;
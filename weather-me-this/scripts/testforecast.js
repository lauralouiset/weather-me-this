var EventEmitter = require("events").EventEmitter;
const https = require("https");
const http = require("http");
const util = require("util");


const api = require('./api.json');

/**
 * An EventEmitter to get City Coordinates
 * @param searchLocation
 * @constructor
*/

class Forecast extends EventEmitter {
	forecastEmitter = this;
	constructor(searchLocation) {
		super();
		this.searchLocation = searchLocation;
	}

		var request = https.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${api.googleMaps}`, response => {
			var body = "";

			if (response.statusCode !== 200) {
				request.abort();
				//Status Code Error
				forecastEmitter.emit("error", new Error(`There was an error getting the profile for that location.(${http.STATUS_CODES[response.statusCode]})`));
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
			})
		});

	}
	

}


module.exports = Forecast;
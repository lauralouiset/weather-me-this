'use strict';

const EventEmitter = require('events');
const axios = require('axios');

const api = require('./api.json');

/**
 * An EventEmitter to get City Coordinates
 * @param searchLocation
 * @constructor
*/

module.exports =  class Forecast extends EventEmitter{
	constructor(searchLocation){
		super();

		this.searchLocation = searchLocation;
		this.coords = new Map();
		this.weather = new Map();
	}
	
	/**
		* Gets latitude and longitude coordinates from searchLocation
		* @param searchLocation
	*/
	async getCoords(searchLocation) {
		try {
			const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${api.googleMaps}`).catch(() =>{
				console.log('getCoords failed');
			});

			this.coords.set('long', response.data.results[0].geometry.location.lng);
			this.coords.set('lat', response.data.results[0].geometry.location.lat);
			this.weather.set('placeName', response.data.results[0].formatted_address);
		} catch {
			const error1 = new Error('the getCoords function failed');
			this.emit('error', error1);
			
		}
	}

	/**
		* Gets weather information from latitude and longitude coordinates
		* @param lat 		number   Latitudinal coordinates
		* @param long   number   Longitudinal coordinates
	*/
	async getWeather(){
		try {
			const lat = this.coords.get('lat');
			const long = this.coords.get('long');

			const response = await axios.get(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`);

			this.weather.set('currentTemp', Math.round(response.data.currently.temperature));
			this.weather.set('apparentTemp', Math.round(response.data.currently.apparentTemperature));

		} catch {
			const error2 = new Error('The forecast was unable to be retrieved');
			this.emit('error', error2);
		}
	}

	/**
		* Calls get Coords and getWeather to output the forecast
		* @param searchTerm 	string   query term provided by router
	*/
		async getForecast(searchLocation){
			try {
				const coords = await this.getCoords(searchLocation);
				const weather = await this.getWeather();

			const weatherInfo = this.weather;
			this.emit('end', weatherInfo);
			} catch {
				const error3 =  new Error('The getForecast function failed');
				this.emit('error', error3);
			}

	}
// end of class
}
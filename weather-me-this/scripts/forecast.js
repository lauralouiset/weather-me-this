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
			console.log(this.weather.get('placeName'));
		} catch {
			const error = new Error('That location could not be found.');
			this.emit('error', error);
			throw error;
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

			console.log(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`)


			//today's weather
			this.weather.set('currentTemp', Math.round(response.data.currently.temperature));
			this.weather.set('todayApparentTemp', Math.round(response.data.currently.apparentTemperature));
			this.weather.set('todayHigh', Math.round(response.data.daily.data[0].temperatureHigh));
			this.weather.set('todayLow', Math.round(response.data.daily.data[0].temperatureLow));
			this.weather.set('todayDesc', response.data.minutely.summary);
			this.weather.set('todayPOP', response.data.currently.precipProbability);
			this.weather.set('todayHum', (response.data.currently.humidity * 100));
			this.weather.set('todayWind', Math.round(response.data.currently.windSpeed));
			this.weather.set('weekDesc', response.data.daily.summary);

			// tomorrow weather (day 1)
			this.weather.set('day1High');
			this.weather.set('day1Low');
			this.weather.set('day1POP');
			this.weather.set('day1Hum');
			this.weather.set('day1desc')


			// day 2 weather

			//day 3 weather

			//day 4 weather

			//day 5 weather

		} catch {
			const error = new Error('The forecast was unable to be retrieved.');
			this.emit('error', error);
			throw error;
		}
	}

	/**
		* gets Date info
	*/
	async getDateandTime(){
		const date = new Date();
	}

	/**
		* Calls get Coords and getWeather to output the forecast
		* @param searchTerm 	string   query term provided by router
	*/
		async getForecast(searchLocation){
			try {
				const coords = await this.getCoords(searchLocation);
				console.log('coords ran');
				const weather = await this.getWeather();

				console.log(`getWeather ran`);
				// const date = await this.getDateAndTime();

			const weatherInfo = this.weather;
			this.emit('end', weatherInfo);
			} catch (e){
				console.log(e)
				const error =  new Error('The getForecast function failed');
				// this.emit('error', error);
				throw error;
			}

	}
// end of class
}
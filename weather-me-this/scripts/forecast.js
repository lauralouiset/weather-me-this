'use strict';

const EventEmitter = require('events');
const axios = require('axios');

const api = require('./api.json');

/**
 * An EventEmitter to get City Coordinates
 * @param searchLocation
 * @constructor
*/

module.exports = class Forecast extends EventEmitter {
	constructor(searchLocation) {
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
			const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${api.googleMaps}`
			const response = await axios.get(URL);

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
	async getWeather() {
		try {
			const lat = this.coords.get('lat');
			const long = this.coords.get('long');
			const URL = `https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`;
			const response = await axios.get(URL);

			// WRITE FUNCTION TO EXTRACT ALL WEEKLY DATA

			//today's weather
			this.weather.set('currentTemp', Math.round(response.data.currently.temperature));
			this.weather.set('todayApparentTemp', Math.round(response.data.currently.apparentTemperature));
			this.weather.set('todayHigh', Math.round(response.data.daily.data[0].temperatureHigh));
			this.weather.set('todayLow', Math.round(response.data.daily.data[0].temperatureLow));
			this.weather.set('todayDesc', response.data.daily.data[0].summary);
			this.weather.set('todayPOP', Math.round(response.data.currently.precipProbability * 100));
			this.weather.set('todayHum', Math.round(response.data.currently.humidity * 100));
			this.weather.set('todayWind', Math.round(response.data.currently.windSpeed));
			this.weather.set('weekDesc', response.data.daily.summary);
			this.weather.set('todayIcon', response.data.currently.icon);
			this.weather.set('todayIconAlt', response.data.currently.icon);


			//  LOOP TO EXTRACT ALL WEEKLY WEATHER DATA
			for (let i = 1; i <= 5; ++i) {
				this.weather.set(`day${i}Temp`, Math.round(response.data.daily.data[i].apparentTemperatureHigh));
				this.weather.set(`day${i}High`, Math.round(response.data.daily.data[i].temperatureHigh));
				this.weather.set(`day${i}Low`, Math.round(response.data.daily.data[i].temperatureLow));
				this.weather.set(`day${i}POP`, Math.round(response.data.daily.data[i].precipProbability * 100));
				this.weather.set(`day${i}Hum`, Math.round(response.data.daily.data[i].humidity * 100));
				this.weather.set(`day${i}Desc`, response.data.daily.data[i].summary);
				this.weather.set(`day${i}Icon`, response.data.daily.data[i].icon);
				this.weather.set(`day${i}IconAlt`, response.data.daily.data[i].icon);
				this.weather.set(`day${i}ModalIcon`, response.data.daily.data[i].icon);
				this.weather.set(`day${i}ModalIconAlt`, response.data.daily.data[i].icon);
				this.weather.set(`day${i}DateRaw`, response.data.daily.data[i].time);
			}

		} catch {
			const error = new Error('The forecast was unable to be retrieved.');
			this.emit('error', error);
			throw error;
		}
	}

	/**
		* gets Date/Time info
	*/
	getDateAndTime() {

		const date = new Date();
		let hours = date.getHours();
		const mins = date.getMinutes();
		let AMPM;

		
			if (hours === 12) {
				AMPM = "PM"
			} else if (hours > 12) {
				hours = (hours - 12);
				AMPM = "PM";
			} else {
				AMPM = "AM";
			}
		

		// Sets today's date and time
		this.weather.set('currentTime', `${hours}:${mins} ${AMPM}`);
		this.weather.set('currentDate', date.toDateString().toUpperCase());

		// Sets weekly item/modal dates
		for (let i = 1; i <= 5; ++i) {
			const weeklyDate = this.weather.get(`day${i}DateRaw`);
			const dateString = new Date(weeklyDate * 1000).toString().split(' ');
			const dateDay = dateString[0]; // MON
			const dateDate = dateString[1] + " " + dateString[2]; // MONTH + DAY

			this.weather.set(`day${i}Day`, dateDay);
			this.weather.set(`day${i}Date`, dateDate);
		}

	}

	/**
		* Calls get Coords and getWeather to output the forecast
		* @param searchTerm 	string   query term provided by router
	*/
	async getForecast(searchLocation) {
		try {
			const coords = await this.getCoords(searchLocation);
			const weather = await this.getWeather();
			const dateTime = await this.getDateAndTime();

			const weatherInfo = this.weather;
			this.emit('end', weatherInfo);
		} catch (e) {
			const error = new Error('The getForecast function failed');
			// this.emit('error', error);
			console.log(`Error thrown from getForecast function`);
			throw error;
		}

	}
	// end of class
}
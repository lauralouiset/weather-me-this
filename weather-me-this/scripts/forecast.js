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
			// this.emit('error', error);
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

			// day 1 weather (tomorrow)
			this.weather.set('day1Temp', Math.round(response.data.daily.data[1].apparentTemperatureHigh));
			this.weather.set('day1High', Math.round(response.data.daily.data[1].temperatureHigh));
			this.weather.set('day1Low', Math.round(response.data.daily.data[1].temperatureLow));
			this.weather.set('day1POP', response.data.daily.data[1].precipProbability);
			this.weather.set('day1Hum', (response.data.daily.data[1].humidity) * 100);
			this.weather.set('day1Desc', response.data.daily.data[1].summary);
			// day 2 weather
			this.weather.set('day2Temp', Math.round(response.data.daily.data[2].apparentTemperatureHigh));
			this.weather.set('day2High', Math.round(response.data.daily.data[2].temperatureHigh));
			this.weather.set('day2Low', Math.round(response.data.daily.data[2].temperatureLow));
			this.weather.set('day2POP', response.data.daily.data[2].precipProbability);
			this.weather.set('day2Hum', (response.data.daily.data[2].humidity) * 100);
			this.weather.set('day2Desc', response.data.daily.data[2].summary);

			//day 3 weather
			this.weather.set('day3Temp', Math.round(response.data.daily.data[3].apparentTemperatureHigh));
			this.weather.set('day3High', Math.round(response.data.daily.data[3].temperatureHigh));
			this.weather.set('day3Low', Math.round(response.data.daily.data[3].temperatureLow));
			this.weather.set('day3POP', response.data.daily.data[3].precipProbability);
			this.weather.set('day3Hum', (response.data.daily.data[3].humidity) * 100);
			this.weather.set('day3Desc', response.data.daily.data[3].summary);
			//day 4 weather
			this.weather.set('day4Temp', Math.round(response.data.daily.data[4].apparentTemperatureHigh));
			this.weather.set('day4High', Math.round(response.data.daily.data[4].temperatureHigh));
			this.weather.set('day4Low', Math.round(response.data.daily.data[4].temperatureLow));
			this.weather.set('day4POP', response.data.daily.data[4].precipProbability);
			this.weather.set('day4Hum', (response.data.daily.data[4].humidity) * 100);
			this.weather.set('day4Desc', response.data.daily.data[4].summary);
			//day 5 weather
			this.weather.set('day5Temp', Math.round(response.data.daily.data[5].apparentTemperatureHigh));
			this.weather.set('day5High', Math.round(response.data.daily.data[5].temperatureHigh));
			this.weather.set('day5Low', Math.round(response.data.daily.data[5].temperatureLow));
			this.weather.set('day5POP', response.data.daily.data[5].precipProbability);
			this.weather.set('day5Hum', (response.data.daily.data[5].humidity) * 100);
			this.weather.set('day5Desc', response.data.daily.data[5].summary);

		} catch {
			const error = new Error('The forecast was unable to be retrieved.');
			// this.emit('error', error);
			throw error;
		}
	}

	/**
		* gets Date info
	*/
		getDateAndTime(){

		const date = new Date();
		let hours = date.getHours();
		const mins = date.getMinutes();
		let AMPM;

		const AMorPM = (hrs) => {
			if (hrs >= 12) {
				hours = (hrs - 12);
				AMPM = "PM";
			} else {
				AMPM = "AM";
			}
		}
		 AMorPM(hours);
	
			const currentTime = `${hours}:${mins} ${AMPM}`;
			const currentDate = date.toDateString().toUpperCase();
			this.weather.set('currentTime', currentTime);
			this.weather.set('currentDate', currentDate);
	}

	/**
		* Calls get Coords and getWeather to output the forecast
		* @param searchTerm 	string   query term provided by router
	*/
		async getForecast(searchLocation){
			try {
				const coords = await this.getCoords(searchLocation);
				const weather = await this.getWeather();
				this.getDateAndTime();

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
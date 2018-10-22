const EventEmitter = require('events');
const axios = require('axios');

const api = require('./api.json');

/**
 * An EventEmitter to get City Coordinates
 * @param searchLocation
 * @constructor
*/

class Forecast extends EventEmitter{
	forecastEmitter = this;
	constructor(searchLocation){
		super();
		this.searchLocation = searchLocation;
		this.lat = 'latitude';
		this.long = 'longitude';
		this.weather = {};
	}
	
	/**
		* Gets latitude and longitude coordinates from searchLocation
		* @param searchLocation
	*/
	getCoords(searchLocation) {
		return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${api.googleMaps}`)
		.then( (response)=>{

			if (response.data.status === 'ZERO_RESULTS') {
				const error =  new Error('Unable to find that address.');
				forecastEmitter.emit("error", error);
			} else{
					this.lat = response.results[0].geometry.location.lat,
					this.long =	response.results[0].geometry.location.lng
					this.weather.place = response.results[0].formatted_address;
			}
		});
	}


	/**
		* Gets weather information from latitude and longitude coordinates
		* @param lat 		number   Latitudinal coordinates
		* @param long   number   Longitudinal coordinates
	*/
	getWeather(lat, long){
		return axios.get(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`)
		.then((response) => {

// use destructuring to create variables from forecast
			this.weather.currentTemp = response.currently.temperature;
			this.weather.apparentTemp = response.currently.apparentTemperature;
		})
		.catch( () => {
				const error = new Error('Unable to connect to API servers.');
				this.emit('error', error);	
		});

	}

	async getWeather(searchLocation){
			try{
				await this.getCoords(searchLocation);
				await this.getWeather(this.lat, this.long);
				const weatherInfo = this.weatherInfo;
				this.emit('end', weatherInfo);
			} catch(e){
					this.emit('error', e);
			}
	}

}


module.exports.forecast = Forecast;
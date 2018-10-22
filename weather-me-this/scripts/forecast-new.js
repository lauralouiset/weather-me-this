const EventEmitter = require('events');
const axios = require('axios');

const api = require('./api.json');

/**
 * An EventEmitter to get City Coordinates
 * @param searchLocation
 * @constructor
*/

class Forecast extends EventEmitter{
	
	constructor(searchLocation){
		super();
		this.searchLocation = searchLocation;
		this.lat = 'latitude';
		this.long = 'longitude';
		this.place = 'place';
		this.weather = {};
	}
	
	/**
		* Gets latitude and longitude coordinates from searchLocation
		* @param searchLocation
	*/
	getCoords(searchLocation) {
		return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${searchQuery}&key=${api.googleMaps}`).then( (response)=>{
			this.lat = response.results[0].geometry.location.lat,
			this.long =	response.results[0].geometry.location.lng
			this.place = response.results[0].formatted_address;
		}).catch( e => {
			// throw new Error('Unable to find that location')
		});
	}


	/**
		* Gets weather information from latitude and longitude coordinates
		* @param lat 		number   Latitudinal coordinates
		* @param long   number   Longitudinal coordinates
	*/
	getWeather(lat, long){
		return axios.get(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`).then((response) => {

// use destructuring to create variables from forecast


		});

	}

	async getWeather(searchLocation){
		await this.getCoords(searchLocation);
		await this.getWeather(this.lat, this.long);
	}

}


module.exports.forecast = Forecast;
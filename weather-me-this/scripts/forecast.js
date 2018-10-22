const EventEmitter = require('events');
const axios = require('axios');

const api = require('/api.json');


/**
 * An EventEmitter to get City Coordinates
 * @param searchLocation
 * @constructor
*/

class Forecast extends EventEmitter{
	
	constructor(searchLocation){
		super();
		searchLocation = this.searchLocation,
		this.lat = 'latitude',
		this.long = 'longitude',
		this.place = 'place'
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
		});
	}
	/**
		* Gets weather information from latitude and longitude coordinates
		* @param lat 		number   Latitudinal coordinates
	*/
	getWeather(lat, long){
		return axiox.get(`https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`).then(() => {

// use destructuring to create variables from forecast
		});

	}
}


module.exports.forecast = Forecast;
// a non ES6 version of forecast app


'use strict';

const api = require('./api.json');
const axios = require('axios');

const coords = new Map();
const weather = new Map();


// GETS COORDINATES

async function getCoords(searchLocation) {

	try{
		const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${searchLocation}&key=${api.googleMaps}`;

		const response = await axios.get(URL);

		coords.set('long', response.data.results[0].geometry.location.lng);
		coords.set('lat', response.data.results[0].geometry.location.lat);
		weather.set('placeName', response.data.results[0].formatted_address);
		console.log(weather.get('placeName'));

	} catch(e){
		throw new Error('That location could not be found');
	}

}

// GETS THE WEATHER FORECAST

async function getWeather() {
	try{
		const lat = coords.get('lat');
		const long = coords.get('long');
		const URL = `https://api.darksky.net/forecast/${api.darkSky}/${lat},${long}?units=si`;

		const response = await axios.get(URL);

	//today's weather
	weather.set('currentTemp', Math.round(response.data.currently.temperature));
	weather.set('todayApparentTemp', Math.round(response.data.currently.apparentTemperature));
	weather.set('todayHigh', Math.round(response.data.daily.data[0].temperatureHigh));
	weather.set('todayLow', Math.round(response.data.daily.data[0].temperatureLow));
	weather.set('todayDesc', response.data.daily.data[0].summary);
	weather.set('todayPOP', Math.round(response.data.currently.precipProbability * 100));
	weather.set('todayHum', Math.round(response.data.currently.humidity * 100));
	weather.set('todayWind', Math.round(response.data.currently.windSpeed));
	weather.set('weekDesc', response.data.daily.summary);
	weather.set('todayIcon', response.data.currently.icon);
	weather.set('todayIconAlt', response.data.currently.icon);


		for (let i = 1; i <= 5; ++i) {
			weather.set(`day${i}Temp`, Math.round(response.data.daily.data[i].apparentTemperatureHigh));
			weather.set(`day${i}High`, Math.round(response.data.daily.data[i].temperatureHigh));
			weather.set(`day${i}Low`, Math.round(response.data.daily.data[i].temperatureLow));
			weather.set(`day${i}POP`, Math.round(response.data.daily.data[i].precipProbability * 100));
			weather.set(`day${i}Hum`, Math.round(response.data.daily.data[i].humidity * 100));
			weather.set(`day${i}Desc`, response.data.daily.data[i].summary);
			weather.set(`day${i}Icon`, response.data.daily.data[i].icon);
			weather.set(`day${i}IconAlt`, response.data.daily.data[i].icon);
			weather.set(`day${i}ModalIcon`, response.data.daily.data[i].icon);
			weather.set(`day${i}ModalIconAlt`, response.data.daily.data[i].icon);
			weather.set(`day${i}DateRaw`, response.data.daily.data[i].time);
		}

	} catch(e){
		const error = new Error(`The forecast could not be retrieved.`);
		throw error;
	}


}

// GET DATE AND TIME

function getDateAndTime() {
	try {
		const date = new Date();
		let hours = date.getHours();
		const mins = date.getMinutes();
		let AMPM;

		const AMorPM = (hrs) => {
			if (hrs === 12) {
				AMPM = "PM"
			}
			if (hrs > 12) {
				hours = (hrs - 12);
				AMPM = "PM";
			} else {
				AMPM = "AM";
			}
		}
		
		AMorPM(hours);

		const currentTime = `${hours}:${mins} ${AMPM}`;
		const currentDate = date.toDateString().toUpperCase();
		weather.set('currentTime', currentTime);
		weather.set('currentDate', currentDate);

		// map over raw Dates to output days and dates
		function fetchModalDates() {
			for (let i = 1; i <= 5; ++i) {
				const date = weather.get(`day${i}DateRaw`);
				const dateString = new Date(date * 1000).toString().split(' ');
				const dateDay = dateString[0]; // MON
				const dateDate = dateString[1] + " " + dateString[2]; // MONTH + DAY

				weather.set(`day${i}Day`, dateDay);

				console.log(weather.get(`day${i}Day`));
				weather.set(`day${i}Date`, dateDate);
			}
		}
			fetchModalDates();

	} catch(e){
		const error = new Error('The date/time could not be retrieved');
		throw error;
	}

}

async function getForecast(searchLocation){
	const getcoords = await getCoords(searchLocation);
	const getweather = await getWeather();
	const getdate = await getDateAndTime();
}

getForecast('Toronto').then( ()=>{
	console.log(weather);

}).catch((e)=>{
	console.log(e.message)
});

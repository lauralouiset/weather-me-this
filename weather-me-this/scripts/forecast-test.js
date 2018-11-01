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

	// day 1 weather (tomorrow)
	weather.set('day1Temp', Math.round(response.data.daily.data[1].apparentTemperatureHigh));
	weather.set('day1High', Math.round(response.data.daily.data[1].temperatureHigh));
	weather.set('day1Low', Math.round(response.data.daily.data[1].temperatureLow));
	weather.set('day1POP', Math.round(response.data.daily.data[1].precipProbability * 100));
	weather.set('day1Hum', Math.round(response.data.daily.data[1].humidity * 100));
	weather.set('day1Desc', response.data.daily.data[1].summary);
	weather.set('day1Icon', response.data.daily.data[1].icon);
	weather.set('day1IconAlt', response.data.daily.data[1].icon);
	weather.set('day1ModalIcon', response.data.daily.data[1].icon);
	weather.set('day1ModalIconAlt', response.data.daily.data[1].icon);
	weather.set('day1DateRaw', response.data.daily.data[1].time);
	// day 2 weather
	weather.set('day2Temp', Math.round(response.data.daily.data[2].apparentTemperatureHigh));
	weather.set('day2High', Math.round(response.data.daily.data[2].temperatureHigh));
	weather.set('day2Low', Math.round(response.data.daily.data[2].temperatureLow));
	weather.set('day2POP', Math.round(response.data.daily.data[2].precipProbability * 100));
	weather.set('day2Hum', Math.round(response.data.daily.data[2].humidity * 100));
	weather.set('day2Desc', response.data.daily.data[2].summary);
	weather.set('day2Icon', response.data.daily.data[2].icon);
	weather.set('day2ModalIcon', response.data.daily.data[2].icon);
	weather.set('day2IconAlt', response.data.daily.data[2].icon);
	weather.set('day2ModalIconAlt', response.data.daily.data[2].icon);
	weather.set('day2DateRaw', response.data.daily.data[2].time);
	//day 3 weather
	weather.set('day3Temp', Math.round(response.data.daily.data[3].apparentTemperatureHigh));
	weather.set('day3High', Math.round(response.data.daily.data[3].temperatureHigh));
	weather.set('day3Low', Math.round(response.data.daily.data[3].temperatureLow));
	weather.set('day3POP', Math.round(response.data.daily.data[3].precipProbability * 100));
	weather.set('day3Hum', Math.round(response.data.daily.data[3].humidity * 100));
	weather.set('day3Desc', response.data.daily.data[3].summary);
	weather.set('day3Icon', response.data.daily.data[3].icon);
	weather.set('day3ModalIcon', response.data.daily.data[3].icon);
	weather.set('day3IconAlt', response.data.daily.data[3].icon);
	weather.set('day3ModalIconAlt', response.data.daily.data[3].icon);
	weather.set('day3DateRaw', response.data.daily.data[3].time);
	//day 4 weather
	weather.set('day4Temp', Math.round(response.data.daily.data[4].apparentTemperatureHigh));
	weather.set('day4High', Math.round(response.data.daily.data[4].temperatureHigh));
	weather.set('day4Low', Math.round(response.data.daily.data[4].temperatureLow));
	weather.set('day4POP', Math.round(response.data.daily.data[4].precipProbability * 100));
	weather.set('day4Hum', Math.round(response.data.daily.data[4].humidity * 100));
	weather.set('day4Desc', response.data.daily.data[4].summary);
	weather.set('day4Icon', response.data.daily.data[4].icon);
	weather.set('day4ModalIcon', response.data.daily.data[4].icon);
	weather.set('day4IconAlt', response.data.daily.data[4].icon);
	weather.set('day4ModalIconAlt', response.data.daily.data[4].icon);
	weather.set('day4DateRaw', response.data.daily.data[4].time);
	//day 5 weather
	weather.set('day5Temp', Math.round(response.data.daily.data[5].apparentTemperatureHigh));
	weather.set('day5High', Math.round(response.data.daily.data[5].temperatureHigh));
	weather.set('day5Low', Math.round(response.data.daily.data[5].temperatureLow));
	weather.set('day5POP', Math.round(response.data.daily.data[5].precipProbability * 100));
	weather.set('day5Hum', Math.round(response.data.daily.data[5].humidity * 100));
	weather.set('day5Desc', response.data.daily.data[5].summary);
	weather.set('day5Icon', response.data.daily.data[5].icon);
	weather.set('day5ModalIcon', response.data.daily.data[5].icon);
	weather.set('day5IconAlt', response.data.daily.data[5].icon);
	weather.set('day5ModalIconAlt', response.data.daily.data[5].icon);
	weather.set('day5DateRaw', response.data.daily.data[5].time);
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
	// console.log(weather);

}).catch((e)=>{
	console.log(e.message)
});

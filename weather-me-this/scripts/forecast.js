const EventEmitter = require('events');
const https = require("https");
const http = require("http");
const util = require('util');

const api = require('./api.json');

let latitude;
let longitude;


function getCityCoordinates(){

}

function getForecast(latitude, longitude){

	const request = https.get(`https://api.darksky.net/forecast/${api.darkSky}/${latitude},${longitude}`, response() => {
		// callback function block

	});

}
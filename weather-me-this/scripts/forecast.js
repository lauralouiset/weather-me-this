const EventEmitter = require('events');
const http = require('http');
const https = require('https');

const api = require('/api.json');


/**
 * An EventEmitter to get City Coordinates
 * @param location
 * @constructor
*/

class Forecast extends EventEmitter{
		constructor(){
			super();
		}

}


module.exports.forecast = Forecast;
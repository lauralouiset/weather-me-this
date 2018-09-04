// require http
const http = require('http');
// require json file with api key
const api = require('./api.json')

//const cityname = `Toronto`;

function kelvinToCelcius(degreesKelvin){
	const degreesCelcius = (degreesKelvin - 273.15).toFixed(1);
	return degreesCelcius;
}

function printError(error){
	console.error(error.message);
}



function printWeather(weather){
	const degCel = kelvinToCelcius(weather.main.temp);
	const message = `Current temperature in ${weather.name} is ${degCel} degrees Celcius.`
	console.log(message);
}


// all good above here

function requestWeather(query) {

	try{
		
		// TRY STARTS
				const request = http.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=${api.key}`, response => {
					if(response.statusCode === 200){
							let body = '';
						
							response.on('data', data => {
								body += data.toString();
								});
						
							response.on('end', ()=> {
									const weather = JSON.parse(body);
									printWeather(weather);
								});
						} else if(response.statusCode === 404){
					const notFoundMessage = `The location ${query} was not found.`
					const notFound = new Error(notFoundMessage);
					printError(notFound);
				} else{
									const statusCodeErrorMessage = `There was an error getting the weather data for ${query}. ${http.STATUS_CODES[response.statusCode]} `;
										const statusCodeError = new Error(statusCodeErrorMessage);
										printError(statusCodeError);
								}
						
																 
				});
		} catch(error){
		//malformed URL error
		printError(error);
			}
	

// function ends
}


module.exports.requestWeather = requestWeather;
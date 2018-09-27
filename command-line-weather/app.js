// Command-line weather app using OpenWeather API and node.js

const weather = require('./weather');

// takes queries as entered, converts spaces to underscores
const query = process.argv.slice(2).join("+").replace(' ', '+');

weather.requestWeather(query);
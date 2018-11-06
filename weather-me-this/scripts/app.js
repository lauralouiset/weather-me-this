// WEATHER ME THIS!
// A simple weather forecast app built with node.js
// made by Laura-Louise Tobin, 2018
// https://lauraloui.se

'use strict';

const http = require('http');
const router = require('./router');

// Create a web server with node
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
	router.static(request, response);
	router.image(request, response);
	router.home(request, response);
	router.forecast(request, response);
});

server.listen(port, () => {
	console.log(`Hello, Server running at http://${hostname}:${port}/`);
});

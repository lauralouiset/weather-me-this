// WEATHER ME THIS!
// A simple weather forecast app built with node.js
// made by Laura-Louise Tobin, 2018
// https://lauraloui.se

const router = require('./router');

// Create a web server

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((request, response) => {
	router.home(request, response);
	router.user(request, response);
});

server.listen(port, () => {
	console.log(`Hello, Server running at http://${hostname}:${port}/`);
});
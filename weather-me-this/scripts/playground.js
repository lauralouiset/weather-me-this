svg = {
	moonphases : 'moonphasesvg',
	otherweather : 'otherweathersvg'
}

weather = new Map();

weather.set(`day1icon`, `moonphases`);
weather.set(`day2icon`, `otherweather`)

weather.set(`day1svg`, svg.moonphases);
weather.set(`day2svg`, svg.otherweather);

console.log(weather);


const outputWeather = () => {

			for (let i = 1; i <= 2; ++i){
			const icon = 	weather.get(`day${i}Icon`);
			this.weather.set(`day${i}SVG`, svg[icon]);	
			}

}




var path = require('path');
var http = require('http');
var fs = require('fs');

var dir = path.join(__dirname, 'public');

var mime = {
	html: 'text/html',
	txt: 'text/plain',
	css: 'text/css',
	gif: 'image/gif',
	jpg: 'image/jpeg',
	png: 'image/png',
	svg: 'image/svg+xml',
	js: 'application/javascript'
};


	var reqpath = req.url.toString().split('?')[0];
	if (req.method !== 'GET') {
		res.statusCode = 501;
		res.setHeader('Content-Type', 'text/plain');
		return res.end('Method not implemented');
	}
	var file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
	if (file.indexOf(dir + path.sep) !== 0) {
		res.statusCode = 403;
		res.setHeader('Content-Type', 'text/plain');
		return res.end('Forbidden');
	}
	var type = mime[path.extname(file).slice(1)] || 'text/plain';
	var s = fs.createReadStream(file);
	s.on('open', function () {
		res.setHeader('Content-Type', type);
		s.pipe(res);
	});
	s.on('error', function () {
		res.setHeader('Content-Type', 'text/plain');
		res.statusCode = 404;
		res.end('Not found');
	});


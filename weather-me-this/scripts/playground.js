
// var path = require('path');
// var http = require('http');
// var fs = require('fs');

// var dir = path.join(__dirname, 'public');

// var mime = {
// 	html: 'text/html',
// 	txt: 'text/plain',
// 	css: 'text/css',
// 	gif: 'image/gif',
// 	jpg: 'image/jpeg',
// 	png: 'image/png',
// 	svg: 'image/svg+xml',
// 	js: 'application/javascript'
// };


// 	var reqpath = req.url.toString().split('?')[0];
// 	if (req.method !== 'GET') {
// 		res.statusCode = 501;
// 		res.setHeader('Content-Type', 'text/plain');
// 		return res.end('Method not implemented');
// 	}
// 	var file = path.join(dir, reqpath.replace(/\/$/, '/index.html'));
// 	if (file.indexOf(dir + path.sep) !== 0) {
// 		res.statusCode = 403;
// 		res.setHeader('Content-Type', 'text/plain');
// 		return res.end('Forbidden');
// 	}
// 	var type = mime[path.extname(file).slice(1)] || 'text/plain';
// 	var s = fs.createReadStream(file);
// 	s.on('open', function () {
// 		res.setHeader('Content-Type', type);
// 		s.pipe(res);
// 	});
// 	s.on('error', function () {
// 		res.setHeader('Content-Type', 'text/plain');
// 		res.statusCode = 404;
// 		res.end('Not found');
// 	});





// valid image file types

// isValidFile(data) {
// 	return (this.validTypes.indexOf(data) !== -1) ? true : false;
// } 


// this.isValidFile(file.type)


// this.validTypes = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];



//mime[path.extname(file).slice(1)]






const querystring = '/Toronto,%20ON,%20Canada&celcius'

const queryarray = querystring.split('&');
console.log(queryarray);

const location = queryarray[0];
const tempUnit = queryarray[1];

console.log(tempUnit);

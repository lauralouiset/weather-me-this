
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


const canAddress1 = 'Elmvale, ON l0l 1P0, Canada';
const canAddress2 = 'Toronto Pearson International Airport (YYZ), 6301 Silver Dart Dr, Mississauga, ON L5P 1B2, Canada';

const USAddress1 = '1600 Pennsylvania Ave NW, Washington, DC 20500, USA';
const USAddress2 = '13930 S Cicero Ave, Crestwood, IL 60445, USA';
const USAddress3 = '13930  Hello Ave, Truth or Consequences, AZ 60445-7364, USA';


const usPostal = new RegExp('\\s\\d{5}(-\\d{4})?');

const canPostal = new RegExp('\\s[A-Za-z]\\d[A-Za-z] ?\\d[A-Za-z]\\d', 'i');


// const usPostall = /\s\d{5}/

//str = str.replace(new RegExp(list[i] + '$'), 'finish');

function removePostalCode(str){
	if (str.endsWith('USA')) {
		const replaced = str.replace(usPostal, '');
		console.log(replaced);
	} else if(str.endsWith('Canada')){
		const replaced = str.replace(canPostal, '');
		console.log(replaced);

	}
}

removePostalCode(USAddress2);
removePostalCode(canAddress1);
removePostalCode(USAddress3);



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




// function serveStatic(request, response) {
// 	const mime = {
// 		css: 'text/css',
// 		jpg: 'image/jpeg',
// 		png: 'image/png',
// 		js: 'application/javascript'
// 	};


// 	function getExtension(file) {
// 		const extension = file.split('.');
// 		return extension[1];
// 	}

// 	const type = getExtension(request.url);

// 	if (request.url.includes('css')) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const css = fs.createReadStream(`.${request.url}`, 'utf8');
// 		css.pipe(response);
// 	} else if (request.url.includes("scripts.js")) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const js = fs.createReadStream(`.${request.url}`, 'utf8');
// 		js.pipe(response);
// 	} else if (request.url.includes(`jpg`)) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const img = fs.createReadStream(`.${request.url}`);
// 		img.pipe(response);
// 	} else if (request.url.includes(`png`)) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const img = fs.createReadStream(`.${request.url}`);
// 		img.pipe(response);
// 	}
// }

// const staticTypes = ['css', 'js', 'png', 'jpg'];

// function isStatic(extension) {
// 	return (staticTypes.includes(extension)) ? true : false;
// } 


// this.isValidFile(file.type)


// this.validTypes = ['image/png', 'image/jpg', 'image/gif', 'image/jpeg'];






function serveStatic(){

	const getExtension = (file) => file.split('.')[1];
	const isStatic = (extension) =>  staticTypes.includes(extension) ? true : false;
	const staticTypes = ['css', 'js', 'png', 'jpg'];
	
	const type = getExtension(request.url)
	console.log(isStatic(type));

	if (isStatic(type)){
		response.writeHead(200, { 'Content-type': mime[type] });
		const file = fs.createReadStream(`.${request.url}`, 'utf8');
		file.pipe(response);
	}
}


serveStatic();




// function serveStatic(request, response) {
// 	const mime = {
// 		css: 'text/css',
// 		jpg: 'image/jpeg',
// 		png: 'image/png',
// 		js: 'application/javascript'
// 	};


// 	function getMIME(file) {
// 		const extension = file.split('.');
// 		return extension[1];
// 	}

// 	const type = getMIME(request.url);

// 	if (request.url.includes('css')) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const file = fs.createReadStream(`.${request.url}`, 'utf8');
// 		file.pipe(response);
// 	} else if (request.url.includes("scripts.js")) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const js = fs.createReadStream(`.${request.url}`, 'utf8');
// 		js.pipe(response);
// 	} else if (request.url.includes(`jpg`)) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const img = fs.createReadStream(`.${request.url}`);
// 		img.pipe(response);
// 	} else if (request.url.includes(`png`)) {
// 		response.writeHead(200, { 'Content-type': mime[type] });
// 		const img = fs.createReadStream(`.${request.url}`);
// 		img.pipe(response);
// 	}
// }
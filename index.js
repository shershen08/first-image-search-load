var fs 		= require('fs');
var _r 		= require('request');
var cheerio = require('cheerio');
var Q 		= require('q');

/* 
module variables 
*/
var googleImageSearchURL = 'https://www.google.nl/search?tbm=isch&q=';
var maxImages = 20;
var imgFileType = '.jpeg';

/* 
module private methods 
*/
var checkQuery = function (q) {
	if(!q || q == '') {
		console.log('No query provided');
		throw ('No query provided');
	}
}

var getFullQueryURL = function (q) {
	return googleImageSearchURL + q;
}

var extractImageURLS = function(imgsArray){
	return imgsArray.map(function(item){
		return item.attribs.src;
	})
}


/* 

module public methods

*/

/**
Returns array of URLs of the images in the search results
*/
exports.getImagesArray = function(query) {
	var d = Q.defer();

	try {
		checkQuery(query);
	} catch (ex) {
		d.reject(ex);
	}

	var searchURL = getFullQueryURL(query);
	_r(searchURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {

			$ = cheerio.load(body);
			var allImages = $.parseHTML($.html('img'));


			if(allImages){
				d.resolve(extractImageURLS(allImages));
			} else {
				d.reject('No images found for that query');
			}

		} else {
			d.reject(error);
		}
	})
	return d.promise;
}

/**
Saves the first image to disk as a file
*/
exports.saveFirstImage = function(query, imageName) {

	var d = Q.defer();

	try {	
		checkQuery(query);
		checkQuery(imageName);
	} catch (ex) {
		return ex;
	}

	var searchURL = getFullQueryURL(query);
	var imgName = imageName + imgFileType;

	var writePipe = _r(searchURL).pipe(fs.createWriteStream(imgName));
	writePipe.on('finish', function (data) { 
		d.resolve(data);
	});
	writePipe.on('error', function (error) { 
		d.reject(error);
	});

	return d.promise;
}

/**
Returns URL of the first image in the search results
*/
exports.getFirstImageURL = function(query) {
	var d = Q.defer();

	try {
		checkQuery(query);
	} catch (ex) {
		d.reject(ex);
	}

	var searchURL = getFullQueryURL(query);
	_r(searchURL, function (error, response, body) {
		if (!error && response.statusCode == 200) {


			$ = cheerio.load(body);
			var allImages = $.parseHTML($.html('img'));

			if(allImages){
				d.resolve(allImages[0].attribs.src);
			} else {
				d.reject('No images found for that query');
			}
			

			d.resolve(allImages[0].attribs.src);
		} else {
			d.reject(error);
		}
	});
	return d.promise;
}
var _r 		= require('request');
var cheerio = require('cheerio');
var fs 		= require('fs');
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
Returns array of images in the search results
*/
exports.getImagesArray = function(query) {
	checkQuery(query);
	var deferred = Q.defer();
	var searchURL = getFullQueryURL(query);
	_r(searchURL, function (error, response, body) {
	  if (!error && response.statusCode == 200) {

	  	$ = cheerio.load(body);
	    var allImages = $.parseHTML($.html('img'));
	    deferred.resolve(extractImageURLS(allImages));
	  } else {
	  	deferred.reject(error);
	  }
	})
	return deferred.promise;
}

/**
Saves first image to disk
*/
exports.saveFirstImage = function(query, imageName) {
	checkQuery(query);
	checkQuery(imageName);
	var deferred = Q.defer();
	var searchURL = getFullQueryURL(query);
	var imgName = imageName + imgFileType;
	_r(searchURL).pipe(fs.createWriteStream(imgName));
}

/**
Returns first image in the search results
*/
exports.getFirstImageURL = function(query) {
 	checkQuery(query);
 	var deferred = Q.defer();
	var searchURL = getFullQueryURL(query);
	_r(searchURL, function (error, response, body) {
	  if (!error && response.statusCode == 200) {

	  	$ = cheerio.load(body);
	  	var allImages = $.parseHTML($.html('img'));
	    deferred.resolve(allImages[0].attribs.src);
	  } else {
	  	deferred.reject(error);
	  }
	});
	return deferred.promise;
}

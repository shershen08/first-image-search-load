## Description

Simple module that loads the first image from Google image search on query

Module usues url : ```https://www.google.nl/search?tbm=isch&q=```
Request returns A+ promises, thanks to [q](https://github.com/kriskowal/q) module.

## API

```saveFirstImage(queryString, fileNameAndPath)```
Saves the first image to disk as a file

```getFirstImageURL(queryString)```
Returns URL of the first image in the search results

```getImagesArray(queryString)```
Returns array of URLs of the images in the search results


## Dependencies
 - [cheerio](https://github.com/cheeriojs/cheerio)
 - [request](http://github.com/request/request)
 - [q](https://github.com/kriskowal/q)

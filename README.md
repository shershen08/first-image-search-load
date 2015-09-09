### Description

Simple module that loads the first image from Google image search on query

Module usues url : ```https://www.google.nl/search?tbm=isch&q=```
Request returns A+ promises, thanks to Q module.

### API

#### saveFirstImage
Saves the first image to disk as a file

#### getFirstImageURL
Returns URL of the first image in the search results

#### getImagesArray
Returns array of URLs of the images in the search results


### dependencies
 - cheerio
 - request
 - q

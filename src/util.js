
/*
* @param {String} url
* @return {Boolean}
*/
function isFullUrl(url) {
  if (/:\/\/youtube.com\/watch?v=/.test(url)) {
    return true;
  }

  return false;
}

/*
* Retreives video ID from full url or videoId
* @param {String} ytString
* @return {String} Youtube video ID
*/
function videoId(ytString) {
  if (isFullUrl(ytString)) {
    var splitResults = RegExp('v=([^&]+)(&|$)').exec(ytString);
    if (! splitResults) {
      return null;
    }
    return splitResults[1];
  }

  return ytString;
}

module.exports = {
  isFullUrl : isFullUrl,
  videoId : videoId,
};


var youtubeStream = require('youtube-audio-stream');

/*
* @param {String} videoId
* @param {WriteStream} outputStream
* @param {Object} callbacks
*/
function getAudio(videoId, outputStream, callbacks) {

  var requestUrl = 'http://youtube.com/watch?v=' + videoId;
  var ytStream = youtubeStream(requestUrl);

  if (callbacks) {
    var events = Object.keys(callbacks);
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      ytStream.on(event, callbacks[event]);
    }
  }

  ytStream.pipe(outputStream);

}

module.exports = {
  getAudio : getAudio,
};


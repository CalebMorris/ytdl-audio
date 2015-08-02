var youtubeStream = require('youtube-audio-stream');


function getAudio(videoId, outputStream) {

  var requestUrl = 'http://youtube.com/watch?v=' + videoId;

  youtubeStream(requestUrl).pipe(outputStream);

}

module.exports = {
  getAudio : getAudio,
};


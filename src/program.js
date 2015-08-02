var fs = require('fs');
var program = require('commander');

var version = require('../package.json').version;
var util = require('./util');
var streamer = require('./stream');

function list(val) {
  return val.split(',');
}

program
  .version(version)
  .option('-u, --urls [value]', 'YT URLs', list)
  .option('-f, --files [value]', 'Cooresponding File Names', list)
  .parse(process.argv);

if (! program.urls || program.urls.length === 0) {
  console.error('Please use at least 1 YT URL.');
  process.exit(-1);
}

if (program.files && program.files.length !== program.urls.length) {
  console.error('The filenames must be the same number as passed URLs');
  process.exit(-1);
}

function onEnd(videoId) {
  console.log(videoId, 'has completed downloading.');
}

function onClose(videoId) {
  console.log(videoId, 'has closed unexpectedly.');
}

function onError(videoId, err) {
  console.log(videoId, 'had an error while downloading.', err);
}

module.exports = function() {

  for (var i = 0; i < program.urls.length; i++) {
    var url = util.videoId(program.urls[i]);
    var filename = program.files && program.files[i] || url;
    if (! RegExp('\.mp3$').test(filename)) {
      filename += '.mp3';
    }
    var audioWriteStream = fs.createWriteStream(filename);
    var startMessage = 'Retrieving audio for ' + url + ' saving to ' + filename;

    console.log(startMessage);

    streamer.getAudio(
      url,
      audioWriteStream,
      {
        error : onError.bind(null, url),
        end : onEnd.bind(null, url),
        close : onClose.bind(null, url),
      }
    );

  }

};


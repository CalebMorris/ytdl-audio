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
  .parse(process.argv);

if (! program.urls || program.urls.length === 0) {
  console.error('Please use at least 1 YT URL.');
  process.exit(-1);
}

for (var i = 0; i < program.urls.length; i++) {
  var url = program.urls[i];
  var audioWriteStream = fs.createWriteStream(url + '.mp3');
  console.log('Retrieving audio for', url);
  streamer.getAudio(util.videoId(url), audioWriteStream);
}


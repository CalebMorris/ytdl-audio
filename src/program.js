var program = require('commander');

var version = require('../package.json').version;

function list(val) {
  return val.split(',');
}

program
  .version(version)
  .option('-u, --urls [value]', 'YT URLs', list)
  .parse(process.argv);

console.log('program', program.urls);

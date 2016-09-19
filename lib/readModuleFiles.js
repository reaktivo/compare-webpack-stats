const readFileSync = require('fs').readFileSync;
const resolve = require('path').resolve;

module.exports = files => files.map(
  file => JSON.parse(readFileSync(resolve(file), 'utf8'))
);

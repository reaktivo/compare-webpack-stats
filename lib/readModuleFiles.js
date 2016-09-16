const { readFileSync } = require('fs');
const { resolve } = require('path');

module.exports = (files) => files.map(
  file => JSON.parse(readFileSync(resolve(file), 'utf8'))
);

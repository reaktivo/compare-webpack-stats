/* eslint-disable no-console */
const { red, reset } = require('chalk');

module.exports = (modules, usage) => {
  usage.forEach(module => {
    const color = module.usedBy.length > 1 ? red : reset;
    console.log(`${color(module.name)}: Used by ${module.usedBy.join(', ')}`);
  });
};

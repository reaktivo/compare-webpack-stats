/* eslint-disable no-console */
const { red, reset } = require('chalk');
const { findModuleUsage } = require('../lib/stats');

module.exports = (modules, args = {}) => {
  const usage = findModuleUsage(modules, args);
  usage.forEach(module => {
    const color = module.usedBy.length > 1 ? red : reset;
    console.log(`${color(module.name)}: Used by ${module.usedBy.join(', ')}`);
  });
};

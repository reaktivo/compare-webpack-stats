/* eslint-disable no-console */
const chalk = require('chalk');
const findModuleUsage = require('../lib/stats').findModuleUsage;

module.exports = (modules, args) => {
  args || (args = {});
  const usage = findModuleUsage(modules, args);
  usage.forEach(module => {
    const color = module.usedBy.length > 1 ? chalk.red : chalk.reset;
    console.log(`${color(module.name)}: Used by ${module.usedBy.join(', ')}`);
  });
};

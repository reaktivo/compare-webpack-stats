/* eslint-disable no-console, global-require */
const { findModuleUsage } = require('../lib/stats');
const readModuleFiles = require('../lib/readModuleFiles');
const sort = require('../lib/sort');
const args = require('yargs')
  .option('c', {
    alias: 'chart',
    default: true,
    describe: 'Create chart graph',
    type: 'boolean',
  })
  .option('a', {
    alias: 'show-all',
    describe: 'Show all modules, including non-repeating ones',
    type: 'boolean',
  })
  .option('s', {
    alias: 'sort',
    choices: ['name', 'size'],
    default: 'size',
    describe: 'Sort by name or size',
  })
  .option('j', {
    alias: 'json',
    describe: 'Output json',
    type: 'boolean',
  })
  .option('o', {
    alias: 'output',
    describe: 'Output html filepath'
  })
  .option('b', {
    alias: 'browse',
    describe: 'Open charts',
    type: 'boolean'
  })
  .help('h')
  .alias('h', 'help')
  .argv;

const mainModules = readModuleFiles(args._);
const moduleUsage = findModuleUsage(...mainModules)
  .filter(module => args['show-all'] || module.usedBy.length > 1)
  .sort(sort[args.sort])
;

if (args.chart) {
  require('../adapter/chart')(mainModules, moduleUsage, args);
} else if (args.json) {
  require('../adapter/json')(mainModules, moduleUsage, args);
} else {
  require('../adapter/cli')(mainModules, moduleUsage, args);
}

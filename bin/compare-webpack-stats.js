/* eslint-disable no-console, global-require */
const readModuleFiles = require('../lib/readModuleFiles');
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
  .option('p', {
    alias: 'print',
    describe: 'Print to cli',
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

if (args.cli) {
  require('../adapter/cli')(mainModules, args);
} else if (args.json) {
  require('../adapter/json')(mainModules, args);
} else {
  require('../adapter/chart')(mainModules, args);
}

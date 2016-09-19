#!/usr/bin/env node

'use strict';

var path = require('path');
var base = path.resolve(__dirname, '..');

require('babel-register')({
  ignore: function(filename) {
    return (
      filename.indexOf(base) === -1
      || filename.indexOf('node_modules') !== -1
    );
  }
});
require('./compare-webpack-stats');

/* eslint-disable no-console */
const { findModuleUsage } = require('../lib/stats');

module.exports = (modules, args = {}) => {
  const usage = findModuleUsage(modules, args);
  console.log(JSON.stringify(usage, null, 2));
};

/* eslint-disable no-console */
const findModuleUsage = require('../lib/stats').findModuleUsage;

module.exports = (modules, args) => {
  args || (args = {});
  const usage = findModuleUsage(modules, args);
  console.log(JSON.stringify(usage, null, 2));
};

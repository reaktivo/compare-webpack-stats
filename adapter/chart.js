/* eslint-disable no-console */
const fs = require('fs');
const tmpdir = require('os').tmpdir;
const stats = require('../lib/stats');
const computeModuleName = stats.computeModuleName;
const findModuleUsage = stats.findModuleUsage;
const resolve = require('path').resolve;
const execSync = require('child_process').execSync;

function getTmpFilename() {
  const date = (new Date).toISOString().replace(/:/g, '');
  return `${tmpdir()}/compare-webpack-stats-${date}.html`;
}

module.exports = (modules, args) => {
  args || (args = {});
  const usage = findModuleUsage(modules, args);

  const data = [
    ['Module'].concat(modules.map(computeModuleName))
  ].concat(
    usage.map(module => (
      [module.name].concat(Array(modules.length).fill(0).fill(module.size, 0, module.usedBy.length)))
    )
  );

  const CHART = {
    date: new Date(),
    data: data,
    options: {
      stacked: true,
      bars: 'horizontal',
      axes: {
        x: { 0: { side: 'top', label: 'Filesize' } }
      },
      chartArea: { height: usage.length * 18 }
    }
  };

  const htmlTemplate = fs.readFileSync(resolve(__dirname, '../assets/template.html'), 'utf8');
  const updatedHtmlTemplate = htmlTemplate.replace('{{ CHART }}', JSON.stringify(CHART, null, 2));
  const templatePath = args.output ? resolve(args.output) : getTmpFilename();
  fs.writeFileSync(templatePath, updatedHtmlTemplate, 'utf8');
  console.log(`Wrote analysis to: ${templatePath}`);
  if (args.browse) {
    execSync(`open file://localhost/${templatePath}`);
  }

};

/* eslint-disable no-console */
const { readFileSync, writeFileSync } = require('fs');
const { tmpdir } = require('os');
const { computeModuleName, findModuleUsage } = require('../lib/stats');
const { resolve } = require('path');
const { execSync } = require('child_process');

function getTmpFilename() {
  const date = (new Date).toISOString().replace(/:/g, '');
  return `${tmpdir()}/compare-webpack-stats-${date}.html`;
}

module.exports = (modules, args = {}) => {
  const usage = findModuleUsage(modules, args);

  const data = [
    ['Module'].concat(modules.map(computeModuleName)),
    ...usage.map(({ name, size, usedBy }) => (
      [name].concat(Array(modules.length).fill(0).fill(size, 0, usedBy.length)))
    )
  ];

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

  const htmlTemplate = readFileSync(resolve(__dirname, '../assets/template.html'), 'utf8');
  const updatedHtmlTemplate = htmlTemplate.replace('{{ CHART }}', JSON.stringify(CHART, null, 2));
  const templatePath = args.output ? resolve(args.output) : getTmpFilename();
  writeFileSync(templatePath, updatedHtmlTemplate, 'utf8');
  console.log(`Wrote analysis to: ${templatePath}`);
  if (args.browse) {
    execSync(`open file://localhost/${templatePath}`);
  }

};

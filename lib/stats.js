const sort = require('../lib/sort');

function computeModuleName(mainModule) {
  return mainModule.assets[0].name;
}

function computeUsedBy(mainModules, module) {
  return mainModules.map(mainModule => (
    mainModule.modules.find(({ name }) => name === module.name)
    && computeModuleName(mainModule))
  ).filter(Boolean)
}

function computeCompleteListOfModules(listOfMainModules) {
  const mapOfDependencies = new Map();
  listOfMainModules.forEach(mainModule => {
    mainModule.modules
      .filter(({ name, identifier }) => name !== identifier)
      .forEach(module => {
        mapOfDependencies.set(module.name, module);
      });
  });

  return {
    names: listOfMainModules.map(computeModuleName),
    modules: Array.from(mapOfDependencies.values())
  }
}

function findModuleUsage(listOfMainModules, args) {
  return computeCompleteListOfModules(listOfMainModules).modules
    .map(module => ({
      name: module.name,
      size: module.size,
      usedBy: computeUsedBy(listOfMainModules, module)
    }))
    .filter(module => args['show-all'] || module.usedBy.length > 1)
    .sort(sort[args.sort || 'size'])
}

module.exports = {
  computeModuleName,
  computeCompleteListOfModules,
  computeUsedBy,
  findModuleUsage,
};

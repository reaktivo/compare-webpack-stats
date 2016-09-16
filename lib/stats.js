function computeModuleName(mainModule) {
  return mainModule.assets[0].name;
}

function computeCompleteListOfModules(...listOfMainModules) {
  const mapOfDependencies = new Map();
  listOfMainModules.forEach(mainModule => {
    mainModule.modules
      .filter(({ name, identifier }) => name !== identifier)
      .forEach(module => {
        mapOfDependencies.set(module.name, module);
      });
  });

  return Array.from(mapOfDependencies.values());
}

function findModuleUsage(...listOfMainModules) {
  return computeCompleteListOfModules(...listOfMainModules).map(module => ({
    name: module.name,
    size: module.size,
    usedBy: listOfMainModules.map(mainModule => (
        mainModule.modules.find(({ name }) => name === module.name)
        && computeModuleName(mainModule))
      ).filter(Boolean)
  }));
}

module.exports = {
  computeModuleName,
  computeCompleteListOfModules,
  findModuleUsage,
};

module.exports = {
  name: (a, b) => (b.name > a.name ? 1 : -1),
  size: (a, b) => (b.size * b.usedBy.length) - (a.size * a.usedBy.length)
};

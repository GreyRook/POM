var core = module.exports = require('../src/core');

core.extras = require('../src/extras');

// export POM globally.
global.POM = core;

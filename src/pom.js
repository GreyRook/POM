var core = module.exports = require('./core');

core.extras = require('./extras');

// export PixiObjectModel globally.
global.POM = core;

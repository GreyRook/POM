var core = module.exports = require('./core');

// mixin the deprecation features.
//Object.assign(core, require('./deprecation'));
core.extras          = require('./extras');

// export PixiObjectModel globally.
global.POM = core;

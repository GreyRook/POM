/**
 * Constant values used in POM.Manager
 *
 * @lends MANAGER
 */
var CONST = {
    /**
     * String of the current POM.Manager version
     *
     * @static
     * @constant
     * @property {string} VERSION
     */
    VERSION: require('../../package.json').version,
    DEFAULT_DATAKEYS: [
        'name',
        ['position', 'x'],
        ['position', 'y'],
        ['scale', 'x'],
        ['scale', 'y'],
        'alpha',
        'rotation',
        ['pivot', 'x'],
        ['pivot', 'y']
    ]
};

module.exports = CONST;

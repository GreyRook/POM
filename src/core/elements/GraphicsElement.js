var updateData = require('../../extras/updateData');
var getData = require('../../extras/getData');
var CONST = require('../const');

/**
 * POM Graphics Element
 * @class GraphicsElement
 * @extends PIXI.Graphics
 * @memberof POM
 * @constructor
 * @param manager {Manager} the core POM Manager
 * @param data {Object} data for the element
 */
function GraphicsElement(manager, data) {
    PIXI.Graphics.call(this);
    /**
     * @var dataKeys {Object} datakeys (just the default)
     */
    this.dataKeys = CONST.DEFAULT_DATAKEYS;
    this.manager = manager;
    this.type = 'graphics';
    this.updateData(data||{});
}

GraphicsElement.prototype = Object.create(PIXI.Graphics.prototype);
module.exports = GraphicsElement;

/**
 * update data of graphics from JSON decoded object
 *
 * @param data {Object} JSON decoded object representing the content
 */
GraphicsElement.prototype.updateData = function (data) {
    updateData(this, data);
};


/**
 * get data of SpriteElement (including defaults)
 *
 * @returns data {Object} representing the graphics element
 */
GraphicsElement.prototype.getData = function () {
    return getData(this);
};

var updateData = require('../../extras/updateData');
var getData = require('../../extras/getData');
var CONST = require('../const');

/**
 * POM Manager Sprite Element
 * @class SpriteElement
 * @extends PIXI.Container
 * @memberof POM
 * @constructor
 * @param manager {Manager} the core manager
 * @param data {Object} data for the element
 */
function SpriteElement(manager, data) {
    PIXI.Sprite.call(this);

    /**
     * @var dataKeys {Object} datakeys (just the default and source)
     */
    this.dataKeys = CONST.DEFAULT_DATAKEYS.splice();
    this.dataKeys.push('source');
    this.manager = manager;
    this.type = 'sprite';
    this.updateData(data||{});
}

SpriteElement.prototype = Object.create(PIXI.Sprite.prototype);
module.exports = SpriteElement;

 /**
  * update data of sprite from JSON decoded object
  *
  * @param data {Object} JSON decoded object representing the content
  */
SpriteElement.prototype.updateData = function (data) {
    updateData(this, data);
};

/**
 * get data of SpriteElement (including defaults)
 *
 * @returns data {Object} representing the sprite
 */
SpriteElement.prototype.getData = function () {
    return getData(this);
};

/**
 * set image source
 *
 * @var source {String} image url to a texture source.
 */
Object.defineProperty(SpriteElement.prototype, 'source', {
    set: function(value) {
        this.texture = PIXI.Texture.fromImage(value);
    },
    get: function() {
        return this.texture.baseTexture.imageUrl;
    }
});

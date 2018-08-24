/**
 * POM Manager main container
 * @class Manager
 * @extends PIXI.Container
 * @memberof POM
 * @constructor
 */
function Manager(data) {
  /**
   * list of all known element constructors
   *
   * @private
   */
  this._elementPrototypes = {
    'container': ContainerElement,
    'graphics': GraphicsElement,
    'sprite': SpriteElement
  };

  this._plugins = {};

  ContainerElement.call(this, this, data);
}

'use strict';

var ContainerElement = require('./elements/ContainerElement'),
    SpriteElement = require('./elements/SpriteElement'),
    GraphicsElement = require('./elements/GraphicsElement');

Manager.prototype = Object.create(ContainerElement.prototype);
module.exports = Manager;

/**
 * create new element from given data (see elements folder)
 *
 * if no matching prototype is registered an exception is thorwn.
 *
 * @param data {Object} contains information about the element
 * @returns new instance of an element
 */
Manager.prototype.createElementFromData = function (data) {
    var type = data.type;
    if (type in this._elementPrototypes) {
        return new this._elementPrototypes[type](this, data);
    }
    throw new Error('Cannot create element of unknown type ' + type);
};

/**
 * register new element prototype
 *
 * @param type {String} name of the element
 * @param elementPrototype {Element} base class for the element
 */
Manager.prototype.registerPrototype = function (name, elementPrototype) {
    this._elementPrototypes[name] = elementPrototype;
};


/**
 * Adds a plugin to an object
 *
 * @param pluginName {string} The name of the plugin.
 * @param ctor {Object}
 */
Manager.prototype.registerPlugin = function (pluginName, ctor){
    this._plugins[pluginName] = ctor;
};

/**
 * Instantiate all plugins of this object
 */
Manager.prototype.initPlugins = function (){
    this.plugins = this.plugins || {};

    for (var o in this._plugins){
        this.plugins[o] = new (this._plugins[o])(this);
    }
};

/**
 * Remove all the plugins of this object
 */
Manager.prototype.destroyPlugins = function (){
    for (var o in this.plugins){
        this.plugins[o].destroy();
        this.plugins[o] = null;
    }

    this.plugins = null;
};

Manager.prototype.destroy = function(){
    this.destroyPlugins();
    ContainerElement.prototype.destroy.call(this, true)
};

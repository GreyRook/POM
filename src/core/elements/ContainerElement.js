var updateData = require('../../extras/updateData');
var getData = require('../../extras/getData');
var setData = require('../../extras/setData');
var CONST = require('../const');
var helpers = require('../../extras/helpers');

/**
 * POM Container Element
 * @class ContainerElement
 * @extends PIXI.Container
 * @memberof POM
 * @constructor
 * @param manager the core manager
 * @param data data for the element
 */
function ContainerElement(manager, data) {
    PIXI.Container.call(this);
    this.manager = manager;
    this.type = 'container';
    this.minWidth = 0;
    this.minHeight = 0;
    this._hasFlags = this._updateFlags.length > 0;
    this.updateData(data || {});
}

ContainerElement.prototype = Object.create(PIXI.Container.prototype);
module.exports = ContainerElement;

ContainerElement.prototype._updateFlags = [];

/**
 * Update data of objects from JSON decoded object
 *
 * @param data {Object} JSON decoded object representing the content
 */
ContainerElement.prototype.updateData = function (data) {
    if (data.children) {
        this.updateChildren(data.children);
    }

    updateData(this, data);
};

/**
 * Sets data of objects from JSON decoded object
 *
 * @param data {Object} JSON decoded object representing the content
 */
ContainerElement.prototype.setData = function(data){
    data = data || {};

    this.setChildren(data.children);
    setData(this, data);
};

/**
 * get data of SpriteElement (including defaults)
 *
 * @returns data {Object} representing the container (and its children)
 */
ContainerElement.prototype.getData = function () {
    var children = [];
    for (var i = 0; i < this.children.length; i++) {
        children.push(this.children[i].getData());
    }
    var data = getData(this);
    data.children = children;
    return data;
};


/**
 * Removes element with a given name - if it exists.
 * searches all children for the element with this name
 *
 * @param name {String} The name of the element to be removed
 */
ContainerElement.prototype.removeChildByNameRecursive = function (name) {
    var child = this.getChildByNameRecursive(name);
    if (child) {
        child.parent.removeChild(child);
    }
};

/**
 * Get element with given name - if it exists.
 * searches all children for the element with this name
 *
 * @param name {String} The name of the element to be found
 */
ContainerElement.prototype.getChildByNameRecursive = function (name) {
    for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];
        if (child.name == name) {
            return child;
        }
        if (typeof(child.getChildByNameRecursive) !== 'undefined') {
            child = child.getChildByNameRecursive(name);
            if (child !== null) {
                return child;
            }
        }
    }
    return null;
};

/**
 * Generate children from JSON data
 *
 * @param children {Array} data of children
 * @private
 */
//TODO Evaluate whether an UPDATE function should remove ALL data, instead of replacing old data with new data
ContainerElement.prototype.updateChildren = function (children) {
    this.destroyChildren();
    for (var i = 0; i < children.length; i++) {
        this.addChild(this.manager.createElementFromData(children[i]));
    }
};

ContainerElement.prototype.destroyChildren = function(){
    var children = this.removeChildren();
    for(var i=0;i<children.length;i++){
        var child = children[i];
        if(child.destroy){
            child.destroy();
        }
    }
};

ContainerElement.prototype.setChildren = function(children){
    if(children){
        this.destroyChildren();
        for (var i = 0; i < children.length; i++) {
            this.addChild(this.manager.createElementFromData(children[i]));
        }
    }
};


ContainerElement.prototype._getDataKeys = function () {
    return helpers.deepClone(CONST.DEFAULT_DATAKEYS);
};



ContainerElement.prototype.toLocal = function(global, from){
    if(this.resizeScaling){
        var local = PIXI.Container.prototype.toLocal.call(this, global, from);
        local.x *=  this.localScaleX;
        local.y *= this.localScaleY;

        return local;
    } else {
        return PIXI.Container.prototype.toLocal.call(this, global, from);
    }
};

ContainerElement.prototype._checkFlags = function(){
    for(var i=0, j=this._updateFlags.length;i<j;i++){
        var flag = this._updateFlags[i];

        if(this[flag.name]){

            var func;
            if(typeof flag.func === 'string'){
                func = this[flag.func];
            }else {
                func =flag.func
            }

            if(func){
                this[flag.name] = func.call(this);
            }else{
                console.log('Could not update flag ' + flag.name + ' on Element of type ' + this.type);
            }
        }
    }
};


// TODO add a toGlobal function too
// TODO merge this with GOWN.utils.resizeScaling
ContainerElement.prototype.updateTransform = function () {



    var i, j;
    var wt = this.worldTransform;
    // obmit Control.updateTransform as it calls redraw as well
    if (!this.resizeScaling) {
        if (this.redraw) {
            this.redraw(1, 1);
        }

        if(this._hasFlags){
            this._checkFlags();
        }

        PIXI.Container.prototype.updateTransform.call(this);
    } else {
        var pt = this.parent.worldTransform;
        var scaleX = Math.sqrt(Math.pow(pt.a, 2) + Math.pow(pt.b, 2));
        var scaleY = Math.sqrt(Math.pow(pt.c, 2) + Math.pow(pt.d, 2));
        this.worldWidth = Math.round(Math.max(this.width * scaleX, this.minWidth));
        this.worldHeight = Math.round(Math.max(this.height * scaleY, this.minHeight));

        PIXI.DisplayObject.prototype.updateTransform.call(this);

        // revert scaling
        var tx = wt.tx;
        var ty = wt.ty;

        wt.scale(scaleX !== 0 ? 1 / scaleX : 0, scaleY !== 0 ? 1 / scaleY : 0);
        wt.tx = tx;
        wt.ty = ty;

        if (this.redraw) {
            this.redraw(scaleX, scaleY);
        }

        this.localScaleX = scaleX;
        this.localScaleY = scaleY;


        if(this._hasFlags){
            this._checkFlags();
        }

        for (i = 0, j = this.children.length; i < j; ++i) {
            this.children[i].updateTransform();
        }
    }
};

// performance increase to avoid using call.. (10x faster)
//Copied from PIXI //TODO Actually use this
ContainerElement.prototype.pomContainerUpdateTransform = ContainerElement.prototype.updateTransform


Object.defineProperties(ContainerElement.prototype, {
    dataKeys: {
        get: ContainerElement.prototype._getDataKeys
    }
});

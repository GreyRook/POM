'use strict';

var ContainerElement = require('./elements/ContainerElement'),
    Manager = require('./Manager');

/**
 * POM Manager creating elements from XML
 * @class XMLManager
 * @extends POM.Manager
 * @memberof POM
 * @constructor
 */
function XMLManager(data) {
    Manager.call(this, this.parseXML(data));
}

XMLManager.prototype = Object.create(Manager.prototype);
module.exports = XMLManager;

/**
 * get root XML element from given XML data
 * allows a String or DOMDocument (that can be responseXML in an XMLHttpRequest
 * response)
 *
 * if no matching prototype is registered an exception is thorwn.
 *
 * @param data {String|DOMDocument} XML data as string
 * @returns DOMElement
 */
XMLManager.prototype.parseXML = function(data) {
    var xmlDoc = data;
    if (xmlDoc instanceof String) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(text,"text/xml");
    }
    // we assume the XMLDocument has only one child and that is its root node
    return xmlDoc.children[0];
}

/**
 * create new element from XML node
 *
 * if no matching prototype is registered an exception is thorwn.
 *
 * @param data {Node} parsed XML ELement containing ui description
 * @returns new instance of an element
 */
XMLManager.prototype.createElementFromData = function (data) {
    var type = data.nodeName;
    if (type in this._elementPrototypes) {
        return new this._elementPrototypes[type](this, data);
    }
    throw new Error('Cannot create element of unknown type ' + type);
};

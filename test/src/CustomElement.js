'use strict';

/**
 * simulate an element
 * contains data and player
 */
function CustomElement(manager, data) {
    //PIXI.Container.call(this);
    this.manager = manager;
    this.type = 'custom';
    this.updateData(data||{})
}

CustomElement.prototype = Object.create(PIXI.Container.prototype);

CustomElement.prototype.dataKeys = [
    'name',
    ['position', 'x'],
    ['position', 'y'],
    ['scale', 'x'],
    ['scale', 'y'],
    'alpha',
    'rotation',
    ['pivot', 'x'],
    ['pivot', 'y']
];

CustomElement.prototype.updateData = function(data) {
    POM.extras.updateData(this, data);
};

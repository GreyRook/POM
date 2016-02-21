/**
 * @file        Main export of the PixiObjectModel core library
 * @author      Grey Rook Entertainment
 * @copyright   2015 Grey Rook Entertainment
 */


 /**
  * @namespace POM
  */
module.exports = Object.assign(require('./const'), {
    Manager:             require('./Manager'),
    ContainerElement:   require('./elements/ContainerElement'),
    GraphicsElement:    require('./elements/GraphicsElement'),
    SpriteElement:      require('./elements/SpriteElement')
});

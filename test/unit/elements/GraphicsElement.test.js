describe('test GraphicsElement', function() {
    'use strict';

    it('create and remove GraphicsElement instance', function() {
        var container = new POM.GraphicsElement();
        //TODO: .dispose();
        //TODO: make sure graphic is disposed correctly
    });

    it('create and draw graphic', function() {
        var graphic = new POM.GraphicsElement();
        // TODO: add graphic data and draw sth.
        graphic.updateData({});
        // TODO: compare generated image using imagediff
        // TODO: test if returned data equals something correct
        graphic.getData();
    });
});

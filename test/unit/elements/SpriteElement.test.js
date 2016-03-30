describe('test SpriteElement', function() {
    'use strict';

    it('create and remove SpriteElement instance', function() {
        var container = new POM.SpriteElement();
        //TODO: .dispose();
        //TODO: make sure graphic is disposed correctly
    });

    it('create and draw graphic', function() {
        var sprite = new POM.SpriteElement();
        expect(sprite.source).to.equal(null);
        // TODO: add image path and draw image
        sprite.updateData({
            values: {
                source: 'textures/bunny.png'
            }
        });
        expect(sprite.source).to.equal('textures/bunny.png');
        expect(sprite.getData().values.source).to.equal('textures/bunny.png');
        // TODO: compare generated result using imagediff
    });
});

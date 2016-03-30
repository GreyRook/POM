describe('test manager', function() {
    'use strict';

    it('create and remove manager instance', function() {
        var manager = new POM.Manager();
        //TODO: .dispose();
        //TODO: make sure manager is dispsed correctly
    });

    it('(re)register element', function() {
        var manager = new POM.Manager();

        // not registered jet - should fail
        expect(function () {
            manager.createElementFromData({
                type: 'custom'
            });
        }).to.throw('Cannot create element of unknown type custom');

        manager.registerPrototype('custom', CustomElement);
        expect(manager._elementPrototypes['custom']).to.equal(CustomElement);
        expect(manager.createElementFromData({type: 'custom'})).not.to.equal(null);
    });

    it('create custom element inside container', function() {
        var manager = new POM.Manager();
        manager.registerPrototype('custom', CustomElement);
        var type = 'custom';
        manager.updateData({
            children:[
                generateElementData('custom')
            ]
        });
        expect(manager.children.length).to.equal(1);
    });

    it('getData', function() {
        var manager = new POM.Manager();

        // TODO deepCompare statt JSON.stringify!
        expect(JSON.stringify(manager.getData())).to.equal(
            JSON.stringify({
                type: 'container',
                values: {
                    'name': null,
                    'position': {'x': 0, 'y': 0},
                    'scale': {'x': 1, 'y': 1},
                    'alpha': 1,
                    'rotation': 0,
                    'pivot': {'x': 0, 'y': 0}
                },
                children: []
            })
        );
        // TODO: more test data!
    });
});

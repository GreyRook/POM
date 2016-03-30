describe('test ContainerElement', function() {
    'use strict';

    it('create and remove Container instance', function() {
        var manager = new POM.Manager();
        var container = new POM.ContainerElement(manager);
        //TODO: .dispose();
        //TODO: make sure container is disposed correctly
    });

    it('create container with children', function() {
        var manager = new POM.Manager();
        manager.updateData({
            children:[
                generateElementData('sprite', 'sprite0'),
                generateElementData('graphics', 'graphics0'),
                generateElementData('container', 'container0')
            ]
        });

        expect(manager.children.length).to.equal(3);
        expect(manager.children[0].name).to.equal('sprite0');
        expect(manager.children[1].name).to.equal('graphics0');
        expect(manager.children[2].name).to.equal('container0');
    });
    it('get child by name recursively', function() {
        var containerData1 = generateElementData('container', 'container');
        containerData1.children = [generateElementData('sprite', 'sprite')];

        var manager = new POM.Manager({'values': {'name': 'manager'}});
        manager.updateData({
            type: 'container',
            children:[
                generateElementData('sprite'),
                generateElementData('graphics'),
                containerData1
            ]
        });
        
        // getChildByName should return only children, not the manager itself
        expect(manager.getChildByNameRecursive('manager')).to.equal(null);
        
        var image0 = manager.getChildByNameRecursive('sprite');
        expect(image0).not.to.equal(null);
        expect(image0.parent.name).to.equal('container');
        expect(image0.parent.parent.name).to.equal('manager');
    });

    it('remove child by name recursively', function() {
        var manager = new POM.Manager();

        var containerData1 = generateElementData('container');
        containerData1.children = [generateElementData('sprite', 'sprite')];

        var container = new POM.ContainerElement(manager, {
            type: 'container',
            name: 'main_container',
            children:[
                generateElementData('sprite'),
                generateElementData('graphics'),
                containerData1
            ]
        });
        container.removeChildByNameRecursive('sprite');
        var image0 = container.getChildByNameRecursive('sprite');
        expect(image0).to.equal(null);

        expect(container.children[1].children.length).to.equal(0);

        // just make sure nothing goes wrong if we call removeByChildName
        // for a name that is unknown
        container.removeChildByNameRecursive('sprite');
    });
});

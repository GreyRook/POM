describe('test updateData', function() {
    'use strict';

    var Point = function(x, y) {
        this.x = x;
        this.y = y;
    };

    it('update nested data', function() {
        var pos = new Point(1, 2);
        var elem = {'foo': {'pos': pos}};
        var data = {'values': {'foo': {'pos': {'x': 5, 'y': 22}}}};
        POM.extras.updateData(elem, data);
        expect(elem.foo.pos.x).to.equal(5);
        expect(elem.foo.pos.y).to.equal(22);
        expect(elem.foo.pos).to.equal(pos);
    });

});

describe('test helpers', function() {
    'use strict';


    it('isArray', function(){
        var isArray = POM.extras.helpers.isArray;

        expect(isArray([])).to.equal(true);
        expect(isArray({})).to.equal(false);
        expect(isArray(2)).to.equal(false);
        expect(isArray('2')).to.equal(false);
        expect(isArray(null)).to.equal(false);
        expect(isArray(undefined)).to.equal(false);

    });

    it('deepCompare', function(){
        var test = {
            a:1,
            b:'b',
            c:[1, 2, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:1,
                f:2
            }],
            g:function(){},
            h:null
        };

        var compare = POM.extras.helpers.deepCompare(test, test);
        expect(compare).to.equal(true);

        var testWrong = {
            a:1,
            b:'b',
            c:[1, 2, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:1,
                f:2
            }],
            g:function(){},
            h:null
        };

        compare = POM.extras.helpers.deepCompare(test, testWrong);
        expect(compare).to.equal(false);

        test = {
            a:1,
            b:'b',
            c:[1, 2, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:1,
                f:2
            }],
            h:null
        };

        var testWrong1 = {
            a:2,
            b:'b',
            c:[1, 2, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:1,
                f:2
            }],
            h:null
        };
        compare = POM.extras.helpers.deepCompare(test, testWrong1);
        expect(compare).to.equal(false);

        var testWrong2 = {
            a:1,
            b:'c',
            c:[1, 2, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:1,
                f:2
            }],
            h:null
        };

        compare = POM.extras.helpers.deepCompare(test, testWrong2);
        expect(compare).to.equal(false);

        var testWrong3 = {
            a:1,
            b:'b',
            c:[1, 4, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:1,
                f:2
            }],
            h:null
        };

        compare = POM.extras.helpers.deepCompare(test, testWrong3);
        expect(compare).to.equal(false);

        var testWrong4 = {
            a:1,
            b:'b',
            c:[1, 2, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:null,
                f:2
            }],
            h:null
        };

        compare = POM.extras.helpers.deepCompare(test, testWrong4);
        expect(compare).to.equal(false);



    });
    it('deepClone', function() {
        var i = 0;
        var test = {
            a:1,
            b:'b',
            c:[1, 2, 3],
            d:[[1, 2, 3], [4, 5, 6], {
                e:1,
                f:2
            }],
            g:function(){},
            h:null
        };
        var clone = POM.extras.helpers.deepClone(test)

        // make sure this is a clone, not the original
        expect(clone).not.to.equal(test);
        expect(clone.a).to.equal(1);
        expect(clone.b).to.equal('b');
        expect(clone.c).not.to.equal(test.c);
        for (i = 0; i < 3; i++) {
            expect(clone.c[i]).to.equal(i+1);
        }
        expect(clone.d).not.to.equal(test.d);
        expect(clone.d[0]).not.to.equal(test.d[0]);
        expect(clone.d[0][0]).to.equal(test.d[0][0]);
        for (i = 0; i < 3; i++) {
            expect(clone.d[0][i]).to.equal(i+1);
            expect(clone.d[1][i]).to.equal(i+4);
        }
        expect(clone.d[2]).not.to.equal(test.d[2]);
        expect(clone.d[2].e).to.equal(1);
        expect(clone.d[2].f).to.equal(2);
        expect(clone.g).to.equal(test.g);
        expect(clone.h).to.equal(null);
    });

});

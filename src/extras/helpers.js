'use strict';

function deepClone(object) {
    try{
    var type = typeof object;
    var clone;
    if (type === 'boolean' || type === 'string' || type === 'number') {
        return object;
    } else if (isArray(object)) {
        clone = [];
        for (var i in object) {
            clone.push(deepClone(object[i]));
        }
        return clone;
    } else if (type === 'function') {
        return object; //Is this correct?
    } else if (type === 'object' && object !== null) {
        clone = {};

        for (var name in object) {
            clone[name] = deepClone(object[name]);
        }

        return clone;
    } else {
        return null;
    }
    } catch(e){
        if(console && console.error){
            console.error('Object could not be cloned');
            console.error(object);
            console.error(e.message)
        }
    }
}

function isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]';
}

function deepCompare(object1, object2) {
    var type1 = typeof object1;
    var type2 = typeof object2;

    if (type1 != type2) {
        return false;
    } else if (type1 === 'boolean' || type1 === 'string' || type1 === 'number') {
        return object1 == object2;
    } else if (isArray(object1)) {
        if (!isArray(object2)) {
            return false;
        }
        for (var i in object1) {
            var child1 = object1[i];
            var child2 = object2[i];
            if (!deepCompare(child1, child2)) {
                return false;
            }
        }

        if (object1.length != object2.length) {
            return false;
        }
    } else if (type1 === 'function') {
        return object1 == object2; //TODO Better check
    } else if (type1 === 'object') {
        if (object1 == null && object2 || object2 == null && object1) {
            return false;
        } else {
            var checked = [];
            var name;
            for (name in object1) {
                if (!deepCompare(object1[name], object2[name])) {
                    return false;
                }
                checked.push(name);
            }

            for (name in object2) {
                if (checked.indexOf(name) < 0 && !deepCompare(object2[name], object1[name])) {
                    return false;
                }
            }
        }

    } else {
        return null;
    }

    return true;
}


module.exports = {
    deepCompare: deepCompare,
    isArray: isArray,
    deepClone: deepClone
};

'use strict';

var helpers = require('./helpers');

function _setValue(elem, value, key) {

    if (typeof elem[key] == 'function') {
        var args = value[key];
        if (!helpers.isArray(args)) {
            args = [args];
        }
        elem[key].apply(elem, args);
    } else if (value[key] && typeof value[key] === 'object') {

        //First we remove all previous data
        if (helpers.isArray(value[key])) {
            elem[key] = [];
        } else if (!elem[key]) {
            elem[key] = {}; //We cant do this all the time because we might have an object of a specific class
        }


        for (var k in value[key]) {
            _setValue(elem[key], value[key], k);
        }
        elem[key] = elem[key];
    } else {
        // set string, int, ... value directly
        elem[key] = value[key];
    }
}


/**
 * update data for element
 *
 * @param element {Object} some element
 * @param values {Object} data that need to be set for the object
 */
function setValues(element, values) {
    for (var property in values) {
        try {
            _setValue(element, values, property);
        } catch (e) {
            if (console && console.error) {
                console.error('Property "' + property + '" could not be set on Element ' + element.name + ' of type "' + element.type + '"');
                console.error(e.message);
            }
        }

    }
}

function setData(element, data) {
    setValues(element, data.values || {});
}

module.exports = setData;

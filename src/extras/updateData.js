'use strict';

var helpers = require('./helpers');

function _setValue(elem, value, key) {
    if (value[key] && typeof value[key] === 'object') {
        /**
         If the upper level value does not exist yet,
         we have to create an array or object,
         so that the lower level values can be added
         **/
        if(!elem[key]){
            if(helpers.isArray(value[key])){
                elem[key] = [];
            } else {
                elem[key] = {};
            }
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
function updateValues(element, values) {
    // preinitialize variable
    var elem = element;

    for (var property in values) {
        _setValue(elem, values, property);
    }
}

function updateData(element, data) {
    updateValues(element, data.values||{});
}

module.exports = updateData;

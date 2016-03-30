'use strict';

/**
 * generate basic element
 * returns basic data structure for some types
 */

var elementCounter = 0;  // to ensure element names are unique

function generateElementData(type, name){
    var elem = {};
    elem.type = type;
    elem.values = {};
    if (name) {
        elem.values.name = name;
    } else {
        elem.values.name = type + '_' + elementCounter++;
    }
    return elem;
}

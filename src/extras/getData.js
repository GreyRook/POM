'use strict';

function getValues(element) {
    var values = {};
    var property, data, key;
    var elem = element;

    for (var i = 0; i < element.dataKeys.length; i++) {
        property = element.dataKeys[i];
        try {
            if (typeof property == 'function') {
                values[property] = element[property]();
            } else if (typeof property === 'string') {
                values[property] = element[property];
            } else {
                elem = element;
                key = property;
                data = values;
                while (key.length > 1) {
                    var k = key.shift();
                    if (!data.hasOwnProperty(k)) {
                        data[k] = {};
                    }
                    data = data[k];
                    elem = elem[k];
                }
                key = key[0];
                data[key] = elem[key];
            }
        } catch (e) {
            if (console && console.error) {
                console.error('Property "' + property + '" could not be gotten from Element ' + element.name + ' of type "' + element.type + '"');
                console.error(e.message);
            }

            values[property] = undefined;
        }
    }
    return values;
}

/**
 * get describing data for element (position, style, ...)
 *
 * @returns {Object} data
 */
function getData(element) {
    return {
        'type': element.type,
        'values': getValues(element)
    };
}

module.exports = getData;

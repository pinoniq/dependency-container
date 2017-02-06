var DependencyInjectionException = require('./DependencyInjectionException');

/**
 * @param {String} name
 * @constructor
 */
function ParameterNotFoundException(name) {
    this.message = 'You have requested a non-existent parameter ' + name;
}

ParameterNotFoundException.prototype = DependencyInjectionException.prototype;

module.exports = ParameterNotFoundException;

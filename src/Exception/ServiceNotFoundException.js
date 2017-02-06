var DependencyInjectionException = require('./DependencyInjectionException');

/**
 * @param {String} id
 * @constructor
 */
function ServiceNotFoundException(id) {
    this.message = 'You have requested a non-existent service ' + id;
}

ServiceNotFoundException.prototype = DependencyInjectionException.prototype;

module.exports = ServiceNotFoundException;

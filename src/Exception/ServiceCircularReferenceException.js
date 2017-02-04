var DependencyInjectionException = require('./DependencyInjectionException');

/**
 * @param {String} id
 * @param {Array} path
 * @constructor
 */
function ServiceCircularReferenceException(id, path) {
    this.message = "Circular reference detected for service " + id + ", path: " + path.join(' -> ') + ".";
}

ServiceCircularReferenceException.prototype = DependencyInjectionException.prototype;

module.exports = ServiceCircularReferenceException

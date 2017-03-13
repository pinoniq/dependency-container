/**
 * @param {Container} container
 * @constructor
 */
function JsonFileLoader(container) {
    this.container = container;
}

JsonFileLoader.prototype = {
    /**
     * @param alias
     * @param file
     */
    loadFile: function loadFile(alias, file) {
        // add the services as alias
        this.container.get('service_locator').addAlias(alias, require('path').dirname(file));
        // load the file and parse it's content
        this.parseFile(file);
    },

    /**
     * @param file
     */
    parseFile: function parseFile(file) {
        let serviceDefinitions = require(file);
        // add all parameters
        Object.keys(serviceDefinitions['parameters']).forEach(function(key) {
            this.container.addParameter(key, serviceDefinitions['parameters'][key]);
        }.bind(this));

        // add all services
        Object.keys(serviceDefinitions['services']).forEach(function(key) {
            let serviceDefinition = serviceDefinitions['services'][key];
            let definition = this.container.register(key, serviceDefinition['path']);
            if ({}.hasOwnProperty.call(serviceDefinition, 'arguments')) {
                serviceDefinition['arguments'].forEach(function(argument) {
                    definition.addArgument(argument);
                });
            }
        }.bind(this));
    }
};

module.exports = JsonFileLoader;
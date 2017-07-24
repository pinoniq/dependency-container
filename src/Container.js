const ServiceCircularReferenceException = require('./Exception/ServiceCircularReferenceException');
const ServiceNotFoundException = require('./Exception/ServiceNotFoundException');
const ParameterNotFoundException = require('./Exception/ParameterNotFoundException');
const Definition = require('./Definition');

/**
 * @constructor
 */
function Container(rootLoader) {
    /**
     * A collection of all currently instantiated services keyed by id
     *
     * @type {{}}
     */
    this.services = {
        'service_locator': rootLoader,
        'service_container': this
    };

    /**
     * A collection of all currently being loaded services keyed by id
     *
     * We keep track of all services being instantiated to avoid circular references.
     * Once instantiated, we remove them here and add them to this.services
     *
     * @type {{}}
     */
    this.loading = {};

    /**
     * A collection of service definitions indexed by id
     *
     * @type {{Definition}}
     */
    this.definitions = {};

    /**
     * A collection of parameters indexed by name
     *
     * @type {{}}
     */
    this.parameters = {};
}

Container.prototype = {

    /**
     * Returns the service for the given id.
     *
     * Optionally, an object of named parameters can be passed to the service.
     * This is not supported for singletons.
     *
     * @param {string} id
     * @param {*} parameters optional object with named parameters to replace
     *
     * @returns {*}
     */
    get: function get(id, parameters) {
        let definition, service;

        if (id === 'service_locator' || id === 'service_container') {
            return this.services[id];
        }

        definition = this.getDefinition(id);

        if ({}.hasOwnProperty.call(this.services, id)) {
            return this.services[id];
        }

        if ({}.hasOwnProperty.call(this.loading, id)) {
            throw new ServiceCircularReferenceException(id, Object.keys(this.loading));
        }

        this.loading[id] = true;

        try {
            service = this.createService(definition, parameters);
        } finally {
            delete this.loading[id];
        }

        if (definition.isSingleton()) {
            this.services[id] = service;
        }

        return service;
    },

    /**
     * Returns the list of all definitions
     *
     * @returns {{Definition}}
     */
    getDefinitions: function getDefinitions() {
        return this.definitions;
    },

    /**
     * Returns a list of services tagged with the given tag.
     *
     * @deprecated since 1.3.0 use getServicesByTag instead
     *
     * @param {string} tag
     *
     * @returns {Array}
     */
    getByTag: function getByTag(tag) {
        this.getServicesByTag(tag);
    },

    /**
     * Returns a list of services tagged with the given tag.
     *
     * @param {string} tagName
     *
     * @returns {Array}
     */
    getServicesByTag: function getServicesByTagName(tagName) {
        const definitionIdsWithTag = Object.keys(this.definitions).filter(function filterByTag(id) {
            return this.getDefinition(id).hasTag(tagName);
        }.bind(this));

        return definitionIdsWithTag.map(function mapDefinitionToService(id) {
            return this.get(id);
        }.bind(this));
    },

    /**
     * Register a service in the Container with the given id
     *
     * @param {String} id
     * @param {String} modulePath
     *
     * @returns {Definition}
     */
    register: function register(id, modulePath) {
        this.definitions[id] = new Definition(modulePath);

        return this.definitions[id];
    },

    /**
     * Add a parameter to the Container
     *
     * @param {String} name
     * @param {*} value
     *
     * @returns {Definition}
     */
    addParameter: function addParameter(name, value) {
        this.parameters[name] = value;

        return this;
    },

    /**
     * Create an instance of the service defined by definition.
     *
     * @param {Definition} definition
     * @param {*} parameters optional object with named parameters to replace
     *
     * @returns {*}
     */
    createService: function createService(definition, parameters) {
        let serviceConstructor, serviceArguments, service, serviceLocatorTag;

        // resolve our arguments to actual services
        serviceArguments = this.resolveArguments(definition.getArguments(), parameters);

        // create our service with the required arguments
        serviceConstructor = this.get('service_locator').resolve(definition.getModulePath());

        // prepend null to the arguments passed on to bind.
        // We set the thisArg of the bind call to null since it will never be used.
        serviceArguments.unshift(null);

        service = new (Function.prototype.bind.apply(serviceConstructor, serviceArguments))();

        // if the service is tagged with serviceLocator, locate all required services
        // and add each of them to the service being constructed.
        if (definition.hasTag('serviceLocator')) {
            serviceLocatorTag = definition.getTag('serviceLocator');
            this
                .getServicesByTag(serviceLocatorTag.get('tag'))
                .forEach(service[serviceLocatorTag.get('call')].bind(service));
        }

        return service;
    },

    /**
     * Resolves an array of arguments
     *
     * @param {Array} argumentIds an array of argument ids to resolve
     * @param {*} parameters optional object with named parameters to replace
     *
     * @returns {Array} an array of resolved services
     */
    resolveArguments: function resolveArguments(argumentIds, parameters) {
        let serviceId = null;
        let parameterName = null;

        return argumentIds.map(function(argumentId) {
            switch(argumentId.charAt(0)) {
                case '@':
                    serviceId = argumentId.substr(1);
                    if (parameters && {}.hasOwnProperty.call(parameters, serviceId)) {
                        return parameters[serviceId];
                    }

                    return this.get(serviceId);
                    break;

                case '%':
                    parameterName = argumentId.substr(1);
                    if (parameters && {}.hasOwnProperty.call(parameters, parameterName)) {
                        return parameters[parameterName];
                    }

                    return this.getParameter(parameterName);
                    break;

                default:
                    return argumentId;
                    break;
            }
        }.bind(this));
    },

    /**
     * @param id
     * @returns {Definition}
     */
    getDefinition: function getDefinition(id) {
        if (!{}.hasOwnProperty.call(this.definitions, id)) {
            throw new ServiceNotFoundException(id);
        }

        return this.definitions[id];
    },

    /**
     * @param name
     */
    getParameter: function getParameter(name) {
        if (!{}.hasOwnProperty.call(this.parameters, name)) {
            throw new ParameterNotFoundException(name);
        }

        return this.parameters[name];
    }

};

module.exports = Container;

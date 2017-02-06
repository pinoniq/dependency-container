var ServiceCircularReferenceException = require('./Exception/ServiceCircularReferenceException');
var ServiceNotFoundException = require('./Exception/ServiceNotFoundException');
var ParameterNotFoundException = require('./Exception/ParameterNotFoundException');
var Definition = require('./Definition');

/**
 * @constructor
 */
function ContainerBuilder(rootLoader) {
    this.loader = rootLoader;
    /**
     * A collection of all currently instantiated services keyed by id
     *
     * @type {{}}
     */
    this.services = {};

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

ContainerBuilder.prototype = {

    /**
     * @param id
     * @returns {*}
     */
    get: function get(id) {
        var definition, service;

        if ('service_container' === id) {
            return this;
        }

        if ({}.hasOwnProperty.call(this.services, id)) {
            return this.services[id];
        }

        if ({}.hasOwnProperty.call(this.loading, id)) {
            throw new ServiceCircularReferenceException(id, Object.keys(this.loading));
        }

        this.loading[id] = true;

        definition = this.getDefinition(id);
        try {
            service = this.createService(definition, id);
        } finally {
            delete this.loading[id];
        }

        return service;
    },

    /**
     * Register a service in the Container with the given id
     *
     * @param {String} id
     * @param {String} modulePath
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
     * @param {String} id
     * @returns {*}
     */
    createService: function createService(definition, id) {
        var serviceConstructor, arguments;

        // resolve our arguments to actual services
        arguments = this.resolveArguments(definition.getArguments());

        // create our service with the required arguments
        serviceConstructor = this.loader(definition.getModulePath());

        // prepend null to the arguments passed on to bind.
        // We set the thisArg of the bind call to null since it will never be used.
        arguments.unshift(null);

        return new (Function.prototype.bind.apply(serviceConstructor, arguments))();
    },

    /**
     * Resolves an array of arguments
     *
     * @param {Array} argumentIds an array of argument ids to resolve
     * @returns {Array} an array of resolved services
     */
    resolveArguments: function resolveArguments(argumentIds) {
        return argumentIds.map(function(argumentId) {
            switch(argumentId.charAt(0)) {
                case '@':
                    return this.get(argumentId);
                    break;

                case '%':
                    return this.getParameter(argumentId);
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
     * @param value
     */
    getParameter: function addParameter(name) {
        if (!{}.hasOwnProperty.call(this.parameters, name)) {
            throw new ParameterNotFoundException(name);
        }

        return this.parameters[name];
    }

};

module.exports = ContainerBuilder;

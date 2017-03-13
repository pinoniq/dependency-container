/**
 * @constructor
 */
function ServiceLocator() {
    /**
     * A collection of alias used to resolve services
     *
     * @type {{}}
     */
    this.alias = {};

}

ServiceLocator.prototype = {

    /**
     * @param alias
     * @param root
     */
    addAlias: function addAlias(alias, root) {
        this.alias[alias] = root;
    },

    /**
     * Resolve a serviceId and require the module
     *
     * @param serviceId
     * @returns {*}
     */
    resolve: function resolve(serviceId) {
        return require(this.resolvePath(serviceId));
    },

    /**
     * Resolve a serviceId to an absolute path
     *
     * @param serviceId
     * @returns {String}
     */
    resolvePath: function resolvePath(serviceId) {
        for (const alias in this.alias) {
            if (!{}.hasOwnProperty.call(this.alias, alias)) { continue; }

            if (alias !== serviceId.substr(0, alias.length)) {
                continue;
            }

            return this.alias[alias] + serviceId.substr(alias.length);
        }

        // fallback to the serviceId
        return serviceId;
    }
};

module.exports = ServiceLocator;

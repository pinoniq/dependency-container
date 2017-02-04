/**
 *
 * @param {String} modulePath
 * @constructor
 */
function Definition(modulePath) {
    this.modulePath = modulePath;

    /**
     *
     * @type {Array}
     */
    this.arguments = [];
}

Definition.prototype = {

    /**
     * Adds an argument to pass to the service constructor.
     *
     * @param {*} argument an argument
     * @returns {Definition}
     */
    addArgument: function addArgument(argument) {
        this.arguments.push(argument);

        return this;
    },

    /**
     * @returns {Array}
     */
    getArguments: function getArguments() {
        return this.arguments;
    },

    /**
     * @returns {String}
     */
    getModulePath: function getModulePath() {
        return this.modulePath;
    }

};

module.exports = Definition;

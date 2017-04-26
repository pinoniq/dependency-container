/**
 *
 * @param {String} modulePath
 * @constructor
 */
function Definition(modulePath) {
    this.modulePath = modulePath;

    /**
     * @type {Array}
     */
    this.arguments = [];

    /**
     * @type {Array}
     */
    this.tags = [];
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
    },

    /**
     * @param tagName
     */
    addTag: function addTag(tagName) {
        this.tags.push(tagName);
    },

    /**
     * @returns {Array}
     */
    getTags: function getTags() {
        return this.tags;
    },

    /**
     * @param tagName
     * @return {boolean}
     */
    hasTag: function hasTag(tagName) {
        return this.tags.includes(tagName);
    }

};

module.exports = Definition;

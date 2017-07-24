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
     * @type {Tag[]}
     */
    this.tags = [];

    /**
     * Whether the service is a singleton or not
     *
     * @type {boolean}
     */
    this.singleton = true;
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
     * Returns the first tag found with the given name.
     *
     * @param tagName
     * @returns {Tag}
     */
    getTag: function getTag(tagName) {
        return this.tags.find(function findByTagName(tag) {
            return tag.getName() === tagName;
        });
    },

    /**
     * @returns {Tag[]}
     */
    getTags: function getTags() {
        return this.tags;
    },

    /**
     * @param tagName
     * @return {boolean}
     */
    hasTag: function hasTag(tagName) {
        return this.tags.filter(function filterByTagName(tag) {
            return tag.getName() === tagName;
        }).length > 0;
    },

    /**
     * @returns {boolean}
     */
    isSingleton: function isSingleton() {
        return this.singleton;
    },

    /**
     * @param {boolean} singleton
     */
    setSingleton: function setSingleton(singleton) {
        this.singleton = singleton;
    }

};

module.exports = Definition;

/**
 * @param {string|*} definition
 * @constructor
 */
function Tag(definition) {
    if (typeof definition === "string") {
        definition = {
            name: definition
        };
    }

    this.definition = definition;
}

Tag.prototype = {
    /**
     * Returns the name of the Tag.
     *
     * @returns {string}
     */
    getName: function getName() {
        return this.get('name');
    },

    /**
     * Returns the value associated with a given property.
     *
     * @param propertyName
     * @returns {*}
     */
    get: function get(propertyName) {
        return this.definition[propertyName];
    },

    /**
     * Returns whether the given property is set for the Tag.
     *
     * @param propertyName
     * @returns {*}
     */
    has: function has(propertyName) {
        return {}.hasOwnProperty.call(this.definition, propertyName);
    }
};

module.exports = Tag;

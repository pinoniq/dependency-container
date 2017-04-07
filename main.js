/**
 * @file
 *  A small demonstration of the container used alongside a JsonFileLoader
 *
 * @TODO write doc
 * @TODO write tests for FileLoader
 * @type {Container}
 */
const Container = require('./src/Container');
const ServiceLocator = require('./src/ServiceLocator');
const JsonFileLoader = require('./src/Loader/JsonFileLoader');

module.exports = {
    Container: Container,
    ServiceLocator: ServiceLocator,
    JsonFileLoader: JsonFileLoader
};

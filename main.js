/**
 * @file
 *  A small demonstration of the container used alongside a JsonFileLoader
 *
 * @TODO write doc
 * @TODO write tests for FileLoader
 * @type {ContainerBuilder}
 */
var ContainerBuilder = require('./src/ContainerBuilder');
var ServiceLocator = require('./src/ServiceLocator');
var JsonFileLoader = require('./src/Loader/JsonFileLoader');

var container = new ContainerBuilder(new ServiceLocator());
var loader = new JsonFileLoader(container);

loader.loadFile('test', require('path').resolve(__dirname, './tests/modules/services.json'));

// loader.getParameter('parameterKey');

// loader.get('dependency_a');;

// loader.get('single_dependency');



var chai = require('chai');
var expect = chai.expect;

var ContainerBuilder = require('./../src/ContainerBuilder');
var ServiceNotFoundException = require('./../src/Exception/ServiceNotFoundException');
var ParameterNotFoundException = require('./../src/Exception/ParameterNotFoundException');
var ServiceCircularReferenceException = require('./../src/Exception/ServiceCircularReferenceException');
var TestModuleWithDependencies = require('./modules/TestModuleWithDependencies');
var TestModuleWithoutDependency = require('./modules/TestModuleWithoutDependency');
var DependencyA = require('./modules/DependencyA');
var DependencyB = require('./modules/DependencyB');


describe('ContainerBuilder', function() {
    it('getParameter() should return the value of an added parameter', function() {
        var container = new ContainerBuilder(require);
        container
            .addParameter('test', 'value');
        expect(container.getParameter('test')).to.equal('value');
    });

    it('getParameter() should throw a ParameterNotFoundException for an unknown parameter', function() {
        var container = new ContainerBuilder(require);
        expect(container.get.bind(container, 'unknown')).to.throw(new ParameterNotFoundException('unknown'));
    });

    it('get() should return the defined service', function() {
        var container = new ContainerBuilder(require);
        container
            .register('test', './../tests/modules/TestModuleWithoutDependency');
        var service = container.get('test');
        expect(service instanceof TestModuleWithoutDependency).to.equal(true);
    });

    it('get() should throw a ServiceNotFoundException for an unknown service', function() {
        var container = new ContainerBuilder(require);
        expect(container.get.bind(container, 'unknown')).to.throw(new ServiceNotFoundException('unknown'));
    });

    it('get() should throw a ServiceCircularReferenceException for a circular dependency', function() {
        var container = new ContainerBuilder(require);
        container
            .register('test', './../tests/modules/TestModuleWithSingleDependency')
            .addArgument('@test');
        expect(container.get.bind(container, 'test')).to.throw(new ServiceCircularReferenceException('test', 'test'))
    });

    it('get() should throw a ServiceCircularReferenceException for a circular dependency with a defined path', function() {
        var container = new ContainerBuilder(require);
        container
            .register('testA', './../tests/modules/TestModuleWithoutDependency');
        container
            .register('testB', './../tests/modules/TestModuleWithSingleDependency')
            .addArgument('testA');
        container
            .register('testC', './../tests/modules/TestModuleWithSingleDependency')
            .addArgument('testB');
        expect(container.get.bind(container, 'test')).to.throw(new ServiceCircularReferenceException('test', 'testC -> testB'))
    });

    it('get() should load dependencies respecting the order', function() {
        var container = new ContainerBuilder(require);
        container
            .register('depA', './../tests/modules/DependencyA');
        container
            .register('depB', './../tests/modules/DependencyB');
        container
            .register('test', './../tests/modules/TestModuleWithDependencies')
            .addArgument('@depA')
            .addArgument('@depB');

        var service = container.get('test');
        expect(service instanceof TestModuleWithDependencies).to.equal(true);
        expect(service.dependencyA instanceof DependencyA).to.equal(true);
        expect(service.dependencyB instanceof DependencyB).to.equal(true);
    });

});

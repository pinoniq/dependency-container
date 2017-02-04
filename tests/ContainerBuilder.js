var chai = require('chai');
var expect = chai.expect;

var ContainerBuilder = require('./../src/ContainerBuilder');
var ServiceNotFoundException = require('./../src/Exception/ServiceNotFoundException');
var ServiceCircularReferenceException = require('./../src/Exception/ServiceCircularReferenceException');
var TestModuleWithDependencies = require('./modules/TestModuleWithDependencies');
var DependencyA = require('./modules/DependencyA');
var DependencyB = require('./modules/DependencyB');


describe('ContainerBuilder', function() {
    it('get() should recieve the value of an added parameter', function() {
        var container = new ContainerBuilder();
        container
            .addParameter('test', 'value');
        expect(container.get('test')).to.equal('value');
    });

    it('get() should throw a ServiceNotFoundException for an unknown service', function() {
        var container = new ContainerBuilder();
        expect(container.get.bind(container, 'unknown')).to.throw(new ServiceNotFoundException('unknown'));
    });

    it('get() should throw a ServiceCircularReferenceException for a circular dependency', function() {
        var container = new ContainerBuilder();
        container
            .register('test', './../tests/modules/TestModuleWithSingleDependency')
            .addArgument('test');
        expect(container.get.bind(container, 'test')).to.throw(new ServiceCircularReferenceException('test', 'test'))
    });

    it('get() should throw a ServiceCircularReferenceException for a circular dependency with a defined path', function() {
        var container = new ContainerBuilder();
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
        var container = new ContainerBuilder();
        container
            .register('depA', './../tests/modules/DependencyA');
        container
            .register('depB', './../tests/modules/DependencyB');
        container
            .register('test', './../tests/modules/TestModuleWithDependencies')
            .addArgument('depA')
            .addArgument('depB');

        var service = container.get('test');
        expect(service instanceof TestModuleWithDependencies).to.equal(true);
        expect(service.dependencyA instanceof DependencyA).to.equal(true);
        expect(service.dependencyB instanceof DependencyB).to.equal(true);
    });

});

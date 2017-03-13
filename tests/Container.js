const chai = require('chai');
const expect = chai.expect;

const Container = require('./../src/Container');
const ServiceLocator = require('./../src/ServiceLocator');
const ServiceNotFoundException = require('./../src/Exception/ServiceNotFoundException');
const ParameterNotFoundException = require('./../src/Exception/ParameterNotFoundException');
const ServiceCircularReferenceException = require('./../src/Exception/ServiceCircularReferenceException');
const TestModuleWithDependencies = require('./modules/TestModuleWithDependencies');
const TestModuleWithoutDependency = require('./modules/TestModuleWithoutDependency');
const DependencyA = require('./modules/DependencyA');
const DependencyB = require('./modules/DependencyB');


describe('Container', function() {
    it('getParameter() should return the value of an added parameter', function() {
        const container = new Container({resolve: require});
        container
            .addParameter('test', 'value');
        expect(container.getParameter('test')).to.equal('value');
    });

    it('getParameter() should throw a ParameterNotFoundException for an unknown parameter', function() {
        const container = new Container({resolve: require});
        expect(container.get.bind(container, 'unknown')).to.throw(new ParameterNotFoundException('unknown'));
    });

    it('get() should return the defined service', function() {
        const container = new Container({resolve: require});
        container
            .register('test', './../tests/modules/TestModuleWithoutDependency');
        const service = container.get('test');
        expect(service instanceof TestModuleWithoutDependency).to.equal(true);
    });

    it('get("service_container") should return the container itself', function() {
        const container = new Container({resolve: require});
        container
            .register('test', './../tests/modules/TestModuleWithoutDependency');
        const service = container.get('service_container');
        expect(service instanceof Container).to.equal(true);
        expect(service).to.equal(container);
    });

    it('get() should throw a ServiceNotFoundException for an unknown service', function() {
        const container = new Container({resolve: require});
        expect(container.get.bind(container, 'unknown')).to.throw(new ServiceNotFoundException('unknown'));
    });

    it('get() should throw a ServiceCircularReferenceException for a circular dependency', function() {
        const container = new Container({resolve: require});
        container
            .register('test', './../tests/modules/TestModuleWithSingleDependency')
            .addArgument('@test');
        expect(container.get.bind(container, 'test')).to.throw(new ServiceCircularReferenceException('test', 'test'))
    });

    it('get() should throw a ServiceCircularReferenceException for a circular dependency with a defined path', function() {
        const container = new Container({resolve: require});
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
        const container = new Container({resolve: require});
        container
            .register('depA', './../tests/modules/DependencyA');
        container
            .register('depB', './../tests/modules/DependencyB');
        container
            .register('test', './../tests/modules/TestModuleWithDependencies')
            .addArgument('@depA')
            .addArgument('@depB');

        const service = container.get('test');
        expect(service instanceof TestModuleWithDependencies).to.equal(true);
        expect(service.dependencyA instanceof DependencyA).to.equal(true);
        expect(service.dependencyB instanceof DependencyB).to.equal(true);
    });

});

var chai = require('chai');
var expect = chai.expect;

var ContainerBuilder = require('./../src/ContainerBuilder');
var ServiceNotFoundException = require('./../src/Exception/ServiceNotFoundException');

describe('ContainerBuilder', function() {
    it('get() should throw an exception for an unknown service', function() {
        var container = new ContainerBuilder();
        expect(container.get.bind(container, 'unknown')).to.throw(new ServiceNotFoundException('unknown'));
    });

});

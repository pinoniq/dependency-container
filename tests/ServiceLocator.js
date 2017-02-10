var chai = require('chai');
var expect = chai.expect;

var ServiceLocator = require('./../src/ServiceLocator');
var DependencyA = require('./modules/DependencyA');
var DependencyB = require('./modules/DependencyB');


describe('ServiceLocator', function() {
    it('resolvePath() should return the serviceId as is if no alias have been specified', function() {
        var locator = new ServiceLocator();
        expect(locator.resolvePath('test')).to.equal('test');
    });

    it('resolvePath() should return the serviceId as is if the alias is not found', function() {
        var locator = new ServiceLocator();
        locator.addAlias('alias', '/some/alias');
        expect(locator.resolvePath('test')).to.equal('test');
    });

    it('resolvePath() should return the resolved service id with the defined alias', function() {
        var locator = new ServiceLocator();
        locator.addAlias('alias', '/some/alias');
        locator.addAlias('/alias', '/some/other/alias');
        expect(locator.resolvePath('alias/test')).to.equal('/some/alias/test');
        expect(locator.resolvePath('/alias/test')).to.equal('/some/other/alias/test');
    });
});

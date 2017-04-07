const chai = require('chai');
const expect = chai.expect;

const ServiceLocator = require('./../src/ServiceLocator');
const DependencyA = require('./modules/DependencyA');
const DependencyB = require('./modules/DependencyB');


describe('ServiceLocator', function() {
    it('resolvePath() should return the serviceId as is if no alias have been specified', function() {
        const locator = new ServiceLocator();
        expect(locator.resolvePath('test')).to.equal('test');
    });

    it('resolvePath() should return the serviceId as is if the alias is not found', function() {
        const locator = new ServiceLocator();
        locator.addAlias('alias', '/some/alias');
        expect(locator.resolvePath('test')).to.equal('test');
    });

    it('resolvePath() should return the resolved service id with the defined alias', function() {
        const locator = new ServiceLocator();
        locator.addAlias('alias', '/some/alias');
        locator.addAlias('/alias', '/some/other/alias');
        expect(locator.resolvePath('alias/test')).to.equal('/some/alias/test');
        expect(locator.resolvePath('/alias/test')).to.equal('/some/other/alias/test');
    });
});

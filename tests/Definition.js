const chai = require('chai');
const expect = chai.expect;

const Definition = require('./../src/Definition');

describe('Definition', function() {
    it('getModulePath() should return the modulePath used to instantiate the Definition.', function() {
       const def = new Definition('./test');
       expect(def.getModulePath()).to.equal('./test');
    });

    it('getArguments() should return an empty array when no arguments have been added.', function() {
        const def = new Definition('./test');
        expect(def.getArguments().length).to.equal(0);
    });

    it('getArguments() should return an array with the added argument.', function() {
        const def = new Definition('./test');
        def.addArgument('test');
        expect(def.getArguments().length).to.equal(1);
        expect(def.getArguments()[0]).to.equal('test');
    });

    it('getArguments() should return an array with the (multile) added arguments in the order they are added.', function() {
        const def = new Definition('./test');
        def.addArgument('test0');
        def.addArgument('test1');
        expect(def.getArguments().length).to.equal(2);
        expect(def.getArguments()[0]).to.equal('test0');
        expect(def.getArguments()[1]).to.equal('test1');
    });
});

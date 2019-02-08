import { describe as suite, it as test } from 'mocha'

import { expect } from 'chai'

import { parseParams, parseQuery, stripExtraTrailingSlash } from './router-utility'

suite('stripExtraTrailingSlash()', () => {
    test('should return / when the value ///', () => {
        expect(stripExtraTrailingSlash('///')).to.equal('/');
    })
    test('should return / when the value /', () => {
        expect(stripExtraTrailingSlash('/')).to.equal('/');
    })
    test('should return empty when the value empty', () => {
        expect(stripExtraTrailingSlash('')).to.equal('');
    })
    test('should return //any-path//a-path when the value //any-path//a-path////', () => {
        expect(stripExtraTrailingSlash('//any-path//a-path////')).to.equal('//any-path//a-path');
    })
})

suite('parseQuery()', () => {
    test('should return { name: "a-name" } when the value is ?name=a-name', () => {
        expect(parseQuery('?name=a-name')).to.deep.equal({ name: "a-name" });
    })
})

suite('parseParams()', () => {
    test('should return { name: "a-name" } when the pattern is "/:name" and the uri is "/a-name"', () => {
        expect(parseParams('/:name', '/a-name')).to.deep.equal({ name: "a-name" });
    })
})
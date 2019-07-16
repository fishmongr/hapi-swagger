const Joi = require('joi');
const Code = require('code');
const Lab = require('lab');
const Helper = require('../helper.js');
const ExtendedStringJoi = require('../../lib/extended/extended-string.js');
const ExtendedNumberJoi = require('../../lib/extended/extended-number.js');
const ExtendedBooleanJoi = require('../../lib/extended/extended-boolean.js');

const expect = Code.expect;
const lab = exports.lab = Lab.script();


lab.test('String - hidden prop', async () => {
    // test a hidden param - should not show up in documentation but should work
    const routes = {
        method: 'GET',
        path: '/test/',
        options: {
            handler: Helper.defaultHandler,
            tags: ['api'],
            validate: {
                query: Joi.object({
                    visible: Joi.string(),
                    hiddenproperty: ExtendedStringJoi.string().hidden(),
                }),
            }
        }
    };

    // test that the prop is not in swagger
    const server = await Helper.createServer({ 'debug': true }, routes);
    const response = await server.inject({ method: 'GET', url: '/swagger.json' });
    expect(response.payload.indexOf('hiddenproperty')).to.equal(-1);

    // test that we can still use the prop
    const response2 = await server.inject({ method: 'GET', url: '/test/?visible=a&hiddenproperty=b' });
    expect(response2.statusCode).to.equal(200);

    // test that we can still get an invalid prop error
    const response3 = await server.inject({ method: 'GET', url: '/test/?visible=a&hiddenproperty=b&fakeprop=c' });
    expect(response3.statusCode).to.equal(400);
});

lab.test('String - hidden prop with specific valid options', async () => {
    // test a hidden param - should not show up in documentation but should work
    const routes = {
        method: 'GET',
        path: '/test/',
        options: {
            handler: Helper.defaultHandler,
            tags: ['api'],
            validate: {
                query: Joi.object({
                    hiddenproperty: ExtendedStringJoi.string().valid('a','b').hidden(),
                }),
            }
        }
    };

    const server = await Helper.createServer({ 'debug': true }, routes);

    // test that we can still use the valid prop
    const response = await server.inject({ method: 'GET', url: '/test/?hiddenproperty=a' });
    expect(response.statusCode).to.equal(200);

    // test that we get an error using an invalid option
    const response2 = await server.inject({ method: 'GET', url: '/test/?hiddenproperty=zzz' });
    expect(response2.statusCode).to.equal(400);
});




lab.test('Number - hidden prop', async () => {
    // test a hidden param - should not show up in documentation but should work
    const routes = {
        method: 'GET',
        path: '/test/',
        options: {
            handler: Helper.defaultHandler,
            tags: ['api'],
            validate: {
                query: Joi.object({
                    visible: Joi.number(),
                    hiddenproperty: ExtendedNumberJoi.number().hidden(),
                }),
            }
        }
    };

    // test that the prop is not in swagger
    const server = await Helper.createServer({ 'debug': true }, routes);
    const response = await server.inject({ method: 'GET', url: '/swagger.json' });
    expect(response.payload.indexOf('hiddenproperty')).to.equal(-1);

    // test that we can still use the prop
    const response2 = await server.inject({ method: 'GET', url: '/test/?visible=1&hiddenproperty=2' });
    expect(response2.statusCode).to.equal(200);

    // test that we can still get an invalid prop error
    const response3 = await server.inject({ method: 'GET', url: '/test/?visible=1&hiddenproperty=2&fakeprop=3' });
    expect(response3.statusCode).to.equal(400);
});

lab.test('Number - hidden prop with specific valid options', async () => {
    // test a hidden param - should not show up in documentation but should work
    const routes = {
        method: 'GET',
        path: '/test/',
        options: {
            handler: Helper.defaultHandler,
            tags: ['api'],
            validate: {
                query: Joi.object({
                    hiddenproperty: ExtendedNumberJoi.number().valid(1,2).hidden(),
                }),
            }
        }
    };

    const server = await Helper.createServer({ 'debug': true }, routes);

    // test that we can still use the valid prop
    const response = await server.inject({ method: 'GET', url: '/test/?hiddenproperty=1' });
    expect(response.statusCode).to.equal(200);

    // test that we get an error using an invalid option
    const response2 = await server.inject({ method: 'GET', url: '/test/?hiddenproperty=999' });
    expect(response2.statusCode).to.equal(400);
});




lab.test('Boolean - hidden prop', async () => {
    // test a hidden param - should not show up in documentation but should work
    const routes = {
        method: 'GET',
        path: '/test/',
        options: {
            handler: Helper.defaultHandler,
            tags: ['api'],
            validate: {
                query: Joi.object({
                    visible: Joi.boolean(),
                    hiddenproperty: ExtendedBooleanJoi.boolean().hidden(),
                }),
            }
        }
    };

    // test that the prop is not in swagger
    const server = await Helper.createServer({ 'debug': true }, routes);
    const response = await server.inject({ method: 'GET', url: '/swagger.json' });
    expect(response.payload.indexOf('hiddenproperty')).to.equal(-1);

    // test that we can still use the prop
    const response2 = await server.inject({ method: 'GET', url: '/test/?visible=true&hiddenproperty=false' });
    expect(response2.statusCode).to.equal(200);

    // test that we can still get an invalid prop error
    const response3 = await server.inject({ method: 'GET', url: '/test/?visible=false&hiddenproperty=true&fakeprop=false' });
    expect(response3.statusCode).to.equal(400);
});

lab.test('Boolean - hidden prop with specific valid options', async () => {
    // test a hidden param - should not show up in documentation but should work
    const routes = {
        method: 'GET',
        path: '/test/',
        options: {
            handler: Helper.defaultHandler,
            tags: ['api'],
            validate: {
                query: Joi.object({
                    hiddenproperty: ExtendedBooleanJoi.boolean().valid('a','b').hidden(),
                }),
            }
        }
    };

    const server = await Helper.createServer({ 'debug': true }, routes);

    // test that we can still use the valid prop
    const response = await server.inject({ method: 'GET', url: '/test/?hiddenproperty=false' });
    expect(response.statusCode).to.equal(200);

    // test that we get an error using an invalid option
    const response2 = await server.inject({ method: 'GET', url: '/test/?hiddenproperty=zzz' });
    expect(response2.statusCode).to.equal(400);
});
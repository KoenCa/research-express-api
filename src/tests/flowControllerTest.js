// Laad de benodigde test modules
const http_mocks = require('node-mocks-http')
const should = require('should')
const sinon = require('sinon')
const sinonMongoose = require('sinon-mongoose')

// Geen connectie met een database maken omdat we aan het testen zijn
// Volgorde is hier belangrijk!
const db = require('../config/db')
db.connect(false, () => {})
const flowModel = require('../model/flows')
const flowController = require('../controller/flowController')

// Gebruik mock module om een response object aan te maken met standaard instellingen.
function buildResponse() {
    return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('Flows Controller Tests', () => {

    describe('/flows', () => {
        let flowMock = sinon.mock(flowModel)

        beforeEach(() => {
            flowMock
                .expects('find')
                .chain('lean')
                .chain('exec')
                .yields(null, { test: 'test' })
        })

        afterEach(() => {
            flowMock.restore()
        })

        it('should return with status 200', (done) => {
            const response = buildResponse()
            const request = http_mocks.createRequest({
                method: 'GET',
                url: '/'
            })

            response.on('end', () => {
                response._isJSON().should.be.true
                response.statusCode.should.eql(200)
                done()
            })

            flowController.handle(request, response, done)
        })
    })


    describe('/flows with error from db', () => {
        let flowMock = sinon.mock(flowModel)

        before(function () {
            flowMock
                .expects('find')
                .chain('lean')
                .chain('exec')
                .yields(new Error('test'), { test: 'test' })
        })

        after(() => {
            flowMock.restore()
        })

        it('should return with status 500', (done) => {
            const response = buildResponse()
            const request = http_mocks.createRequest({
                method: 'GET',
                url: '/'
            })

            response.on('end', () => {
                response._isJSON().should.be.true
                response.statusCode.should.eql(500)                
                done()
            })

            flowController.handle(request, response, done)
        })
    })

    describe('/flows/:id', () => {
        let flowMock = sinon.mock(flowModel)

        beforeEach(() => {
            flowMock
                .expects('findOne')
                .chain('lean')
                .chain('exec')
                .yields(null, { test: 'test' })
        })

        afterEach(() => {
            flowMock.restore()
        })

        it('should return with status 200', (done) => {
            const response = buildResponse()
            const request = http_mocks.createRequest({
                method: 'GET',
                url: '/1234'
            })

            response.on('end', () => {
                response._isJSON().should.be.true
                response.statusCode.should.eql(200)
                done()
            })

            flowController.handle(request, response, done)
        })
    })

    describe('/flows/:id with error from db', () => {
        let flowMock = sinon.mock(flowModel)

        before(function () {
            flowMock
                .expects('findOne')
                .chain('lean')
                .chain('exec')
                .yields(new Error('test'), { test: 'test' })
        })

        after(() => {
            flowMock.restore()
        })

        it('should return with status 500', (done) => {
            const response = buildResponse()
            const request = http_mocks.createRequest({
                method: 'GET',
                url: '/1234'
            })

            response.on('end', () => {
                response._isJSON().should.be.true
                response.statusCode.should.eql(500)                
                done()
            })

            flowController.handle(request, response, done)
        })
    })

})
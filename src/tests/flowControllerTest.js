const http_mocks = require('node-mocks-http')
const should = require('should')
const sinon = require('sinon')
const sinonMongoose = require('sinon-mongoose')
const flowModel = require('../model/flows')
const flowController = require('../controller/flowController')

function buildResponse() {
    return http_mocks.createResponse({ eventEmitter: require('events').EventEmitter })
}

describe('Flows Controller Tests', () => {

    describe('Gets flows from database', () => {
        let flowMock = sinon.mock(flowModel)

        before(() => {
            flowMock
                .expects('find')
                .chain('lean')
                .chain('exec')
                .yields(null, { test: 'test' })
        })

        after(() => {
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

                const data = JSON.parse(response._getData())
                should.not.exist(data.message)
                done()
            })

            flowController.handle(request, response, done)
        })
    })


    describe('Gets error from database', () => {
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
})
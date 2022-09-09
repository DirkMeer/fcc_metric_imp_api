//chaiHttp is a plugin for chai that will allow us to run tests on http requests.
const chaiHttp = require('chai-http');
const chai = require('chai');
//just the assert shortcut again
let assert = chai.assert;
//importing our server file
const server = require('../server');
const { expect } = require('chai');

//we mount chaiHttp as middleware to give it access to our http requests for testingS
chai.use(chaiHttp);

//call suite and define the suite name and function holding the tests.
suite('Functional Tests', function() {
    this.timeout(5000); //let it timeout if it takes too long.
    //you must pass done into the function and call it at the end to avoid false positives!!
    test('Convert a valid input such as 10L: GET request to /api/convert.', function(done) {
        chai.request(server) //we just refer to the server file relatively, no need to change urls after uploading!
            .get('/api/convert?input=10L')
            .end((err, res) => {
                //console.log(res);
                expect(res).to.have.status(200); //test if 200 status
                assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}'); //check the string response, if this is correct all is correct.
                done(); //important to use done!!
            })
    })

    test('Convert an invalid input such as 32g: GET request to /api/convert.', function(done) {
        chai.request(server)
            .get('/api/convert?input=32g')
            .end((err, res) => {
                expect(res).to.have.status(200);
                assert.equal(res.text, 'invalid unit');
                done();
            })
    })

    test('Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.', function(done) {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kg')
            .end((err, res) => {
                expect(res).to.have.status(200);
                assert.equal(res.text, 'invalid number');
                done();
            })
    })

    test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.', function(done) {
        chai.request(server)
            .get('/api/convert?input=3/7.2/4kilomegagram')
            .end((err, res) => {
                expect(res).to.have.status(200);
                assert.equal(res.text, 'invalid number and unit');
                done();
            })
    })

    test('Convert with no number such as kg: GET request to /api/convert.', function(done) {
        chai.request(server)
            .get('/api/convert?input=kg')
            .end((err, res) => {
                expect(res).to.have.status(200);
                assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}');
                done();
            })
    })



});

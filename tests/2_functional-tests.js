//chaiHttp is a plugin for chai that will allow us to run tests on http requests.
const chaiHttp = require('chai-http');
const chai = require('chai');
//just the assert shortcut again
let assert = chai.assert;
//importing our server file
const server = require('../server');

//we mount chaiHttp as middleware to give it access to our http requests for testingS
chai.use(chaiHttp);

//call suite and define the suite name and function holding the tests.
suite('Functional Tests', function() {

});

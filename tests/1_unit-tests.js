const chai = require('chai');
//shortcut to assert for us to link chains to.
let assert = chai.assert;
//import the converthandler
const ConvertHandler = require('../controllers/convertHandler.js');
//we link the constructor function and 'unpack' it into our convertHandler variable.
let convertHandler = new ConvertHandler();

//I guess we can call suite, and then give it a name and define the function with all the tests inside.
suite('Unit Tests', function(){

});
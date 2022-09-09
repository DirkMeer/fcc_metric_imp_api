const chai = require('chai');
//shortcut to assert for us to link chains to.
let assert = chai.assert;
//import the converthandler
const ConvertHandler = require('../controllers/convertHandler.js');
//we link the constructor function and 'unpack' it into our convertHandler variable.
let convertHandler = new ConvertHandler();

//I guess we can call suite, and then give it a name and define the function with all the tests inside.
suite('Unit Tests', function(){
 // #numerical input testing.
 test('convertHandler should correctly read a whole number input.', function(){
    assert.equal(convertHandler.getNum('2mi'), '2');
    assert.equal(convertHandler.getNum('16gal'), '16');
    assert.equal(convertHandler.getNum('6L'), '6');
    assert.equal(convertHandler.getNum('2KM'), '2');
 })
 test('convertHandler should correctly read a decimal number input.', function () {
    assert.equal(convertHandler.getNum('2.43mi'), '2.43');
    assert.equal(convertHandler.getNum('16.124gal'), '16.124');
 })
 test('convertHandler should correctly read a fractional input.', function () {
    assert.equal(convertHandler.getNum('1/2mi'), '0.5');
    assert.equal(convertHandler.getNum('3/4gal'), '0.75');
 })
 test('convertHandler should correctly read a fractional input with a decimal.', function () {
    assert.equal(convertHandler.getNum('5.4/3lbs'), '1.8');
    assert.equal(convertHandler.getNum('2.3/4gal'), '0.575');
 })
 test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).', function () {
    assert.equal(convertHandler.getNum('5/2.4/3lbs'), 'invalid');
    assert.equal(convertHandler.getNum('2/3/4gal'), 'invalid');
 })
 test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
    assert.equal(convertHandler.getNum('lbs'), '1');
    assert.equal(convertHandler.getNum('gal'), '1');
    assert.equal(convertHandler.getNum('L'), '1');
    assert.equal(convertHandler.getNum('km'), '1');
 })

 //#input unit testing
 test('convertHandler should correctly read each valid input unit.', function () {
    assert.equal(convertHandler.getUnit('2LBS'), 'lbs');
    assert.equal(convertHandler.getUnit('l'), 'L');
    assert.equal(convertHandler.getUnit('3.4/2mi'), 'mi');
    assert.equal(convertHandler.getUnit('12.342GAL'), 'gal');
    assert.equal(convertHandler.getUnit('2/3kM'), 'km');
    assert.equal(convertHandler.getUnit('23.424kg'), 'kg');
 })
 test('convertHandler should correctly return an error for an invalid input unit.', function () {
    assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('2LBssS')), 'invalid');
    assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('liet')), 'invalid');
    assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('3.4/2min')), 'invalid');
    assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('12.342GALllo')), 'invalid');
    assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('2/3kaM')), 'invalid');
 })
 test('convertHandler should return the correct return unit for each valid input unit.', function () {
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
 })
 test('convertHandler should correctly return the spelled-out string unit for each valid input unit.', function () {
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
 })

 //#conversion testing
 test('convertHandler should correctly convert gal to L.', function () {
    assert.equal(convertHandler.convert(5, 'gal'), '18.92705');
 })
 test('convertHandler should correctly convert L to gal.', function () {
    assert.equal(convertHandler.convert(13, 'L'), '3.43424');
 })
 test('convertHandler should correctly convert mi to km.', function () {
    assert.equal(convertHandler.convert(0.4166666666666667, 'mi'), '0.67056');
 })
 test('convertHandler should correctly convert km to mi.', function () {
    assert.equal(convertHandler.convert(2.113, 'km'), '1.31296');
 })
 test('convertHandler should correctly convert lbs to kg.', function () {
    assert.equal(convertHandler.convert(2, 'lbs'), '0.90718');
 })
 test('convertHandler should correctly convert kg to lbs.', function () {
    assert.equal(convertHandler.convert(0.75, 'kg'), '1.65347');
 })

});
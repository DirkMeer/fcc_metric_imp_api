//Use strict will enable strict mode in whatever scope it is declared (can also be in a function). It forces you to write neater code by not allowing you to use undeclared variables and is stricter, providing error messages where you would have been forgiven otherwise. Allows you to write better code and receive better error messages.

'use strict';

//we will be using chai.expect to chain expectations for tests onto. This is more convenient because it allows us to just write expect and chain the methods on there from now on.
const expect = require('chai').expect;
//Import our conversion handler file.
const ConvertHandler = require('../controllers/convertHandler.js');

//ok so we export a nameless function that can take an app as argument. This is called in our server and passed the app.
module.exports = function (app) {
  //we return a copy of the convertHandler constructor object/function, I guess this is needed later?
  let convertHandler = new ConvertHandler();

  //api convert route
  app.get('/api/convert', (req, res) => {
    console.log(req.query.input);
    let initNum = convertHandler.getNum(req.query.input);
    let initUnit = convertHandler.getUnit(req.query.input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    if(initNum === 'invalid' && returnUnit === 'invalid') {
      res.status(200).send("invalid number and unit")
    } else if (initNum === 'invalid') { 
      res.status(200).send("invalid number")
    } else if (returnUnit === 'invalid') {
      res.status(200).send("invalid unit")
    } else {
      res.status(200).json({
        "initNum": initNum,
        "initUnit": initUnit,
        "returnNum": returnNum,
        "returnUnit": returnUnit,
        "string": string
      })
    }
  })

};

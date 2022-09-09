//ok so this file holds the functions that we will define to make the conversions.
//NOTE that this is actually a constructor function, it declares all functions as this.functionName creating an object full of callable methods.
function ConvertHandler() {
  
  this.getNum = function(input) {
    let result, match;
    //search for numbers with dots and slashes, get rid of the letters
    let baseRegex = new RegExp (/[\d.\/]+/)
    //capture the numerical part we need.
    try { //this will fail if only unit was input without number
      match = baseRegex.exec(input)[0]
    } catch (e) { //suppress error if the above failed
      match = '1' //use 1 instead
    } //now we will test for double slashes (invalid number)
    let slashRegex = new RegExp(/\//g)
    let slashes = match.match(slashRegex) //return an array of matches
    if (slashes !== null) { //make sure we're not reading length of a null object (no slashes case)
      if (slashes.length > 1) { //if more than one slash
        result = 'invalid' //return invalid
      }
    } else { //else evaluate the remaining number (resolve fractions)
      result = eval(match)
    } //eval is dangerous but we made sure there is nothing but numbers, dots and one slash
    console.log(`input value is ${result}`);
    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    //set a regex to only match the letters
    let baseRegex = new RegExp(/[a-zA-Z]+/)
    //extract our unit from the input
    match = baseRegex.exec(input)[0]
    //get rid of capital letters except in the case of L or l which must be uppercase!!!
    match == 'L' ? result = match 
      : match == 'l' ? result = 'L'
      : result = match.toLowerCase()
    console.log(`input unit is ${result}`);
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let dictionary = {
      'gal': 'L',
      'L': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'km': 'mi',
      'mi': 'km'
    }
    let result = dictionary[initUnit]
    if(result === undefined) { result = 'invalid' } //set invalid flag if undefined
    console.log(`opposite unit is ${result}`);
    return result;
  };

  this.spellOutUnit = function(unit) {
    let dictionary = {
      'L': 'liters',
      'gal': 'gallons',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'km': 'kilometers',
      'mi': 'miles'
    }
    let result = dictionary[unit];
    console.log(`long spelling for ${unit} is ${result}`);
    return result;
  };
  
  //they have predefined the ratios for us, very kind
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    initUnit == 'gal' ? result = initNum * galToL 
      : initUnit == 'lbs' ? result = initNum * lbsToKg
      : initUnit == 'mi' ? result = initNum * miToKm
      : initUnit == 'L' ? result = initNum / galToL
      : initUnit == 'kg' ? result = initNum / lbsToKg
      : initUnit == 'km' ? result = initNum / miToKm
      : result = 'invalid' // set invalid flag if not valid
    console.log(result);
    // get number of decimal places (append a . to avoid errors, split on . and check length of index 1)
    let decPlaces = (result + '.').split('.')[1].length //even if num has no decimal places will not error (returns 0)
    // if too many decimal places round down to 5 by creating round integer 100.000 times too high then dividing.
    decPlaces > 5 ? result = Math.round(result * 100000) / 100000
      : result = result

    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let spellInitUnit = this.spellOutUnit(initUnit);
    let spellReturnUnit = this.spellOutUnit(returnUnit);
    let result = `${initNum} ${spellInitUnit} converts to ${returnNum} ${spellReturnUnit}`;
    console.log(result);
    return result;
  };
  
}

//remember that this is the way to export in express backend stuff
module.exports = ConvertHandler;

const randInt = require('./randint');

const passwordLength = 10;
const symbols = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890';
const symbolsNumber = symbols.length;

function passwordGenerator() {
  let id = '';
  for (let i = 0; i < passwordLength; i += 1) {
    id += symbols[randInt(symbolsNumber)];
  }
  return id;
}

module.exports = passwordGenerator;

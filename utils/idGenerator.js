const randInt = require('./randint');

const idLength = 25;
const symbols = 'azertyuiopqsdfghjklmwxcvbnAZERTYUIOPQSDFGHJKLMWXCVBN1234567890';
const symbolsNumber = symbols.length;

function idGenerator() {
  let id = '';
  for (let i = 0; i < idLength; i += 1) {
    id += symbols[randInt(symbolsNumber)];
  }
  return id;
}

module.exports = idGenerator;

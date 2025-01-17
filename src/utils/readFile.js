const fs = require('fs')

const readDictionaryFile = filename => {
  return fs.readFileSync(filename, 'utf-8').split('\n')
}

const filterDictionary = (dictionary, length) => {
  return dictionary.filter(w => w.length === length)
}

module.exports = {
  readDictionaryFile,
  filterDictionary,
}

const yaml = require('js-yaml')
const fs = require('fs')

// Sort helper functions to keep code clean and readable
const sortFn = (a, b) => {
  if (a.toUpperCase() < b.toUpperCase()) return -1
  if (a.toUpperCase() > b.toUpperCase()) return 1
  return 0
}

const sortKeys = (data) => {
  const keys = Object.keys(data)
  return keys.sort(sortFn)
}

const buildSortedHash = (data, sortedKeys) => {
  const result = {}
  for (key of sortedKeys) {
    result[key] = data[key]
  }
  return result
}

const readData = (path) => {
  try {
    const data = yaml.load(fs.readFileSync(path, 'utf8'))
    return data
  } catch (e) {
    console.log(e)
  }
}

// Sort data from Yaml file using helper functions
const sortData = (data) => {
  const sortedKeys = sortKeys(data)
  const sortedHash = buildSortedHash(data, sortedKeys)
  return sortedHash
}

const writeData = (data) => {
  try {
    fs.writeFileSync('./output.json', JSON.stringify(data))
  } catch (err) {
    console.error(err)
  }
}

// Main
let data = readData('./input.yaml')
data = sortData(data)
writeData(data)

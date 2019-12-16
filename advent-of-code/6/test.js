const getOrbits = require('.')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const map1 = 'COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(',')
assert.deepEqual(getOrbits(map1), 42)

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) throw(err)
  const map2 = data.split('\n')
  assert.deepEqual(getOrbits(map2), 314247)
})
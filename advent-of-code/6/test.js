const solve = require('.')
const assert = require('assert')
const fs = require('fs')
const path = require('path')

const map1 = 'COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L'.split(',')
assert.deepEqual(solve(map1).edges, 42)

const map2 = 'COM)B,B)C,C)D,D)E,E)F,B)G,G)H,D)I,E)J,J)K,K)L,K)YOU,I)SAN'.split(',')
assert.deepEqual(solve(map2).edges, 54)

fs.readFile(path.join(__dirname, 'input.txt'), 'utf8', (err, data) => {
  if (err) throw(err)
  const map3 = data.split('\n')
  const { edges, commonAncestors } = solve(map3)
  assert.deepEqual(edges, 314247)
  assert.deepEqual(commonAncestors[0].depth, 514)
})
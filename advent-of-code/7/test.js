const assert = require('assert')
const INTCODE_COMPUTER = require('./index')
const intcode_computer = new INTCODE_COMPUTER()
const AMPLIFIER_CONTROLLER_SOFTWARE = require('./input')
const PERMUTATIONS = require('./permutations')
const results = []
PERMUTATIONS.forEach(permutation => {
  let output = 0
  permutation.forEach(phaseSetting => {
    intcode_computer.start(AMPLIFIER_CONTROLLER_SOFTWARE, [phaseSetting, output])
    output = intcode_computer.output
    results.push(output)
  })
})
assert.deepEqual(Math.max(...results), 116680)
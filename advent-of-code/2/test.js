const assert = require('assert')
const Program = require('.')
const INPUT = require('./input')
const program = new Program(INPUT)
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    program.run(i, j)
  }
}
assert.ok( program.results.find(result => result.output === 19690720))
const { noun, verb } = program.results.find(result => result.output === 19690720)
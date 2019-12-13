const assert = require('assert')
const Program = require('./index2')
const finalInput = require('./input')

const input1 = { WIRE1: 'R8,U5,L5,D3'.split(','), WIRE2: 'U7,R6,D4,L4'.split(',') }
program = new Program(input1)
assert.deepEqual(program.getManhattanDistance(), 6)

const input2 = { WIRE1: 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(','), WIRE2: 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',') }
program = new Program(input2)
assert.deepEqual(program.getManhattanDistance(), 159)
assert.deepEqual(program.getCombinedSteps(), 816)

const input3 = { WIRE1: 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(','), WIRE2: 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split(',') }
program = new Program(input3)
assert.deepEqual(program.getManhattanDistance(), 135)
assert.deepEqual(program.getCombinedSteps(), 564)

const input4 = { WIRE1: 'R75,D30,R83,U83,L12,D49,R71,U7,L72'.split(','), WIRE2: 'U62,R66,U55,R34,D71,R55,D58,R83'.split(',') }
program = new Program(input4)
assert.deepEqual(program.getCombinedSteps(), 610)

const input5 = { WIRE1: 'R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51'.split(','), WIRE2: 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'.split(',') }
program = new Program(input5)
assert.deepEqual(program.getCombinedSteps(), 410)

program = new Program(finalInput)
assert.deepEqual(program.getManhattanDistance(), 855)
assert.deepEqual(program.getCombinedSteps(), 11238)

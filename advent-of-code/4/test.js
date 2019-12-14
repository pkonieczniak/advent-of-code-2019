const assert = require('assert')
const isValid = require('./index')

const password1 = '111111'
assert.deepEqual(isValid(password1), false)

const password2 = '223450'
assert.deepEqual(isValid(password2), false)

const password3 = '123789'
assert.deepEqual(isValid(password3), false)

const password4 = '111123'
assert.deepEqual(isValid(password4), false)

const password5 = '135679'
assert.deepEqual(isValid(password5), false)

const password6 = '123444'
assert.deepEqual(isValid(password6), false)

const password7 = '112233'
assert.deepEqual(isValid(password7), true)

const password8 = '111122'
assert.deepEqual(isValid(password8), true)

const password9 = '357778'
assert.deepEqual(isValid(password9), false)

const password10 = '444556'
assert.deepEqual(isValid(password10), true)

const password11 = '889999'
assert.deepEqual(isValid(password11), true)

const password12 = '127777'
assert.deepEqual(isValid(password12), false)

const password13 = '111123'
assert.deepEqual(isValid(password13), false)

const password14 = '124444'
assert.deepEqual(isValid(password14), false)

const password15 = '122235'
assert.deepEqual(isValid(password15), false)

const password16 = '112233'
assert.deepEqual(isValid(password16), true)

const password17 = '111223'
assert.deepEqual(isValid(password17), true)

const password18 = '788999'
assert.deepEqual(isValid(password18), true)

const password19 = '555789'
assert.deepEqual(isValid(password19), false)

function findPasswords () {
  let found = 0
  for (let i = 357253; i < 892942; i++) {
    const password = i.toString()
    if (isValid(password)) { 
      found += 1
    }
  }
  return found
}
assert.deepEqual(findPasswords(), 324)
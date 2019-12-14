const assert = require('assert')
const isValid = require('./index')

const password1 = '111111'
assert.deepEqual(isValid(password1), true)

const password2 = '223450'
assert.deepEqual(isValid(password2), false)

const password3 = '123789'
assert.deepEqual(isValid(password3), false)

const password4 = '111123'
assert.deepEqual(isValid(password4), true)

const password5 = '135679'
assert.deepEqual(isValid(password5), false)

function findPasswords () {
  let found = 0
  for (let i = 357253; i < 892942; i++) {
    const password = i.toString()
    if (isValid(password)) found += 1
  }
  return found
}
assert.deepEqual(findPasswords(), 530)


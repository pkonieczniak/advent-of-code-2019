module.exports = function isValid (password) {
  if (password.length !== 6) return false
  if (allDigitsAreTheSame(password)) return false
  if (!hasCorrectOrder(password)) return false
  if (!hasDouble(password)) return false
  return true
}

function allDigitsAreTheSame (password) {
  const digit = password[0]
  return digit.repeat(6) === password
}

function hasCorrectOrder (password) {
  password = password.split('').map(char => Number(char))
  const passwordCopy = password.slice().sort()
  return password.toString().replace(/,/g, '') === passwordCopy.toString().replace(/,/g, '')
}

function hasDouble (password) {
  const matches = getRepeatedDigits(password)
  if (!matches.length) return false
  if (hasOneDouble(matches)) return true
  return false
}

function getRepeatedDigits (password) {
  const digits = [...new Set(password.match(/[0-9]/g))]
  const matches = []
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i]
    const regexp = new RegExp(`${digit}{2,}`, 'g')
    const match = password.match(regexp)
    if (match) matches.push(match)
  }
  return matches
}

function hasOneDouble (matches) {
  return matches.find(match => {
    const sequence = match[0]
    return sequence.length === 2
  })
}
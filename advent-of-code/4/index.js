module.exports = function isValid (password) {
  if (password.length !== 6) return false
  if (allDigitsAreTheSame(password)) return true
  if (hasDouble(password) && hasCorrectOrder(password)) return true
  return false
}

function allDigitsAreTheSame (password) {
  const digit = password[0]
  return digit.repeat(6) === password
}

function hasDouble (password) {
  const digits = [...new Set(password.match(/[0-9]/g))]
  for (let i = 0; i < digits.length; i++) {
    const digit = digits[i]
    const regexp = new RegExp(`${digit}${digit}+`, 'g')
    if (password.match(regexp)) return true
  }
  return false
}

function hasCorrectOrder (password) {
  password = password.split('').map(char => Number(char))
  const passwordCopy = password.slice().sort()
  return password.toString().replace(/,/g, '') === password.toString().replace(/,/g, '')
}
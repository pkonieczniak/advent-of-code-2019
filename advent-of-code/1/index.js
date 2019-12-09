const INPUT = require('./input')
function calculate (input, total = 0) {
  const fuel = Math.floor(input / 3) - 2
  if (fuel <= 0) return total
  return calculate(fuel, fuel + total)
}
function total () {
  return INPUT.reduce((accumulator, currentValue) => {
    return accumulator += calculate(currentValue)
  }, 0)
}
module.exports = { calculate, total }



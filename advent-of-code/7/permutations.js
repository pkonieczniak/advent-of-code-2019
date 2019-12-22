const Combinatorics = require('js-combinatorics')
const permutations = Combinatorics.permutation([0, 1, 2, 3, 4])
module.exports = permutations.toArray()
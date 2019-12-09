class Program {
  constructor (input) {
    this.input = input
    this.noun = null
    this.verb = null
    this.results = []
  }
  run (noun, verb) {
    this.noun = noun
    this.verb = verb
    this.memory = this.input.slice()
    this.memory[1] = noun
    this.memory[2] = verb
    this.calculate()
  }
  calculate () {
    for (let i = 0; i < this.memory.length; i += 4) {
      const opcode = this.memory[i]
      if (opcode === 99) {
        return this.results.push({ output: this.memory[0],  noun: this.noun, verb: this.verb })
      }
      const position1 = this.memory[i + 1]
      const position2 = this.memory[i + 2]
      const slot = this.memory[i + 3]
      if (opcode === 1) {
        this.memory[slot] = this.memory[position1] + this.memory[position2]
      } else if (opcode === 2){
        this.memory[slot] = this.memory[position1] * this.memory[position2]
      } else {
        throw new Error('invalid opcode')
      }
    }
  }
}
module.exports = Program
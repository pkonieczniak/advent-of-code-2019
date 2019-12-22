class INTCODE_COMPUTER {
  static OPERATIONS = {
    '01': { name: 'ADDITION', parameters: 3 },
    '02': { name: 'MULTIPLY', parameters: 3 },
    '03': { name: 'INPUT', parameters: 1 },
    '04': { name: 'OUTPUT', parameters: 1 },
    '05': { name: 'JUMP_IF_TRUE', parameters: 2 },
    '06': { name: 'JUMP_IF_FALSE', parameters: 2 },
    '07': { name: 'LESS_THAN', parameters: 3 },
    '08': { name: 'EQUALS', parameters: 3 },
    '99': { name: 'HALT', parameters: 0 }
  }
  constructor () {}
  start (program = [], inputs = []) {
    this.memory = program.slice()
    for (let instructionPointer = 0; instructionPointer < this.memory.length;) {
      let hasPointerChanged = false
      const instruction = this.memory[instructionPointer].toString()
      let opcode = instruction.substr(instruction.length - 2)  
      if (opcode.length === 1) opcode = '0'.concat(opcode)
      const operation = INTCODE_COMPUTER.OPERATIONS[opcode]
      if (!operation) throw new Error('Invalid operation')
      if (operation.name === 'HALT') return
      const parameters = this.getParameters(instruction, operation, instructionPointer)
      if (operation.name === 'ADDITION') {
        const [parameter1, parameter2, parameter3] = parameters
        parameter1.value = parameter1.mode === '0' ? this.memory[parameter1.address] : parameter1.address
        parameter2.value = parameter2.mode === '0' ? this.memory[parameter2.address] : parameter2.address
        this.memory[parameter3.address] = parameter1.value + parameter2.value
      } else if (operation.name === 'MULTIPLY') {
        const [parameter1, parameter2, parameter3] = parameters
        parameter1.value = parameter1.mode === '0' ? this.memory[parameter1.address] : parameter1.address
        parameter2.value = parameter2.mode === '0' ? this.memory[parameter2.address] : parameter2.address
        this.memory[parameter3.address] = parameter1.value * parameter2.value
      } else if (operation.name === 'INPUT') {
        const [parameter1] = parameters
        const input = inputs.shift()
        this.memory[parameter1.address] = input
      } else if (operation.name === 'OUTPUT') {
        const [parameter1] = parameters
        this.output = this.memory[parameter1.address]
      } else if (operation.name === 'JUMP_IF_TRUE') {
        const [parameter1, parameter2] = parameters
        parameter1.value = parameter1.mode === '0' ? this.memory[parameter1.address] : parameter1.address
        parameter2.value = parameter2.mode === '0' ? this.memory[parameter2.address] : parameter2.address
        if (parameter1.value !== 0) {
          instructionPointer = parameter2.value
          hasPointerChanged = true
        }
      } else if (operation.name === 'JUMP_IF_FALSE') {
        const [parameter1, parameter2] = parameters
        parameter1.value = parameter1.mode === '0' ? this.memory[parameter1.address] : parameter1.address
        parameter2.value = parameter2.mode === '0' ? this.memory[parameter2.address] : parameter2.address
        if (parameter1.value === 0) {
          instructionPointer = parameter2.value
          hasPointerChanged = true
        }
      } else if (operation.name === 'LESS_THAN') {
        const [parameter1, parameter2, parameter3] = parameters
        parameter1.value = parameter1.mode === '0' ? this.memory[parameter1.address] : parameter1.address
        parameter2.value = parameter2.mode === '0' ? this.memory[parameter2.address] : parameter2.address
        const result = parameter1.value < parameter2.value ? 1 : 0 
        this.memory[parameter3.address] = result        
      } else if (operation.name === 'EQUALS') {
        const [parameter1, parameter2, parameter3] = parameters
        parameter1.value = parameter1.mode === '0' ? this.memory[parameter1.address] : parameter1.address
        parameter2.value = parameter2.mode === '0' ? this.memory[parameter2.address] : parameter2.address
        const result = parameter1.value === parameter2.value ? 1 : 0 
        this.memory[parameter3.address] = result  
      }
      if (!hasPointerChanged) {
        instructionPointer += operation.parameters + 1
      }
    }    
  }
  getParameters (instruction, operation, pointer) {
    const modes = instruction.substr(0, instruction.length - 2).split('')
    if (modes.length !== operation.parameters) {
      const difference = Math.abs(modes.length - operation.parameters)
      for (let i = 0; i < difference; i++) modes.unshift('0')
    }
    const parameters = []
    for (let j = 1; j <= operation.parameters; j++) {
      const mode = modes.pop()
      parameters.push({ address: this.memory[pointer + j], mode })
    }
    return parameters
  }
} 
module.exports = INTCODE_COMPUTER
// This solution based on https://gist.github.com/Topener/ed00c35a6cbae9c655db2b579b36080b
class Wire {
  constructor (instructions) {
    this.instructions = instructions
    this.coordinates = []
    this.latestCoordinate = { x: 0, y: 0, step: 0 } 
  }
  draw () {
    this.instructions.forEach(this.execute.bind(this))
  }
  execute (instruction) {
    const operator = instruction[0]
    const value = Number(instruction.substring(1))
    for (let i = 0; i < value; i++) {
      if (operator === 'U') this.latestCoordinate.y += 1
      if (operator === 'R') this.latestCoordinate.x += 1
      if (operator === 'D') this.latestCoordinate.y -= 1
      if (operator === 'L') this.latestCoordinate.x -= 1
      this.latestCoordinate.step += 1
      this.coordinates.push(Object.assign({}, this.latestCoordinate))
    }
  }
}
class Program {
  constructor (input) {
    this.wire1 = new Wire(input.WIRE1)
    this.wire2 = new Wire(input.WIRE2)
    this.intersections = []
    this.wire1.draw()
    this.wire2.draw()
  }
  getManhattanDistance () {
    const intersections = this.getIntersections()
    return Math.min(...intersections.map(intersection => Math.abs(intersection.x) + Math.abs(intersection.y)))
  }
  getIntersections () {
    return this.wire1.coordinates.map(coordinate1 => {
      const intersection = this.wire2.coordinates.find(coordinate2 => coordinate1.x === coordinate2.x && coordinate1.y === coordinate2.y)
      if (intersection) intersection.step = intersection.step + coordinate1.step
      return intersection
    }).filter(Boolean)
  }
  getCombinedSteps () {
    return Math.min(...this.getIntersections().map(intersection => intersection.step))
  }
}
module.exports = Program
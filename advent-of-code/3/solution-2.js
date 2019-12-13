// Solution based on https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection 
// Works only for the first two inputs. Something is broken
const { det, matrix } = require('mathjs')
class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}
class Segment {
  constructor (point1, point2) {
    this.point1 = point1
    this.point2 = point2
  }
}
class Program {
  constructor (input) {
    this.WIRE1 = input.WIRE1
    this.WIRE2 = input.WIRE2
    this.intersectionPoints = []
    this.wire1Coordinates = [new Point(0, 0)]
    this.wire2Coordinates = [new Point(0, 0)]
    this.parse()
  }
  parse () {
    const sizeDifference = Math.abs(this.WIRE1.length - this.WIRE2.length)
    if (sizeDifference !== 0) {
      this.WIRE1.length < this.WIRE2.length ? this.complete(this.WIRE1, sizeDifference) : this.complete(this.WIRE2, sizeDifference)
    } 
  }
  complete (wire, length) {
    for (let i = 0; i < length; i++) { wire.push('0R') }
  }
  getLatestCoordinate (wire) {
    return wire[wire.length - 1]
  }
  addCoordinate (wire, coordinate) {
    wire.push(coordinate)
  }  
  collectIntersections () {
    for (let i = 0; i < this.WIRE1.length; i++) {
      const wire1LatestCoordinate = this.getLatestCoordinate(this.wire1Coordinates)
      const segment1 = new Segment(wire1LatestCoordinate, this.move(wire1LatestCoordinate, this.WIRE1[i]))
      this.addCoordinate(this.wire1Coordinates, segment1.point2)
      
      const wire2LatestCoordinate = this.getLatestCoordinate(this.wire2Coordinates)
      const segment2 = new Segment(wire2LatestCoordinate, this.move(wire2LatestCoordinate, this.WIRE2[i]))
      this.addCoordinate(this.wire2Coordinates, segment2.point2)
      
      const { t, u } = this.intersection(segment1, segment2)
      if ((t > 0 && t <= 1) && (u > 0 && u <= 1)) {
        const x1 = segment1.point1.x + t * (segment1.point2.x - segment1.point1.x)
        const y1 = segment1.point1.y + t * (segment1.point2.y - segment1.point1.y)
        this.intersectionPoints.push(new Point(x1, y1))
      }
    }
  }
  move (point, shift) {
    const pointCopy = Object.assign({}, point)
    const operator = shift[0]
    shift = Number(shift.substring(1))
    if (operator === 'R') {
      pointCopy.x = pointCopy.x + shift
    } else if (operator === 'L') {
      pointCopy.x = pointCopy.x - shift
    } else if (operator === 'U') {
      pointCopy.y = pointCopy.y + shift
    } else if (operator === 'D') {
      pointCopy.y = pointCopy.y - shift
    }
    return pointCopy
  }
  intersection (segment1, segment2) {
    const t = det(matrix(
        [
          [segment1.point1.x - segment2.point1.x, segment2.point1.x - segment2.point2.x],
          [segment1.point1.y - segment2.point1.y, segment2.point1.y - segment2.point2.y],
        ]
      )) / det(matrix(
        [
          [segment1.point1.x - segment1.point2.x, segment2.point1.x - segment2.point2.x],
          [segment1.point1.y - segment1.point2.y, segment2.point1.y - segment2.point2.y],
        ]
      ))
      const u = det(matrix(
        [
          [segment1.point1.x - segment1.point2.x, segment1.point1.x - segment2.point1.x],
          [segment1.point1.y - segment1.point2.y, segment1.point1.y - segment2.point1.y],
        ]
      )) / det(matrix(
        [
          [segment1.point1.x - segment1.point2.x, segment2.point1.x - segment2.point2.x],
          [segment1.point1.y - segment1.point2.y, segment2.point1.y - segment2.point2.y],
        ]
      ))
      return { t, u: -u }
  }
  distance () {
    const results = this.intersectionPoints.map(point => {
     return point.x + point.y
   }) 
   return Math.min(...results) 
  }
}
module.exports = Program

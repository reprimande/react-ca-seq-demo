import _ from 'lodash'
import EventEmitter from 'events'

class Cell extends EventEmitter {
  constructor(x, y, value = 0, max = 1) {
    super()
    this._x = x
    this._y = y
    this._value = value
    this._max = max
  }

  next() {
    //return (this._value + 1 >= this._max) ? 0 : this._value + 1
    return this._value === 0 ? 1 : 0
  }

  update() {
    this.value = this.next()
  }

  get x() {
    return this._x
  }

  get y() {
    return this._y
  }

  get max() {
    return this._max
  }

  get value() {
    return this._value
  }

  set value(val) {
    this._value = val
    this.emit('change', val)
  }
}

class CA extends EventEmitter  {
  constructor(h = 4, w = 4, cells = [[0,1,0,0],[0,0,1,0],[0,1,0,0],[0,0,0,1]], threashold = 2, max = 1) {
    super()
    this._cells = _.times(h, (y) => {
      return _.times(w, (x) => {
        return new Cell(x, y, cells[y][x], max)
      })
    })
    this._w = w
    this._h = h
    this._threashold = threashold
  }

  clear() {
    this._cells.forEach((row) => {
      row.forEach((cell) => {
        cell.value = 0
      })
    })
  }

  process() {
    this._process(this._cells)
    this.emit('change', this.cells)
  }

  _process(cells) {
    const targets = cells.map((row) => {
      return row.filter((cell) => {
        return this.check(cell)
      })
    })
    _.flatten(targets).forEach((cell) => { cell.update() })
  }

  check(cell) {
    const x = cell.x,
          y = cell.y,
          count = this.neighborCount(x, y)
    if (cell.value === 0) {
      return count === 3
    } else {
      return !(count === 2 || count === 3)
    }
  }

  neighborCount(x, y) {
    return _.filter(this.neighbors(x, y), (c) => { return c.value === 1 }).length
  }
  neighbors(x, y) {
    return [
      this.getCell(x, y - 1),
      this.getCell(x, y + 1),
      this.getCell(x - 1, y),
      this.getCell(x + 1, y),
      this.getCell(x - 1, y - 1),
      this.getCell(x - 1, y + 1),
      this.getCell(x + 1, y - 1),
      this.getCell(x + 1, y + 1)
    ]
  }

  getCell(x, y) {
    const _x = (x + this._w) % this._w,
          _y = (y + this._h) % this._h
    return this._cells[_y][_x]
  }

  get cells() {
    return this._cells
  }

  get cellValues() {
    return _.map(this._cells, (row) => { return _.map(row, (cell) => { return cell.value } ) })
  }
}

export default CA

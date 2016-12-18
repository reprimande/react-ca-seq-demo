import _ from 'lodash'

export const process = (cells) => {
  return cells.map((row, y) => {
    return row.map((cell, x) => {
      return willChange(cells, x, y) ? toggleValue(cell) : cell
    })
  })
}

export const updateCell = (cells, x, y) => {
  cells[y][x] = toggleValue(cells[y][x])
  return Object.assign([], cells)
}

export const clearAll = (cells) => {
  return cells.map((r) => { return r.map((_) => { return 0 }) })
}

export const createRandomCells = (size) => {
  return _.times(size, () => {
    return _.times(size, () => {
      return Math.floor(Math.random()*2)
    })
  })
}

const willChange = (cells, x, y) => {
  const v = cells[y][x],
        c = neighborCount(cells, x, y)
  if (isAlived(v)) {
    return !(c === 2 || c === 3)
  } else {
    return c === 3
  }
}

const isAlived = (v) => {
  return v !== 0
}

const neighborCount = (cells, x, y) => {
  return neighbors(cells, x, y).filter((val) => { return isAlived(val) }).length
}

const neighbors = (cells, x, y) => {
  return [
    [x, y - 1],
    [x, y + 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y - 1],
    [x - 1, y + 1],
    [x + 1, y - 1],
    [x + 1, y + 1]
  ].map(([x, y]) => { return cellValue(cells, x, y) })
}

const cellValue = (cells, x, y) => {
  const h = cells.length,
        y_ = (y + h) % h,
        w = cells[y_].length,
        x_ = (x + w) % w
  return cells[y_][x_]
}

const toggleValue = (val) => { return val ^ 1 }



import _ from 'lodash'

import { PROCESS, UPDATE_CELL, RANDOM_ALL, CLEAR_ALL } from '../constants/ActionTypes'

const createRandomCells = (size) => {
  return _.times(size, () => {
    return _.times(size, () => {
      return Math.floor(Math.random()*2)
    })
  })
}

const initialState = createRandomCells(16)

const cells = (state = initialState, action) => {
  switch (action.type) {
    case PROCESS:
      return process(state)
    case UPDATE_CELL:
      return updateCell(state, action.x, action.y)
    case RANDOM_ALL:
      return createRandomCells(16)
    case CLEAR_ALL:
      return clearAll(state)
    default:
      return state
  }
}

const process = (cells) => {
  return cells.map((row, y) => {
    return row.map((cell, x) => {
      return willChange(cells, x, y) ? toggleValue(cell) : cell
    })
  })
}

const willChange = (cells, x, y) => {
  const v = cells[y][x],
        c = neighborCount(cells, x, y)
  if (v === 0) {
    return c === 3
  } else {
    return !(c === 2 || c === 3)
  }
}

const neighborCount = (cells, x, y) => {
  return neighbors(cells, x, y).filter((val) => { return val !== 0 }).length
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

const updateCell = (cells, x, y) => {
  cells[y][x] = toggleValue(cells[y][x])
  return cells
}

const clearAll = (cells) => {
  return cells.map((r) => { return r.map((_) => { return 0 }) })
}

export default cells

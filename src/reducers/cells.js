import { process, updateCell, createRandomCells, clearAll } from './ca/conway'
import { PROCESS, STEP, UPDATE_CELL, RANDOM_ALL, CLEAR_ALL } from '../constants/ActionTypes'

const initialState = createRandomCells(16)

const cells = (state = initialState, action) => {
  switch (action.type) {
    case PROCESS:
      return process(state)
    case STEP:
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

export default cells

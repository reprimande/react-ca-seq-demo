import * as types from '../constants/ActionTypes'

export const process = () => ({ type: types.PROCESS })
export const updateCell = (x, y) => ({ type: types.UPDATE_CELL, x, y })
export const randomAll = () => ({ type: types.RANDOM_ALL })
export const clearAll = () => ({ type: types.CLEAR_ALL })
export const step = (step) => ({ type: types.STEP, step })

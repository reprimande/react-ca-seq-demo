import { STEP } from '../constants/ActionTypes'

const sequencer = (state = { step: 0 }, action) => {
  switch (action.type) {
    case STEP:
      return { step : action.step }
    default:
      return state
  }
}

export default sequencer

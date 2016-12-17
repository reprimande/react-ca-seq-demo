import { STEP, STOP, START } from '../constants/ActionTypes'

const sequencer = (state = { step: 0, running: true }, action) => {
  switch (action.type) {
    case STEP:
      return { step : action.step, running: state.running }
    case STOP:
      return { step : state.step, running: false  }
    case START:
      return { step : state.step, running: true }
    default:
      return state
  }
}

export default sequencer

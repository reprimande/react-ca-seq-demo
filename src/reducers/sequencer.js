import { STEP, STOP, START, BPM } from '../constants/ActionTypes'

const sequencer = (state = { step: 0, running: false, bpm: 120 }, action) => {
  switch (action.type) {
    case STEP:
      return { step : action.step, running: state.running, bpm: state.bpm }
    case STOP:
      return { step : state.step, running: false, bpm: state.bpm   }
    case START:
      return { step : state.step, running: true, bpm: state.bpm  }
    case BPM:
      return { step : state.step, running: state.running, bpm: action.bpm  }
    default:
      return state
  }
}

export default sequencer

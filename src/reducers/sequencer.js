import { STEP, STOP, START, BPM } from '../constants/ActionTypes'

const sequencer = (state = { step: 0, running: false, bpm: 160, length: 16 }, action) => {
  switch (action.type) {
    case STEP:
      return {
        step : (state.step  + 1) % state.length,
        running: state.running,
        bpm: state.bpm,
        length: state.length
      }
    case STOP:
      return { step : state.step, running: false, bpm: state.bpm, length: state.length }
    case START:
      return { step : state.step, running: true, bpm: state.bpm, length: state.length  }
    case BPM:
      return { step : state.step, running: state.running, bpm: action.bpm, length: state.length  }
    default:
      return state
  }
}

export default sequencer

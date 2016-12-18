import { STEP, STOP, START, BPM, TRIGGER_ALL } from '../constants/ActionTypes'

const initialState = {
  step: 0,
  running: false,
  bpm: 160,
  length: 16,
  triggers: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}

const sequencer = (state = initialState, action) => {
  switch (action.type) {
    case STEP:
      return {
        step : (state.step  + 1) % state.length,
        running: state.running,
        bpm: state.bpm,
        length: state.length,
        triggers: state.triggers
      }
    case STOP:
      return { step : state.step, running: false, bpm: state.bpm, length: state.length, triggers: state.triggers }
    case START:
      return { step : state.step, running: true, bpm: state.bpm, length: state.length, triggers: state.triggers }
    case BPM:
      return { step : state.step, running: state.running, bpm: action.bpm, length: state.length, triggers: state.triggers }
    case TRIGGER_ALL:
      return { step : state.step, running: state.running, bpm: state.bpm, length: state.length, triggers: action.triggers }
    default:
      return state
  }
}

export default sequencer

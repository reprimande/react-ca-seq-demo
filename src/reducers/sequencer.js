import { STEP, STOP, START, BPM, TRIGGER_ALL, TRIGGER_END } from '../constants/ActionTypes'

const initialState = {
  step: 0,
  running: false,
  bpm: 160,
  length: 16,
  triggers: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  triggering: false
}

const sequencer = (state = initialState, action) => {
  switch (action.type) {
    case STEP:
      return {
        step : (state.step  + 1) % state.length,
        running: state.running,
        bpm: state.bpm,
        length: state.length,
        triggers: state.triggers,
        triggering: false
      }
    case STOP:
      return {
        step : state.step,
        running: false,
        bpm: state.bpm,
        length: state.length,
        triggers: state.triggers,
        triggering: false
      }
    case START:
      return {
        step : state.step,
        running: true,
        bpm: state.bpm,
        length: state.length,
        triggers: state.triggers,
        triggering: false
      }
    case BPM:
      return {
        step : state.step,
        running: state.running,
        bpm: action.bpm,
        length: state.length,
        triggers: state.triggers,
        triggering: false
      }
    case TRIGGER_ALL:
      return {
        step : state.step,
        running: state.running,
        bpm: state.bpm, length:
        state.length,
        triggers: action.triggers,
        triggering: true
      }
    case TRIGGER_END:
      return {
        step : state.step,
        running: state.running,
        bpm: state.bpm, length:
        state.length,
        triggers: state.triggers,
        triggerring: false
      }
    default:
      return state
  }
}

export default sequencer

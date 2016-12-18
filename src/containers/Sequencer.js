import _ from 'lodash'
import Track from './Track'

class Sequencer {
  constructor(ctx, actions) {
    this.track = new Track(ctx)
    this.actions = actions
  }

  setState(state) {
    this.cells = state.cells
    if (this.step != state.sequencer.step) {
      this.step = state.sequencer.step
      this.playTracks(this.step)
    }
  }

  playTracks(step) {
    const currents = _.flatten(this.cells.map((row) => {
      return row.filter((_, x) => { return x === step })
    }))

    this.track.playAll(currents)
    this.actions.triggerAll(currents)
  }
}

export default Sequencer

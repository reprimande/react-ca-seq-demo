import _ from 'lodash'

class Sequencer {
  constructor(actions) {
    this.actions = actions
    this.step = -1
  }

  setState(state) {
    if (this.step != state.sequencer.step) {
      this.step = state.sequencer.step
      this.processStep(this.step, state.cells)
    }
  }

  processStep(step, cells) {
    const currents = _.flatten(cells.map((row) => {
      return row.filter((_, x) => { return x === step })
    }))

    this.actions.triggerAll(currents)
  }
}

export default Sequencer

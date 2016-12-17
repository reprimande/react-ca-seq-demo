import { createStore, bindActionCreators } from 'redux'
import _ from 'lodash'

import cells from './reducers'
import * as Actions from './actions'

import DrumKit from './synth/drumkit'
import Acid from './synth/acid'

class Sequencer {
  constructor(ctx, store, length) {
    this.length = length
    this.step = 0
    this.isActive = false

    this.ctx = ctx
    this.actions = bindActionCreators(Actions, store.dispatch)
    this.drumkit = new DrumKit(ctx)
    this.bass = new Acid(ctx)

    store.subscribe(() => {
      this.state = store.getState()
    });
  }

  start() {
    if (!this.isActive) {
      this.step = 0
      this.t = setInterval(() => { this.process() }, 100)
      this.isActive = true
    }
  }

  stop() {
    if (this.isActive) {
      clearInterval(this.t)
      this.step = 0
      this.isActive = false
    }
  }

  process() {
    this.step = (this.step + 1) % this.length
    this.actions.process()
    this.actions.step(this.step)
    // TODO timing
    // TODO management instruments
    const tracks = [
      { s: this.bass, args: [12 + 36] },
      { s: this.bass, args: [11 + 36] },
      { s: this.bass, args: [9 + 36] },
      { s: this.bass, args: [7 + 36] },
      { s: this.bass, args: [5 + 36] },
      { s: this.bass, args: [4 + 36] },
      { s: this.bass, args: [2 + 36] },
      { s: this.bass, args: [0 + 36] },
      { s: this.drumkit.hihat, args: [] },
      { s: this.drumkit.hihat, args: [] },
      { s: this.drumkit.hihat, args: [] },
      { s: this.drumkit.snare, args: [] },
      { s: this.drumkit.snare, args: [] },
      { s: this.drumkit.kick, args: [] },
      { s: this.drumkit.kick, args: [] },
      { s: this.drumkit.kick, args: [] }
    ]

    const currents = _.flatten(this.state.cells.map((row) => {
      return row.filter((_, x) => { return x === this.step })
    }))
    const activeTracks = currents.map((v, i) => {
      const track = tracks[i]
      track.active = v === 1 ? true : false
      return track
    }).filter((t) => {
      return t.active
    })
    _.uniqBy(activeTracks, 's').forEach((t) => {
      t.s.play(...t.args)
    })
  }
}

export default Sequencer








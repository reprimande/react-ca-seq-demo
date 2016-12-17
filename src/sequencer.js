import { bindActionCreators } from 'redux'
import _ from 'lodash'
import WebAudioScheduler from 'web-audio-scheduler'
import WorkerTimer from 'worker-timer'

import * as Actions from './actions'

import DrumKit from './synth/drumkit'
import Acid from './synth/acid'

class Sequencer {
  constructor(ctx, store, length) {
    this.length = length
    this.step = 0

    this.ctx = ctx
    this.drumkit = new DrumKit(ctx)
    this.bass = new Acid(ctx)
    this.sched = new WebAudioScheduler({ context: ctx, timerAPI: WorkerTimer });
    this.process = this.process.bind(this)

    this.actions = bindActionCreators(Actions, store.dispatch)
    store.subscribe(() => {
      this.state = store.getState()
      if (this.state.sequencer.running) {
        this.start()
      } else {
        this.stop()
      }
      this.bpm = this.state.sequencer.bpm
    });
  }

  start() {
    if (this.sched.state === 'suspended') {
      this.sched.start(this.process)
    }
  }

  stop() {
    if (this.sched.state === 'running') {
      this.sched.stop()
    }
  }

  process(e) {
    const t = e.playbackTime;

    this.step = (this.step + 1) % this.length
    this.actions.process()
    this.actions.step(this.step)
    // TODO management instruments
    const baseNote = 60
    const tracks = [
      { s: this.bass, args: [12 + baseNote] },
      { s: this.bass, args: [11 + baseNote] },
      { s: this.bass, args: [9 + baseNote] },
      { s: this.bass, args: [7 + baseNote] },
      { s: this.bass, args: [5 + baseNote] },
      { s: this.bass, args: [4 + baseNote] },
      { s: this.bass, args: [2 + baseNote] },
      { s: this.bass, args: [0 + baseNote] },
      { s: this.drumkit.oh, args: [] },
      { s: this.drumkit.oh, args: [] },
      { s: this.drumkit.ch, args: [] },
      { s: this.drumkit.ch, args: [] },
      { s: this.drumkit.snare, args: [] },
      { s: this.drumkit.snare, args: [] },
      { s: this.drumkit.kick, args: [] },
      { s: this.drumkit.kick, args: [] }
    ]

    const currents = _.flatten(this.state.cells.map((row) => {
      return row.filter((_, x) => { return x === this.step })
    }))
    currents.map((v, i) => {
      const track = tracks[i]
      track.active = v === 1 ? true : false
      return track
    }).filter((t) => {
      return t.active
    }).forEach((t) => {
      t.s.play(...t.args)
    })

    this.sched.insert(t + (1 / this.bpm * 16), this.process);
  }
}

export default Sequencer

import WebAudioScheduler from 'web-audio-scheduler'
import WorkerTimer from 'worker-timer'

class Timer {
  constructor(ctx, actions) {
    this.ctx = ctx
    this.actions = actions
    this.bpm = 0
    this.sched = new WebAudioScheduler({ context: ctx, timerAPI: WorkerTimer })
    this.tick = this.tick.bind(this)
  }

  setState(state) {
    this.bpm = state.sequencer.bpm
    if (state.sequencer.running) {
      this.start()
    } else {
      this.stop()
    }
  }

  start() {
    if (this.sched.state === 'suspended') {
      this.sched.start(this.tick)
    }
  }

  stop() {
    if (this.sched.state === 'running') {
      this.sched.stop()
    }
  }

  tick(e) {
    const t = e.playbackTime,
          bpm = this.bpm
    this.actions.step()
    this.sched.insert(t + (60 / bpm) / 4, this.tick);
  }
}

export default Timer

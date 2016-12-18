import { m2f } from './util'

class Acid {
  constructor(ctx) {
    this.ctx = ctx
    this.decay = 0.4
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.value = 1000
    this.filter.Q.value = 10

    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0
    this.filter.connect(this.gain)
  }

  connect(node) {
    this.gain.connect(node)
  }

  play(note = 24) {
    const t = this.ctx.currentTime,
          freq = m2f(note),
          osc = this.ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.connect(this.filter)
    osc.frequency.setValueAtTime(freq, t)
    osc.start(t)
    osc.stop(t + this.decay)

    this.filter.frequency.cancelScheduledValues(0)
    this.filter.frequency.setValueAtTime(0, t)
    this.filter.frequency.linearRampToValueAtTime(freq * 5, t)
    this.filter.frequency.exponentialRampToValueAtTime(freq * 1.5, t + this.decay)

    this.gain.gain.cancelScheduledValues(0)
    this.gain.gain.setValueAtTime(0, t)
    this.gain.gain.linearRampToValueAtTime(0.1, t)
    this.gain.gain.exponentialRampToValueAtTime(0.0001, t + this.decay)
  }
}

export default Acid

import { m2f } from './util'

class Acid {
  constructor(ctx) {
    this.ctx = ctx
    this.decay = 0.3
    this.filter = this.ctx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.frequency.value = 2000
    this.filter.Q.value = 10

    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0
    this.filter.connect(this.gain)
    this.gain.connect(this.ctx.destination)
  }

  play(note = 24) {
    const t = this.ctx.currentTime,
          osc = this.ctx.createOscillator()
    osc.type = 'sawtooth'
    osc.connect(this.filter)
    osc.frequency.setValueAtTime(m2f(note), t)
    osc.start(t)
    osc.stop(t + this.decay)

    this.filter.frequency.cancelScheduledValues(0)
    this.filter.frequency.setValueAtTime(0, t)
    this.filter.frequency.linearRampToValueAtTime(4000, t)
    this.filter.frequency.exponentialRampToValueAtTime(1000, t + this.decay / 2)

    this.gain.gain.cancelScheduledValues(0)
    this.gain.gain.setValueAtTime(0, t)
    this.gain.gain.linearRampToValueAtTime(0.1, t)
    this.gain.gain.exponentialRampToValueAtTime(0.0001, t + this.decay)

  }
}

export default Acid

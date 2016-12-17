export default class Kick {
  constructor(ctx) {
    const t = ctx.currentTime
    this.ctx = ctx
    this.decay = 0.2
    this.hi = 200
    this.lo = 40
    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0
    this.gain.connect(this.ctx.destination)
  }

  play() {
    const t = this.ctx.currentTime,
          osc = this.ctx.createOscillator()
    osc.type = 'sine'
    osc.start(t)
    osc.stop(t + this.decay)
    osc.connect(this.gain)

    osc.frequency.setValueAtTime(this.hi, t)
    osc.frequency.exponentialRampToValueAtTime(this.lo, t + this.decay * 0.4)

    this.gain.gain.cancelScheduledValues(0)
    this.gain.gain.setValueAtTime(0, t)
    this.gain.gain.linearRampToValueAtTime(0.5, t)
    this.gain.gain.exponentialRampToValueAtTime(0.0001, t + this.decay)
  }
}

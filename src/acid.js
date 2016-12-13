class Acid {
  constructor(ctx) {
    const t = ctx.currentTime

    this._ctx = ctx
    this._decay = 0.1
    this._filter = this._ctx.createBiquadFilter()
    this._filter.type = 'lowpass'
    this._filter.frequency.value = 2000
    this._filter.Q.value = 10

    this._gain = this._ctx.createGain()
    this._gain.gain.value = 0
    this._filter.connect(this._gain)
    this._gain.connect(this._ctx.destination)
  }

  m2f(note) {
    return 440.0 * Math.pow(2.0, (note - 69.0) / 12.0)
  }
  play(note = 24) {
    const t = this._ctx.currentTime

    this._osc = this._ctx.createOscillator()
    this._osc.type = 'sawtooth'

    this._osc.connect(this._filter)


    this._osc.frequency.setValueAtTime(this.m2f(note), t)

    this._filter.frequency.cancelScheduledValues(0)
    this._filter.frequency.setValueAtTime(0, t)
    this._filter.frequency.linearRampToValueAtTime(2000, t)
    this._filter.frequency.exponentialRampToValueAtTime(500, t + this._decay)

    this._gain.gain.cancelScheduledValues(0)
    this._gain.gain.setValueAtTime(0, t)
    this._gain.gain.linearRampToValueAtTime(1, t)
    this._gain.gain.exponentialRampToValueAtTime(1, t + this._decay)

    this._osc.start(t)
    this._osc.stop(t + this._decay)
  }
}

export default Acid

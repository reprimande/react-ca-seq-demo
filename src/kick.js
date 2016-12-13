export default class Kick {
  constructor(ctx) {
    const t = ctx.currentTime

    this._ctx = ctx
    this._decay = 0.1
    this._hi = 300
    this._lo = 20

    this._gain = this._ctx.createGain()

    this._gain.gain.value = 0 //setValueAtTime(0, t)

    this._gain.connect(this._ctx.destination)

  }

  play() {
    const t = this._ctx.currentTime
    this._osc = this._ctx.createOscillator()

    this._osc.connect(this._gain)
    this._osc.frequency.setValueAtTime(this._hi, t)
    this._osc.frequency.exponentialRampToValueAtTime(this._lo, t + this._decay)
    this._gain.gain.cancelScheduledValues(0)
    this._gain.gain.setValueAtTime(0, t)
    this._gain.gain.linearRampToValueAtTime(1, t)
    this._gain.gain.exponentialRampToValueAtTime(1, t + this._decay)
    this._osc.start(t)
    this._osc.stop(t + this._decay)
  }
}










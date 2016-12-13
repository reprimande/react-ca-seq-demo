export default class Snare {
  constructor(ctx) {
    const t = ctx.currentTime

    this._ctx = ctx

  }

  play() {
    this._noise = this._ctx.createBufferSource()
    this._noise.buffer = ((ctx) => {
      const size = ctx.sampleRate,
            buf = ctx.createBuffer(1, size, ctx.sampleRate),
            output = buf.getChannelData(0)
      for (let i = 0; i < size; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      return buf;
    })(this._ctx)
    this._filter = this._ctx.createBiquadFilter();
    this._filter.type = 'highpass';
    this._filter.frequency.value = 1000;
    this._noise.connect(this._filter);
    this._gain = this._ctx.createGain()
    this._gain.gain.value = 0
    this._filter.connect(this._gain)

    this._osc = this._ctx.createOscillator()
    this._osc.type = 'triangle'
    this._oscGain = this._ctx.createGain()
    this._oscGain.gain.value = 0
    this._osc.connect(this._oscGain)

    this._decay = 0.05

    this._gain.connect(this._ctx.destination)
    this._oscGain.connect(this._ctx.destination)


    const t = this._ctx.currentTime
    //this._osc.frequency.setValueAtTime(this._hi, t)
    //this._osc.frequency.exponentialRampToValueAtTime(this._lo, t + this._decay)

    this._osc.frequency.setValueAtTime(100, t);
    this._noise.start(t)
    this._osc.start(t)

    this._gain.gain.cancelScheduledValues(0)
    this._gain.gain.setValueAtTime(0, t)
    this._gain.gain.linearRampToValueAtTime(1, t)
    this._gain.gain.exponentialRampToValueAtTime(1, t + this._decay)

    this._oscGain.gain.cancelScheduledValues(0)
    this._oscGain.gain.setValueAtTime(0, t)
    this._oscGain.gain.linearRampToValueAtTime(1, t)
    this._oscGain.gain.exponentialRampToValueAtTime(1, t + this._decay)

    this._noise.stop(t + this._decay)
    this._osc.stop(t + this._decay)
  }
}



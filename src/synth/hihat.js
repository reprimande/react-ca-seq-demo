export default class Hihat {
  constructor(ctx, decay = 0.15) {
    const t = ctx.currentTime
    this._ctx = ctx
    this.decay = decay
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
    this._filter.type = 'bandpass';
    this._filter.frequency.value = 10000;
    this._filter.Q.value = 10;
    this._noise.connect(this._filter);
    this._gain = this._ctx.createGain()
    this._gain.gain.value = 0
    this._filter.connect(this._gain)

    this._gain.connect(this._ctx.destination)

    const t = this._ctx.currentTime

    this._noise.start(t)

    this._gain.gain.cancelScheduledValues(0)
    this._gain.gain.setValueAtTime(0, t)
    this._gain.gain.linearRampToValueAtTime(1, t)
    this._gain.gain.exponentialRampToValueAtTime(0.001, t + this.decay)

    this._noise.stop(t + this.decay)
  }
}



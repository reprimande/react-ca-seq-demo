import { createNoiseBuffer} from './util'

export default class Hihat {
  constructor(ctx, decay = 0.15) {
    this.ctx = ctx
    this.decay = decay

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'bandpass';
    this.filter.frequency.value = 10000;
    this.filter.Q.value = 2;
    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0
    this.filter.connect(this.gain)
    this.noiseBuffer = createNoiseBuffer(ctx)
  }

  connect(node) {
    this.gain.connect(node)
  }

  play() {
    const t = this.ctx.currentTime,
          noise = this.ctx.createBufferSource()
    noise.buffer = this.noiseBuffer
    noise.connect(this.filter);
    noise.start(t)
    noise.stop(t + this.decay)

    this.gain.gain.cancelScheduledValues(0)
    this.gain.gain.setValueAtTime(0, t)
    this.gain.gain.linearRampToValueAtTime(0.5, t)
    this.gain.gain.exponentialRampToValueAtTime(0.001, t + this.decay)
  }
}



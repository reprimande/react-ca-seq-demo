import { createNoiseBuffer} from './util'

export default class Snare {
  constructor(ctx) {
    this.ctx = ctx
    this.decay = 0.4

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'bandpass'
    this.filter.frequency.value = 1200
    this.filter.Q.value= 2

    this.gain = this.ctx.createGain()
    this.gain.gain.value = 0

    this.filter.connect(this.gain)
    this.gain.connect(this.ctx.destination)

    this.noiseBuffer = createNoiseBuffer(ctx)
  }

  play() {
    const t = this.ctx.currentTime,
          noise = this.ctx.createBufferSource()
    noise.buffer = this.noiseBuffer

    noise.connect(this.filter)
    noise.start(t)
    noise.stop(t + this.decay)

    this.gain.gain.cancelScheduledValues(0)
    this.gain.gain.setValueAtTime(0, t)
    this.gain.gain.linearRampToValueAtTime(0.5, t)
    this.gain.gain.exponentialRampToValueAtTime(0.0001, t + this.decay)
  }
}



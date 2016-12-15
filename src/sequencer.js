import EventEmitter from 'events'

class Sequencer extends EventEmitter {
  constructor(length) {
    super()
    this._length = length
    this._step = 0
    this._isActive = false
  }

  start() {
    if (!this._isActive) {
      this._step = 0
      this._t = setInterval(() => { this.process() }, 100)
      this._isActive = true
    }
  }

  stop() {
    if (this._isActive) {
      clearInterval(this._t)
      this._step = 0
      this._isActive = false
    }
  }

  process() {
    this._step++
    this.emit('step', this._step % this._length)
  }
}

export default Sequencer

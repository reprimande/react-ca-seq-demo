import Kick from './kick'
import Snare from './snare'
import Hihat from './hihat'

class DrumKit {
  constructor(ctx) {
    this._kick = new Kick(ctx)
    this._snare = new Snare(ctx)
    this._hihat = new Hihat(ctx)
  }

  get kick() {
    return this._kick
  }

  get snare() {
    return this._snare
  }

  get hihat() {
    return this._hihat
  }
}

export default DrumKit

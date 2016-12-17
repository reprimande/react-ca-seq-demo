import Kick from './kick'
import Snare from './snare'
import Hihat from './hihat'

class DrumKit {
  constructor(ctx) {
    this._kick = new Kick(ctx)
    this._snare = new Snare(ctx)
    this._ch = new Hihat(ctx)
    this._oh = new Hihat(ctx, 0.3)
  }

  get kick() {
    return this._kick
  }

  get snare() {
    return this._snare
  }

  get ch() {
    return this._ch
  }

  get oh() {
    return this._oh
  }
}

export default DrumKit

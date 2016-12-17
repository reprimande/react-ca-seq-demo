import Kick from './kick'
import Snare from './snare'
import Hihat from './hihat'

class DrumKit {
  constructor(ctx) {
    this.kick = new Kick(ctx)
    this.snare = new Snare(ctx)
    this.ch = new Hihat(ctx)
    this.oh = new Hihat(ctx, 0.4)
  }
}

export default DrumKit

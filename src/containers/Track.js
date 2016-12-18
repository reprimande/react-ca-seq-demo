import { Acid, Kick, Snare, Hihat }  from '../synth'

class Track {
  constructor(ctx, actions) {
    this.bass = new Acid(ctx)
    this.kick = new Kick(ctx)
    this.snare = new Snare(ctx)
    this.oh = new Hihat(ctx, 0.5)
    this.ch = new Hihat(ctx, 0.1)

    this.bass.connect(ctx.destination)
    this.kick.connect(ctx.destination)
    this.snare.connect(ctx.destination)
    this.oh.connect(ctx.destination)
    this.ch.connect(ctx.destination)

    this.baseNote = 60
    this.tracks = [
      { instrument: this.bass, args: [12 + this.baseNote] },
      { instrument: this.bass, args: [11 + this.baseNote] },
      { instrument: this.bass, args: [9 + this.baseNote] },
      { instrument: this.bass, args: [7 + this.baseNote] },
      { instrument: this.bass, args: [5 + this.baseNote] },
      { instrument: this.bass, args: [4 + this.baseNote] },
      { instrument: this.bass, args: [2 + this.baseNote] },
      { instrument: this.bass, args: [0 + this.baseNote] },
      { instrument: this.oh, args: [] },
      { instrument: this.oh, args: [] },
      { instrument: this.ch, args: [] },
      { instrument: this.ch, args: [] },
      { instrument: this.snare, args: [] },
      { instrument: this.snare, args: [] },
      { instrument: this.kick, args: [] },
      { instrument: this.kick, args: [] }
    ]
    this.actions = actions
  }

  playAll(triggers) {
    triggers.map((v, i) => {
      const track = this.tracks[i]
      track.active = v === 1 ? true : false
      return track
    }).filter((track) => {
      return track.active
    }).forEach((track) => {
      track.instrument.play(...track.args)
    })
  }
}

export default Track

import _ from 'lodash'

import CA from '../ca'
import Sequencer from '../sequencer'

import Kick from '../synth/kick'
import Snare from '../synth/snare'
import Hihat from '../synth/hihat'
import Acid from '../synth/acid'

const ctx = new AudioContext(),
      k = new Kick(ctx),
      s = new Snare(ctx),
      h = new Hihat(ctx),
      b = new Acid(ctx),
      mapping = [
        b,b,b,b,b,b,b,b,h,h,h,s,s,k,k,k
      ]


const num = 16,
      vals = _.times(num, () => {
        return _.times(num, () => {
          return Math.floor(Math.random()*2)
        })
      }),
      ca = new CA(num, num, vals, 2),
      sequencer = new Sequencer(num)

sequencer.on('step', (step) => {
  ca.process()
  _.uniqBy(
    _.flatten(ca.cells)
     .filter((cell) => { return cell.x === step })
     .filter((cell) => { return cell.value !== 0 })
     .map((cell) => { return { 'synth': mapping[cell.y], 'y': cell.y }})
    ,'synth').forEach((s) => {
      if (s.synth === b) {
        s.synth.play([11,9,7,6,4,2,0][s.y] + 24)
      } else {
        s.synth.play()
      }
    })
})


class Actions {
  static start() {
    sequencer.start()
  }

  static stop() {
    sequencer.stop()
  }

  static clear() {
    ca.clear()
  }

  static random() {
    _.flatten(ca.cells).forEach((cell) => {
      cell.value = Math.floor(Math.random()*2)
    })
  }
}

export default Actions

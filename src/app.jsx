import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import EventEmitter from 'events'

import { CA } from './ca'
import Kick from './synth/kick'
import Snare from './synth/snare'
import Hihat from './synth/hihat'
import Acid from './synth/acid'

import Board from './components/board.jsx'

const ctx = new AudioContext(),
      k = new Kick(ctx),
      s = new Snare(ctx),
      h = new Hihat(ctx),
      b = new Acid(ctx),
      mapping = [
        b,b,b,b,b,b,b,b,h,h,h,s,s,k,k,k
      ]


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
        s.synth.play([11,9,7,6,4,2,0][s.y] + 36)
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



class Controller extends React.Component {
  _onClickStart() {
    Actions.start()
  }

  _onClickStop() {
    Actions.stop()
  }

  _onClickClear() {
    Actions.clear()
  }

  _onClickRandom() {
    Actions.random()
  }
  render() {
    return (
      <div>
        <button onClick={this._onClickStart}>start</button>
        <button onClick={this._onClickStop}>stop</button>
        <button onClick={this._onClickClear}>clear</button>
        <button onClick={this._onClickRandom}>random</button>
      </div>
    )
  }
}


render(
  <div>
    <Controller />
    <Board cells={ca.cells} sequencer={sequencer} />
  </div>
  , document.getElementById('c'))

sequencer.start()

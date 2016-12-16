import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'

import Board from './components/board.jsx'
import Controller from './components/controller.jsx'

import CA from './ca'
import Sequencer from './sequencer'

import Kick from './synth/kick'
import Snare from './synth/snare'
import Hihat from './synth/hihat'
import Acid from './synth/acid'

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

class App extends React.Component {
  constructor(prop) {
    super(prop)
    const vals = _.times(16, () => {
      return _.times(16, () => {
        return Math.floor(Math.random()*2)
      })
    })
    this.ca = new CA(16, 16, vals, 2)
    this.sequencer = new Sequencer(16)
    this.state = {
      cells: this.ca.cells
    }
  }

  componentDidMount() {
    /* const ctx = new AudioContext(),
       k = new Kick(ctx),
       s = new Snare(ctx),
       h = new Hihat(ctx),
       b = new Acid(ctx),
       mapping = [
       b,b,b,b,b,b,b,b,h,h,h,s,s,k,k,k
       ] */
    this.ca.on('change', (cells) => {
      this.setState({ cells: cells })
    })
    this.sequencer.on('step', (step) => {
      this.ca.process()
    /* _.uniqBy(
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
       }) */
    })
    this.sequencer.start()
  }

  render() {
    return (<div>
      <Controller />
      <Board cells={this.state.cells} />
    </div>)
  }
}

render(<App />, document.getElementById('c'))

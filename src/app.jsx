import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import _ from 'lodash'
import EventEmitter from 'events'

import { CA } from './ca'
import Kick from './kick'
import Snare from './snare'
import Hihat from './hihat'
import Acid from './acid'


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

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "white",
      value: 0,
      focus: false
    }
  }
  componentDidMount() {
    this.setState({
      value: this.props.cell.value,
    })
    this.props.cell.on('change', (val) => {
      this.updateCell(val)
    })
    this.props.sequencer.on('step', (step) => {
      this.setState({focus: (this.props.cell.x === step)})
    })
    this._onClick = this._onClick.bind(this);
  }

  updateCell(value) {
    this.setState({
      value: value
    })
  }

  getColorFromState(value) {
    const colors = ['white', 'blue']
    return colors[value]
  }

  _onClick(e) {
    this.props.cell.update()
  }

  render() {
    const colors = ['white', 'blue']
    const cellStyle = {
      backgroundColor: colors[this.state.value],
      borderStyle: "none",
      //borderWidth: "1px",
      padding: "0px",
      margin: "0px"
    }
    const focusStyle = {
      backgroundColor: 'red',
      opacity: '0.3',
      borderStyle: "none",
      padding: "0px",
      margin: "0px",
      zIndex: '999',
      display: 'inline-block',
      width: '100%',
      height: '100%'
    }
    let focus = ""
    if (this.state.focus) {
      focus = (<div style={focusStyle}></div>)
    }
    return (<td style={cellStyle} onClick={this._onClick}>{focus}</td>)
  }
}

class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = { row: this.props.row }
  }

  render() {
    const cells = this.state.row.map((cell) => { return <Cell cell={cell} sequencer={this.props.sequencer} />})
    return (<tr>{cells}</tr>)
  }
}

class Board extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = { cells: [] }
  }

  componentDidMount() {
    this.setState({
      cells: this.props.cells
    })
  }

  render() {
    const style = {
      backgroundColor: "orange",
      borderStyle: "none",
      //borderWidth: "1px",
      width: "512px",
      height: "512px",
      padding: "0px",
      margin: "0px"
    }
    console.log(this.props)
    const rows = this.state.cells.map((row) => {
      return (<Row row={row} sequencer={this.props.sequencer} />)
    })
    return (
      <table style={ style }>
        {rows}
      </table>
    )
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

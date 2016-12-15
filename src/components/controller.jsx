import React from 'react'
import Actions from '../actions/action'

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

export default Controller

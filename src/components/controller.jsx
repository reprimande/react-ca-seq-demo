import React from 'react'

class Controller extends React.Component {
  _onClickStart() {

  }

  _onClickStop() {

  }

  _onClickClear() {

  }

  _onClickRandom() {

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

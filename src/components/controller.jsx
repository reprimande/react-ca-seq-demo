import React, { Component, PropTypes } from 'react'

class Controller extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    bpm: PropTypes.number
  }

  handleClickStart() {
    this.props.actions.start()
  }

  handleClickStop() {
    this.props.actions.stop()
  }

  handleClickClear() {
    this.props.actions.clearAll()
  }

  handleClickRandom() {
    this.props.actions.randomAll()
  }

  handleChangeBpm(e) {
    this.props.actions.bpm(parseInt(e.target.value, 10))
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={() => this.handleClickStart()}>start</button>
          <button onClick={() => this.handleClickStop()}>stop</button>
          <button onClick={() => this.handleClickClear()}>clear</button>
          <button onClick={() => this.handleClickRandom()}>random</button>
        </div>
        <div>
          <span>
            bpm
          </span>
          <input
              type='range'
              min='60'
              max='240'
              step='1'
              onChange={(e) => this.handleChangeBpm(e)} />
          <span>
            {this.props.bpm}
          </span>
        </div>
      </div>
    )
  }
}

export default Controller

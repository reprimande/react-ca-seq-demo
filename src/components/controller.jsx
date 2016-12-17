import React, { Component, PropTypes } from 'react'

class Controller extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
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

  render() {
    return (
      <div>
        <button onClick={() => this.handleClickStart()}>start</button>
        <button onClick={() => this.handleClickStop()}>stop</button>
        <button onClick={() => this.handleClickClear()}>clear</button>
        <button onClick={() => this.handleClickRandom()}>random</button>
      </div>
    )
  }
}

export default Controller

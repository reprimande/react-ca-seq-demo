import React, { Component, PropTypes } from 'react'

class Cell extends Component {
  static propTypes = {
    cell: PropTypes.number.isRequired,
    x:  PropTypes.number.isRequired,
    y:  PropTypes.number.isRequired,
    stepX: PropTypes.number,
    onCellClick: PropTypes.func
  }

  handleClick(e) {
    this.props.onCellClick && this.props.onCellClick(this.props.x, this.props.y)
  }

  render() {
    const colors = ['white', 'blue']
    const cellStyle = {
      backgroundColor: colors[this.props.cell],
      borderStyle: "none",
      //borderWidth: "1px",
      padding: "0px",
      margin: "0px",
      position: 'relative'
    }
    const focusStyle = {
      position: 'absolute',
      backgroundColor: 'red',
      opacity: '0.3',
      borderStyle: "none",
      padding: "0px",
      margin: "0px",
      zIndex: '999',
      top: '0px',
      left: '0px',
      display: 'inline-block',
      width: '100%',
      height: '100%'
    }
    let focus = ""
    if (this.props.stepX === this.props.x) {
      focus = (<div style={focusStyle}></div>)
    }
    return (<td style={cellStyle} onClick={() => this.handleClick()}>{focus}</td>)
  }
}

export default Cell

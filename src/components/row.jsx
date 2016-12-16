import React, { Component, PropTypes } from 'react'
import Cell from './cell.jsx'

class Row extends Component {
  static propTypes = {
    row: PropTypes.array.isRequired,
    y:  PropTypes.number.isRequired,
    onCellClick: PropTypes.func
  }

  handleCellClick(x, y) {
    this.props.onCellClick && this.props.onCellClick(x, y)
  }

  render() {
    const cells = this.props.row.map((cell, i) => {
      return <Cell cell={cell} x={i} y={this.props.y} onCellClick={(x, y) => this.handleCellClick(x, y)}/>
    })
    return (<tr>{cells}</tr>)
  }
}

export default Row

import React, { Component, PropTypes } from 'react'
import Cell from './cell.jsx'

class Row extends Component {
  static propTypes = {
    row: PropTypes.array.isRequired,
    y:  PropTypes.number.isRequired,
    trigger:  PropTypes.number.isRequired,
    stepX:  PropTypes.number,
    onCellClick: PropTypes.func,
    label: PropTypes.string
  }

  handleCellClick(x, y) {
    this.props.onCellClick && this.props.onCellClick(x, y)
  }

  render() {
    const labelStyle = {
      backgroundColor: ['white', 'yellow'][this.props.trigger],
      borderStyle: "none",
      padding: "3px",
      margin: "0px",
      width: '80px',
      fontSize: '10px',
      textAlign: 'right',
    }

    const cells = this.props.row.map((cell, i) => {
      return (
        <Cell
            key={i}
            cell={cell}
            x={i}
            y={this.props.y}
            stepX={this.props.stepX}
            onCellClick={(x, y) => this.handleCellClick(x, y)}/>
      )})

    if (this.props.label) {
      cells.push((<th key={'label_' + this.props.y} style={labelStyle}>{this.props.label}</th>))
    }
    return (<tr>{cells}</tr>)
  }
}

export default Row





























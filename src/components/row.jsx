import React, { Component, PropTypes } from 'react'
import Cell from './cell.jsx'

class Row extends Component {
  static propTypes = {
    row: PropTypes.array.isRequired,
    y:  PropTypes.number.isRequired,
    stepX:  PropTypes.number,
    onCellClick: PropTypes.func,
    label: PropTypes.string
  }

  handleCellClick(x, y) {
    this.props.onCellClick && this.props.onCellClick(x, y)
  }

  render() {
    const labelStyle = {
      backgroundColor: 'white',
      borderStyle: "none",
      padding: "3px",
      margin: "0px",
      width: '80px',
      fontSize: '10px',
      textAlign: 'right'
    }

    const cells = this.props.row.map((cell, i) => {
      return <Cell cell={cell} x={i} y={this.props.y} stepX={this.props.stepX} onCellClick={(x, y) => this.handleCellClick(x, y)}/>
    }),
          label = this.props.label ? (<th style={labelStyle}>{this.props.label}</th>) : ''
    cells.push(label)
    return (<tr>{cells}</tr>)
  }
}

export default Row

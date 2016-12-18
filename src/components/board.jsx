import React, { Component, PropTypes } from 'react'
import Row from './row.jsx'

class Board extends Component {
  static propTypes = {
    cells: PropTypes.array.isRequired,
    sequencer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    rowLabels: PropTypes.array
  }

  handleCellClick(x, y) {
    this.props.actions.updateCell(x, y)
  }

  render() {
    const style = {
      backgroundColor: "#afeeee",
      borderStyle: "none",
      borderWidth: "1px",
      //width: "256px",
      //height: "256px",
      padding: "0px",
      margin: "0px"
    }
    const rows = this.props.cells.map((row, i) => {
      return (
        <Row
            key={i}
            row={row}
            y={i}
            stepX={this.props.sequencer.step}
            label={this.props.rowLabels[i]}
            trigger={this.props.sequencer.triggers[i]}
            onCellClick={(x, y) => this.handleCellClick(x, y)}/>)
    })
    return (
      <table style={ style }>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }
}

export default Board

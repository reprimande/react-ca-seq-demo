import React, { Component, PropTypes } from 'react'
import Row from './row.jsx'

class Board extends Component {
  static propTypes = {
    cells: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  handleCellClick(x, y) {
    this.props.actions.updateCell(x, y)
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
    const rows = this.props.cells.map((row, i) => {
      return (<Row row={row} y={i} onCellClick={(x, y) => this.handleCellClick(x, y)}/>)
    })
    return (
      <table style={ style }>
        {rows}
      </table>
    )
  }
}

export default Board

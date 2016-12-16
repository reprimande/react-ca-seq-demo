import React from 'react'
import Row from './row.jsx'

class Board extends React.Component {
  constructor(prop) {
    super(prop)
  }

  componentDidMount() {
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
    const rows = this.props.cells.map((row) => {
      return (<Row row={row} sequencer={this.props.sequencer} />)
    })
    return (
      <table style={ style }>
        {rows}
      </table>
    )
  }
}

export default Board

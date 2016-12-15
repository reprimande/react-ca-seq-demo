import React from 'react'
import Cell from './cell.jsx'

class Row extends React.Component {
  constructor(props) {
    super(props)
    this.state = { row: this.props.row }
  }

  render() {
    const cells = this.state.row.map((cell) => { return <Cell cell={cell} sequencer={this.props.sequencer} />})
    return (<tr>{cells}</tr>)
  }
}

export default Row

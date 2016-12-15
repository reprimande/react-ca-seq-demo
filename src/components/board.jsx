import React from 'react'
import Row from './row.jsx'

class Board extends React.Component {
  constructor(prop) {
    super(prop)
    this.state = { cells: [] }
  }

  componentDidMount() {
    this.setState({
      cells: this.props.cells
    })
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
    console.log(this.props)
    const rows = this.state.cells.map((row) => {
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

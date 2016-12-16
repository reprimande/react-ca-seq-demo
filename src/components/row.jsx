import React from 'react'
import Cell from './cell.jsx'

class Row extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const cells = this.props.row.map((cell) => { return <Cell cell={cell} />})
    return (<tr>{cells}</tr>)
  }
}

export default Row

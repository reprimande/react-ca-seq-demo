import React from 'react'

class Cell extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this._onClick = this._onClick.bind(this);
  }

  _onClick(e) {
    this.props.cell.update()
  }

  render() {
    const colors = ['white', 'blue']
    const cellStyle = {
      backgroundColor: colors[this.props.cell.value],
      borderStyle: "none",
      //borderWidth: "1px",
      padding: "0px",
      margin: "0px"
    }
    const focusStyle = {
      backgroundColor: 'red',
      opacity: '0.3',
      borderStyle: "none",
      padding: "0px",
      margin: "0px",
      zIndex: '999',
      display: 'inline-block',
      width: '100%',
      height: '100%'
    }
    let focus = ""
    if (this.props.focus) {
      focus = (<div style={focusStyle}></div>)
    }
    return (<td style={cellStyle} onClick={this._onClick}>{focus}</td>)
  }
}

export default Cell

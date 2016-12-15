import React from 'react'

class Cell extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      color: "white",
      value: 0,
      focus: false
    }
  }
  componentDidMount() {
    this.setState({
      value: this.props.cell.value,
    })
    this.props.cell.on('change', (val) => {
      this.updateCell(val)
    })
    this.props.sequencer.on('step', (step) => {
      this.setState({focus: (this.props.cell.x === step)})
    })
    this._onClick = this._onClick.bind(this);
  }

  updateCell(value) {
    this.setState({
      value: value
    })
  }

  getColorFromState(value) {
    const colors = ['white', 'blue']
    return colors[value]
  }

  _onClick(e) {
    this.props.cell.update()
  }

  render() {
    const colors = ['white', 'blue']
    const cellStyle = {
      backgroundColor: colors[this.state.value],
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
    if (this.state.focus) {
      focus = (<div style={focusStyle}></div>)
    }
    return (<td style={cellStyle} onClick={this._onClick}>{focus}</td>)
  }
}

export default Cell

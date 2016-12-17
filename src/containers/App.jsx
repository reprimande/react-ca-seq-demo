import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Board from '../components/board.jsx'
import Controller from '../components/controller.jsx'
import * as Actions from '../actions'

const rowLabels = [
  'Synth C',
  'Synth B',
  'Synth A',
  'Synth G',
  'Synth F',
  'Synth E',
  'Synth D',
  'Synth C',
  'Open Hihat',
  'Open Hihat',
  'Close Hihat',
  'Close Hihat',
  'Snare',
  'Snare',
  'Kick',
  'Kick'
]

const App = ({cells, sequencer, actions}) => (
  <div>
    <h1>React/Redux Cellular Automaton Sequencer</h1>
    <Controller actions={actions} bpm={sequencer.bpm} />
    <Board cells={cells} sequencer={sequencer} actions={actions} rowLabels={rowLabels}/>
  </div>
)

App.propTypes = {
  cells: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({ cells: state.cells, sequencer: state.sequencer })
const mapDispatchToProps = dispatch => ({ actions: bindActionCreators(Actions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

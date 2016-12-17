import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Board from '../components/board.jsx'
import Controller from '../components/controller.jsx'
import * as Actions from '../actions'

const App = ({cells, sequencer, actions}) => (
  <div>
    <Controller actions={actions} />
    <Board cells={cells} sequencer={sequencer} actions={actions} />
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

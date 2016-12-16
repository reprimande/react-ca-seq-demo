import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Board from '../components/board.jsx'
import Controller from '../components/controller.jsx'
import * as ConwayActions from '../actions'

const App = ({cells, actions}) => (
  <div>
    <Controller />
    <Board cells={cells} actions={actions} />
  </div>
)

App.propTypes = {
  cells: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  cells: state.cells
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ConwayActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

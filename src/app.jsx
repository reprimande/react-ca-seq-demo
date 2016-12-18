import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { createStore, bindActionCreators } from 'redux'
import { Provider } from 'react-redux'

import App from './containers/App.jsx'
import Timer from './containers/Timer'
import Sequencer from './containers/Sequencer'

import cells from './reducers'
import * as Actions from './actions'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const store = createStore(cells),
      actions = bindActionCreators(Actions, store.dispatch),
      ctx = new AudioContext(),
      timer = new Timer(ctx, actions),
      sequencer = new Sequencer(ctx, actions)

store.subscribe(() => {
  const state = store.getState()
  timer.setState(state)
  sequencer.setState(state)
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('c')
)

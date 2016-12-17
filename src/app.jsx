import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './containers/App.jsx'
import cells from './reducers'
import * as Actions from './actions'

import Sequencer from './sequencer'

window.AudioContext = window.AudioContext || window.webkitAudioContext;

const store = createStore(cells),
      sequencer = new Sequencer(new AudioContext(), store, 16)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('c')
)

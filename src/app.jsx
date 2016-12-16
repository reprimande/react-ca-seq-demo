import _ from 'lodash'
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './containers/App.jsx'
import cells from './reducers'
import Sequencer from './sequencer'

/* import Kick from './synth/kick'
   import Snare from './synth/snare'
   import Hihat from './synth/hihat'
   import Acid from './synth/acid' */

const store = createStore(cells)

const s = new Sequencer(16)
s.on('step', (step) => {
  store.dispatch({
    type: 'PROCESS'
  })
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('c')
)

s.start()

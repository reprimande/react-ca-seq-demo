import React from 'react'
import { render } from 'react-dom'

import Board from './components/board.jsx'
import Controller from './components/controller.jsx'

render(
  <div>
    <Controller />
    <Board cells={ca.cells} sequencer={sequencer} />
  </div>
  , document.getElementById('c'))

sequencer.start()

import { combineReducers } from 'redux'

import cells from './cells'
import sequencer from './sequencer'

export default combineReducers({ cells, sequencer })

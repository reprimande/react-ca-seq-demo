import _ from 'lodash'

class Actions {
  static start() {
    sequencer.start()
  }

  static stop() {
    sequencer.stop()
  }

  static clear() {
    ca.clear()
  }

  static random() {
    _.flatten(ca.cells).forEach((cell) => {
      cell.value = Math.floor(Math.random()*2)
    })
  }
}

export default Actions

import { App } from "vue"
import PinInputVue from "./components/PinInput.vue"

export type { Cell, CellInputType, CellsInputTypes } from './types/types'

const PinInput = {
  install: (app: App, options = {}): void => {
    app.component("pin-input", PinInputVue)
  }
}

export default PinInput

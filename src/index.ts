import { App } from "vue"
import PinInputVue from "./components/PinInput.vue"

const PinInput = {
  install: (app: App, options = {}): void => {
    app.component("pin-input", PinInputVue)
  }
}

export default PinInput

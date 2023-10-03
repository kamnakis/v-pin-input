import { App, Plugin } from "vue";
import PinInputVue from "./components/PinInput.vue";

export type { Cell, CellInputType, CellsInputTypes } from "./types/types";

export const PinInput = PinInputVue;

const PinInputPlugin: Plugin = {
  install: (app: App, options = {}): void => {
    app.component("pin-input", PinInputVue);
  },
};

export default PinInputPlugin;

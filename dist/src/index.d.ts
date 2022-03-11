import { App } from "vue";
export type { Cell, CellInputType, CellsInputTypes } from './types/types';
declare const PinInput: {
    install: (app: App, options?: {}) => void;
};
export default PinInput;

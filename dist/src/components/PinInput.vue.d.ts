import { CellInputType } from '../types/types';
declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: StringConstructor;
        required: true;
    };
    length: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    autofocus: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    secure: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    characterPreview: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    charPreviewDuration: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    inputClass: {
        type: StringConstructor;
        required: false;
    };
}, {
    BASE_REF_NAME: string;
    CELL_REGEXP: string;
    DEFAULT_INPUT_TYPE: string;
    SECURE_INPUT_TYPE: string;
    props: {
        modelValue: string;
        length: number;
        autofocus: boolean;
        secure: boolean;
        characterPreview: boolean;
        charPreviewDuration: number;
        inputClass?: string | undefined;
    };
    emit: (event: "update:modelValue" | "completed", ...args: any[]) => void;
    baseRefName: import("vue").Ref<string>;
    focusedCellIdx: import("vue").Ref<number>;
    cells: import("vue").Ref<{
        key: number;
        value: string;
    }[]>;
    watchers: import("vue").Ref<{
        [x: string]: Function;
    }>;
    cellsInputTypes: import("vue").Ref<{
        [x: number]: CellInputType;
    }>;
    refs: import("vue").Ref<{
        [x: string]: HTMLInputElement;
    }>;
    setRef: (key: string, el: any) => void;
    pinCodeComputed: import("vue").ComputedRef<string>;
    init: () => void;
    setCellObject: (key: number) => void;
    setCellInputType: (index: number, inputType?: CellInputType) => void;
    setCellWatcher: (index: number) => void;
    onParentValueUpdated: () => void;
    onCellChanged: (index: number, newVal: string, oldVal: string) => void;
    onCellErase: (index: number, e: Event) => void;
    onKeyDown: (e: KeyboardEvent) => void;
    onPaste: (pasteIdx: number, e: ClipboardEvent) => void;
    onInput: (pasteIdx: number, ev: Event) => void;
    reset: () => void;
    unwatchCells: () => void;
    isTheCellValid: (cell: string, allowEmpty?: boolean) => boolean;
    getRelevantInputType: () => CellInputType;
    focusPreviousCell: () => void;
    focusNextCell: () => void;
    focusCellByIndex: (index?: number) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:modelValue" | "completed")[], "update:modelValue" | "completed", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        required: true;
    };
    length: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    autofocus: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    secure: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    characterPreview: {
        type: BooleanConstructor;
        required: false;
        default: boolean;
    };
    charPreviewDuration: {
        type: NumberConstructor;
        required: false;
        default: number;
    };
    inputClass: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onCompleted?: ((...args: any[]) => any) | undefined;
}, {
    length: number;
    autofocus: boolean;
    secure: boolean;
    characterPreview: boolean;
    charPreviewDuration: number;
}>;
export default _sfc_main;

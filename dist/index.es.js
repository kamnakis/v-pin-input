import { defineComponent, ref, computed, watch, onMounted, nextTick, openBlock, createElementBlock, Fragment, renderList, withDirectives, mergeProps, withKeys, vModelDynamic } from "vue";
const _hoisted_1 = ["onUpdate:modelValue", "type", "onFocus", "onKeydown", "onPaste", "onInput"];
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    modelValue: null,
    length: { default: 4 },
    autofocus: { type: Boolean, default: true },
    secure: { type: Boolean, default: false },
    characterPreview: { type: Boolean, default: true },
    charPreviewDuration: { default: 300 },
    inputClass: null,
    blurOnComplete: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "completed"],
  setup(__props, { emit }) {
    const props = __props;
    const BASE_REF_NAME = "vue-pincode-input";
    const CELL_REGEXP = "^\\d{1}$";
    const DEFAULT_INPUT_TYPE = "tel";
    const SECURE_INPUT_TYPE = "password";
    const baseRefName = ref(BASE_REF_NAME);
    const focusedCellIdx = ref(0);
    const cells = ref([]);
    const watchers = ref({});
    const cellsInputTypes = ref({});
    const refs = ref({});
    const setRef = (key, el) => {
      refs.value[key] = el;
    };
    const pinCodeComputed = computed(() => cells.value.reduce((pin, cell) => pin + cell.value, ""));
    watch(() => props.modelValue, () => {
      if (props.modelValue) {
        onParentValueUpdated();
      } else {
        reset();
      }
    });
    watch(() => props.length, () => {
      reset();
    });
    watch(pinCodeComputed, (val, oldVal) => {
      var _a;
      emit("update:modelValue", val);
      if (oldVal.length !== props.length && val.length === props.length) {
        emit("completed", val);
        props.blurOnComplete && ((_a = refs.value[`${baseRefName.value}${focusedCellIdx.value}`]) == null ? void 0 : _a.blur());
      }
    });
    onMounted(() => {
      init();
      onParentValueUpdated();
      if (props.autofocus) {
        nextTick(() => focusCellByIndex());
      }
    });
    const init = () => {
      const inputType = getRelevantInputType();
      for (let key = 0; key < props.length; key += 1) {
        setCellObject(key);
        setCellInputType(key, inputType);
        setCellWatcher(key);
      }
    };
    const setCellObject = (key) => {
      cells.value[key] = { key, value: "" };
    };
    const setCellInputType = (index, inputType = SECURE_INPUT_TYPE) => {
      cellsInputTypes.value[index] = inputType;
    };
    const setCellWatcher = (index) => {
      const watchingProperty = `cells.${index}.value`;
      watchers.value[watchingProperty] = watch(() => cells.value[index].value, (newVal, oldVal) => {
        onCellChanged(index, newVal, oldVal);
      });
    };
    const onParentValueUpdated = () => {
      if (props.modelValue.length !== props.length) {
        emit("update:modelValue", pinCodeComputed.value);
        return;
      }
      props.modelValue.split("").forEach((cell, idx) => {
        cells.value[idx].value = cell || "";
      });
    };
    const onCellChanged = (index, newVal, oldVal) => {
      if (!isTheCellValid(newVal, false)) {
        cells.value[index].value = "";
        return;
      }
      focusNextCell();
      if (props.secure && props.characterPreview) {
        setTimeout(setCellInputType, props.charPreviewDuration, index);
      }
    };
    const onCellErase = (index, e) => {
      const isThisCellFilled = cells.value[index].value.length;
      if (!isThisCellFilled) {
        focusPreviousCell();
        cells.value[focusedCellIdx.value].value = "";
        e.preventDefault();
      } else {
        cells.value[index].value = "";
      }
    };
    const onKeyDown = (e) => {
      switch (e.keyCode) {
        case 37:
          focusPreviousCell();
          break;
        case 39:
          focusNextCell();
          break;
      }
    };
    const onPaste = (pasteIdx, e) => {
      e.preventDefault();
      const pasteValues = e.clipboardData.getData("text/plain").split("");
      let j = 0;
      for (let i = pasteIdx; i < pasteIdx + pasteValues.length; i++) {
        if (pasteValues[j] === void 0 || cells.value[i] === void 0)
          break;
        cells.value[i].value = pasteValues[j];
        j++;
      }
    };
    const onInput = (pasteIdx, ev) => {
      var _a;
      const e = ev;
      if (((_a = e.data) == null ? void 0 : _a.length) === props.length) {
        e.preventDefault();
        const pasteValues = e.data.toString().split("");
        let j = 0;
        for (let i = pasteIdx; i < pasteIdx + pasteValues.length; i++) {
          if (pasteValues[j] === void 0 || cells.value[i] === void 0)
            break;
          cells.value[i].value = pasteValues[j];
          j++;
        }
      }
    };
    const reset = () => {
      unwatchCells();
      init();
      focusCellByIndex();
    };
    const unwatchCells = () => {
      const watchersKeys = Object.keys(watchers.value);
      watchersKeys.forEach((name) => watchers.value[name]());
    };
    const isTheCellValid = (cell, allowEmpty = true) => {
      if (!cell) {
        return allowEmpty ? cell === "" : false;
      }
      return !!cell.match(CELL_REGEXP);
    };
    const getRelevantInputType = () => {
      return props.secure && !props.characterPreview ? SECURE_INPUT_TYPE : DEFAULT_INPUT_TYPE;
    };
    const focusPreviousCell = () => {
      if (!focusedCellIdx.value)
        return;
      focusCellByIndex(focusedCellIdx.value - 1);
    };
    const focusNextCell = () => {
      if (focusedCellIdx.value === props.length - 1)
        return;
      focusCellByIndex(focusedCellIdx.value + 1);
    };
    const focusCellByIndex = (index = 0) => {
      const ref2 = `${baseRefName.value}${index}`;
      const el = refs.value[ref2];
      if (!el)
        return;
      el.focus();
      el.select();
      focusedCellIdx.value = index;
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(cells.value, (cell, index) => {
          return withDirectives((openBlock(), createElementBlock("input", mergeProps({
            key: cell.key,
            ref_for: true,
            ref: (el) => setRef(`${baseRefName.value}${index}`, el),
            "onUpdate:modelValue": ($event) => cell.value = $event
          }, _ctx.$attrs, {
            class: `${__props.inputClass}`,
            type: cellsInputTypes.value[index],
            onFocus: ($event) => focusedCellIdx.value = index,
            onKeydown: [
              withKeys(($event) => onCellErase(index, $event), ["delete"]),
              onKeyDown
            ],
            onPaste: ($event) => onPaste(index, $event),
            onInput: ($event) => onInput(index, $event)
          }), null, 16, _hoisted_1)), [
            [
              vModelDynamic,
              cell.value,
              void 0,
              { trim: true }
            ]
          ]);
        }), 128))
      ]);
    };
  }
});
const PinInput = {
  install: (app, options = {}) => {
    app.component("pin-input", _sfc_main);
  }
};
export { PinInput as default };

<template>
  <div>
    <input
      v-for="(cell, index) in cells"
      :key="cell.key"
      :ref="el => setRef(`${baseRefName}${index}`, el)"
      v-model.trim="cell.value"
      v-bind="$attrs"
      :class="`${inputClass}`"
      :type="cellsInputTypes[index]"
      @focus="focusedCellIdx = index"
      @keydown.delete="onCellErase(index, $event)"
      @keydown="onKeyDown"
      @paste="onPaste(index, $event)"
      @input="onInput(index, $event)"
    >
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch, withDefaults } from 'vue'
import { Cell, CellInputType, CellsInputTypes } from '../types/types'

const BASE_REF_NAME = 'vue-pincode-input'
const CELL_REGEXP = '^\\d{1}$'
const DEFAULT_INPUT_TYPE = 'tel'
const SECURE_INPUT_TYPE = 'password'

interface Props {
  modelValue: string
  length?: number
  autofocus?: boolean
  secure?: boolean
  characterPreview?: boolean
  charPreviewDuration?: number
  inputClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  length: 4,
  autofocus: true,
  secure: false,
  characterPreview: true,
  charPreviewDuration: 300
})

const emit = defineEmits(['update:modelValue', 'completed'])

const baseRefName = ref(BASE_REF_NAME)
const focusedCellIdx = ref(0)
const cells = ref<Cell[]>([])
const watchers = ref<Record<string, Function>>({})
const cellsInputTypes = ref<CellsInputTypes>({})

const refs = ref<Record<string, HTMLInputElement>>({})
const setRef = (key: string, el: any) => {
  refs.value[key] = el as HTMLInputElement
}

const pinCodeComputed = computed(() => cells.value.reduce((pin, cell) => pin + cell.value, ''))

watch(() => props.modelValue, () => {
  if (props.modelValue) {
    onParentValueUpdated()
  } else {
    reset()
  }
})

watch(() => props.length, () => {
  reset()
})

watch(pinCodeComputed, (val, oldVal) => {
  emit('update:modelValue', val)
  if (oldVal.length !== props.length && val.length === props.length) {
    emit('completed', val)
  }
})

onMounted(() => {
  init()
  onParentValueUpdated()

  if (props.autofocus) {
    nextTick(() => focusCellByIndex())
  }
})

// Init methods
const init = () => {
  const inputType = getRelevantInputType()
  for (let key = 0; key < props.length; key += 1) {
    setCellObject(key)
    setCellInputType(key, inputType)
    setCellWatcher(key)
  }
}

const setCellObject = (key: number) => {
  cells.value[key] = { key, value: '' }
}

const setCellInputType = (index: number, inputType: CellInputType = SECURE_INPUT_TYPE) => {
  cellsInputTypes.value[index] = inputType
}

const setCellWatcher = (index: number) => {
  const watchingProperty = `cells.${index}.value`

  watchers.value[watchingProperty] = watch(() => cells.value[index].value, (newVal, oldVal) => {
    onCellChanged(index, newVal, oldVal)
  })
}

// Handlers
const onParentValueUpdated = () => {
  if (props.modelValue.length !== props.length) {
    emit('update:modelValue', pinCodeComputed.value)
    return
  }
  props.modelValue
    .split('')
    .forEach((cell: string, idx: number) => {
      cells.value[idx].value = cell || ''
    })
}

const onCellChanged = (index: number, newVal: string, oldVal: string) => {
  if (!isTheCellValid(newVal, false)) {
    cells.value[index].value = ''
    return
  }
  focusNextCell()
  /* performing character preview if it's enabled */
  if (props.secure && props.characterPreview) {
    setTimeout(setCellInputType, props.charPreviewDuration, index)
  }
}

const onCellErase = (index: number, e: Event) => {
  const isThisCellFilled = cells.value[index].value.length
  if (!isThisCellFilled) {
    focusPreviousCell()
    cells.value[focusedCellIdx.value].value = ''
    e.preventDefault()
  } else {
    cells.value[index].value = ''
  }
}

const onKeyDown = (e: KeyboardEvent) => {
  switch (e.keyCode) {
    /* left arrow key */
    case 37:
      focusPreviousCell()
      break
    /* right arrow key */
    case 39:
      focusNextCell()
      break
    default:
      break
  }
}

const onPaste = (pasteIdx: number, e: ClipboardEvent) => {
  e.preventDefault()
  const pasteValues: string[] = (e.clipboardData as DataTransfer)
    .getData('text/plain')
    .split('')
  
  let j = 0
  for (let i = pasteIdx; i < pasteIdx + pasteValues.length; i++) {
    if (pasteValues[j] === undefined || cells.value[i] === undefined) break;
    cells.value[i].value = pasteValues[j]
    j++
  }
}

const onInput = (pasteIdx: number, ev: Event) => {
  const e = ev as InputEvent
  if (e.data?.length === props.length) {
    e.preventDefault()
    const pasteValues: string[] = (e.data.toString()).split('')
    
    let j = 0
    for (let i = pasteIdx; i < pasteIdx + pasteValues.length; i++) {
      if (pasteValues[j] === undefined || cells.value[i] === undefined) break;
      cells.value[i].value = pasteValues[j]
      j++
    }
  }
}

// Reset methods
const reset = () => {
  unwatchCells()
  init()
  focusCellByIndex()
}

const unwatchCells = () => {
  const watchersKeys = Object.keys(watchers.value)
  watchersKeys.forEach(name => watchers.value[name]())
}

const isTheCellValid = (cell: string, allowEmpty = true): boolean  => {
  if (!cell) {
    return allowEmpty ? cell === '' : false
  }
  return !!cell.match(CELL_REGEXP)
}

const getRelevantInputType = (): CellInputType => {
  return props.secure && !props.characterPreview
    ? SECURE_INPUT_TYPE
    : DEFAULT_INPUT_TYPE
}

const focusPreviousCell = () => {
  if (!focusedCellIdx.value) return
  focusCellByIndex(focusedCellIdx.value - 1)
}

const focusNextCell = () => {
  if (focusedCellIdx.value === props.length - 1) return
  focusCellByIndex(focusedCellIdx.value + 1)
}

const focusCellByIndex = (index: number = 0) => {
  const ref = `${baseRefName.value}${index}`
  const el = refs.value[ref]
  if (!el) return
  el.focus()
  el.select()
  focusedCellIdx.value = index
}
</script>

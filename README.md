# Vue Pin Input (Vue 3)

Vue Pin Input is a Vue 3 input component for pins, otp etc.

Here is a live [demo](https://kamnakis.github.io/v-pin-input-demo/)


## Installation


```bash
yarn v-pin-input
# or
npm v-pin-input
```


## Plugin installation
```ts
import { createApp } from 'vue'
import App from './App.vue'

import PinInput from 'v-pin-input'

const app = createApp(App)

app.use(PinInput)
app.mount('#app')
```

## Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'

const model = ref('')

const handleCompleted = (val: string) => {
  console.log('Completed', val)
}
</script>

<template>
  <pin-input
    class="wrapper"
    v-model="model"
    :length="6"
    autofocus
    input-class="pinInput"
    @completed="handleCompleted"
  />
</template>

<style>
.wrapper {
  display: flex;
  gap: 4px;
}

.pinInput {
  width: 20px;
  padding: 4px;
  border: none;
  border-bottom: 2px solid black;
  font-size: 1.5rem;
  color: black;
  margin-right: 4px;
  text-align: center;
}

.pinInput:focus {
  outline: none;
}
</style>
```


### Props
| Property              | Type       | Default  | Description |
| :-------------------- | :--------- | :------- | :---------- |
| `length` | `number`     | `4`   | The amount of the inputs |
| `autofocus`       | `boolean`     | `true`   | Autofocus on first input on component load. |
| `secure`       | `boolean`     | `false`   | Display * instead of character |
| `characterPreview`       | `boolean`     | `true`   | Display character before switch to * in secure mode |
| `charPreviewDuration`       | `number`     | `300`   | Ms to show the character before switch back to * |


### Events
| Name                  | Payload              | Description |
| :-------------------- | :--------- | :---------- |
| `completed`           | `string`             | Called once the user completes the input (fills the last empty input) |


## References
This is pretty much a combination of [vue-split-input](https://github.com/dammy001/vue-split-input) and [vue-pincode-input](https://github.com/Seokky/vue-pincode-input)

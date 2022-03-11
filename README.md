# Vue Pin Input (Vue 3)

Vue Pin Input is a Vue 3 input component for pins, otp etc.

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
  <div class="wrapper">
    <pin-input
      v-model="model"
      :length="6"
      autofocus
      input-class="pinInput"
      @completed="handleCompleted"
    />
  </div>
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

## References
This is pretty much a combination of [vue-split-input](https://github.com/dammy001/vue-split-input) and [vue-pincode-input](https://github.com/Seokky/vue-pincode-input)

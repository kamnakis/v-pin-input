<script setup lang="ts">
import { ref } from 'vue';

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

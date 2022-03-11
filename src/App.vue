<script setup lang="ts">
import { ref } from 'vue';
import PinInput from './components/PinInput.vue'

const a = ref('')

const handleCompleted = (val: string) => {
  console.log('Completed', val)
}
</script>

<template>
  <PinInput v-model="a" :length="6" autofocus input-class="pinInput" @completed="handleCompleted" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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

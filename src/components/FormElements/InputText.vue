<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
  label: string
}>()
const modelValue = defineModel()

// ToDo: Add individual form field validators to verify correct field input based on type of validations desired
// Validators: marital options only, number only, name only (no numbers), year only
// const error = ref('')
</script>

<template>
  <div class="display-flex-column input-text-group">
    <span class="bold">{{ label }}</span>
    <input
      class="text-input"
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <!-- <p class="error-msg"></p> -->
  </div>
</template>

<style>
.input-text-group {
  margin-bottom: 1rem;
}

.text-input {
  padding: 6px 12px;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 4px;
  transition:
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
}

.error-msg {
  color: red;
}
</style>

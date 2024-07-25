<script setup lang="ts">
// Base component to display a list of radio inputs
// label: Requried, a string that will be used as the label of the input group
// options: Required, an array of options that will be displayed
// id: Optional, used on the element that encompasses the radio input groups

defineProps<{
  label: string
  options: string[]
  id?: string
}>()
const modelValue = defineModel()
</script>

<template>
  <div :id="id" class="display-flex-column input-radio-group">
    <span class="bold">{{ label }}</span>
    <div class="input-radio-options-row">
      <div v-for="opt in options" class="input-radio-option" :key="opt">
        <input
          type="radio"
          v-model="modelValue"
          :checked="opt === modelValue"
          :value="opt"
          :id="opt"
          @change="$emit('update:modelValue', opt)"
        />
        <span>{{ opt }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.input-radio-group {
  margin-bottom: 1rem;
}
.input-radio-options-row {
  display: flex;
}
.input-radio-option {
  padding: 0 1rem;
}
.input-radio-option > input {
  margin-right: 0.5rem;
}
</style>

<script setup lang="ts">
defineProps<{
  label: string
  id?: string
}>()
const modelValue = defineModel()
const yes = 'Yes'
const no = 'No'
</script>

<template>
  <div class="display-flex-column input-radio-group">
    <span class="bold">{{ label }}</span>
    <div class="input-radio-options-row">
      <div class="input-radio-option">
        <span>Yes</span>
        <input
          type="radio"
          v-model="modelValue"
          :checked="yes === modelValue"
          :value="yes"
          :id="id"
          @change="$emit('update:modelValue', yes)"
        />
      </div>
      <div class="input-radio-option">
        <span>No</span>
        <input
          type="radio"
          v-model="modelValue"
          :checked="no === modelValue"
          :value="no"
          :id="id"
          @change="$emit('update:modelValue', no)"
        />
      </div>
    </div>
  </div>
</template>

<style>
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
  margin-left: 0.5rem;
}
</style>

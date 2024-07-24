<script setup lang="ts">
defineProps<{
  label: string
}>()
const modelValue = defineModel()
</script>

<template>
  <div class="display-flex-column">
    <span>{{ label }}</span>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
  </div>
</template>

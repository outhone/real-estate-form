<script setup lang="ts">
defineProps<{
  label: string
}>()
const modelValue = defineModel()
const yes = 'Yes'
const no = 'No'
</script>

<template>
  <div class="display-flex-column">
    <span>{{ label }}</span>
    <div>
      <span>Yes</span>
      <input
        type="radio"
        v-model="modelValue"
        :checked="yes === modelValue"
        :value="yes"
        @change="$emit('update:modelValue', yes)"
      />
      <span>No</span>
      <input
        type="radio"
        v-model="modelValue"
        :checked="no === modelValue"
        :value="no"
        @change="$emit('update:modelValue', no)"
      />
    </div>
  </div>
</template>

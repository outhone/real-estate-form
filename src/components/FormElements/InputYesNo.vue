<script setup lang="ts">
import BaseInputRadio from './BaseInputRadio.vue'
defineProps<{
  label: string
  id?: string
}>()
const modelValue = defineModel()
const options = ['Yes', 'No']
</script>

<template>
  <BaseInputRadio v-model="modelValue" :label="label" :options="options" :id="id" />
</template>

<script setup lang="ts">
defineProps<{
  prev?: boolean
  next?: boolean
}>()
</script>

<template>
  <button v-if="prev" @click="$emit('prevStep')">Previous</button>
  <button v-if="next" @click="$emit('nextStep')">Next</button>
</template>

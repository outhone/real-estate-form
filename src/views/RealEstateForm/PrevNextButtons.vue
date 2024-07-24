<script setup lang="ts">
defineProps<{
  prev?: boolean
  next?: boolean
}>()
</script>

<template>
  <div class="nav-btn-group">
    <button class="btn" v-if="prev" @click="$emit('prevStep')">Previous</button>
    <button class="btn" v-if="next" @click="$emit('nextStep')">Next</button>
  </div>
</template>

<style>
.nav-btn-group {
  display: flex;
  justify-content: space-between;
}
</style>

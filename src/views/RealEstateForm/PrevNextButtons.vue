<script setup lang="ts">
defineProps<{
  prev?: boolean
  next?: boolean
}>()
</script>

<template>
  <div id="nav-buttons" class="nav-btn-group">
    <button id="prev-btn" class="btn" v-if="prev" @click="$emit('prevStep')">Previous</button>
    <button id="next-btn" class="btn" v-if="next" @click="$emit('nextStep')">Next</button>
  </div>
</template>

<style scoped>
.nav-btn-group {
  display: flex;
  justify-content: space-between;
}
</style>

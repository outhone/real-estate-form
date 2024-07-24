<script setup lang="ts">
defineProps<{
  prev?: boolean
  next?: boolean
}>()
</script>

<template>
  <div class="btn-group">
    <button class="btn" v-if="prev" @click="$emit('prevStep')">Previous</button>
    <button class="btn" v-if="next" @click="$emit('nextStep')">Next</button>
  </div>
</template>

<style>
.btn-group {
  display: flex;
  justify-content: space-between;
}

.btn {
  cursor: pointer;
  outline: 0;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  background-color: white;
  border: 1px solid transparent;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition:
    color 0.15s ease-in-out,
    background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  color: #0d6efd;
  border-color: #0d6efd;
}

.btn:hover,
.btn:focus {
  color: #fff;
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>

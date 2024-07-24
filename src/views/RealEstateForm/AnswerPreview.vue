<script setup lang="ts">
defineProps<{
  answers: {
    [key: string]: {
      question_details: string
      answer: string
    }
  }
}>()
</script>

<template>
  <h1>Preview of Answers</h1>
  <div v-for="(answer, index) in answers" :key="index">
    <div v-if="answer.answer">
      <p class="bold">{{ answer.question_details }}</p>
      <p>{{ answer.answer }}</p>
    </div>
  </div>
</template>

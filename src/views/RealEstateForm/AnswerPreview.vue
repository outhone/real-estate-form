<script setup lang="ts">
// This component loops through an object of questions and answers and prints them out
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
  <h1>Your Answers</h1>
  <div v-for="(answer, index) in answers" :key="index">
    <div v-if="answer.answer" class="question-answer-group">
      <p class="bold">{{ answer.question_details }}</p>
      <p>{{ answer.answer }}</p>
    </div>
  </div>
</template>

<style scoped>
.question-answer-group {
  margin-bottom: 1rem;
}
</style>

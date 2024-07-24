<script setup lang="ts">
import InputText from '@/components/FormElements/InputText.vue'
import InputYesNo from '@/components/FormElements/InputYesNo.vue'
import { ref } from 'vue'
const personalInformation = ref({
  fullName: '',
  birthYear: '',
  maritalStatus: '',
  anyChildren: ''
})
</script>

<template>
  <div class="form-page">
    <h1>Personal Information</h1>
    <InputText v-model="personalInformation.fullName" label="What is your full legal name?" />
    <InputText v-model="personalInformation.birthYear" label="What is your birth year?" />
    <InputText
      v-model="personalInformation.maritalStatus"
      label="What is your marital status? (Single, Married, Divorced, Widowed, Domestic Partner)"
    />
    <InputYesNo v-model="personalInformation.anyChildren" label="Do you have any children?" />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .form-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
}
</style>

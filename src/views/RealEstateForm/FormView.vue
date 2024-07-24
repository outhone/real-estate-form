<script setup lang="ts">
import InputText from '@/components/FormElements/InputText.vue'
import InputYesNo from '@/components/FormElements/InputYesNo.vue'
import { ref } from 'vue'
const personalInformation = ref({
  Q1: '',
  Q2: '',
  Q3: '',
  Q4: '',
  Q5: '',
  Q6: '',
  Q7: '',
  Q8: '',
  Q9: '',
  Q10: '',
  Q11: '',
  Q10_2: '',
  Q12: '',
  Q13: '',
  Q10_3: ''
})

const step = ref(1)
function nextStep() {
  if (step.value === 1 && personalInformation.value.Q3 === 'Married') {
    step.value = 2
  } else if (step.value === 1 && personalInformation.value.Q4 === 'Yes') {
    step.value = 3
  } else if (step.value === 1) {
    step.value = 4
  } else if (step.value === 2 && personalInformation.value.Q4 === 'Yes') {
    step.value = 3
  } else if (step.value === 2) {
    step.value = 4
  } else if (step.value === 3) {
    step.value = 4
  } else if (
    step.value === 5 &&
    personalInformation.value.Q8 !== 'Yes' &&
    personalInformation.value.Q11 !== 'Yes'
  ) {
    // If user does not own either a primary house or other real estate, skip real estate value question
    step.value = 7
  } else {
    step.value++
  }
}

function previousStep() {
  if (step.value === 2) {
    step.value = 1
  } else if (step.value === 3 && personalInformation.value.Q3 === 'Married') {
    step.value = 2
  } else if (step.value === 3) {
    step.value = 1
  } else if (step.value === 4 && personalInformation.value.Q4 === 'Yes') {
    step.value = 3
  } else if (step.value === 4 && personalInformation.value.Q3 === 'Married') {
    step.value = 2
  } else if (step.value === 4) {
    step.value = 1
  } else if (
    step.value === 7 &&
    personalInformation.value.Q8 !== 'Yes' &&
    personalInformation.value.Q11 !== 'Yes'
  ) {
    step.value = 5
  } else {
    step.value--
  }
}
</script>

<template>
  <div class="form-page">
    <div v-if="step === 1">
      <h1>Personal Information</h1>
      <InputText v-model="personalInformation.Q1" label="What is your full legal name?" />
      <InputText v-model="personalInformation.Q2" label="What is your birth year?" />
      <InputText
        v-model="personalInformation.Q3"
        label="What is your marital status? (Single, Married, Divorced, Widowed, Domestic Partner)"
      />
      <InputYesNo v-model="personalInformation.Q4" label="Do you have any children?" />
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 2">
      <h1>Partner Information</h1>
      <InputText v-model="personalInformation.Q5" label="What is your partner's full legal name?" />
      <InputText v-model="personalInformation.Q6" label="What is your partner's birth year?" />
      <button @click="previousStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 3">
      <h1>Children Information</h1>
      <InputText v-model="personalInformation.Q7" label="How many children do you have?" />
      <button @click="previousStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 4">
      <h1>Primary Residence Information</h1>
      <InputYesNo
        v-model="personalInformation.Q8"
        label="Do you or your partner (if not single) own your primary residence?"
      />
      <div v-if="personalInformation.Q8 === 'Yes'">
        <InputYesNo
          v-model="personalInformation.Q9"
          label="Is your primary residence also your preferred mailing address?"
        />
        <InputText
          v-model="personalInformation.Q10"
          label="What is the approximate value of your real estate?"
        />
      </div>
      <button @click="previousStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 5">
      <h1>Other Real Estate Information</h1>
      <InputYesNo
        v-model="personalInformation.Q11"
        label="Do you own any other type of real estate (e.g., vacation, rental, etc.)?"
      />
      <InputText
        v-if="personalInformation.Q11 === 'Yes'"
        v-model="personalInformation.Q10_2"
        label="What is the approximate value of your real estate?"
      />
      <div v-else-if="personalInformation.Q11 === 'No'">
        <InputYesNo
          v-model="personalInformation.Q12"
          label="Do you want to buy real estate in the future?"
        />
        <InputYesNo
          v-if="personalInformation.Q12 === 'Yes'"
          v-model="personalInformation.Q13"
          label="Do you have any financial goals already created?"
        />
      </div>
      <button @click="previousStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 6">
      <h1>Real Estate Value</h1>
      <InputText
        v-model="personalInformation.Q10_3"
        label="What is the approximate value of your primary residence or other real estate?"
      />
      <button @click="previousStep">Previous</button>
      <button @click="nextStep">Next</button>
    </div>
    <div v-if="step === 7">
      <h1>Preview of Answers</h1>
      <p>{{ personalInformation }}</p>
      <button @click="previousStep">Previous</button>
    </div>
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

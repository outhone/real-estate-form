<script setup lang="ts">
import InputText from '@/components/FormElements/InputText.vue'
import InputYesNo from '@/components/FormElements/InputYesNo.vue'
import AnswerPreview from '@/views/RealEstateForm/AnswerPreview.vue'
import PrevNextButtons from '@/views/RealEstateForm/PrevNextButtons.vue'
import DefaultFormAnswers from '@/views/RealEstateForm/DefaultFormAnswers.js'
import { ref, watch } from 'vue'

// ToDo: Store form data in session storage instead?
// ToDo: Group questions into their relative steps so that you can use v-for for each section instad
// ToDo: Create Number and Dropdown input components for better user validation and experience
const form = ref(DefaultFormAnswers)
const formError = ref(false)

// Step is used to determine what page should be displayed to the user
const step = ref(1)

// Logic to decide what page to go to when clicking next
// ToDo: Try using an array of available steps depending on the dependencies instead?
function nextStep() {
  // Validate that the required fields are filled to move on
  if (validateStep(step.value)) {
    if (step.value === 1 && hasPartner()) {
      step.value = 2
    } else if (step.value === 1 && hasChildren()) {
      step.value = 3
    } else if (step.value === 1) {
      step.value = 4
    } else if (step.value === 2 && hasChildren()) {
      step.value = 3
    } else if (step.value === 2) {
      step.value = 4
    } else if (step.value === 3) {
      step.value = 4
    } else if (
      step.value === 5 &&
      form.value.Q8.answer !== 'Yes' &&
      form.value.Q11.answer !== 'Yes'
    ) {
      // If user does not own either a primary house or other real estate, skip real estate value question
      step.value = 7
    } else {
      step.value++
    }
  } else {
    // Display error that all form fields must be filled
    formError.value = true
  }
}

// Logic to decide what page to go to when clicking previous
// ToDo: Try using an array of available steps depending on the dependencies instead?
function previousStep() {
  if (step.value === 2) {
    step.value = 1
  } else if (step.value === 3 && hasPartner()) {
    step.value = 2
  } else if (step.value === 3) {
    step.value = 1
  } else if (step.value === 4 && hasChildren()) {
    step.value = 3
  } else if (step.value === 4 && hasPartner()) {
    step.value = 2
  } else if (step.value === 4) {
    step.value = 1
  } else if (
    step.value === 7 &&
    form.value.Q8.answer !== 'Yes' &&
    form.value.Q11.answer !== 'Yes'
  ) {
    step.value = 5
  } else {
    step.value--
  }
}

// Validate that each required field has been filled out
function validateStep(step: number) {
  if (step === 1) {
    if (
      !form.value.Q1.answer ||
      !form.value.Q2.answer ||
      !form.value.Q3.answer ||
      !form.value.Q4.answer
    ) {
      return false
    }
  } else if (step === 2) {
    if (!form.value.Q5.answer || !form.value.Q6.answer) {
      return false
    }
  } else if (step === 3 && !form.value.Q7.answer) {
    return false
  } else if (step === 4) {
    if (!form.value.Q8.answer) {
      return false
    } else if (
      form.value.Q8.answer === 'Yes' &&
      (!form.value.Q9.answer || !form.value.Q10.answer)
    ) {
      return false
    }
  } else if (step === 5) {
    if (!form.value.Q11.answer) {
      return false
    } else if (form.value.Q11.answer === 'Yes' && !form.value.Q10_2.answer) {
      return false
    } else if (!form.value.Q12.answer) {
      return false
    } else if (form.value.Q12.answer === 'Yes' && !form.value.Q13.answer) {
      return false
    }
  } else if (step === 6 && !form.value.Q10_3.answer) {
    return false
  }
  return true
}

// Based on form input, return if user as a partner
function hasPartner() {
  const answer = form.value.Q3.answer.toLowerCase()
  if (answer === 'married' || answer === 'domestic partner') {
    return true
  } else {
    return false
  }
}

// Based on form input, return if user as children
function hasChildren() {
  if (form.value.Q4.answer === 'Yes') {
    return true
  } else {
    return false
  }
}

// Clear step page error message when step and form fields changes
watch([step, form.value], () => {
  formError.value = false
})

// Clear fields when question 4 changes
watch(
  () => form.value.Q4.answer,
  () => {
    form.value.Q7.answer = ''
  }
)
// ToDo: Add general watchers to clear fields based on option and dependencies
// Use a loop to go through dependencies?
</script>

<template>
  <div class="form-page">
    <div>
      <progress class="progress-bar" :max="6" :value="step - 1"></progress>
      <div v-show="step === 1">
        <h1>Personal Information</h1>
        <InputText v-model="form.Q1.answer" :label="form.Q1.question_details" />
        <InputText v-model="form.Q2.answer" :label="form.Q2.question_details" />
        <InputText v-model="form.Q3.answer" :label="form.Q3.question_details" />
        <InputYesNo v-model="form.Q4.answer" :label="form.Q4.question_details" />
        <PrevNextButtons :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-show="step === 2">
        <h1>Partner Information</h1>
        <InputText v-model="form.Q5.answer" :label="form.Q5.question_details" />
        <InputText v-model="form.Q6.answer" :label="form.Q6.question_details" />
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-show="step === 3">
        <h1>Children Information</h1>
        <InputText v-model="form.Q7.answer" :label="form.Q7.question_details" />
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-show="step === 4">
        <h1>Primary Residence Information</h1>
        <InputYesNo v-model="form.Q8.answer" :label="form.Q8.question_details" />
        <div v-if="form.Q8.answer === 'Yes'">
          <InputYesNo v-model="form.Q9.answer" :label="form.Q9.question_details" />
          <InputText v-model="form.Q10.answer" :label="form.Q10.question_details" />
        </div>
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-show="step === 5">
        <h1>Other Real Estate Information</h1>
        <InputYesNo v-model="form.Q11.answer" :label="form.Q11.question_details" />
        <InputText
          v-if="form.Q11.answer === 'Yes'"
          v-model="form.Q10_2.answer"
          :label="form.Q10_2.question_details"
        />
        <div v-else-if="form.Q11.answer === 'No'">
          <InputYesNo v-model="form.Q12.answer" :label="form.Q12.question_details" />
          <InputYesNo
            v-if="form.Q12.answer === 'Yes'"
            v-model="form.Q13.answer"
            :label="form.Q13.question_details"
          />
        </div>
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-show="step === 6">
        <h1>Real Estate Value</h1>
        <InputText v-model="form.Q10_3.answer" :label="form.Q10_3.question_details" />
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-show="step === 7">
        <AnswerPreview :answers="form" />
        <PrevNextButtons :prev="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <p v-if="formError" class="error-msg">Error: All fields must be answered.</p>
    </div>
  </div>
</template>

<style>
.form-page > div {
  background-color: #fafafb;
  border: 1px solid #ced4da;
  padding: 2rem;
  border-radius: 0.25rem;
}

.progress-bar {
  width: 100%;
}

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

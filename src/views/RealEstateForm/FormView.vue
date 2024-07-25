<script setup lang="ts">
import InputText from '@/components/FormElements/InputText.vue'
import InputYesNo from '@/components/FormElements/InputYesNo.vue'
import BaseInputRadio from '@/components/FormElements/BaseInputRadio.vue'
import AnswerPreview from '@/views/RealEstateForm/AnswerPreview.vue'
import PrevNextButtons from '@/views/RealEstateForm/PrevNextButtons.vue'
import QuestionsAnswers from '@/views/RealEstateForm/QuestionsAnswers'
import { ref, watch } from 'vue'

// ToDo: Implement address form when user selection owns property for primary and other real estate
// Improvements: Create Number or dopdown input components for better user validation and experience
// Improvements: Group questions into their relative steps so that you can use v-for for each section instead?

// Answers and question information for the form
const form = ref(QuestionsAnswers)
type QuestionIdType = keyof typeof QuestionsAnswers

// Step is used to track what page is being dislayed
const step = ref(1)

// Used to display error that all form fields have not been filled out
const formError = ref(false)

// Marital statuses
const maritalStatus = ['Single', 'Married', 'Divorced', 'Widowed', 'Domestic Partner']

// Use session storage to store user data . Can be enabled, enable watcher below to sync up session storage if being used
// if (sessionStorage.getItem('realEstateFormData') !== null) {
//   form.value = JSON.parse(sessionStorage.getItem('realEstateFormData') || '{}')
//   step.value = JSON.parse(sessionStorage.getItem('realEstateFormStep') || '{}')
// }

// Events to do when step or form answer changes
watch([step, form.value], () => {
  // Clear form error message
  formError.value = false
  // If session storage is enabled to store user form answers uncomment
  // sessionStorage.setItem('realEstateFormData', JSON.stringify(form.value))
  // sessionStorage.setItem('realEstateFormStep', JSON.stringify(step.value))
})

// Loop through all questions that have dependencies and create watchers for them to clear their respecitive fields when updated
for (let questionId in QuestionsAnswers) {
  const questionData = QuestionsAnswers[questionId as QuestionIdType]
  if (questionData.question_dependencies.yes || questionData.question_dependencies.no) {
    createWatchers(questionId as QuestionIdType)
  }
}

function createWatchers(id: QuestionIdType) {
  watch(
    () => form.value[id].answer,
    () => {
      // Improvement: Allow an array of dependencies to clear multiple questions
      const yesDependence = form.value[id].question_dependencies.yes as QuestionIdType
      const noDependence = form.value[id].question_dependencies.no as QuestionIdType
      if (noDependence) {
        // Clear the question dependency
        form.value[noDependence].answer = ''
      }
      if (yesDependence) {
        // Clear the question dependency
        form.value[yesDependence].answer = ''
      }
    }
  )
}

// Answer to question question 3 about marriage clears 2 questions' answer
// This would not be needed if watcher above allows for multiple dependencies to be cleared at once and the json is updated with two dependencies
watch(
  () => form.value.Q3.answer,
  () => {
    form.value.Q5.answer = ''
    form.value.Q6.answer = ''
  }
)

// ToDo: Use group of questions method idea instead of pages? => ex qg1=[Q1,Q2,Q3,Q4], qg2=[] single was selected, qg3=[Q7]
// Or use an array of steps/pages that a user can get to based on dependences ex [1,4,6]. When a page/step is removed from array clear all form fields on that pages
// Logic to decide what page to go to when clicking next
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
    } else {
      step.value++
    }
  } else {
    // Display error that all form fields must be filled
    formError.value = true
  }
}

// Logic to decide what page to go to when clicking previous
// ToDo: Try using an array of available steps depending on the dependencies instead? See comment on nextStep function
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
  } else {
    step.value--
  }
}

// Validate that each required field has been filled out
// ToDo: Use group of questions method idea instead of pages? => ex qg1=[Q1,Q2,Q3,Q4], qg2=[] single was selected, qg3=[Q7] has children selected
// Then just verify each questionis filled based on the group of questions in the array
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
    // ToDo: Check if address form has been completed filled out if Q8 is Yes
    if (!form.value.Q8.answer) {
      return false
    } else if (
      form.value.Q8.answer === 'Yes' &&
      (!form.value.Q9.answer || !form.value.Q10.answer)
    ) {
      return false
    }
  } else if (step === 5) {
    // ToDo: Check if address form has been completed filled out if Q11 is Yes
    if (!form.value.Q11.answer) {
      return false
    } else if (form.value.Q11.answer === 'Yes' && !form.value.Q10_2.answer) {
      return false
    } else if (form.value.Q11.answer === 'No' && !form.value.Q12.answer) {
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
  // Can remove toLowerCase now since input was updated to radio selection, but is needed if input is reverted back to text input
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
</script>

<template>
  <div class="form-page">
    <div>
      <progress id="progress-bar" class="progress-bar" :max="6" :value="step - 1"></progress>
      <div v-if="step === 1">
        <h1>Personal Information</h1>
        <InputText v-model="form.Q1.answer" :id="form.Q1.id" :label="form.Q1.question_details" />
        <InputText v-model="form.Q2.answer" :id="form.Q2.id" :label="form.Q2.question_details" />
        <!-- <InputText v-model="form.Q3.answer" :id="form.Q3.id" :label="form.Q3.question_details" /> -->
        <BaseInputRadio
          v-model="form.Q3.answer"
          :options="maritalStatus"
          :id="form.Q3.id"
          :label="form.Q3.question_details"
        />
        <InputYesNo v-model="form.Q4.answer" :id="form.Q4.id" :label="form.Q4.question_details" />
        <PrevNextButtons :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-if="step === 2">
        <h1>Partner Information</h1>
        <InputText v-model="form.Q5.answer" :id="form.Q5.id" :label="form.Q5.question_details" />
        <InputText v-model="form.Q6.answer" :id="form.Q6.id" :label="form.Q6.question_details" />
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-if="step === 3">
        <h1>Children Information</h1>
        <InputText v-model="form.Q7.answer" :id="form.Q7.id" :label="form.Q7.question_details" />
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-if="step === 4">
        <h1>Primary Residence Information</h1>
        <InputYesNo v-model="form.Q8.answer" :id="form.Q8.id" :label="form.Q8.question_details" />
        <div v-if="form.Q8.answer === 'Yes'">
          <InputYesNo v-model="form.Q9.answer" :id="form.Q9.id" :label="form.Q9.question_details" />
          <InputText
            v-model="form.Q10.answer"
            :id="form.Q10.id"
            :label="form.Q10.question_details"
          />
          <!-- ToDo: Display address form -->
        </div>
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-if="step === 5">
        <h1>Other Real Estate Information</h1>
        <InputYesNo
          v-model="form.Q11.answer"
          :id="form.Q11.id"
          :label="form.Q11.question_details"
        />
        <InputText
          v-if="form.Q11.answer === 'Yes'"
          v-model="form.Q10_2.answer"
          :id="form.Q10_2.id"
          :label="form.Q10_2.question_details"
        />
        <!-- ToDo: Display address form -->
        <div v-else-if="form.Q11.answer === 'No'">
          <InputYesNo v-model="form.Q12.answer" :label="form.Q12.question_details" />
          <InputYesNo
            v-if="form.Q12.answer === 'Yes'"
            v-model="form.Q13.answer"
            :id="form.Q13.id"
            :label="form.Q13.question_details"
          />
        </div>
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-if="step === 6">
        <h1>Real Estate Value</h1>
        <InputText
          v-model="form.Q10_3.answer"
          :id="form.Q10_3.id"
          :label="form.Q10_3.question_details"
        />
        <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <div v-if="step === 7">
        <AnswerPreview :answers="form" />
        <PrevNextButtons :prev="true" @nextStep="nextStep" @prevStep="previousStep" />
      </div>
      <p v-if="formError" id="form-error-msg" class="error-msg">
        Error: All fields must be answered.
      </p>
    </div>
  </div>
</template>

<style scoped>
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

<script setup lang="ts">
import InputText from '@/components/FormElements/InputText.vue'
import InputYesNo from '@/components/FormElements/InputYesNo.vue'
import AnswerPreview from '@/views/RealEstateForm/AnswerPreview.vue'
import PrevNextButtons from '@/views/RealEstateForm/PrevNextButtons.vue'
import { ref } from 'vue'

const form = ref({
  Q1: {
    question_details: `What is your full legal name?`,
    answer: ''
  },
  Q2: {
    question_details: `What is your birth year?`,
    answer: ''
  },
  Q3: {
    question_details: `What is your marital status? (Single, Married, Divorced, Widowed, Domestic Partner)`,
    answer: ''
  },
  Q4: {
    question_details: `Do you have any children? (Yes, No)`,
    answer: ''
  },
  Q5: {
    question_details: `What is your partner's full legal name?`,
    answer: ''
  },
  Q6: {
    question_details: `What is your partner's birth year?`,
    answer: ''
  },
  Q7: {
    question_details: `How many children do you have?`,
    answer: ''
  },
  Q8: {
    question_details: `Do you or your partner (if not single) own your primary residence? (Yes, No)`,
    answer: ''
  },
  Q9: {
    question_details: `Is your primary residence also your preferred mailing address? (Yes, No)`,
    answer: ''
  },
  Q10: {
    question_details: `What is the approximate value of your real estate?`,
    answer: ''
  },
  Q11: {
    question_details: `Do you own any other type of real estate (e.g., vacation, rental, etc.)? (Yes, No)`,
    answer: ''
  },
  Q10_2: {
    question_details: `What is the approximate value of your real estate?`,
    answer: ''
  },
  Q12: {
    question_details: `Do you want to buy real estate in the future? (Yes, No)`,
    answer: ''
  },
  Q13: {
    question_details: `Do you have any financial goals already created? (Yes, No)`,
    answer: ''
  },
  Q10_3: {
    question_details: `What is the approximate value of your primary residence or other real estate?`,
    answer: ''
  }
})
// Step is used to determine what page should be displayed to the user
const step = ref(1)

// Logic to decide what page to go to when clicking next
// ToDo: Try using an array of available steps depending on the dependencies?
function nextStep() {
  // Validate that the required fields are filled to move on
  if (validateStep(step.value)) {
    if (step.value === 1 && form.value.Q3.answer.toLowerCase() === 'married') {
      step.value = 2
    } else if (step.value === 1 && form.value.Q4.answer === 'Yes') {
      step.value = 3
    } else if (step.value === 1) {
      step.value = 4
    } else if (step.value === 2 && form.value.Q4.answer === 'Yes') {
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
    alert('All fields have not been filled out!')
  }
}

// Logic to decide what page to go to when clicking previous
// ToDo: Try using an array of available steps depending on the dependencies?
function previousStep() {
  if (step.value === 2) {
    step.value = 1
  } else if (step.value === 3 && form.value.Q3.answer.toLowerCase() === 'married') {
    step.value = 2
  } else if (step.value === 3) {
    step.value = 1
  } else if (step.value === 4 && form.value.Q4.answer === 'Yes') {
    step.value = 3
  } else if (step.value === 4 && form.value.Q3.answer.toLowerCase() === 'married') {
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
    } else if (!form.value.Q12.answer || !form.value.Q13.answer) {
      return false
    }
  } else if (step === 6 && !form.value.Q10_3.answer) {
    return false
  }
  return true
}
</script>

<template>
  <div class="form-page">
    <div v-if="step === 1">
      <h1>Personal Information</h1>
      <InputText v-model="form.Q1.answer" :label="form.Q1.question_details" />
      <InputText v-model="form.Q2.answer" :label="form.Q2.question_details" />
      <InputText v-model="form.Q3.answer" :label="form.Q3.question_details" />
      <InputYesNo v-model="form.Q4.answer" :label="form.Q4.question_details" />
      <PrevNextButtons :next="true" @nextStep="nextStep" @prevStep="previousStep" />
    </div>
    <div v-if="step === 2">
      <h1>Partner Information</h1>
      <InputText v-model="form.Q5.answer" :label="form.Q5.question_details" />
      <InputText v-model="form.Q6.answer" :label="form.Q6.question_details" />
      <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
    </div>
    <div v-if="step === 3">
      <h1>Children Information</h1>
      <InputText v-model="form.Q7.answer" :label="form.Q7.question_details" />
      <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
    </div>
    <div v-if="step === 4">
      <h1>Primary Residence Information</h1>
      <InputYesNo v-model="form.Q8.answer" :label="form.Q8.question_details" />
      <div v-if="form.Q8.answer === 'Yes'">
        <InputYesNo v-model="form.Q9.answer" :label="form.Q9.question_details" />
        <InputText v-model="form.Q10.answer" :label="form.Q10.question_details" />
      </div>
      <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
    </div>
    <div v-if="step === 5">
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
    <div v-if="step === 6">
      <h1>Real Estate Value</h1>
      <InputText v-model="form.Q10_3.answer" :label="form.Q10_3.question_details" />
      <PrevNextButtons :prev="true" :next="true" @nextStep="nextStep" @prevStep="previousStep" />
    </div>
    <div v-if="step === 7">
      <AnswerPreview :answers="form" />
      <PrevNextButtons :prev="true" @nextStep="nextStep" @prevStep="previousStep" />
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

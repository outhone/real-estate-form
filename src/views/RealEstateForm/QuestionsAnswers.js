// This object is the default answers for the form
const QuestionsAnswers = {
  Q1: {
    id: 'Q1',
    question_details: `What is your full legal name?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q2: {
    id: 'Q2',
    question_details: `What is your birth year?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q3: {
    id: 'Q3',
    question_details: `What is your marital status? (Single, Married, Divorced, Widowed, Domestic Partner)`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q4: {
    id: 'Q4',
    question_details: `Do you have any children? (Yes, No)`,
    question_dependencies: { yes: 'Q7', no: '' },
    answer: ''
  },
  Q5: {
    id: 'Q5',
    question_details: `What is your partner's full legal name?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q6: {
    id: 'Q6',
    question_details: `What is your partner's birth year?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q7: {
    id: 'Q7',
    question_details: `How many children do you have?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q8: {
    id: 'Q8',
    question_details: `Do you or your partner (if not single) own your primary residence? (Yes, No)`,
    question_dependencies: { yes: 'Q9', no: 'Q11' },
    answer: ''
  },
  Q9: {
    id: 'Q9',
    question_details: `Is your primary residence also your preferred mailing address? (Yes, No)`,
    question_dependencies: { yes: 'Q10', no: 'Q10' },
    answer: ''
  },
  Q10: {
    id: 'Q10',
    question_details: `What is the approximate value of your real estate?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q11: {
    id: 'Q11',
    question_details: `Do you own any other type of real estate (e.g., vacation, rental, etc.)? (Yes, No)`,
    question_dependencies: { yes: 'Q10_2', no: 'Q12' },
    answer: ''
  },
  Q10_2: {
    id: 'Q10_2',
    question_details: `What is the approximate value of your real estate?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q12: {
    id: 'Q12',
    question_details: `Do you want to buy real estate in the future? (Yes, No)`,
    question_dependencies: { yes: 'Q13', no: '' },
    answer: ''
  },
  Q13: {
    id: 'Q13',
    question_details: `Do you have any financial goals already created? (Yes, No)`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  },
  Q10_3: {
    id: 'Q10_3',
    question_details: `What is the approximate value of your primary residence or other real estate?`,
    question_dependencies: { yes: '', no: '' },
    answer: ''
  }
}
export default QuestionsAnswers

// https://on.cypress.io/api

describe('Routers are functional', () => {
  it('visits the app root url with login', () => {
    cy.visit('/')
    cy.contains('h1', 'Login')
  })

  it('Sign in to go to form', () => {
    cy.visit('/')
    cy.get('#login-btn').click()
    cy.url().should('include', '/form')
    cy.contains('h1', 'Personal Information')
  })
})

describe('Form validates that displayed fields must be completed to continue', () => {
  beforeEach(() => {
    cy.visit('/form')
  })

  it('Personal Information fields must be filled out to continue', () => {
    cy.contains('h1', 'Personal Information')

    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')
    cy.get('#Q1').type('John Smith')
    cy.get('#form-error-msg').should('not.exist')

    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')
    cy.get('#Q2').type('1920')
    cy.get('#form-error-msg').should('not.exist')

    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')
    cy.get('#Q3 [type="radio"]').first().check()
    cy.get('#form-error-msg').should('not.exist')

    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')
    cy.get('#Q4 [type="radio"]').first().check()
    cy.get('#form-error-msg').should('not.exist')

    cy.get('#Q2').clear()
    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')

    cy.get('#Q2').type('1920')
    cy.get('#form-error-msg').should('not.exist')
    cy.get('#next-btn').click()

    cy.contains('h1', 'Personal Information').should('not.exist')
    cy.get('#Q1').should('not.exist')
  })

  it('Partner information fields must be filled out to continue', () => {
    cy.contains('h1', 'Personal Information')
    cy.get('#Q1').type('John Smith')
    cy.get('#Q2').type('1975')
    cy.get('#Q4 [type="radio"]').first().check()
    cy.get('#Q3 input[value="Married"]').check()
    cy.get('#next-btn').click()

    cy.contains('h1', 'Personal Information').should('not.exist')
    cy.get('#Q1').should('not.exist')
    cy.contains('h1', 'Partner Information')

    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')
    cy.get('#Q5').type('Jane Smith')
    cy.get('#form-error-msg').should('not.exist')

    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')
    cy.get('#Q6').type('1980')
    cy.get('#form-error-msg').should('not.exist')

    cy.get('#next-btn').click()
    cy.contains('h1', 'Partner Information').should('not.exist')
    cy.get('#Q5').should('not.exist')
  })

  it('Children information fields must be filled out to continue', () => {
    cy.contains('h1', 'Personal Information')
    cy.get('#Q1').type('John Smith')
    cy.get('#Q2').type('1975')
    cy.get('#Q3 input[value="Single"]').first().check()
    cy.get('#Q4 input[value="Yes"]').check()

    cy.get('#next-btn').click()

    cy.contains('h1', 'Personal Information').should('not.exist')
    cy.get('#Q1').should('not.exist')
    cy.contains('h1', 'Children Information')

    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')
    cy.get('#Q7').type('2')
    cy.get('#form-error-msg').should('not.exist')

    cy.get('#next-btn').click()
    cy.contains('h1', 'Children Information').should('not.exist')
    cy.get('#Q7').should('not.exist')
  })

  it('Primary Residence information fields must be filled out to continue - NO', () => {
    cy.contains('h1', 'Personal Information')
    cy.get('#Q1').type('John Smith')
    cy.get('#Q2').type('1975')
    cy.get('#Q3 input[value="Single"]').check()
    cy.get('#Q4 input[value="No"]').check()

    cy.get('#next-btn').click()

    cy.contains('h1', 'Personal Information').should('not.exist')
    cy.get('#Q1').should('not.exist')
    cy.get('#Q5').should('not.exist')
    cy.get('#Q7').should('not.exist')

    cy.contains('h1', 'Primary Residence Information')
    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')

    cy.get('#Q8 input[value="No"]').check()
    cy.get('#next-btn').click()
    cy.contains('h1', 'Primary Residence Information').should('not.exist')
    cy.get('#Q8').should('not.exist')
  })

  it('Primary Residence information fields must be filled out to continue - YES', () => {
    cy.contains('h1', 'Personal Information')
    cy.get('#Q1').type('John Smith')
    cy.get('#Q2').type('1975')
    cy.get('#Q3 input[value="Single"]').check()
    cy.get('#Q4 input[value="No"]').check()
    cy.get('#next-btn').click()

    cy.get('#Q8 input[value="Yes"]').check()
    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')

    cy.get('#Q9 input[value="Yes"]').check()
    cy.get('#form-error-msg').should('not.exist')
    cy.get('#next-btn').click()
    cy.get('#form-error-msg').should('exist')

    cy.get('#Q10').type('100,000')
    cy.get('#form-error-msg').should('not.exist')
    cy.get('#next-btn').click()
    cy.get('#Q8').should('not.exist')
    cy.get('#Q9').should('not.exist')
    cy.get('#Q10').should('not.exist')
  })
})

/*
describe('Partner information fields are cleared when user updates marital status', () => {

})

describe('Number of children field is cleared when user updates has children question', () => {

})
*/

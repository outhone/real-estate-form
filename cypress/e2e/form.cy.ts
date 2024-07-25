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
    cy.visit('/')
  })
})

// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/login')
    cy.contains('span', 'feyre')
  })
})

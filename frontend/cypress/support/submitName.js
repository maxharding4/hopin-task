Cypress.Commands.add('submitName', (name) => {
  cy.visit(Cypress.config().baseUrl)
  cy.get('#name').clear()
  cy.get('#name').type(name)
  cy.get('input[value=Submit]').click()
})
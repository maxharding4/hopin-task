Cypress.Commands.add('selectCustomer', (customer) => {
  cy.get('[data-testid=customer-link').as('customer-link')
  cy.get("@customer-link").contains(customer).click()
})
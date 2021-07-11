Cypress.Commands.add('checkCustData', () => {

  cy.request({
    method: 'POST', url: Cypress.env('backend'), body: {
      name: 'name'
    }
  }).then(
    (response) => {

      var custName = response.body.customers[0].name;
      var custEmployees = response.body.customers[0].employees;
      var custSize = response.body.customers[0].size;
      //By adding the following two variables, if the customer has no contact info then the test will fail.  This will need to be refactored to allow for this scenario.
      var custContactName = response.body.customers[0].contactInfo.name;
      var custContactEmail = response.body.customers[0].contactInfo.email;

      expect(response.status).to.eq(200)
      cy.get('[data-testid=customer-name]').contains(custName).should('be.visible')
      cy.get('[data-testid=customer-employees]').contains(custEmployees).should('be.visible')
      cy.get('[data-testid=customer-size]').contains(custSize).should('be.visible')
      cy.get('[data-testid=customer-contact-info]').contains(`${custContactName} (${custContactEmail})`).should('be.visible')

    }
  )

})
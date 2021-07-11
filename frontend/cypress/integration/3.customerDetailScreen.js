import { custWithContactDetails, custWithoutContactDetails } from "../support/testData/customers";

describe('The customer detail screen', () => {
  const name = "Max";

  beforeEach(() => {
    //Using a pre defined command here to save time for maintainability 
    cy.submitName(name)
    //Setting aliases here for the elements used in this spec which helps with maintainability once scaled
    cy.get('[data-testid=welcome-message').as('welcome-message')
    cy.get('[data-testid=customer-link').as('customer-link')
    cy.get('[data-testid=customer-table').as('customer-table')
  })

  it('Customer detail screen - Page loads where a customer has contact details', function () {
    cy.get("@customer-link").contains(custWithContactDetails.company).click()
    cy.get('p').contains(custWithContactDetails.contact).should('be.visible')
  })

  it('Customer detail screen - Page loads where a customer does not have contact details', function () {
    cy.get("@customer-link").contains(custWithoutContactDetails.company).click()
    //Assuming here that the text would be within a <p> tag
    cy.get('p').contains('No contact info available').should('be.visible')
  })

  it('Customer detail screen - Return to customer list screen with back to list button', function () {
    const customer = String(custWithContactDetails.company);

    //Using a pre defined command here to allow for reusability and maintainability 
    cy.selectCustomer(customer)
    cy.get('input[value="Back to the list"]').as('back-button')
    cy.get('@back-button').should('be.visible')
    cy.get('@back-button').click()
    cy.get('@customer-table').should('be.visible')
  })

  it('Customer detail screen - Correct customer data is displayed', function () {
    cy.get('@customer-link').first().click()
    //This check will fail if the customer has no contact info.  Command needs to be refactored.
    cy.checkCustData()
  })

  it('Customer detail screen - ')

})

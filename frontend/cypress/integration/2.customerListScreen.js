const dayjs = require('dayjs')

describe('The customer list screen', () => {
  const name = "Max";
  var customerCount;

  beforeEach(() => {
    //Using a pre defined command here to save time for maintainability 
    cy.submitName(name)
    //Setting aliases here for the elements used in this spec which helps with maintainability once scaled
    cy.get('[data-testid=customer-table').as('customer-table')
    cy.get('[data-testid=customer-link').as('customer-link')
    cy.get('[data-testid=welcome-message').as('welcome-message')
    // Get the number of customers as per the API response
    cy.request({
      method: 'POST', url: Cypress.env('backend'), body: {
        name: name
      }
    }).then(
      (response) => {
        customerCount = response.body.customers.length;
      }
    )
  })

  it('Customer list screen - Name and date displayed in welcome message', function () {
    const todaysDate = dayjs().format('ddd MMM DD YYYY')

    cy.get('@welcome-message').should('contain', 'Hi ' + name + '. It is now ' + todaysDate)
  })

  it('Customer list screen - # of customers matches API response', function () {
    cy.get('@customer-table').should('be.visible')
    cy.get('@customer-link').should('have.length', customerCount)
  })

})

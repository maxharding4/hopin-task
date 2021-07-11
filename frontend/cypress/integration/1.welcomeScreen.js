describe('The Customer App welcome screen', () => {
  beforeEach(() => {
    cy.visit(Cypress.config().baseUrl)
    //Setting aliases here for the elements used in this spec which helps with maintainability once scaled
    cy.get('[data-testid=page-title]').as('page-title')
    cy.get('[data-testid=name-prompt]').as('name-prompt')
    cy.get('input#name').as('input--name')
    cy.get('input[value=Submit]').as('button--submit')
  })

  it('Welcome screen - Page displays the expected elements', function () {
    cy.get('@page-title').contains('Welcome to Customer App')
    cy.get('@name-prompt').contains('Please provide your name')
    cy.get('@input--name').should('be.visible')
    cy.get('@input--name').should('be.empty')
    cy.get('@button--submit').should('be.visible')
  })

  it('Welcome screen - Alert if name field empty on submission', function () {
    cy.get('@input--name').clear()
    cy.get('@input--name').should('be.empty')
    cy.get('@button--submit').click()
    cy.on("window:alert", (text) => {
      expect(text).to.equal("Please provide your name");
    });
  })

  it('Welcome screen - Successfully submitting name', function () {
    const name = 'Max';

    cy.get('@input--name').type(name)
    cy.get('@button--submit').click()
    cy.get('@name-prompt').should('not.exist')
  })
})
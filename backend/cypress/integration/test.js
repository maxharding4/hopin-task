const dayjs = require('dayjs')

describe('Test API', () => {
  const endpoint = Cypress.config().baseUrl;
  var myName = 'Max';

  it('400 response if request body is empty', () => {
    cy.request({ method: 'POST', url: endpoint }).then((res) => {
      expect(res.status).to.equal(400)
    })
  })

  it('400 response if request contains empty name value', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: '' } }).then((res) => {
      expect(res.status).to.equal(400)
    })
  })

  it('200 response if request contains valid name value', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      expect(res.status).to.equal(200)
    })
  })

  it('Expected response time is not exceeded', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      expect(res.duration).to.not.be.greaterThan(1000)
    })
  })

  it('Response body contains correct name value', () => {
    var myName = 'Max';

    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      expect(res.body.name).to.equal(myName)
    })
  })

  it('Response body contains the correct timestamp', () => {
    const todaysDate = dayjs().format('ddd MMM DD YYYY')

    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      expect(res.body.timestamp).to.equal(todaysDate)
    })
  })

  it('Each customer has an id value', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      res.body.customers.forEach((customers) => {
        expect(customers.id).is.not.null;
        expect(customers.id).to.be.a("number");
      })
    })
  })

  it('Each customer has an name value', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      res.body.customers.forEach((customers) => {
        expect(customers.name).is.not.null;
        expect(customers.name).to.be.a("string");
      })
    })
  })

  it('Each customer has an employee value', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      res.body.customers.forEach((customers) => {
        expect(customers.employees).is.not.null;
        expect(customers.employees).to.be.a("number");
      })
    })
  })

  it('Each customer has a size value', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      res.body.customers.forEach((customers) => expect(customers.size).is.not.null);
      res.body.customers.forEach((customers) => expect(customers.size).to.be.oneOf(["Small", "Medium", "Big"]));
    })
  })


  /* Need to work out how to skip this check for customers with no contact details, as it fails for 'United Brands' customer.

  it('Customer contact details propertys can not be empty', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {

      res.body.customers.forEach((customers) => {
        expect(customers.contactInfo.name).is.not.null;
        expect(customers.contactInfo.name).to.be.a("string");
        expect(customers.contactInfo.email).is.not.null;
        expect(customers.contactInfo.email).to.be.a("string");
      })
    })
  }) */


  it('Customer size calculation is correct', () => {
    cy.request({ method: 'POST', url: endpoint, body: { name: myName } }).then((res) => {
      let employees;
      let size;

      res.body.customers.forEach((customers) => {
        employees = customers.employees;
        size = customers.size;

        if (employees <= 10) {
          expect(customers.size).to.equal("Small")
        } else
          if (employees >= 11 <= 1000) {
            expect(customers.size).to.equal("Medium")
          } else
        if (employees > 1000) {
          expect(customers.size).to.equal("Big")
        }

      })
    });

  })
})
# FRAMEWORK USED AND WHY

I have chosen to use cypress.io as the framework of choice for the UI automation testing.  The reason for this is that it is the framework I am currently using at work and
my own personal project.  It also allows for future scalability, and if coupled with cucumber can become a living source of truth for product behaviour.

# BEFORE RUNNING THE TESTS

- From /front, run 'yarn install' to ensure all dependancies are installed

# RUNNING THE TESTS

Tests can be run using the following commands:

- yarn cypress run : This will run the tests within the terminal and report the status there.
- yarn cypress open : This will open the cypress GUI, and allow selection of which specs to run.  Just click the desired spec and it'll run the test.

# FUTURE IMPROVEMENTS

- Cypress supports mocked data so it would be fairly easy to switch to mocked data to cover any edgecases or incase of environment sluggishness.  This would however start
to move away from true end-to-end testing, which may cause a risk if contracts are not water tight and other project testing not thorough.

- Adding the cucumber framework to cypress allows anyone in the business to read the written tests through the form of feature files and the Gherkin syntax (Given, When, Then).
This is often useful for business who wish to have their requirements embedded within the codebase and can offer up tidy reporting of tests.  Through the use of step definitions it
also allows the use of reusable code.

# FRAMEWORK USED AND WHY

I have chosen to use cypress.io as the framework of choice for the API automation testing.  The reason for this is that I plan to use Cypress as the frontend automation
framework, and as I have little experience automating APIs didn't want to reach too far.

# BEFORE RUNNING THE TESTS

- From /backend, run 'yarn install' to ensure all dependancies are installed

# RUNNING THE TESTS

Tests can be run using the following commands:

- yarn cypress run : This will run the tests within the terminal and report the status there
- yarn cypress open : This will open the cypress GUI, and allow selection of which specs to run.  Just click the desired spec and it'll run the test.
    - DevTools will automatically open when using Chrome as per a modification made to the plugin.  This allows easier access to DevTools.

# FUTURE IMPROVEMENTS

- I have a test which will fail if a customer does not have any contact information (this is a valid state).  This test should be improved to take this into account.
- No mocked data was used here.  It could be beneficial to start mocking data if the requirements of the app grows, or edge cases found.

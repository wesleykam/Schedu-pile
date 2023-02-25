# Unit Testing
We are using the Jest and React Testing Libraries to implement our tests.

Unit tests for our frontend are located in `./frontend/__test__`. The subdirectories under `__test__` mirror those under `src`, so to find a unit test for 
`src/components/Buttons/CreateGroupButton.js`, navigate to `__test__/components/Buttons/CreateGroupButton.test.js`.

To run our unit tests, run `cd frontend` and `npm test`.

## Current Completed Unit Tests:
- CreateGroupButton.test.js
- AuthButton.test.js
- AppNavBar.test.js
- DefaultLayout.test.js


# Integration Testing
We are using the Jest and React Testing Libraries to implement our integration tests.

Our integration tests are meant to test the acceptance criteria for user stories. Integrations tests are located in `./frontend/__test__/Integration`. 

To run our integration tests, run `cd frontend` and `npm test`.

## Current Completed Integration Tests:
- NavigateGroups.test.js tests the user flow and functionality for user stories #38 and #18 

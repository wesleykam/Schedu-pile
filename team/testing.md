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

## Future Plans for Unit Tests
Our future plans for unit tests is to eventually create unit tests for only our components that are integral or important for user functionality. This may include things like buttons and forms that manipulate our groups or navigational components that direct users between pages. 

# Integration Testing
We are using the Jest and React Testing Libraries to implement our integration tests.

Our integration tests are meant to test the acceptance criteria for user stories. Integrations tests are located in `./frontend/__test__/Integration`. 

To run our integration tests, run `cd frontend` and `npm test`.

## Current Completed Integration Tests:
- NavigateGroups.test.js tests the user flow and functionality for user stories #38 and #18. This test included components spanning from google authorization, such as `AuthButton.js`, to navigation, like `AppNavBar.js` and `GroupCard.js`, to group manipulation, like `memberList.js`.

## Future Plans for Integration Tests:
We likely do not have any future plans for integration testing because most of the integral parts of our app have already been tested. The integration tests also take much more effort than unit tests and we want to focus more on implementing more features for our users.

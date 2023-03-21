# Team Contributions

# Dylan Contributions
Dylan contributed to 61/112 PRs completed. Of those 61, 37 were PR reviews and 24 were worked on by Dylan.

## Backend and Frontend
- [Set up authentication on the backend and frontend using Google OAuth with Luke](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/55)
- [Find nonoverlapping free times for all users in a Group and create a form for it](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/180)
- [Allow users to create group events based on nonoverlapping free times and prevent duplication of created group events with Luke](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/203) 
- [Set up admin users for groups on the backend and frontend](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/170)

## Backend
- [Create a caching system for Group events and User events to ensure fast loading times](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/136)
- [Update a single Group's events on page refresh or entering Group page](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/117)
- [Retrieve a single user's groups](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/100)
- [Return group information to user for display in Groups page](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/106)
- [Add admins to Group model](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/162)
- [Get rid of duplicate groupIDs in user model and groupMembers in group model](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/101)
- [Reject nonvalid event times](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/132)
- [Fix timezone offset error on production deployment](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/212)

## Frontend
- [Implemented calendar events retrieval from the backend](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/88)
- [Refactor all backend fetches for ease of use](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/169)
- Ensured logged-in users and not logged-in users got a different UI (Most of these also involve some backend components but they are mostly frontend)
  - [Redirect users to "/" if not logged in](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/92)
  - [Redirect user if not part of a group](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/113)
  - [Navbar shows group and create groups only if logged in](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/90)
  - [Navbar "Home" link changes depending on auth status](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/99)
- [Created the Groups component that displays a user's groups](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/31)
- [Prevent users from spamming refresh buttons](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/209)
- [Try it now button goes to Google login](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/91)
- [Change page color to Schedu-pile blue](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/224)
- [Changed delete group button to red](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/199)

# Luke Contributions

## Backend and Frontend
- Created a Google Cloud project to enable google OAuth and Google Calendar read/write APIs in our app
- [Moved user authentication using Google OAuth to backend with a new frontend with Dylan](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/55)
- [Created a button on the frontend to delete users from a group in the backend](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/118)
- [Allowed users to hide certain group member's events by preventing them from being returned from backend](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/184)
- [Allowed users to create group events based on open group time slots and fixed new event form to create events of a correct duration with Dylan](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/203)

## Frontend
- [Created initial wireframe of our web app with Dylan](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/16)
- [Created a sign-in button on our frontend that redirects users to Google sign-in page](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/41)
- [Created the Group Page component that displays members of a group and allowed users to edit groups via edit button (add/delete/etc)](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/93)
- [Refactored GroupPage.js and prevented users from deleting group admins](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/178)
- [Changed the Create Group page from its own page to a modal/ prevented users from spamming submit](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/227)

## Backend
- [Allow our backend to have access to Google Calendar APIs after user logs in](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/47)
- [Created caching system in the backend for user and group events to make our pages load faster](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/136)
- [Prevent hidden events in a group's calendar from affecting their scheduling a new event form](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/190)
- [Implemented backend API call to google calendar to create events on a user's google calendar](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/203)

## Testing
- [Created unit testing for our CreateGroupButton component](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/147)
- [Created unit testing for our AuthButton component](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/149)
- [Created unit testing for AppNavBar and DefaultLayout components/ integration testing for user stories #38 and #18](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/pull/164)
- [Documented testing implementation details, plans, and completed tests in ./team/testing.md](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/blob/main/team/testing.md)

# Cyril Contributions

Here is a list of issues that I did (not an exhaustive list, just more notable ones):

[Create "Create Page" component for creating groups](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/28)

[Add group name when on group's page](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/133)

[Creating and implementing API to allow users to create groups](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/70)

[User navigation between pages](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/48)

[Have users navigate to groups page upon login](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/82)

[Allow users to leave group](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/222)

[Adding events manually to calendar](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/146)

[Add user-created events to group calendar](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/196)

[Frontend to allow users to create events](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/150)

[Fix frontend alignment of group page](https://github.com/ucsb-cs148-w23/project-t10-weeklyschedulecompiler/issues/158)

In addition, contributed to various other smaller tasks such as fixing frontend/backend bugs and other smaller errors, planning out user stories and issues, scribing/ logging daily scrums, etc...


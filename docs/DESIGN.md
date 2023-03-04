# System Architecture Overview

![System Architecture Overview Schedu-pile drawio](https://user-images.githubusercontent.com/77405374/222847080-d07c48f4-1810-42b6-832d-3e96795a4b21.png)

## Explanation:
Users interact with the frontend from which they can log in. Once logged in, they can communicate with the backend to fetch events and calendar events information from the backend. In the backend, the server is in charge of accepting requests and sending back responses to the frontend. The server will retrieve data from the database. If the user is new or requests a refresh on calendar events, the server will retrieve calendar events from Google Calendar using their API.

## Frontend:
Our frontend is a simple React app that makes use of additional libraries to simplify our processes. Some notable libraries we make use of are react-bootstrap, react-dom, and react-router-dom. In total, our frontend is organized roughly into 5 different folders: components, pages, layouts(there is only one), style, and lib. All of our frontend elements, things like pages, components, layouts, largely make use of react-bootstrap, with the one major exception being our calendar. We have organized all of our components according to their use and related uses, such as buttons, forms, etc. We store a large majority of our fetch functions, the functions we use to communicate with our backend, in a folder called lib.

## Backend: 
Our backend runs on express on Node JS and communicates with the Google Calendars API and our MongoDB database. All backend functionality is organized into two main modules: those related to user groups and those related to users. Our groupController is where a bulk of the functionality of the backend lies. From here, we are able to update group events and create, read, update, and delete groups. The userController is where we handle all user-only related functionality, such as updating user events.

In addition to user and group related functionality, our backend handles all authentication using the passportjs library. We use Google OAuth to handle all authentication and to identify the user.

## Major Decisions
Up until now, we have had 3 crucial meetings where we made important team decisions that dictated the direction of our app:
1. During Lect03 Sprint01, we made the decision to swap from a cookbook meal prep planner to a weekly schedule compiler, which ended up becoming Schedu-pile. Though we mainly made the decision separately through our Slack channel, this was our first meeting where we came together to agree that we would now be working on a weekly schedule compiler.
2. During Lect05 Sprint01, the original wireframe of the app was presented, from which our team ended up designing our entire app around. This is also when we came to decide on what functionalities we might implement by the MVP by what pages were available in our initial wireframe.
3. During Retro02, we decided on the final features that we would try to implement before the final code freeze, which were creating admin users and invites

# User Flow

## High-level Overview of User Flow
1. Enter website
2. Check out about page or home page
3. Log in

From here, you could do many things, such as:

4. Check home page for upcoming events

or

4. Create a group and navigate to the group page
5. Add member emails
6. Check what times people are available

or (if you are a normal user in the group)

4. Go to Groups page and select a group
5. Check what times people are available

or (if you are the admin user in the group)

4. Add/Remove members
5. Check available times

or (if you are the admin user and the group has dissolved)

4. Click delete group and navigate to Groups page

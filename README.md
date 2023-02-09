# Weekly Schedule Compiler

Compile a group's weekly schedules to find times where everyone is available or create a part-time schdule that takes into account everyone's availabilities.

# Tech Stack

MongoDB, Express, React, Node, Heroku

# Description

Our app aims to provide useful tools for groups to compile their schedules and work around them. A few tools that we are going for are giving the groups the ability to find times where everyone is available or create a part-time schedule that takes into account everyone's availabilities. Users will be greeted with our home page where they will be able to log in using Google. They will then be directed to their "Profile" where they will be able to view the scheduling groups that they are in, select a group that they want to view, or create a new group entirely. When viewing a group they will be able to see the compiled schedules of all members in the group and perform actions using the tools mentioned previously.

# User Roles

Our app will have 2 roles, Group Leaders and Group Members. In some cases, such as in a work environment, there will be a need for group leader who has special admin priviledges like adding new members or using the tools. Everyone else in the group will simply be a member who can view the schedule.

List of members:

- Wesley Kam (wesleykam)
- Cyril Wang(cyril-wang)
- Dylan Chung (DylanC1222)
- Maya Ma (maya-maye)
- Tianyu Sun (tianyusun7)
- Luke Li (lukewli)

# Installation

## Prerequisites

Make sure to install

- [git](https://git-scm.com/downloads)
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Dependencies

Frontend

- react
- react-bootstrap and bootstrap
- react-dom and react-router-dom

Backend

- cookie-parser
- cookie-session
- cors
- dotenv
- express
- express-session
- googleapis
- mongoose
- passport
- passport-google-oauth2

## Installation Steps

1. git clone this repository (if you have ssh setup: git clone git@github.com:ucsb-cs148-w23/project-t10-weeklyschedulecompiler.git)
2. cd project-t10-weeklyschedulecompiler
3. npm install -C ./frontend && npm install -C ./backend
4. touch ./backend/.env or create .env file some other way and set environment variables (PORT, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL, MONGO_URI)

To run locally: 
1. Create two total terminals at root directory
2. In one terminal: cd backend && node server.js
3. In the other terminal cd frontend && npm start
4. Everything should be complete

## Functionality

1. Login using your Google account
2. From the home page, you should be able to see your Google Calendar events
3. From here, there are two paths you can take: create a group or check which groups you are part of

 - If you want to create a group, click create a group in the navbar and input any necessary information, such as name, description, and group members
 - If you want to see the groups you are a part of, click groups in the navbar. From here, you can also click create a group. For additional details on your group, click on a group card
 - Once you're in a group card, if you are the owner of the group, you will be able to edit details. Otherwise, you can see all group details, such as name, description, and fellow members.

## Known Problems

 - Currently, the group calendar page has trouble loading all members' calendar events occasionally.

## Contributing

1. Fork it! Create your feature branch: git checkout -b my-new-feature
2. Commit your changes: git commit -m 'Add some feature'
3. Push to the branch: git push origin my-new-feature
4. Submit a pull request

License: MIT License

# System Architecture Overview

![System Architecture Overview Schedu-pile drawio](https://user-images.githubusercontent.com/77405374/222847080-d07c48f4-1810-42b6-832d-3e96795a4b21.png)

## Explanation:
Users interact with the frontend from which they can log in. Once logged in, they can communicate with the backend to fetch events and calendar events information from the backend. In the backend, the server is in charge of accepting requests and sending back responses to the frontend. The server will retrieve data from the database. If the user is new or requests a refresh on calendar events, the server will retrieve calendar events from Google Calendar using their API.

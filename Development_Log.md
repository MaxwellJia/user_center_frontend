# Development Log

## Project Goals
Create a front-end used for the cam fall project. This platform allows users to register, login and do relative activities.

## Front end interaction with back end
The front end needs to send a request to the back end to get data/perform operations.
How to make requests: The front end uses ajax to request the back end

### Front-end request libraries and encapsulation relationships
axios encapsulates ajax
request is another encapsulation of the ant design project
Trace request source code: used umi plug-in, requestConfig configuration file
Add RequestConfig in app.tsx to be the prefix of all requests in api.tsx http://localhost:8080


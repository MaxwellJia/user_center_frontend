# Development Log

## Project Goals
Create a front-end used for the cam fall project. This platform allows users to register, login and do relative activities.

## Delete Redundant Files and Modify Login User Face
Modify to my own websites and some logo in the login page

## Front End Interaction with Back End
The front end needs to send a request to the back end to get data/perform operations.
How to make requests: The front end uses ajax to request the back end

### Front-end Request Libraries and Encapsulation Relationships (AntDesign Internal)
axios encapsulates ajax
request is another encapsulation of the ant design project
Trace request source code: used umi plug-in, requestConfig configuration file

Operation: Add RequestConfig in app.tsx to be the prefix of all requests in api.tsx http://localhost:8080

## Agent (AntDesign Internal)
Forward Proxy: User(Frontend)-Agent-Backend
Reverse Proxy: User(Frontend)-Agent-Many Server(different addresses)
Node.js, Nginx servers.......
It's able to access backend now
Operations: 
1. agent modifications in proxy(dev api, target)
2. every API should have /api/ prefix
3. delete baseURL in app.tsx


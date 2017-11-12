# Project-Management-App-with-Chatting-and-Notification

In this app, Admin will provide information of projects and members in the project
  1. Each project will have a Lead, members & chatting screen.
  2. Only members can see their projects and chat in project group
  3. Every new member added in project will get notification as well as project members of new member added
  4. Session & chatting data will be stored in redis for fast retrieval.

## Install the three modules :

This application is made with Node.js, Express, Socket.io, redisDB, BackboneJS and Handlebars.
- Go to the project directory and use this command to install dependancies: 

- npm install

## How to use :

- npm start or node server.js / nodemon server.js
- Go to IP:port from any (recent) navigator to start App !

## Building Docker images

- Syntax: sudo docker build -t <image_name> .
- Example: sudo docker build -t chat .

## Run Docker Image

- You can see your docker images by using this command => sudo docker images
- syntax: docker run -p <new_port>:<existing_port> <image_name>
- Example: docker run -p 80:8080 chat

## How To Use Docker Instance

- Go to IP:port from any (recent) navigator to start App !

### Credits

Creator : [Rajat Kesharwani] (https://github.com/salinsunny2)


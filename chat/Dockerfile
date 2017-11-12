FROM node:boron

# Create app directory
WORKDIR /Project-Management-App-with-Chatting-and-Notification/chat

# Install app dependencies
COPY package.json .
# copy package-lock.json
# COPY package.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 8081
CMD [ "npm", "start" ]


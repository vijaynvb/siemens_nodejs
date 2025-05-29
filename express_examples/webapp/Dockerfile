# Use an official Node.js runtime as the base image
# ubuntu 20.04 os, node 18, npm 8
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your Node.js app listens on
EXPOSE 2000

# Command to run your Node.js application
CMD ["node", "index.js"]
# Use an official Node runtime as a parent image
FROM node:18 AS builder

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install ffmpeg in the container
RUN apt-get update && apt-get install -y ffmpeg

# Install any needed packages specified in package.json
RUN npm install

# Copy app source inside the docker image
COPY . .

# Make port 8080docker run -e PORT=8080 -p 8080:8080 your-image-name available outside this container
EXPOSE 8080

# Define the command to run your app using CMD (only one CMD allowed)
CMD [ "npm", "start" ]

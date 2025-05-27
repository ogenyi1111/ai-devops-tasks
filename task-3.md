# Use an official Node.js runtime as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your app
CMD ["node", "app.js"]


docker build -t my-node-app .
docker run -p 3000:3000 my-node-app







# Use Node 18 as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 3000
EXPOSE 3000

# Start the app
CMD ["npm", "start"]


docker build -t my-node-app .
docker run -p 3000:3000 my-node-app


"scripts": {
  "start": "node app.js"
}

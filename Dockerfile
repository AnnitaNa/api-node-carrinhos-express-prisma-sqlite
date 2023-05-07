# Use a Node.js base image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the application
#RUN npm run build

# Expose port 3000 for the API
EXPOSE 3000

# Start the API server
CMD ["npm", "run", "dev"]


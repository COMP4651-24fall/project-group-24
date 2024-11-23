# Stage 1: Build the React application
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Expose port 80 to access the application
EXPOSE 3000

CMD ["npm", "start"]
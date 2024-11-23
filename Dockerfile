# Stage 1: Build the React application
FROM node:latest AS build

# Set the working directory
WORKDIR /app

# Accept environment variables as build arguments
ARG NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Set the environment variable for Next.js at build time
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Expose port 80 to access the application
EXPOSE 3000

ENV PORT=3000
ENV NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CMD ["npm", "start"]
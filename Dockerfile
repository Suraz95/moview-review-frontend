# Step 1: Build the React app using Vite
# Use official Node.js image as the build environment
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Set the environment variable for the build process
ARG VITE_BASE_URL
RUN echo "VITE_BASE_URL=$VITE_BASE_URL" >> .env

# Build the React app for production
RUN npm run build

# Step 2: Serve the app using a simple HTTP server
# Use the official Node.js image for serving the app
FROM node:18-alpine AS production

# Install 'serve' to serve the built files
RUN npm install -g serve

# Set the working directory for serving
WORKDIR /app

# Copy the build output from the previous build stage
COPY --from=build /app/dist /app/dist

# Expose the port the app will run on
EXPOSE 5000

# Set the environment variable for the app (optional)
ENV VITE_BASE_URL=${VITE_BASE_URL}

# Start the app using 'serve' on port 5000
CMD ["serve", "-s", "dist", "-l", "5000"]

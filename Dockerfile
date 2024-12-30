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
ARG BASE_URL
RUN echo "VITE_BASE_URL=$BASE_URL" >> .env

# Build the React app for production
RUN npm run build

# Step 2: Serve the app using a lightweight web server
# Use a smaller image for serving the app (nginx in this case)
FROM nginx:alpine

# Copy the build output from the previous build stage to the nginx directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the app to be accessible
EXPOSE 80

# Set the environment variable in the Nginx container
ENV VITE_BASE_URL=${BASE_URL}

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

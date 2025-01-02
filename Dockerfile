# Step 1: Build the React app using Vite
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./ 
RUN npm install

# Copy the application files
COPY . ./

# Build the React app for production
RUN npm run build

# Step 2: Set up Nginx to serve the app
FROM nginx:alpine

# Remove the default Nginx index.html
RUN rm -rf /usr/share/nginx/html/*

# Download the custom nginx.conf file from GitHub
RUN curl -o /etc/nginx/nginx.conf https://raw.githubusercontent.com/Suraz95/moview-review-frontend/main/nginx.conf

# Copy the build output from the build stage to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Add a script to inject runtime environment variables
COPY ./env-config.sh /usr/share/nginx/html/env-config.sh
RUN chmod +x /usr/share/nginx/html/env-config.sh

# Create the runtime environment configuration file dynamically
RUN echo "window.__RUNTIME_CONFIG__ = {};" > /usr/share/nginx/html/env-config.js

# Expose port 80 for the app to be accessible
EXPOSE 80

# Start Nginx with runtime variable injection
CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env-config.sh && nginx -g 'daemon off;'"]

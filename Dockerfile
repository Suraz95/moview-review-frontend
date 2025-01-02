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

# Install envsubst (gettext) to process environment variables
RUN apk add --no-cache gettext

# Remove the default Nginx index.html
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the build stage to Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the env-config.js.template from the current directory (where the Dockerfile is located)
COPY env-config.js.template /usr/share/nginx/html/env-config.js.template

# Replace environment variables in the template and create env-config.js
RUN envsubst < /usr/share/nginx/html/env-config.js.template > /usr/share/nginx/html/env-config.js

# Download the nginx.conf from GitHub (if needed)
RUN curl -o /etc/nginx/nginx.conf https://raw.githubusercontent.com/Suraz95/moview-review-frontend/main/nginx.conf

# Use envsubst to replace environment variables in the nginx.conf
RUN envsubst < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.new && mv /etc/nginx/nginx.conf.new /etc/nginx/nginx.conf

# Expose port 80 for the app to be accessible
EXPOSE 80

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

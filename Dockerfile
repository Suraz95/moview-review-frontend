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

# Step 2: Serve the app using Nginx
# Use Nginx for serving the built app
FROM nginx:alpine AS production

# Remove the default nginx.conf
RUN rm /etc/nginx/conf.d/default.conf

# Copy a custom nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the build output from the previous build stage to Nginx's default folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

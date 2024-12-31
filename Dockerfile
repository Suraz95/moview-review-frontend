# Step 1: Build the React app using Vite
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ARG VITE_BASE_URL
RUN echo "VITE_BASE_URL=$VITE_BASE_URL" >> .env

RUN npm run build

# Step 2: Serve the app using a lightweight web server (nginx)
FROM nginx:alpine

# Remove default Nginx configuration
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the previous build stage to Nginx's directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx.conf file to Nginx's configuration directory
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for the app to be accessible
EXPOSE 80

# Set the environment variable in the Nginx container
ENV VITE_BASE_URL=${VITE_BASE_URL}

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

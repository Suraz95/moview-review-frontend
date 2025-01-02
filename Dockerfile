# Step 1: Build the React app using Vite
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the application files
COPY . ./

# setting env url
ENV VITE_BASE_URL=${VITE_BASE_URL}

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

# Expose port 80 for the app to be accessible
EXPOSE 80

# Start nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]

#!/bin/sh

# Generate the env-config.js file
echo "window.__RUNTIME_CONFIG__ = {" > /usr/share/nginx/html/env-config.js
echo "  VITE_BASE_URL: '${VITE_BASE_URL}'," >> /usr/share/nginx/html/env-config.js
echo "};" >> /usr/share/nginx/html/env-config.js

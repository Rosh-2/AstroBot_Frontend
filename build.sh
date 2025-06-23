#!/bin/bash
# Exit on error
set -e

# Make script executable
chmod +x ./build.sh

# Install dependencies
npm install

# Install vite globally
npm install -g vite

# Ensure proper permissions
chmod -R 777 node_modules/.bin

# Build the project
npm run build 
#!/bin/bash
# Exit on error
set -e

# Make script executable
chmod +x ./build.sh

# Install dependencies
npm install

# Build the project
npm run build 
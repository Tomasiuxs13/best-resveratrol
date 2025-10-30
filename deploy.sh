#!/bin/bash

# Hostinger Post-Deployment Build Script
# This script runs after Git pulls the code

echo "Starting build process..."

# Check if Node.js is available
if ! command -v node &> /dev/null
then
    echo "ERROR: Node.js is not installed or not in PATH"
    exit 1
fi

# Check if npm is available
if ! command -v npm &> /dev/null
then
    echo "ERROR: npm is not installed or not in PATH"
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install --production=false

# Build the project
echo "Building production bundle..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "ERROR: Build failed - dist/ folder not found"
    exit 1
fi

# Copy built files to public_html
echo "Deploying to public_html..."

# Define the target directory (adjust if needed)
TARGET_DIR="../public_html"

# Create backup of current deployment
if [ -d "$TARGET_DIR" ]; then
    echo "Creating backup..."
    BACKUP_DIR="../public_html_backup_$(date +%Y%m%d_%H%M%S)"
    cp -r "$TARGET_DIR" "$BACKUP_DIR"
fi

# Clear public_html (except .htaccess)
echo "Clearing old files..."
find "$TARGET_DIR" -mindepth 1 ! -name '.htaccess' -delete 2>/dev/null || true

# Copy new build files
echo "Copying new files..."
cp -r dist/* "$TARGET_DIR/"

echo "✅ Deployment complete!"
echo "Site is now live with latest changes."

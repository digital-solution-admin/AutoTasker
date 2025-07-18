#!/bin/bash

echo "Setting up Workflow Builder Frontend..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js 16+ from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm or use yarn."
    exit 1
fi

echo "Installing dependencies..."
npm install

echo "Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm start"
echo ""
echo "To build for production, run:"
echo "  npm run build"
echo ""
echo "Open http://localhost:3000 in your browser to view the application."

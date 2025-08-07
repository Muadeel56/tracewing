# Use Node.js 20 Alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies for native builds
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    git \
    bash

# Install Expo CLI globally
RUN npm install -g @expo/cli@latest

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose ports for Expo
EXPOSE 8081 19000 19001 19002

# Start Expo development server
CMD ["npx", "expo", "start", "--dev-client", "--host", "0.0.0.0", "--port", "8081"] 
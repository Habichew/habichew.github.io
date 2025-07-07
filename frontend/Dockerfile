FROM node:18-alpine

WORKDIR /app

# Install global dependencies
RUN npm install -g @expo/cli

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose Metro bundler port
EXPOSE 8081

# Command to start Metro bundler
CMD ["npx", "expo", "start", "--tunnel","--clear"]
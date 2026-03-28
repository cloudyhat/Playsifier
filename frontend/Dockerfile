# Frontend Dockerfile for React/Vite application
# Development stage
FROM node:20-alpine as development

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 5173

# Run development server
CMD ["npm", "run", "dev"]

# Production stage
FROM node:20-alpine as production

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies (production only)
RUN npm install --production=false

# Copy application code
COPY . .

# Build application
RUN npm run build

# Use a smaller image for serving built files
FROM node:20-alpine as serve

WORKDIR /app

# Install serve to run the built application
RUN npm install -g serve

# Copy built files from production stage
COPY --from=production /app/dist ./dist

# Expose port
EXPOSE 5173

# Serve built application
CMD ["serve", "-s", "dist", "-l", "5173"]

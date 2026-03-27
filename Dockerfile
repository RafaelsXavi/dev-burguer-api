# Stage 1: Build
FROM node:22-slim AS build

WORKDIR /app

# Copy package files
COPY package.json ./

# Install all dependencies (including devDependencies if needed for build)
RUN npm install

# Copy source code
COPY . .

# Stage 2: Production
FROM node:22-slim AS production

# Set environment to production
ENV NODE_ENV=production

WORKDIR /app

# Copy package files
COPY package.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy only the necessary files from build stage
# We copy src and config since this is a Node.js API that doesn't strictly need a 'build' step (no TS/Babel)
COPY --from=build /app/src ./src
COPY --from=build /app/uploads ./uploads

# Create a non-root user for security
RUN groupadd -r nodejs && useradd -r -g nodejs nodejs && \
    mkdir -p /app/uploads && \
    chown -R nodejs:nodejs /app

USER nodejs

# Expose the port the app runs on
EXPOSE 3001

# Command to run the application
CMD ["node", "src/server.js"]

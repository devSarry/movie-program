# Use a specific Node.js version with Alpine for a smaller image
FROM node:22-alpine AS base
WORKDIR /app
# Install pnpm globally once in the base image
RUN npm install -g pnpm

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build
# Remove dev dependencies to reduce size
RUN pnpm prune --prod

# Stage 3: Run the application
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV MODELS_HOST=localhost

# Copy built application and production dependencies
COPY --from=builder --chown=node:node /app/build ./build
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

# Use a non-root user for security
USER node
# Expose necessary ports
EXPOSE 3000

# Start the application
CMD ["node", "build/index.js"]
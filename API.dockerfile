# Stage 2: Bun application
FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY ./API/package.json ./API/bun.lockb ./

# Install dependencies
RUN bun install

# Copy application code
COPY ./API/ .

EXPOSE 3001

# Start the application
CMD ["bun", "index.js"]
# Stage 2: Bun application
FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY ./Frontend/package.json ./

# Install dependencies
RUN bun install

# Copy application code
COPY ./Frontend/ .

EXPOSE 3002

# Start the application
CMD ["bun", "index.js"]
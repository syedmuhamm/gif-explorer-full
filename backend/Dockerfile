# === Development Stage ===
FROM node:18-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Use nodemon via npm script, ts-node is now available
CMD ["npm", "run", "dev"]


# === Production Stage ===
FROM node:18-alpine AS prod

WORKDIR /app

# Install dependencies needed to build
COPY package*.json ./
RUN npm install --production

# Copy source files and tsconfig
COPY tsconfig.json ./
COPY src ./src

# Compile TypeScript
RUN npm install -g typescript && tsc

# Start from built JavaScript
CMD ["node", "dist/index.js"]

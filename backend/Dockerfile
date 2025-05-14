# === Development Stage ===
FROM node:18-alpine AS dev

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Use nodemon via npm script, ts-node is now available
CMD ["npm", "run", "dev"]


# === Build Stage ===
FROM node:18-alpine AS build

WORKDIR /app

# Install full dependencies including devDependencies
COPY package*.json ./
RUN npm install

# Copy source and config
COPY . .

# Compile TypeScript
RUN npx tsc


# === Production Stage ===
FROM node:18-alpine AS prod

WORKDIR /app

# Only install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy built files from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/.env ./

# Start the production server
CMD ["node", "dist/index.js"]

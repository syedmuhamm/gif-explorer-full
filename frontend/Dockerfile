# --- Development Stage ---
FROM node:18-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# --- Build Stage ---
FROM node:18-alpine AS build
WORKDIR /app

# Copy and install all dependencies, including devDependencies (needed for Vite)
COPY package*.json ./
ENV NODE_ENV=development
RUN npm install

# Copy the rest of the source code
COPY . .

# Run the build (ensure it fails loudly if needed)
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine AS prod

# Copy built static files from build stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if it exists
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

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

COPY package*.json ./
RUN npm install --production

COPY . .

# You should compile TypeScript before using node
RUN npm install -g typescript && tsc

CMD ["node", "dist/index.js"]

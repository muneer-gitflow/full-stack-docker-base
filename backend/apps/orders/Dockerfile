FROM node:20-alpine

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npx pnpm install

# Copy the rest of the application code
COPY . .


CMD ["npx", "pnpm", "run", "start:dev", "orders"]


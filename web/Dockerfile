FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml (if you're using pnpm)
COPY package.json .
COPY pnpm-lock.yaml .

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .
COPY next.config.mjs ./next.config.mjs


EXPOSE 3000

# Use pnpm to run the dev script
CMD ["pnpm", "run", "dev"]

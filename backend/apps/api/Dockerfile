FROM node

WORKDIR /usr/src/app

COPY package.json .
COPY pnpm-lock.yaml .

RUN npx pnpm install

COPY . .

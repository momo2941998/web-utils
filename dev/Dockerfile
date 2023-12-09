FROM node:16-alpine

WORKDIR /app

COPY package* ./

RUN npm ci

COPY . .

CMD npm run dev
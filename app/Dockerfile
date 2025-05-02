# app/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY app/package.json app/package-lock.json ./

RUN npm install

COPY app/ .

RUN npm run build

CMD ["npm", "start"]

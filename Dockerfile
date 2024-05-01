FROM node:alpine3.19 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --omit=dev

EXPOSE 4200

ENTRYPOINT ng serve --host 0.0.0.0
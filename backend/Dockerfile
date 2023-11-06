FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
ENV ADDRESS=0.0.0.0 PORT=3000

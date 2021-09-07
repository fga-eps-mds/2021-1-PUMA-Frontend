FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR puma/

RUN ls

EXPOSE 8080

CMD [ "npm", "run", "serve"]
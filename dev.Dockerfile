FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @vue/cli

COPY . .

WORKDIR puma/

EXPOSE 8080

CMD [ "npm", "run", "serve"]
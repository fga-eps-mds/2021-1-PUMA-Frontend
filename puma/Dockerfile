FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG IP_ARG

ENV IP_ADDRESS ${IP_ARG}

ARG env

ENV ENVIRONMENT ${env}

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
ARG IP_ARG

ENV IP_ADDRESS ${IP_ARG}

ARG env

ENV ENVIRONMENT ${env}
CMD ["nginx", "-g", "daemon off;"]
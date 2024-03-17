FROM node:21-alpine as dependencies
WORKDIR /app

COPY package.json .

RUN npm install

FROM node:21-alpine as build
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules /node_modules/

RUN npm run build

FROM nginx as runner

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=build /app/dist /usr/share/nginx/html/


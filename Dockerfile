FROM node:latest
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm i

ENTRYPOINT ["node", "/usr/src/app/app/app.js"]
FROM node:10.16.3
RUN npm install -g webpack
WORKDIR /usr/src/app
COPY . /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
EXPOSE 3000
ENTRYPOINT ["node", "./server/server.js"]
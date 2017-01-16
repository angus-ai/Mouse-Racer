FROM node:4

COPY app.js /
COPY package.json /
COPY www/ /www/


RUN npm install socket.io
EXPOSE 8080

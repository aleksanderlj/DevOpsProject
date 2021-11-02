FROM node:latest

WORKDIR /web

COPY ["web/package.json", "web/package-lock.json", "web/"]

ENV PATH /react_app/node_modules/.bin:$PATH

RUN npm install

COPY ./web .

EXPOSE 3000

CMD ["npm", "start"]
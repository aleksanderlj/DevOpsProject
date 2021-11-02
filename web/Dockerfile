FROM node:alpine

WORKDIR /web

COPY ["web/package.json", "web/package-lock.json", "web/"]

ENV PATH /react_app/node_modules/.bin:$PATH

RUN yarn install

COPY ./web .

EXPOSE 3000

CMD ["yarn", "start"]
FROM node:alpine

COPY ["web/package.json", "web/package-lock.json", "web/"]

WORKDIR /web

ENV PATH /web/node_modules/.bin:$PATH

RUN yarn install

COPY ./web .

EXPOSE 3000

CMD ["yarn", "start"]
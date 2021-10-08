FROM node:latest

WORKDIR /web

COPY ["package.json", "package-lock.json", "./"]

ENV PATH /react_app/node_modules/.bin:$PATH

RUN npm install yarn

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "start"]
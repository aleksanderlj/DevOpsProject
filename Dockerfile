FROM node:16-alpine3.13

WORKDIR /

COPY "package.json" "package.json"

ENV PATH /node_modules/.bin:$PATH

RUN yarn install --network-timeout 1000000000

EXPOSE 3000

COPY . .

CMD ["yarn", "run", "start"]
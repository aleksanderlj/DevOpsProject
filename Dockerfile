FROM node:alpine

WORKDIR /

COPY . .

ENV PATH /node_modules/.bin:$PATH

RUN yarn install --network-timeout 100000

EXPOSE 3000

CMD ["yarn", "start"]
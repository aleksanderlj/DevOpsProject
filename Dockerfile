FROM node:16-alpine3.13

WORKDIR /

COPY . .

ENV PATH /node_modules/.bin:$PATH

RUN npm install 

EXPOSE 3000

CMD ["yarn", "run", "start"]
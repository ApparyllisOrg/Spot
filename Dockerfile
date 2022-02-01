FROM alpine:latest

RUN apk add nodejs-current yarn

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn

COPY . /app

CMD ["node", "bot.js"]
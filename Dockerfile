FROM alpine:latest

RUN apk add nodejs-current npm yarn git

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn

COPY . /app

CMD ["yarn", "ts-node", "bot.ts"]
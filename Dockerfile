FROM alpine:latest

RUN apk add nodejs-current npm git

WORKDIR /app
COPY package.json package-lock.json /app/
RUN npm i

COPY . /app

CMD ["npm", "run", "start"]
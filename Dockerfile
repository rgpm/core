FROM node:alpine

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn install

COPY src /app/src/
COPY test /app/test/

ENTRYPOINT ["yarn", "test"]

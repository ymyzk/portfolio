FROM node:6-slim
MAINTAINER Yusuke Miyazaki <miyazaki.dev@gmail.com>

RUN mkdir -p /app/
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . /app/

CMD ["npm", "run", "build"]

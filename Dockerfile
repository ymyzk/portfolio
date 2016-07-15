FROM node:6-slim
MAINTAINER Yusuke Miyazaki <miyazaki.dev@gmail.com>

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        python \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /app/
WORKDIR /app

COPY package.json ./
RUN npm install

COPY . /app/

CMD ["npm", "run", "build-production"]

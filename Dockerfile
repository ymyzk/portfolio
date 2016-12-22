FROM node:7.3-slim
MAINTAINER Yusuke Miyazaki <miyazaki.dev@gmail.com>

COPY package.json /app/
COPY yarn.lock /app/

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        python \
    && npm install -g yarn \
    && yarn \
    && rm -rf /root/.cache/yarn /root/.node-gyp /root/.npm /root/.yarn-cache \
    && apt-get purge -y \
        build-essential \
        python \
    && apt-get autoremove -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

COPY . /app/

RUN ["npm", "run", "build-all"]

EXPOSE 8000

CMD ["npm", "run", "start-production-server"]

FROM node:6.8.0-slim
MAINTAINER Yusuke Miyazaki <miyazaki.dev@gmail.com>

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        python \
    && rm -rf /var/lib/apt/lists/*

COPY package.json /app/
WORKDIR /app
RUN npm install && rm -rf /root/.npm

COPY . /app/

RUN ["npm", "run", "build-all"]

EXPOSE 8000

CMD ["npm", "run", "start-production-server"]

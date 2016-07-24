FROM node:6-slim
MAINTAINER Yusuke Miyazaki <miyazaki.dev@gmail.com>

RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        python \
    && rm -rf /var/lib/apt/lists/*

COPY package.json /app/
WORKDIR /app
RUN npm install

COPY . /app/

RUN ["npm", "run", "build-all"]

VOLUME ["/app/build"]
EXPOSE 8000

CMD ["npm", "run", "start-production-server"]

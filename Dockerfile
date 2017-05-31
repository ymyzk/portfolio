FROM node:8.0-slim

COPY package.json yarn.lock /app/

WORKDIR /app

RUN apt-get update \
        && apt-get upgrade -y \
        && apt-get install -y --no-install-recommends \
            build-essential \
            python \
        && yarn \
        && rm -rf /root/.cache/yarn /root/.node-gyp /root/.npm /root/.yarn-cache \
        && apt-get purge -y \
            build-essential \
            python \
        && apt-get autoremove -y \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/*

COPY . /app/

RUN ["yarn", "run", "build-all"]

EXPOSE 8000

CMD ["yarn", "run", "start-production-server"]

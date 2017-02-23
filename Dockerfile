FROM node:7.6-slim

COPY package.json /app/
COPY yarn.lock /app/

WORKDIR /app

RUN apt-get update \
        && apt-get upgrade -y \
        && apt-get install -y --no-install-recommends \
            apt-transport-https \
            build-essential \
            python \
        && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
        && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
        && apt-get update \
        && apt-get install -y --no-install-recommends \
            yarn \
        && yarn \
        && rm -rf /root/.cache/yarn /root/.node-gyp /root/.npm /root/.yarn-cache \
        && apt-get purge -y \
            apt-transport-https \
            build-essential \
            python \
        && apt-get autoremove -y \
        && apt-get clean \
        && rm -rf /var/lib/apt/lists/*

COPY . /app/

RUN ["npm", "run", "build-all"]

EXPOSE 8000

CMD ["npm", "run", "start-production-server"]

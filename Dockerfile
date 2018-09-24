FROM node:8.12-slim

COPY package.json yarn.lock /app/

WORKDIR /app

RUN yarn \
        && rm -rf /root/.cache/yarn /root/.node-gyp /root/.npm /root/.yarn-cache

COPY . /app/

RUN ["yarn", "run", "build"]
RUN ["yarn", "run", "export"]

EXPOSE 3000

CMD ["yarn", "run", "start", "-H", "0.0.0.0"]

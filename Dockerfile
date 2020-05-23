FROM node:12 AS build

COPY package.json package-lock.json /app/

WORKDIR /app

RUN npm ci \
        && rm -rf /root/.node-gyp /root/.npm

COPY . /app/

RUN ["npm", "run", "build"]
RUN ["npm", "run", "export"]

EXPOSE 3000

CMD ["npm", "run", "start", "--", "-H", "0.0.0.0"]

FROM busybox:1

COPY --from=build /app/out /app/out

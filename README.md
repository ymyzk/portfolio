# portfolio

![Build](https://github.com/ymyzk/portfolio/workflows/Build/badge.svg)

## Development
```console
$ npm run dev
```

## Deployment
The Docker image only contains the exported files. Please copy files out of the image and use an HTTP server you like.

```console
$ image_name=ymyzk/portfolio:latest
$ docker pull $image_name
$ container_id=$(docker create $image_name)
$ docker cp $container_id:/app/out/ ./dest
$ docker rm $container_id
```

### Notes
- If you make a change to a file in `/static`, please rename it because the previous version may be cached.

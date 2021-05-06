import fs from "fs";
import path from "path";

import imagemin from "imagemin";
import imageminMozjpeg from "imagemin-mozjpeg";
import imageminWebp from "imagemin-webp";
import Jimp from "jimp";

const DESTINATION = "public/static/images";

const resize = ({ width, height, mime }) => async (buffer, ...args) => {
  const image = await Jimp.read(buffer);
  image.resize(width, height);
  return await image.getBufferAsync(mime);
};

const extendFilename = name => (files) => {
  files.map((file) => {
    const { destinationPath: filePath } = file;
    const parsedPath = path.parse(filePath);
    delete parsedPath.base;
    parsedPath.name += name;
    const newFilePath = path.format(parsedPath);
    fs.renameSync(filePath, newFilePath);
    return Object.assign(file, { destinationPath: newFilePath });
  });
};

const forceExtension = ext => (files) => {
  files.map((file) => {
    const { destinationPath: filePath } = file;
    const parsedPath = path.parse(filePath);
    delete parsedPath.base;
    parsedPath.ext = ext;
    const newFilePath = path.format(parsedPath);
    fs.renameSync(filePath, newFilePath);
    return Object.assign(file, { destinationPath: newFilePath });
  });
};

async function convert(input, options) {
  const files = await imagemin(input, options);
  for (const postPlugin of options.postPlugins || []) {
    postPlugin(files);
  }
  for (const { destinationPath, sourcePath } of files) {
    console.log(`Converted: ${sourcePath} => ${destinationPath}`);
  }
  return files;
}

await convert(["resources/images/background.jpg"], {
  destination: DESTINATION,
  plugins: [
    resize({
      width: 1024,
      height: Jimp.AUTO,
      mime: Jimp.MIME_JPEG,
    }),
    imageminMozjpeg({
      quality: 70,
    }),
  ],
  postPlugins: [
    forceExtension(".jpg"),
  ],
});
await convert(["resources/images/projects/*.png"], {
  destination: `${DESTINATION}/projects`,
  plugins: [
    resize({
      width: 384,
      height: Jimp.AUTO,
      mime: Jimp.MIME_JPEG,
    }),
    imageminMozjpeg({
      quality: 80,
    }),
  ],
  postPlugins: [
    forceExtension(".jpg"),
  ],
});
await convert(["resources/images/projects/*.png"], {
  destination: `${DESTINATION}/projects`,
  plugins: [
    resize({
      width: 768,
      height: Jimp.AUTO,
      mime: Jimp.MIME_JPEG,
    }),
    imageminMozjpeg({
      quality: 80,
    }),
  ],
  postPlugins: [
    extendFilename("@2x"),
    forceExtension(".jpg"),
  ],
});
// For renaming files, we should write @2x first
await convert(["resources/images/projects/*.png"], {
  destination: `${DESTINATION}/projects`,
  plugins: [
    resize({
      width: 768,
      height: Jimp.AUTO,
      mime: Jimp.MIME_PNG,
    }),
    imageminWebp({
      quality: 75,
      method: 6, // slowest
    }),
  ],
  postPlugins: [
    extendFilename("@2x"),
  ],
});
await convert(["resources/images/projects/*.png"], {
  destination: `${DESTINATION}/projects`,
  plugins: [
    resize({
      width: 384,
      height: Jimp.AUTO,
      mime: Jimp.MIME_PNG,
    }),
    imageminWebp({
      quality: 75,
      method: 6, // slowest
    }),
  ],
});

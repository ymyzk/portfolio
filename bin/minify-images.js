const fs = require("fs");
const path = require("path");

const imagemin = require("imagemin");
const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminWebp = require("imagemin-webp");
const Jimp = require("jimp");

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
    fs.renameSync(filePath, path.format(parsedPath));
    return Object.assign(file, { destinationPath: newFilePath });
  });
};

async function convert(input, output, options) {
  options.destination = output; // Compatibility for imagemin 7+
  const files = await imagemin(input, options);
  for (const postPlugin of options.postPlugins || []) {
    postPlugin(files);
  }
  for (const { destinationPath, sourcePath } of files) {
    console.log(`Converted: ${sourcePath} => ${destinationPath}`);
  }
  return files;
}

(async () => {
  await convert(["resources/images/background.jpg"], "public/static/images", {
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
  await convert(["resources/images/projects/*.png"], "public/static/images/projects", {
    plugins: [
      resize({
        width: 384,
        height: Jimp.AUTO,
        mime: Jimp.MIME_PNG,
      }),
      imageminMozjpeg({
        quality: 80,
      }),
    ],
    postPlugins: [
      forceExtension(".jpg"),
    ],
  });
  await convert(["resources/images/projects/*.png"], "public/static/images/projects", {
    plugins: [
      resize({
        width: 768,
        height: Jimp.AUTO,
        mime: Jimp.MIME_PNG,
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
  await convert(["resources/images/projects/*.png"], "public/static/images/projects", {
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
    postPlugins: [
      forceExtension(".webp"),
    ],
  });
  await convert(["resources/images/projects/*.png"], "public/static/images/projects", {
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
      forceExtension(".webp"),
    ],
  });
})();

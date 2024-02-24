import { basename, extname, join, relative } from "node:path";

import { glob } from "glob";
import sharp from "sharp";

const SOURCE = "resources/images";
const TARGET = "public/static/images";

await sharp(join(SOURCE, "background.jpg"))
  .resize(1024, null)
  .jpeg({
    mozjpeg: true,
    quality: 70,
  })
  .toFile(join(TARGET, "background.jpg"));
await sharp(join(SOURCE, "background.jpg"))
  .resize(1024, null)
  .webp({
    effort: 6,
    quality: 75,
  })
  .toFile(join(TARGET, "background.webp"));

for (const sourceFile of await glob(join(SOURCE, "projects/*.png"))) {
  const targetFile = join(TARGET, relative(SOURCE, sourceFile));
  const changeExtension = (file, extension) => `${file.slice(0, -extname(file).length)}${extension}`;
  await sharp(sourceFile)
    .resize(384, null)
    .jpeg({
      mozjpeg: true,
      quality: 80,
    })
    .toFile(changeExtension(targetFile, ".jpg"));
  await sharp(sourceFile)
    .resize(768, null)
    .jpeg({
      mozjpeg: true,
      quality: 80,
    })
    .toFile(changeExtension(targetFile, "@2x.jpg"));
  await sharp(sourceFile)
    .resize(384, null)
    .webp({
      effort: 4,
      quality: 75,
    })
    .toFile(changeExtension(targetFile, ".webp"));
  await sharp(sourceFile)
    .resize(768, null)
    .webp({
      effort: 4,
      quality: 75,
    })
    .toFile(changeExtension(targetFile, "@2x.webp"));
}

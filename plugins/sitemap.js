function SitemapGeneratorPlugin(base, paths, fileName) {
  this.base = base.replace(/\/$/, "");
  this.paths = paths;
  this.fileName = fileName || "sitemap.xml";
}

SitemapGeneratorPlugin.prototype.apply = function(compiler) {
  const self = this;
  const out = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${self.paths
    .map(path => `<url>\n    <loc>${self.base + path}</loc>\n  </url>`)
    .reduce((pre, cur) => `${pre}\n${cur}`)}
</urlset>`;

  compiler.plugin("emit", function(compilation, callback) {
    compilation.fileDependencies.push(self.fileName);
    compilation.assets[self.fileName] = {
      source: function () {
        return out;
      },
      size: function () {
        return Buffer.byteLength(out, "utf8");
      }
    };
    callback();
  });
};

module.exports = SitemapGeneratorPlugin;

function RobotsGeneratorPlugin(base, fileName) {
  this.base = base.replace(/\/$/, "");
  this.fileName = fileName || "robots.txt";
}

RobotsGeneratorPlugin.prototype.apply = function(compiler) {
  const self = this;
  const out  = `User-agent: *
Sitemap: ${self.base}/sitemap.xml`;

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

module.exports = RobotsGeneratorPlugin;

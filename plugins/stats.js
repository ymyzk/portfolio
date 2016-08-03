const fs = require("fs");

function StatsPlugin(fileName) {
  this.fileName = fileName || "stats.json";
}

StatsPlugin.prototype.apply = function(compiler) {
  const self = this;

  compiler.plugin("emit", function(compilation, callback) {
    const hash = compilation.hash;
    const result = {
      hash,
      files: {
        bundleCss: `bundle.${hash}.css`,
        bundleJs: `bundle.${hash}.js`
      }
    };
    const out = JSON.stringify(result);

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

module.exports = StatsPlugin;

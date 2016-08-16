const fs = require("fs");
const Handlebars = require("handlebars");

function IndexPageGeneratorPlugin(templateFileName, outputFileName) {
  this.templateFileName = templateFileName;
  this.outputFileName = outputFileName || "index.html";
}

IndexPageGeneratorPlugin.prototype.apply = function(compiler) {
  const self = this;
  const template = Handlebars.compile(fs.readFileSync(this.templateFileName).toString());
  compiler.plugin("emit", function(compilation, callback) {
    const hash = compilation.hash;

    // Corresponds to server.js
    const out = template({
      initialState: "undefined",
      head: {
        title: "<title>Yusuke Miyazaki</title>"
      },
      files: {
        bundleCss: `bundle.${hash}.css`,
        bundleJs: `bundle.${hash}.js`
      }
    });

    compilation.fileDependencies.push(self.outputFileName);
    compilation.assets[self.outputFileName] = {
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

module.exports = IndexPageGeneratorPlugin;

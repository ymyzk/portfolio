const fs = require("fs");
const Handlebars = require("handlebars");

function IndexPageGeneratorPlugin(base, templateFileName, outputFileName) {
  this.base = base.replace(/\/$/, "");
  this.templateFileName = templateFileName;
  this.outputFileName = outputFileName || "index.html";
}

IndexPageGeneratorPlugin.prototype.apply = function(compiler) {
  const self = this;
  const template = Handlebars.compile(fs.readFileSync(this.templateFileName).toString());
  const out = template({
    head: {
      title: "<title>Yusuke Miyazaki</title>"
    }
  });

  compiler.plugin("emit", function(compilation, callback) {
    compilation.fileDependencies.push(self.fileName);
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

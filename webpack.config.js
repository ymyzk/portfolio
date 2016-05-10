const webpack = require("webpack");
const path = require("path");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const StaticSiteGeneratorPlugin = require("static-site-generator-webpack-plugin");
const TransferWebpackPlugin = require("transfer-webpack-plugin");
const SitemapGeneratorPlugin = require("./plugins/sitemap");

const DEBUG = !process.argv.includes("--production");
const CLIENT = !process.argv.includes("--server");

const buildPath = path.resolve(__dirname, "build/" + (CLIENT ? "client" : "server"));
const nodeModulesPath = path.resolve(__dirname, "node_modules");

const base_path = "https://www.ymyzk.com";
const paths = [
  "/",
  "/projects/",
  "/talks/",
  "/contributions/",
  "/news/"
  // TODO: 404 support
];

const config = {
  entry: [
    ...((DEBUG && CLIENT) ? ["webpack/hot/dev-server", "webpack/hot/only-dev-server"] : []),
    ...(CLIENT ? [path.join(__dirname, "/src/javascripts/entry.js")] : [path.join(__dirname, "/src/javascripts/server.js")])
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".scss", ".yml"]
  },
  devServer: {
    contentBase: "output",
    devtool: "eval",
    hot: true,
    inline: true,
    port: 3000,
    // react-router 用
    historyApiFallback: true
  },
  devtool: DEBUG ? "eval" : "source-map",
  output: {
    path: buildPath,
    publicPath: DEBUG ? "/" : base_path,
    filename: "bundle.js",
    libraryTarget: CLIENT ? "var" : "commonjs2"
  },
  externals: CLIENT ? false : /^[a-z\-0-9]+$/,
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: "eslint-loader",
        include: [path.resolve(__dirname, "src/javascripts")],
        exclude: [nodeModulesPath]
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", ["css", "postcss", "sass"])
      },
      {
        test: /\.(js|jsx)$/,
        loaders: ["react-hot", "babel"],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.yml$/,
        loaders: ["json", "yaml"]
      },
      {
        test: /\.(png|jpg)$/,
        loader: "url-loader",
        query: {
          limit: 8192
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: DEBUG,
      __CLIENT__: CLIENT,
      __SERVER__: !CLIENT,
      "process.env": {
        "NODE_ENV": DEBUG ? "'development'" : "'production'"
      }
    }),
    ...((DEBUG && CLIENT) ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...(!DEBUG ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin()
    ] : []),
    new webpack.NoErrorsPlugin(),
    ...(CLIENT ? [
      new TransferWebpackPlugin([
        { from: "src/www" }
      ])
    ] : [
      new StaticSiteGeneratorPlugin("bundle.js", paths)
    ]),
    new SitemapGeneratorPlugin(base_path, paths, "sitemap.xml"),
    new ExtractTextPlugin("bundle.css")
  ],
  postcss: function () {
    return {
      defaults: [autoprefixer],
      cleaner:  [autoprefixer()]
    };
  },
  sassLoader: {
    precision: 8
  }
};

module.exports = config;

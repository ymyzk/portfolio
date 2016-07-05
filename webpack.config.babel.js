// Node.js
import path from "path";
// webpack
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import StaticSiteGeneratorPlugin from "static-site-generator-webpack-plugin";
// Original Plugins
import IndexPageGeneratorPlugin from "./plugins/index";
import RobotsGeneratorPlugin from "./plugins/robots";
import SitemapGeneratorPlugin from "./plugins/sitemap";

const DEBUG = !process.argv.includes("--production");
const PRODUCTION = !DEBUG;
const CLIENT = !process.argv.includes("--server");

const buildPath = path.resolve(__dirname, "build/" + (CLIENT ? "client" : "server"));
const nodeModulesPath = path.resolve(__dirname, "node_modules");

const basePath = "https://www.ymyzk.com/";
const paths = [
  "/",
  "/projects/",
  "/talks/",
  "/contributions/",
  "/misc/"
];

const config = {
  entry: [
    "whatwg-fetch",
    ...((DEBUG && CLIENT) ? ["webpack/hot/dev-server", "webpack/hot/only-dev-server"] : []),
    ...(CLIENT ? [path.join(__dirname, "/src/javascripts/entry.js")] : [path.join(__dirname, "/src/javascripts/server.js")])
  ],
  resolve: {
    extensions: ["", ".hbs", ".js", ".jsx", ".scss", ".yml"]
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
    publicPath: DEBUG ? "/" : basePath,
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
        test: /\.hbs$/,
        loader: "html"
      },
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
        test: /\.(ico|jpg|png)$/,
        loader: "url-loader",
        query: {
          limit: 1024
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEBUG__: DEBUG,
      __PRODUCTION__: PRODUCTION,
      __CLIENT__: CLIENT,
      __SERVER__: !CLIENT,
      "process.env": {
        NODE_ENV: DEBUG ? "'development'" : "'production'"
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
    new IndexPageGeneratorPlugin(
      basePath,
      path.join(__dirname, "/src/templates/index.hbs"),
      CLIENT ? "index.html" : "base.html"),
    ...(CLIENT ? [] : [
      new StaticSiteGeneratorPlugin("bundle.js", paths)
    ]),
    new RobotsGeneratorPlugin(basePath, "robots.txt"),
    new SitemapGeneratorPlugin(basePath, paths, "sitemap.xml"),
    new ExtractTextPlugin("bundle.css")
  ],
  postcss: function () {
    return {
      defaults: [autoprefixer],
      cleaner: [autoprefixer()]
    };
  },
  sassLoader: {
    precision: 8
  }
};

module.exports = config;

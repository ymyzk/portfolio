// Node.js
import path from "path";
// webpack
import webpack from "webpack";
import autoprefixer from "autoprefixer";
import CompressionPlugin from "compression-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import StaticSiteGeneratorPlugin from "static-site-generator-webpack-plugin";
// Original Plugins
import IndexPageGeneratorPlugin from "./plugins/index";
import RobotsGeneratorPlugin from "./plugins/robots";
import SitemapGeneratorPlugin from "./plugins/sitemap";

const DEBUG = !process.argv.includes("--production");
const PRODUCTION = !DEBUG;
const CLIENT = !process.argv.includes("--server");

const buildPath = path.resolve(__dirname, `build/${CLIENT ? "client" : "server"}`);
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
    path.join(__dirname, "/src/javascripts/", CLIENT ? "entry.js" : "server.js")
  ],
  resolve: {
    extensions: ["", ".css", ".hbs", ".js", ".scss", ".yml"]
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
        test: /\.(js)$/,
        loader: "eslint-loader",
        include: [path.resolve(__dirname, "src/javascripts")],
        exclude: [nodeModulesPath]
      }
    ],
    loaders: [
      // Template
      {
        test: /\.hbs$/,
        loader: "html"
      },
      // Stylesheet
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", ["css"])
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", ["css", "postcss", "sass"])
      },
      // JavaScript
      {
        test: /\.(js)$/,
        loaders: ["react-hot", "babel"],
        exclude: [nodeModulesPath]
      },
      // Data
      {
        test: /\.yml$/,
        loaders: ["json", "yaml"]
      },
      // Images
      {
        test: /\.(ico|jpg|png)$/,
        loader: "url-loader",
        query: {
          limit: 1024
        }
      },
      // Fonts (Font Awesome)
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        query: {
          limit: 1024,
          mimetype: "application/vnd.ms-fontobject"
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        query: {
          limit: 1024,
          mimetype: "image/svg+xml"
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        query: {
          limit: 1024,
          mimetype: "application/octet-stream"
        }
      },
      {
        test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url-loader",
        query: {
          limit: 1024,
          mimetype: "application/font-woff"
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
        NODE_ENV: JSON.stringify(DEBUG ? "development" : "production")
      }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ...((DEBUG && CLIENT) ? [new webpack.HotModuleReplacementPlugin()] : []),
    ...(PRODUCTION ? [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new CompressionPlugin({
        algorithm: "gzip",
        // TODO: requires node-zopfli
        // algorithm: "zopfli",
        test: /\.(css|eot|js|svg|ttf|txt|xml)$/,
        threshold: 1024,
        minRatio: 0.8
      })
    ] : []),
    new webpack.NoErrorsPlugin(),
    new IndexPageGeneratorPlugin(
      basePath,
      path.join(__dirname, "/src/templates/index.hbs"),
      CLIENT ? "index.html" : "base.html"),
    ...(CLIENT ? [] : [new StaticSiteGeneratorPlugin("bundle.js", paths)]),
    new RobotsGeneratorPlugin(basePath, "robots.txt"),
    new SitemapGeneratorPlugin(basePath, paths, "sitemap.xml"),
    new ExtractTextPlugin("bundle.css")
  ],
  postcss: () => ({
    defaults: [autoprefixer],
    cleaner: [autoprefixer()]
  }),
  sassLoader: {
    precision: 8
  }
};

module.exports = config;

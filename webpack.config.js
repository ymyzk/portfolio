const webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "build");
const nodeModulesPath = path.resolve(__dirname, "node_modules");
const TransferWebpackPlugin = require("transfer-webpack-plugin");

const DEBUG = !process.argv.includes('--production');

const config = {
  entry:
    DEBUG ? [
      "webpack/hot/dev-server",
      "webpack/hot/only-dev-server",
      path.join(__dirname, "/src/javascripts/entry.js")
    ] : [
      path.join(__dirname, "/src/javascripts/entry.js")
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
    publicPath: DEBUG ? "/" : "https://www.ymyzk.com/",
    filename: "bundle.js"
  },
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
        loaders: ["style", "css", "sass"]
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
  plugins:
    DEBUG ? [
      new webpack.DefinePlugin({
        __DEBUG__: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new TransferWebpackPlugin([
        { from: "src/www" }
      ])
    ] : [
      new webpack.DefinePlugin({
        __DEBUG__: false,
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new webpack.NoErrorsPlugin(),
      new TransferWebpackPlugin([
        { from: "src/www" }
      ])
    ],
  sassLoader: {
    precision: 8
  }
};

module.exports = config;

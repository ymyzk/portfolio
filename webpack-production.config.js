const webpack = require("webpack");
const path = require("path");
const buildPath = path.resolve(__dirname, "build");
const nodeModulesPath = path.resolve(__dirname, "node_modules");
const TransferWebpackPlugin = require("transfer-webpack-plugin");

const config = {
  entry: [
    path.join(__dirname, "/src/javascripts/entry.js")
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".scss", ".yml"]
  },
  devtool: "source-map",
  output: {
    path: buildPath,
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
        loaders: ["babel"],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.yml$/,
        loaders: ["json", "yaml"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
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

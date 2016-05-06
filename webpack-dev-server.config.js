const webpack = require('webpack');
const path = require('path');
const buildPath = path.resolve(__dirname, 'build');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');
const TransferWebpackPlugin = require('transfer-webpack-plugin');

const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack/hot/only-dev-server',
    path.join(__dirname, '/src/javascripts/entry.jsx')
  ],
  resolve: {
    extensions: ["", ".js", ".jsx", ".scss", ".yml"]
  },
  devServer: {
    contentBase: 'output',
    devtool: 'eval',
    hot: true,
    inline: true,
    port: 3000,
    // router 用
    historyApiFallback: true
  },
  devtool: 'eval',
  output: {
    path: buildPath,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
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
        loaders: ['react-hot', 'babel'],
        exclude: [nodeModulesPath]
      },
      {
        test: /\.yml$/,
        loaders: ['json', 'yaml']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new TransferWebpackPlugin([
      { from: 'src/www' }
    ])
  ],
  sassLoader: {
    precision: 8
  }
};

module.exports = config;

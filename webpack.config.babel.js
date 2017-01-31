// Node.js
import path from "path";
// webpack
import webpack from "webpack";
import CompressionPlugin from "compression-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
// PostCSS
import cssnext from "postcss-cssnext";
import reporter from "postcss-reporter";
// Original Plugins
import IndexPageGeneratorPlugin from "./plugins/index";
import RobotsGeneratorPlugin from "./plugins/robots";
import SitemapGeneratorPlugin from "./plugins/sitemap";
import StatsPlugin from "./plugins/stats";

const config = (env) => {
  const PRODUCTION = env ? env.production : false;
  const DEBUG = !PRODUCTION;
  const SERVER = env ? env.server : false;
  const CLIENT = !SERVER;

  const buildPath = path.resolve(__dirname, `build/${DEBUG ? "debug" : "production"}/${CLIENT ? "client" : "server/public"}`);
  const nodeModulesPath = path.resolve(__dirname, "node_modules");

  const basePath = "https://www.ymyzk.com/";
  const paths = [
    "/",
    "/projects/",
    "/talks/",
    "/contributions/",
    "/misc/",
  ];

  const config = {
    entry: [
      "babel-polyfill",
      "whatwg-fetch",
      ...((DEBUG && CLIENT) ? ["webpack/hot/only-dev-server"] : []),
      path.join(__dirname, "/src/javascripts/", CLIENT ? "entry.js" : "server.js"),
    ],
    resolve: {
      extensions: [".hbs", ".js"],
    },
    devServer: {
      contentBase: "output",
      // devtool: "eval",
      hot: true,
      inline: true,
      port: 3000,
      // react-router 用
      historyApiFallback: true,
    },
    devtool: DEBUG ? "eval" : "source-map",
    output: {
      path: buildPath,
      publicPath: DEBUG ? "/" : basePath,
      filename: CLIENT ? "bundle.[hash].js" : "server.js",
      libraryTarget: CLIENT ? "var" : "commonjs2",
    },
    target: CLIENT ? "web" : "node",
    externals: CLIENT ? "" : /^[a-z\-0-9]+$/,
    module: {
      rules: [
        // Template
        {
          test: /\.hbs$/,
          loader: "html-loader",
        },
        // Stylesheet
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: ["css-loader", "postcss-loader"]
          }),
        },
        // JavaScript
        {
          test: /\.(js)$/,
          enforce: "pre",
          loader: "eslint-loader",
          include: [path.resolve(__dirname, "src/javascripts")],
          exclude: [nodeModulesPath],
        },
        {
          test: /\.(js)$/,
          loaders: ["react-hot-loader", "babel-loader"],
          exclude: [nodeModulesPath],
        },
        // Data
        {
          test: /\.yml$/,
          loaders: ["json-loader", "yaml-loader"],
        },
        // Images
        {
          test: /\.(ico|jpg|png)$/,
          loader: "url-loader",
          options: {
            limit: 1024,
          },
        },
        // Fonts (Font Awesome)
        {
          test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader",
          options: {
            limit: 1024,
            mimetype: "application/vnd.ms-fontobject",
          },
        },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader",
          query: {
            limit: 1024,
            mimetype: "image/svg+xml",
          },
        },
        {
          test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader",
          query: {
            limit: 1024,
            mimetype: "application/octet-stream",
          },
        },
        {
          test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/,
          loader: "url-loader",
          query: {
            limit: 1024,
            mimetype: "application/font-woff",
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEBUG__: DEBUG,
        __PRODUCTION__: PRODUCTION,
        __CLIENT__: CLIENT,
        __SERVER__: !CLIENT,
        "process.env": {
          NODE_ENV: JSON.stringify(DEBUG ? "development" : "production"),
        },
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: () => [
            cssnext({
              features: {
                calc: {
                  precision: 8,
                },
              },
            }),
            reporter(),
          ],
        }
      }),
      ...((DEBUG && CLIENT) ? [new webpack.HotModuleReplacementPlugin()] : []),
      ...(PRODUCTION ? [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        new CompressionPlugin({
          // NOTE: requires node-zopfli, you can specify gzip if you don't have it
          algorithm: "zopfli",
          test: /\.(css|eot|js|svg|ttf|txt|xml)$/,
          threshold: 1024,
          minRatio: 0.8,
        }),
      ] : []),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin("bundle.[hash].css"),
      new CopyWebpackPlugin([
        { from: "src/media", to: "media" },
      ]),
      ...(CLIENT ? [
        new IndexPageGeneratorPlugin(
          path.join(__dirname, "/src/templates/index.hbs"),
          "index.html"),
        new RobotsGeneratorPlugin(basePath, "robots.txt"),
        new SitemapGeneratorPlugin(basePath, paths, "sitemap.xml"),
      ] : []),
      new StatsPlugin(),
    ],
  };
  return config;
}

module.exports = config;

const webpack = require("webpack");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const withTypescript = require("@zeit/next-typescript");

const isProd = process.env.NODE_ENV === "production";
const assetPrefix = isProd ? "https://www.ymyzk.tokyo" : "";

module.exports = withTypescript({
  assetPrefix,
  webpack: (config) => {
    const { ANALYZE } = process.env;

    // To access assetPrefix in the components
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(assetPrefix),
      }),
    );

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerPort: 8888,
        openAnalyzer: true,
      }));
    }

    return config;
  },
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
});

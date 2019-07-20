const webpack = require("webpack");

const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");

const isProd = process.env.NODE_ENV === "production";
const assetPrefix = isProd ? "https://www.ymyzk.tokyo" : "";

module.exports = withBundleAnalyzer({
  assetPrefix,
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: "static",
      reportFilename: "../bundles/server.html",
    },
    browser: {
      analyzerMode: "static",
      reportFilename: "../bundles/client.html",
    },
  },
  webpack: (config) => {
    // To access assetPrefix in the components
    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(assetPrefix),
      }),
    );

    return config;
  },
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
});

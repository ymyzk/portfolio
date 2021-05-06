const withBundleAnalyzer = require("@next/bundle-analyzer");

const isProd = process.env.NODE_ENV === "production";
const assetPrefix = "";
// Example with CDN for assets in production
// const assetPrefix = isProd ? "https://cdn.example.com" : "";

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
  env: {
    ASSET_PREFIX: assetPrefix,
  },
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
  future: {
    webpack5: true,
  },
});

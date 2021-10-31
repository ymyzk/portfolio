const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.BUNDLE_ANALYZE === "true",
});

const isProd = process.env.NODE_ENV === "production";
const assetPrefix = "";
// Example with CDN for assets in production
// const assetPrefix = isProd ? "https://cdn.example.com" : "";

module.exports = withBundleAnalyzer({
  assetPrefix,
  env: {
    ASSET_PREFIX: assetPrefix,
  },
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
});

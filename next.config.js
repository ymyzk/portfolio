const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.BUNDLE_ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
});

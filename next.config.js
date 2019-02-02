const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const withTypescript = require("@zeit/next-typescript");

module.exports = withTypescript({
  webpack: (config) => {
    const { ANALYZE } = process.env;

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

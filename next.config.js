const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
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
};

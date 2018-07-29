const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  webpack: (config, { dev }) => {
    const { ANALYZE } = process.env;

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: "server",
        analyzerPort: 8888,
        openAnalyzer: true,
      }));
    }

    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        enforce: "pre",
        loader: "eslint-loader",
        exclude: /node_modules/,
      });
    }
    return config;
  },
  exportPathMap: () => ({
    "/": { page: "/" },
  }),
};

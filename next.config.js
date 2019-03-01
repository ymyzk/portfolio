const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const withTypescript = require("@zeit/next-typescript");

const isProd = process.env.NODE_ENV === "production";

module.exports = withTypescript({
  assetPrefix: isProd ? "https://www.ymyzk.tokyo" : "",
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

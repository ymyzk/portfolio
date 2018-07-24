module.exports = {
  webpack: (config, { dev }) => {
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

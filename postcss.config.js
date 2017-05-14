module.exports = {
  plugins: {
    "postcss-cssnext": {
      features: {
        calc: {
          precision: 8,
        },
      },
    },
    "postcss-reporter": {},
  }
};

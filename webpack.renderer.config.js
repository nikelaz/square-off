const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const rules = require('./webpack.rules');

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ]
};

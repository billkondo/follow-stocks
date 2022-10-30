const alias = require('./webpack.alias');
const path = require('path');
const plugins = require('./webpack.plugins');
const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

rules.push({
  test: /\.scss$/,
  use: [
    { loader: 'style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader' },
  ],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    modules: ['node_modules', path.join(__dirname, 'src')],
    alias: {
      ...alias,
      '@components': path.join(__dirname, 'src/renderer/components'),
    },
  },
};

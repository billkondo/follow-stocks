const alias = require('./webpack.alias');
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.ts',
  module: {
    rules: require('./webpack.rules'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    modules: ['node_modules', path.join(__dirname, 'src')],
    alias: {
      ...alias,
      '@services': path.join(__dirname, 'src/main/services'),
      '@sqlite': path.join(__dirname, 'src/main/services/sqlite'),
    },
  },
};

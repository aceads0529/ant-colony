const path = require('path');

module.exports = {
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: 'node_modules',
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-typescript']
        }
      }
    }]
  },

  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),

    libraryTarget: 'global'
  }
};

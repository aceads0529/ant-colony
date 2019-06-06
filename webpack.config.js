const path = require('path');

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              ['@babel/plugin-proposal-decorators', {legacy: true}],
              ['@babel/plugin-proposal-class-properties', {loose: true}]
            ],
            presets: ['@babel/preset-typescript']
          }
        }
      }
    ]
  },

  resolve: {extensions: ['.ts', '.js']},

  entry: './src/index.ts',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist'),

    libraryTarget: 'global'
  },

  devServer: {
    contentBase: path.join(__dirname, './dist'),
    port: 8080
  }
};

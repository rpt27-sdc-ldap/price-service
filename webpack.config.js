const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '/client/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ]
  },
  output: {
    filename: 'priceBundle.js',
    path: path.resolve(__dirname, 'public')
  },
  mode: 'production',
  watch: true
};
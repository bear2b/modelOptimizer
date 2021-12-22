const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
  },
  devServer: {
    open: true,
    publicPath: '/public/',
    compress: true,
    port: 9000,
    hot: true,
  },

  module: {
    rules: [
      {
        exclude: path.resolve(__dirname, 'server/'),
      }
    ]
  }
}

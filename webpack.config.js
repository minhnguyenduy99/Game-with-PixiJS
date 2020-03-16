let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'src/index.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    stats: 'errors-warnings',
    before: (app, server, compile) => {
      app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, './index.html'));
      })
    }
  },
  plugins: [new HtmlWebpackPlugin()]
}
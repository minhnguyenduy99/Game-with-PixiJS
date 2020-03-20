const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: './[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')       // the src folder
    }
  },
  devServer: {
    contentBase: 'dist',
    compress: true,
    port: 8080,
    writeToDisk: true,
    stats: 'errors-warnings'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        loader: 'eslint-loader',
        options: {
          // eslint options (if necessary)
          fix: true,
          failOnError: true
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'assets/images',
          publicPath: '/assets/'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: MiniCSSExtractPlugin.loader,
            options: {
              publicPath: '/assets/css',
            } 
          },
          'css-loader',
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: './assets/css/[name].[hash].css'
    })
  ]
}
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// var stylus_plugin = require('stylus_plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractSTYLUS = new ExtractTextPlugin('stylesheet/[name]-one.css')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(),
    extractSTYLUS,
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'stylus-loader']
        })
        // use: extractSTYLUS.extract(['css-loader', 'stylus-loader']) 
        // [
        //   'style-loader',
        //   'css-loader',
        //   {
        //     loader: 'stylus-loader',
        //     // options: {
        //     //   use: [stylus_plugin()],
        //     // },
        //   },
        // ],
      }
    ]
  }
}
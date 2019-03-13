const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// var stylus_plugin = require('stylus_plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const extractSTYLUS = new ExtractTextPlugin('stylesheet/[name]-one.css')
const extractCSS = new ExtractTextPlugin('stylesheet/[name]-two.css')
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
    extractCSS,
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
        use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
      },
      {
        test: /\.styl$/i,
        use: extractSTYLUS.extract([ 'css-loader', 'stylus-loader' ])
      },
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
    ]
  }
}
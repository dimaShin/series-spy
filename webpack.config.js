"use strict";

var webpack           = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanPlugin       = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: {
    app: ['./public/app/app']
  },
  output: {
    path: './public/dist',
    filename: 'bundle-[hash].js'
  },
  plugins: [
    new CleanPlugin(['./public/dist']),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin("[name]-[hash].css"),
    new HtmlWebpackPlugin({
      title: 'Series Spy',
      description: 'Spy new series of your favorite shows',
      filename: './index.html',
      template: './public/base.html',
      favicon: './public/favicon.ico',
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query:
        {
          presets:['es2015', 'stage-0']
        },
        exclude: /node_modules/
      },
      { test: /\.html$/, loader: 'raw' },

      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') }
    ]
  }
};
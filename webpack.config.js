"use strict";

const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanPlugin       = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');


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
      template: './public/index.html',
      favicon: './public/favicon.ico',
      inject: 'body'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'ng-annotate!babel?presets[]=es2015,presets[]=stage-0',
        exclude: /node_modules/
      },
      { test: /\.html$/, loader: 'raw' },

      { test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass?sourceMap') },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style', 'css') },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!less?sourceMap') },

      { test: /\.woff2?(.*)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.(ttf|eot|svg)(.*)?$/, loader: 'file?name=fonts/[name].[ext]' },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /[\\\/]modernizr\.custom\.js$/,
        loader: "imports?this=>window,html5=>window.html5!exports?window.Modernizr" }
    ]
  },
  resolve: {
    root: [
      path.resolve('./public/app'),
      path.resolve('./public/app/components'),
      path.resolve('./public/app/API'),
      path.resolve( './public/app/config')
    ]
  }
};
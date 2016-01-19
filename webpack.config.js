"use strict";

module.exports = {
  context: __dirname + "/public/app",
  entry: "./app.js",

  output: {
    filename: "app.js",
    path: __dirname + "/public/dist"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query:
        {
          presets:['es2015', 'react', 'stage-0']
        }
      }
    ]
  }
};
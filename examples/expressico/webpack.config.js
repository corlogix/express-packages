const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const Externals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    server: [ './src/index.ts' ],
  },
  target: 'node',
  externals: [ 
    Externals()
  ],
  resolve: {
    modules: [
      path.resolve("node_modules"),
      path.resolve("../node_modules")
    ],
    extensions: ['.ts', '.js', '.json']
  },
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'server.js',
    chunkFilename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /(node_modules|vendor)/
      },

    ]
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: { ecma: 6 },
          format: { ecma: 6 }
        }
      }),
    ]
  },
  stats: {
    errorDetails: false
  }
};
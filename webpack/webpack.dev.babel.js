/**
 * DEVELOPMENT WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
require('dotenv').config({ path: `${process.cwd()}/.env` });

module.exports = require('./webpack.base.babel')({
  mode: 'development',
  // Add hot reloading in development
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom', 'prop-types'],
    main: './src/index.js'
  },

  // Don't use hashes in dev mode for better performance
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },

  // Add development plugins
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),
  ],

  // Emit a source map for easier debugging
  // See https://webpack.js.org/configuration/devtool/#devtool
  devtool: 'eval-source-map',

  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    port: 8081,
  },

  performance: {
    hints: false,
  },
});

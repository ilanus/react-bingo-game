/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: /\.(woff(2)?|ttf|otf|png|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            regExp: /\/([a-zA-Z0-9]+)\/[a-zA-Z0-9|-]+\.(woff(2)?|ttf|eot|svg)/,
            name: '[1]/[name].[ext]',
            outputPath: 'assets/'
          }
        }]
      },
      {
        test: /\.mp3$/,
        loader: 'file-loader',
        query: {
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.css$/, // this is needed for ant-design babel-import css loading
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/, // this allows us to use css modules as well
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              modules: { localIdentName: 'org-structure_[local]_[hash:base64:6]' },
              importLoaders: 1,
            }
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: { javascriptEnabled: true }
          }
        ]
      }
    ]
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.EnvironmentPlugin({
      NODE_ENV: options.mode,
    }),
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(options.mode)
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: options.mode === 'development' ? '[id].css' : '[id].[hash].css'
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      favicon: './src/assets/favicon.ico',
    }),
  ]),
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.js', '.jsx', '.react.js'],
    mainFields: ['browser', 'jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
  devServer: options.devServer
});

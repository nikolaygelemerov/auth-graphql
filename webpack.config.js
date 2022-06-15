const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const cssResourcesPath = require(path.join(__dirname, 'client/styles/shared'));
const generateAliases = require(path.join(__dirname, 'client/aliases'));

module.exports = {
  // https://stackoverflow.com/questions/61339968/error-message-devtools-failed-to-load-sourcemap-could-not-load-content-for-chr
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client', //Tell webpack to include hot reloading module before main.js
    './client/index.jsx'
  ],
  output: {
    path: '/',
    filename: 'bundle.js'
  },
  mode: 'development',
  resolve: {
    // Passes alias cofiguration object
    alias: generateAliases(),
    // Files extensions to resolve
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        // babael-loader module
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        // .scss loaders configuration
        test: /\.scss$/,
        use: [
          {
            // Use MiniCssExtractPlugin instead of style-loader
            // Extracts separate css files
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader',
            options: {
              // Defines the number of subsequent .scss loaders
              importLoaders: 3,
              modules: {
                // Add .scss module file naming
                localIdentName: '[name]__[local]__[hash:base64:5]'
              },
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                // Use autoprefixer package for postcss
                plugins: ['autoprefixer']
              }
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            // Sharing sass recources
            // Use it for constants only when working with css modules
            loader: 'sass-resources-loader',
            options: {
              resources: cssResourcesPath
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'client/index.html'
    })
  ]
};
